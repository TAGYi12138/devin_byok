"use strict";

// Installs only the bounded native picker adapter. No process is restarted and
// no legacy renderer bridge or its backups are touched by this module.
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const vm = require("node:vm");
const childProcess = require("node:child_process");
const { SESSIONS_MARKER, PREVIOUS_SESSIONS_MARKER, LEGACY_SESSIONS_MARKER, OLDER_SESSIONS_MARKER, OLDEST_SESSIONS_MARKER, EARLIEST_SESSIONS_MARKER, EDITOR_MARKER, PREVIOUS_EDITOR_MARKER, LEGACY_EDITOR_MARKER, OLDER_EDITOR_MARKER, OLDEST_EDITOR_MARKER, patchNativePicker, unpatchNativePicker, isEditorPickerPatched, isSessionsPickerPatched } = require("./native-picker-patch.cjs");

const WORKBENCH_KEY = "vs/workbench/workbench.desktop.main.js";
const SESSIONS_KEY = "vs/sessions/sessions.desktop.main.js";
const EDITOR_KEY = "vs/workbench/windsurf-chat-client/index.js";
const LEGACY_MARKERS = ["__xy_chat_bridge__", "byok-bridge-abi-", "byok-stability-hotfix-", "byok-renderer-isolation-",
  "BYOKL_", "__BYOK_CASCADE_UNLOCK", "/api/byok-bindings", "/api/context-hint",
  "127.0.0.1:6778/api/v2/context-snapshot", "/api/bridge-heartbeat"];
const MAX_WORKBENCH_BYTES = 128 * 1024 * 1024;
const MAX_PRODUCT_BYTES = 4 * 1024 * 1024;

function digest(bytes, encoding = "hex") {
  return crypto.createHash("sha256").update(bytes).digest(encoding).replace(/=+$/, "");
}

function samePath(left, right) {
  const normalize = value => process.platform === "win32" ? path.normalize(value).toLowerCase() : path.normalize(value);
  return normalize(left) === normalize(right);
}

function checkedPaths(appRoot) {
  if (typeof appRoot !== "string" || !path.isAbsolute(appRoot)) throw new Error("Devin app root must be an absolute path");
  const root = path.resolve(appRoot);
  const realRoot = fs.realpathSync.native(root);
  if (!fs.statSync(root).isDirectory() || !samePath(root, realRoot)) throw new Error("Devin app root must be a real directory, without redirected paths");
  const targets = [SESSIONS_KEY, EDITOR_KEY].filter(key => fs.existsSync(path.join(root,"out",key))).map(checksumKey => ({file:path.join(root,"out",checksumKey),checksumKey}));
  if (!targets.length) targets.push({file:path.join(root,"out",WORKBENCH_KEY),checksumKey:WORKBENCH_KEY});
  const product = path.join(root, "product.json");
  for (const file of [...targets.map(target=>target.file), product]) {
    if (!samePath(fs.realpathSync.native(file), file) || !fs.statSync(file).isFile()) {
      throw new Error("Native picker target is not the expected regular file: " + file);
    }
  }
  return { root, workbench: targets[0].file, product, targets };
}

function boundedRead(file, limit) {
  if (fs.statSync(file).size > limit) throw new Error("Native picker input exceeds size limit: " + path.basename(file));
  const bytes = fs.readFileSync(file);
  if (bytes.length > limit) throw new Error("Native picker input grew beyond its size limit");
  return bytes;
}

function updateChecksum(productText, beforeBytes, afterBytes, checksumKey = WORKBENCH_KEY) {
  const document = JSON.parse(productText);
  const previous = document.checksums && document.checksums[checksumKey];
  if (typeof previous !== "string" || previous !== digest(beforeBytes, "base64")) {
    throw new Error("Workbench checksum is missing or does not match the current file; no files were changed");
  }
  const escapedKey = JSON.stringify(checksumKey).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const expression = new RegExp("(" + escapedKey + "\\s*:\\s*)\"([^\"]*)\"", "g");
  let replacements = 0;
  const changed = productText.replace(expression, (match, prefix, value) => {
    replacements++;
    if (value !== previous) throw new Error("Workbench checksum declaration is ambiguous");
    return prefix + JSON.stringify(digest(afterBytes, "base64"));
  });
  if (replacements !== 1) throw new Error("Expected exactly one Workbench checksum declaration");
  if (JSON.parse(changed).checksums[checksumKey] !== digest(afterBytes, "base64")) {
    throw new Error("Workbench checksum replacement could not be verified");
  }
  return changed;
}

