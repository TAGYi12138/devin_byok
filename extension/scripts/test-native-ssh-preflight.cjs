"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { ORIGINAL, PATCHED, CURRENT_ORIGINAL, CURRENT_PATCHED, NEXT_1108_ORIGINAL, NEXT_1108_PATCHED, patchNativeSshSource, installNativeSshPreflight } = require("../native-ssh-preflight.cjs");

const sourcePath = path.join(process.argv[2]||"D:/Devin Next/resources/app", "extensions", "windsurf-remote-openssh", "dist", "extension.js");
if (!fs.existsSync(sourcePath)) {
  console.log("NATIVE_SSH_PREFLIGHT_SKIPPED native Devin installation unavailable");
  process.exit(0);
}
const installed = fs.readFileSync(sourcePath, "utf8");
const backups = fs.readdirSync(path.dirname(sourcePath)).filter(name => name.startsWith("extension.js.byok-ssh-original.") && name.endsWith(".bak"));
const current=installed.includes(CURRENT_ORIGINAL)||installed.includes(CURRENT_PATCHED),middle=installed.includes(NEXT_1108_ORIGINAL)||installed.includes(NEXT_1108_PATCHED),before=current?CURRENT_ORIGINAL:middle?NEXT_1108_ORIGINAL:ORIGINAL,after=current?CURRENT_PATCHED:middle?NEXT_1108_PATCHED:PATCHED;
const original = installed.includes(before) ? installed : fs.readFileSync(path.join(path.dirname(sourcePath), backups[0]), "utf8");
const patched = patchNativeSshSource(original);
assert.equal(patched.code.includes(after), true);
assert.equal(patched.code.includes(before), false);
assert.equal(patched.code.includes('httpProxy:'+(current?'W':middle?'U':'P')+'.__byokProxy||'), true);
assert.equal(patched.code.includes('httpsProxy:'+(current?'W':middle?'U':'P')+'.__byokProxy||'), true);
assert.equal(patchNativeSshSource(patched.code).changed, false);
assert.throws(() => patchNativeSshSource(original.replace(before, "P={} ,B=void 0!==P.RemoteCommand")), /verified version/);
console.log(`NATIVE_SSH_PREFLIGHT_OK firstPatch=${patched.changed} idempotent=true failClosed=true`);
const tempParent=fs.realpathSync.native(require('node:os').tmpdir()),fixture=fs.mkdtempSync(path.join(tempParent,'byok-ssh-resolver-test-')),target=path.join(fixture,'extensions/windsurf-remote-openssh/dist/extension.js');
try{
 fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,original);
 const result=installNativeSshPreflight(fixture);assert.equal(result.changed,true);assert.equal(fs.readFileSync(result.backup,'utf8'),original);assert.equal(fs.readFileSync(target,'utf8'),patched.code);assert.equal(installNativeSshPreflight(fixture).changed,false);
 const drift=original.replace(before,'unknown_ssh_resolver=1');fs.writeFileSync(target,drift);assert.throws(()=>installNativeSshPreflight(fixture),/verified version/);assert.equal(fs.readFileSync(target,'utf8'),drift);
 console.log('NATIVE_SSH_INSTALL_OK backup=verified idempotent=1 unknownVersion=unchanged');
}finally{
 if(path.dirname(path.resolve(fixture))!==path.resolve(tempParent)||!path.basename(fixture).startsWith('byok-ssh-resolver-test-'))throw Error('Unsafe SSH fixture cleanup');
 fs.rmSync(fixture,{recursive:true,force:true});
}

async function testPreflightTimeout() {
  const scope = {
    P: null, B: null, C: { hostname: "test-host" },
    h: { commands: { executeCommand: () => new Promise(() => {}) } },
    b: { default: { loadFromFS: async () => ({ getHostConfiguration: () => ({ HostName: "test-host" }) }) } },
    setTimeout, clearTimeout,
  };
  Object.assign(scope,{W:null,z:null,U:null,F:null,L:{hostname:'test-host'},t:'ssh-remote+test',B:{hostname:'test-host'},R:scope.b});
  const start = Date.now();
  const run = vm.runInNewContext(`(async function(){${after};return ${current?'{P:W,B:z}':middle?'{P:U,B:F}':'{P,B}'}})`, scope);
  const result = await run.call({ logger: { info() {} } });
  assert.ok(Date.now() - start < 3000, "unresponsive bridge command must not stall SSH");
  assert.equal(result.P.HostName, "test-host");
  assert.equal(result.P.__byokProxy, "");
  const calls=[];scope.h.commands.executeCommand=async(...args)=>{calls.push(args);return {proxy:'http://127.0.0.1:16778'};};
  const ready=await vm.runInNewContext(`(async function(){${after};return ${current?'W':middle?'U':'P'}})`,scope)();
  assert.equal(ready.__byokProxy,'http://127.0.0.1:16778');assert.deepEqual(Array.from(calls[0]),['byokBridge.prepareSshHost','test-host',...(current?['ssh-remote+test']:[])]);
  console.log("NATIVE_SSH_PREFLIGHT_TIMEOUT_OK stalledCommand=continued");
}

testPreflightTimeout().catch(error => { console.error(error); process.exitCode = 1; });
