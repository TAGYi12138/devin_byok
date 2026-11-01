'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),helper=require('../server/public-errors.cjs'),temp=fs.mkdtempSync(path.join(os.tmpdir(),'public-errors-')),product=path.join(temp,'product.json');
process.env.DEVIN_CLOUD_PRODUCT_PATH=product;
fs.writeFileSync(product,JSON.stringify({enabled:true,gatewayUrl:'http://193.112.181.238:18080',insecureHttpOrigin:'http://193.112.181.238:18080'}));
process.env.BYOK_LOCAL_MITM_TEST_EXPORTS='1';
const local=require('../server/run-local-mitm.cjs');
function safe(text){for(const secret of ['193.112.181.238','18080','billing.internal.example','2001:db8::1','localhost:9999'])assert(!String(text).includes(secret),text);return text;}
const cases=[
 ['当前额度卡余额不足 @193.112.181.238:18080','当前额度卡余额不足'],
 ['当前额度卡已到期 @http://193.112.181.238:18080','当前额度卡已到期'],
 ['connect ECONNREFUSED 193.112.181.238:18080','ECONNREFUSED'],
 ['请求超时 http://193.112.181.238:18080/v1/responses?private=secret','请求超时'],
 ['TLS failed https://billing.internal.example:8443/v1','TLS failed'],
 ['connect failed [2001:db8::1]:18080','connect failed'],
 ['服务不可用 @localhost:9999','服务不可用'],
 ['HTTP 502 from http://user:password@193.112.181.238:18080/v1: 服务暂不可用','服务暂不可用']
];
for(const [error,reason]of cases){const formatted=safe(local.formatByokClientError({status:402,error,baseUrl:'http://193.112.181.238:18080/v1'}));assert(formatted.includes(reason),formatted);assert(!formatted.includes('@'));assert(!formatted.includes('private=secret'));assert(!formatted.includes('user:password'));}
assert.match(local.formatByokClientError({status:429,error:'请求过于频繁'}),/429.*请求过于频繁/);
// The extension host contains a separate copy of the formatter. Exercise it too.
const host=fs.readFileSync(path.join(root,'extension.js'),'utf8'),fn=/  function _0x21a9e4\([^]*?\n  }/.exec(host)?.[0];assert(fn);
const hostFormat=vm.runInNewContext('('+fn+')',{require:spec=>{assert.equal(spec,'./server/public-errors.cjs');return helper;}});
assert.equal(hostFormat({status:402,error:cases[0][0]}),local.formatByokClientError({status:402,error:cases[0][0]}));
// Both Cascade error encoders are the final boundary for buffered/stream errors.
for(const [file,name,arg,builders]of [
 ['inference-proxy.js','Pt','_0x1052ed',{yc:x=>x,_o:x=>x,io:1e6,rs:(id,text)=>({id,text})}],
 ['hybrid-server.js','gn','_0x2aab04',{yu:x=>x,Zo:x=>x,Yo:1e6,di:(id,text)=>({id,text})}]
]){const source=fs.readFileSync(path.join(root,'server',file),'utf8'),match=new RegExp('function '+name+'\\([^]*?\\n}').exec(source);assert(match);assert(match[0].includes(arg+' = _byokPublicErrors.forManaged'));
 const encode=vm.runInNewContext('('+match[0]+')',{_byokPublicErrors:helper,...builders});const frames=encode('message',cases[0][0]);safe(frames[0].text);assert(frames[0].text.includes('余额不足'));
}
function response(){const chunks=[];return {headersSent:false,writableEnded:false,chunks,writeHead(){this.headersSent=true;},write(value){chunks.push(Buffer.from(value));return true;},end(value){if(value)this.write(value);this.writableEnded=true;},once(){return this;},on(){return this;}};}
const res=response(),writer=local.createProgressiveChatWriter(res,{acceptGzip:false,pacing:{tickMs:0}});writer.abortWithError(cases[0][0]);safe(Buffer.concat(res.chunks).toString());assert(Buffer.concat(res.chunks).includes(Buffer.from('余额不足')));
const normal=response(),normalWriter=local.createProgressiveChatWriter(normal,{acceptGzip:false,pacing:{tickMs:0}});normalWriter.writeTextDelta('文档示例 http://193.112.181.238:18080');normalWriter.abortWithError('请求超时 @193.112.181.238:18080');assert(Buffer.concat(normal.chunks).includes(Buffer.from('http://193.112.181.238:18080')),'normal assistant content must not be redacted');
fs.writeFileSync(product,JSON.stringify({enabled:false}));const localError=local.formatByokClientError({status:502,error:'timeout',baseUrl:'http://localhost:9999/v1'});assert(localError.includes('@localhost:9999'),'local developer mode retains diagnostics');assert.equal(helper.forManaged('timeout @localhost:9999'),'timeout @localhost:9999');
console.log('PUBLIC_ERRORS_OK managed formatters, Cascade encoders, Local writer, normal content and local diagnostics');
