'use strict';

const { splitInlineReasoningText } = require('./inline-reasoning.cjs');

const DEFAULTS = Object.freeze({
  maxTailChars: 8192,
  minRepetitionChars: 1536,
  minCrossChannelChars: 1200,
  scanEveryChars: 192
});

function normalizeForHealth(value) {
  return String(value == null ? '' : value)
    .replace(/[\u200b-\u200d\ufeff]/g, '')
    .replace(/\r\n?/g, '\n')
    .replace(/[\t \f\v]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function boundedTail(value, maxChars) {
  const text = String(value || '');
  return text.length > maxChars ? text.slice(-maxChars) : text;
}

function repeatedSuffixEvidence(value, options = {}) {
  const maxTailChars = options.maxTailChars || DEFAULTS.maxTailChars;
  const minChars = options.minRepetitionChars || DEFAULTS.minRepetitionChars;
  const text = boundedTail(normalizeForHealth(value), maxTailChars);
  if (text.length < minChars) return null;

  // Candidate periods come from prior occurrences of the current suffix. This
  // avoids an O(n * maxPeriod) scan for every streaming delta.
  const anchorSize = Math.min(40, Math.max(20, Math.floor(text.length / 80)));
  const anchor = text.slice(-anchorSize);
  const candidates = new Set();
  let searchFrom = text.length - anchorSize - 1;
  while (searchFrom >= 0 && candidates.size < 72) {
    const found = text.lastIndexOf(anchor, searchFrom);
    if (found < 0) break;
    const period = text.length - anchorSize - found;
    if (period >= 12 && period <= 1024) candidates.add(period);
    searchFrom = found - 1;
  }

  for (const period of candidates) {
    const span = Math.min(text.length, period * 10, 6144);
    const repeats = span / period;
    if (span < minChars || repeats < 5) continue;
    const start = text.length - span;
    let compared = 0;
    let matched = 0;
    for (let index = start + period; index < text.length; index += 1) {
      compared += 1;
      if (text[index] === text[index - period]) matched += 1;
    }
    const ratio = compared ? matched / compared : 0;
    if (ratio >= 0.965) {
      return { kind: 'periodic-repetition', period, span, repeats: Math.floor(repeats), ratio };
    }
  }

  // A low-diversity shingle fallback catches short alternating phrases whose
  // punctuation or whitespace changes slightly from cycle to cycle.
  const sample = text.slice(-Math.min(text.length, 6144));
  const shingles = [];
  for (let index = 0; index + 48 <= sample.length; index += 24) {
    shingles.push(sample.slice(index, index + 48));
  }
  if (shingles.length >= 64) {
    const uniqueRatio = new Set(shingles).size / shingles.length;
    if (uniqueRatio <= 0.16) {
      return { kind: 'low-diversity-repetition', span: sample.length, uniqueRatio };
    }
  }
  return null;
}

function shingleSet(value) {
  const text = boundedTail(normalizeForHealth(value), 4096);
  const result = new Set();
  for (let index = 0; index + 32 <= text.length; index += 16) {
    result.add(text.slice(index, index + 32));
  }
  return result;
}

function crossChannelEvidence(first, second, options = {}) {
  const minChars = options.minCrossChannelChars || DEFAULTS.minCrossChannelChars;
  const a = boundedTail(normalizeForHealth(first), 4096);
  const b = boundedTail(normalizeForHealth(second), 4096);
  if (a.length < minChars || b.length < minChars) return null;
  const lengthRatio = Math.min(a.length, b.length) / Math.max(a.length, b.length);
  if (lengthRatio < 0.72) return null;
  const aSet = shingleSet(a);
  const bSet = shingleSet(b);
  if (!aSet.size || !bSet.size) return null;
  let intersection = 0;
  for (const item of aSet) if (bSet.has(item)) intersection += 1;
  const dice = (2 * intersection) / (aSet.size + bSet.size);
  return dice >= 0.88 ? { kind: 'cross-channel-duplicate', dice, lengthRatio } : null;
}

function createStreamOutputGuard(options = {}) {
  const config = { ...DEFAULTS, ...options };
  const state = {
    text: '',
    reasoning: '',
    seenSinceScan: { text: 0, reasoning: 0 },
    tripped: null,
    duplicateReasoning: false
  };

  function push(channel, delta) {
    const key = channel === 'reasoning' ? 'reasoning' : 'text';
    const chunk = String(delta || '');
    if (!chunk) return snapshot(key);
    state[key] = boundedTail(state[key] + chunk, config.maxTailChars);
    state.seenSinceScan[key] += chunk.length;

    if (!state.tripped && state.seenSinceScan[key] >= config.scanEveryChars) {
      state.seenSinceScan[key] = 0;
      const repetition = repeatedSuffixEvidence(state[key], config);
      if (repetition) state.tripped = { channel: key, ...repetition };
    }
    if (!state.duplicateReasoning && crossChannelEvidence(state.text, state.reasoning, config)) {
      state.duplicateReasoning = true;
    }
    return snapshot(key);
  }

  function snapshot(channel) {
    return {
      tripped: state.tripped,
      suppress: channel === 'reasoning' && state.duplicateReasoning,
      duplicateReasoning: state.duplicateReasoning
    };
  }

  return {
    push,
    snapshot: () => ({
      tripped: state.tripped,
      duplicateReasoning: state.duplicateReasoning,
      textChars: state.text.length,
      reasoningChars: state.reasoning.length
    })
  };
}

function textFromValue(value, depth = 0) {
  if (value == null || depth > 5) return '';
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) return value.map(item => textFromValue(item, depth + 1)).filter(Boolean).join('\n');
  if (typeof value !== 'object') return '';
  return ['text', 'content', 'thinking', 'reasoning', 'reasoning_content', 'output']
    .filter(key => Object.prototype.hasOwnProperty.call(value, key))
    .map(key => textFromValue(value[key], depth + 1))
    .filter(Boolean)
    .join('\n');
}

function hasToolCalls(message) {
  if (!message || typeof message !== 'object') return false;
  if (Array.isArray(message.tool_calls) && message.tool_calls.length) return true;
  return Array.isArray(message.content) && message.content.some(block => {
    const type = String(block && block.type || '').toLowerCase();
    return type === 'tool_use' || type === 'tool_call';
  });
}

function decodeXmlText(value) {
  return String(value || '')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function toolNamesFromDefinitions(tools) {
  const names = new Set();
  for (const tool of Array.isArray(tools) ? tools : []) {
    const name = String(tool && (tool.name || tool.function && tool.function.name) || '').trim();
    if (name) names.add(name);
  }
  return names;
}

function toolSchemasFromDefinitions(tools) {
  const schemas = new Map();
  for (const tool of Array.isArray(tools) ? tools : []) {
    const name = String(tool && (tool.name || tool.function && tool.function.name) || '').trim();
    const schema = tool && (tool.input_schema || tool.parameters || tool.function && tool.function.parameters);
    if (name) schemas.set(name, schema && typeof schema === 'object' ? schema : null);
  }
  return schemas;
}

function validateAndCoerceArguments(args, schema) {
  if (!schema || typeof schema !== 'object') return { ok: true, args };
  const properties = schema.properties && typeof schema.properties === 'object' ? schema.properties : null;
  const required = new Set(Array.isArray(schema.required) ? schema.required.map(String) : []);
  for (const name of required) {
    if (!Object.prototype.hasOwnProperty.call(args, name)) return { ok: false, reason: 'missing-required-parameter' };
  }
  const result = Object.create(null);
  for (const [name, raw] of Object.entries(args)) {
    if (properties && !Object.prototype.hasOwnProperty.call(properties, name)) return { ok: false, reason: 'unknown-parameter' };
    const fieldSchema = properties && properties[name] || null;
    const declared = fieldSchema && fieldSchema.type;
    const types = Array.isArray(declared) ? declared : declared ? [declared] : [];
    const type = types.find(item => item !== 'null') || '';
    let value = raw;
    try {
      if (type === 'integer') {
        if (!/^-?\d+$/.test(raw)) throw new Error('integer');
        value = Number.parseInt(raw, 10);
      } else if (type === 'number') {
        if (!/^-?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i.test(raw)) throw new Error('number');
        value = Number(raw);
      } else if (type === 'boolean') {
        if (!/^(?:true|false)$/i.test(raw)) throw new Error('boolean');
        value = /^true$/i.test(raw);
      } else if (type === 'object' || type === 'array') {
        value = JSON.parse(raw);
        if (type === 'array' ? !Array.isArray(value) : !value || typeof value !== 'object' || Array.isArray(value)) throw new Error(type);
      }
    } catch {
      return { ok: false, reason: 'invalid-parameter-type' };
    }
    if (fieldSchema && Array.isArray(fieldSchema.enum) && !fieldSchema.enum.includes(value)) return { ok: false, reason: 'invalid-parameter-enum' };
    result[name] = value;
  }
  return { ok: true, args: result };
}

function containsTextToolProtocol(value) {
  const text = String(value || '');
  const invocations = text.match(/(?:^|\n)\s*<invoke\s+name\s*=\s*["'][A-Za-z0-9_.:-]{1,128}["']\s*>/ig) || [];
  return invocations.length >= 2
    && /<parameter\s+name\s*=\s*["'][A-Za-z0-9_.:-]{1,128}["']\s*>/i.test(text);
}

function textBeforeToolProtocol(value) {
  const text = String(value || '');
  const match = /(?:^|\n)\s*<invoke\s+name\s*=\s*["'][A-Za-z0-9_.:-]{1,128}["']\s*>/i.exec(text);
  return match ? text.slice(0, match.index + (match[0].startsWith('\n') ? 1 : 0)) : text;
}

function createTextToolProtocolFirewall(options = {}) {
  const allowedTools = options.allowedTools instanceof Set
    ? new Set(options.allowedTools)
    : toolNamesFromDefinitions(options.allowedTools);
  const toolSchemas = options.allowedTools instanceof Set ? new Map() : toolSchemasFromDefinitions(options.allowedTools);
  const enabled = allowedTools.size > 0;
  const maxCalls = Math.max(1, Math.min(64, Number(options.maxCalls) || 24));
  const maxBufferedChars = Math.max(4096, Math.min(262144, Number(options.maxBufferedChars) || 65536));
  const maxArgumentChars = Math.max(1024, Math.min(131072, Number(options.maxArgumentChars) || 32768));
  let lookbehind = '';
  let visibleText = '';
  let capture = '';
  let capturing = false;
  let tripped = null;
  let fenced = false;

  function noteFences(text) {
    const matches = String(text || '').match(/```/g);
    if (matches && matches.length % 2) fenced = !fenced;
  }

  function markerIndex(text) {
    const matcher = /(?:^|\n)([ \t]*<invoke\s+name\s*=\s*["'][A-Za-z0-9_.:-]{1,128}["']\s*>)/ig;
    let match;
    while ((match = matcher.exec(text))) {
      const index = match.index + (match[0].startsWith('\n') ? 1 : 0);
      const before = text.slice(0, index);
      let inFence = fenced;
      const fences = before.match(/```/g);
      if (fences && fences.length % 2) inFence = !inFence;
      if (!inFence) return index;
    }
    return -1;
  }

  function parseCapture(final = false) {
    const calls = [];
    let cursor = 0;
    const whitespace = /\s/y;
    const open = /<invoke\s+name\s*=\s*(["'])([A-Za-z0-9_.:-]{1,128})\1\s*>/iy;
    const parameter = /<parameter\s+name\s*=\s*(["'])([A-Za-z0-9_.:-]{1,128})\1\s*>([\s\S]*?)<\/parameter\s*>/iy;
    const close = /<\/invoke\s*>/iy;

    function skipWhitespace() {
      whitespace.lastIndex = cursor;
      while (whitespace.exec(capture)) {
        cursor = whitespace.lastIndex;
        whitespace.lastIndex = cursor;
      }
    }

    skipWhitespace();
    while (cursor < capture.length) {
      open.lastIndex = cursor;
      const invocation = open.exec(capture);
      if (!invocation) {
        if (!final) {
          const rest = capture.slice(cursor).trimStart().toLowerCase();
          if ('<invoke'.startsWith(rest) || rest.startsWith('<invoke') && !/>/.test(rest)) return { calls, incomplete: true };
        }
        return { calls, error: 'malformed-invocation' };
      }
      const name = invocation[2];
      if (!allowedTools.size || !allowedTools.has(name)) return { calls, error: 'unknown-tool' };
      cursor = open.lastIndex;
      const args = Object.create(null);
      let argumentChars = 0;
      while (true) {
        skipWhitespace();
        close.lastIndex = cursor;
        if (close.exec(capture)) {
          cursor = close.lastIndex;
          break;
        }
        parameter.lastIndex = cursor;
        const field = parameter.exec(capture);
        if (!field) {
          if (!final) {
            const rest = capture.slice(cursor).trimStart().toLowerCase();
            const partialParameter = '<parameter'.startsWith(rest) || rest.startsWith('<parameter') && !/<\/parameter\s*>/i.test(rest);
            const partialClose = '</invoke'.startsWith(rest) || rest.startsWith('</invoke') && !/>/.test(rest);
            if (partialParameter || partialClose) return { calls, incomplete: true };
          }
          return { calls, error: 'malformed-parameter' };
        }
        const fieldName = field[2];
        if (Object.prototype.hasOwnProperty.call(args, fieldName)) return { calls, error: 'duplicate-parameter' };
        const fieldValue = decodeXmlText(field[3]);
        argumentChars += fieldValue.length;
        if (argumentChars > maxArgumentChars) return { calls, error: 'arguments-too-large' };
        args[fieldName] = fieldValue;
        cursor = parameter.lastIndex;
      }
      calls.push({
        id: `call_text_protocol_${Date.now().toString(36)}_${calls.length}`,
        name,
        arguments_json: ''
      });
      const validated = validateAndCoerceArguments(args, toolSchemas.get(name));
      if (!validated.ok) return { calls: [], error: validated.reason };
      calls[calls.length - 1].arguments_json = JSON.stringify(validated.args);
      if (calls.length > maxCalls) return { calls: [], error: 'too-many-calls' };
      skipWhitespace();
    }
    return { calls, incomplete: false };
  }

  function push(delta) {
    if (tripped) return { emit: '', capturing, tripped };
    const chunk = String(delta || '');
    if (!chunk) return { emit: '', capturing, tripped: null };
    if (!enabled) {
      visibleText += chunk;
      return { emit: chunk, capturing: false, tripped: null };
    }
    if (capturing) {
      capture += chunk;
      if (capture.length > maxBufferedChars) {
        tripped = { kind: 'text-tool-protocol', reason: 'buffer-limit', protocol: 'xml-invoke' };
      } else if ((capture.match(/(?:^|\n)\s*<invoke\s+name\s*=/ig) || []).length > maxCalls) {
        tripped = { kind: 'text-tool-protocol', reason: 'too-many-calls', protocol: 'xml-invoke' };
      } else {
        const parsed = parseCapture(false);
        if (parsed.error) tripped = { kind: 'text-tool-protocol', reason: parsed.error, protocol: 'xml-invoke' };
      }
      return { emit: '', capturing, tripped };
    }

    const combined = lookbehind + chunk;
    const start = markerIndex(combined);
    if (start >= 0) {
      const emit = combined.slice(0, start);
      noteFences(emit);
      visibleText += emit;
      capture = combined.slice(start);
      lookbehind = '';
      capturing = true;
      if (capture.length > maxBufferedChars) {
        tripped = { kind: 'text-tool-protocol', reason: 'buffer-limit', protocol: 'xml-invoke' };
      } else if ((capture.match(/(?:^|\n)\s*<invoke\s+name\s*=/ig) || []).length > maxCalls) {
        tripped = { kind: 'text-tool-protocol', reason: 'too-many-calls', protocol: 'xml-invoke' };
      } else {
        const parsed = parseCapture(false);
        if (parsed.error) tripped = { kind: 'text-tool-protocol', reason: parsed.error, protocol: 'xml-invoke' };
      }
      return { emit, capturing, tripped };
    }

    const keep = Math.min(192, combined.length);
    const emit = combined.slice(0, combined.length - keep);
    lookbehind = combined.slice(combined.length - keep);
    noteFences(emit);
    visibleText += emit;
    return { emit, capturing, tripped: null };
  }

  function finalize() {
    if (tripped) return { emit: '', calls: [], captured: capturing, tripped };
    if (!capturing) {
      const emit = lookbehind;
      visibleText += emit;
      lookbehind = '';
      return { emit, calls: [], captured: false, tripped: null };
    }
    const parsed = parseCapture(true);
    if (parsed.error || parsed.incomplete || !parsed.calls.length) {
      tripped = { kind: 'text-tool-protocol', reason: parsed.error || 'incomplete-invocation', protocol: 'xml-invoke' };
      return { emit: '', calls: [], captured: true, tripped };
    }
    return { emit: '', calls: parsed.calls, captured: true, tripped: null };
  }

  return {
    push,
    finalize,
    visibleText: () => visibleText,
    snapshot: () => ({ capturing, bufferedChars: capture.length, tripped })
  };
}

function sanitizeAssistantHistory(messages, options = {}) {
  const source = Array.isArray(messages) ? messages : [];
  const result = [];
  let removed = 0;
  let reasoningDeduped = 0;
  let protocolRemoved = 0;
  let protocolStripped = 0;
  let inlineReasoningStripped = 0;
  for (const original of source) {
    if (!original || String(original.role || '').toLowerCase() !== 'assistant') {
      result.push(original);
      continue;
    }
    let content = textFromValue(original.content);
    const reasoning = textFromValue(original.reasoning_content || original.reasoning || original.thinking);
    let candidate = original;
    if (typeof original.content === 'string') {
      const inline = splitInlineReasoningText(original.content);
      if (inline.matched) {
        candidate = { ...original, content: inline.text };
        content = inline.text;
        inlineReasoningStripped += 1;
        if (!content && !hasToolCalls(original)) {
          removed += 1;
          continue;
        }
      }
    }
    if (reasoning && containsTextToolProtocol(reasoning)) {
      candidate = { ...candidate };
      delete candidate.reasoning_content;
      delete candidate.reasoning;
      delete candidate.thinking;
      reasoningDeduped += 1;
    }
    if (containsTextToolProtocol(content)) {
      if (!hasToolCalls(original)) {
        removed += 1;
        protocolRemoved += 1;
        continue;
      }
      candidate = { ...candidate, content: typeof candidate.content === 'string' ? textBeforeToolProtocol(candidate.content) : '' };
      protocolStripped += 1;
    }
    if (hasToolCalls(original)) {
      result.push(candidate);
      continue;
    }
    const repetition = repeatedSuffixEvidence(content, options) || repeatedSuffixEvidence(reasoning, options);
    if (repetition) {
      removed += 1;
      continue;
    }
    if (reasoning && crossChannelEvidence(content, reasoning, options)) {
      const clone = { ...candidate };
      delete clone.reasoning_content;
      delete clone.reasoning;
      delete clone.thinking;
      result.push(clone);
      reasoningDeduped += 1;
      continue;
    }
    result.push(candidate);
  }
  return { messages: result, removed, reasoningDeduped, protocolRemoved, protocolStripped, inlineReasoningStripped };
}

module.exports = {
  normalizeForHealth,
  repeatedSuffixEvidence,
  crossChannelEvidence,
  createStreamOutputGuard,
  containsTextToolProtocol,
  createTextToolProtocolFirewall,
  sanitizeAssistantHistory
};
