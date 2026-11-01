'use strict';
const assert = require('node:assert/strict');
const http = require('node:http');
process.env.BYOK_LOCAL_MITM_TEST_EXPORTS = '1';
const { prepareChatRequest, streamChatCompletions } = require('../server/run-local-mitm.cjs');
const cfg = { baseUrl: 'http://127.0.0.1:9999/v1', apiKey: 'test-key', model: 'gpt-6-sol', apiFormat: 'responses' };
const prepared = prepareChatRequest({
  cfg,
  identity: { uid: 'gpt-6-sol-medium' },
  messages: [
    { role: 'system', content: 'Complete the task.' },
    { role: 'user', content: 'Look up the codeword.' },
    { role: 'assistant', content: '', reasoning_content: 'private summary from the prior response',
      tool_calls: [{ id: 'call_1', type: 'function', function: { name: 'lookup', arguments: '{}' } }] },
    { role: 'tool', tool_call_id: 'call_1', content: 'violet-742' }
  ],
  tools: [{ type: 'function', function: { name: 'lookup', parameters: { type: 'object', properties: {} } } }]
}, { stream: true });
try {
  assert.equal(prepared.ok, true);
  assert.equal(prepared.protocol, 'openai_responses');
  const body = JSON.parse(prepared.body);
  assert.equal(body.stream, true);
  assert.equal(body.store, false);
  assert.equal(body.previous_response_id, undefined);
  assert.equal(body.reasoning?.summary, 'auto');
  assert.equal(body.tools?.[0]?.name, 'lookup');
  assert.equal(body.input.some(item => item.type === 'reasoning'), false);
  assert.equal(body.input.some(item => item.type === 'function_call' && item.call_id === 'call_1'), true);
  assert.equal(body.input.some(item => item.type === 'function_call_output' && item.call_id === 'call_1' && item.output === 'violet-742'), true);
  assert.equal(prepared.body.includes('private summary from the prior response'), false);
} finally {
  prepared.restoreProxyEnv?.();
}

(async () => {
  const server = http.createServer((_request, response) => {
    response.writeHead(200, { 'content-type': 'text/event-stream' });
    response.end('data: ' + JSON.stringify({ type: 'response.completed', response: {
      status: 'completed', output: [
        { type: 'reasoning', content: [], summary: [{ type: 'summary_text', text: 'Checked the arithmetic.' }] },
        { type: 'message', content: [{ type: 'output_text', text: '42' }] }
      ]
    } }) + '\n\n');
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    let delivered = '';
    const result = await streamChatCompletions({
      cfg: { ...cfg, baseUrl: `http://127.0.0.1:${server.address().port}/v1` },
      messages: [{ role: 'user', content: 'What is 6 × 7?' }],
      onReasoningDelta: delta => { delivered += delta; }
    });
    assert.equal(result.ok, true);
    assert.equal(result.reasoning, 'Checked the arithmetic.');
    assert.equal(delivered, 'Checked the arithmetic.');
    console.log('RESPONSES_ADAPTER_OK');
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
