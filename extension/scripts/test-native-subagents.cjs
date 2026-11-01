"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { installProfiles, profileStatus, removeProfiles, PROFILE_FILES } = require("../native-subagents.cjs");
const routing = require("../server/subagent-routing.cjs");
const { normalizeArguments } = require("../server/subagent-tool-calls.cjs");
process.env.BYOK_LOCAL_MITM_TEST_EXPORTS = "1";
const bridge = require("../server/run-local-mitm.cjs");

const nativePlugin = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "devin-plugin", ".devin-plugin", "plugin.json"), "utf8"));
assert.equal(nativePlugin.name, "devin-model-gateway");

const root = fs.mkdtempSync(path.join(os.tmpdir(), "devin-subagent-test-"));
try {
  const agentsDir = path.join(root, "agents");
  const first = installProfiles({ targetDir: agentsDir });
  assert.deepEqual(first.installed, PROFILE_FILES);
  assert.equal(profileStatus({ targetDir: agentsDir }).installed, true);
  assert.deepEqual(installProfiles({ targetDir: agentsDir }).installed, []);
  const runnerPath = path.join(agentsDir, "test-runner.md");
  fs.writeFileSync(runnerPath, "existing user profile\n", "utf8");
  assert.throws(() => installProfiles({ targetDir: agentsDir }), /differs/);
  assert.equal(fs.readFileSync(runnerPath, "utf8"), "existing user profile\n");
  assert.throws(() => removeProfiles({ targetDir: agentsDir }), /modified/);
  fs.rmSync(runnerPath);
  installProfiles({ targetDir: agentsDir });
  assert.deepEqual(removeProfiles({ targetDir: agentsDir }).removed, PROFILE_FILES);
  assert.equal(profileStatus({ targetDir: agentsDir }).installed, false);
  assert.deepEqual(removeProfiles({ targetDir: agentsDir }).removed, []);

  const configFile = path.join(root, "config", "subagentRouting.json");
  assert.deepEqual(routing.readRouting(configFile), { mode: "native", modelUid: "" });
  assert.equal(routing.selectRoute("subagent-default", () => { throw new Error("must not resolve"); }, routing.readRouting(configFile)).action, "native");
  assert.equal(routing.selectRoute("ordinary-model", () => { throw new Error("must not resolve"); }).action, "ordinary");
  assert.throws(() => routing.writeRouting({ mode: "bound", modelUid: "subagent-default" }, configFile), /invalid/);
  assert.throws(() => routing.writeRouting({ mode: "bound", modelUid: "compactor" }, configFile), /invalid/);
  routing.writeRouting({ mode: "bound", modelUid: "MODEL_BOUND" }, configFile);
  assert.deepEqual(routing.readRouting(configFile), { mode: "bound", modelUid: "MODEL_BOUND" });
  assert.deepEqual(routing.selectRoute("MODEL_PARENT", () => { throw new Error("must not resolve"); }, routing.readRouting(configFile)), { action: "ordinary", modelUid: "MODEL_PARENT" });
  const bound = routing.selectRoute("subagent-default", uid => ({ ok: uid === "MODEL_BOUND", cfg: { model: "upstream" } }), routing.readRouting(configFile));
  assert.equal(bound.action, "bound");
  assert.equal(bound.modelUid, "MODEL_BOUND");
  assert.equal(bound.resolved.cfg.model, "upstream");
  assert.deepEqual(routing.selectRoute("subagent-default", () => ({ ok: false, reason: "unbound" }), routing.readRouting(configFile)), { action: "error", reason: "unbound" });
  const childSystem = "<!-- devin-model-gateway-managed-v1 -->\nYou are a read-only research subagent.\nYou are powered by Subagent Default.";
  const childWire = bridge.buildGetChatMessageBody({
    systemPrompt: childSystem,
    modelUid: "swe-1-6-slow",
    turns: [{ source: bridge.SOURCE.USER, prompt: "Investigate the repository" }]
  });
  const childRequest = bridge.extractChatContext(childWire, { "content-type": "application/connect+proto" });
  assert.equal(childRequest.ok, true);
  assert.equal(childRequest.modelUid, "swe-1-6-slow");
  assert.equal(childRequest.systemPrompt, childSystem);
  assert.equal(routing.classifyDefaultRequest(childRequest.modelUid, childRequest.systemPrompt), "native-default-system");
  const systemTurnWire = bridge.buildGetChatMessageBody({
    systemPrompt: "General system instructions",
    modelUid: "swe-1-6-slow",
    turns: [
      { source: bridge.SOURCE.SYSTEM_PROMPT, prompt: "You are powered by Subagent Default." },
      { source: bridge.SOURCE.USER, prompt: "Investigate the repository" }
    ]
  });
  const systemTurnRequest = bridge.extractChatContext(systemTurnWire, { "content-type": "application/connect+proto" });
  assert.equal(routing.classifyDefaultRequest(systemTurnRequest.modelUid, systemTurnRequest.systemPrompt), "native-default-system");
  const ordinaryWire = bridge.buildGetChatMessageBody({
    systemPrompt: "General system instructions",
    modelUid: "swe-1-6-slow",
    turns: [{ source: bridge.SOURCE.USER, prompt: "You are powered by Subagent Default." }]
  });
  const ordinaryRequest = bridge.extractChatContext(ordinaryWire, { "content-type": "application/connect+proto" });
  assert.equal(routing.classifyDefaultRequest(ordinaryRequest.modelUid, ordinaryRequest.systemPrompt), "");
  assert.equal(routing.selectRoute(routing.INTERNAL_UID, () => ({ ok: true, cfg: { model: "upstream" } }), routing.readRouting(configFile)).modelUid, "MODEL_BOUND");
  assert.equal(routing.classifyDefaultRequest("subagent-default", ""), "internal-uid");
  assert.equal(routing.classifyDefaultRequest("swe-1-6-slow", "Ordinary parent session"), "");
  assert.equal(routing.classifyDefaultRequest("swe-1-6-slow", "System prompt\nUser said: You are powered by Subagent Default."), "");
  assert.equal(routing.classifyDefaultRequest("swe-1-6-fast", childSystem), "");
  assert.equal(routing.classifyDefaultRequest("gpt-6-sol-medium", childSystem), "");
  assert.equal(routing.classifyDefaultRequest("swe-1-6-slow", "System prompt\nYou are powered by Subagent Defaultish."), "");
  routing.writeRouting({ mode: "native" }, configFile);
  assert.equal(routing.readRouting(configFile).mode, "native");
  fs.writeFileSync(configFile, "{broken", "utf8");
  assert.throws(() => routing.readRouting(configFile), /JSON/);

  const newCall = { profile: "test-runner", task: "run focused tests", resume: "" };
  assert.deepEqual(JSON.parse(normalizeArguments("run_subagent", JSON.stringify(newCall))), {
    profile: "test-runner", task: "run focused tests"
  });
  assert.deepEqual(JSON.parse(normalizeArguments("run_subagent", JSON.stringify({ ...newCall, resume: "new" }))), {
    profile: "test-runner", task: "run focused tests"
  });
  const existingCall = JSON.stringify({ ...newCall, resume: "agent-123" });
  assert.equal(normalizeArguments("run_subagent", existingCall), existingCall);
  assert.equal(normalizeArguments("other_tool", JSON.stringify(newCall)), JSON.stringify(newCall));
  assert.equal(normalizeArguments("run_subagent", "{broken"), "{broken");
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}

console.log("NATIVE_SUBAGENTS_OK");
