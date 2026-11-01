'use strict';
// Run one downloaded official release. The descriptor only supplies fixture
// host names; assertions execute the real component and transport code.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto'),assert=require('node:assert/strict'),{spawnSync}=require('node:child_process');
const {installNativePicker}=require('../native-picker-install.cjs');
const {patchNativePicker,unpatchNativePicker}=require('../native-picker-patch.cjs');
const release=JSON.parse(fs.readFileSync(process.argv[2],'utf8')),descriptors=path.resolve(process.argv[3]),out=path.resolve(process.argv[4]);
const keys=['vs/sessions/sessions.desktop.main.js','vs/workbench/windsurf-chat-client/index.js'];
const scripts=__dirname,log=[];
function run(script,args,env={}){const result=spawnSync(process.execPath,[path.join(scripts,script),...args],{env:{...process.env,...env},encoding:'utf8',windowsHide:true});log.push({script,status:result.status,stdout:result.stdout,stderr:result.stderr});if(result.status!==0)throw Error(script+' failed: '+result.stderr+' '+result.stdout);}
const started=Date.now();let fixture;
try{
 for(const [i,key]of keys.entries()){
  const file=path.join(release.root,'out',key),descriptor=path.join(descriptors,release.channel+'-'+release.build+'-'+(i?'editor':'sessions')+'.json');
  run('test-native-picker-next-311.cjs',[file],{BYOK_NATIVE_PICKER_DESCRIPTOR:descriptor});
  run('test-ssh-picker-fallback.cjs',[file],{BYOK_NATIVE_PICKER_DESCRIPTOR:descriptor});
 }
 run('test-managed-session-routing.cjs',keys.map(key=>path.join(release.root,'out',key)));
 const temp=fs.realpathSync.native(os.tmpdir());fixture=fs.mkdtempSync(path.join(temp,'byok-release-matrix-'));
 const files=keys.map(key=>path.join(fixture,'out',key)),originals=keys.map(key=>fs.readFileSync(path.join(release.root,'out',key))),productFile=path.join(fixture,'product.json');
 const sha=b=>crypto.createHash('sha256').update(b).digest('base64').replace(/=+$/,'');
 const product=JSON.parse(fs.readFileSync(path.join(release.root,'product.json'),'utf8'));
 const productText=JSON.stringify({...product,checksums:Object.fromEntries(keys.map((key,i)=>[key,sha(originals[i])]))});
 function reset(){files.forEach((file,i)=>{fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,originals[i]);});fs.writeFileSync(productFile,productText);}
 const verify=()=>{files.forEach((file,i)=>assert(fs.readFileSync(file).equals(originals[i]),'host bytes changed after uninstall/rollback'));assert.equal(fs.readFileSync(productFile,'utf8'),productText);};
 reset();const dry=installNativePicker(fixture,{dryRun:true});assert(dry.ok,JSON.stringify(dry));verify();assert(dry.compatibility.selected.every(row=>row.profileId===release.channel+'-'+release.build));
 // Reject a write failure on the second bundle and restore the first bundle.
 const rename=fs.renameSync;let failed=false;
 fs.renameSync=(a,b)=>{if(b===files[1]&&!failed){failed=true;throw Error('matrix simulated second bundle failure');}return rename(a,b);};
 try{const failure=installNativePicker(fixture);assert.equal(failure.ok,false);assert.equal(failure.changed,false);assert(!failure.rollbackErrors);}finally{fs.renameSync=rename;}
 assert(failed);verify();
 const installed=installNativePicker(fixture);assert(installed.ok,JSON.stringify(installed));assert(installed.changed);
 const checksum=JSON.parse(fs.readFileSync(productFile,'utf8')).checksums;files.forEach((file,i)=>assert.equal(checksum[keys[i]],sha(fs.readFileSync(file))));
 assert.equal(installNativePicker(fixture).changed,false);
 assert(installNativePicker(fixture,{remove:true}).ok);verify();
 let priorUpgrade='not-applicable';
 const priorRoot=process.env.BYOK_PRIOR_EXTENSION_ROOT;
 if(priorRoot){const old=require(path.join(priorRoot,'native-picker-patch.cjs'));let previous;
  try{previous=originals.map(buffer=>old.patchNativePicker(buffer.toString('utf8')).code);}catch{}
  if(previous){files.forEach((file,i)=>fs.writeFileSync(file,previous[i]));fs.writeFileSync(productFile,JSON.stringify({...product,checksums:Object.fromEntries(keys.map((key,i)=>[key,sha(previous[i])]))}));
   const upgraded=installNativePicker(fixture);assert(upgraded.ok,JSON.stringify(upgraded));assert.equal(upgraded.changed,true);
   assert(installNativePicker(fixture,{remove:true}).ok);files.forEach((file,i)=>assert(fs.readFileSync(file).equals(originals[i])));priorUpgrade='passed';
  }
 }
 const report={ok:true,channel:release.channel,build:release.build,commit:release.commit,componentBundles:2,sshBundles:2,transportBundles:2,transaction:{dryRun:true,rollback:true,checksum:true,idempotence:true,exactUninstall:true,priorUpgrade},durationMs:Date.now()-started,log};
 fs.writeFileSync(out,JSON.stringify(report,null,2));console.log(JSON.stringify({...report,log:undefined}));
}catch(error){fs.writeFileSync(out,JSON.stringify({ok:false,channel:release.channel,build:release.build,error:error.stack,log},null,2));console.error(error.stack);process.exitCode=1;}
finally{if(fixture){const parent=fs.realpathSync.native(os.tmpdir());if(path.dirname(path.resolve(fixture))!==parent||!path.basename(fixture).startsWith('byok-release-matrix-'))throw Error('Unsafe cleanup');fs.rmSync(fixture,{recursive:true,force:true});}}