function validateSyntax(source) {
  try {
    new vm.Script(source, { filename: "workbench.desktop.main.js" });
    return;
  } catch (error) {
    // Devin ships an ES module. Node's check-only mode parses the complete
    // source as a module without executing any application code.
    if (!(error instanceof SyntaxError) || !/(?:\bexport\b|\bimport\b)/.test(error.message)) throw error;
  }
  const result = childProcess.spawnSync(process.execPath, ["--check", "--input-type=module"], {
    input: source,
    encoding: "utf8",
    windowsHide: true,
    timeout: 30000,
    // Minified sessions.desktop.main.js contains multi-megabyte lines. Node
    // echoes the source line for a syntax error, so a tiny stderr buffer turns
    // the real parser result into ENOBUFS.
    maxBuffer: 64 * 1024 * 1024,
    env: { ...process.env, ELECTRON_RUN_AS_NODE: "1" },
  });
  if (result.error || result.status !== 0) {
    const detail = result.error ? result.error.message : String(result.stderr || result.stdout || "unknown parser failure").slice(-1200);
    throw new Error("Native picker module syntax validation failed: " + detail);
  }
}

function saveBackup(target, bytes) {
  const backup = target + ".byok-native-picker.original." + digest(bytes) + ".bak";
  try {
    fs.writeFileSync(backup, bytes, { flag: "wx", mode: fs.statSync(target).mode });
  } catch (error) {
    if (error.code !== "EEXIST") throw error;
  }
  const info = fs.lstatSync(backup);
  if (!info.isFile() || info.isSymbolicLink() || !samePath(fs.realpathSync.native(backup), backup) ||
      info.size !== bytes.length || digest(fs.readFileSync(backup)) !== digest(bytes)) {
    throw new Error("Existing native picker backup is not the expected original: " + backup);
  }
  return backup;
}

function stageFile(target, bytes, pending) {
  const temporary = target + ".byok-native-picker." + crypto.randomBytes(12).toString("hex") + ".tmp";
  const descriptor = fs.openSync(temporary, "wx", fs.statSync(target).mode);
  pending.add(temporary);
  try {
    fs.writeFileSync(descriptor, bytes);
    fs.fsyncSync(descriptor);
  } finally {
    fs.closeSync(descriptor);
  }
  return temporary;
}

function replaceFile(target, bytes, pending) {
  const staged = stageFile(target, bytes, pending);
  fs.renameSync(staged, target);
  pending.delete(staged);
}

