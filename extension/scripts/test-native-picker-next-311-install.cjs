"use strict";
const fs=require("node:fs"),path=require("node:path"),os=require("node:os"),crypto=require("node:crypto"),assert=require("node:assert/strict");
const {installNativePicker,completeAdapterForWorkbench}=require("../native-picker-install.cjs");
const {unpatchNativePicker,isEditorPickerPatched,isSessionsPickerPatched}=require("../native-picker-patch.cjs");
const tempRoot=fs.realpathSync.native(os.tmpdir());
const root=fs.mkdtempSync(path.join(tempRoot,"byok-editor-install-"));
const keys=["vs/sessions/sessions.desktop.main.js","vs/workbench/windsurf-chat-client/index.js"];
const files=keys.map(k=>path.join(root,"out",k));
const hostRoot=process.argv[2]||"D:/Devin Next/resources/app";
const installedBeforeCascade=keys.map(k=>fs.readFileSync(path.join(hostRoot,"out",k),"utf8"));
const originals=installedBeforeCascade.map(source=>unpatchNativePicker(source).code);
const stable238=originals[1].includes('rkU.displayName="AcpModelSelect"');
const stable=stable238||originals[1].includes('rkd.displayName="AcpModelSelect"');
const hash=s=>crypto.createHash("sha256").update(s).digest("base64").replace(/=+$/,"");
const product=path.join(root,"product.json"),workbench=path.join(root,"out/vs/workbench/workbench.desktop.main.js");
const metadata=JSON.stringify({checksums:Object.fromEntries(keys.map((k,i)=>[k,hash(originals[i])]))});
function reset(){files.forEach((f,i)=>{fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,originals[i]);});fs.writeFileSync(product,metadata);}
try {
  reset();
  // An unknown build must identify the host and failing bundle, and must not
  // fall through to the legacy selected-value recipe or write either target.
  const unknown = 'var fresh=(0,R.memo)(()=>null);fresh.displayName="AcpModelSelect";';
  fs.writeFileSync(files[1], unknown);
  fs.writeFileSync(product, JSON.stringify({nameLong:'Devin',version:'1.126.0',windsurfVersion:'fixture-new-build',commit:'fixture-commit',checksums:Object.fromEntries(keys.map((k,i)=>[k,hash(i?unknown:originals[i])]))}));
  const unknownProduct = fs.readFileSync(product,'utf8');
  const unsupported = installNativePicker(root);
  assert.equal(unsupported.ok,false);
  assert.equal(unsupported.errorCode,'BYOK_NATIVE_PICKER_UNSUPPORTED');
  assert(!unsupported.error.includes('selected-value'));
  assert.equal(unsupported.diagnostics.hostBuild,'fixture-new-build');
  assert.equal(unsupported.diagnostics.targets.at(-1).bundle,keys[1]);
  assert.deepEqual(unsupported.diagnostics.targets.at(-1).pickerComponents,['fresh']);
  assert.equal(unsupported.diagnostics.targets.at(-1).sha256,crypto.createHash('sha256').update(unknown).digest('hex'));
  assert.equal(fs.readFileSync(files[0],'utf8'),originals[0]);
  assert.equal(fs.readFileSync(files[1],'utf8'),unknown);
  assert.equal(fs.readFileSync(product,'utf8'),unknownProduct);
  reset();
  const dry=installNativePicker(root,{dryRun:true});assert(dry.ok,JSON.stringify(dry));assert.equal(dry.targets.length,2);
  files.forEach((f,i)=>assert.equal(fs.readFileSync(f,"utf8"),originals[i]));
  // A valid Sessions patch alone must never make the editor window ready.
  const sessions=require("../native-picker-patch.cjs").patchNativePicker(originals[0]).code;
  fs.writeFileSync(files[0],sessions);assert.equal(completeAdapterForWorkbench(workbench),null);reset();
  // A rejected editor boundary must leave BOTH bundles and product unchanged.
  const component=stable238?'rkU':stable?'rkd':'rkl',selector=stable238?'tVx':stable?'tVw':'tVk';
  const broken=originals[1].replace(component+'=(0,tK.memo)',component+'=(0,tK.incompatible)');
  // Damage an exact patch boundary as well as the component header.
  const drift=broken.replace((stable238?'L=':'M=')+selector+'(e=>e.state.modelSorts),','M=missing(e=>e.state.modelSorts),');assert.notEqual(drift,originals[1]);
  fs.writeFileSync(files[1],drift);
  const failure=installNativePicker(root);assert.equal(failure.ok,false);assert.equal(fs.readFileSync(files[0],"utf8"),originals[0]);assert.equal(fs.readFileSync(files[1],"utf8"),drift);assert.equal(fs.readFileSync(product,"utf8"),metadata);reset();
  // Failure during the second bundle replacement rolls back the first bundle.
  const rename=fs.renameSync;let rejected=false;
  fs.renameSync=(from,to)=>{if(to===files[1]&&!rejected){rejected=true;throw Error("simulated editor write failure");}return rename(from,to);};
  try{const result=installNativePicker(root);assert.equal(result.ok,false);assert.equal(result.changed,false);assert.equal(result.rollbackErrors,undefined);}finally{fs.renameSync=rename;}
  assert(rejected);files.forEach((f,i)=>assert.equal(fs.readFileSync(f,"utf8"),originals[i]));assert.equal(fs.readFileSync(product,"utf8"),metadata);
  // Both production bundles used their current marker before cascadeId was
  // added. The installer must upgrade that exact pair in one transaction.
  files.forEach((f,i)=>fs.writeFileSync(f,installedBeforeCascade[i]));
  fs.writeFileSync(product,JSON.stringify({checksums:Object.fromEntries(keys.map((k,i)=>[k,hash(installedBeforeCascade[i])]))}));
  const upgraded=installNativePicker(root);assert(upgraded.ok,JSON.stringify(upgraded));
  const upgradeOutcome=upgraded.changed?"changed":"already-current";
  assert(isSessionsPickerPatched(fs.readFileSync(files[0],"utf8")),"pre-cascade Sessions adapter was not upgraded");
  assert(isEditorPickerPatched(fs.readFileSync(files[1],"utf8")),"pre-cascade Editor adapter was not upgraded");
  assert(installNativePicker(root,{remove:true}).ok,"upgraded pair could not be uninstalled");
  files.forEach((f,i)=>assert.equal(fs.readFileSync(f,"utf8"),originals[i]));
  reset();
  const installed=installNativePicker(root);assert(installed.ok,JSON.stringify(installed));assert.equal(installed.targets.length,2);
  assert(isSessionsPickerPatched(fs.readFileSync(files[0],"utf8")));assert(isEditorPickerPatched(fs.readFileSync(files[1],"utf8")));assert.equal(completeAdapterForWorkbench(workbench),files[1]);
  const checksums=JSON.parse(fs.readFileSync(product,"utf8")).checksums;files.forEach((f,i)=>assert.equal(checksums[keys[i]],hash(fs.readFileSync(f))));
  assert.equal(installNativePicker(root).changed,false);
  assert(installNativePicker(root,{remove:true}).ok);files.forEach((f,i)=>assert.equal(fs.readFileSync(f,"utf8"),originals[i]));assert.equal(fs.readFileSync(product,"utf8"),metadata);
  console.log(`EDITOR_DUAL_INSTALL_OK channel=${stable?'stable':'next'} targets=2 syntax=valid checksum=valid diskGate=both rollback=both exactUninstall=both upgrade=${upgradeOutcome}`);
}finally{
  if(path.dirname(path.resolve(root))!==path.resolve(tempRoot)||!path.basename(root).startsWith("byok-editor-install-"))throw Error("Unsafe fixture cleanup");
  fs.rmSync(root,{recursive:true,force:true});
}
