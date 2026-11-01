'use strict';

// Shared provider semantics. Devin wire encoding and tool mapping remain in
// their adapters; this module owns event classification and call lifecycle.
const { randomUUID } = require('node:crypto');
const { StringDecoder } = require('node:string_decoder');
const recentCalls = [];
const MAX_RECENT_CALLS = 128;

function parseSseBuffer(buffer, { flush = false } = {}) {
  const frames = String(buffer || '').split(/\r?\n\r?\n/);
  const rest = flush ? '' : frames.pop();
  const events = [];
  for (const frame of frames) {
    let event = '';
    const data = [];
    for (const line of frame.split(/\r?\n/)) {
      if (line.startsWith('event:')) event = line.slice(6).trim();
      if (line.startsWith('data:')) data.push(line.slice(5).replace(/^ /, ''));
    }
    const value = data.join('\n').trim();
    if (!value) continue;
    if (value === '[DONE]') { events.push({ done: true, type: 'done', data: null }); continue; }
    try {
      const parsed = JSON.parse(value);
      if (!parsed || typeof parsed !== 'object') continue;
      const type = parsed.error ? 'chat.completions.error' : Array.isArray(parsed.choices) ? 'chat.completions.chunk' : parsed.type || event;
      events.push({ done: false, type, event: event || parsed.type || type, data: parsed, ...(parsed.error ? { error: parsed.error } : {}) });
    } catch {
      // Malformed data cannot fabricate a completion. EOF validation will
      // reject a stream that never supplies a valid terminal event.
    }
  }
  return { events, rest };
}

function text(value) {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(part => typeof part === 'string' ? part : part && (part.text || part.content) || '').join('');
  return '';
}

function normalizeUsage(value, protocol) {
  if (!value || typeof value !== 'object') return null;
  const number = value => Math.max(0, Number(value) || 0);
  return {
    inputTokens: number(value.input_tokens ?? value.prompt_tokens),
    outputTokens: number(value.output_tokens ?? value.completion_tokens),
    cacheReadInputTokens: number(value.cache_read_input_tokens ?? value.prompt_cache_hit_tokens ?? value.input_tokens_details?.cached_tokens ?? value.prompt_tokens_details?.cached_tokens),
    cacheCreationInputTokens: number(value.cache_creation_input_tokens ?? value.prompt_tokens_details?.cache_creation_tokens),
    inputIncludesCache: protocol !== 'anthropic'
  };
}

function normalizeEvents(protocol, wire = {}) {
  const data = wire.data && typeof wire.data === 'object' ? wire.data : {};
  const type = data.type || wire.event || wire.type || '';
  const events = [];
  const delta = (type, value, metadata = {}) => { if (typeof value === 'string' && value.length) events.push({ type, delta: value, ...metadata }); };
  const usage = value => { const normalized = normalizeUsage(value, protocol); if (normalized) events.push({ type: 'usage', usage: normalized }); };
  const done = reason => events.push({ type: 'done', reason: String(reason || 'stop') });
  if (wire.error || data.error || type === 'error' || type === 'response.failed') {
    events.push({ type: 'error' });
    return events;
  }
  if (protocol === 'anthropic') {
    usage(data.usage || data.message?.usage);
    if (type === 'content_block_start') {
      const block = data.content_block || {};
      if (block.type === 'tool_use') events.push({ type: 'tool_start', index: data.index, callId: block.id, name: block.name });
      if (block.type === 'thinking') events.push({ type: 'thinking_start' });
      delta('text_delta', block.text);
      delta('thinking_delta', block.thinking);
    }
    if (type === 'content_block_delta') {
      delta('text_delta', data.delta?.text);
      delta('thinking_delta', data.delta?.thinking);
      delta('signature_delta', data.delta?.signature);
      delta('tool_delta', data.delta?.partial_json, { index: data.index });
    }
    if (data.delta?.stop_reason) events.push({ type: 'finish_reason', reason: data.delta.stop_reason });
    if (type === 'content_block_stop') events.push({ type: 'block_end', index: data.index });
    if (type === 'message_stop') done();
  } else if (protocol === 'openai_responses') {
    usage(data.response?.usage || data.usage);
    if (type === 'response.output_text.delta') delta('text_delta', data.delta);
    if (/^response.reasoning(?:_summary)?_text.delta$/.test(type)) delta('thinking_delta', data.delta);
    if (type === 'response.output_item.added' && data.item?.type === 'function_call') {
      events.push({ type: 'tool_start', index: data.output_index, callId: data.item.call_id || data.item.id, name: data.item.name });
    }
    if (type === 'response.function_call_arguments.delta') delta('tool_delta', data.delta, { index: data.output_index, callId: data.call_id || data.item_id });
    if (type === 'response.output_item.done' && data.item?.type === 'function_call') events.push({ type: 'tool_end', index: data.output_index, callId: data.item.call_id || data.item.id });
    if (type === 'response.completed') {
      const hasTools = data.response?.output?.some(item => item.type === 'function_call');
      done(hasTools ? 'tool_calls' : 'stop');
    }
    if (type === 'response.incomplete') done('length');
    // [DONE] alone does not prove a Responses invocation completed.
  } else {
    usage(data.usage);
    const choice = data.choices?.[0];
    const content = choice?.delta || choice?.message || {};
    delta('text_delta', text(content.content));
    delta('thinking_delta', text(content.reasoning_content || content.reasoning || content.reasoning_text));
    for (const call of content.tool_calls || []) {
      if (call.id || call.function?.name) events.push({ type: 'tool_start', index: call.index, callId: call.id, name: call.function?.name });
      delta('tool_delta', call.function?.arguments, { index: call.index, callId: call.id });
    }
    if (choice?.finish_reason) done(choice.finish_reason);
    else if (wire.done) done();
  }
  return events;
}

