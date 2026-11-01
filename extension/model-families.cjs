(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.ModelFamilies=factory();})(typeof globalThis==='object'?globalThis:this,function(){
 'use strict';
 // Keep the original Local binding family's rules, including Fable/Opus separation.
 const variants=new Set(['low','medium','high','xhigh','max','minimal','none','fast','priority','lightning','slow','thinking','1m']);
 function familyKeyFromUid(uid){
  const value=String(uid||'').trim().toLowerCase().replace(/_/g,'-').replace(/^model-/,'');
  if(!value)return '';const parts=value.split('-').filter(Boolean);
  while(parts.length>1&&variants.has(parts[parts.length-1]))parts.pop();
  if(parts.length===3&&parts[0]==='claude'&&/^\d+$/.test(parts[1])&&/^(opus|sonnet|haiku|fable)$/.test(parts[2])){const version=parts[1];parts.splice(1,1);parts.push(version);}
  return parts.join('-')||value;
 }
 function familyLabelFromLabel(label,uid){let value=String(label||uid||'').trim(),before;do{before=value;value=value.replace(/\s+(?:No\s+Thinking|Thinking|Medium|Low|High|XHigh|Max|Minimal|Fast|Priority|Lightning|Slow|1M(?:\s+Context)?)$/i,'').trim();}while(value&&value!==before);return value||String(label||uid||'').trim();}
 function isBlockedLocalBindEntry(uid){const key=familyKeyFromUid(uid);return /^fusion(?:-|$)/i.test(String(uid))||/^fusion(?:-|$)/i.test(key)||key==='adaptive'||key==='adaptivevvv';}
 function bindable(uid){return typeof uid==='string'&&!!uid.trim()&&!/_BYOK|PRIVATE/i.test(uid)&&! /^(?:byok-slot|subagent-default|memory-migration-default)/i.test(uid)&&!isBlockedLocalBindEntry(uid);}
 function preferRepresentativeUid(uids){const score=uid=>{let n=10;if(/(?:^|-)medium$|(?:^|-)medium-/.test(uid.toLowerCase()))n=100;else if(/(?:^|-)medium-fast$/.test(uid.toLowerCase()))n=90;else if(/(?:^|-)high$/.test(uid.toLowerCase()))n=50;else if(/(?:^|-)low$/.test(uid.toLowerCase()))n=40;if(/thinking/i.test(uid))n-=20;return n;};return uids.slice().sort((a,b)=>score(b)-score(a)||a.localeCompare(b))[0]||'';}
 function aggregateFamilies(rows){const groups=new Map();for(const row of rows||[]){if(!row||!bindable(row.uid))continue;const key=familyKeyFromUid(row.uid),label=familyLabelFromLabel(row.label,row.uid);let group=groups.get(key);if(!group){group={familyKey:key,label,uids:[]};groups.set(key,group);}if(!group.uids.includes(row.uid))group.uids.push(row.uid);if(label&&(!group.label||group.label===key))group.label=label;}
  return [...groups.values()].map(g=>({...g,uids:g.uids.sort(),representativeUid:preferRepresentativeUid(g.uids)})).sort((a,b)=>String(a.label).localeCompare(String(b.label)));
 }
 function matches(row,uid){return row.nativeUid===uid||!!row.nativeFamily&&row.nativeFamily===familyKeyFromUid(row.nativeUid)&&bindable(uid)&&row.nativeFamily===familyKeyFromUid(uid);}
 return {familyKeyFromUid,familyLabelFromLabel,isBlockedLocalBindEntry,bindable,preferRepresentativeUid,aggregateFamilies,matches};
});
