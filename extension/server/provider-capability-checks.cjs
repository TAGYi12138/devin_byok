'use strict';

const crypto = require('node:crypto');

function safeError(value, secrets = []) {
  let text = String(value || '');
  for (const secret of secrets) if (secret) text = text.split(String(secret)).join('[REDACTED]');
  return text.replace(/Bearer\s+\S+/gi, 'Bearer [REDACTED]').slice(0, 400);
}

function numericUsage(value) {
  if (!value || typeof value !== 'object') return null;
  const out = {};
  for (const key of ['inputTokens', 'outputTokens', 'cacheReadInputTokens', 'cacheCreationInputTokens']) {
    if (Number.isFinite(value[key]) && value[key] >= 0) out[key] = value[key];
  }
  return Object.keys(out).length ? out : null;
}

// Uses the existing Local adapter. It never executes returned tools or stores
// provider payloads. "failed" means this probe failed, not universal incapability.
async function runCapabilityChecks({ adapter, cfg, identity, imageUrl, timeoutMs = 45000, onlyVision = false, onProgress = () => {} }) {
  if (!adapter || typeof adapter.streamChatCompletions !== 'function') throw new Error('Local adapter is required');
  const secrets = [cfg.apiKey];
  const capabilities = adapter.resolveModelCapabilities(cfg);
  const checks = {};
  const calls = [];
  let requestCount = 0;
  async function invoke(name, options) {
    onProgress(name);
    const started = Date.now();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    let firstTextMs = null, textEvents = 0, reasoningEvents = 0, prepared = null;
    let result, requestShape = null;
    requestCount++;
    try {
      if (typeof adapter.prepareChatRequest === 'function') {
        const probe = adapter.prepareChatRequest({ ...options, cfg, identity }, { stream: true });
        try {
          if (probe.ok) {
            const body = JSON.parse(probe.body);
            let images = 0;
            const visit = value => {
              if (!value || typeof value !== 'object') return;
              if (['image', 'image_url', 'input_image'].includes(value.type)) images++;
              for (const child of Object.values(value)) if (typeof child === 'object') visit(child);
            };
            visit(body.messages || body.input);
            requestShape = { imageBlocks: images, tools: Array.isArray(body.tools) ? body.tools.length : 0,
              maxOutputTokens: body.max_output_tokens ?? body.max_completion_tokens ?? body.max_tokens ?? null };
          }
        } finally { probe.restoreProxyEnv?.(); }
      }
      result = await adapter.streamChatCompletions({
        ...options, cfg: { ...cfg, timeoutMs }, identity, signal: controller.signal,
        onPrepDone: info => { prepared = info; },
        onTextDelta: value => { if (value) { textEvents++; firstTextMs ??= Date.now() - started; } },
        onReasoningDelta: value => { if (value) reasoningEvents++; }
      });
    } catch (error) { result = { ok: false, error: error.message }; }
    finally { clearTimeout(timer); }
    const row = {
      name, accepted: result.status >= 200 && result.status < 300,
      adapterOk: result.ok === true, httpStatus: Number(result.status) || 0,
      durationMs: Date.now() - started, firstTextMs, textEvents, reasoningEvents,
      finishReason: String(result.finishReason || ''), usage: numericUsage(result.cacheUsage),
      protocol: prepared?.protocol || capabilities.protocol,
      toolCount: Array.isArray(result.toolCalls) ? result.toolCalls.length : 0,
      requestShape,
      error: safeError(result.error, secrets)
    };
    calls.push(row);
    return { result, row };
  }
  async function checkVision() {
    if (capabilities.vision === false) checks.vision = { status: 'not-tested', reason: 'Vision is disabled by the binding or capability rule.' };
    else if (!imageUrl) checks.vision = { status: 'not-tested', reason: 'No synthetic image supplied.' };
    else {
      const vision = await invoke('vision', { messages: [{ role: 'user', content: [
        { type: 'text', text: 'What is the dominant color of the attached image? Reply with exactly one of: RED, GREEN, BLUE, WHITE, BLACK.' },
        { type: 'image_url', image_url: { url: imageUrl } }
      ] }] });
      const answer = String(vision.result.text || '').trim().toUpperCase();
      checks.vision = {
        status: vision.result.ok && answer === 'BLUE' && vision.row.requestShape?.imageBlocks !== 0 ? 'verified' : 'failed',
        exactAnswerMatched: answer === 'BLUE', responseChars: answer.length,
        reportedColor: ['RED', 'GREEN', 'BLUE', 'WHITE', 'BLACK'].includes(answer) ? answer : null,
        reportsMissingImage: /(?:cannot|can't|unable to|do not|don't|not able to).{0,50}(?:see|view|access|attached|image)|no image.{0,30}(?:attached|provided)|(?:无法|不能).{0,20}(?:查看|看到|访问|识别).{0,10}(?:图片|图像)/i.test(answer),
        evidence: 'The color is specified only in the synthetic image; one image is not a comprehensive vision benchmark.'
      };
    }
  }
  if (onlyVision) { await checkVision(); return { schemaVersion: 1, checks, calls, requestCount }; }
  const marker = 'PROBE_' + crypto.randomBytes(8).toString('hex');
  const basic = await invoke('streamingText', { messages: [{ role: 'user', content: 'Reply with exactly ' + marker + '. No explanation.' }] });
  checks.streamingText = {
    status: basic.result.ok && basic.row.textEvents > 0 && String(basic.result.text || '').trim() === marker ? 'verified' : 'failed',
    evidence: 'Successful adapter result, text callback and exact synthetic marker are required.'
  };
  checks.reasoningParameters = {
    status: basic.row.accepted && basic.result.ok ? 'accepted' : 'unconfirmed',
    mapping: typeof adapter.reasoningCapabilityDiagnostic === 'function' ? adapter.reasoningCapabilityDiagnostic(identity, cfg) : null,
    reasoningObserved: basic.row.reasoningEvents > 0,
    evidence: 'HTTP acceptance and reasoning text do not prove computation effort or that a parameter was honored.'
  };
  if (!basic.result.ok) {
    for (const name of ['toolCalls', 'multipleToolCalls', 'toolContinuation', 'vision']) checks[name] = { status: 'not-tested', reason: 'Initial request failed.' };
    return { schemaVersion: 1, checks, calls, requestCount };
  }
  const tools = [{ type: 'function', function: {
    name: 'capability_probe', description: 'Read a synthetic test value by slot. No real operation is performed.',
    parameters: { type: 'object', properties: { slot: { type: 'string', enum: ['A', 'B'] } }, required: ['slot'], additionalProperties: false }
  } }];
  const prompt = { role: 'user', content: 'Call capability_probe once for slot A and once for slot B. Both values are necessary. Do not invent the values or answer in prose.' };
  const tool = await invoke('toolCalls', { messages: [prompt], tools, toolChoice: 'auto' });
  const returned = Array.isArray(tool.result.toolCalls) ? tool.result.toolCalls : [];
  const ids = new Set();
  const slots = [];
  const valid = returned.length > 0 && returned.every(call => {
    let args;
    try { args = JSON.parse(call.arguments_json); } catch { return false; }
    if (!call.id || ids.has(call.id) || call.name !== 'capability_probe' || !['A', 'B'].includes(args.slot) || Object.keys(args).some(key => key !== 'slot')) return false;
    ids.add(call.id); slots.push(args.slot); return true;
  });
  checks.toolCalls = { status: tool.result.ok && valid ? 'verified' : 'failed', evidence: 'Tool name, distinct IDs and schema-valid JSON arguments are required.' };
  checks.multipleToolCalls = { status: tool.result.ok && valid && returned.length === 2 && new Set(slots).size === 2 ? 'verified' : 'unconfirmed', evidence: 'Two distinct calls for A and B in one model response; execution concurrency is not tested.' };
  if (tool.result.ok && valid) {
    const values = returned.map(() => 'VALUE_' + crypto.randomBytes(8).toString('hex'));
    const assistant = {
      role: 'assistant', content: String(tool.result.text || ''),
      ...(tool.result.reasoning ? { reasoning_content: tool.result.reasoning } : {}),
      ...(tool.result.signature ? { reasoning_signature: tool.result.signature } : {}),
      tool_calls: returned.map(call => ({ id: call.id, type: 'function', function: { name: call.name, arguments: call.arguments_json } }))
    };
    const follow = await invoke('toolContinuation', {
      messages: [prompt, assistant, ...returned.map((call, index) => ({ role: 'tool', tool_call_id: call.id, content: JSON.stringify({ value: values[index] }) })),
        { role: 'user', content: 'Return all values from the tool results, separated by spaces. Do not call tools again.' }],
      tools, toolChoice: 'auto'
    });
    checks.toolContinuation = {
      status: follow.result.ok && !(follow.result.toolCalls || []).length && values.every(value => String(follow.result.text || '').includes(value)) ? 'verified' : 'failed',
      evidence: 'A second real request must recover unpredictable values supplied only in matching tool results; reasoning and signature follow the existing adapter path.'
    };
  } else checks.toolContinuation = { status: 'not-tested', reason: 'No valid tool response to continue.' };
  await checkVision();
  return { schemaVersion: 1, checks, calls, requestCount };
}

module.exports = { runCapabilityChecks, safeError };
