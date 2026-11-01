"use strict";
const fs=require('node:fs');
const vm=require('node:vm');
const patch=require('../native-picker-patch.cjs');
const file=process.argv[2];
if(!file) throw new Error('Pass installed chat-client path');
const original=fs.readFileSync(file,'utf8');
const descriptor=process.env.BYOK_NATIVE_PICKER_DESCRIPTOR?JSON.parse(fs.readFileSync(process.env.BYOK_NATIVE_PICKER_DESCRIPTOR,'utf8')):null;
const base=patch.unpatchNativePicker(original);
const result=patch.patchNativePicker(base.code);
if(!result.changed) throw new Error('Base editor recipe did not patch');
if(/BYOK_NATIVE_PICKER_(EDITOR|SESSIONS)_(NEXT|STABLE|RELEASE)_/.test(result.code)){
 const assert=require('node:assert/strict'),match=result.code.match(/\/\*(BYOK_NATIVE_PICKER_(EDITOR|SESSIONS)_(NEXT|STABLE|RELEASE)_(?:311|238|[A-F0-9]+)):composer-config-selector-fallback:start\*\/([\s\S]+?)\/\*\1:composer-config-selector-fallback:end\*\//);
 assert(match,'3.11 SSH composer fallback missing');const selector=match[4],name=selector.match(/^function (\w+)\(/)[1],editor=match[2]==='EDITOR';
 function run({provider='devin-cli',location={kind:'local'},remote={isRemoteConnection:true,remoteName:'ssh-remote'},cached=[],active=null,pending=false}={}){
  const state={acp:{pendingSwitchTarget:pending?{}:null,cachedConfigOptionsByProvider:{[provider]:cached}}},context={};
  const values={active:()=>active,provider:()=>provider,state:fn=>fn(state),remote:()=>remote,connectors:()=>[{id:provider,location}],isDevin:id=>['devin-cli','devin','devin-local'].includes(id)};
  let aliases=match[1].endsWith('_238')?(editor?{tly:'active',tl$:'provider',tlf:'state',D8:'remote',tsi:'connectors',esD:'isDevin'}:{Hqr:'active',eV:'provider',mc:'state',GC:'remote',u6:'connectors',dY:'isDevin'}):editor?{tlv:'active',tlH:'provider',tlp:'state',D7:'remote',tsn:'connectors',esT:'isDevin'}:{Bqr:'active',Nqr:'active',sV:'provider',bc:'state',GC:'remote',s6:'connectors',eY:'isDevin'};
  if(descriptor){const spec=descriptor.profile.selector,before=spec.before,activeName=/\{let [\w$]+=([\w$]+)\(\)/.exec(before)[1],providerName=new RegExp(spec.provider.replace(/\$/g,'\\$')+'=([\\w$]+)\\(\\)').exec(before)[1],stateName=/[\w$]+=([\w$]+)\([\w$]+=>[^;]*pendingSwitchTarget/.exec(before)[1],empty=/\?\?([\w$]+)}$/.exec(before)[1];aliases={[activeName]:'active',[providerName]:'provider',[stateName]:'state',[spec.remote.slice(0,-2)]:'remote',[spec.connectors.slice(0,-2)]:'connectors',[spec.isDevin]:'isDevin'};context[empty]=[];}
  for(const [alias,key]of Object.entries(aliases))context[alias]=values[key];for(const empty of ['qhs','nZ6','nZ9','jhs','nQr'])context[empty]=[];
  return vm.runInNewContext(selector+';'+name+'()',context);
 }
 assert.deepEqual(Array.from(run(),r=>r.id),['model'],'empty SSH draft must mount a model picker');
 assert.equal(run({remote:{}}).length,0,'local drafts must remain native');assert.equal(run({remote:{remoteName:'dev-container',isRemoteConnection:true}}).length,0);
 assert.deepEqual(Array.from(run({remote:{},location:{kind:'ssh'}}),r=>r.id),['model']);
 assert.equal(run({provider:'claude-acp'}).length,0);assert.equal(run({provider:'devin-cloud'}).length,0);
 const mode={id:'agent-mode',category:'mode',name:'Mode',type:'select',currentValue:'review',options:[{value:'ask',name:'Ask'},{value:'review',name:'Review'},{value:'execute',name:'Execute'}]},model={id:'model',category:'model',type:'select',currentValue:'bound-a',options:[]},cached=[mode,model];
 assert.equal(run({cached}),cached,'native mode IDs, defaults and values must retain their exact objects');
 assert.equal(run({cached:[mode]})[0],mode,'partial provider config must preserve its real mode');
 const sessionMode={...mode,currentValue:'execute'},active=[sessionMode,model];assert.equal(run({cached,active}),active);assert.equal(run({cached,active,pending:true}),cached);
 assert(!run().some(row=>row.category==='mode'||row.id==='mode'),'missing modes must not be fabricated as Plan/Code');
 assert.equal(patch.unpatchNativePicker(result.code).code,base.code,'uninstall must restore exact source');
 console.log('SSH_PICKER_FALLBACK_311_OK '+match[1]+' draft=model modes=provider-owned session=preserved switch=target local=unchanged roundtrip=verified');process.exit(0);
}
if(!result.code.includes('composer-config-selector-fallback:start')) throw new Error('SSH selector fallback missing');
if(!patch.isEditorPickerPatched(result.code)) throw new Error('Upgraded editor recipe invalid');
const restored=patch.unpatchNativePicker(result.code);
if(!restored.changed||restored.code!==base.code) throw new Error('Patch round trip changed base editor');
const next310=result.code.includes(patch.NEXT_310_EDITOR_MARKER);
const start=result.code.indexOf(next310?'let nue=[];const __byokSshFallbackOptions=':'let nc4=[];const __byokSshFallbackOptions=');
const end=result.code.indexOf(next310?'function nun(':'function nc3(',start);
if(start<0||end<0) throw new Error('Selector not found');
const selector=result.code.slice(start,end);
function runSelector(location,provider,options,remote={},activeOptions=null,pending=false){
  const context={
    tCR:()=>activeOptions,
    t6E:()=>provider,
    tCk:fn=>fn({acp:{pendingSwitchTarget:pending?{}:null,cachedConfigOptionsByProvider:{[provider]:options}}}),
    tCW:()=>[{id:provider,location}],
    MD:()=>remote,
    eT8:id=>!!id&&id.toLowerCase().startsWith('devin')&&id!=='devin-cloud',
  };
  if(next310) Object.assign(context,{tCD:context.tCR,t6x:context.t6E,tCI:context.tCk,tCZ:context.tCW,eT9:context.eT8});
  vm.runInNewContext(selector+(next310?';globalThis.result=nut()':';globalThis.result=nc5()'),context);
  return context.result||[];
}
function runCase(...args){return Array.from(runSelector(...args),x=>x.id);}
const ssh=runCase({kind:'ssh',host:'example'},'devin-cli',[]);
const remoteLocal=runCase({kind:'local'},'devin-cli',[],{isRemoteConnection:true,remoteName:'ssh-remote'});
const local=runCase({kind:'local'},'devin-cli',[]);
const otherRemote=runCase({kind:'local'},'devin-cli',[],{isRemoteConnection:true,remoteName:'dev-container'});
const official=runCase({kind:'ssh',host:'example'},'claude-acp',[]);
const preserved=runCase({kind:'ssh',host:'example'},'devin-cli',[{id:'model',type:'select'},{id:'mode'},{id:'custom'}]);
const expected=next310?'["model"]':'["model","mode"]';
if(JSON.stringify(ssh)!==expected||JSON.stringify(remoteLocal)!==expected||local.length||otherRemote.length||official.length||JSON.stringify(preserved)!=='["model","mode","custom"]') throw new Error(JSON.stringify({ssh,remoteLocal,local,otherRemote,official,preserved}));
assertPartial();
function assertPartial(){
  const partial=runCase({kind:'local'},'devin-cli',[{id:'mode'},{id:'custom'}],{isRemoteConnection:true,remoteName:'ssh-remote'});
  if(JSON.stringify(partial)!=='["mode","custom","model"]') throw new Error('Existing mode must be preserved: '+JSON.stringify(partial));
  const cloud=runCase({kind:'ssh',host:'example'},'devin-cloud',[]);
  if(cloud.length) throw new Error('Cloud connector must retain its own options');
}
if(next310){
  const mode={id:'agent-mode',category:'mode',name:'运行模式',type:'select',currentValue:'review',options:[{value:'ask',name:'Ask'},{value:'review',name:'Review'},{value:'execute',name:'Execute'}]};
  const supplied=[mode,{id:'model',category:'model',type:'select',options:[]}];
  const remote={isRemoteConnection:true,remoteName:'ssh-remote'};
  const native=runSelector({kind:'local'},'devin-cli',supplied,remote);
  if(native!==supplied||native[0]!==mode||mode.currentValue!=='review'||mode.options.length!==3)throw new Error('Native modes must remain identical to provider data');
  const sessionMode={...mode,currentValue:'execute'};
  const session=runSelector({kind:'local'},'devin-cli',supplied,remote,[sessionMode]);
  if(session[0]!==sessionMode||session.some(x=>x.id==='mode'))throw new Error('Active session modes must win without fabricated mode rows');
  const switched=runSelector({kind:'local'},'devin-cli',supplied,remote,[sessionMode],true);
  if(switched!==supplied)throw new Error('Pending provider switch must use target provider modes');
  if(runSelector({kind:'local'},'devin-cli',[],remote).some(x=>x.category==='mode'||x.id==='mode'))throw new Error('Missing provider modes must not become Plan/Code');
}
console.log('SSH_PICKER_FALLBACK_OK upgrade=verified modes='+ (next310?'provider-owned':'legacy') +' local=unchanged official=unchanged roundtrip=verified');
