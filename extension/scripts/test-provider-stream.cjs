'use strict';

// Loopback providers only. No native commands, real keys, or daemon startup.
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createRequire } = require('node:module');
const { pathToFileURL } = require('node:url');
const { EventEmitter, once } = require('node:events');
const { getEventListeners } = require('node:events');
const streams = require('../server/provider-stream.cjs');
process.env.BYOK_LOCAL_MITM_TEST_EXPORTS = '1';
const { streamChatCompletions } = require('../server/run-local-mitm.cjs');

class Response extends EventEmitter {
  constructor() { super(); this.chunks = []; this.headersSent = false; this.writableEnded = false; this.destroyed = false; }
  writeHead(status) { this.statusCode = status; this.headersSent = true; }
  write(chunk) { this.chunks.push(Buffer.from(chunk)); return true; }
  end(chunk) { if (chunk) this.write(chunk); this.writableEnded = true; this.emit('finish'); this.emit('close'); }
  cancel() { this.destroyed = true; this.emit('close'); }
}

function loadCascade(file, anthropic, openai) {
  const target = path.resolve(__dirname, '../server', file);
  let source = fs.readFileSync(target, 'utf8');
  // Stop before network listeners/certificates. Execute the real provider
  // handlers and real Devin converters, not a reimplementation of either.
  const marker = file === 'hybrid-server.js' ? 'import _0x4c1c14 from "node:crypto";' : 'var Rn = _0x5d4ade.createServer();';
  assert(source.includes(marker));
  source = source.slice(0, source.indexOf(marker));
  source = source.replace(/^import (.+) from "(.+)";$/gm, (_, binding, module) => {
    const value = binding.startsWith('{') ? binding.replace(/ as /g, ': ') : binding;
    return `const ${value} = require(${JSON.stringify(module)});`;
  }).replaceAll('import.meta.url', JSON.stringify(pathToFileURL(target).href));
  const context = {
    require: createRequire(target), Buffer, URL, TextDecoder, AbortController,
    setTimeout, clearTimeout, setInterval, clearInterval, setImmediate,
    console: { log() {}, info() {}, debug() {}, warn() {}, error() {}, trace() {} },
    process: { env: { STREAM_PACING_TICK_MS: '0', BYOK_SHORT_STOP_CONTINUE: 'false', BYOK_RETRY_MAX: '1' },
      platform: process.platform, pid: process.pid, cwd: () => process.cwd(), stdout: null, stderr: null }
  };
  vm.runInNewContext(source + `\nglobalThis.handlers = { anthropic: ${anthropic}, openai: ${openai} };`, context, { filename: target });
  return context.handlers;
}

const frame = data => 'data: ' + (typeof data === 'string' ? data : JSON.stringify(data)) + '\r\n\r\n';
function payload(protocol, mode) {
  if (protocol === 'anthropic') {
    const events = [
      { type: 'message_start', message: { id: 'msg', model: 'mock', usage: { input_tokens: 12, cache_read_input_tokens: 5 } } },
      { type: 'content_block_start', index: 0, content_block: { type: 'text', text: '' } },
      { type: 'content_block_delta', index: 0, delta: { type: 'text_delta', text: '中文正常' } },
      { type: 'content_block_stop', index: 0 },
      { type: 'message_delta', delta: { stop_reason: 'end_turn' }, usage: { output_tokens: 4 } }
    ];
    if (mode === 'complete') events.push({ type: 'message_stop' });
    return events.map(frame).join('');
  }
  if (protocol === 'openai_responses') {
    const events = [{ type: 'response.output_text.delta', output_index: 0, delta: '中文正常' }];
    if (mode === 'complete') events.push({ type: 'response.completed', response: { status: 'completed', model: 'mock', output: [], usage: { input_tokens: 12, output_tokens: 4 } } });
    if (mode === 'sentinel') events.push('[DONE]');
    return events.map(frame).join('');
  }
  const events = [{ choices: [{ delta: { reasoning_content: '先思考' } }] }, { choices: [{ delta: { content: '中文正常' } }] }];
  if (mode === 'complete' || mode === 'finish-only') events.push({ choices: [{ delta: {}, finish_reason: 'stop' }] });
  if (mode === 'complete') events.push({ usage: { prompt_tokens: 12, completion_tokens: 4, prompt_tokens_details: { cached_tokens: 5 } }, choices: [] }, '[DONE]');
  return events.map(frame).join('');
}

