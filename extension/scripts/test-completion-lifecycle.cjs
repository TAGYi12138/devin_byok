'use strict';
const assert = require('node:assert/strict');
const http = require('node:http');
const { EventEmitter, once } = require('node:events');
const { register } = require('../code-completion-provider.cjs');
function token() {
  const events = new EventEmitter();
  return { isCancellationRequested: false, onCancellationRequested(fn) { events.on('cancel', fn); return { dispose: () => events.off('cancel', fn) }; },
    cancel() { this.isCancellationRequested = true; events.emit('cancel'); } };
}
(async () => {
  let requests = 0, failed = false, requestArrived;
  const server = http.createServer((req, res) => {
    req.resume(); req.on('end', () => {
      requests++; requestArrived?.();
      if (failed) { res.writeHead(401); res.end('{}'); return; }
      res.writeHead(200, { 'content-type': 'text/event-stream' });
      const timer = setTimeout(() => res.end('data: ' + JSON.stringify({ choices: [{ delta: { content: 'a + b;' }, finish_reason: 'stop' }] }) + '\n\n'), 1000);
      res.once('close', () => clearTimeout(timer));
    });
  });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const logs = []; let provider;
  const vscode = { languages: { registerInlineCompletionItemProvider(_s, p) { provider = p; return { dispose() {} }; } },
    Range: class { constructor(start, end) { Object.assign(this, { start, end }); } },
    InlineCompletionItem: class { constructor(insertText, range) { Object.assign(this, { insertText, range }); } } };
  const config = { completion: { providerId: 'test', model: 'fixture', timeoutMs: 15000 },
    providers: { test: { openaiHost: 'http://127.0.0.1:' + server.address().port, openaiApiPath: '/chat/completions', openaiApiKey: 'fixture-key', protocol: 'openai' } } };
  const document = { version: 1, languageId: 'javascript', getText: () => 'function add(a,b) { return ', offsetAt: () => 27 };
  const position = { line: 0, character: 27 };
  const registration = register(vscode, async () => config, line => logs.push(line));
  try {
    // A cancelled editor refresh must attach its replacement to the already
    // paid request, even though both calls spend time in the typing debounce.
    const arrived = new Promise(resolve => { requestArrived = resolve; });
    const firstToken = token();
    const first = provider.provideInlineCompletionItems(document, position, {}, firstToken);
    await arrived; firstToken.cancel();
    const second = provider.provideInlineCompletionItems(document, position, {}, token());
    assert.deepEqual(await first, []);
    assert.equal((await second)[0].insertText, 'a + b;');
    assert.equal(requests, 1, 'one network request across same-context cancellation and refresh');
    // Concurrent callers for another context also share a single request.
    document.version++; document.getText = () => 'function next(a,b) { return ';
    const both = await Promise.all([provider.provideInlineCompletionItems(document, position, {}, token()), provider.provideInlineCompletionItems(document, position, {}, token())]);
    assert(both.every(items => items[0].insertText === 'a + b;')); assert.equal(requests, 2);
    failed = true; document.version++; document.getText = () => 'function failed(a,b) { return ';
    assert.deepEqual(await provider.provideInlineCompletionItems(document, position, {}, token()), []);
    assert.deepEqual(await provider.provideInlineCompletionItems(document, position, {}, token()), []);
    assert.equal(requests, 3, 'identical failing context uses a short cooldown');
    assert(logs.some(line => line.includes('"event":"failed"') && line.includes('HTTP 401')));
    assert(logs.some(line => line.includes('"event":"provided"')));
    assert(!logs.join('\n').includes('fixture-key'), 'diagnostics must not expose credentials');
    console.log('COMPLETION_LIFECYCLE_OK same-context-refresh=one-request concurrent=one-request error-cooldown=verified diagnostics=redacted');
  } finally { registration.dispose(); server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); process.exitCode = 1; });
