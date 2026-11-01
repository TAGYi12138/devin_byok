'use strict';

const assert = require('node:assert/strict');
const http = require('node:http');
const { createInlineReasoningSplitter, splitInlineReasoningText, sanitizeInlineReasoningHistory } = require('../server/inline-reasoning.cjs');
const { sanitizeAssistantHistory } = require('../server/output-health.cjs');
process.env.BYOK_LOCAL_MITM_TEST_EXPORTS = '1';
const { streamChatCompletions } = require('../server/run-local-mitm.cjs');

function stream(value, size) {
  const splitter = createInlineReasoningSplitter();
  let text = '';
  let reasoning = '';
  for (let index = 0; index < value.length; index += size) {
    const part = splitter.push(value.slice(index, index + size));
    text += part.text;
    reasoning += part.reasoning;
  }
  const final = splitter.push('', true);
  return { text: text + final.text, reasoning: reasoning + final.reasoning, matched: final.matched, unclosed: final.unclosed };
}

const example = '<thinking>The user wants me to continue.</thinking>我先检查配置。';
for (let size = 1; size <= example.length; size++) {
  const result = stream(example, size);
  assert.equal(result.text, '我先检查配置。', `visible text at chunk size ${size}`);
  assert.equal(result.reasoning, 'The user wants me to continue.', `reasoning at chunk size ${size}`);
  assert.equal(result.matched, true);
}

assert.deepEqual(splitInlineReasoningText('<think>plan</think>answer'), {
  text: 'answer', reasoning: 'plan', matched: true, unclosed: false
});
assert.equal(stream('  <THINKING>plan</THINKING>answer', 2).text, 'answer');
assert.equal(stream('<thinking>plan</thinking><thinking>more</thinking>answer', 3).reasoning, 'planmore');
assert.deepEqual(stream('<thinking>unfinished', 1), {
  text: '', reasoning: 'unfinished', matched: true, unclosed: true
});
assert.equal(stream('<thinking>plan</thinking>\n', 1).text, '', 'trailing whitespace is not a visible answer');
assert.equal(stream('<thinking', 1).text, '<thinking', 'incomplete opening tag is ordinary text');
assert.equal(stream('```xml\n<thinking>example</thinking>\n```', 1).text,
  '```xml\n<thinking>example</thinking>\n```', 'quoted tags remain visible');
assert.equal(stream('Here is <thinking>literal</thinking> syntax.', 1).text,
  'Here is <thinking>literal</thinking> syntax.', 'tags after visible prose remain visible');
assert.equal(stream('ordinary response', 1).text, 'ordinary response');

const history = sanitizeAssistantHistory([
  { role: 'user', content: example },
  { role: 'assistant', content: example },
  { role: 'assistant', content: '<thinking>reasoning only</thinking>' },
  { role: 'assistant', content: '<thinking>read first</thinking>', tool_calls: [{ id: '1', function: { name: 'read', arguments: '{}' } }] },
  { role: 'assistant', content: '```xml\n<thinking>example</thinking>\n```' }
]);
assert.equal(history.inlineReasoningStripped, 3);
assert.equal(history.removed, 1);
assert.equal(history.messages.length, 4);
assert.equal(history.messages[0].content, example, 'user text is untouched');
assert.equal(history.messages[1].content, '我先检查配置。');
assert.equal(history.messages[2].content, '', 'native tool call is preserved without leaked text');
assert.equal(history.messages[2].tool_calls.length, 1);
assert.equal(history.messages[3].content, '```xml\n<thinking>example</thinking>\n```');

const cascadeHistory = sanitizeInlineReasoningHistory([
  { role: 'user', content: example },
  { role: 'assistant', content: example },
  { role: 'assistant', content: '<thinking>only reasoning</thinking>' },
  { role: 'assistant', content: '<thinking>tool reasoning</thinking>', tool_calls: [{ id: 'tool' }] }
]);
assert.equal(cascadeHistory.stripped, 3);
assert.equal(cascadeHistory.removed, 1);
assert.equal(cascadeHistory.messages[1].content, '我先检查配置。');
assert.equal(cascadeHistory.messages[2].content, '');
assert.equal(cascadeHistory.messages[2].tool_calls.length, 1);

async function testLocalUpstreamStream() {
  const server = http.createServer((_request, response) => {
    response.writeHead(200, { 'content-type': 'text/event-stream' });
    for (const content of ['<thi', 'nking>secret', '</thinking>', 'visible']) {
      response.write(`data: ${JSON.stringify({ choices: [{ delta: { content }, finish_reason: null }] })}\n\n`);
    }
    response.write(`data: ${JSON.stringify({ choices: [{ delta: {}, finish_reason: 'stop' }] })}\n\n`);
    response.end('data: [DONE]\n\n');
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let visible = '';
  let reasoning = '';
  try {
    const result = await streamChatCompletions({
      cfg: {
        baseUrl: `http://127.0.0.1:${server.address().port}/v1`,
        apiKey: 'test', model: 'mock', protocol: 'openai', streamUsage: false, timeoutMs: 5000
      },
      messages: [{ role: 'user', content: 'hi' }],
      onTextDelta: value => { visible += value; },
      onReasoningDelta: value => { reasoning += value; }
    });
    assert.equal(result.ok, true);
    assert.equal(result.text, 'visible');
    assert.equal(result.reasoning, 'secret');
    assert.equal(visible, 'visible', 'no reasoning tag reaches the visible callback');
    assert.equal(reasoning, 'secret');
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
}

testLocalUpstreamStream().then(() => console.log('INLINE_REASONING_OK')).catch(error => {
  console.error(error);
  process.exitCode = 1;
});
