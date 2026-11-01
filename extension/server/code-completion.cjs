'use strict';

// Shared by the HTTP/1 hybrid gateway and the HTTP/2 inference gateway.
// Wire fields follow exa.api_server_pb and exa.codeium_common_pb in Devin Next.
const http = require('node:http');
const https = require('node:https');
const zlib = require('node:zlib');
const { randomUUID } = require('node:crypto');
const { StringDecoder } = require('node:string_decoder');
const { parseSseBuffer, normalizeEvents } = require('./provider-stream.cjs');
const reasoning = require('./reasoning-controls.cjs');
const METHODS = new Set(['GetCompletions', 'GetStreamingCompletions']);
const SYSTEM = 'You are a code completion engine. Return only the code to insert at the cursor. Preserve whitespace and indentation. Do not repeat surrounding code. Do not include explanations or Markdown fences.';
const LIMIT = 1024 * 1024;

function field(no, value) {
  const bytes = typeof value === 'string' ? Buffer.from(value) : value;
  return Buffer.concat([varint(no * 8 + 2), varint(bytes.length), bytes]);
}
function varint(value) {
  let n = BigInt(value); const bytes = [];
  do { bytes.push(Number(n & 127n) | (n > 127n ? 128 : 0)); n >>= 7n; } while (n);
  return Buffer.from(bytes);
}
function number(no, value) { return Buffer.concat([varint(no * 8), varint(value)]); }
function fields(bytes) {
  let offset = 0; const result = [];
  function read() {
    let n = 0n;
    for (let shift = 0n; shift < 70n; shift += 7n) {
      if (offset >= bytes.length) throw Error('truncated protobuf');
      const b = bytes[offset++]; n |= BigInt(b & 127) << shift;
      if (!(b & 128)) { if (n > BigInt(Number.MAX_SAFE_INTEGER)) throw Error('protobuf integer too large'); return Number(n); }
    }
    throw Error('invalid protobuf varint');
  }
  while (offset < bytes.length) {
    const tag = read(), no = Math.floor(tag / 8), wire = tag & 7;
    if (!no) throw Error('invalid protobuf field');
    if (wire === 0) result.push({ no, wire, value: read() });
    else {
      const size = wire === 2 ? read() : wire === 1 ? 8 : wire === 5 ? 4 : -1;
      if (size < 0 || offset + size > bytes.length) throw Error('invalid protobuf length');
      result.push({ no, wire, value: bytes.subarray(offset, offset + size) }); offset += size;
    }
  }
  return result;
}
const get = (list, no, wire = 2) => list.find(f => f.no === no && f.wire === wire)?.value;
const string = (list, no) => get(list, no)?.toString('utf8') || '';
function unwrap(body, headers = {}) {
  if (/gzip/.test(headers['content-encoding'] || '')) body = zlib.gunzipSync(body, { maxOutputLength: 16 * LIMIT });
  if (body.length >= 5 && body[0] <= 1 && body.readUInt32BE(1) === body.length - 5) {
    const compressed = body[0] === 1; body = body.subarray(5);
    if (compressed) body = zlib.gunzipSync(body, { maxOutputLength: 16 * LIMIT });
  }
  return body;
}
function parseContext(body, headers) {
  const top = fields(unwrap(body, headers));
  // PromptComponents.document is authoritative; other_documents and metadata
  // must never be mistaken for code, even when they contain longer strings.
  const components = get(top, 5);
  const doc = components && get(fields(components), 1);
  if (doc) {
    const document = fields(doc), text = get(document, 3) || Buffer.alloc(0);
    let offset = get(document, 6, 0);
    // Proto3 omits a zero cursor offset. It means the start of the document.
    if (offset === undefined) offset = 0;
    if (offset > text.length) throw Error('cursor offset exceeds document length');
    // Document.cursor_offset is a UTF-8 byte offset, not a JS string index.
    if (offset < text.length && (text[offset] & 0xc0) === 0x80) throw Error('cursor splits UTF-8 character');
    return { prefix: text.subarray(0, offset).toString('utf8'), suffix: text.subarray(offset).toString('utf8'), language: string(document, 4) };
  }
  const request = get(top, 2);
  if (!request) throw Error('missing completion document and prompt');
  const prompt = string(fields(request), 2);
  // Legacy requests carry an already constructed FIM prompt.
  for (const [start, middle, end] of [['<fim_prefix>', '<fim_suffix>', '<fim_middle>'], ['<|fim_prefix|>', '<|fim_suffix|>', '<|fim_middle|>'], ['<PRE>', '<SUF>', '<MID>']]) {
    const a = prompt.lastIndexOf(start), b = prompt.indexOf(middle, a + start.length), c = prompt.indexOf(end, b + middle.length);
    if (a >= 0 && b >= 0 && c >= 0) return { prefix: prompt.slice(a + start.length, b), suffix: prompt.slice(b + middle.length, c), language: '' };
  }
  // Unknown prompt formats fail empty instead of completing telemetry or a
  // rendered prompt with instructions, paths and unrelated file contents.
  throw Error('unsupported completion prompt format');
}
function resolveRoute(config = {}, env = process.env) {
  const options = config.completion || {};
  if (options.enabled === false) return null;
  const bindings = [...Object.values(config.cascadeBindings || {}), ...Object.values(config.byokBindingsV2 || {}), ...Object.values(config.localBindings || {})].filter(b => b?.providerId && b?.modelId);
  const explicitProvider = String(options.providerId || '').trim();
  const explicitModel = String(options.model || env.COMPLETION_MODEL || '').trim();
  const binding = bindings.find(b => (!explicitProvider || b.providerId === explicitProvider) && (!explicitModel || b.modelId === explicitModel));
  const providerId = explicitProvider || binding?.providerId || config.defaultProviderId;
  const provider = config.providers?.[providerId];
  const model = explicitModel || binding?.modelId || config.defaultModel;
  if (!provider || !model) return null;
  const protocol = provider.protocol === 'anthropic' ? 'anthropic'
    : /responses/.test(provider.openaiApiPath || '') || /responses/.test(provider.protocol || '') ? 'openai_responses' : 'openai';
  const host = protocol === 'anthropic' ? provider.anthropicHost : provider.openaiHost;
  const apiKey = protocol === 'anthropic' ? provider.anthropicApiKey : provider.openaiApiKey;
  const apiPath = protocol === 'anthropic' ? provider.anthropicApiPath || '/messages' : provider.openaiApiPath || '/chat/completions';
  if (!host || !apiKey) return null;
  const url = new URL(/^https?:\/\//.test(host) ? host : (provider.useHttp ? 'http://' : 'https://') + host);
  url.pathname = apiPath; url.search = ''; url.hash = '';
  if (!['https:', 'http:'].includes(url.protocol)) return null;
  return { url, apiKey, model, protocol, timeoutMs: Math.min(30000, Math.max(100, Number(options.timeoutMs) || 15000)) };
}
function shouldHandle(config) {
  if (config.completion?.enabled === false) return false;
  // A user's explicit selection owns failures too; don't silently send code
  // to the official service if that selection was deleted or loses its key.
  return !!(config.completion?.providerId || config.completion?.model || resolveRoute(config));
}
function requestCode(route, context, signal) {
  const prompt = 'Language: ' + context.language + '\n<code_before_cursor>\n' + context.prefix.slice(-6000) + '\n</code_before_cursor>\n<code_after_cursor>\n' + context.suffix.slice(0, 1500) + '\n</code_after_cursor>\nReturn only a short insertion.';
  const messages = [{ role: 'system', content: SYSTEM }, { role: 'user', content: prompt }];
  const payload = route.protocol === 'anthropic'
    ? { model: route.model, system: SYSTEM, messages: messages.slice(1), stream: true, max_tokens: 256 }
    : route.protocol === 'openai_responses'
      ? { model: route.model, instructions: SYSTEM, input: [{ role: 'user', content: prompt }], stream: true, store: false, max_output_tokens: 256 }
      : { model: route.model, messages, stream: true, max_completion_tokens: 256 };
  if (route.protocol === 'openai') reasoning.applyChatControls(payload, { reasoningEffort: 'low' }, {
    model: route.model, protocol: route.protocol, reasoningDialect: reasoning.resolveDialect(route.model)
  });
  const body = Buffer.from(JSON.stringify(payload));
  return new Promise((resolve, reject) => {
    let settled = false, timer, previewTimer;
    const finish = (error, text) => { if (settled) return; settled = true; clearTimeout(timer); clearTimeout(previewTimer); error ? reject(error) : resolve(text); };
    const req = (route.url.protocol === 'http:' ? http : https).request(route.url, {
      method: 'POST', signal,
      headers: { 'content-type': 'application/json', 'content-length': body.length,
        ...(route.protocol === 'anthropic' ? { 'x-api-key': route.apiKey, 'anthropic-version': '2023-06-01' } : { authorization: 'Bearer ' + route.apiKey }) }
    }, res => {
      const chunks = []; let size = 0;
      const streaming = res.statusCode === 200 && /text\/event-stream/i.test(res.headers['content-type'] || '');
      const decoder = new StringDecoder('utf8'); let buffer = '', text = '';
      function preview() {
        if (/^\s*```[^\r\n]*$/.test(text)) return '';
        return cleanCode(text.replace(/^```[^\r\n]*\r?\n/, '').replace(/\r?\n```\s*$/, ''));
      }
      function deliver() { const code = preview(); if (!code.trim()) return; finish(null, code); res.destroy(); req.destroy(); }
      function consume(flush = false) {
        const parsed = parseSseBuffer(buffer, { flush }); buffer = parsed.rest;
        for (const wire of parsed.events) {
          if (settled) return;
          // Some Responses-compatible endpoints only include text in the
          // final response object instead of emitting text deltas.
          if (!text && wire.data?.type === 'response.completed') text = (wire.data.response?.output || []).filter(b => b.type === 'message').flatMap(b => b.content || []).filter(b => b.type === 'output_text').map(b => b.text).join('');
          for (const event of normalizeEvents(route.protocol, wire)) {
            if (event.type === 'error') { req.destroy(Error('completion upstream stream error')); return; }
            if (event.type === 'text_delta') {
              text += event.delta;
              const code = preview(), line = /\S[^\r\n]*\r?\n/.exec(code);
              if (line) { finish(null, code.slice(0, line.index + line[0].length)); res.destroy(); req.destroy(); return; }
              // Public inline completions return once, so deliver a useful
              // prefix promptly instead of waiting for the whole generation.
              if (!previewTimer && code.trim()) previewTimer = setTimeout(deliver, 250);
            }
            if (event.type === 'done') { finish(null, preview()); res.destroy(); req.destroy(); return; }
          }
        }
      }
      res.on('data', chunk => {
        if (settled) return;
        size += chunk.length;
        if (size > LIMIT) { req.destroy(Error('completion response too large')); return; }
        if (streaming) { buffer += decoder.write(chunk); consume(); }
        else chunks.push(chunk);
      });
      res.on('error', error => finish(error));
      res.on('end', () => {
        if (settled) return;
        if (res.statusCode !== 200) return finish(Error('completion upstream HTTP ' + res.statusCode));
        if (streaming) {
          buffer += decoder.end(); consume(true);
          if (!settled) finish(Error('completion stream ended without terminal event'));
          return;
        }
        try {
          const json = JSON.parse(Buffer.concat(chunks));
          const text = route.protocol === 'anthropic' ? (json.content || []).filter(b => b.type === 'text').map(b => b.text).join('')
            : route.protocol === 'openai_responses' ? (json.output || []).filter(b => b.type === 'message').flatMap(b => b.content || []).filter(b => b.type === 'output_text').map(b => b.text).join('')
              : json.choices?.[0]?.message?.content;
          finish(null, typeof text === 'string' ? cleanCode(text) : '');
        } catch { finish(Error('invalid completion JSON response')); }
      });
    });
    // Absolute deadline: a peer that keeps sending bytes cannot hold a typing
    // request open indefinitely. All network errors settle, including resets.
    timer = setTimeout(() => req.destroy(Error('completion deadline exceeded')), route.timeoutMs);
    req.on('error', error => finish(error)); req.end(body);
  });
}
function cleanCode(text) {
  const fenced = /^```[^\r\n]*\r?\n([\s\S]*?)\r?\n```\s*$/.exec(text);
  return fenced ? fenced[1] : text; // Never trim code indentation or trailing spaces.
}
function frame(bytes, flag = 0) {
  const head = Buffer.alloc(5); head[0] = flag; head.writeUInt32BE(bytes.length, 1); return Buffer.concat([head, bytes]);
}
function encodeResponse(text, streaming) {
  const id = randomUUID();
  if (!streaming) return text ? field(1, field(1, Buffer.concat([field(1, id), field(2, text), number(12, 2)]))) : Buffer.alloc(0);
  const info = field(1, field(1, field(1, id)));
  const token = Buffer.concat([field(1, text), number(5, 1), number(7, 2)]);
  const entry = Buffer.concat([number(1, 0), field(2, token)]);
  const map = field(1, field(2, field(1, entry)));
  return Buffer.concat([...(text ? [frame(info), frame(map)] : []), frame(Buffer.from('{}'), 2)]);
}
async function handle(req, res, body, config, log = console.log) {
  const controller = new AbortController();
  const cancel = () => controller.abort();
  res.on('close', cancel);
  let text = '';
  try {
    const route = resolveRoute(config);
    if (!route) throw Error('completion route unavailable');
    // When the extension's public inline provider owns insertions, consume
    // legacy native requests without charging the same keystroke twice.
    // Standalone gateways still support the native completion wire protocol.
    if (!config.completion?.editorProvider) {
      const context = parseContext(body, req.headers);
      if (context.prefix || context.suffix) text = await requestCode(route, context, controller.signal);
      log('[completions] model=' + route.model + ' protocol=' + route.protocol + ' outputBytes=' + Buffer.byteLength(text));
    }
  } catch (error) {
    if (!controller.signal.aborted) log('[completions] ' + error.message);
  } finally { res.removeListener?.('close', cancel); }
  if (controller.signal.aborted || res.destroyed || res.writableEnded) return;
  const streaming = /GetStreamingCompletions(?:\?|$)/.test(req.url || '');
  const result = encodeResponse(text, streaming);
  res.writeHead(200, { 'content-type': streaming ? 'application/connect+proto' : 'application/proto', 'content-length': result.length });
  res.end(result);
}
module.exports = { METHODS, shouldHandle, resolveRoute, parseContext, requestCode, encodeResponse, handle, cleanCode, fields, field, number, frame };