function createCall(options = {}) {
  const now = options.now || Date.now;
  const startedAt = now();
  const row = {
    callId: randomUUID(), requestId: String(options.requestId || ''),
    sessionId: String(options.sessionId || ''), source: options.source || 'local',
    protocol: options.protocol || 'openai', model: String(options.model || ''),
    attempt: Number(options.attempt) || 1, startedAt,
    headersMs: null, firstValidEventMs: null, firstTextMs: null,
    durationMs: null, status: 'running', httpStatus: 0, finishReason: '',
    eventCount: 0, textChars: 0, thinkingChars: 0, toolStarts: 0, usage: null
  };
  let terminal = false;
  let failed = false;
  let ended = false;
  let cancelled = false;
  const toolIndexes = new Set();
  const snapshot = () => ({ ...row, usage: row.usage && { ...row.usage } });
  const finish = (status, reason = '') => {
    if (ended) return false;
    ended = true;
    cancelled = status === 'cancelled';
    row.status = status;
    row.durationMs = Math.max(0, now() - startedAt);
    row.endReason = reason;
    const record = snapshot();
    recentCalls.unshift(record);
    recentCalls.length = Math.min(recentCalls.length, MAX_RECENT_CALLS);
    try { options.onRecord?.(record); } catch {}
    return true;
  };
  return {
    headers(status) { if (!ended) { row.httpStatus = Number(status) || 0; row.headersMs ??= Math.max(0, now() - startedAt); } },
    canDeliver() { return !ended && !cancelled && !options.signal?.aborted; },
    observe(wire) {
      if (ended || options.signal?.aborted) return false;
      const events = normalizeEvents(row.protocol, wire);
      // Usage can follow finish_reason. Late content cannot reopen a call.
      if ((terminal || failed) && events.some(event => event.type !== 'usage' && event.type !== 'done')) return false;
      for (const event of events) {
        row.eventCount += 1;
        if (['text_delta', 'thinking_start', 'thinking_delta', 'tool_start', 'tool_delta'].includes(event.type)) row.firstValidEventMs ??= Math.max(0, now() - startedAt);
        if (event.type === 'text_delta') { row.firstTextMs ??= Math.max(0, now() - startedAt); row.textChars += event.delta.length; }
        if (event.type === 'thinking_delta') row.thinkingChars += event.delta.length;
        if (event.type === 'tool_start') {
          const key = event.index ?? event.callId ?? event.name;
          if (!toolIndexes.has(key)) { toolIndexes.add(key); row.toolStarts += 1; }
        }
        if (event.type === 'finish_reason') row.finishReason = String(event.reason);
        if (event.type === 'done') { terminal = true; row.finishReason ||= event.reason; }
        if (event.type === 'error') failed = true;
        if (event.type === 'usage') {
          row.usage ||= { ...event.usage };
          for (const key of ['inputTokens', 'outputTokens', 'cacheReadInputTokens', 'cacheCreationInputTokens']) row.usage[key] = Math.max(row.usage[key] || 0, event.usage[key]);
        }
        try { options.onEvent?.(event); } catch {}
      }
      return true;
    },
    hasTerminal() { return terminal && !failed; },
    eofError() { return terminal && !failed ? '' : `${row.protocol} stream interrupted before terminal event`; },
    result(value) {
      if (ended) return;
      row.finishReason ||= String(value.finishReason || '');
      if (!value.streamed) {
        row.textChars = String(value.text || '').length;
        row.thinkingChars = String(value.reasoning || '').length;
        row.toolStarts = Array.isArray(value.toolCalls) ? value.toolCalls.length : 0;
        if (row.textChars || row.thinkingChars || row.toolStarts) row.firstValidEventMs ??= Math.max(0, now() - startedAt);
        if (row.textChars) row.firstTextMs ??= Math.max(0, now() - startedAt);
      }
      if (value.cacheUsage) row.usage = { ...value.cacheUsage };
    },
    cancel() { return finish('cancelled', 'aborted'); },
    finish,
    snapshot
  };
}

