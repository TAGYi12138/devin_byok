"use strict";

// Durable, bounded diagnostics for failures that can take the Devin renderer
// down with the extension host.  This module deliberately records metadata and
// error lines only; request bodies, prompts and credentials are redacted.
const fs = require("fs");
const path = require("path");
const os = require("os");
const childProcess = require("child_process");

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const MAX_CRITICAL_FILE_BYTES = 2 * 1024 * 1024;
const MAX_QUEUE_BYTES = 512 * 1024;
const MAX_QUEUE_ITEMS = 512;
const MAX_LINE_CHARS = 16 * 1024;
const MAX_RENDERER_READ_BYTES = 64 * 1024;
const SAMPLE_INTERVAL_MS = 5000;
// Process/system metrics come from one long-lived PowerShell child.  A ten
// second cadence is short enough to catch the run-up to an OOM without paying
// PowerShell startup and CIM-provider initialization costs for every sample.
const WINDOWS_SAMPLER_INTERVAL_MS = 10000;
const WINDOWS_SAMPLER_RESTART_MS = 60000;
const ARTIFACT_SAMPLE_INTERVAL_MS = 30000;
const MAX_PROCESS_ROWS = 64;
const PROCESS_ROWS_PER_RECORD = 12;
const LOG_DISCOVERY_INTERVAL_MS = 15000;
const WINDOWS_EVENT_INTERVAL_MS = 60000;

function asError(error) {
  try {
    if (!error) return { message: "unknown" };
    if (error instanceof Error) return { name: error.name, message: error.message, stack: error.stack };
    return { message: String(error) };
  } catch {
    return { message: "[error details unavailable]" };
  }
}

