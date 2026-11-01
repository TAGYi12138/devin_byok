'use strict';
const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path'),{DatabaseSync}=require('node:sqlite');
const identity=require('../server/session-identity.cjs'),{transportEdit}=require('../native-prompt-preflight.cjs');
async function transport(editor, actualReplacement){
 const events=[],writes=new Map(),window={__byokPickerWrites:writes};let unblock;writes.set('acp/devin-cli/new-session',new Promise(r=>unblock=r));
 const edit=transportEdit(editor),actual=actualReplacement&&/return ([\w$]+)\.dispatch\(([\w$]+)\(([\w$]+),([\w$]+),([\w$]+),\{optimisticMessageSender:([\w$]+)/.exec(actualReplacement),names=actual?[actual[3],actual[4],actual[5],actual[6],actual[1],actual[2]]:editor?['e','i','r','n','tlc','e5q']:['m','g','u','s','ol','OI'];
 const context={window,AbortController,setTimeout,clearTimeout,fetch:async(_url,options)=>{events.push(JSON.parse(options.body));return {ok:true,json:async()=>({ok:true})};}};
 const fn=vm.runInNewContext('(async function('+names.join(',')+'){'+(actualReplacement||edit.replacement)+'})',context);
 const state={dispatch(v){events.push('native-send');return v;}},thunk=()=> 'sent';
 const pending=fn('devin-cli',{method:'session/prompt',params:{sessionId:'new-session',prompt:[{type:'text',text:'first message'}]}},()=>{},'',state,thunk);
 await Promise.resolve();assert.equal(events.length,0,'native request waits for the picker write');unblock({ok:true});assert.equal(await pending,'sent');assert.equal(events[0].sessionId,'acp/devin-cli/new-session');assert.equal(events[0].src,'acp-transport');assert.equal(events[1],'native-send');
 events.length=0;await fn('other-agent',{method:'session/prompt',params:{sessionId:'other',prompt:[]}},()=>{},'',state,thunk);assert.deepEqual(events,['native-send']);
 events.length=0;writes.set('acp/devin-cli/new-session',Promise.resolve({ok:false}));await assert.rejects(fn('devin-cli',{method:'session/prompt',params:{sessionId:'new-session',prompt:[]}},()=>{},'',state,thunk),/模型选择保存失败/);assert.equal(events.length,0);
 context.fetch=async()=>({ok:false,json:async()=>({ok:false})});writes.clear();await assert.rejects(fn('devin-cli',{method:'session/prompt',params:{sessionId:'new-session',prompt:[]}},()=>{},'',state,thunk),/模型会话关联失败/);assert.equal(events.length,0);
}
function database(){
 const db=new DatabaseSync(':memory:'),now=Date.now();
 db.exec('CREATE TABLE sessions(id TEXT PRIMARY KEY,main_chain_id INTEGER,last_activity_at INTEGER); CREATE TABLE message_nodes(session_id TEXT,node_id INTEGER,parent_node_id INTEGER,chat_message TEXT,created_at INTEGER)');
 const add=(id,text,at=now)=>{db.prepare('INSERT INTO sessions VALUES(?,?,?)').run(id,2,at);db.prepare('INSERT INTO message_nodes VALUES(?,?,?,?,?)').run(id,1,null,JSON.stringify({role:'user',content:text}),at);db.prepare('INSERT INTO message_nodes VALUES(?,?,?,?,?)').run(id,2,1,JSON.stringify({role:'assistant',content:'response'}),at);};
 try{
  add('one','unique question');let match=identity.resolveSessionFromPromptHistory('unique   question',{database:db,now});assert.equal(match.match,'db-prompt-exact');assert.equal(match.sessionId,'one');
  add('unselected-session','unique question');assert.equal(identity.resolveSessionFromPromptHistory('unique question',{database:db,now}).match,'db-prompt-ambiguous','unselected sessions also prevent borrowing a model');
  db.prepare('DELETE FROM sessions WHERE id=?').run('unselected-session');
  db.prepare('INSERT INTO message_nodes VALUES(?,?,?,?,?)').run('one',3,null,JSON.stringify({role:'user',content:'abandoned branch'}),now);assert.equal(identity.resolveSessionFromPromptHistory('abandoned branch',{database:db,now}).match,'db-prompt-miss');
  db.prepare('UPDATE message_nodes SET chat_message=? WHERE session_id=? AND node_id=1').run(JSON.stringify({role:'user',content:'old question'}),'one');db.prepare('INSERT INTO message_nodes VALUES(?,?,?,?,?)').run('one',4,2,JSON.stringify({role:'user',content:[{type:'text',text:'latest question'}]}),now);db.prepare('UPDATE sessions SET main_chain_id=4 WHERE id=?').run('one');
  assert.equal(identity.resolveSessionFromPromptHistory('old question',{database:db,now}).match,'db-prompt-miss');assert.equal(identity.resolveSessionFromPromptHistory('latest question',{database:db,now}).sessionId,'one');assert.equal(identity.resolveSessionFromPromptHistory('latest question',{database:db,now:now+180000}).match,'db-prompt-miss');
  add('seconds','seconds timestamp',Math.floor(now/1000));assert.equal(identity.resolveSessionFromPromptHistory('seconds timestamp',{database:db,now}).sessionId,'seconds');
 }finally{db.close();}
 const previous=process.env.BYOK_LOCAL_SESSIONS_DB;delete process.env.BYOK_LOCAL_SESSIONS_DB;
 try{assert(identity.sessionDbPaths({extensionRoot:'C:/Users/test/.devin/extensions/bridge/server'})[0].endsWith(path.join('cli','sessions.db')));assert(identity.sessionDbPaths({extensionRoot:'C:/Users/test/.devin-next/extensions/bridge/server'})[0].endsWith(path.join('cli-next','sessions.db')));assert.equal(identity.sessionDbPaths({dbPath:'explicit.db'})[0],'explicit.db');}finally{if(previous!==undefined)process.env.BYOK_LOCAL_SESSIONS_DB=previous;}
}
(async()=>{database();await transport(false);await transport(true);for(const file of process.argv.slice(2)){const adapter=require('../native-picker-patch.cjs'),source=adapter.patchNativePicker(fs.readFileSync(file,'utf8')).code,match=/\/\*[^*]+:prompt-transport:start\*\/([\s\S]*?)\/\*[^*]+:prompt-transport:end\*\//.exec(source);assert(match,'actual native transport boundary patched');await transport(file.includes('windsurf-chat-client'),match[1]);}console.log('MANAGED_SESSION_ROUTING_OK profile=stable+next prompt=unique+ambiguous+active-chain transport=all-paths+ordered+fail-closed actualHosts='+process.argv.slice(2).length);})().catch(e=>{console.error(e);process.exitCode=1;});
