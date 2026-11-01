'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),zlib=require('node:zlib'),semver=require('semver');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
function packageInfo(bytes){
 let end=-1;for(let i=bytes.length-22;i>=Math.max(0,bytes.length-65557);i--)if(bytes.readUInt32LE(i)===0x06054b50){end=i;break;}if(end<0)throw Error('invalid_vsix');
 const count=bytes.readUInt16LE(end+10);let offset=bytes.readUInt32LE(end+16),found={};if(count>10000)throw Error('invalid_vsix');
 for(let i=0;i<count;i++){if(offset+46>bytes.length||bytes.readUInt32LE(offset)!==0x02014b50)throw Error('invalid_vsix');const flags=bytes.readUInt16LE(offset+8),method=bytes.readUInt16LE(offset+10),size=bytes.readUInt32LE(offset+20),length=bytes.readUInt16LE(offset+28),extra=bytes.readUInt16LE(offset+30),comment=bytes.readUInt16LE(offset+32),local=bytes.readUInt32LE(offset+42),name=bytes.subarray(offset+46,offset+46+length).toString();offset+=46+length+extra+comment;
  if(!['extension/package.json','extension/cloud-product.json'].includes(name))continue;if(found[name]||flags&1||size>1024*1024||local+30>bytes.length||bytes.readUInt32LE(local)!==0x04034b50)throw Error('invalid_vsix');const start=local+30+bytes.readUInt16LE(local+26)+bytes.readUInt16LE(local+28);if(start+size>bytes.length)throw Error('invalid_vsix');const compressed=bytes.subarray(start,start+size),raw=method===0?compressed:method===8?zlib.inflateRawSync(compressed,{maxOutputLength:1024*1024}):null;if(!raw)throw Error('invalid_vsix');found[name]=JSON.parse(raw.toString());
 }
 const pkg=found['extension/package.json'],product=found['extension/cloud-product.json'];if(!pkg||!product)throw Error('invalid_vsix');return {extensionId:pkg.publisher+'.'+pkg.name,version:pkg.version,edition:product.enabled===true?'cloud':'local'};
}
function verifyRelease(envelope,config,edition,current){
 if(typeof envelope.payload!=='string'||envelope.payload.length>32768||typeof envelope.signature!=='string'||!crypto.verify(null,Buffer.from(envelope.payload),crypto.createPublicKey(config.publicKey),Buffer.from(envelope.signature,'base64')))throw Error('invalid_signature');
 const release=JSON.parse(envelope.payload);if(release.schema!==1||release.edition!==edition||release.extensionId!==config.extensionId||!semver.valid(release.version)||!Number.isSafeInteger(release.size)||release.size<1||release.size>32*1024*1024||!/^[a-f0-9]{64}$/.test(release.sha256)||release.file!==`devin-${edition}-${release.version}-win32-x64.vsix`)throw Error('invalid_release');
 if(release.platform!=='win32'||release.arch!=='x64')throw Error('unsupported_platform');return {...release,hasUpdate:semver.gt(release.version,current)};
}
async function readBounded(response,max){if(!response.ok||!response.body)throw Error('download_failed');let size=0,chunks=[];for await(const part of response.body){size+=part.length;if(size>max){await response.body.cancel?.().catch(()=>{});throw Error('download_limit');}chunks.push(part);}return Buffer.concat(chunks);}
class UpdateManager{
 constructor({context,logger,vscode,fetchImpl=globalThis.fetch,product,edition,platform=process.platform,arch=process.arch}){this.context=context;this.logger=logger;this.vscode=vscode;this.fetch=fetchImpl;this.product=product||JSON.parse(fs.readFileSync(path.join(context.extensionPath,'update-product.json'),'utf8'));this.edition=edition||(JSON.parse(fs.readFileSync(path.join(context.extensionPath,'cloud-product.json'),'utf8')).enabled?'cloud':'local');this.platform=platform;this.arch=arch;this.disposed=false;}
 current(){return this.context.extension?.packageJSON?.version||JSON.parse(fs.readFileSync(path.join(this.context.extensionPath,'package.json'))).version;}
 bindPanel(panel){this.panel=panel;}getAvailable(){return this.available||{available:false};}
 setAvailable(value){this.available=value;this.panel?.notifyUpdate?.(this.getAvailable());}
 setting(name,fallback){return this.vscode.workspace?.getConfiguration('byokBridge.updates').get(name,fallback)??fallback;}
 start(){this.stop();if(this.edition==='local'||this.product.enabled===false||!this.setting('enabled',true))return;this.first=setTimeout(()=>{void this.check();},15000);this.poll=setInterval(()=>{void this.check();},6*60*60*1000);this.first.unref?.();this.poll.unref?.();}
 stop(){clearTimeout(this.first);clearInterval(this.poll);}dispose(){this.disposed=true;this.stop();this.abort?.abort();}
 checkManual(){return this.check({manual:true});}
 async request(url,max){const controller=new AbortController();this.abort=controller;const timer=setTimeout(()=>controller.abort(),30000);try{return await readBounded(await this.fetch(url,{redirect:'error',credentials:'omit',signal:controller.signal,headers:{accept:'application/octet-stream'}}),max);}finally{clearTimeout(timer);this.abort=null;}}
 async check({manual=false}={}){
  if(this.edition==='local'||this.product.enabled===false){if(manual)await this.vscode.window.showInformationMessage('本地版使用离线安装包更新，不连接业务更新服务器。');return {ok:true,disabled:true,message:'本地版使用离线安装包更新'};}
  if(this.busy)return {ok:true,busy:true};this.busy=true;
  try{
   if(this.platform!=='win32'||this.arch!=='x64')throw Error('unsupported_platform');
   const base=new URL(this.product.baseUrl);if((base.protocol!=='https:'&&!(base.protocol==='http:'&&base.origin===this.product.insecureHttpOrigin))||base.username||base.password||base.pathname!=='/')throw Error('invalid_update_origin');
   const envelope=JSON.parse((await this.request(new URL(`/plugin-updates/${this.edition}/latest.json`,base),65536)).toString()),release=verifyRelease(envelope,this.product,this.edition,this.current());
   if(!release.hasUpdate){this.setAvailable(null);if(manual)await this.vscode.window.showInformationMessage('当前已是最新版本 v'+this.current());return {ok:true,hasUpdate:false,latestVersion:release.version};}
   this.setAvailable({available:true,version:release.version});
   let file;if(this.setting('autoDownload',true)||manual)file=await this.download(release,base);
   const notified='pluginUpdate.notified.'+this.edition;if(!manual&&this.context.globalState.get(notified)===release.version)return {ok:true,hasUpdate:true,downloaded:!!file,latestVersion:release.version};
   await this.context.globalState.update(notified,release.version);if(this.disposed)return {ok:true,hasUpdate:true};
   const choice=await this.vscode.window.showInformationMessage(`插件有新版本 v${release.version}${file?'，已下载并验证':''}。安装后需重载窗口。`,'立即安装','稍后');
   if(choice!=='立即安装'||this.disposed)return {ok:true,hasUpdate:true,downloaded:!!file,latestVersion:release.version};
   file ||= await this.download(release,base);if(this.disposed)return {ok:false,error:'cancelled'};
   await this.vscode.commands.executeCommand('workbench.extensions.installExtension',this.vscode.Uri.file(file));
   this.setAvailable(null);const reload=await this.vscode.window.showInformationMessage(`插件 v${release.version} 安装完成`,'重载窗口');if(reload==='重载窗口'&&!this.disposed)await this.vscode.commands.executeCommand('workbench.action.reloadWindow');return {ok:true,installed:true,version:release.version};
  }catch(error){this.logger?.warn?.('[UPDATE] '+(['invalid_signature','invalid_release','unsupported_platform','invalid_vsix','integrity_failed'].includes(error.message)?error.message:'update_unavailable'));if(manual)await this.vscode.window.showWarningMessage('更新检查或安装未完成，请稍后重试；签名或文件校验失败时不会安装。');return {ok:false,error:'更新暂不可用或校验未通过'};}finally{this.busy=false;}
 }
 async download(release,base){
  const folder=path.join(this.context.globalStorageUri.fsPath,'updates',this.edition);fs.mkdirSync(folder,{recursive:true});const file=path.join(folder,release.file);
  const verify=bytes=>{if(bytes.length!==release.size||hash(bytes)!==release.sha256)throw Error('integrity_failed');const info=packageInfo(bytes);if(info.extensionId!==release.extensionId||info.version!==release.version||info.edition!==this.edition)throw Error('invalid_vsix');};
  try{verify(fs.readFileSync(file));return file;}catch{}
  const bytes=await this.request(new URL(`/plugin-updates/${this.edition}/${release.file}`,base),release.size);verify(bytes);if(this.disposed)throw Error('cancelled');const temporary=file+'.'+crypto.randomBytes(6).toString('hex')+'.part';try{fs.writeFileSync(temporary,bytes,{flag:'wx'});fs.renameSync(temporary,file);}finally{try{fs.unlinkSync(temporary);}catch{}}return file;
 }
}
module.exports={UpdateManager,verifyRelease,packageInfo};
