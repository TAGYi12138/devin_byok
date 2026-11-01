'use strict';

const assert = require('node:assert/strict');
const { activityFromStatus, evaluateProbeFailure } = require('../server/proxy-health-policy.cjs');

const now = 2_000_000;
assert.deepEqual(activityFromStatus({ activeRequests: 2, statusUpdatedAt: now - 4000 }, now), {
  activeRequests: 2,
  ageMs: 4000,
  fresh: true
});
assert.equal(evaluateProbeFailure({ previousFailures: 2, activeRequests: 1, statusAgeMs: 5000 }).action, 'defer-active-request');
assert.deepEqual(evaluateProbeFailure({ previousFailures: 0 }), {
  action: 'defer-consecutive-failures', failures: 1, threshold: 3
});
assert.equal(evaluateProbeFailure({ previousFailures: 2 }).action, 'verify-before-restart');
assert.equal(evaluateProbeFailure({ previousFailures: 2, live: true }).failures, 0);

process.env.BYOK_LOCAL_MITM_TEST_EXPORTS = '1';
delete process.env.BYOK_LOCAL_HISTORY_FALLBACK;
const {
  compactLocalHistory,
  historyFallbackMode,
  isContextLimitFailure,
  protocolSessionKey,
  validateOfficialCompactorPayload,
  classifyExecutionTool,
  trackExecutionLoop,
} = require('../server/run-local-mitm.cjs');

// Temporary parent directories must not turn genuine source edits into reads.
for (const target of [
  'F:/prott/src/domain.ts',
  'F:/devin-deobf/.tmp/devin-ab/current-1/project/src/domain.ts',
  'F:\\temp\\project\\src\\domain.ts',
  '/tmp/project/src/domain.ts',
  '/scratch/project/src/domain.ts',
  '/diagnostics/project/src/domain.ts',
]) {
  assert.equal(classifyExecutionTool({ name: 'edit', arguments: { file_path: target } }).reason,
    'target-edit', `workspace parent misclassified source: ${target}`);
}
assert.equal(classifyExecutionTool({ name: 'write', arguments: { path: '/tmp/project/tests/stock.test.ts' } }).reason,
  'test-artifact-edit');
for (const target of ['F:/repo/_probe_api.py', '/tmp/project/inspect_state.js', '/scratch/project/tmp_notes.txt']) {
  assert.equal(classifyExecutionTool({ name: 'edit', arguments: { path: target } }).reason,
    'temporary-edit', `diagnostic file lost its classification: ${target}`);
}
const editStates = new Map();
const editHistory = [];
for (let index = 0; index < 6; index++) {
  editHistory.push({ role: 'assistant', tool_calls: [{ id: `path-read-${index}`, function: { name: 'read_file', arguments: JSON.stringify({ path: '/tmp/project/src/domain.ts' }) } }] });
  editHistory.push({ role: 'tool', tool_call_id: `path-read-${index}`, content: 'Source contents' });
}
const beforeSourceEdit = trackExecutionLoop(editHistory, { states: editStates, sessionKey: 'temp-workspace', now: 1000 });
assert(beforeSourceEdit.guard, 'read phase should reach the investigation limit');
editHistory.push({ role: 'assistant', tool_calls: [{ id: 'path-real-edit', function: { name: 'edit', arguments: JSON.stringify({ file_path: '/tmp/project/src/domain.ts' }) } }] });
editHistory.push({ role: 'tool', tool_call_id: 'path-real-edit', content: 'The file has been updated.' });
const afterSourceEdit = trackExecutionLoop(editHistory, { states: editStates, sessionKey: 'temp-workspace', now: 1001 });
assert.equal(afterSourceEdit.state.investigationTools, 0, 'successful source edit must reset the read budget');
assert.equal(afterSourceEdit.state.lastProgressReason, 'target-edit');
assert(!afterSourceEdit.guard, 'source edit under tmp must clear the stale investigation guard');

assert.equal(historyFallbackMode(), 'error-only', 'native-fidelity mode is the default');
assert.equal(isContextLimitFailure({ ok: false, status: 413, error: 'payload too large' }), true);
assert.equal(isContextLimitFailure({ ok: false, status: 400, error: 'maximum context length exceeded' }), true);
assert.equal(isContextLimitFailure({ ok: false, status: 401, error: 'maximum context length exceeded' }), false,
  'authentication errors must never trigger a history retry');
assert.equal(isContextLimitFailure({ ok: false, status: 429, error: 'rate limit exceeded' }), false,
  'ordinary rate limits must never trigger a history retry');
assert.equal(isContextLimitFailure({ ok: false, status: 429, error: 'tokens per minute limit exceeded' }), false,
  'TPM throttling must never trigger a history retry');
assert.equal(isContextLimitFailure({ ok: false, status: 413, error: 'request body size limit exceeded for file upload' }), false,
  'HTTP body/upload limits must never trigger a history retry');
assert.equal(isContextLimitFailure({ ok: false, status: 413, error: 'context payload too large for model window' }), true,
  'an explicit context-window 413 must trigger the emergency retry');
assert.equal(protocolSessionKey({ cascadeId: 'cascade-1' }), 'cascade:cascade-1');
assert.equal(protocolSessionKey({ promptId: 'prompt-1' }), 'prompt:prompt-1');
assert.equal(protocolSessionKey({ executionId: 'execution-1' }), 'execution:execution-1');
assert.equal(protocolSessionKey({ messageIds: ['message-1'] }), 'message:message-1');
assert.deepEqual(
  validateOfficialCompactorPayload(200, { 'content-type': 'application/connect+proto' }, Buffer.from('response')),
  { valid: true, reason: 'protobuf-content-type' },
);
assert.equal(
  validateOfficialCompactorPayload(200, { 'content-type': 'text/html' }, Buffer.from('<html>gateway error</html>')).valid,
  false,
  'HTML error pages must not be accepted as successful compactor responses',
);