async function main() {
  let current = null;
  const upstream = http.createServer((request, response) => {
    request.resume();
    request.on('end', () => current(request, response));
  });
  await new Promise(resolve => upstream.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${upstream.address().port}`;
  const cfg = protocol => ({ baseUrl: base, protocol, apiFormat: protocol === 'openai_responses' ? 'responses' : undefined, model: 'mock', apiKey: 'loopback-secret', timeoutMs: 1500 });
  let cases = 0;
  try {
    let attempts = 0;
    const retriedRecords = [];
    current = (_request, response) => {
      if (++attempts === 1) { response.writeHead(400, { 'content-type': 'application/json' }); response.end('{"error":{"message":"unknown parameter stream_options"}}'); }
      else { response.writeHead(200, { 'content-type': 'text/event-stream' }); response.end(payload('openai', 'complete')); }
    };
    let retryText = '';
    const retried = await streamChatCompletions({ cfg: cfg('openai'), messages: [{ role: 'user', content: 'hello' }],
      onTextDelta: value => { retryText += value; }, onCallRecord: row => retriedRecords.push(row) });
    assert.equal(retried.ok, true);
    assert.equal(retryText, '中文正常', 'retry must use live callbacks, not callbacks from the failed attempt');
    assert.deepEqual(retriedRecords.map(row => row.status), ['error', 'completed']);
    assert.deepEqual(retriedRecords.map(row => row.attempt), [1, 2]);
    assert.equal(retriedRecords[0].requestId, retriedRecords[1].requestId);
    assert.equal(retried.callRecord.httpStatus, 200);
    cases++;
    for (const protocol of ['openai', 'anthropic', 'openai_responses']) {
      for (const mode of ['complete', 'truncated', ...(protocol === 'openai' ? ['finish-only'] : []), ...(protocol === 'openai_responses' ? ['sentinel'] : [])]) {
        current = (_request, response) => {
          response.writeHead(200, { 'content-type': 'text/event-stream' });
          const bytes = Buffer.from(payload(protocol, mode));
          const split = bytes.indexOf(Buffer.from('中')) + 1;
          response.write(bytes.subarray(0, split));
          setImmediate(() => response.end(bytes.subarray(split)));
        };
        const records = [], events = [];
        let output = '';
        const result = await streamChatCompletions({ cfg: cfg(protocol), messages: [{ role: 'user', content: 'hello' }],
          onTextDelta: delta => { output += delta; }, onModelEvent: event => events.push(event.type), onCallRecord: row => records.push(row) });
        assert.equal(result.ok, mode === 'complete' || mode === 'finish-only', `${protocol}/${mode}`);
        assert.equal(result.text, '中文正常');
        assert.equal(output, '中文正常');
        assert.equal(records.length, 1, 'one terminal record per call');
        assert.equal(records[0].protocol, protocol);
        assert.equal(records[0].status, result.ok ? 'completed' : 'error');
        assert.equal(records[0].textChars, 4);
        assert.notEqual(records[0].firstTextMs, null);
        assert(events.includes('text_delta'));
        assert(!JSON.stringify(records).includes('loopback-secret'));
        if (!result.ok) assert.match(result.error, /before terminal event/);
        cases++;
      }
    }
    // A syntactically complete tool JSON fragment is not sufficient to
    // execute a call if the provider never completes the invocation.
    for (const protocol of ['openai', 'anthropic', 'openai_responses']) for (const complete of [false, true]) {
      current = (_request, response) => {
        response.writeHead(200, { 'content-type': 'text/event-stream' });
        if (protocol === 'anthropic') {
          response.write(frame({ type: 'content_block_start', index: 0, content_block: { type: 'tool_use', id: 'call-1', name: 'read', input: {} } }));
          for (const partial_json of ['{"path":', '"a.txt"}']) response.write(frame({ type: 'content_block_delta', index: 0, delta: { type: 'input_json_delta', partial_json } }));
          response.write(frame({ type: 'content_block_stop', index: 0 }));
          response.write(frame({ type: 'message_delta', delta: { stop_reason: 'tool_use' } }));
          response.end(complete ? frame({ type: 'message_stop' }) : '');
        } else if (protocol === 'openai_responses') {
          response.write(frame({ type: 'response.output_item.added', output_index: 0, item: { type: 'function_call', id: 'item-1', call_id: 'call-1', name: 'read', arguments: '' } }));
          for (const delta of ['{"path":', '"a.txt"}']) response.write(frame({ type: 'response.function_call_arguments.delta', item_id: 'item-1', output_index: 0, delta }));
          response.end(complete ? frame({ type: 'response.completed', response: { status: 'completed', output: [{ type: 'function_call', id: 'item-1', call_id: 'call-1', name: 'read', arguments: '{"path":"a.txt"}' }] } }) : '');
        } else {
          response.write(frame({ choices: [{ delta: { tool_calls: [{ index: 0, id: 'call-1', function: { name: 'read', arguments: '{"path":' } }] } }] }));
          response.write(frame({ choices: [{ delta: { tool_calls: [{ index: 0, function: { arguments: '"a.txt"}' } }] } }] }));
          response.end(complete ? frame({ choices: [{ delta: {}, finish_reason: 'tool_calls' }] }) : '');
        }
      };
      const delivered = [];
      const result = await streamChatCompletions({ cfg: cfg(protocol), messages: [{ role: 'user', content: 'hello' }], onToolCallReady: call => delivered.push(call) });
      assert.equal(result.ok, complete);
      assert.equal(delivered.length, complete ? 1 : 0);
      if (complete) assert.equal(delivered[0].arguments_json, '{"path":"a.txt"}');
      cases++;
    }
    for (const mode of ['empty', 'malformed', 'no-separator', 'timeout', 'pre-aborted']) {
      let requests = 0;
      current = (_request, response) => {
        requests++;
        if (mode === 'timeout') return;
        response.writeHead(200, { 'content-type': 'text/event-stream' });
        response.end(mode === 'malformed' ? 'data: {broken}\n\n' : mode === 'no-separator' ? payload('openai', 'finish-only').trimEnd() : '');
      };
      const controller = new AbortController();
      if (mode === 'pre-aborted') controller.abort();
      const result = await streamChatCompletions({ cfg: { ...cfg('openai'), timeoutMs: 60 }, signal: controller.signal, messages: [{ role: 'user', content: 'hello' }] });
      assert.equal(result.ok, mode === 'no-separator');
      assert.equal(getEventListeners(controller.signal, 'abort').length, 0);
      if (mode === 'pre-aborted') { assert.equal(requests, 0); assert.equal(result.callRecord.status, 'cancelled'); }
      if (mode === 'timeout') assert.equal(result.callRecord.endReason, 'timeout');
      cases++;
    }
    // Abort before headers, while decoding, and from inside a delta callback.
    for (const mode of ['headers', 'midstream', 'callback']) {
      let firstChunk;
      const ready = new Promise(resolve => { firstChunk = resolve; });
      current = (_request, response) => {
        if (mode === 'headers') { firstChunk(); return; }
        response.writeHead(200, { 'content-type': 'text/event-stream' });
        response.write(frame({ choices: [{ delta: { content: 'first' } }] }));
        firstChunk();
      };
      const controller = new AbortController();
      let count = 0;
      const pending = streamChatCompletions({ cfg: cfg('openai'), signal: controller.signal,
        messages: [{ role: 'user', content: 'hello' }], onTextDelta() { count++; if (mode === 'callback') controller.abort(); } });
      await ready;
      if (mode !== 'callback') controller.abort();
      const result = await pending;
      assert.equal(result.ok, false);
      assert.equal(result.callRecord.status, 'cancelled');
      assert.equal(getEventListeners(controller.signal, 'abort').length, 0, 'no abort listener leak');
      assert(count <= 1);
      cases++;
    }

    // Load each real Cascade handler without starting its proxy daemon.
    for (const handlers of [loadCascade('hybrid-server.js', 'uf', 'df'), loadCascade('inference-proxy.js', 'ru', 'su')]) {
      for (const protocol of ['openai', 'anthropic', 'openai_responses']) {
        for (const mode of ['complete', 'truncated', ...(protocol === 'openai' ? ['finish-only'] : []), ...(protocol === 'openai_responses' ? ['sentinel'] : [])]) {
          current = (_request, response) => { response.writeHead(200, { 'content-type': 'text/event-stream' }); response.end(payload(protocol, mode)); };
          const response = new Response();
          const finished = once(response, 'finish');
          const id = `cascade-${cases}`;
          const apiPath = protocol === 'anthropic' ? '/messages' : protocol === 'openai' ? '/chat/completions' : '/responses';
          const provider = { useHttp: true, host: '127.0.0.1', parsed: { hostname: '127.0.0.1', port: upstream.address().port }, apiPath, apiKey: 'loopback-secret' };
          handlers[protocol === 'anthropic' ? 'anthropic' : 'openai']({}, response, {
            messages: [{ role: 'user', content: [{ type: 'text', text: 'hello' }] }], tools: [], resolvedModel: 'mock', requestedModel: 'mock',
            messageId: id, providerConfig: { anthropic: provider, openai: provider }
          });
          await finished;
          // Upstream end accounting runs after the handler writes its final frame.
          await new Promise(resolve => setImmediate(resolve));
          const row = streams.getRecentCalls().find(row => row.requestId === id);
          assert(row, 'Cascade handler must record its real invocation');
          assert.equal(row.status, mode === 'complete' || mode === 'finish-only' ? 'completed' : 'error', `cascade ${protocol}/${mode}: ${JSON.stringify(row)}`);
          assert.equal(row.textChars, 4);
          assert.equal(response.listeners('close').some(listener => listener.name === 'close'), false, 'shared lifecycle listener is removed');
          cases++;
        }
      }
      for (const protocol of ['openai', 'anthropic', 'openai_responses']) for (const mode of ['headers', 'midstream']) {
        let announce;
        const ready = new Promise(resolve => { announce = resolve; });
        current = (_request, response) => {
          if (mode === 'midstream') { response.writeHead(200, { 'content-type': 'text/event-stream' }); response.write(payload(protocol, 'truncated')); }
          announce();
        };
        const response = new Response();
        const id = `cascade-cancel-${cases}`;
        const provider = { useHttp: true, host: '127.0.0.1', parsed: { hostname: '127.0.0.1', port: upstream.address().port },
          apiPath: protocol === 'anthropic' ? '/messages' : protocol === 'openai' ? '/chat/completions' : '/responses', apiKey: 'loopback-secret' };
        handlers[protocol === 'anthropic' ? 'anthropic' : 'openai']({}, response, {
          messages: [{ role: 'user', content: [{ type: 'text', text: 'hello' }] }], tools: [], resolvedModel: 'mock', requestedModel: 'mock',
          messageId: id, providerConfig: { anthropic: provider, openai: provider }
        });
        await ready;
        await new Promise(resolve => setImmediate(resolve));
        response.cancel();
        const before = response.chunks.length;
        await new Promise(resolve => setTimeout(resolve, 15));
        assert.equal(response.chunks.length, before, 'no output after Cascade disconnect');
        assert.equal(streams.getRecentCalls().find(row => row.requestId === id).status, 'cancelled');
        cases++;
      }
    }
    // A retry invalidates only the older generation of the same scope.
    const response = new Response();
    const writer = { wasClosedByClient: () => false, wasFinalized: () => false };
    const scope = streams.createCascadeScope(response, writer);
    const old = scope.begin('openai', 1);
    const next = scope.begin('openai', 2);
    assert.equal(old.observe({ data: { choices: [{ delta: { content: 'late' } }] } }), false);
    assert.equal(next.observe({ data: { choices: [{ delta: { content: 'current' } }] } }), true);
    response.cancel();
    assert.equal(next.call.snapshot().status, 'cancelled');
    cases++;
    // Heartbeats/usage do not count as the first response; timing is separate
    // from first visible text, and terminal recording is idempotent.
    let now = 1000;
    const call = streams.createCall({ now: () => now });
    now = 1010; call.observe({ data: { usage: { prompt_tokens: 12 } } });
    assert.equal(call.snapshot().firstValidEventMs, null);
    now = 1020; call.observe({ data: { choices: [{ delta: { reasoning_content: 'think' } }] } });
    now = 1040; call.observe({ data: { choices: [{ delta: { content: 'answer' }, finish_reason: 'stop' }] } });
    assert.equal(call.snapshot().firstValidEventMs, 20);
    assert.equal(call.snapshot().firstTextMs, 40);
    assert.equal(call.observe({ data: { choices: [{ delta: { content: 'late' } }] } }), false);
    assert.equal(call.finish('completed'), true);
    assert.equal(call.finish('error'), false);
    for (let index = 0; index < 150; index++) streams.createCall().finish('completed');
    assert.equal(streams.getRecentCalls().length, 128);
    cases++;
    console.log(`PROVIDER_STREAM_OK cases=${cases} local,cascade-hybrid,cascade-http2 protocols=openai,anthropic,responses`);
  } finally {
    upstream.closeAllConnections();
    await new Promise(resolve => upstream.close(resolve));
  }
}
main().catch(error => { console.error(error.stack); process.exitCode = 1; });
