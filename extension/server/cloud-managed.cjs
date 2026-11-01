'use strict';
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const families=require('../model-families.cjs');
function product(){
  const file=process.env.DEVIN_CLOUD_PRODUCT_PATH||path.join(__dirname,'..','cloud-product.json');
  const doc=JSON.parse(fs.readFileSync(file,'utf8'));
  if(doc.enabled!==true)return {enabled:false};
  const url=new URL(doc.gatewayUrl);
  const allowedHttp=url.protocol==='http:'&&(['localhost','127.0.0.1','[::1]'].includes(url.hostname)||doc.insecureHttpOrigin===url.origin);
  if((url.protocol!=='https:'&&!allowedHttp)||url.username||url.password||url.search||url.hash||url.pathname!=='/')throw Error('Cloud edition requires a fixed HTTPS gateway origin or an explicitly packaged HTTP origin');
  return {...doc,gatewayUrl:url.origin};
}
function statePath(){return process.env.DEVIN_CLOUD_SESSION_PATH||path.join(process.env.APPDATA||path.join(os.homedir(),'AppData','Roaming'),'Devin-BYOK-Bridge','config','cloud-session.json');}
function read(){
  const p=product();if(!p.enabled)return null;
  let state={};try{const file=statePath();if(fs.statSync(file).size>2*1024*1024)throw Error();state=JSON.parse(fs.readFileSync(file,'utf8'));}catch{}
  if(state.gatewayOrigin!==p.gatewayUrl)state={};
  const models=Array.isArray(state.models)?state.models.filter(r=>typeof r?.id==='string'&&typeof r?.nativeUid==='string'):[];
  return {...p,...state,gatewayUrl:p.gatewayUrl,models,accessToken:state.expiresAt>Date.now()?String(state.accessToken||''):''};
}
function bindings(){const state=read();if(!state)return null;let local=[];if(state.models.some(r=>r.nativeFamily))try{local=require('../cloud-catalog.cjs').readModels();}catch{}
 const map=new Map();for(const row of state.models){const binding={providerId:'managed-cloud',modelId:row.id,contextLimit:row.contextLimit,supportsVision:row.supportsVision,apiFormat:row.protocol,...(row.nativeFamily?{familyKey:row.nativeFamily}:{})};map.set(row.nativeUid,binding);if(row.nativeFamily)for(const model of local)if(families.matches(row,model.uid))map.set(model.uid,binding);}return map;}
function resolve(uid){
  const state=read();if(!state)return null;
  const row=state.models.find(r=>r.nativeUid===uid)||state.models.find(r=>families.matches(r,uid)) || (uid==='subagent-default'?state.models[0]:null);
  // Always claim the request in managed mode. Unknown UIDs and expired sessions
  // must fail at our gateway; they must never fall through to a local supplier.
  return {ok:true,providerId:'managed-cloud',providerName:state.name||'云端服务',baseUrl:state.gatewayUrl+'/v1',apiKey:(state.accessToken||'activation-required')+'.'+String(state.installationId||'')+'.'+String(state.selectedCardId||''),model:row?.id||'__model_not_allowed__',protocol:row?.protocol||'openai',openaiPath:row?.protocol==='openai_responses'?'/responses':'/chat/completions',anthropicPath:'/messages',supportsVision:!!row?.supportsVision,contextLimit:row?.contextLimit||32768,matchUid:uid,source:'managed-cloud',timeoutMs:Math.max(300000,(Number(row?.requestTimeoutMs)||300000)+30000)};
}
function requestHeaders(cfg,sessionId){return cfg?.providerId==='managed-cloud'&&typeof sessionId==='string'&&sessionId?{'x-session-id':require('node:crypto').createHash('sha256').update(sessionId).digest('hex')}:{};}
module.exports={product,statePath,read,bindings,resolve,requestHeaders};