const messages = [{ role: 'system', content: 'system contract' }];
for (let turn = 0; turn < 5; turn += 1) {
  messages.push({ role: 'user', content: `request-${turn}` });
  for (let tool = 0; tool < 28; tool += 1) {
    messages.push({ role: 'assistant', content: `working-${turn}-${tool}`, tool_calls: [{ id: `c-${turn}-${tool}`, function: { name: 'read', arguments: '{}' } }] });
    messages.push({ role: 'tool', tool_call_id: `c-${turn}-${tool}`, content: `result-${turn}-${tool} ${'x'.repeat(1500)}` });
  }
}
messages.push({ role: 'assistant', content: 'latest in-progress response' });
const nativeFidelity = compactLocalHistory(messages, {
  contextTokens: 60000,
  thresholdTokens: 16000,
  targetTokens: 12000,
});
assert.equal(nativeFidelity.changed, false, 'normal requests must preserve Devin native history by default');
assert.equal(nativeFidelity.reason, 'native-fidelity-default');
const compacted = compactLocalHistory(messages, {
  contextTokens: 60000,
  thresholdTokens: 16000,
  targetTokens: 12000,
  minimumRecentTurns: 4,
  summaryMaxChars: 4000,
  enabled: true
});
assert.equal(compacted.changed, true);
assert.equal(compacted.hardBudgetApplied, true, 'tool-heavy recent turns activate the hard budget fallback');
assert.ok(compacted.afterTokens <= compacted.targetTokens, 'hard fallback reaches the configured token target');
assert.equal(compacted.overTargetTokens, 0);
assert.ok(compacted.messages.some(message => String(message.content || '').includes('Current user request')),
  'the latest user request survives an inside-turn trim');
assert.notEqual(compacted.messages[compacted.messages.length - 1].role, 'tool', 'keeps the latest response tail');

const singleTurn = [{ role: 'system', content: 'system contract' }, { role: 'user', content: 'finish this long task' }];
for (let tool = 0; tool < 90; tool += 1) {
  singleTurn.push({ role: 'assistant', tool_calls: [{ id: `single-${tool}`, function: { name: 'read', arguments: '{}' } }] });
  singleTurn.push({ role: 'tool', tool_call_id: `single-${tool}`, content: `evidence-${tool} ${'y'.repeat(1200)}` });
}
singleTurn.push({ role: 'assistant', content: 'still working' });
const compactedSingleTurn = compactLocalHistory(singleTurn, {
  contextTokens: 50000,
  thresholdTokens: 16000,
  targetTokens: 12000,
  minimumRecentTurns: 4,
  summaryMaxChars: 4000,
  enabled: true
});
assert.equal(compactedSingleTurn.changed, true, 'one tool-heavy turn is eligible for compaction');
assert.equal(compactedSingleTurn.hardBudgetApplied, true);
assert.ok(compactedSingleTurn.afterTokens <= compactedSingleTurn.targetTokens);
assert.ok(compactedSingleTurn.messages.some(message => String(message.content || '').includes('finish this long task')));

// Native write_plan generates its file path in the result, while todo_write
// may merge multiple plan stages. Overflow recovery must retain both facts.
const nativePlanPath = 'C:/Users/Test/.devin/plans/plan-native-test.md';
const mergedTodos = [{ content: 'Implement storage and transactions', status: 'completed' }, { content: 'Verify browser workflow', status: 'in_progress' }];
const nativePlanHistory = [
  { role: 'system', content: 'Follow the approved native plan.' },
  { role: 'user', content: 'Build and verify the application' },
  { role: 'assistant', tool_calls: [{ id: 'native-plan', function: { name: 'write_plan', arguments: JSON.stringify({ plan: '## Implementation Steps\n1. Storage\n2. Transactions\n3. Browser workflow' }) } }] },
  { role: 'tool', tool_call_id: 'native-plan', content: `Successfully wrote plan to ${nativePlanPath}` },
  { role: 'assistant', tool_calls: [{ id: 'native-approve', function: { name: 'exit_plan_mode', arguments: '{}' } }] },
  { role: 'tool', tool_call_id: 'native-approve', content: 'I have approved the plan, please start implementation!' },
  { role: 'assistant', tool_calls: [{ id: 'native-todo', function: { name: 'todo_write', arguments: JSON.stringify({ todos: mergedTodos }) } }] },
  { role: 'tool', tool_call_id: 'native-todo', content: 'Todos updated' },
  ...singleTurn.slice(2)
];
const nativeUnchanged = compactLocalHistory(nativePlanHistory, { contextTokens: 50000 });
assert.equal(nativeUnchanged.changed, false);
assert.deepEqual(nativeUnchanged.messages, nativePlanHistory, 'ordinary requests preserve plan approval and merged todos');
const nativeOverflow = compactLocalHistory(nativePlanHistory, { enabled: true, contextTokens: 50000, thresholdTokens: 16000, targetTokens: 12000, summaryMaxChars: 4000 });
assert.equal(nativeOverflow.preservedPlanFile, true);
assert.equal(nativeOverflow.preservedOrchestration, true);
assert(nativeOverflow.messages.some(message => String(message.content).includes(nativePlanPath)));
assert(nativeOverflow.messages.some(message => String(message.content).includes(JSON.stringify({ todos: mergedTodos }))), 'merged todo contents and statuses preserved verbatim');
assert(!nativeOverflow.messages.some(message => /独立待办|不得合并/.test(String(message.content))));
console.log('runtime guard tests passed: native approval, merged todos, overflow plan path and statuses preserved');
