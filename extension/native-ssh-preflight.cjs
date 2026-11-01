"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const RELATIVE_PATH = path.join("extensions", "windsurf-remote-openssh", "dist", "extension.js");
const ORIGINAL = 'P=(await b.default.loadFromFS()).getHostConfiguration(C.hostname),B=void 0!==P.RemoteCommand';
const LEGACY_PATCHED = 'P=await(async()=>{const r=await h.commands.executeCommand("byokBridge.prepareSshHost",C.hostname).catch(t=>{this.logger.warn("[BYOK SSH preflight] "+String(t&&t.message||t));return null});return Object.assign((await b.default.loadFromFS()).getHostConfiguration(C.hostname),{__byokProxy:r&&r.proxy||""})})(),B=void 0!==P.RemoteCommand';
const TIMEOUT_V1_PATCHED = 'P=await(async()=>{let m;const r=await(async()=>{try{return await Promise.race([h.commands.executeCommand("byokBridge.prepareSshHost",C.hostname),new Promise(t=>m=setTimeout(()=>{this.logger.warn("[BYOK SSH preflight] timeout; continuing");t(null)},1500))])}catch(t){this.logger.warn("[BYOK SSH preflight] "+String(t&&t.message||t));return null}finally{clearTimeout(m)}})();return Object.assign((await b.default.loadFromFS()).getHostConfiguration(C.hostname),{__byokProxy:r&&r.proxy||""})})(),B=void 0!==P.RemoteCommand';
const PATCHED = 'P=await(async()=>{let m;const r=await Promise.race([Promise.resolve().then(()=>h.commands.executeCommand("byokBridge.prepareSshHost",C.hostname)).catch(()=>null),new Promise(t=>m=setTimeout(()=>t(null),1500))]).finally(()=>clearTimeout(m));return Object.assign((await b.default.loadFromFS()).getHostConfiguration(C.hostname),{__byokProxy:r&&r.proxy||""})})(),B=void 0!==P.RemoteCommand';
const ORIGINAL_HTTP = 'httpProxy:(0,S.dualReadConfig)("remote.windsurfSSH","httpProxy","")';
const ORIGINAL_HTTPS = 'httpsProxy:(0,S.dualReadConfig)("remote.windsurfSSH","httpsProxy","")';
const PATCHED_HTTP = 'httpProxy:P.__byokProxy||(0,S.dualReadConfig)("remote.windsurfSSH","httpProxy","")';
const PATCHED_HTTPS = 'httpsProxy:P.__byokProxy||(0,S.dualReadConfig)("remote.windsurfSSH","httpsProxy","")';
const CURRENT_ORIGINAL = 'W=(await R.default.loadFromFS()).getHostConfiguration(B.hostname),z=void 0!==W.RemoteCommand';
const CURRENT_PATCHED = 'W=await(async()=>{let m;const r=await Promise.race([Promise.resolve().then(()=>h.commands.executeCommand("byokBridge.prepareSshHost",B.hostname,t)).catch(()=>null),new Promise(t=>m=setTimeout(()=>t(null),1500))]).finally(()=>clearTimeout(m));return Object.assign((await R.default.loadFromFS()).getHostConfiguration(B.hostname),{__byokProxy:r&&r.proxy||""})})(),z=void 0!==W.RemoteCommand';
const CURRENT_HTTP = PATCHED_HTTP.replace('P.__byokProxy','W.__byokProxy');
const CURRENT_HTTPS = PATCHED_HTTPS.replace('P.__byokProxy','W.__byokProxy');
const NEXT_1108_ORIGINAL = 'U=(await b.default.loadFromFS()).getHostConfiguration(L.hostname),F=void 0!==U.RemoteCommand';
const NEXT_1108_PATCHED = PATCHED.replace(/\bP\b/g,'U').replace(/\bC\b/g,'L').replace(/\bB\b/g,'F');
const NEXT_1108_HTTP = PATCHED_HTTP.replace('P.__byokProxy','U.__byokProxy');
const NEXT_1108_HTTPS = PATCHED_HTTPS.replace('P.__byokProxy','U.__byokProxy');
const MAX_BYTES = 2 * 1024 * 1024;

function count(source, needle) {
  return source.split(needle).length - 1;
}

