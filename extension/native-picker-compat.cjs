'use strict';

// Bundled records; never select the nearest version or fetch executable fixes.
const RECORDS = require('./native-picker-releases.json');
function catalog() { return RECORDS.map(row=>({...row,markers:{...row.markers},verification:'real-host-component-and-transaction-tests'})); }
function fail(code,message){const error=new Error(message);error.code=code;throw error;}
function channelOf(host={}){
  if(host.quality==='next'||/next/i.test(String(host.nameLong||host.nameShort||''))||/next/i.test(String(host.windsurfVersion||host.version||'')))return 'next';
  if(host.quality==='stable'||/^\d+\.\d+\.\d+/.test(String(host.windsurfVersion||'')))return 'stable';
  return null;
}
function select(source,profiles,{host={},surface}={}){
  const components=profiles.filter(profile=>source.includes(profile.component));
  const candidates=components.filter(profile=>profile.edits.every(edit=>source.split(edit.before).length===2));
  if(components.length&&!candidates.length)fail('BYOK_NATIVE_PICKER_BOUNDARY_DRIFT','模型菜单结构已变化，兼容检查未通过');
  if(!candidates.length)return null; // Preserve legacy adapter dispatch.
  if(candidates.length!==1)fail('BYOK_NATIVE_PICKER_AMBIGUOUS','发现多套模型菜单结构，无法唯一确定兼容方案');
  const profile=candidates[0],references=RECORDS.filter(row=>Object.values(row.markers).includes(profile.marker));
  if(!references.length)fail('BYOK_NATIVE_PICKER_UNREGISTERED','模型菜单适配规则尚未登记');
  const actualSurface=Object.keys(references[0].markers).find(key=>references[0].markers[key]===profile.marker);
  if(surface&&surface!==actualSurface)fail('BYOK_NATIVE_PICKER_MIXED','模型菜单文件位置与兼容方案不一致');
  const channel=channelOf(host),build=String(host.windsurfVersion||host.devinVersion||'').split('+')[0],commit=String(host.commit||'');
  const commitHints=RECORDS.filter(row=>row.commit===commit&&(!channel||row.channel===channel)),buildHints=RECORDS.filter(row=>row.build===build&&(!channel||row.channel===channel));
  let eligible=references.filter(row=>!channel||row.channel===channel);
  if(!eligible.length)fail('BYOK_NATIVE_PICKER_CHANNEL_MISMATCH','Devin 通道与模型菜单结构不一致，请等待官方更新完成');
  if(commitHints.length)eligible=eligible.filter(row=>commitHints.some(h=>h.id===row.id));
  if(buildHints.length)eligible=eligible.filter(row=>buildHints.some(h=>h.id===row.id));
  if(!eligible.length)fail('BYOK_NATIVE_PICKER_METADATA_MISMATCH','Devin 版本信息与模型菜单文件不一致，请等待官方更新完成');
  const record=eligible[0];
  return {profileId:record.id,channel:record.channel,referenceBuild:record.build,surface:actualSurface,marker:profile.marker,
    strategy:commitHints.length?'commit-and-structure':buildHints.length?'version-and-structure':'structure-reuse',
    anchorsVerified:profile.edits.length,hostBuild:build||null,candidateProfileIds:eligible.map(row=>row.id)};
}
function assertBundleSet(selections,targetCount){
  const rows=selections.filter(Boolean);
  const common=rows.length?rows[0].candidateProfileIds.filter(id=>rows.every(row=>row.candidateProfileIds.includes(id))):[];
  if(rows.length&&(rows.length!==targetCount||!common.length||new Set(rows.map(row=>row.surface)).size!==rows.length)){
    fail('BYOK_NATIVE_PICKER_MIXED','Devin 的模型菜单文件来自不同兼容方案，请等待官方更新完成');
  }
  if(common.length){const record=RECORDS.find(row=>row.id===common[0]);for(const row of rows){row.profileId=record.id;row.referenceBuild=record.build;row.channel=record.channel;}}
}
module.exports={catalog,select,assertBundleSet,channelOf};
