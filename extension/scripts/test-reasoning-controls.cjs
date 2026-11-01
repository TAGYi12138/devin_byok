'use strict';

const assert = require('node:assert/strict');
const sharedReasoning = require('../server/reasoning-controls.cjs');
process.env.BYOK_LOCAL_MITM_TEST_EXPORTS = '1';
const {
  applyReasoningControls,
  buildResponsesBody,
  defaultSamplingFields,
  reasoningCapabilityDiagnostic
} = require('../server/run-local-mitm.cjs');

function request(model, effort, protocol = 'openai', extra = {}) {
  const provider = { model, protocol, ...extra };
  const identity = { uid: `MODEL_TEST_${effort.toUpperCase()}`, effort };
  const body = protocol === 'openai_responses'
    ? buildResponsesBody({ messages: [{ role: 'user', content: 'test' }], identity }, provider, false)
    : { model };
  if (protocol === 'openai') applyReasoningControls(body, identity, provider);
  return { body, diagnostic: reasoningCapabilityDiagnostic(identity, provider) };
}

function expectEffort(model, effort, protocol, expected, extra) {
  const { body, diagnostic } = request(model, effort, protocol, extra);
  const actual = protocol === 'openai_responses' ? body.reasoning?.effort : body.reasoning_effort;
  assert.equal(actual, expected, `${model} ${protocol} ${effort}`);
  if (expected === undefined) assert.equal(diagnostic.parameter, 'omitted');
  else if (protocol === 'openai_responses') assert.equal(diagnostic.parameter, 'reasoning.effort');
  else assert.match(diagnostic.parameter, /reasoning_effort/);
  if (expected !== undefined) assert.equal(diagnostic.effectiveEffort, expected);
}

for (const protocol of ['openai', 'openai_responses']) {
  expectEffort('grok-4.7', 'low', protocol, 'low');
  expectEffort('grok-4.5', 'xhigh', protocol, 'high');
  expectEffort('grok-4.7', 'max', protocol, 'xhigh');
  expectEffort('grok-4.7', 'none', protocol, undefined);
  expectEffort('grok-4.20-multi-agent', 'high', protocol, undefined);
  expectEffort('qwen3.8-max', 'low', protocol, 'low');
  expectEffort('qwen3.8-max', 'none', protocol, 'none');
  expectEffort('qwen3.4', 'high', protocol, undefined);
  expectEffort('gpt-5.6-sol', 'none', protocol, 'none');
  expectEffort('gpt-5.4', 'minimal', protocol, 'low');
  expectEffort('gpt-5.4', 'max', protocol, 'xhigh');
  expectEffort('gpt-5.3-codex', 'none', protocol, undefined);
  expectEffort('gpt-4o', 'high', protocol, undefined);
  expectEffort('gpt-6-sol', 'none', protocol, 'none');
  expectEffort('gpt-6-astra', 'none', protocol, undefined);
  expectEffort('glm-5.3', 'high', protocol, 'high');
  expectEffort('glm-5.3', 'medium', protocol, 'high');
  expectEffort('kimi-k3', 'high', protocol, 'high');
  expectEffort('kimi-k3', 'medium', protocol, 'high');
  expectEffort('unverified-model', 'high', protocol, undefined);
}
expectEffort('gemini-3.8-flash', 'low', 'openai', 'low');
expectEffort('gemini-2.5-flash', 'none', 'openai', 'none');
expectEffort('gemini-3.8-flash', 'minimal', 'openai', 'low');
expectEffort('gemini-3.8-flash', 'max', 'openai', 'high');
expectEffort('gemini-3-pro-preview', 'medium', 'openai', 'high');
expectEffort('gemini-3.8-flash', 'low', 'openai_responses', undefined);
expectEffort('provider-model-alias', 'low', 'openai', 'low', { reasoningDialect: 'grok-chat' });
expectEffort('provider-model-alias', 'high', 'openai', 'high', { reasoningDialect: 'openai-chat' });

const pickerBody = { model: 'grok-4.7' };
applyReasoningControls(pickerBody, { uid: 'MODEL_GROK_4_7_LOW' }, { model: 'grok-4.7', protocol: 'openai' });
assert.equal(pickerBody.reasoning_effort, 'low', 'native picker UID suffix must reach the upstream request');

const deepSeek = request('deepseek-chat', 'medium', 'openai');
assert.deepEqual(deepSeek.body.thinking, { type: 'enabled' });
assert.equal(deepSeek.body.reasoning_effort, 'high');
assert.equal(request('grok-4.7', 'none').diagnostic.verification, 'unsupported-level');
assert.equal(request('glm-5.3', 'none').diagnostic.verification, 'unsupported-level');
const compacted = buildResponsesBody({ messages: [{ role: 'user', content: 'test' }], identity: { effort: 'low' }, compaction: true }, { model: 'grok-4.7', protocol: 'openai_responses' }, false);
assert.equal(compacted.reasoning, undefined, 'internal compaction must not inherit chat effort');
assert.deepEqual(defaultSamplingFields('gpt-6-sol'), {}, 'reasoning requests must not force a sampling temperature');
assert.deepEqual(defaultSamplingFields('grok-4.7'), {});
assert.deepEqual(defaultSamplingFields('gemini-3.8-flash'), {});
assert.deepEqual(defaultSamplingFields('gpt-4o'), { temperature: 0 }, 'non-reasoning GPT behavior is preserved');

// Cascade uses the shared mapper with the request identity and a Chat Completions binding.
const cascadeIdentity = { uid: 'MODEL_GROK_4_7_XHIGH' };
const cascadeCapabilities = {
  model: 'grok-4.7',
  protocol: 'openai',
  reasoningDialect: sharedReasoning.resolveDialect('grok-4.7')
};
const cascadeBody = { model: 'grok-4.7', messages: [] };
sharedReasoning.applyChatControls(cascadeBody, cascadeIdentity, cascadeCapabilities);
assert.equal(cascadeBody.reasoning_effort, 'xhigh', 'Cascade must forward the selected UID effort');
const cascadeAliasBody = { model: 'provider-model-alias', messages: [] };
sharedReasoning.applyChatControls(cascadeAliasBody, { uid: 'MODEL_ALIAS_HIGH' }, {
  model: 'provider-model-alias',
  protocol: 'openai',
  reasoningDialect: sharedReasoning.resolveDialect('provider-model-alias', 'grok-chat')
});
assert.equal(cascadeAliasBody.reasoning_effort, 'high', 'Cascade must honor the binding dialect for aliases');

console.log('reasoning controls: OK');
