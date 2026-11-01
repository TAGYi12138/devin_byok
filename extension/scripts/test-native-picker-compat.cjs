'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto');
const registry=require('../native-picker-compat.cjs');
const adapter=require('../native-picker-patch.cjs');
const {installNativePicker}=require('../native-picker-install.cjs');
const catalog=registry.catalog();
assert(catalog.length>=23);
catalog[0].markers.sessions='mutated';assert.notEqual(registry.catalog()[0].markers.sessions,'mutated');
const records=registry.catalog(),profiles=records.flatMap((record,i)=>Object.entries(record.markers).map(([surface,marker])=>({marker,component:`Fixture${i}_${surface}.displayName="AcpModelSelect"`,edits:[{name:'one',before:`anchor${i}_${surface};`}]})));
const source=profile=>profile.component+';'+profile.edits[0].before;
const host=record=>({quality:record.channel,windsurfVersion:record.build,commit:record.commit});
function rejected(fn,code){assert.throws(fn,error=>error.code===code);}
for(const record of records){
  for(const surface of ['sessions','editor']){
    const profile=profiles.find(p=>p.marker===record.markers[surface]),clean=source(profile);
    const exact=registry.select(clean,profiles,{host:host(record),surface});assert.equal(exact.profileId,record.id);assert.equal(exact.strategy,'commit-and-structure');
    assert.equal(registry.select(clean,profiles,{host:{quality:record.channel,windsurfVersion:record.build},surface}).strategy,'version-and-structure');
    assert.equal(registry.select(clean,profiles,{host:{quality:record.channel,windsurfVersion:'9.99.999',commit:'new'},surface}).strategy,'structure-reuse');
    rejected(()=>registry.select(clean.replace(profile.edits[0].before,'changed;'),profiles,{host:host(record),surface}),'BYOK_NATIVE_PICKER_BOUNDARY_DRIFT');
    rejected(()=>registry.select(clean+profile.edits[0].before,profiles,{host:host(record),surface}),'BYOK_NATIVE_PICKER_BOUNDARY_DRIFT');
    const opposite=record.channel==='next'?'stable':'next';
    if(records.some(row=>row.channel===opposite&&row.markers[surface]===profile.marker))assert.equal(registry.select(clean,profiles,{host:{quality:opposite},surface}).channel,opposite);
    else rejected(()=>registry.select(clean,profiles,{host:{quality:opposite},surface}),'BYOK_NATIVE_PICKER_CHANNEL_MISMATCH');
  }
}
assert.equal(registry.select('unknown build',profiles),null);
rejected(()=>registry.select(source(profiles[0])+source(profiles[1]),profiles),'BYOK_NATIVE_PICKER_AMBIGUOUS');
rejected(()=>registry.select(source(profiles[0]),profiles,{host:host(records[1])}),'BYOK_NATIVE_PICKER_METADATA_MISMATCH');
const first=registry.select(source(profiles[0]),profiles),second=registry.select(source(profiles[1]),profiles),other=registry.select(source(profiles[2]),profiles);
registry.assertBundleSet([first,second],2);
rejected(()=>registry.assertBundleSet([first,other],2),'BYOK_NATIVE_PICKER_MIXED');
rejected(()=>registry.assertBundleSet([first,null],2),'BYOK_NATIVE_PICKER_MIXED');
rejected(()=>registry.assertBundleSet([first,first],2),'BYOK_NATIVE_PICKER_MIXED');
registry.assertBundleSet([null],1);

const defaults=['D:/Devin/resources/app','D:/Devin Next/resources/app',path.resolve(__dirname,'../../.tmp/devin-3.11.238-host/resources/app')];
const roots=process.argv.length>2?process.argv.slice(2):defaults.filter(root=>fs.existsSync(path.join(root,'product.json')));
const keys=['vs/sessions/sessions.desktop.main.js','vs/workbench/windsurf-chat-client/index.js'];
let realBundles=0;
for(const root of roots){
  const product=JSON.parse(fs.readFileSync(path.join(root,'product.json'),'utf8'));
  for(const [i,key] of keys.entries()){
    const raw=fs.readFileSync(path.join(root,'out',key),'utf8'),clean=adapter.unpatchNativePicker(raw).code;
    const selection=adapter.resolveNativePickerCompatibility(raw,{host:product,surface:i?'editor':'sessions'});
    assert.equal(selection.strategy,'commit-and-structure');assert.equal(selection.anchorsVerified,10);
    const patched=adapter.patchNativePicker(clean).code;
    assert.deepEqual(adapter.resolveNativePickerCompatibility(patched,{host:product,surface:i?'editor':'sessions'}),selection);
    const reused=adapter.resolveNativePickerCompatibility(clean,{host:{...product,windsurfVersion:'9.99.999',commit:'future-commit'}});
    assert.equal(reused.strategy,'structure-reuse');
    realBundles++;
  }
  const dry=installNativePicker(root,{dryRun:true});assert(dry.ok,JSON.stringify(dry));
  assert.equal(dry.compatibility.selected.length,2);assert.equal(new Set(dry.compatibility.selected.map(row=>row.profileId)).size,1);
}
// Mixed real releases must fail before either bundle or product is written.
if(roots.length>1){
 const parent=fs.realpathSync.native(os.tmpdir()),fixture=fs.mkdtempSync(path.join(parent,'byok-mixed-compat-'));
 try{
  const sources=keys.map((key,i)=>adapter.unpatchNativePicker(fs.readFileSync(path.join(roots[i],'out',key),'utf8')).code);
  const digest=s=>crypto.createHash('sha256').update(s).digest('base64').replace(/=+$/,'');
  const metadata=JSON.stringify({checksums:Object.fromEntries(keys.map((key,i)=>[key,digest(sources[i])]))});
  keys.forEach((key,i)=>{const file=path.join(fixture,'out',key);fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,sources[i]);});
  fs.writeFileSync(path.join(fixture,'product.json'),metadata);
  const result=installNativePicker(fixture);assert.equal(result.ok,false);assert.equal(result.errorCode,'BYOK_NATIVE_PICKER_MIXED');
  keys.forEach((key,i)=>assert.equal(fs.readFileSync(path.join(fixture,'out',key),'utf8'),sources[i]));
  assert.equal(fs.readFileSync(path.join(fixture,'product.json'),'utf8'),metadata);
 }finally{
  if(path.dirname(path.resolve(fixture))!==parent||!path.basename(fixture).startsWith('byok-mixed-compat-'))throw Error('Unsafe cleanup');
  fs.rmSync(fixture,{recursive:true,force:true});
 }
}
console.log('NATIVE_COMPATIBILITY_OK records='+records.length+' exact=verified structure-reuse=verified drift=blocked metadata=checked mixed=no-write realBundles='+realBundles);