function patchNativeSshSource(source) {
  if(source.includes(NEXT_1108_ORIGINAL)||source.includes(NEXT_1108_PATCHED)){
    if(count(source,NEXT_1108_PATCHED)===1&&count(source,NEXT_1108_HTTP)===1&&count(source,NEXT_1108_HTTPS)===1&&count(source,NEXT_1108_ORIGINAL)===0&&count(source,ORIGINAL_HTTP)===0&&count(source,ORIGINAL_HTTPS)===0)return {code:source,changed:false};
    if(count(source,NEXT_1108_ORIGINAL)!==1||count(source,ORIGINAL_HTTP)!==1||count(source,ORIGINAL_HTTPS)!==1||count(source,NEXT_1108_PATCHED)!==0||count(source,NEXT_1108_HTTP)!==0||count(source,NEXT_1108_HTTPS)!==0)throw new Error('Native Remote SSH resolver does not match the verified version');
    const code=source.replace(NEXT_1108_ORIGINAL,NEXT_1108_PATCHED).replace(ORIGINAL_HTTP,NEXT_1108_HTTP).replace(ORIGINAL_HTTPS,NEXT_1108_HTTPS);
    new vm.Script(code,{filename:'windsurf-remote-openssh/dist/extension.js'});return {code,changed:true};
  }
  if(source.includes(CURRENT_ORIGINAL)||source.includes(CURRENT_PATCHED)){
    if(count(source,CURRENT_PATCHED)===1&&count(source,CURRENT_HTTP)===1&&count(source,CURRENT_HTTPS)===1&&count(source,CURRENT_ORIGINAL)===0&&count(source,ORIGINAL_HTTP)===0&&count(source,ORIGINAL_HTTPS)===0)return {code:source,changed:false};
    if(count(source,CURRENT_ORIGINAL)!==1||count(source,ORIGINAL_HTTP)!==1||count(source,ORIGINAL_HTTPS)!==1||count(source,CURRENT_PATCHED)!==0||count(source,CURRENT_HTTP)!==0||count(source,CURRENT_HTTPS)!==0)throw new Error('Native Remote SSH resolver does not match the verified version');
    const code=source.replace(CURRENT_ORIGINAL,CURRENT_PATCHED).replace(ORIGINAL_HTTP,CURRENT_HTTP).replace(ORIGINAL_HTTPS,CURRENT_HTTPS);
    new vm.Script(code,{filename:'windsurf-remote-openssh/dist/extension.js'});return {code,changed:true};
  }
  if (count(source, PATCHED) === 1 && count(source, PATCHED_HTTP) === 1 && count(source, PATCHED_HTTPS) === 1 &&
      count(source, ORIGINAL) === 0 && count(source, ORIGINAL_HTTP) === 0 && count(source, ORIGINAL_HTTPS) === 0) {
    return { code: source, changed: false };
  }
  const previous = [LEGACY_PATCHED, TIMEOUT_V1_PATCHED].find(candidate => count(source, candidate) === 1);
  if (previous && count(source, PATCHED) === 0 && count(source, PATCHED_HTTP) === 1 && count(source, PATCHED_HTTPS) === 1 &&
      count(source, ORIGINAL) === 0 && count(source, ORIGINAL_HTTP) === 0 && count(source, ORIGINAL_HTTPS) === 0) {
    const code = source.replace(previous, PATCHED);
    new vm.Script(code, { filename: "windsurf-remote-openssh/dist/extension.js" });
    return { code, changed: true };
  }
  if (count(source, ORIGINAL) !== 1 || count(source, ORIGINAL_HTTP) !== 1 || count(source, ORIGINAL_HTTPS) !== 1 ||
      count(source, PATCHED) !== 0 || count(source, LEGACY_PATCHED) !== 0 || count(source, TIMEOUT_V1_PATCHED) !== 0 || count(source, PATCHED_HTTP) !== 0 || count(source, PATCHED_HTTPS) !== 0) {
    throw new Error("Native Remote SSH resolver does not match the verified version");
  }
  const code = source.replace(ORIGINAL, PATCHED).replace(ORIGINAL_HTTP, PATCHED_HTTP).replace(ORIGINAL_HTTPS, PATCHED_HTTPS);
  new vm.Script(code, { filename: "windsurf-remote-openssh/dist/extension.js" });
  return { code, changed: true };
}

function installNativeSshPreflight(appRoot) {
  if (typeof appRoot !== "string" || !path.isAbsolute(appRoot)) throw new Error("Invalid Devin app root");
  const root = path.resolve(appRoot);
  const samePath = (left, right) => process.platform === "win32"
    ? path.normalize(left).toLowerCase() === path.normalize(right).toLowerCase()
    : path.normalize(left) === path.normalize(right);
  if (!samePath(fs.realpathSync.native(root), root)) throw new Error("Devin app root is redirected");
  const target = path.join(root, RELATIVE_PATH);
  if (!samePath(fs.realpathSync.native(target), target) || !fs.statSync(target).isFile()) throw new Error("Remote SSH extension path is redirected");
  const stat = fs.statSync(target);
  if (stat.size > MAX_BYTES) throw new Error("Remote SSH extension exceeds size limit");
  const before = fs.readFileSync(target);
  if (before.length > MAX_BYTES) throw new Error("Remote SSH extension grew during inspection");
  const source = before.toString("utf8");
  if (!Buffer.from(source).equals(before)) throw new Error("Remote SSH extension is not UTF-8");
  const result = patchNativeSshSource(source);
  if (!result.changed) return { ok: true, changed: false, target };
  const digest = crypto.createHash("sha256").update(before).digest("hex");
  const backup = target + `.byok-ssh-original.${digest}.bak`;
  try { fs.writeFileSync(backup, before, { flag: "wx", mode: stat.mode }); }
  catch (error) { if (error.code !== "EEXIST") throw error; }
  if (!fs.statSync(backup).isFile() || !fs.readFileSync(backup).equals(before)) throw new Error("Remote SSH backup could not be verified");
  const after = Buffer.from(result.code, "utf8");
  const staged = target + `.byok-ssh-${crypto.randomBytes(8).toString("hex")}.tmp`;
  let committed = false;
  try {
    fs.writeFileSync(staged, after, { flag: "wx", mode: stat.mode });
    if (!fs.readFileSync(target).equals(before)) throw new Error("Remote SSH extension changed during installation");
    fs.renameSync(staged, target);
    committed = true;
    if (!fs.readFileSync(target).equals(after)) throw new Error("Remote SSH preflight write verification failed");
    return { ok: true, changed: true, target, backup, reloadRequired: true };
  } catch (error) {
    if (committed && fs.readFileSync(target).equals(after)) fs.copyFileSync(backup, target);
    throw error;
  } finally {
    try { fs.unlinkSync(staged); } catch {}
  }
}

module.exports = { ORIGINAL, PATCHED, CURRENT_ORIGINAL, CURRENT_PATCHED, NEXT_1108_ORIGINAL, NEXT_1108_PATCHED, patchNativeSshSource, installNativeSshPreflight };
