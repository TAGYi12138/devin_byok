'use strict';
// Apply only at user-visible error boundaries. Keep normal model output intact.
const escape=value=>value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
function sanitize(value,{gatewayUrl,baseUrl}={}){
 let text=String(value?.message??value??'');
 // Remove full endpoints (including paths, credentials and query strings).
 text=text.replace(/\b(?:https?|wss?):\/\/[^\s<>"'`\u3000-\u9fff]+/gi,'云端服务');
 for(const endpoint of [gatewayUrl,baseUrl]){
  if(!endpoint)continue;
  try{const url=new URL(endpoint);for(const part of [url.host,url.hostname].sort((a,b)=>b.length-a.length))if(part)text=text.replace(new RegExp(escape(part),'gi'),'云端服务');}catch{}
 }
 // Socket/DNS errors may contain bare addresses instead of a URL.
 text=text.replace(/\b(?:\d{1,3}\.){3}\d{1,3}(?::\d{1,5})?\b/g,'云端服务')
  .replace(/\[[\da-f:.]*:[\da-f:.]+\](?::\d{1,5})?/gi,'云端服务')
  .replace(/\b(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,63}(?::\d{1,5})?\b/gi,'云端服务')
  .replace(/\blocalhost(?::\d{1,5})?\b/gi,'云端服务')
  .replace(/\s*@\s*云端服务(?=\s|$|[)）\]，,。;；])/g,'')
  .replace(/(?:云端服务[/:]?){2,}/g,'云端服务');
 return text;
}
function product(){try{return require('./cloud-managed.cjs').product();}catch{return {enabled:true};}}
function forManaged(value,options={}){const p=product();return p.enabled?sanitize(value,{gatewayUrl:p.gatewayUrl,...options}):value;}
function formatManagedError(options={}){
 const p=product();if(!p.enabled)return null;
 const status=Number(options.status)>0?Number(options.status):0;
 const reason=sanitize(options.error,{gatewayUrl:p.gatewayUrl,baseUrl:options.baseUrl}).replace(/\s+/g,' ').replace(/^HTTP\s*\d+\s*[:：-]?\s*/i,'').trim().slice(0,280);
 return ('Error：failed'+(status?' '+status:'')+(reason?': '+reason:'')).slice(0,400);
}
module.exports={sanitize,forManaged,formatManagedError};
