'use strict';

const assert = require('node:assert/strict');
const { runCapabilityChecks, safeError } = require('../server/provider-capability-checks.cjs');

function adapter(mode = 'normal') {
  const seen = [];
  return {
    seen, resolveModelCapabilities: () => ({ protocol: 'openai', vision: true }),
    reasoningCapabilityDiagnostic: () => ({ requestedEffort: 'high', verification: 'transport' }),
    async streamChatCompletions(options) {
      seen.push(options);
      if (mode === 'http-error') return { ok: false, status: 401, error: 'secret-key rejected' };
      const first = options.messages[0];
      let text = '', toolCalls = [];
      if (first.content.startsWith?.('Reply with exactly ')) text = first.content.match(/exactly (PROBE_\w+)/)[1];
      else if (Array.isArray(first.content)) text = mode === 'wrong-vision' ? 'RED' : 'BLUE';
      else if (options.messages.some(message => message.role === 'tool')) {
        assert(options.messages[1].reasoning_content === 'private synthetic thought');
        assert(options.messages[1].reasoning_signature === 'private synthetic signature');
        text = mode === 'wrong-follow' ? 'made-up' : options.messages.filter(message => message.role === 'tool').map(message => JSON.parse(message.content).value).join(' ');
      } else toolCalls = ['A', 'B'].map(slot => ({ id: mode === 'duplicate-id' ? 'same' : 'id-' + slot, name: 'capability_probe', arguments_json: JSON.stringify({ slot }) }));
      if (text && mode !== 'no-stream') options.onTextDelta(text);
      return { ok: true, status: 200, text, reasoning: 'private synthetic thought', signature: 'private synthetic signature', toolCalls, finishReason: toolCalls.length ? 'tool_calls' : 'stop', cacheUsage: { inputTokens: 100, cacheReadInputTokens: 20, outputTokens: 10, private: 'not recorded' } };
    }
  };
}

(async () => {
  for (const mode of ['normal', 'http-error', 'duplicate-id', 'wrong-follow', 'wrong-vision', 'no-stream']) {
    const fake = adapter(mode);
    const report = await runCapabilityChecks({ adapter: fake, cfg: { apiKey: 'secret-key' }, identity: { uid: 'test-high' }, imageUrl: 'synthetic' });
    assert(report.requestCount <= 4);
    const encoded = JSON.stringify(report);
    assert(!encoded.includes('secret-key') && !encoded.includes('private synthetic') && !encoded.includes('VALUE_') && !encoded.includes('PROBE_'));
    if (mode === 'normal') {
      for (const name of ['streamingText', 'toolCalls', 'multipleToolCalls', 'toolContinuation', 'vision']) assert.equal(report.checks[name].status, 'verified');
      assert.equal(report.checks.reasoningParameters.status, 'accepted');
      assert.equal(report.requestCount, 4);
    }
    if (mode === 'http-error') { assert.equal(report.requestCount, 1); assert.equal(report.checks.toolContinuation.status, 'not-tested'); }
    if (mode === 'duplicate-id') { assert.equal(report.checks.toolCalls.status, 'failed'); assert.equal(report.checks.toolContinuation.status, 'not-tested'); }
    if (mode === 'wrong-follow') assert.equal(report.checks.toolContinuation.status, 'failed');
    if (mode === 'wrong-vision') assert.equal(report.checks.vision.status, 'failed');
    if (mode === 'no-stream') assert.equal(report.checks.streamingText.status, 'failed');
  }
  const one = adapter();
  const visionOnly = await runCapabilityChecks({ adapter: one, cfg: {}, identity: {}, imageUrl: 'synthetic', onlyVision: true });
  assert.equal(visionOnly.requestCount, 1);
  assert.deepEqual(Object.keys(visionOnly.checks), ['vision']);
  const disabled = adapter();
  disabled.resolveModelCapabilities = () => ({ protocol: 'openai', vision: false });
  const skipped = await runCapabilityChecks({ adapter: disabled, cfg: {}, identity: {}, imageUrl: 'synthetic', onlyVision: true });
  assert.equal(skipped.requestCount, 0);
  assert.equal(skipped.checks.vision.status, 'not-tested');
  const missing = adapter();
  missing.prepareChatRequest = () => ({ ok: true, body: JSON.stringify({ messages: [{ role: 'user', content: 'no image' }] }), restoreProxyEnv() {} });
  const missingImage = await runCapabilityChecks({ adapter: missing, cfg: {}, identity: {}, imageUrl: 'synthetic', onlyVision: true });
  assert.equal(missingImage.checks.vision.exactAnswerMatched, true);
  assert.equal(missingImage.checks.vision.status, 'failed', 'lucky color guess certified a stripped image');
  assert.equal(safeError('Bearer abc secret-key', ['secret-key']), 'Bearer [REDACTED] [REDACTED]');
  console.log('PROVIDER_CAPABILITY_CHECKS_OK cases=9 bounded=4 synthetic-tools-only secrets=redacted evidence=graded');
})().catch(error => { console.error(error); process.exitCode = 1; });
