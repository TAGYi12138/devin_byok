'use strict';
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),crypto=require('node:crypto'),zlib=require('node:zlib');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
function createRuntime({manifest=require('../image-runtime.json'),cacheRoot=path.join(process.env.LOCALAPPDATA||os.homedir(),'Devin-BYOK-Bridge','image-runtime'),fetchImpl=globalThis.fetch,load=require,platform=process.platform,arch=process.arch,bundled=true,timeoutMs=30000}={}){
 if(!/^[a-z0-9-]{1,100}$/.test(manifest.id))throw Error('runtime_id_invalid');cacheRoot=path.resolve(cacheRoot);
 let codec,flight,retryAt=0,state='idle';
 const supported=manifest.platform===platform&&manifest.arch===arch&&Number(process.versions.napi)>=9;
 const destination=path.join(cacheRoot,manifest.id);
 function verify(root){for(const file of manifest.files){const full=path.join(root,file.path);const stat=fs.lstatSync(full);if(!stat.isFile()||stat.isSymbolicLink()||hash(fs.readFileSync(full))!==file.sha256)throw Error('runtime_integrity_failed');}}
 function cached(){try{verify(destination);codec=load(path.join(destination,'node_modules','sharp'));state='ready';return codec;}catch{return null;}}
 function get(){if(codec)return codec;if(bundled)try{codec=load('sharp');state='ready';return codec;}catch{}if(manifest.downloadEnabled===false)return null;return supported?cached():null;}
 async function install(){
  if(!supported)throw Error('runtime_platform_unsupported');
  const url=new URL(manifest.url);if((url.protocol!=='https:'&&!(url.protocol==='http:'&&url.origin===manifest.insecureHttpOrigin))||url.username||url.password)throw Error('runtime_url_invalid');
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),timeoutMs);let temporary;
  try{
   state='downloading';const response=await fetchImpl(url,{signal:controller.signal,redirect:'error',credentials:'omit',headers:{'accept':'application/octet-stream'}});
   if(!response.ok||!response.body)throw Error('runtime_download_failed');
   const chunks=[];let size=0;for await(const chunk of response.body){size+=chunk.length;if(size>manifest.bytes||size>24*1024*1024){controller.abort();throw Error('runtime_download_limit');}chunks.push(chunk);}
   const bytes=Buffer.concat(chunks);if(size!==manifest.bytes||hash(bytes)!==manifest.sha256)throw Error('runtime_integrity_failed');
   const unpacked=zlib.gunzipSync(bytes,{maxOutputLength:64*1024*1024}),header=unpacked.readUInt32BE(0);if(header>1024*1024)throw Error('runtime_archive_invalid');
   const document=JSON.parse(unpacked.subarray(4,4+header));let offset=4+header;
   if(document.format!==1||!Array.isArray(document.files)||document.files.length!==manifest.files.length)throw Error('runtime_archive_invalid');
   fs.mkdirSync(cacheRoot,{recursive:true});temporary=fs.mkdtempSync(path.join(cacheRoot,'.download-'));const seen=new Set();
   for(const file of document.files){const expected=manifest.files.find(row=>row.path===file.path);if(!expected||seen.has(file.path)||!/^node_modules\/[\w@./+-]+$/.test(file.path)||file.path.split('/').includes('..')||file.path.includes('//'))throw Error('runtime_archive_invalid');
    if(!Number.isSafeInteger(file.size)||file.size<0||offset+file.size>unpacked.length)throw Error('runtime_archive_invalid');const data=unpacked.subarray(offset,offset+file.size);offset+=file.size;if(hash(data)!==expected.sha256)throw Error('runtime_integrity_failed');seen.add(file.path);const full=path.join(temporary,...file.path.split('/'));fs.mkdirSync(path.dirname(full),{recursive:true});fs.writeFileSync(full,data,{flag:'wx'});
   }
   if(offset!==unpacked.length)throw Error('runtime_archive_invalid');verify(temporary);
   if(fs.existsSync(destination)&&!cached()){
    const invalid=path.join(cacheRoot,'.invalid-'+crypto.randomBytes(12).toString('hex'));fs.renameSync(destination,invalid);fs.rmSync(invalid,{recursive:true,force:true});
   }
   try{fs.renameSync(temporary,destination);temporary=null;}catch(error){if(!cached())throw error;}
   if(!cached())throw Error('runtime_load_failed');return codec;
  }finally{clearTimeout(timer);if(temporary&&path.dirname(temporary)===path.resolve(cacheRoot)&&path.basename(temporary).startsWith('.download-'))fs.rmSync(temporary,{recursive:true,force:true});}
 }
 async function ensure(){const ready=get();if(ready)return ready;if(manifest.downloadEnabled===false){state='unavailable';return null;}if(Date.now()<retryAt)return null;if(!flight)flight=install().catch(()=>{state='unavailable';retryAt=Date.now()+60000;return null;}).finally(()=>{flight=null;});return flight;}
 return {get,ensure,status:()=>({state,supported})};
}
let singleton;function runtime(){return singleton||=createRuntime();}
module.exports={createRuntime,get:()=>runtime().get(),ensure:()=>runtime().ensure(),status:()=>runtime().status()};
