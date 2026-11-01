'use strict';
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto'),http=require('node:http'),assert=require('node:assert/strict');
const {UpdateManager,verifyRelease}=require('../plugin-updater.cjs'),{publish}=require('./publish-plugin-update.cjs'),{serveUpdates}=require('../../cloud-gateway/src/update-assets.cjs');
async function main(){
 const parent=fs.realpathSync.native(os.tmpdir()),root=fs.mkdtempSync(path.join(parent,'byok-plugin-updates-')),key=crypto.generateKeyPairSync('ed25519'),keyFile=path.join(root,'private.pem'),output=path.join(root,'public');fs.writeFileSync(keyFile,key.privateKey.export({format:'pem',type:'pkcs8'}));
 const local=path.resolve(__dirname,'../../artifacts/slim-runtime-release/devin-byok-bridge-1.1.44-local-slim.vsix'),cloud=path.resolve(__dirname,'../../artifacts/slim-runtime-release/devin-cloud-bridge-1.5.5-slim.vsix');
 publish(local,{keyFile,output});publish(cloud,{keyFile,output});let requests=[],tamper=false;
 const server=http.createServer((req,res)=>{assert(!req.headers.authorization);requests.push(req.url);if(tamper&&req.url.endsWith('.vsix')){res.end('corrupt');return;}if(!serveUpdates(req,res,new URL(req.url,'http://test'),output)){res.writeHead(404);res.end();}});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const origin='http://127.0.0.1:'+server.address().port,product={baseUrl:origin,insecureHttpOrigin:origin,extensionId:'byok-dev.devin-byok-bridge',publicKey:key.publicKey.export({format:'pem',type:'spki'})};
 function harness(edition='cloud',choice='稍后',version=edition==='local'?'1.1.43':'1.5.4'){
  const values=new Map(),commands=[],messages=[],context={extensionPath:'unused',extension:{packageJSON:{version}},globalStorageUri:{fsPath:path.join(root,crypto.randomBytes(8).toString('hex'))},globalState:{get:key=>values.get(key),update:async(key,val)=>values.set(key,val)}};
  const vscode={workspace:{getConfiguration:()=>({get:(_name,fallback)=>fallback})},Uri:{file:fsPath=>({fsPath})},window:{showInformationMessage:async(message)=>{messages.push(message);return message.includes('有新版本')?choice:undefined;},showWarningMessage:async m=>messages.push(m)},commands:{executeCommand:async(...args)=>{commands.push(args);assert(fs.existsSync(args[1].fsPath));}}};
  const manager=new UpdateManager({context,vscode,product,edition,platform:'win32',arch:'x64'});return {manager,commands,messages,context};
 }
 try{
  const localHarness=harness('local','立即安装');localHarness.manager.start();assert.equal(localHarness.manager.first,undefined);assert.equal((await localHarness.manager.checkManual()).disabled,true);assert.equal(localHarness.commands.length,0);assert.equal(requests.length,0,'local edition must not contact update host even with a server URL configured');
  const separate=harness('cloud','立即安装');assert.equal((await separate.manager.checkManual()).version,'1.5.5');assert(separate.commands[0][1].fsPath.includes('cloud'));
  const delayed=harness();assert.equal((await delayed.manager.check()).downloaded,true);assert.equal(delayed.commands.length,0);const downloads=requests.filter(r=>r.endsWith('.vsix')).length;await delayed.manager.check();assert.equal(requests.filter(r=>r.endsWith('.vsix')).length,downloads,'verified cached VSIX reused');assert.equal(delayed.messages.length,1,'background notices deduplicated');
  const concurrent=harness();const a=concurrent.manager.check(),b=await concurrent.manager.check();assert.equal(b.busy,true);await a;
  const downgrade=harness('cloud','立即安装','1.5.6');assert.equal((await downgrade.manager.checkManual()).hasUpdate,false);assert.equal(downgrade.commands.length,0);
  const envelope=JSON.parse(fs.readFileSync(path.join(output,'cloud/latest.json'),'utf8'));assert.throws(()=>verifyRelease({...envelope,payload:envelope.payload+' '},product,'cloud','1.5.4'),/invalid_signature/);assert.throws(()=>verifyRelease(envelope,product,'local','1.1.43'),/invalid_release/);
  tamper=true;const corrupt=harness('cloud','立即安装');assert.equal((await corrupt.manager.checkManual()).ok,false);assert.equal(corrupt.commands.length,0);tamper=false;
  const payload=JSON.parse(envelope.payload),other=fs.readFileSync(local);payload.sha256=crypto.createHash('sha256').update(other).digest('hex');payload.size=other.length;const text=JSON.stringify(payload);fs.writeFileSync(path.join(output,'cloud/latest.json'),JSON.stringify({payload:text,signature:crypto.sign(null,Buffer.from(text),key.privateKey).toString('base64')}));fs.writeFileSync(path.join(output,'cloud',payload.file),other);
  const wrongArchive=harness('cloud','立即安装');assert.equal((await wrongArchive.manager.checkManual()).ok,false);assert.equal(wrongArchive.commands.length,0,'signed metadata still requires matching package identity and edition');
  assert.equal((await fetch(origin+'/plugin-updates/local/%2e%2e%2fprivate.pem')).status,404);assert.equal((await fetch(origin+'/plugin-updates/local/devin-cloud-1.5.5-win32-x64.vsix')).status,404);
  assert.equal((await fetch(origin+'/plugin-updates/cloud/latest.json',{method:'HEAD'})).headers.get('cache-control'),'no-cache');
  console.log('PLUGIN_UPDATER_OK local=no-network cloud=verified signatures+hash+identity downgrade=blocked concurrent=single cache=reused background=noninterrupting install=mocked static=bounded');
 }finally{await new Promise(r=>server.close(r));if(path.dirname(root)!==parent||!path.basename(root).startsWith('byok-plugin-updates-'))throw Error('Unsafe cleanup');fs.rmSync(root,{recursive:true,force:true});}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