function redactText(value) {
  return String(value == null ? "" : value)
    .replace(/data:[^;\s]+;base64,[A-Za-z0-9+/=_-]+/gi, "[redacted-image-data]")
    .replace(/\bBearer\s+[A-Za-z0-9._~+\/-]{8,}=*/gi, "Bearer [redacted]")
    .replace(/\bsk-[A-Za-z0-9_-]{8,}\b/g, "sk-[redacted]")
    .replace(/\b(?:gh[pousr]_[A-Za-z0-9_]{16,}|github_pat_[A-Za-z0-9_]{16,}|AIza[A-Za-z0-9_-]{20,}|AKIA[A-Z0-9]{16})\b/g, "[redacted-token]")
    .replace(/\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b/g, "[redacted-jwt]")
    .replace(/([?&](?:api[_-]?key|access[_-]?token|token|secret|password|key)=)[^&#\s]+/gi, "$1[redacted]")
    .replace(/((?:api[_-]?key|x-api-key|access[_-]?token|authorization|token|secret|password)["']?\s*[:=]\s*["']?)[^\s,"';}]{6,}/gi, "$1[redacted]")
    .replace(/\b[A-Za-z0-9_\/-]{80,}={0,2}\b/g, "[redacted-long-token]");
}

function safeLogLine(value, max = 4096) {
  let text = redactText(value);
  // Error logs sometimes inline request payloads. Preserve the diagnostic
  // prefix, then remove the remainder once a payload-bearing field begins.
  text = text.replace(/(["']?(?:prompt|messages?|content|request.?body|response.?body|payload|conversation|image.?data)["']?\s*[:=]\s*)([\s\S]*)/i, "$1[redacted-payload]");
  if (text.length > max) text = text.slice(0, max) + " …[truncated]";
  return text;
}

function safeString(value, max = 2048) {
  let text = redactText(value);
  if (text.length > max) text = text.slice(0, max) + " …[truncated]";
  return text;
}

function safeCommandLine(value, max = 512) {
  let text = safeString(value, max);
  // Command lines are useful for distinguishing Electron renderer/GPU/utility
  // processes, but switches can also contain credentials or user content.
  text = text.replace(/(--(?:prompt|message|content|payload|token|access-token|api-key|secret|password)(?:=|\s+))(?:("[^"]*")|('[^']*')|\S+)/gi, "$1[redacted]");
  return text;
}

function boundedInteger(value, min = 0, max = Number.MAX_SAFE_INTEGER) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.max(min, Math.min(max, Math.trunc(number)));
}

function normalizeWindowsSamplerPayload(payload) {
  if (!payload || typeof payload !== "object") return null;
  const sourceRows = Array.isArray(payload.devinRows) ? payload.devinRows : [];
  const rows = [];
  for (const source of sourceRows.slice(0, MAX_PROCESS_ROWS)) {
    if (!source || typeof source !== "object") continue;
    const commandLine = safeCommandLine(source.commandLine, 512);
    const inferredType = /(?:^|\s)--type=(?:"([^"]+)"|'([^']+)'|(\S+))/i.exec(commandLine);
    rows.push({
      pid: boundedInteger(source.pid),
      parentPid: boundedInteger(source.parentPid),
      imageName: safeString(source.imageName || "Devin - Next.exe", 80),
      processType: safeString(source.processType || (inferredType && (inferredType[1] || inferredType[2] || inferredType[3])) || "main", 80),
      workingSetBytes: boundedInteger(source.workingSetBytes),
      privateBytes: boundedInteger(source.privateBytes),
      pageFileBytes: boundedInteger(source.pageFileBytes),
      handleCount: boundedInteger(source.handleCount, 0, 10000000),
      threadCount: boundedInteger(source.threadCount, 0, 1000000),
      startTime: safeString(source.startTime, 64),
      commandLine
    });
  }
  rows.sort((a, b) => b.workingSetBytes - a.workingSetBytes || a.pid - b.pid);
  const sum = (field) => rows.reduce((total, row) => total + row[field], 0);
  return {
    sampledAt: safeString(payload.sampledAt || new Date().toISOString(), 64),
    rows,
    sourceRowCount: boundedInteger(payload.devinRowCount || sourceRows.length, 0, 1000000),
    omittedRows: Math.max(0, sourceRows.length - rows.length) + boundedInteger(payload.omittedRows, 0, 1000000),
    devinWorkingSetBytes: sum("workingSetBytes"),
    devinPrivateBytes: sum("privateBytes"),
    devinPageFileBytes: sum("pageFileBytes"),
    devinHandleCount: sum("handleCount"),
    devinThreadCount: sum("threadCount"),
    systemCommittedBytes: boundedInteger(payload.systemCommittedBytes),
    systemCommitLimitBytes: boundedInteger(payload.systemCommitLimitBytes),
    systemCommitPercent: Math.max(0, Math.min(100, Number(payload.systemCommitPercent) || 0)),
    systemPagedPoolBytes: boundedInteger(payload.systemPagedPoolBytes),
    systemNonPagedPoolBytes: boundedInteger(payload.systemNonPagedPoolBytes),
    systemAvailableBytes: boundedInteger(payload.systemAvailableBytes),
    systemWebView2Count: boundedInteger(payload.systemWebView2Count, 0, 1000000),
    systemWebView2WorkingSetBytes: boundedInteger(payload.systemWebView2WorkingSetBytes)
  };
}

function sanitize(value, depth = 0, key = "") {
  const lowerKey = String(key).toLowerCase();
  if (/token|secret|password|authorization|api[-_]?key|cookie|prompt|messages?|content|request.?body|response.?body|payload|conversation|base64|image.?data/.test(lowerKey)) {
    return "[redacted]";
  }
  if (value instanceof Error) return sanitize(asError(value), depth + 1, key);
  if (value == null || typeof value === "boolean" || typeof value === "number") return value;
  if (typeof value === "string") {
    if (/^data:[^;]+;base64,/i.test(value) || value.length > 8192) return safeString(value, 2048);
    return safeString(value);
  }
  if (depth >= 3) return "[depth-limited]";
  if (Array.isArray(value)) return value.slice(0, 32).map((item) => sanitize(item, depth + 1, key));
  if (typeof value === "object") {
    const result = {};
    for (const objectKey of Object.keys(value).slice(0, 40)) {
      try { result[objectKey] = sanitize(value[objectKey], depth + 1, objectKey); } catch { result[objectKey] = "[unavailable]"; }
    }
    return result;
  }
  return safeString(value);
}

class CrashDiagnostics {
  constructor(options = {}) {
    this.rootDir = options.rootDir || path.join(process.env.APPDATA || os.tmpdir(), "Devin-BYOK-Bridge", "diagnostics");
    const defaultLogs = process.env.APPDATA ? [
      path.join(process.env.APPDATA, "Devin - Next", "logs"),
      path.join(process.env.APPDATA, "devin", "cli-next", "logs")
    ] : [path.join(os.tmpdir(), "Devin - Next", "logs")];
    this.workbenchLogsRoots = (options.workbenchLogsRoots || options.workbenchLogsRoot || defaultLogs);
    if (!Array.isArray(this.workbenchLogsRoots)) this.workbenchLogsRoots = [this.workbenchLogsRoots];
    this.logger = options.logger || null;
    this.externalSampling = options.externalSampling !== false;
    this.sessionId = Date.now() + "-" + process.pid;
    this.file = path.join(this.rootDir, "runtime-" + this.sessionId + ".jsonl");
    this.criticalFile = path.join(this.rootDir, "critical-" + this.sessionId + ".jsonl");
    this.readme = path.join(this.rootDir, "README.txt");
    this.queue = [];
    this.queueBytes = 0;
    this.dropped = 0;
    this.flushTimer = null;
    this.writing = false;
    this.sampleTimer = null;
    this.started = false;
    this.logTails = new Map();
    this.lastEvents = new Map();
    this.handlers = [];
    this.windowsSampler = null;
    this.windowsSamplerPartial = "";
    this.windowsSamplerErrorPartial = "";
    this.windowsSamplerLastStartAt = 0;
    this.windowsSamplerFailures = 0;
    this.lastArtifactSampleAt = 0;
    this.lastCrashDumpSignature = "";
    this.windowsEventSampleInFlight = false;
    this.lastWindowsEventSampleAt = 0;
    this.lastWindowsEventSignatures = new Map();
    this.cachedLogFiles = [];
    this.lastLogDiscoveryAt = 0;
    this.writeErrors = 0;
    this.children = new Set();
    this.externalSamplingReadyAt = 0;
    this.windowsEventReadyAt = 0;
    this.inflightPayload = "";
  }

  start(meta = {}) {
    if (this.started) return this.file;
    this.started = true;
    try {
      fs.mkdirSync(this.rootDir, { recursive: true });
      fs.writeFileSync(this.readme, "Devin BYOK Bridge crash diagnostics\n" +
        "Each runtime-<pid>.jsonl is bounded to three 8 MiB generations (current, .1 and .2).\n" +
        "critical-<pid>.jsonl is synchronously written for fatal exceptions and shutdown boundaries.\n" +
        "It records extension-host memory; per-PID Devin working set/private/page-file bytes, handles and threads; system commit/pool pressure; relevant host logs; Windows crash events; and crash-dump metadata.\n" +
        "Request bodies, prompts, image data and credentials are excluded or redacted.\n", "utf8");
      this._cleanupOldSessions();
      fs.writeFileSync(path.join(this.rootDir, "latest.json"), JSON.stringify({
        updatedAt: new Date().toISOString(),
        pid: process.pid,
        runtime: this.file,
        critical: this.criticalFile
      }, null, 2), "utf8");
    } catch {}
    this._installHandlers();
    this.record("activate", {
      extensionVersion: meta.extensionVersion,
      extensionHostPid: process.pid,
      node: process.version,
      electron: process.versions && process.versions.electron,
      chrome: process.versions && process.versions.chrome,
      platform: process.platform,
      arch: process.arch,
      appVersion: meta.appVersion,
      extensionRoot: meta.extensionRoot,
      workbenchPath: meta.workbenchPath,
      workbenchLogsRoots: this.workbenchLogsRoots
    });
    this.externalSamplingReadyAt = Date.now() + 5000;
    this.windowsEventReadyAt = Date.now() + 30000;
    this.sample("activate", true, false);
    this.sampleTimer = setInterval(() => this.sample("interval", true, Date.now() >= this.externalSamplingReadyAt), SAMPLE_INTERVAL_MS);
    try { this.sampleTimer.unref(); } catch {}
    return this.file;
  }

  currentPath() { return this.file; }

  _formatLine(event, data = {}) {
    const row = {
      ts: new Date().toISOString(),
      event: safeString(event, 128),
      pid: process.pid,
      uptimeMs: Math.round(process.uptime() * 1000),
      data: sanitize(data)
    };
    let line;
    try { line = JSON.stringify(row); } catch { line = JSON.stringify({ ts: row.ts, event: row.event, pid: row.pid, data: "[serialization-failed]" }); }
    if (line.length > MAX_LINE_CHARS) {
      line = JSON.stringify({ ts: row.ts, event: row.event, pid: row.pid, uptimeMs: row.uptimeMs, data: { note: "record truncated", preview: safeString(line, MAX_LINE_CHARS - 128) } });
    }
    line += "\n";
    return line;
  }

  record(event, data = {}) {
    if (!this.started && event !== "activate") return;
    const line = this._formatLine(event, data);
    this._enqueue(line);
  }

  _recordCritical(event, data = {}) {
    const line = this._formatLine(event, data);
    this._appendCriticalPayload(line);
  }

  _appendCriticalPayload(payload) {
    if (!payload) return;
    try {
      fs.mkdirSync(this.rootDir, { recursive: true });
      let size = 0;
      try { size = fs.statSync(this.criticalFile).size; } catch {}
      if (size + Buffer.byteLength(payload, "utf8") > MAX_CRITICAL_FILE_BYTES) {
        try { fs.unlinkSync(this.criticalFile + ".1"); } catch {}
        try { fs.renameSync(this.criticalFile, this.criticalFile + ".1"); } catch {}
      }
      fs.appendFileSync(this.criticalFile, payload, "utf8");
    } catch {}
  }

  captureLogLine(line) {
    const text = safeLogLine(line, MAX_LINE_CHARS);
    if (!/(\bERR\b|\bWARN\b|crash|fatal|oom|out of memory|memory|renderer|webview|msedgewebview2|0xc000012d|unhandled|exception|gone)/i.test(text)) return;
    const key = text.slice(0, 512);
    const now = Date.now();
    if ((this.lastEvents.get(key) || 0) + 5000 > now) return;
    this.lastEvents.set(key, now);
    for (const [entry, at] of this.lastEvents) if (at + 60000 < now) this.lastEvents.delete(entry);
    while (this.lastEvents.size > 256) this.lastEvents.delete(this.lastEvents.keys().next().value);
    this.record("extension_log", { line: text });
  }

  sample(reason, includeLogTail = true, includeSystemSampling = includeLogTail) {
    if (!this.started) return;
    const memory = process.memoryUsage();
    const data = {
      reason,
      memory: {
        rss: memory.rss,
        heapTotal: memory.heapTotal,
        heapUsed: memory.heapUsed,
        external: memory.external,
        arrayBuffers: memory.arrayBuffers
      },
      diagnostics: {
        queueItems: this.queue.length,
        queueBytes: this.queueBytes,
        droppedTotal: this.dropped,
        writeErrors: this.writeErrors
      }
    };
    try {
      const resource = process.resourceUsage && process.resourceUsage();
      if (resource) data.resource = { userCPUTime: resource.userCPUTime, systemCPUTime: resource.systemCPUTime, maxRSS: resource.maxRSS, fsRead: resource.fsRead, fsWrite: resource.fsWrite }; 
    } catch {}
    try {
      if (typeof process.getActiveResourcesInfo === "function") {
        const active = process.getActiveResourcesInfo();
        data.activeResources = { count: active.length, types: active.slice(0, 32) };
      }
    } catch {}
    this.record("memory_sample", data);
    if (includeLogTail) {
      if (includeSystemSampling && this.externalSampling) {
        this._sampleDevinProcesses();
        this._sampleCrashDumps();
        this._sampleWindowsEvents();
      }
      this._tailRendererLog();
    }
  }

  dispose(reason = "dispose") {
    if (!this.started) return;
    this._recordCritical("deactivate", { reason });
    this.record("deactivate", { reason });
    this.sample(reason, false, false);
    if (this.sampleTimer) clearInterval(this.sampleTimer);
    this.sampleTimer = null;
    this._removeHandlers();
    this.started = false;
    for (const child of this.children) {
      try { child.kill(); } catch {}
    }
    this.children.clear();
    this.windowsSampler = null;
    this.windowsSamplerPartial = "";
    this.windowsSamplerErrorPartial = "";
    if (this.flushTimer) clearTimeout(this.flushTimer);
    this.flushTimer = null;
    if (this.writing) {
      this._appendCriticalPayload(this.inflightPayload);
      this._flushSync(this.criticalFile, MAX_CRITICAL_FILE_BYTES);
    }
    else this._flushSync();
    this.inflightPayload = "";
    this.writing = false;
    this.lastEvents.clear();
    this.logTails.clear();
    this.cachedLogFiles = [];
  }

  _installHandlers() {
    const add = (event, handler) => {
      try { process.on(event, handler); this.handlers.push([event, handler]); } catch {}
    };
    add("uncaughtExceptionMonitor", (error, origin) => {
      const data = { origin, error: asError(error) };
      this._recordCritical("uncaught_exception_monitor", data);
      this.record("uncaught_exception_monitor", data);
    });
    add("exit", (code) => this._recordCritical("process_exit", { code, memory: process.memoryUsage() }));
    add("warning", (warning) => this.record("process_warning", { error: asError(warning) }));
  }

  _removeHandlers() {
    for (const [event, handler] of this.handlers) {
      try { process.removeListener(event, handler); } catch {}
    }
    this.handlers = [];
  }

  _enqueue(line) {
    const size = Buffer.byteLength(line, "utf8");
    if (size > MAX_LINE_CHARS * 2) return;
    while (this.queue.length >= MAX_QUEUE_ITEMS || this.queueBytes + size > MAX_QUEUE_BYTES) {
      const removed = this.queue.shift();
      if (!removed) break;
      this.queueBytes -= Buffer.byteLength(removed, "utf8");
      this.dropped++;
    }
    this.queue.push(line);
    this.queueBytes += size;
    if (!this.flushTimer) {
      this.flushTimer = setTimeout(() => { this.flushTimer = null; this._flush(); }, 100);
      try { this.flushTimer.unref(); } catch {}
    }
  }

  _flush() {
    if (this.writing || !this.queue.length) return;
    this.writing = true;
    const batch = [];
    let bytes = 0;
    while (this.queue.length && batch.length < 64 && bytes < 256 * 1024) {
      const item = this.queue.shift();
      this.queueBytes -= Buffer.byteLength(item, "utf8");
      batch.push(item);
      bytes += Buffer.byteLength(item, "utf8");
    }
    const payload = batch.join("");
    this.inflightPayload = payload;
    Promise.resolve().then(async () => {
      await fs.promises.mkdir(this.rootDir, { recursive: true });
      let size = 0;
      try { size = (await fs.promises.stat(this.file)).size; } catch {}
      if (size + Buffer.byteLength(payload, "utf8") > MAX_FILE_BYTES) {
        try { await fs.promises.unlink(this.file + ".2"); } catch {}
        try { await fs.promises.rename(this.file + ".1", this.file + ".2"); } catch {}
        try { await fs.promises.rename(this.file, this.file + ".1"); } catch {}
      }
      await fs.promises.appendFile(this.file, payload, "utf8");
    }).catch(() => { this.writeErrors++; }).finally(() => {
      if (this.inflightPayload === payload) this.inflightPayload = "";
      this.writing = false;
      if (this.queue.length) this._flush();
    });
  }

  _flushSync(targetFile = this.file, maxBytes = MAX_FILE_BYTES) {
    if (!this.queue.length) return;
    const batch = this.queue.splice(0);
    this.queueBytes = 0;
    const payload = batch.join("");
    try {
      fs.mkdirSync(this.rootDir, { recursive: true });
      let size = 0;
      try { size = fs.statSync(targetFile).size; } catch {}
      if (size + Buffer.byteLength(payload, "utf8") > maxBytes) {
        if (targetFile === this.file) {
          try { fs.unlinkSync(targetFile + ".2"); } catch {}
          try { fs.renameSync(targetFile + ".1", targetFile + ".2"); } catch {}
        } else {
          try { fs.unlinkSync(targetFile + ".1"); } catch {}
        }
        try { fs.renameSync(targetFile, targetFile + ".1"); } catch {}
      }
      fs.appendFileSync(targetFile, payload, "utf8");
    } catch { this.writeErrors++; }
  }

  _cleanupOldSessions() {
    try {
      const groups = new Map();
      for (const entry of fs.readdirSync(this.rootDir, { withFileTypes: true })) {
        if (!entry.isFile()) continue;
        const match = /^(?:runtime|critical)-(\d+-\d+)\.jsonl(?:\.[12])?$/.exec(entry.name);
        if (!match) continue;
        const full = path.join(this.rootDir, entry.name);
        let mtime = 0;
        try { mtime = fs.statSync(full).mtimeMs; } catch {}
        const group = groups.get(match[1]) || { mtime: 0, files: [] };
        group.mtime = Math.max(group.mtime, mtime);
        group.files.push(full);
        groups.set(match[1], group);
      }
      const oldGroups = [...groups.values()].sort((a, b) => b.mtime - a.mtime).slice(8);
      for (const group of oldGroups) for (const file of group.files) {
        try { fs.unlinkSync(file); } catch {}
      }
    } catch {}
  }

  _execFile(file, args, options, callback) {
    let child;
    try {
      child = childProcess.execFile(file, args, options, (error, stdout, stderr) => {
        if (child) this.children.delete(child);
        callback(error, stdout, stderr);
      });
      this.children.add(child);
      child.once("exit", () => this.children.delete(child));
    } catch (error) {
      callback(error, "", "");
    }
    return child;
  }

  _findRelevantLogs() {
    if (Date.now() - this.lastLogDiscoveryAt < LOG_DISCOVERY_INTERVAL_MS) return this.cachedLogFiles;
    this.lastLogDiscoveryAt = Date.now();
    const files = [];
    for (const logsRoot of this.workbenchLogsRoots) {
      try {
        const entries = fs.readdirSync(logsRoot, { withFileTypes: true });
        const directoryNames = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort().reverse().slice(0, 32);
        let selectedDirectories = 0;
        for (const name of directoryNames) {
          const base = path.join(logsRoot, name);
          const existing = [];
          for (const candidate of [
            path.join(base, "main.log"),
            path.join(base, "window1", "renderer.log"),
            path.join(base, "window1", "exthost", "exthost.log")
          ]) {
            try { if (fs.statSync(candidate).isFile()) existing.push(candidate); } catch {}
          }
          if (!existing.length) continue;
          files.push(...existing);
          if (++selectedDirectories >= 2) break;
        }
        const flatLogs = entries.filter((entry) => entry.isFile() && /^devin-next_.*\.log$/i.test(entry.name)).map((entry) => entry.name).sort().reverse().slice(0, 2);
        files.push(...flatLogs.map((name) => path.join(logsRoot, name)));
      } catch {}
    }
    this.cachedLogFiles = [...new Set(files)].slice(0, 10);
    const active = new Set(this.cachedLogFiles);
    for (const key of this.logTails.keys()) if (!active.has(key)) this.logTails.delete(key);
    while (this.logTails.size > 12) this.logTails.delete(this.logTails.keys().next().value);
    return this.cachedLogFiles;
  }

  _sampleDevinProcesses() {
    if (process.platform !== "win32" || !this.started || this.windowsSampler) return;
    const now = Date.now();
    if (now - this.windowsSamplerLastStartAt < WINDOWS_SAMPLER_RESTART_MS) return;
    this.windowsSamplerLastStartAt = now;
    this._startWindowsSampler();
  }

  _windowsSamplerScript() {
    // Keep this sampler alive instead of launching PowerShell and CIM providers
    // on every tick.  It also checks the extension-host PID so an abrupt host
    // crash cannot leave an orphaned collector running indefinitely.
    return [
      "$ErrorActionPreference = 'SilentlyContinue'",
      "$ProgressPreference = 'SilentlyContinue'",
      "[Console]::OutputEncoding = New-Object System.Text.UTF8Encoding($false)",
      "$OutputEncoding = [Console]::OutputEncoding",
      "$ownerProcessId = " + process.pid,
      "$intervalMilliseconds = " + WINDOWS_SAMPLER_INTERVAL_MS,
      "while ($true) {",
      "  if (-not (Get-Process -Id $ownerProcessId -ErrorAction SilentlyContinue)) { break }",
      "  try {",
      "    $cimRows = @(Get-CimInstance Win32_Process -Filter \"Name = 'Devin - Next.exe' OR Name = 'Devin.exe'\" -ErrorAction SilentlyContinue)",
      "    $metadata = @{}",
      "    foreach ($item in $cimRows) { $metadata[[string]$item.ProcessId] = $item }",
      "    $rows = @()",
      "    $processes = @(Get-Process -Name @('Devin - Next', 'Devin') -ErrorAction SilentlyContinue)",
      "    foreach ($item in @($processes | Select-Object -First " + MAX_PROCESS_ROWS + ")) {",
      "      try {",
      "        $meta = $metadata[[string]$item.Id]",
      "        $commandLine = if ($null -ne $meta) { [string]$meta.CommandLine } else { '' }",
      "        if ($commandLine.Length -gt 768) { $commandLine = $commandLine.Substring(0, 768) + ' ...[truncated]' }",
      "        $processType = 'main'",
      "        if ($commandLine -match '(?:^|\\s)--type=([^\\s\"]+)') { $processType = [string]$Matches[1] }",
      "        $startTime = ''",
      "        try { $startTime = $item.StartTime.ToUniversalTime().ToString('o') } catch {}",
      "        $pageFileBytes = [long]$item.PagedMemorySize64",
      "        if ($null -ne $meta -and $null -ne $meta.PageFileUsage) { $pageFileBytes = [long]$meta.PageFileUsage * 1024 }",
      "        $parentProcessId = 0",
      "        if ($null -ne $meta -and $null -ne $meta.ParentProcessId) { $parentProcessId = [int]$meta.ParentProcessId }",
      "        $rows += [ordered]@{ pid = [int]$item.Id; parentPid = $parentProcessId; imageName = [string]$item.ProcessName; processType = $processType; workingSetBytes = [long]$item.WorkingSet64; privateBytes = [long]$item.PrivateMemorySize64; pageFileBytes = $pageFileBytes; handleCount = [int]$item.HandleCount; threadCount = [int]$item.Threads.Count; startTime = $startTime; commandLine = $commandLine }",
      "      } catch {}",
      "    }",
      "    $memory = Get-CimInstance Win32_PerfFormattedData_PerfOS_Memory -ErrorAction SilentlyContinue",
      "    $systemCommittedBytes = [long]0; $systemCommitLimitBytes = [long]0; $systemCommitPercent = [double]0; $systemPagedPoolBytes = [long]0; $systemNonPagedPoolBytes = [long]0; $systemAvailableBytes = [long]0",
      "    if ($null -ne $memory) { $systemCommittedBytes = [long]$memory.CommittedBytes; $systemCommitLimitBytes = [long]$memory.CommitLimit; $systemCommitPercent = [double]$memory.PercentCommittedBytesInUse; $systemPagedPoolBytes = [long]$memory.PoolPagedBytes; $systemNonPagedPoolBytes = [long]$memory.PoolNonpagedBytes; $systemAvailableBytes = [long]$memory.AvailableBytes }",
      "    if ($systemCommitLimitBytes -le 0) {",
      "      $counterSet = Get-Counter -Counter @('\\Memory\\Committed Bytes', '\\Memory\\Commit Limit', '\\Memory\\% Committed Bytes In Use', '\\Memory\\Pool Paged Bytes', '\\Memory\\Pool Nonpaged Bytes', '\\Memory\\Available Bytes') -ErrorAction SilentlyContinue",
      "      foreach ($sample in @($counterSet.CounterSamples)) {",
      "        $counterPath = ([string]$sample.Path).ToLowerInvariant()",
      "        if ($counterPath.EndsWith('\\memory\\committed bytes')) { $systemCommittedBytes = [long]$sample.CookedValue }",
      "        elseif ($counterPath.EndsWith('\\memory\\commit limit')) { $systemCommitLimitBytes = [long]$sample.CookedValue }",
      "        elseif ($counterPath.EndsWith('\\memory\\% committed bytes in use')) { $systemCommitPercent = [double]$sample.CookedValue }",
      "        elseif ($counterPath.EndsWith('\\memory\\pool paged bytes')) { $systemPagedPoolBytes = [long]$sample.CookedValue }",
      "        elseif ($counterPath.EndsWith('\\memory\\pool nonpaged bytes')) { $systemNonPagedPoolBytes = [long]$sample.CookedValue }",
      "        elseif ($counterPath.EndsWith('\\memory\\available bytes')) { $systemAvailableBytes = [long]$sample.CookedValue }",
      "      }",
      "    }",
      "    $webViews = @(Get-Process -Name 'msedgewebview2' -ErrorAction SilentlyContinue)",
      "    $webViewWorkingSet = [long]0",
      "    foreach ($webView in $webViews) { try { $webViewWorkingSet += [long]$webView.WorkingSet64 } catch {} }",
      "    $result = [ordered]@{ sampledAt = [DateTime]::UtcNow.ToString('o'); devinRowCount = $processes.Count; omittedRows = [Math]::Max(0, $processes.Count - $rows.Count); devinRows = $rows; systemCommittedBytes = $systemCommittedBytes; systemCommitLimitBytes = $systemCommitLimitBytes; systemCommitPercent = $systemCommitPercent; systemPagedPoolBytes = $systemPagedPoolBytes; systemNonPagedPoolBytes = $systemNonPagedPoolBytes; systemAvailableBytes = $systemAvailableBytes; systemWebView2Count = $webViews.Count; systemWebView2WorkingSetBytes = $webViewWorkingSet }",
      "    Write-Output ($result | ConvertTo-Json -Compress -Depth 4)",
      "  } catch {",
      "    $failure = [ordered]@{ sampledAt = [DateTime]::UtcNow.ToString('o'); samplerError = [string]$_.Exception.Message }",
      "    Write-Output ($failure | ConvertTo-Json -Compress -Depth 2)",
      "  }",
      "  Start-Sleep -Milliseconds $intervalMilliseconds",
      "}"
    ].join("\r\n");
  }

  _startWindowsSampler() {
    let child;
    try {
      const encoded = Buffer.from(this._windowsSamplerScript(), "utf16le").toString("base64");
      child = childProcess.spawn("powershell.exe", ["-NoLogo", "-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-EncodedCommand", encoded], {
        windowsHide: true,
        stdio: ["ignore", "pipe", "pipe"]
      });
    } catch (error) {
      this.windowsSamplerFailures++;
      this.record("windows_process_sampler_error", { phase: "spawn", failures: this.windowsSamplerFailures, error: asError(error) });
      return;
    }
    this.windowsSampler = child;
    this.children.add(child);
    let completed = false;
    const finish = (kind, detail) => {
      if (completed) return;
      completed = true;
      this.children.delete(child);
      if (this.windowsSampler === child) this.windowsSampler = null;
      if (this.started) this.record("windows_process_sampler_exit", { kind, detail: safeString(detail, 512) });
    };
    if (child.stdout) child.stdout.on("data", (chunk) => this._consumeWindowsSamplerOutput(chunk));
    if (child.stderr) child.stderr.on("data", (chunk) => {
      this.windowsSamplerErrorPartial = safeString(this.windowsSamplerErrorPartial + chunk.toString("utf8"), 4096);
    });
    child.once("error", (error) => finish("error", error && error.message));
    child.once("exit", (code, signal) => finish("exit", "code=" + code + " signal=" + signal + (this.windowsSamplerErrorPartial ? " stderr=" + this.windowsSamplerErrorPartial : "")));
  }

  _consumeWindowsSamplerOutput(chunk) {
    this.windowsSamplerPartial += Buffer.isBuffer(chunk) ? chunk.toString("utf8") : String(chunk || "");
    if (this.windowsSamplerPartial.length > 256 * 1024) {
      this.windowsSamplerPartial = this.windowsSamplerPartial.slice(-128 * 1024);
      this.windowsSamplerFailures++;
      this.record("windows_process_sampler_error", { phase: "stdout_limit", failures: this.windowsSamplerFailures });
    }
    const lines = this.windowsSamplerPartial.split(/\r?\n/);
    this.windowsSamplerPartial = lines.pop() || "";
    for (const line of lines) {
      if (!line || line.length > 128 * 1024) continue;
      let payload;
      try { payload = JSON.parse(line); } catch {
        this.windowsSamplerFailures++;
        if (this.windowsSamplerFailures <= 3 || this.windowsSamplerFailures % 10 === 0) {
          this.record("windows_process_sampler_error", { phase: "parse", failures: this.windowsSamplerFailures, preview: safeString(line, 512) });
        }
        continue;
      }
      if (payload && payload.samplerError) {
        this.windowsSamplerFailures++;
        if (this.windowsSamplerFailures <= 3 || this.windowsSamplerFailures % 10 === 0) {
          this.record("windows_process_sampler_error", { phase: "sample", failures: this.windowsSamplerFailures, error: safeString(payload.samplerError, 512) });
        }
        continue;
      }
      this._recordWindowsProcessSnapshot(payload);
    }
  }

  _recordWindowsProcessSnapshot(payload) {
    const snapshot = normalizeWindowsSamplerPayload(payload);
    if (!snapshot) return;
    const rows = snapshot.rows;
    const parts = Math.max(1, Math.ceil(rows.length / PROCESS_ROWS_PER_RECORD));
    for (let index = 0; index < parts; index++) {
      this.record("process_snapshot", {
        sampledAt: snapshot.sampledAt,
        part: index + 1,
        parts,
        devinCount: snapshot.sourceRowCount,
        recordedDevinCount: rows.length,
        omittedRows: snapshot.omittedRows,
        devinWorkingSetBytes: snapshot.devinWorkingSetBytes,
        devinPrivateBytes: snapshot.devinPrivateBytes,
        devinPageFileBytes: snapshot.devinPageFileBytes,
        devinHandleCount: snapshot.devinHandleCount,
        devinThreadCount: snapshot.devinThreadCount,
        systemCommittedBytes: snapshot.systemCommittedBytes,
        systemCommitLimitBytes: snapshot.systemCommitLimitBytes,
        systemCommitPercent: snapshot.systemCommitPercent,
        systemPagedPoolBytes: snapshot.systemPagedPoolBytes,
        systemNonPagedPoolBytes: snapshot.systemNonPagedPoolBytes,
        systemAvailableBytes: snapshot.systemAvailableBytes,
        systemWebView2Count: snapshot.systemWebView2Count,
        systemWebView2WorkingSetBytes: snapshot.systemWebView2WorkingSetBytes,
        devinRows: rows.slice(index * PROCESS_ROWS_PER_RECORD, (index + 1) * PROCESS_ROWS_PER_RECORD),
        note: "WebView2 totals are system-wide and may include other desktop apps."
      });
    }
  }

  _sampleCrashDumps() {
    if (process.platform !== "win32" || Date.now() - this.lastArtifactSampleAt < ARTIFACT_SAMPLE_INTERVAL_MS) return;
    this.lastArtifactSampleAt = Date.now();
    const dumpDir = process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, "CrashDumps");
    if (!dumpDir) return;
    try {
      const dumps = fs.readdirSync(dumpDir).filter((name) => /^(?:msedgewebview2|Devin(?: - Next)?)\..*\.dmp$/i.test(name)).map((name) => {
        const full = path.join(dumpDir, name);
        const stat = fs.statSync(full);
        return { name, size: stat.size, mtime: stat.mtime.toISOString() };
      }).sort((a, b) => b.mtime.localeCompare(a.mtime)).slice(0, 12);
      const signature = dumps.map((item) => item.name + ":" + item.size + ":" + item.mtime).join("|");
      if (signature && signature !== this.lastCrashDumpSignature) {
        this.lastCrashDumpSignature = signature;
        this.record("crash_dump_inventory", { directory: dumpDir, dumps });
      }
    } catch {}
  }

  _sampleWindowsEvents() {
    if (process.platform !== "win32" || Date.now() < this.windowsEventReadyAt || this.windowsEventSampleInFlight || Date.now() - this.lastWindowsEventSampleAt < WINDOWS_EVENT_INTERVAL_MS) return;
    this.lastWindowsEventSampleAt = Date.now();
    this.windowsEventSampleInFlight = true;
    const queries = [
      { name: "system_resource_exhaustion", args: ["qe", "System", "/q:*[System[(EventID=2004)]]", "/c:3", "/rd:true", "/f:text", "/uni:true"], filter: /./ },
      { name: "application_crash", args: ["qe", "Application", "/q:*[System[(EventID=26 or EventID=1000 or EventID=1001)]]", "/c:30", "/rd:true", "/f:text", "/uni:true"], filter: /(Devin|msedgewebview2|0xc000012d|0xe0000008|out of memory|virtual memory)/i }
    ];
    const run = (query) => new Promise((resolve) => {
      this._execFile("wevtutil.exe", query.args, { windowsHide: true, timeout: 5000, maxBuffer: 512 * 1024, encoding: "utf16le" }, (error, stdout) => {
        if (error && !stdout) return resolve(null);
        let text = safeString(stdout, 64 * 1024);
        if (!query.filter.test(text)) return resolve(null);
        if (query.name === "application_crash") {
          const blocks = text.match(/Event\[\d+\]:[\s\S]*?(?=Event\[\d+\]:|$)/g) || [text];
          text = blocks.filter((block) => query.filter.test(block)).slice(0, 8).join("\n");
        }
        resolve({ name: query.name, text: safeString(text, 12000) });
      });
    });
    Promise.all(queries.map(run)).then((results) => {
      for (const result of results.filter(Boolean)) {
        const signature = result.text;
        if (this.lastWindowsEventSignatures.get(result.name) === signature) continue;
        this.lastWindowsEventSignatures.set(result.name, signature);
        this.record("windows_event_snapshot", result);
      }
    }).catch(() => {}).finally(() => { this.windowsEventSampleInFlight = false; });
  }

  _tailRendererLog() {
    let remaining = 40;
    let omitted = 0;
    for (const file of this._findRelevantLogs()) {
      try {
        const stat = fs.statSync(file);
        let state = this.logTails.get(file);
        if (!state || stat.size < state.offset) {
          state = { offset: stat.size, partial: "", startedAt: new Date().toISOString(), sourceMtime: stat.mtime.toISOString() };
          this.logTails.set(file, state);
          this.record("devin_log_tail_started", { file, offset: stat.size, sourceMtime: state.sourceMtime, historicalContentSkipped: true });
          continue;
        }
        if (stat.size <= state.offset) continue;
        const backlog = stat.size - state.offset;
        if (backlog > MAX_RENDERER_READ_BYTES) {
          const skippedBytes = backlog - MAX_RENDERER_READ_BYTES;
          state.offset = stat.size - MAX_RENDERER_READ_BYTES;
          state.partial = "";
          this.record("devin_log_backlog_drop", { file, skippedBytes, resumedAt: state.offset });
        }
        const length = Math.min(MAX_RENDERER_READ_BYTES, stat.size - state.offset);
        const fd = fs.openSync(file, "r");
        const buffer = Buffer.allocUnsafe(length);
        let read = 0;
        try { read = fs.readSync(fd, buffer, 0, length, state.offset); } finally { fs.closeSync(fd); }
        state.offset += read;
        const lines = (state.partial + buffer.subarray(0, read).toString("utf8")).split(/\r?\n/);
        state.partial = safeString(lines.pop() || "", 8192);
        for (const line of lines) {
          if (!line || !/(crash|fatal|oom|out of memory|memory|renderer process|webview|msedgewebview2|0xc000012d|unhandled|exception|gone|commitment|exited with code|terminate)/i.test(line)) continue;
          if (remaining > 0) {
            this.record("devin_log", { file, line: safeLogLine(line, 4096) });
            remaining--;
          } else omitted++;
        }
      } catch {}
    }
    if (omitted) this.record("devin_log_omitted", { omitted, cap: 40 });
  }
}

module.exports = CrashDiagnostics;
module.exports.CrashDiagnostics = CrashDiagnostics;
