'use strict';
const assert = require('node:assert/strict');
const http = require('node:http');
const http2 = require('node:http2');
const net = require('node:net');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { once, EventEmitter } = require('node:events');
const zlib = require('node:zlib');
const c = require('../server/code-completion.cjs');
const text = '    return value + 1;\n';
const code = 'const 中文 = 1;\nfunction next() {\n\n}\n';
const prefix = code.slice(0, code.indexOf('\n\n') + 1);
const document = Buffer.concat([c.field(3, code), c.number(6, Buffer.byteLength(prefix)), c.field(4, 'typescript')]);
const body = Buffer.concat([c.field(1, c.field(1, 'telemetry'.repeat(500))), c.field(5, c.field(1, document))]);
const lookup = (bytes, no) => c.fields(bytes).find(f => f.no === no)?.value;
function unaryText(bytes) { return lookup(lookup(lookup(bytes, 1), 1), 2).toString(); }
function frames(bytes) {
  const values = []; let i = 0;
  while (i < bytes.length) { const length = bytes.readUInt32BE(i + 1); values.push({ flag: bytes[i], bytes: bytes.subarray(i + 5, i + 5 + length) }); i += 5 + length; }
  assert.equal(i, bytes.length); return values;
}
function streamText(bytes) {
  const parts = frames(bytes); assert.equal(parts.at(-1).flag, 2);
  const map = lookup(lookup(parts[1].bytes, 1), 2);
  const entry = lookup(map, 1), token = lookup(entry, 2);
  assert.equal(lookup(token, 5), 1, 'completion marked finished');
  return lookup(token, 1).toString();
}
async function freePort() { const server = net.createServer(); server.listen(0, '127.0.0.1'); await once(server, 'listening'); const port = server.address().port; await new Promise(r => server.close(r)); return port; }
function post1(port, url, bytes, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({ host: '127.0.0.1', port, path: url, method: 'POST', headers: { 'content-type': 'application/proto', 'content-length': bytes.length, ...headers } }, res => {
      const chunks = []; res.on('data', b => chunks.push(b)); res.on('end', () => { if (res.statusCode !== 200) reject(Error(url + ' HTTP ' + res.statusCode)); else resolve(Buffer.concat(chunks)); });
    }); req.on('error', reject); req.end(bytes);
  });
}
function post2(port, url, bytes, headers = {}) {
  return new Promise((resolve, reject) => {
    const client = http2.connect('http://127.0.0.1:' + port);
    client.on('error', reject);
    const req = client.request({ ':path': url, ':method': 'POST', 'content-type': 'application/proto', ...headers });
    let status; const chunks = []; req.on('response', h => { status = h[':status']; }); req.on('data', b => chunks.push(b)); req.on('end', () => { client.close(); if (status !== 200) reject(Error(url + ' HTTP ' + status)); else resolve(Buffer.concat(chunks)); }); req.on('error', reject); req.end(bytes);
  });
}
class Response extends EventEmitter {
  writeHead(status, headers) { this.status = status; this.headers = headers; }
  end(bytes) { this.bytes = bytes; this.writableEnded = true; this.emit('close'); }
}
async function editorCases(origin) {
  const config = { completion: { providerId: 'fixture', model: 'fast-code' }, providers: { fixture: { protocol: 'openai', openaiHost: origin, openaiApiPath: '/v1/chat/completions', openaiApiKey: 'fixture' } } };
  let provider, disposed = false;
  const vscode = {
    languages: { registerInlineCompletionItemProvider(_selector, value) { provider = value; return { dispose() { disposed = true; } }; } },
    InlineCompletionItem: class { constructor(insertText, range) { Object.assign(this, { insertText, range }); } },
    Range: class { constructor(start, end) { Object.assign(this, { start, end }); } }
  };
  const registration = require('../code-completion-provider.cjs').register(vscode, async () => config);
  let typed = '';
  const document = { version: 1, languageId: 'typescript', getText: () => prefix + typed + code.slice(prefix.length), offsetAt: () => prefix.length + typed.length };
  const position = { line: 2, character: 0 };
  const makeToken = () => {
    const emitter = new EventEmitter();
    return { isCancellationRequested: false, onCancellationRequested(fn) { emitter.on('cancel', fn); return { dispose: () => emitter.removeListener('cancel', fn) }; }, cancel() { this.isCancellationRequested = true; emitter.emit('cancel'); }, emitter };
  };
  try {
    let token = makeToken();
    const suggestions = await provider.provideInlineCompletionItems(document, position, {}, token);
    assert.equal(suggestions[0].insertText, text); assert.equal(suggestions[0].range.start, position);
    assert.equal(token.emitter.listenerCount('cancel'), 0);
    assert.equal((await provider.provideInlineCompletionItems(document, position, {}, makeToken()))[0].insertText, text, 'same context reuses its suggestion');
    typed = '    ret'; document.version++;
    assert.equal((await provider.provideInlineCompletionItems(document, position, {}, makeToken()))[0].insertText, text.slice(typed.length), 'typing an existing suggestion reuses the remaining text');
    typed = ''; document.version++;
    config.completion.enabled = false;
    assert.deepEqual(await provider.provideInlineCompletionItems(document, position, {}, makeToken()), []);
    config.completion.enabled = true;
    token = makeToken(); token.cancel();
    assert.deepEqual(await provider.provideInlineCompletionItems(document, position, {}, token), []);
    token = makeToken();
    const cancelled = provider.provideInlineCompletionItems(document, position, {}, token); token.cancel();
    assert.deepEqual(await cancelled, [], 'cancel while debouncing starts no request');
    const stale = provider.provideInlineCompletionItems(document, position, {}, makeToken()); document.version++;
    assert.deepEqual(await stale, [], 'document changes invalidate the original cursor');
    token = makeToken(); const pending = provider.provideInlineCompletionItems(document, position, {}, token);
    registration.dispose(); assert.deepEqual(await pending, []); assert(disposed);
  } finally { registration.dispose(); }
}
async function runGateway(filename, send, env, port, origin) {
  const child = spawn(process.execPath, [path.resolve(__dirname, '../server', filename)], { env: { ...process.env, ...env }, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
  let output = ''; child.stdout.on('data', b => output += b); child.stderr.on('data', b => output += b);
  try {
    await new Promise((resolve, reject) => {
      const deadline = setTimeout(() => { clearInterval(poll); reject(Error('gateway startup timeout: ' + output.slice(-1000))); }, 10000);
      const poll = setInterval(() => { if (/PROXY on/.test(output)) { clearTimeout(deadline); clearInterval(poll); resolve(); } else if (child.exitCode !== null) { clearTimeout(deadline); clearInterval(poll); reject(Error(output)); } }, 25);
    });
    for (const protocol of ['openai', 'openai_responses', 'anthropic']) {
      const provider = { protocol, anthropicHost: origin + '/v1', anthropicApiPath: '/v1/messages', anthropicApiKey: 'fixture', openaiHost: origin + '/v1', openaiApiPath: protocol === 'openai_responses' ? '/v1/responses' : '/v1/chat/completions', openaiApiKey: 'fixture', useHttp: true };
      const config = { completion: { enabled: true, providerId: 'fixture', model: 'fast-code' }, providers: { fixture: provider } };
      await send(port, '/api/config', Buffer.from(JSON.stringify(config)), { 'content-type': 'application/json' });
      const unary = await send(port, '/exa.api_server_pb.ApiServerService/GetCompletions', body);
      assert.equal(unaryText(unary), text, filename + ':' + protocol + ':unary');
      const compressed = c.frame(zlib.gzipSync(body), 1);
      const stream = await send(port, '/exa.api_server_pb.ApiServerService/GetStreamingCompletions', compressed, { 'content-type': 'application/connect+proto', 'connect-content-encoding': 'gzip' });
      assert.equal(streamText(stream), text, filename + ':' + protocol + ':streaming');
      const empty = await send(port, '/exa.api_server_pb.ApiServerService/GetCompletions', Buffer.from([255]));
      assert.equal(empty.length, 0, 'malformed context fails empty');
    }
  } finally {
    const exited = once(child, 'exit'); child.kill(); await exited;
  }
}
(async () => {
  assert.equal(c.parseContext(body).prefix, prefix);
  assert.equal(c.parseContext(body).suffix, code.slice(prefix.length));
  const start = c.field(5, c.field(1, c.field(3, '中文')));
  assert.deepEqual(c.parseContext(start), { prefix: '', suffix: '中文', language: '' });
  assert.throws(() => c.parseContext(c.field(5, c.field(1, Buffer.concat([c.field(3, '中文'), c.number(6, 1)])))), /UTF-8/);
  const fim = c.field(2, c.field(2, '<fim_prefix>短<fim_suffix>long suffix<fim_middle>'));
  assert.deepEqual(c.parseContext(fim), { prefix: '短', suffix: 'long suffix', language: '' });
  assert.throws(() => c.parseContext(c.field(2, c.field(6, '/some/long/path'))), /unsupported/);
  assert.equal(c.cleanCode(text), text); assert.equal(c.cleanCode('```ts\n    return 1;\n```'), '    return 1;');
  assert.equal(c.shouldHandle({ completion: { enabled: false, model: 'x' } }), false);
  assert.equal(c.shouldHandle({ completion: { providerId: 'deleted' } }), true);
  assert.equal(c.resolveRoute({ completion: { providerId: 'deleted' }, providers: { other: {} } }), null);
  const requests = [];
  const server = http.createServer((req, res) => {
    const chunks = []; req.on('data', b => chunks.push(b)); req.on('end', () => {
      const data = JSON.parse(Buffer.concat(chunks)); requests.push({ path: req.url, headers: req.headers, body: data });
      if (req.url === '/timeout') return;
      if (req.url === '/reset') return req.socket.destroy();
      if (req.url === '/error') { res.writeHead(401); return res.end('{}'); }
      assert.equal(data.model, req.url === '/glm' ? 'glm-5.3-flash' : 'fast-code'); assert.equal(data.stream, true);
      if (req.url === '/glm') { assert.equal(data.thinking.type, 'enabled'); assert.equal(data.reasoning_effort, 'low'); }
      assert(JSON.stringify(data).includes('const 中文 = 1;')); assert(!JSON.stringify(data).includes('telemetry'));
      if (req.url.startsWith('/stream/')) {
        const protocol = req.url.split('/').at(-1);
        const insertion = req.url.includes('?prefix') ? '    return 中文' : '    return 中文 + 1;\n';
        res.writeHead(200, { 'content-type': 'text/event-stream' });
        const event = value => 'data: ' + JSON.stringify(value) + '\n\n';
        const delta = protocol === 'anthropic' ? { type: 'content_block_delta', delta: { type: 'text_delta', text: insertion } }
          : protocol === 'openai_responses' ? { type: 'response.output_text.delta', delta: insertion }
            : { choices: [{ delta: { content: insertion } }] };
        const thinking = protocol === 'anthropic' ? { type: 'content_block_delta', delta: { type: 'thinking_delta', thinking: 'private reasoning' } }
          : protocol === 'openai_responses' ? { type: 'response.reasoning_summary_text.delta', delta: 'private reasoning' }
            : { choices: [{ delta: { reasoning_content: 'private reasoning' } }] };
        res.write(event(thinking));
        const bytes = Buffer.from(event(delta)); const split = bytes.indexOf(Buffer.from('中')) + 1;
        res.write(bytes.subarray(0, split));
        const next = setTimeout(() => res.write(bytes.subarray(split)), 10);
        const end = setTimeout(() => res.end(), 1500);
        res.once('close', () => { clearTimeout(next); clearTimeout(end); });
        return;
      }
      if (req.url.endsWith('/messages')) { assert.equal(req.headers['x-api-key'], 'fixture'); res.end(JSON.stringify({ content: [{ type: 'text', text }] })); }
      else if (req.url.endsWith('/responses')) { assert.equal(data.store, false); res.end(JSON.stringify({ output: [{ type: 'message', content: [{ type: 'output_text', text }] }] })); }
      else { assert.equal(req.headers.authorization, 'Bearer fixture'); res.end(JSON.stringify({ choices: [{ message: { content: text } }] })); }
    });
  });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const origin = 'http://127.0.0.1:' + server.address().port;
  try {
    const hybridPort = await freePort(), inferencePort = await freePort();
    const env = { HYBRID_PORT: String(hybridPort), INFERENCE_PORT: String(inferencePort), HYBRID_HOST: '127.0.0.1', INFERENCE_HOST: '127.0.0.1' };
    await runGateway('hybrid-server.js', post1, env, hybridPort, origin);
    await runGateway('inference-proxy.js', post2, env, inferencePort, origin);
    assert.equal(requests.length, 12, 'both live gateways dispatched all 3 protocols in both wire modes');
    await editorCases(origin);
    assert.equal(requests.length, 13, 'editor calls actual provider; disabled, cancelled and stale requests do not');
    const nativeResponse = new Response();
    await c.handle({ url: '/GetCompletions', headers: {} }, nativeResponse, body, {
      completion: { providerId: 'fixture', model: 'fast-code', editorProvider: true },
      providers: { fixture: { protocol: 'openai', openaiHost: origin, openaiApiPath: '/v1/chat/completions', openaiApiKey: 'fixture' } }
    });
    assert.equal(nativeResponse.bytes.length, 0); assert.equal(requests.length, 13, 'legacy native provider does not duplicate the editor request');
    for (const protocol of ['openai', 'openai_responses', 'anthropic']) {
      const start = performance.now();
      const result = await c.requestCode({ url: new URL(origin + '/stream/' + protocol), model: 'fast-code', apiKey: 'fixture', protocol, timeoutMs: 2500 }, c.parseContext(body));
      assert.equal(result, '    return 中文 + 1;\n');
      assert(performance.now() - start < 1000, 'first useful line returned before the 1500 ms delayed EOF');
    }
    const previewStart = performance.now();
    assert.equal(await c.requestCode({ url: new URL(origin + '/stream/openai?prefix'), model: 'fast-code', apiKey: 'fixture', protocol: 'openai', timeoutMs: 2500 }, c.parseContext(body)), '    return 中文');
    assert(performance.now() - previewStart < 1000, 'a usable prefix also returns before delayed EOF');
    for (const endpoint of ['timeout', 'reset', 'error']) {
      const route = { url: new URL(origin + '/' + endpoint), model: 'fast-code', apiKey: 'fixture', protocol: 'openai', timeoutMs: 100 };
      await assert.rejects(c.requestCode(route, c.parseContext(body)), /deadline|socket|HTTP 401/);
    }
    assert.equal(await c.requestCode({ url: new URL(origin + '/glm'), model: 'glm-5.3-flash', apiKey: 'fixture', protocol: 'openai', timeoutMs: 1000 }, c.parseContext(body)), text);
    const config = { completion: { providerId: 'fixture', model: 'fast-code', timeoutMs: 1000 }, providers: { fixture: { protocol: 'openai', openaiHost: origin, openaiApiPath: '/timeout', openaiApiKey: 'fixture' } } };
    const response = new Response(); const pending = c.handle({ url: '/GetCompletions', headers: {} }, response, body, config, () => {});
    response.destroyed = true; response.emit('close'); await pending;
    assert.equal(response.bytes, undefined, 'cancelled client gets no late completion');
    console.log('CODE_COMPLETION_OK gateways=2 protocols=3 wire=unary+streaming utf8=verified whitespace=preserved errors=timeout+reset+401 cancellation=verified latency=early-line+prefix cache=context+typed-tail');
  } finally { server.closeAllConnections(); await new Promise(r => server.close(r)); }
})().catch(error => { console.error(error); process.exitCode = 1; });
