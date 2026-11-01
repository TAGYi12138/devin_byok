'use strict';
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),http=require('node:http'),assert=require('node:assert/strict'),{spawnSync}=require('node:child_process');
const {createRuntime}=require('../server/image-runtime.cjs'),{serveRuntime}=require('../../cloud-gateway/src/runtime-assets.cjs');
async function main(){
 const parent=fs.realpathSync.native(os.tmpdir()),root=fs.mkdtempSync(path.join(parent,'byok-image-runtime-')),base=require('../../packaging/cloud-image-runtime.json');let calls=0;
 const server=http.createServer((req,res)=>{calls++;assert.equal(req.method,'GET');assert(!req.headers.authorization);if(!serveRuntime(req,res,new URL(req.url,'http://local'))) {res.writeHead(404);res.end();}});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port,manifest={...base,url:origin+new URL(base.url).pathname,insecureHttpOrigin:origin},fake=()=>{};
 const make=(extra={})=>createRuntime({manifest,cacheRoot:root,bundled:false,load:()=>fake,...extra});
 try{
  const runtime=make();assert.deepEqual(await Promise.all([runtime.ensure(),runtime.ensure(),runtime.ensure()]),[fake,fake,fake]);assert.equal(calls,1,'one download for concurrent images');
  const offline=make({fetchImpl:()=>{throw Error('network must not be used')}});assert.equal(await offline.ensure(),fake);assert.equal(calls,1);
  const child=spawnSync(process.execPath,['-e','const r=require(process.argv[1]).createRuntime({manifest:JSON.parse(process.argv[2]),cacheRoot:process.argv[3],bundled:false});r.ensure().then(async c=>{if(!c)throw Error("No codec");const b=await c({create:{width:20,height:20,channels:3,background:"white"}}).png().toBuffer();console.log(b.length);});',path.resolve(__dirname,'../server/image-runtime.cjs'),JSON.stringify(manifest),root],{encoding:'utf8',windowsHide:true});assert.equal(child.status,0,child.stderr);assert(Number(child.stdout.trim())>0,'native codec actually encoded a PNG');
  const tamper=path.join(root,manifest.id,manifest.files.find(f=>f.path.endsWith('package.json')).path);fs.writeFileSync(tamper,'corrupt');const repair=make();assert.equal(await repair.ensure(),fake);assert.equal(calls,2,'corrupt cache must be reverified and repaired');
  const bad=make({cacheRoot:path.join(root,'bad'),fetchImpl:async()=>new Response('not the pinned archive')});assert.equal(await bad.ensure(),null);assert.equal(bad.status().state,'unavailable');assert(!fs.existsSync(path.join(root,'bad',manifest.id)));
  const timed=make({cacheRoot:path.join(root,'timed'),timeoutMs:20,fetchImpl:(_u,{signal})=>new Promise((_r,reject)=>signal.addEventListener('abort',()=>reject(Error('aborted'))))});assert.equal(await timed.ensure(),null);
  assert.equal(await make({platform:'unsupported',cacheRoot:path.join(root,'unsupported')}).ensure(),null);
  const runtimeFile=require.resolve('../server/image-runtime.cjs'),imageFile=require.resolve('../server/image-preprocess.cjs'),savedRuntime=require.cache[runtimeFile],savedImage=require.cache[imageFile];
  try{require.cache[runtimeFile]={exports:{get:()=>null,ensure:async()=>null}};delete require.cache[imageFile];const preprocess=require(imageFile),original='data:image/png;base64,aGVsbG8=';assert.deepEqual((await preprocess.optimizeDataUrl(original)).urls,[original]);assert.equal((await preprocess.optimizeMessages([{role:'user',content:'text only'}])).images,0);}finally{require.cache[runtimeFile]=savedRuntime;if(savedImage)require.cache[imageFile]=savedImage;else delete require.cache[imageFile];}
  const missing=await fetch(origin+'/plugin-runtime/vision-win32-x64-0000000000000000.json.gz');assert.equal(missing.status,404);
  const traversal=await fetch(origin+'/plugin-runtime/%2e%2e%2fpackage.json');assert.equal(traversal.status,404);
  console.log('IMAGE_RUNTIME_OK real-codec=PNG concurrent=one cache=offline tamper=repaired bad-hash=blocked timeout=bounded fallback=original-ready static=bounded');
 }finally{await new Promise(r=>server.close(r));if(path.dirname(root)!==parent||!path.basename(root).startsWith('byok-image-runtime-'))throw Error('Unsafe cleanup');fs.rmSync(root,{recursive:true,force:true});}
}
main().catch(e=>{console.error(e);process.exitCode=1;});
