"use strict";

const fs = require("node:fs");
const crypto = require("node:crypto");
const os = require("node:os");
const path = require("node:path");

const INTERNAL_UID = "subagent-default";
const NATIVE_DEFAULT_WIRE_UID = "swe-1-6-slow";
const NATIVE_DEFAULT_SYSTEM_LINE = /(?:^|\n)[ \t]*You are powered by Subagent Default\.[ \t]*(?:\r?\n|$)/;

// Current Devin builds send the native default model's SWE UID for a child
// agent even though its own system prompt names Subagent Default. Inspect only
// the decoded system prompt; user text must never be able to select this route.
function classifyDefaultRequest(requestUid, systemPrompt) {
  const uid = String(requestUid || "").trim();
  if (uid === INTERNAL_UID) return "internal-uid";
  if (uid === NATIVE_DEFAULT_WIRE_UID && typeof systemPrompt === "string"
      && NATIVE_DEFAULT_SYSTEM_LINE.test(systemPrompt)) return "native-default-system";
  return "";
}

function configPath(env = process.env) {
  if (env.BYOK_SUBAGENT_ROUTING_PATH) return path.resolve(env.BYOK_SUBAGENT_ROUTING_PATH);
  const appData = process.platform === "win32"
    ? env.APPDATA || path.join(os.homedir(), "AppData", "Roaming")
    : process.platform === "darwin"
      ? path.join(os.homedir(), "Library", "Application Support")
      : env.XDG_CONFIG_HOME || path.join(os.homedir(), ".config");
  return path.join(appData, "Devin-BYOK-Bridge", "config", "subagentRouting.json");
}

function validModelUid(value) {
  const uid = String(value || "").trim();
  return uid.length > 0 && uid.length <= 256 && /^[\x21-\x7e]+$/.test(uid)
    && !/_BYOK|PRIVATE/i.test(uid)
    && !/^(?:subagent|memory-migration)-default$/i.test(uid)
    && !/^compactor$/i.test(uid)
    && !/^byok-slot/i.test(uid);
}

function parseRouting(value) {
  if (!value || typeof value !== "object") return { mode: "native", modelUid: "" };
  if (value.mode === "native") return { mode: "native", modelUid: "" };
  if (value.mode === "bound" && validModelUid(value.modelUid)) {
    return { mode: "bound", modelUid: String(value.modelUid).trim() };
  }
  throw new Error("invalid subagent routing configuration");
}

function readRouting(file = configPath()) {
  try {
    return parseRouting(JSON.parse(fs.readFileSync(file, "utf8")));
  } catch (error) {
    if (error && error.code === "ENOENT") return { mode: "native", modelUid: "" };
    throw error;
  }
}

function writeRouting(value, file = configPath()) {
  const routing = parseRouting(value);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temporary = file + "." + process.pid + "." + crypto.randomUUID() + ".tmp";
  try {
    fs.writeFileSync(temporary, JSON.stringify({ version: 1, ...routing }, null, 2) + "\n", { encoding: "utf8", flag: "wx" });
    fs.renameSync(temporary, file);
  } finally {
    try { fs.rmSync(temporary, { force: true }); } catch {}
  }
  return routing;
}

function selectRoute(requestUid, resolveBinding, routing = readRouting()) {
  if (String(requestUid || "").trim() !== INTERNAL_UID) return { action: "ordinary", modelUid: requestUid };
  if (routing.mode === "native") return { action: "native", modelUid: INTERNAL_UID };
  if (!validModelUid(routing.modelUid)) return { action: "error", reason: "invalid-model-uid" };
  let resolved;
  try { resolved = resolveBinding(routing.modelUid); }
  catch (error) { return { action: "error", reason: "binding-lookup-failed", error }; }
  if (!resolved || !resolved.ok) return { action: "error", reason: resolved && resolved.reason || "binding-unavailable" };
  return { action: "bound", modelUid: routing.modelUid, resolved };
}

module.exports = { INTERNAL_UID, classifyDefaultRequest, configPath, validModelUid, parseRouting, readRouting, writeRouting, selectRoute };