// Each HTTP attempt has its own call and captures its own request object.
// Retried/continued attempts invalidate old listeners without affecting other
// conversations, including parallel native subagents.
function createCascadeScope(response, writer, metadata = {}) {
  let generation = 0;
  let previous = null;
  if (typeof writer.fail === 'function') {
    const fail = writer.fail;
    writer.fail = function(message, ...rest) {
      const value = String(message || '');
      const reason = /timeout|超时/i.test(value) ? 'timeout'
        : /before terminal event/.test(value) ? 'missing-terminal' : 'upstream-error';
      previous?.call.finish('error', reason);
      return fail.call(this, message, ...rest);
    };
  }
  return {
    begin(protocol, attempt) {
      previous?.dispose();
      const current = ++generation;
      const call = createCall({ ...metadata, protocol, attempt });
      let request = null;
      let upstream = null;
      let disposed = false;
      const active = () => !disposed && current === generation && !response.destroyed && !response.writableEnded && !writer.wasClosedByClient() && !writer.wasFinalized();
      const close = () => {
        if (!response.writableEnded) call.cancel();
        else call.finish(call.hasTerminal() ? 'completed' : 'error', call.hasTerminal() ? call.snapshot().finishReason : 'missing-terminal');
        try { request?.destroy(); upstream?.destroy(); } catch {}
        dispose();
      };
      function dispose() {
        if (disposed) return;
        disposed = true;
        response.removeListener('close', close);
        if (call.snapshot().status === 'running') call.finish('cancelled', 'superseded');
        try { request?.destroy(); upstream?.destroy(); } catch {}
      }
      response.once('close', close);
      previous = { dispose, call };
      return {
        call, active,
        observe(wire) {
          if (wire.done && protocol !== 'openai' && !call.hasTerminal()) return false;
          return active() && call.observe(wire);
        },
        attach(value) {
          request = value;
          if (!active()) { close(); return; }
          request.once('error', () => { call.finish('error', 'request-error'); });
          request.once('response', value => {
            upstream = value;
            if (!active()) { value.destroy(); return; }
            call.headers(value.statusCode);
            value.once('aborted', () => call.finish('error', 'transport-aborted'));
            value.once('error', () => call.finish('error', 'transport-error'));
            value.once('end', () => {
              if (call.snapshot().status === 'running') call.finish(call.hasTerminal() ? 'completed' : 'error', call.hasTerminal() ? call.snapshot().finishReason : value.statusCode === 200 ? 'missing-terminal' : 'http-error');
              dispose();
            });
          });
        }
      };
    }
  };
}

function getRecentCalls() { return recentCalls.map(row => ({ ...row, usage: row.usage && { ...row.usage } })); }
async function* utf8Chunks(source) {
  const decoder = new StringDecoder('utf8');
  for await (const chunk of source) yield decoder.write(chunk);
  // Parse a final SSE frame even when the provider omits its blank separator.
  yield decoder.end() + '\n\n';
}
module.exports = { parseSseBuffer, normalizeEvents, normalizeUsage, createCall, createCascadeScope, getRecentCalls, utf8Chunks };
