'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),zlib=require('node:zlib');
function build(origin){
 if(process.platform!=='win32'||process.arch!=='x64')throw Error('Build this runtime on Windows x64 with matching sharp dependencies');
 const root=path.resolve(__dirname,'..'),files=[];const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
 for(const name of ['sharp','@img','@emnapi','semver','detect-libc','tslib']){
  const start=path.join(root,'node_modules',name);if(!fs.existsSync(start))continue;
  function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,entry.name);if(entry.isSymbolicLink())throw Error('Runtime input must not contain symlinks');if(entry.isDirectory())walk(full);else{const bytes=fs.readFileSync(full);files.push({path:path.relative(root,full).replace(/\\/g,'/'),data:bytes.toString('base64'),sha256:hash(bytes)});}}}walk(start);
 }
 files.sort((a,b)=>a.path.localeCompare(b.path));const buffers=files.map(f=>Buffer.from(f.data,'base64')),metadata=Buffer.from(JSON.stringify({format:1,files:files.map((f,i)=>({path:f.path,size:buffers[i].length}))})),header=Buffer.alloc(4);header.writeUInt32BE(metadata.length);
 const bytes=zlib.gzipSync(Buffer.concat([header,metadata,...buffers]),{level:9}),digest=hash(bytes),name='vision-win32-x64-'+digest.slice(0,16)+'.json.gz';
 const dir=path.resolve(root,'../cloud-gateway/public/plugin-runtime');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,name),bytes);
 const base=new URL(origin);if(!['http:','https:'].includes(base.protocol)||base.username||base.password||base.pathname!=='/')throw Error('Pass asset origin');
 const manifest={id:'vision-win32-x64-'+digest.slice(0,16),platform:'win32',arch:'x64',url:new URL('/plugin-runtime/'+name,base).href,...(base.protocol==='http:'?{insecureHttpOrigin:base.origin}:{}),bytes:bytes.length,sha256:digest,files:files.map(({path,sha256})=>({path,sha256}))};
 fs.writeFileSync(path.join(root,'../packaging/cloud-image-runtime.json'),JSON.stringify(manifest,null,2)+'\n');return {file:path.join(dir,name),bytes:bytes.length,files:files.length};
}
if(require.main===module){let origin=process.argv[2];if(!origin){const homedir=require('node:os').homedir(),installRoot=path.join(homedir,'.devin/extensions'),latest=fs.readdirSync(installRoot).filter(n=>n.startsWith('byok-dev.devin-byok-bridge-')).sort((a,b)=>a.localeCompare(b,undefined,{numeric:true})).at(-1),product=JSON.parse(fs.readFileSync(path.join(installRoot,latest,'cloud-product.json'),'utf8'));origin=product.gatewayUrl;}console.log(JSON.stringify(build(origin)));}
module.exports={build};
