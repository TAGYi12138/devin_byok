'use strict';
// Loopback-only protocol integration. No native commands or real providers run.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {EventEmitter}=require('node:events');
const temp=fs.mkdtempSync(path.resolve(__dirname,'../../.tmp/devin-ab/native-1/safeguard-'));
process.env.APPDATA=path.join(temp,'roaming');
process.env.BYOK_DEVIN_BYOK_DIR=path.join(temp,'bridge');
process.env.BYOK_LOCAL_BINDINGS_PATH=path.join(temp,'bridge/config/localBindings.json');
process.env.BYOK_LOCAL_PROBE_APPDATA=path.join(temp,'probe');
process.env.BYOK_LOCAL_PROBE_BYOK_JSON=path.join(temp,'probe/byok.json');
process.env.BYOK_LOCAL_MITM_TEST_EXPORTS='1';
process.env.BYOK_LOCAL_EXECUTION_PROMPTS='off';
process.env.BYOK_LOCAL_ACCEPTANCE_GUARD='on';process.env.BYOK_LOCAL_PROCESS_GUARD='on';
const mod=require('../server/run-local-mitm.cjs');
class Response extends EventEmitter {
 constructor(){super();this.chunks=[];this.headersSent=false;this.writableEnded=false;this.destroyed=false;}
 writeHead(status,headers){this.status=status;this.headers=headers;this.headersSent=true;}
 write(b){this.chunks.push(Buffer.from(b));return true;}
 end(b){if(b)this.write(b);this.writableEnded=true;}
}
const todo=(id='todo')=>({id,name:'todo_write',arguments_json:JSON.stringify({todos:[{id:'impl',content:'实现库存事务存储',status:'completed'},{id:'browser',content:'浏览器验收',status:'completed'}]})});
let next={calls:[]};
async function main(){
 const upstream=http.createServer((req,res)=>{
  req.resume();req.on('end',()=>{
   if(next.xml){res.writeHead(200,{'content-type':'text/event-stream'});res.end('data: '+JSON.stringify({choices:[{delta:{content:'<invoke name="exec"><parameter name="command">Stop-Process -Name chrome</parameter></invoke>'},finish_reason:'stop'}]})+'\n\ndata: [DONE]\n\n');return;}
   if(req.url.endsWith('/messages')) {
    res.writeHead(200,{'content-type':'text/event-stream'});
    const event=(type,value)=>res.write('event: '+type+'\ndata: '+JSON.stringify({type,...value})+'\n\n');
    event('message_start',{message:{id:'msg-test',role:'assistant',content:[],usage:{input_tokens:10,output_tokens:0}}});
    let index=0;
    if(next.text){event('content_block_start',{index,content_block:{type:'text',text:''}});event('content_block_delta',{index,delta:{type:'text_delta',text:next.text}});event('content_block_stop',{index});index++;}
    for(const c of next.calls){event('content_block_start',{index,content_block:{type:'tool_use',id:c.id,name:c.name,input:{}}});event('content_block_delta',{index,delta:{type:'input_json_delta',partial_json:c.arguments_json}});event('content_block_stop',{index});index++;}
    event('message_delta',{delta:{stop_reason:next.calls.length?'tool_use':'end_turn'},usage:{output_tokens:10}});event('message_stop',{});res.end();
   }else{
    res.writeHead(200,{'content-type':'text/event-stream'});
    if(next.text)res.write('data: '+JSON.stringify({choices:[{delta:{content:next.text}}]})+'\n\n');
    next.calls.forEach((c,index)=>res.write('data: '+JSON.stringify({choices:[{delta:{tool_calls:[{index,id:c.id,type:'function',function:{name:c.name,arguments:c.arguments_json}}]}}]})+'\n\n'));
    res.end('data: '+JSON.stringify({choices:[{delta:{},finish_reason:next.calls.length?'tool_calls':'stop'}]})+'\n\ndata: [DONE]\n\n');
   }
  });
 });
 await new Promise(r=>upstream.listen(0,'127.0.0.1',r));
 const config=path.join(temp,'bridge/config');fs.mkdirSync(config,{recursive:true});
 fs.writeFileSync(path.join(config,'providers.json'),JSON.stringify({providers:['openai','anthropic'].map(protocol=>({id:protocol,baseUrl:`http://127.0.0.1:${upstream.address().port}/v1`,apiKey:'test-only-not-a-real-key',protocol}))}));
 fs.writeFileSync(path.join(config,'localBindings.json'),JSON.stringify({enabled:true,unboundPolicy:'passthrough',bindings:{'gpt-6-sol-medium':{providerId:'openai',modelId:'gpt-6-sol'},'claude-opus-5-5-medium':{providerId:'anthropic',modelId:'claude-opus-5-5'}}}));
 const evidence=[];
 try{
  for(const uid of ['gpt-6-sol-medium','claude-opus-5-5-medium']){
   async function run(name,output,response,priorTodos){
    next=response;
    const proxy=new mod.ConnectLoggerProxy({onLog:()=>{},logPath:path.join(temp,name+'-'+uid+'.log'),statusPath:path.join(temp,name+'-'+uid+'.json')});
    const turns=[{messageId:name+'-user-'+uid,source:mod.SOURCE.USER,prompt:'完成浏览器验收。'},
     {messageId:name+'-exec-'+uid,source:mod.SOURCE.SYSTEM,toolCalls:[{id:'check-'+name+'-'+uid,name:'exec',arguments_json:'{"command":"npm run test:browser"}'}]},
     {messageId:name+'-result-'+uid,source:mod.SOURCE.TOOL,toolCallId:'check-'+name+'-'+uid,prompt:output}];
    if(priorTodos)turns.push({messageId:name+'-todos-'+uid,source:mod.SOURCE.SYSTEM,toolCalls:[todo('prior-'+name+'-'+uid)]},
      {messageId:name+'-updated-'+uid,source:mod.SOURCE.TOOL,toolCallId:'prior-'+name+'-'+uid,prompt:'Todos updated'});
    const body=mod.buildGetChatMessageBody({modelUid:uid,turns,tools:[{name:'todo_write',input_schema:{type:'object'}},{name:'exec',input_schema:{type:'object',properties:{command:{type:'string'}}}},{name:'edit',input_schema:{type:'object'}}]});
    const parsed=mod.parseGetChatMessageRequest(body,{});assert.equal(parsed.ok,true);assert(parsed.messages.some(m=>m.role==='tool'),'real result must survive request decoding');
    const client=new Response();assert.equal(await proxy._tryByokOnChat(client,body,{},'/exa.api_server_pb.ApiServerService/GetChatMessage'),true);
    assert.equal(client.status,200);assert.equal(client.writableEnded,true);
    return mod.parseSyntheticAssistantText(Buffer.concat(client.chunks));
   }
   const failed=await run('failed','1 failed\nEACCES\nExit code: 1',{calls:[{id:'kill',name:'exec',arguments_json:'{"command":"Get-Process chrome | Stop-Process -Force"}'},todo()]});
   assert(failed.toolCalls.length>0);assert(!failed.toolCalls.some(c=>c.name==='exec'),'unsafe exec must never appear in any delivered frame');
   for(const c of failed.toolCalls){const rows=JSON.parse(c.arguments_json).todos;assert.equal(rows[0].status,'completed');assert.equal(rows[1].status,'pending');}
   assert.match(failed.text,/已阻止/);assert.match(failed.text,/未验收/);evidence.push({uid,case:'failed browser and broad process termination',pass:true});
   const passed=await run('passed','2 passed\nExit code: 0',{calls:[todo('passed-todo')]});
   assert(passed.toolCalls.length>0);assert(passed.toolCalls.every(c=>JSON.parse(c.arguments_json).todos[1].status==='completed'));evidence.push({uid,case:'matching passing browser tests',pass:true});
   const changed=await run('changed','2 passed\nExit code: 0',{calls:[todo('changed-todo'),{id:'edit',name:'edit',arguments_json:'{"file_path":"src/stock.ts"}'}]});
   assert(changed.toolCalls.filter(c=>c.name==='todo_write').every(c=>JSON.parse(c.arguments_json).todos[1].status==='pending'));evidence.push({uid,case:'same-response source edit invalidates pass',pass:true});
   const final=await run('final','1 failed\nExit code: 1',{calls:[],text:'所有验收均已完成。'},true);
   assert.match(final.text,/验收尚未全部通过/);evidence.push({uid,case:'final prose claim visibly corrected',pass:true});
   const xml=await run('xml','1 failed\nExit code: 1',{calls:[],text:'<invoke name="exec"><parameter name="command">Stop-Process -Name chrome</parameter></invoke>'});
   assert(!xml.toolCalls.length);assert.match(xml.text,/已阻止/);evidence.push({uid,case:'text-recovered process command blocked',pass:true});
   delete process.env.BYOK_LOCAL_ACCEPTANCE_GUARD;delete process.env.BYOK_LOCAL_PROCESS_GUARD;
   const native=await run('native-default','1 failed\nExit code: 1',{calls:[{id:'native-exec',name:'exec',arguments_json:'{"command":"Get-Process chrome | Stop-Process -Force"}'},todo('native-todo')]});
   assert(native.toolCalls.some(c=>c.name==='exec'),'native tool calls remain available by default');
   assert.equal(JSON.parse(native.toolCalls.find(c=>c.name==='todo_write').arguments_json).todos[1].status,'completed','native todo status is not rewritten by default');
   assert.doesNotMatch(native.text,/BYOK 验收与执行检查/);evidence.push({uid,case:'native default preserves tools and todos',pass:true});
   process.env.BYOK_LOCAL_ACCEPTANCE_GUARD='on';process.env.BYOK_LOCAL_PROCESS_GUARD='on';
  }
  console.log('ACCEPTANCE_TRANSPORT_OK cases='+evidence.length+' protocols=openai,anthropic');
 }finally{upstream.closeAllConnections();await new Promise(r=>upstream.close(r));fs.writeFileSync(path.join(temp,'results.json'),JSON.stringify(evidence,null,2));}
}
main().catch(e=>{console.error(e.stack);process.exitCode=1;});
