'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { EventEmitter } = require('node:events');
const sharp = require('sharp');
const { optimizeDataUrl, optimizeMessages, codecAvailable } = require('../server/image-preprocess.cjs');

process.env.BYOK_LOCAL_MITM_TEST_EXPORTS = '1';
process.env.BYOK_LOCAL_EXECUTION_PROMPTS = 'on';
const bridge = require('../server/run-local-mitm.cjs');

function imageBlocks(message) {
  return Array.isArray(message.content) ? message.content.filter(block => block && block.type === 'image_url') : [];
}

async function main() {
  assert.equal(codecAvailable(), true, 'runtime image codec must be packaged');
  const source = await sharp({ create: { width: 2000, height: 2000, channels: 3, background: '#f2f2f2' } }).png().toBuffer();
  const url = 'data:image/png;base64,' + source.toString('base64');
  const optimized = await optimizeDataUrl(url);
  assert.equal(optimized.urls.length, 1);
  assert.equal(optimized.reason, 'optimized');
  assert.ok(optimized.outputBytes < optimized.inputBytes);
  const metadata = await sharp(Buffer.from(optimized.urls[0].split(',')[1], 'base64')).metadata();
  assert.ok(metadata.width * metadata.height <= 1_690_000);
  const tall = await sharp({ create: { width: 1200, height: 7200, channels: 3, background: '#fff' } }).png().toBuffer();
  const tallResult = await optimizeDataUrl('data:image/png;base64,' + tall.toString('base64'));
  assert.equal(tallResult.reason, 'tiled');
  assert.ok(tallResult.urls.length >= 2 && tallResult.urls.length <= 6);
  const native = [{ role: 'tool', tool_call_id: 'read-1', content: [{ type: 'text', text: 'screenshot' }, { type: 'image_url', image_url: { url } }] }];
  const processed = await optimizeMessages(native);
  assert.equal(native[0].content[1].image_url.url, url, 'native history remains unchanged');
  assert.notEqual(processed.messages[0].content[1].image_url.url, url);

  const tool = bridge.toOpenAIMessage({ source: bridge.SOURCE.TOOL, toolCallId: 'read-1', prompt: 'screenshot', images: [{ base64_data: source.toString('base64'), mime_type: 'image/png' }] });
  assert.equal(tool.role, 'tool');
  assert.equal(imageBlocks(tool).length, 1, 'protobuf tool images must reach model messages');
  assert.equal(bridge.countImageParts([tool]), 1);
  const chat = bridge.buildChatMessages({ messages: [
    { role: 'user', content: 'Describe the screenshot' },
    { role: 'assistant', content: null, tool_calls: [{ id: 'read-1', type: 'function', function: { name: 'read', arguments: '{}' } }] },
    tool
  ], cfg: {} });
  const toolReply = chat.find(message => message.role === 'tool');
  assert.equal(toolReply.tool_call_id, 'read-1');
  assert.equal(typeof toolReply.content, 'string', 'Chat Completions tool result stays text-only');
  const imageMessage = chat[chat.indexOf(toolReply) + 1];
  assert.equal(imageMessage.role, 'user', 'tool image follows its result in a vision-compatible role');
  assert.equal(imageBlocks(imageMessage).length, 1);
  assert.equal(bridge.countImageParts(chat), 1, 'tool image is not duplicated in the upstream chat request');
  assert.equal(imageBlocks(tool).length, 1, 'native tool result remains unchanged');
  const guardedImageHistory = [{ role: 'system', content: '[BYOK task continuity] Finish verification' }, tool];
  const guardedGptChat = bridge.buildChatMessages({ messages: guardedImageHistory, cfg: { model: 'gpt-6-sol', protocol: 'openai' } });
  assert.ok(guardedGptChat.some(message => message.role === 'system' && String(message.content).includes('Finish verification')), 'image request must retain continuity state for non-Kimi models');
  const guardedKimiChat = bridge.buildChatMessages({ messages: guardedImageHistory, cfg: { model: 'kimi-k3', protocol: 'openai' } });
  assert.ok(!guardedKimiChat.some(message => message.role === 'system'), 'Kimi image compatibility remains scoped to Kimi');
  assert.ok(guardedKimiChat.some(message => message.role === 'user' && JSON.stringify(message.content).includes('Finish verification')), 'Kimi still receives continuity state as user-format text');
  const plainChat = bridge.buildChatMessages({ messages: [{ role: 'tool', tool_call_id: 'plain', content: 'done' }], cfg: {} });
  assert.deepEqual(plainChat, [{ role: 'tool', tool_call_id: 'plain', content: 'done' }], 'text-only tool result stays unchanged');
  const parallelChat = bridge.buildChatMessages({ messages: [
    { role: 'assistant', content: null, tool_calls: [
      { id: 'read-1', type: 'function', function: { name: 'read', arguments: '{}' } },
      { id: 'read-2', type: 'function', function: { name: 'read', arguments: '{}' } }
    ] },
    tool,
    { ...tool, tool_call_id: 'read-2' }
  ], cfg: {} });
  assert.deepEqual(parallelChat.map(message => message.role), ['assistant', 'tool', 'tool', 'user'], 'parallel tool replies stay contiguous');
  assert.equal(imageBlocks(parallelChat[3]).length, 2, 'parallel tool images share one compatibility message');
  const anthropic = bridge.buildAnthropicBody({ messages: [tool] }, { model: 'claude-sonnet-4-5', protocol: 'anthropic' }, false);
  assert.equal(anthropic.messages[0].content[0].type, 'tool_result');
  assert.equal(anthropic.messages[0].content[0].content[1].type, 'image');
  assert.equal(anthropic.messages[0].content[0].content[1].source.media_type, 'image/png');
  const responses = bridge.buildResponsesBody({ messages: [tool] }, { model: 'gpt-4.1', protocol: 'openai_responses' }, false);
  assert.equal(responses.input[0].type, 'function_call_output');
  assert.equal(responses.input[0].output[1].type, 'input_image');
  assert.equal(responses.input.length, 1, 'image stays attached to its tool result');
  assert.ok(bridge.estimateLocalHistoryTokens([tool]) >= 1600, 'vision budget must include images');

  const largeWire = bridge.buildGetChatMessageBody({
    turns: [
      { source: bridge.SOURCE.USER, prompt: 'Inspect screenshot' },
      { source: bridge.SOURCE.TOOL, toolCallId: 'read-2', prompt: 'image', images: [{ mime_type: 'image/png', base64_data: crypto.randomBytes(2_300_000).toString('base64') }] }
    ]
  });
  assert.ok(largeWire.length > 2 * 1024 * 1024);
  const parsed = bridge.extractChatContext(largeWire, { 'content-type': 'application/connect+proto' });
  assert.equal(parsed.ok, true, 'complete request above the old 2 MiB cap must decode');
  assert.equal(bridge.countImageParts(parsed.messages), 1);
  assert.equal(parsed.messages.find(message => message.role === 'tool').content[1].type, 'image_url');

  // A 3 MiB body used to be silently truncated at 2 MiB and misreported as
  // no-proto-fields. The adapter must deliver every byte to its decoder.
  const req = new EventEmitter();
  req.headers = {};
  const res = { writableEnded: false, writeHead(status) { this.status = status; }, end() { this.writableEnded = true; } };
  let forwardedLength = 0;
  const proxy = {
    bodyMaxKb: 1,
    stats: { decrypted: 0, errors: 0 },
    policy: { shouldLogMitmDetail: () => false, shouldPushRecent: () => false, shouldLogWireDetail: () => false, allow: () => false },
    onLog: () => {}, _emit: () => {}, _beginSessionMonitor: () => null, _endSessionMonitor: () => {},
    _tryByokOnChat: async (_response, body) => { forwardedLength = body.length; return true; }
  };
  bridge.ConnectLoggerProxy.prototype._handleChatMitm.call(proxy, req, res, 'example.com', 443, 'POST', '/test');
  req.emit('data', largeWire.subarray(0, 2 * 1024 * 1024));
  req.emit('data', largeWire.subarray(2 * 1024 * 1024));
  req.emit('end');
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(forwardedLength, largeWire.length);

  const oversizedReq = new EventEmitter();
  oversizedReq.headers = {};
  const oversizedRes = { writableEnded: false, writeHead(status) { this.status = status; }, end(body) { this.body = body; this.writableEnded = true; } };
  process.env.BYOK_LOCAL_CHAT_BODY_MAX_MB = '8';
  bridge.ConnectLoggerProxy.prototype._handleChatMitm.call(proxy, oversizedReq, oversizedRes, 'example.com', 443, 'POST', '/test');
  oversizedReq.emit('data', Buffer.alloc(9 * 1024 * 1024));
  oversizedReq.emit('end');
  delete process.env.BYOK_LOCAL_CHAT_BODY_MAX_MB;
  assert.equal(oversizedRes.status, 413, 'oversized request must fail explicitly');
  assert.match(oversizedRes.body, /exceeds local bridge limit/);
  assert.equal(forwardedLength, largeWire.length, 'oversized prefix must never be forwarded');

  const states = new Map();
  const plan = [{ role: 'user', content: 'Implement the feature' }, { role: 'assistant', tool_calls: [{ id: 'todo-1', function: { name: 'todo_write', arguments: JSON.stringify({ todos: [{ content: 'Implement', status: 'in_progress' }, { content: 'Verify', status: 'pending' }] }) } }] }];
  const tracking = bridge.trackExecutionLoop(plan, { states, sessionKey: 'task-1' });
  const reminder = bridge.injectExecutionLoopGuard(plan, { state: tracking.state });
  assert.equal(reminder.guard.kind, 'native-plan-continuity');
  assert.ok(reminder.messages.some(message => String(message.content).includes('Verify')));
  const steering = bridge.trackExecutionLoop([...plan, { role: 'user', content: 'Also verify the error path' }], { states, sessionKey: 'task-1' });
  assert.equal(bridge.injectExecutionLoopGuard([], { state: steering.state }).guard.kind, 'native-plan-continuity', 'added constraints keep the active plan');
  const redirected = bridge.trackExecutionLoop([...plan, { role: 'user', content: 'Also verify the error path' }, { role: 'user', content: 'New task: review a different project' }], { states, sessionKey: 'task-1' });
  assert.equal(bridge.injectExecutionLoopGuard([], { state: redirected.state }).guard, null, 'new user scope must clear stale plan reminder');
  const stalledMessages = [{ role: 'user', content: 'Implement the requested feature' }];
  for (let index = 0; index < 6; index += 1) {
    stalledMessages.push({ role: 'assistant', tool_calls: [{ id: `read-${index}`, function: { name: 'read', arguments: JSON.stringify({ file_path: `source-${index}.js` }) } }] });
    stalledMessages.push({ role: 'tool', tool_call_id: `read-${index}`, content: `contents of source-${index}.js` });
  }
  const stallStates = new Map();
  const stalled = bridge.trackExecutionLoop(stalledMessages, { states: stallStates, sessionKey: 'stalled-task' });
  assert.equal(stalled.guard.kind, 'guard', 'repeated investigation must produce an execution-stall signal');
  const injectedStall = bridge.injectExecutionLoopGuard(stalledMessages, { state: stalled.state, executionResult: stalled });
  assert.equal(injectedStall.guard.kind, 'execution-stall', 'stall signal must reach the model request');
  assert.ok(injectedStall.messages.some(message => message.role === 'system' && String(message.content).includes('[BYOK execution guard]')));
  assert.ok(!injectedStall.messages.some(message => String(message.content).includes('temporarily unavailable')), 'reminder must not claim tools were disabled');
  const progressed = bridge.trackExecutionLoop([...stalledMessages, { role: 'assistant', tool_calls: [{ id: 'edit-1', function: { name: 'edit', arguments: JSON.stringify({ file_path: 'source-0.js' }) } }] }], { states: stallStates, sessionKey: 'stalled-task' });
  assert.equal(progressed.guard, null, 'concrete progress clears the stall signal');
  delete process.env.BYOK_LOCAL_EXECUTION_PROMPTS;
  assert.equal(bridge.injectExecutionLoopGuard(plan, { state: tracking.state }).guard, null, 'native execution has no bridge reminder by default');
  delete process.env.BYOK_LOCAL_RESPONSE_LANGUAGE_PROMPT;
  assert.equal(bridge.injectResponseLanguage([{ role: 'user', content: '你好' }], 'zh-CN').changed, false, 'native language choice is not overridden by default');
  process.env.BYOK_LOCAL_RESPONSE_LANGUAGE_PROMPT = 'on';
  assert.equal(bridge.injectResponseLanguage([{ role: 'user', content: '你好' }], 'zh-CN').changed, true, 'language prompt remains available as opt-in');
  delete process.env.BYOK_LOCAL_RESPONSE_LANGUAGE_PROMPT;
  console.log('image and continuity tests passed');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
