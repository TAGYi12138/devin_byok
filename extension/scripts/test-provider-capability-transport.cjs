'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const http = require('node:http');
const { runCapabilityChecks } = require('../server/provider-capability-checks.cjs');

process.env.BYOK_LOCAL_MITM_TEST_EXPORTS = '1';
process.env.BYOK_LOCAL_PROBE_APPDATA = fs.mkdtempSync(path.join(os.tmpdir(), 'byok-capability-transport-'));
process.env.BYOK_LOCAL_PROBE_BYOK_JSON = path.join(process.env.BYOK_LOCAL_PROBE_APPDATA, 'byok.json');
const adapter = require('../server/run-local-mitm.cjs');

(async () => {
  const captured = [];
  const server = http.createServer((req, res) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      try {
        const body = JSON.parse(Buffer.concat(chunks));
        captured.push({ route: req.url, body });
        const serialized = JSON.stringify(body);
        const marker = serialized.match(/PROBE_[a-f0-9]+/)?.[0];
        const values = [...new Set(serialized.match(/VALUE_[a-f0-9]+/g) || [])];
        const vision = /"type":"(?:image|image_url|input_image)"/.test(serialized);
        const calls = !marker && !values.length && !vision ? ['A', 'B'].map(slot => ({ id: 'call-' + slot, name: 'capability_probe', args: JSON.stringify({ slot }) })) : [];
        const text = marker || values.join(' ') || (vision ? 'BLUE' : '');
        res.writeHead(200, { 'content-type': 'text/event-stream', connection: 'close' });
        const emit = event => res.write('data: ' + JSON.stringify(event) + '\n\n');
        if (req.url.endsWith('/messages')) {
          emit({ type: 'message_start', message: { id: 'synthetic', usage: { input_tokens: 100 } } });
          if (calls.length) calls.forEach((call, index) => {
            emit({ type: 'content_block_start', index, content_block: { type: 'tool_use', id: call.id, name: call.name, input: {} } });
            emit({ type: 'content_block_delta', index, delta: { type: 'input_json_delta', partial_json: call.args } });
            emit({ type: 'content_block_stop', index });
          });
          else {
            emit({ type: 'content_block_start', index: 0, content_block: { type: 'text', text: '' } });
            emit({ type: 'content_block_delta', index: 0, delta: { type: 'text_delta', text } });
            emit({ type: 'content_block_stop', index: 0 });
          }
          emit({ type: 'message_delta', delta: { stop_reason: calls.length ? 'tool_use' : 'end_turn' }, usage: { output_tokens: 12 } });
          emit({ type: 'message_stop' });
        } else if (req.url.endsWith('/responses')) {
          calls.forEach((call, index) => {
            emit({ type: 'response.output_item.added', output_index: index, item: { type: 'function_call', id: 'item-' + index, call_id: call.id, name: call.name } });
            emit({ type: 'response.function_call_arguments.delta', output_index: index, item_id: 'item-' + index, delta: call.args });
          });
          if (text) emit({ type: 'response.output_text.delta', delta: text });
          emit({ type: 'response.completed', response: { status: 'completed', output: calls.map((call, index) => ({ type: 'function_call', id: 'item-' + index, call_id: call.id, name: call.name, arguments: call.args })), usage: { input_tokens: 100, output_tokens: 12 } } });
        } else {
          emit({ choices: [{ delta: calls.length ? { tool_calls: calls.map((call, index) => ({ index, id: call.id, type: 'function', function: { name: call.name, arguments: call.args } })) } : { content: text } }] });
          emit({ choices: [{ delta: {}, finish_reason: calls.length ? 'tool_calls' : 'stop' }], usage: { prompt_tokens: 100, completion_tokens: 12 } });
          res.write('data: [DONE]\n\n');
        }
        res.end();
      } catch (error) { res.destroy(error); }
    });
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    for (const protocol of ['openai', 'openai_responses', 'anthropic']) {
      const cfg = { baseUrl: 'http://127.0.0.1:' + server.address().port + '/v1', model: 'fixture', apiKey: 'synthetic-key', protocol, apiFormat: protocol, supportsVision: true };
      const before = captured.length;
      const report = await runCapabilityChecks({ adapter, cfg, identity: { uid: 'fixture' }, imageUrl: 'data:image/png;base64,AAAA', timeoutMs: 5000 });
      for (const name of ['streamingText', 'toolCalls', 'multipleToolCalls', 'toolContinuation', 'vision']) assert.equal(report.checks[name].status, 'verified', protocol + ':' + name);
      assert.equal(report.requestCount, 4);
      assert.equal(report.calls[3].requestShape.imageBlocks, 1);
      const follow = captured[before + 2].body;
      if (protocol === 'anthropic') assert(follow.messages.some(message => Array.isArray(message.content) && message.content.filter(block => block.type === 'tool_result').length === 2));
      else if (protocol === 'openai_responses') assert.equal(follow.input.filter(item => item.type === 'function_call_output').length, 2);
      else assert.equal(follow.messages.filter(message => message.role === 'tool').length, 2);
    }
    console.log('PROVIDER_CAPABILITY_TRANSPORT_OK protocols=3 calls=12 adapter=actual continuation=two-matching-results images=preserved');
  } finally { await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); process.exitCode = 1; });