function installNativePicker(appRoot, { remove = false, dryRun = false } = {}) {
  const pending = new Set();
  const committed = [];
  let paths;
  try {
    paths = checkedPaths(appRoot);
    const beforeProduct = boundedRead(paths.product, MAX_PRODUCT_BYTES);
    let productText = beforeProduct.toString("utf8");
    if (!Buffer.from(productText,"utf8").equals(beforeProduct)) throw new Error("Product file is not valid UTF-8");
    const replacements = [], inspected = [], hashes = [];
    for (const target of paths.targets) {
    const beforeWorkbench = boundedRead(target.file, MAX_WORKBENCH_BYTES);
    inspected.push({target:target.file,before:beforeWorkbench});
    const source = beforeWorkbench.toString("utf8");
    if (!Buffer.from(source, "utf8").equals(beforeWorkbench)) throw new Error("Workbench source is not valid UTF-8");
    // A verified older Sessions adapter contains the context-snapshot URL as
    // one of its bounded edits.  Inspect its exact unpatched form so that a
    // legitimate V2-V5 -> V6 upgrade is not mistaken for arbitrary renderer
    // residue. unpatchNativePicker validates every known boundary first; any
    // partial or forged adapter is rejected before we touch the host files.
    const residueSource = source.includes(SESSIONS_MARKER) || source.includes(PREVIOUS_SESSIONS_MARKER) || source.includes(LEGACY_SESSIONS_MARKER) || source.includes(OLDER_SESSIONS_MARKER) || source.includes(OLDEST_SESSIONS_MARKER) || source.includes(EARLIEST_SESSIONS_MARKER) || source.includes(EDITOR_MARKER) || source.includes(PREVIOUS_EDITOR_MARKER) || source.includes(LEGACY_EDITOR_MARKER) || source.includes(OLDER_EDITOR_MARKER) || source.includes(OLDEST_EDITOR_MARKER)
      ? unpatchNativePicker(source).code
      : source;
    const legacy = LEGACY_MARKERS.find(marker => residueSource.includes(marker));
    if (legacy) throw new Error("Legacy renderer marker detected; restore the clean Workbench before installing: " + legacy);
    const transformed = (remove ? unpatchNativePicker : patchNativePicker)(source);
    if (!transformed.changed) {
      updateChecksum(productText, beforeWorkbench, beforeWorkbench, target.checksumKey);
      continue;
    }
    const afterWorkbench = Buffer.from(transformed.code, "utf8");
    if (afterWorkbench.length > MAX_WORKBENCH_BYTES) throw new Error("Patched Workbench exceeds the size limit");
    productText = updateChecksum(productText, beforeWorkbench, afterWorkbench, target.checksumKey);
    validateSyntax(transformed.code);
    replacements.push({target:target.file,before:beforeWorkbench,after:afterWorkbench});
    hashes.push({path:target.file,beforeHash:digest(beforeWorkbench),afterHash:digest(afterWorkbench)});
    }
    if (!replacements.length) return {ok:true,changed:false,reloadRequired:false,action:remove?"remove":"install",workbench:paths.workbench,targets:paths.targets.map(t=>t.file)};
    const afterProduct = Buffer.from(productText,"utf8");
    const result = {
      ok: true, changed: true, reloadRequired: !dryRun, dryRun: Boolean(dryRun),
      action: remove ? "remove" : "install", workbench: paths.workbench,
      beforeHash: hashes[0].beforeHash, afterHash: hashes[0].afterHash, targets:paths.targets.map(t=>t.file), hashes,
    };
    if (dryRun) return result;
    result.backups = {
      workbench: saveBackup(replacements[0].target, replacements[0].before),
      product: saveBackup(paths.product, beforeProduct),
    };
    result.backups.bundles=replacements.map(r=>saveBackup(r.target,r.before));
    replacements.push({target:paths.product,before:beforeProduct,after:afterProduct});
    for (const replacement of replacements) replacement.staged = stageFile(replacement.target, replacement.after, pending);
    // Abort if an updater changed either file during validation or staging.
    for (const replacement of [...inspected,{target:paths.product,before:beforeProduct}]) {
      if (!fs.readFileSync(replacement.target).equals(replacement.before)) throw new Error("Devin application changed during installation; retry after its update finishes");
    }
    for (const replacement of replacements) {
      fs.renameSync(replacement.staged, replacement.target);
      pending.delete(replacement.staged);
      committed.push(replacement);
    }
    for (const replacement of replacements) {
      if (!fs.readFileSync(replacement.target).equals(replacement.after)) throw new Error("Native picker write verification failed");
    }
    return result;
  } catch (error) {
    const rollbackErrors = [];
    for (const replacement of committed.reverse()) {
      try {
        if (!fs.readFileSync(replacement.target).equals(replacement.after)) throw new Error("file changed concurrently; verified backup retained");
        replaceFile(replacement.target, replacement.before, pending);
      } catch (rollbackError) {
        rollbackErrors.push(path.basename(replacement.target) + ": " + rollbackError.message);
      }
    }
    return {
      ok: false, changed: rollbackErrors.length > 0, reloadRequired: false,
      action: remove ? "remove" : "install",
      error: String(error && error.message || error).slice(0, 2000),
      ...(rollbackErrors.length ? { rollbackErrors } : {}),
    };
  } finally {
    for (const temporary of pending) {
      try { fs.unlinkSync(temporary); } catch { /* Recovery copies remain beside the original files. */ }
    }
  }
}

// This is a disk check only. Callers must still honor reloadRequired after a
// write; existing renderer processes keep their previously loaded module.
function completeAdapterForWorkbench(workbenchPath) {
  try {
    const vsRoot=path.dirname(path.dirname(workbenchPath));
    const editor=path.join(vsRoot,"workbench","windsurf-chat-client","index.js");
    const sessions=path.join(vsRoot,"sessions","sessions.desktop.main.js");
    if (fs.existsSync(editor) && !isEditorPickerPatched(fs.readFileSync(editor,"utf8"))) return null;
    if (!fs.existsSync(sessions) || !isSessionsPickerPatched(fs.readFileSync(sessions,"utf8"))) return null;
    return fs.existsSync(editor)?editor:sessions;
  } catch { return null; }
}
module.exports = { installNativePicker, completeAdapterForWorkbench };

if (require.main === module) {
  const args = process.argv.slice(2);
  const appRoots = args.filter(argument => !argument.startsWith("--"));
  if (appRoots.length !== 1 || args.some(argument => argument.startsWith("--") && !["--remove", "--dry-run"].includes(argument))) {
    process.stderr.write("Usage: node native-picker-install.cjs <absolute-app-root> [--remove] [--dry-run]\n");
    process.exitCode = 2;
  } else {
    const result = installNativePicker(appRoots[0], { remove: args.includes("--remove"), dryRun: args.includes("--dry-run") });
    process.stdout.write(JSON.stringify(result, null, 2) + "\n");
    if (!result.ok) process.exitCode = 1;
  }
}
