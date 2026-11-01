"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { EventEmitter } = require("node:events");
const { DatabaseSync } = require("node:sqlite");
const { PromptIdentityRegistry, resolveSessionFromToolHistory } = require("../server/session-identity.cjs");

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "byok-session-identity-"));
const relative = path.relative(os.tmpdir(), directory);
if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) throw new Error("Unsafe test directory");
process.env.BYOK_LOCAL_MITM_TEST_EXPORTS = "1";
process.env.BYOK_LOCAL_PROBE_APPDATA = directory;
process.env.BYOK_LOCAL_SESSIONS_DB = path.join(directory, "sessions.db");

try {
  const db = new DatabaseSync(process.env.BYOK_LOCAL_SESSIONS_DB);
  db.exec("CREATE TABLE sessions (id TEXT PRIMARY KEY, main_chain_id INTEGER); CREATE TABLE message_nodes (session_id TEXT, node_id INTEGER, parent_node_id INTEGER, chat_message TEXT)");
  db.prepare("INSERT INTO sessions VALUES (?,?)").run("old-session", 2);
  db.prepare("INSERT INTO sessions VALUES (?,?)").run("other-session", 2);
  const insert = db.prepare("INSERT INTO message_nodes VALUES (?,?,?,?)");
  insert.run("old-session", 1, null, JSON.stringify({ role: "assistant", tool_calls: [{ id: "call_old_unique_1234567890" }] }));
  insert.run("old-session", 2, 1, JSON.stringify({ role: "tool", tool_call_id: "call_old_unique_1234567890" }));
  insert.run("other-session", 1, null, JSON.stringify({ role: "assistant", tool_calls: [{ id: "call_other_unique_1234567890" }] }));
  insert.run("other-session", 2, 1, JSON.stringify({ role: "tool", tool_call_id: "call_other_unique_1234567890" }));
  db.close();

  const router = require("../server/run-local-mitm.cjs");
  const old = "acp/devin-cli/old-session";
  const other = "acp/devin-cli/other-session";
  assert(router.rememberSessionSelection(old, "claude-opus-5-5-medium", "sessions-native-select", "", "cascade-before"));
  assert(router.rememberSessionSelection(other, "gpt-6-sol-medium", "sessions-native-select", "", "cascade-other"));

  const request = { cascadeId: "cascade-after", lastUserText: "继续之前的任务", messages: [{ role: "assistant", tool_calls: [{ id: "call_old_unique_1234567890" }] }] };
  const toolMatch = router.resolveRequestSessionIdentity(request);
  assert.equal(toolMatch.match, "tool-lineage-exact");
  assert.equal(toolMatch.sessionId, old);
  assert(router.bindCascadeToSession(old, "cascade-after"));
  assert.equal(router.readCascadeChoice("cascade-before").sessionId, old);
  assert.equal(router.readCascadeChoice("cascade-after").uid, "claude-opus-5-5-medium");
  assert.equal(router.bindCascadeToSession(other, "cascade-after"), false, "a cascade must not be claimed by another session");
  assert.equal(router.readCascadeChoice("cascade-after").sessionId, old);
  assert.equal(router.resolveRequestSessionIdentity({ cascadeId: "cascade-after", messages: [] }).sessionId, old);

  const otherMatch = resolveSessionFromToolHistory([{ role: "tool", tool_call_id: "call_other_unique_1234567890" }], [old, other], { dbPath: process.env.BYOK_LOCAL_SESSIONS_DB });
  assert.equal(otherMatch.sessionId, other);
  const unknown = resolveSessionFromToolHistory([{ role: "tool", tool_call_id: "call_unknown_1234567890" }], [old, other], { dbPath: process.env.BYOK_LOCAL_SESSIONS_DB });
  assert.equal(unknown.match, "tool-lineage-miss");

  const registry = new PromptIdentityRegistry({ ttlMs: 1000 });
  assert.equal(registry.register({ sessionId: old, prompt: [{ type: "text", text: "新的问题" }], choice: { sessionId: old, uid: "claude-opus-5-5-medium" }, now: 100 }).ok, true);
  assert.equal(registry.resolve("新的问题", 101).sessionId, old);
  registry.register({ sessionId: other, prompt: ["新的问题"], choice: { sessionId: other, uid: "gpt-6-sol-medium" }, now: 102 });
  assert.equal(registry.resolve("新的问题", 103).match, "prompt-ambiguous", "identical concurrent prompts must not borrow a model");
  assert.equal(registry.resolve("新的问题", 1200).match, "prompt-miss", "stale prompt identities must expire");

  const requestEvent = new EventEmitter();
  requestEvent.url = "/__byok/prompt-identity";
  requestEvent.method = "POST";
  const responseEvent = { status: 0, body: "", writeHead(status) { this.status = status; }, end(body) { this.body = body; } };
  assert.equal(router.handleProbeControlHttp(requestEvent, responseEvent), true);
  requestEvent.emit("data", Buffer.from(JSON.stringify({ sessionId: old, prompt: ["当次发送的文本"] })));
  requestEvent.emit("end");
  assert.equal(responseEvent.status, 200);
  assert.equal(JSON.parse(responseEvent.body).required, true);
  const promptMatch = router.resolveRequestSessionIdentity({ cascadeId: "cascade-rotated-again", lastUserText: "当次发送的文本", messages: [] });
  assert.equal(promptMatch.match, "prompt-exact");
  assert.equal(promptMatch.sessionId, old);
  assert.equal(promptMatch.choice.uid, "claude-opus-5-5-medium");
  assert.equal(router.resolveRequestSessionIdentity({ sessionId: "other-session", lastUserText: "当次发送的文本" }).match, "identity-conflict");
  console.log("SESSION_IDENTITY_OK prompt=exact tool-lineage=exact cascade-rotation=bound conflict=rejected");
} finally {
  const check = path.relative(os.tmpdir(), directory);
  if (!check || check.startsWith("..") || path.isAbsolute(check)) throw new Error("Unsafe test cleanup target");
  fs.rmSync(directory, { recursive: true, force: true });
}
