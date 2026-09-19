"use strict";

const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const crypto = require("node:crypto");
const catalog = require("./native-model-catalog.cjs");
const digest = value => crypto.createHash("sha256").update(value).digest("hex");

function readAuth(file) {
  const { DatabaseSync } = require("node:sqlite");
  const db = new DatabaseSync(file, { readOnly: true });
  try {
    db.exec("PRAGMA busy_timeout=250");
    const row = db.prepare("SELECT value FROM ItemTable WHERE key = 'windsurfAuthStatus'").get();
    if (!row || Buffer.byteLength(String(row.value)) > catalog.MAX_BYTES * 2) return null;
    return JSON.parse(row.value);
  } finally { db.close(); }
}

function createNativePickerSync(options) {
  const { vscode, protocol, configDir, getPolicy, logger = {} } = options;
  const appData = process.env.APPDATA || path.join(require("node:os").homedir(), "AppData", "Roaming");
  const authPath = options.authPath || path.join(appData, vscode.env?.appName || "Devin - Next", "User", "globalStorage", "state.vscdb");
  const loadAuth = options.readAuth || (() => readAuth(authPath));
  const snapshotPath = path.join(configDir, "host-models.json.native.json");
  const baselinePath = path.join(configDir, "native-picker-baseline.json");
  const getCatalog = options.readCatalog || (() => {
    // A captured live response is complete, even when smaller than a disk cache.
    return catalog.latestCache([snapshotPath], 1) || catalog.latestCache(protocol.localModelConfigsPaths(), 1);
  });
  let disposed = false, timer = null, running = null, dirty = false, request = null;
  let originalCascade = null, publishedHash = "", accountHash = "", lastError = "";
  const watchers = [];
  const available = typeof vscode.windsurfAuth?.setAuthStatus === "function";
  function report(message) {
    if (message !== lastError) logger.warn?.("[NATIVE-PICKER] " + message);
    lastError = message;
  }
  function probeReady() {
    if (options.isLocalReady) return options.isLocalReady();
    return new Promise(resolve => {
      let done = false, deadline;
      const finish = ready => {
        if (done) return;
        done = true; clearTimeout(deadline);
        request?.destroy(); request = null;
        resolve(ready);
      };
      request = http.get({ hostname: "127.0.0.1", port: 6778, path: "/__byok/ping", agent: false }, response => {
        let text = "";
        response.on("data", chunk => {
          if (text.length + chunk.length > 65536) return finish(false);
          text += chunk.toString("utf8");
        });
        response.on("error", () => finish(false));
        response.on("end", () => {
          try { const data = JSON.parse(text); finish(response.statusCode === 200 && data.byok === true && data.role === "local-probe"); }
          catch { finish(false); }
        });
      });
      request.on("error", () => finish(false));
      deadline = setTimeout(() => finish(false), 1200);
    });
  }
  async function update() {
    if (disposed || !available) return { ok: false, reason: available ? "disposed" : "native-api-unavailable" };
    try {
      const policy = getPolicy();
      const ready = policy?.enabled && policy.unlockModels !== false && await probeReady();
      if (disposed) return { ok: false, reason: "disposed" };
      // Read immediately before publishing; retain all non-model auth fields.
      const auth = loadAuth();
      if (!auth?.apiKey || !auth.userStatusProtoBinaryBase64) return { ok: false, reason: "auth-unavailable" };
      const account = digest(auth.apiKey);
      if (account !== accountHash) { originalCascade = null; publishedHash = ""; accountHash = account; }
      const status = Buffer.from(auth.userStatusProtoBinaryBase64, "base64");
      if (status.length > catalog.MAX_BYTES) throw new Error("user status exceeds model sync limit");
      const current = protocol.cascadeFromUserStatus(status);
      if (!current?.length) return { ok: false, reason: "models-unavailable" };
      const currentHash = digest(current);
      if (currentHash !== publishedHash) {
        const restored = catalog.readPickerBaseline(baselinePath, account, currentHash);
        originalCascade = restored || Buffer.from(current);
        if (restored) publishedHash = currentHash;
      }
      let next;
      if (!ready) next = originalCascade;
      else {
        const snapshot = getCatalog();
        if (!snapshot) return { ok: false, reason: "catalog-unavailable" };
        next = catalog.reconcile(snapshot.buf, originalCascade);
        const boundUids = Object.entries(policy.bindings || {})
          .filter(([, binding]) => binding && String(binding.providerId || "").trim() && String(binding.modelId || "").trim())
          .map(([uid]) => uid);
        next = protocol.unlockCascadeModelConfigData(next, { unlockAll: false, boundUids }).buf;
      }
      if (!next || next.equals(current)) return { ok: true, changed: false };
      const nextStatus = protocol.replaceCascadeInUserStatus(status, next);
      const nextAuth = { ...auth, userStatusProtoBinaryBase64: nextStatus.toString("base64") };
      const previousHash = publishedHash;
      publishedHash = digest(next); // Set before native notification can emit a file event.
      try {
        catalog.savePickerBaseline(baselinePath, account, publishedHash, originalCascade);
        await vscode.windsurfAuth.setAuthStatus(nextAuth);
      } catch (error) {
        publishedHash = previousHash;
        try { catalog.savePickerBaseline(baselinePath, account, currentHash, originalCascade); } catch {}
        throw error;
      }
      lastError = "";
      const count = catalog.modelRows(next).length;
      logger.info?.("[NATIVE-PICKER] " + (ready ? "updated" : "restored") + " models=" + count + " via=host-api");
      return { ok: true, changed: true, count };
    } catch (error) {
      // No credentials, authentication messages, or full payloads in diagnostics.
      report("模型同步失败（" + (error.code || error.name || "Error") + "）");
      return { ok: false, reason: "sync-failed" };
    }
  }
  function refresh() {
    if (disposed) return Promise.resolve({ ok: false, reason: "disposed" });
    if (running) { dirty = true; return running; }
    running = update().finally(() => {
      running = null;
      if (dirty && !disposed) { dirty = false; schedule(); }
    });
    return running;
  }
  function schedule() {
    if (disposed || timer) return;
    timer = setTimeout(() => { timer = null; void refresh(); }, 250);
  }
  function start() {
    if (!available) { report("当前 Devin 未提供模型刷新接口，未修改界面或认证数据库"); return; }
    if (watchers.length || disposed) return;
    const paths = [configDir, path.dirname(authPath), ...protocol.localModelConfigsPaths().map(file => path.dirname(file))];
    for (const directory of [...new Set(paths)].slice(0, 5)) {
      try {
        const watcher = fs.watch(directory, { persistent: false }, (_event, file) => {
          if (!file || /^(?:model_configs_v[45].*\.bin|host-models\.json\.native\.json|localBindings\.json|providers\.json|state\.vscdb(?:-wal)?)$/.test(String(file))) schedule();
        });
        watcher.on("error", () => { watcher.close(); report("模型文件监听已关闭，请使用刷新模型命令"); });
        watchers.push(watcher);
      } catch {}
    }
    schedule();
  }
  function dispose() {
    disposed = true; clearTimeout(timer); timer = null; dirty = false;
    for (const watcher of watchers) watcher.close();
    watchers.length = 0;
    request?.destroy(); request = null;
    originalCascade = null; publishedHash = ""; accountHash = "";
  }
  return { start, refresh, dispose };
}
module.exports = { createNativePickerSync };
