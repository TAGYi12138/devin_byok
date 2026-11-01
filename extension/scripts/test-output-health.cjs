'use strict';

const assert = require('node:assert/strict');
const {
  repeatedSuffixEvidence,
  crossChannelEvidence,
  createStreamOutputGuard,
  createTextToolProtocolFirewall,
  sanitizeAssistantHistory
} = require('../server/output-health.cjs');

const phraseLoop = ('Let me do it.\nOK.\nLet me write.\nLet me go.\nOK.\nWriting.\n').repeat(80);
assert.ok(repeatedSuffixEvidence(phraseLoop), 'detects a repeated natural-language cycle');

const protocolLoop = ('<operation kind="sample">\n<field name="resource">/workspace/src/example.js</field>\n<field name="position">42</field>\n</operation>\n').repeat(40);
assert.ok(repeatedSuffixEvidence(protocolLoop), 'detects repeated protocol-shaped output without matching a product-specific tag');

const normalLongOutput = Array.from({ length: 180 }, (_, index) =>
  `Section ${index}: value=${index * 17}; explanation token ${String.fromCharCode(65 + index % 26)}-${index ** 2}.`
).join('\n');
assert.equal(repeatedSuffixEvidence(normalLongOutput), null, 'does not flag varied long-form output');

const duplicated = Array.from({ length: 120 }, (_, index) => `Reasoning item ${index}: ${index * 13}`).join('\n');
assert.ok(crossChannelEvidence(duplicated, duplicated), 'detects near-identical reasoning and content channels');
assert.equal(crossChannelEvidence(duplicated, normalLongOutput), null, 'does not conflate unrelated channels');

const guard = createStreamOutputGuard();
let guardState = null;
for (let index = 0; index < phraseLoop.length; index += 73) {
  guardState = guard.push('text', phraseLoop.slice(index, index + 73));
  if (guardState.tripped) break;
}
assert.ok(guardState && guardState.tripped, 'streaming guard trips before an unbounded loop completes');

const xmlCalls = [
  '<invoke name="edit">\n<parameter name="file_path">/workspace/a.json</parameter>\n<parameter name="old_string">old</parameter>\n<parameter name="new_string">new</parameter>\n</invoke>',
  '<invoke name="read">\n<parameter name="file_path">/workspace/a.json</parameter>\n</invoke>'
].join('\n');
const protocolFirewall = createTextToolProtocolFirewall({
  allowedTools: [{ function: { name: 'edit' } }, { name: 'read' }]
});
let visible = '';
const protocolStream = `Preparing safe changes.\n${xmlCalls}`;
for (let index = 0; index < protocolStream.length; index += 17) {
  const state = protocolFirewall.push(protocolStream.slice(index, index + 17));
  assert.equal(state.tripped, null);
  visible += state.emit;
}
const protocolFinal = protocolFirewall.finalize();
visible += protocolFinal.emit;
assert.equal(protocolFinal.tripped, null);
assert.equal(protocolFinal.calls.length, 2, 'recovers complete calls for tools allowed by the active request');
assert.equal(JSON.parse(protocolFinal.calls[0].arguments_json).new_string, 'new');
assert.equal(visible, 'Preparing safe changes.\n', 'never exposes recovered protocol as visible text');

const malformedFirewall = createTextToolProtocolFirewall({ allowedTools: [{ name: 'edit' }] });
malformedFirewall.push('<invoke name="edit"><parameter name="file_path">a</parameter></invoke>\n</invoke>');
assert.ok(malformedFirewall.finalize().tripped, 'fails closed on malformed nesting');

const unknownFirewall = createTextToolProtocolFirewall({ allowedTools: [{ name: 'read' }] });
assert.ok(unknownFirewall.push('<invoke name="edit"><parameter name="file_path">a</parameter></invoke>').tripped, 'rejects tools outside the active allow-list');

const schemaFirewall = createTextToolProtocolFirewall({
  allowedTools: [{ name: 'read', input_schema: { type: 'object', required: ['file_path'], properties: { file_path: { type: 'string' }, limit: { type: 'integer' } } } }]
});
schemaFirewall.push('<invoke name="read"><parameter name="file_path">a</parameter><parameter name="limit">5</parameter></invoke>');
assert.equal(JSON.parse(schemaFirewall.finalize().calls[0].arguments_json).limit, 5, 'coerces parameters using the active tool schema');

const invalidSchemaFirewall = createTextToolProtocolFirewall({
  allowedTools: [{ name: 'read', input_schema: { type: 'object', required: ['file_path'], properties: { file_path: { type: 'string' }, limit: { type: 'integer' } } } }]
});
assert.equal(invalidSchemaFirewall.push('<invoke name="read"><parameter name="file_path">a</parameter><parameter name="limit">many</parameter></invoke>').tripped.reason, 'invalid-parameter-type');

const excessiveFirewall = createTextToolProtocolFirewall({ allowedTools: [{ name: 'read' }, { name: 'edit' }], maxCalls: 2 });
assert.equal(excessiveFirewall.push(`${xmlCalls}\n<invoke name="read"><parameter name="file_path">b</parameter></invoke>`).tripped.reason, 'too-many-calls');

const documentationFirewall = createTextToolProtocolFirewall({ allowedTools: [{ name: 'read' }] });
const documented = 'Example only:\n```xml\n<invoke name="read">\n<parameter name="file_path">a</parameter>\n</invoke>\n```';
let documentedVisible = documentationFirewall.push(documented).emit;
const documentedFinal = documentationFirewall.finalize();
documentedVisible += documentedFinal.emit;
assert.equal(documentedFinal.calls.length, 0, 'does not execute protocol examples inside fenced code');
assert.equal(documentedVisible, documented);

const healthyToolMessage = {
  role: 'assistant',
  content: protocolLoop,
  tool_calls: [{ id: 'call-1', function: { name: 'read', arguments: '{}' } }]
};
const history = sanitizeAssistantHistory([
  { role: 'user', content: 'continue' },
  { role: 'assistant', content: phraseLoop },
  { role: 'assistant', content: duplicated, reasoning_content: duplicated },
  healthyToolMessage,
  { role: 'assistant', content: normalLongOutput }
]);
assert.equal(history.removed, 1, 'removes a runaway assistant response');
assert.equal(history.reasoningDeduped, 1, 'removes only the duplicate reasoning copy');
assert.equal(history.messages.length, 4);
assert.equal(history.messages[2], healthyToolMessage, 'preserves tool-call messages even when their text is repetitive');
assert.equal(history.messages[1].reasoning_content, undefined);

const contaminatedHistory = sanitizeAssistantHistory([
  { role: 'assistant', content: xmlCalls },
  { role: 'assistant', content: 'valid result', reasoning_content: xmlCalls, tool_calls: [{ id: 'native', function: { name: 'read', arguments: '{}' } }] },
  { role: 'assistant', content: `safe preface\n${xmlCalls}`, tool_calls: [{ id: 'native-2', function: { name: 'read', arguments: '{}' } }] }
]);
assert.equal(contaminatedHistory.protocolRemoved, 1, 'removes visible text-protocol leakage from future context');
assert.equal(contaminatedHistory.messages.length, 2);
assert.equal(contaminatedHistory.messages[0].reasoning_content, undefined, 'strips protocol leakage from reasoning while preserving native tool messages');
assert.equal(contaminatedHistory.messages[1].content, 'safe preface\n');
assert.equal(contaminatedHistory.protocolStripped, 1);

console.log('OUTPUT_HEALTH_OK');
