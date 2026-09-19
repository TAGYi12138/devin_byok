"use strict";

// One-shot removal of the exact model overlay published by 1.0.36.
// No polling, watchers, credential backups, or writes to the authentication DB.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const catalog = require("./native-model-catalog.cjs");
const digest = value => crypto.createHash("sha256").update(value).digest("hex");

function readAuth(file) {
  const { DatabaseSync } = require("node:sqlite");
  const db = new DatabaseSync(file, { readOnly: true });
  try {
    db.exec("PRAGMA busy_timeout=250");
    const row = db.prepare("SELECT value FROM ItemTable WHERE key = ?").get("windsurfAuthStatus");
    if (!row || Buffer.byteLength(String(row.value)) > catalog.MAX_BYTES * 2) return null;
    return JSON.parse(row.value);
  } finally { db.close(); }
}

async function restoreLegacyPickerOverlay(options) {
  const { vscode, protocol, configDir, logger = {} } = options;
  const baselinePath = path.join(configDir, "native-picker-baseline.json");
  // Check before opening auth storage: most installations have no old overlay.
  if (!fs.existsSync(baselinePath)) return { ok: true, changed: false, reason: "no-baseline" };
  if (typeof vscode?.windsurfAuth?.setAuthStatus !== "function") {
    return { ok: true, changed: false, reason: "native-api-unavailable" };
  }
  const appData = process.env.APPDATA || path.join(require("node:os").homedir(), "AppData", "Roaming");
  const authPath = options.authPath || path.join(appData, vscode.env?.appName || "Devin - Next", "User", "globalStorage", "state.vscdb");
  const loadAuth = options.readAuth || (() => readAuth(authPath));
  try {
    const auth = await loadAuth();
    if (typeof auth?.apiKey !== "string" || !auth.apiKey || typeof auth.userStatusProtoBinaryBase64 !== "string") {
      return { ok: true, changed: false, reason: "auth-unavailable" };
    }
    // Retain only a digest for the race check, never persist an auth snapshot.
    const sourceHash = digest(JSON.stringify(auth));
    const status = Buffer.from(auth.userStatusProtoBinaryBase64, "base64");
    if (status.length > catalog.MAX_BYTES) throw new Error("model status exceeds limit");
    const current = protocol.cascadeFromUserStatus(status);
    if (!current?.length) return { ok: true, changed: false, reason: "models-unavailable" };
    const original = catalog.readPickerBaseline(baselinePath, digest(auth.apiKey), digest(current));
    if (!original) return { ok: true, changed: false, reason: "baseline-mismatch" };
    if (original.equals(current)) return { ok: true, changed: false, reason: "already-restored" };

    const restoredStatus = protocol.replaceCascadeInUserStatus(status, original);
    // An account refresh can finish during the first read. Do not publish a
    // stale auth object if any field (including non-model fields) changed.
    const latest = await loadAuth();
    if (!latest || digest(JSON.stringify(latest)) !== sourceHash) {
      return { ok: true, changed: false, reason: "auth-changed" };
    }
    await vscode.windsurfAuth.setAuthStatus({
      ...latest,
      userStatusProtoBinaryBase64: restoredStatus.toString("base64")
    });
    logger.info?.("[NATIVE-PICKER] removed legacy model overlay via=host-api");
    return { ok: true, changed: true, reason: "restored" };
  } catch (error) {
    // Authentication values and upstream exception messages stay out of logs.
    logger.warn?.("[NATIVE-PICKER] 旧模型状态迁移失败（" + (error.code || error.name || "Error") + "）");
    return { ok: false, changed: false, reason: "migration-failed" };
  }
}

module.exports = { restoreLegacyPickerOverlay };
