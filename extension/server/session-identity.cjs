"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");

function normalizePrompt(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function promptDigest(value) {
  const normalized = normalizePrompt(value);
  return normalized ? crypto.createHash("sha256").update(normalized).digest("hex") : "";
}

function promptText(parts) {
  if (typeof parts === "string") return parts;
  if (!Array.isArray(parts)) return "";
  return parts.map(part => typeof part === "string" ? part : part && part.type === "text" && typeof part.text === "string" ? part.text : "")
    .filter(Boolean).join("\n");
}

class PromptIdentityRegistry {
  constructor({ ttlMs = 120000, maxEntries = 256 } = {}) {
    this.ttlMs = ttlMs;
    this.maxEntries = maxEntries;
    this.entries = [];
  }

  prune(now = Date.now()) {
    this.entries = this.entries.filter(entry => now >= entry.at && now - entry.at <= this.ttlMs);
    if (this.entries.length > this.maxEntries) this.entries.splice(0, this.entries.length - this.maxEntries);
  }

  register({ sessionId, prompt, choice, now = Date.now() }) {
    const id = String(sessionId || "").trim();
    const digest = promptDigest(promptText(prompt));
    if (!id || id.length > 256) return { ok: false, reason: "invalid-session" };
    if (!digest) return choice ? { ok: false, reason: "no-text-identity" } : { ok: true, required: false };
    this.prune(now);
    this.entries = this.entries.filter(entry => entry.sessionId !== id || entry.digest !== digest);
    this.entries.push({ sessionId: id, digest, choice: choice ? { ...choice } : null, at: now });
    this.prune(now);
    return { ok: true, required: !!choice };
  }

  resolve(prompt, now = Date.now()) {
    this.prune(now);
    const digest = promptDigest(prompt);
    if (!digest) return { match: "no-prompt", candidateCount: 0 };
    const matches = this.entries.filter(entry => entry.digest === digest);
    const owners = new Set(matches.map(entry => entry.sessionId));
    if (owners.size !== 1) return { match: owners.size ? "prompt-ambiguous" : "prompt-miss", candidateCount: owners.size };
    const hit = matches[matches.length - 1];
    return { match: "prompt-exact", sessionId: hit.sessionId, choice: hit.choice ? { ...hit.choice } : null, candidateCount: 1 };
  }
}

function toolIdsFromMessages(messages) {
  const ids = new Set();
  for (const message of Array.isArray(messages) ? messages : []) {
    if (!message || typeof message !== "object") continue;
    const calls = Array.isArray(message.tool_calls) ? message.tool_calls : [];
    for (const call of calls) {
      const id = String(call && call.id || "").trim();
      if (id.length >= 16 && id.length <= 256) ids.add(id);
    }
    const resultId = String(message.tool_call_id || "").trim();
    if (resultId.length >= 16 && resultId.length <= 256) ids.add(resultId);
  }
  return [...ids].slice(-128);
}

function sessionDbPaths({ dbPath, extensionRoot = __dirname } = {}) {
  const appData = process.platform === "win32"
    ? process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming")
    : process.platform === "darwin"
      ? path.join(os.homedir(), "Library", "Application Support")
      : process.env.XDG_CONFIG_HOME || path.join(os.homedir(), ".config");
  const explicit = dbPath || process.env.BYOK_LOCAL_SESSIONS_DB;
  if (explicit) return [explicit];
  const root = String(extensionRoot).replace(/\\/g, "/");
  const channels = /\/(?:\.devin-next|\.windsurf-next)\//i.test(root) ? ["cli-next"]
    : /\/(?:\.devin|\.windsurf)\//i.test(root) ? ["cli"] : ["cli", "cli-next"];
  return channels.map(channel => path.join(appData, "devin", channel, "sessions.db"));
}
function defaultSessionsDbPath() { return sessionDbPaths()[0]; }

// Tool-call IDs survive the Local protobuf conversion and are stored in the
// active SQLite conversation chain. They are independent of cascade IDs and
// the transport-only message IDs, which do not match sessions.db IDs.
function resolveSessionFromToolHistoryInDatabase(messages, sessionIds, { database, dbPath = defaultSessionsDbPath() } = {}) {
  const ids = new Set(toolIdsFromMessages(messages));
  if (!ids.size) return { match: "no-tool-id", candidateCount: 0 };
  const candidates = [...new Set((Array.isArray(sessionIds) ? sessionIds : []).map(value => String(value || "").trim()).filter(Boolean))].slice(0, 128);
  if (!candidates.length) return { match: "no-selected-session", candidateCount: 0 };
  let db = database;
  try {
    if (!db) {
      if (!fs.existsSync(dbPath)) return { match: "session-db-missing", candidateCount: 0 };
      const { DatabaseSync } = require("node:sqlite");
      db = new DatabaseSync(dbPath, { readOnly: true });
      db.exec("PRAGMA busy_timeout=250");
    }
    const sessionQuery = db.prepare("SELECT main_chain_id FROM sessions WHERE id = ? LIMIT 1");
    const chainQuery = db.prepare("WITH RECURSIVE chain(node_id,parent_node_id,chat_message,depth) AS (SELECT node_id,parent_node_id,chat_message,0 FROM message_nodes WHERE session_id=? AND node_id=? UNION ALL SELECT m.node_id,m.parent_node_id,m.chat_message,chain.depth+1 FROM message_nodes m JOIN chain ON m.session_id=? AND m.node_id=chain.parent_node_id WHERE chain.depth<1024) SELECT json_extract(chat_message,'$.tool_calls') AS tool_calls,json_extract(chat_message,'$.tool_call_id') AS tool_call_id FROM chain WHERE json_valid(chat_message)");
    const matches = [];
    for (const sessionId of candidates) {
      const bareId = sessionId.includes("/") ? sessionId.slice(sessionId.lastIndexOf("/") + 1) : sessionId;
      if (!bareId) continue;
      const session = sessionQuery.get(bareId);
      if (!session || session.main_chain_id == null) continue;
      let matched = false;
      for (const row of chainQuery.all(bareId, session.main_chain_id, bareId)) {
        let calls;
        try { calls = JSON.parse(String(row.tool_calls || "[]")); } catch { calls = []; }
        if (!Array.isArray(calls)) calls = [];
        if (calls.some(call => ids.has(String(call && call.id || ""))) || ids.has(String(row.tool_call_id || ""))) {
          matched = true;
          break;
        }
      }
      if (matched) matches.push(sessionId);
      if (matches.length > 1) break;
    }
    if (matches.length === 1) return { match: "tool-lineage-exact", sessionId: matches[0], candidateCount: 1 };
    return { match: matches.length ? "tool-lineage-ambiguous" : "tool-lineage-miss", candidateCount: matches.length };
  } catch (error) {
    return { match: "session-db-error", candidateCount: 0, error: String(error && error.code || error && error.name || "Error") };
  } finally {
    if (!database && db) try { db.close(); } catch {}
  }
}

function resolveAcrossDatabases(options, resolve, kind) {
  if (options.database) return resolve(options);
  const matches = [], results = [];
  for (const dbPath of sessionDbPaths(options)) {
    const result = resolve({ ...options, dbPath });
    results.push(result);
    if (result.match === kind + "-ambiguous") return result;
    if (result.match === kind + "-exact") matches.push(result);
  }
  if (matches.length > 1) return { match: kind + "-ambiguous", candidateCount: matches.length };
  return matches[0] || results.find(r => !["session-db-missing", "session-db-error"].includes(r.match)) || results[0] || { match: kind + "-miss", candidateCount: 0 };
}

function resolveSessionFromToolHistory(messages, sessionIds, options = {}) {
  return resolveAcrossDatabases(options, opt => resolveSessionFromToolHistoryInDatabase(messages, sessionIds, opt), "tool-lineage");
}

function resolveSessionFromMessageIds(ids, options = {}) {
  const values = [...new Set((ids || []).map(v => String(v || "").trim()).filter(v => v && v.length <= 512))].slice(0, 64);
  if (!values.length) return { match: "no-message-id", candidateCount: 0 };
  return resolveAcrossDatabases(options, ({ database, dbPath }) => {
    let db = database;
    try {
      if (!db) { if (!fs.existsSync(dbPath)) return { match: "session-db-missing", candidateCount: 0 }; db = new (require("node:sqlite").DatabaseSync)(dbPath, { readOnly: true }); db.exec("PRAGMA busy_timeout=250"); }
      const rows = db.prepare("SELECT DISTINCT session_id FROM message_nodes WHERE json_valid(chat_message) AND json_extract(chat_message,'$.message_id') IN (" + values.map(() => "?").join(",") + ") LIMIT 2").all(...values);
      return rows.length === 1 ? { match: "message-exact", sessionId: rows[0].session_id, candidateCount: 1 } : { match: rows.length ? "message-ambiguous" : "message-miss", candidateCount: rows.length };
    } catch { return { match: "session-db-error", candidateCount: 0 }; }
    finally { if (!database && db) try { db.close(); } catch {} }
  }, "message");
}

// Last-resort correlation for transports that omitted the prompt preflight.
// Inspect the latest user node on every recently active chain, including
// unselected sessions: duplicate prompts must not inherit a different picker.
function resolveSessionFromPromptHistory(prompt, options = {}) {
  const digest = promptDigest(promptText(prompt));
  if (!digest) return { match: "no-prompt", candidateCount: 0 };
  const now = options.now ?? Date.now(), ttl = options.ttlMs ?? 120000;
  return resolveAcrossDatabases(options, ({ database, dbPath }) => {
    let db = database;
    try {
      if (!db) { if (!fs.existsSync(dbPath)) return { match: "session-db-missing", candidateCount: 0 }; db = new (require("node:sqlite").DatabaseSync)(dbPath, { readOnly: true }); db.exec("PRAGMA busy_timeout=250"); }
      const since = now - ttl, matches = [];
      const sessions = db.prepare("SELECT id,main_chain_id FROM sessions WHERE (last_activity_at>=? AND last_activity_at<=?) OR (last_activity_at>=? AND last_activity_at<=?) LIMIT 513").all(since, now + 5000, Math.floor(since / 1000), Math.ceil((now + 5000) / 1000));
      if (sessions.length > 512) return { match: "db-prompt-limit", candidateCount: 0 };
      const query = db.prepare("WITH RECURSIVE chain(node_id,parent_node_id,chat_message,created_at,depth) AS (SELECT node_id,parent_node_id,chat_message,created_at,0 FROM message_nodes WHERE session_id=? AND node_id=? UNION ALL SELECT m.node_id,m.parent_node_id,m.chat_message,m.created_at,c.depth+1 FROM message_nodes m JOIN chain c ON m.session_id=? AND m.node_id=c.parent_node_id WHERE c.depth<256) SELECT json_extract(chat_message,'$.content') AS content,created_at FROM chain WHERE json_valid(chat_message) AND json_extract(chat_message,'$.role')='user' ORDER BY depth LIMIT 1");
      for (const session of sessions) {
        const row = query.get(session.id, session.main_chain_id, session.id);
        if (!row) continue;
        const at = Number(row.created_at) * (Number(row.created_at) < 1e11 ? 1000 : 1);
        if (at < since || at > now + 5000) continue;
        let content = row.content;
        if (typeof content === "string" && content.startsWith("[")) { try { const parts = JSON.parse(content); if (Array.isArray(parts)) content = parts; } catch {} }
        if (promptDigest(promptText(content)) === digest) matches.push(session.id);
        if (matches.length > 1) return { match: "db-prompt-ambiguous", candidateCount: matches.length };
      }
      return matches.length ? { match: "db-prompt-exact", sessionId: matches[0], candidateCount: 1 } : { match: "db-prompt-miss", candidateCount: 0 };
    } catch { return { match: "session-db-error", candidateCount: 0 }; }
    finally { if (!database && db) try { db.close(); } catch {} }
  }, "db-prompt");
}

module.exports = { PromptIdentityRegistry, normalizePrompt, promptDigest, promptText, toolIdsFromMessages, sessionDbPaths, defaultSessionsDbPath, resolveSessionFromMessageIds, resolveSessionFromPromptHistory, resolveSessionFromToolHistory };
