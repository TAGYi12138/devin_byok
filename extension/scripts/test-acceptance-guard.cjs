'use strict';
const assert=require('node:assert/strict');
const guard=require('../server/acceptance-guard.cjs');
const call=(id,name,a)=>({id,name,arguments_json:JSON.stringify(a)});
const history=(id,command,output)=>[
 {role:'assistant',tool_calls:[{id,function:{name:'exec',arguments:JSON.stringify({command})}}]},
 {role:'tool',tool_call_id:id,content:output}
];
const completed=content=>({content,status:'completed'});
function update(state,rows,options){
 const response=guard.createResponseGuard(state,options);
 const c=call('todo','todo_write',{todos:rows,extra:'preserved'});
 const filtered=response.filter(c);
 assert.deepEqual(response.finish([c]),[filtered],'stream and final arguments agree');
 assert.equal(c.arguments_json,JSON.stringify({todos:rows,extra:'preserved'}),'upstream arguments are not mutated');
 assert.equal(filtered.id,c.id,'tool/result identity is preserved');
 assert.equal(JSON.parse(filtered.arguments_json).extra,'preserved');
 return {rows:JSON.parse(filtered.arguments_json).todos,response};
}
let checks=0;
function test(name,fn){fn();checks++;console.log('PASS '+name);}
test('unverified acceptance stays pending while ordinary implementation is unchanged',()=>{
 const r=update(guard.createState(),[completed('实现库存事务存储'),completed('浏览器验收'),completed('事务故障回滚测试')]);
 assert.deepEqual(r.rows.map(x=>x.status),['completed','pending','pending']);
 assert.match(r.response.notice(),/缺少对应通过证据/);
});
test('creating browser tests is implementation; explicitly running or accepting them is verification',()=>{
 const s=guard.createState();
 const rows=[
  completed('创建最小页面、故障开关和两条 Playwright 浏览器测试'),
  completed('编写浏览器测试脚本'),
  completed('阶段三：扩展页面表单、余额、错误提示和持久化记录'),
  completed('阶段四：补充成功刷新与库存不足浏览器测试，保留原有测试'),
  completed('第四阶段：跨仓调拨 - 调拨单和事务完整性'),
  completed('扩展页面并验证刷新持久化'),
  completed('创建页面并运行浏览器测试'),
  completed('浏览器验收通过'),
  completed('第七阶段：综合测试 - 单元、集成、浏览器端到端测试')
 ];
 assert.deepEqual(update(s,rows).rows.map(x=>x.status),['completed','completed','completed','completed','completed','pending','pending','pending','pending']);
});
test('exploring test conventions does not block a long task before implementation',()=>{
 const s=guard.createState();
 const rows=[completed('检查现有代码、存储结构与测试约定'),{content:'实现离线履约、库存预留与释放',status:'in_progress'},
  {content:'补充逻辑及浏览器测试并运行全部指定验证',status:'pending'}];
 assert.deepEqual(guard.categories(rows[0].content),[]);
 assert.deepEqual(guard.categories('阶段一：检查当前测试约定'),[]);
 assert.deepEqual(guard.categories('Review existing tests and project conventions'),[]);
 assert.deepEqual(guard.categories('检查测试结果'),['tests']);
 const first=guard.createResponseGuard(s).filter(call('first','todo_write',{todos:rows}));
 assert.equal(JSON.parse(first.arguments_json).todos[0].status,'completed');
 const second=guard.createResponseGuard(s).filter(call('second','todo_write',{todos:rows}));
 assert.equal(JSON.parse(second.arguments_json).todos[1].status,'in_progress');
 assert.equal(s.blockedTodos.size,0);
});
test('repeat blocked todo updates stop until verification evidence changes',()=>{
 const s=guard.observe(history('failed','npx playwright test --workers=1','1 failed\n1 passed\nExit code: 1'));
 const rows=[completed('创建最小页面、故障开关和两条 Playwright 浏览器测试'),completed('浏览器验收通过')];
 const first=guard.createResponseGuard(s).filter(call('first','todo_write',{todos:rows}));
 assert.deepEqual(JSON.parse(first.arguments_json).todos.map(x=>x.status),['completed','pending']);
 const repeat=guard.createResponseGuard(s),second=call('second','todo_write',{todos:rows});
 assert.equal(repeat.filter(second),null);
 assert.deepEqual(repeat.finish([second]),[]);
 assert.match(repeat.notice(true),/停止重复待办调用/);
 assert.match(repeat.notice(true),/创建最小页面、故障开关和两条 Playwright 浏览器测试：已完成/);
 assert.match(repeat.notice(true),/浏览器验收通过：待处理/);
 assert.match(repeat.notice(true),/浏览器测试：失败/);
 guard.observe(history('passed','npx playwright test --workers=1','2 passed\nExit code: 0'),s);
 const after=guard.createResponseGuard(s).filter(call('third','todo_write',{todos:rows}));
 assert.equal(JSON.parse(after.arguments_json).todos[1].status,'completed');
 guard.observe(history('failed-again','npx playwright test --workers=1','1 failed\n1 passed\nExit code: 1'),s);
 const blockedAgain=guard.createResponseGuard(s).filter(call('fourth','todo_write',{todos:rows}));
 assert.equal(JSON.parse(blockedAgain.arguments_json).todos[1].status,'pending');
});
test('recorded results stay complete after edits while stale checks and cleanup stay open',()=>{
 const s=guard.observe(history('baseline','npx playwright test','4 passed\nExit code: 0'));
 guard.observe([{role:'assistant',tool_calls:[{id:'probe-edit',function:{name:'edit',arguments:JSON.stringify({file_path:'inventory.js'})}}]},
  {role:'tool',tool_call_id:'probe-edit',content:'Successfully edited file'}],s);
 const rows=[completed('记录 inventory.js 哈希及首次验证结果'),completed('逻辑测试通过'),completed('浏览器验收通过'),{content:'移除探针、核对哈希并重新验证',status:'pending'}];
 const result=update(s,rows);
 assert.deepEqual(result.rows.map(x=>x.status),['completed','pending','pending','pending']);
 assert.match(guard.continuationHint(s),/open steps in the existing todo list/);
 assert.match(guard.continuationHint(s),/Do not repeat an unchanged todo_write/);
 guard.observe(history('rerun','npx playwright test','4 passed\nExit code: 0'),s);
 assert.equal(update(s,[completed('浏览器验收通过')]).rows[0].status,'completed');
});
test('build does not prove browser or transaction acceptance',()=>{
 const s=guard.observe(history('build','npm run build','Build complete\nExit code: 0'));
 assert.deepEqual(update(s,[completed('构建'),completed('浏览器验收'),completed('故障回滚测试')]).rows.map(x=>x.status),['completed','pending','pending']);
});
test('failure survives unrelated successful build',()=>{
 const s=guard.observe([...history('browser','npm run test:browser','1 failed\nEACCES\nExit code: 1'),...history('build','npm run build','Exit code: 0')]);
 assert.equal(update(s,[completed('浏览器验收')]).rows[0].status,'pending');
});
test('zero tests and missing exit status cannot pass acceptance',()=>{
 for(const output of ['# tests 0\n# pass 0\nExit code: 0','No tests found\nExit code: 0','2 passed']) {
  const s=guard.observe(history('zero','npm test',output));
  assert.equal(update(s,[completed('后端测试')]).rows[0].status,'pending');
 }
});
test('a real positive test count and exit zero permit matching checks',()=>{
 const s=guard.observe(history('tests','npm test','# tests 3\n# pass 3\n# fail 0\nExit code: 0'));
 assert.equal(update(s,[completed('后端测试')]).rows[0].status,'completed');
 assert.equal(update(s,[completed('浏览器验收')]).rows[0].status,'pending');
});
test('passing browser test command permits browser acceptance',()=>{
 const s=guard.observe(history('browser','npx playwright test','3 passed (10s)\nExit code: 0'));
 assert.equal(update(s,[completed('浏览器验收')]).rows[0].status,'completed');
});
test('preview URL and successful curl are not browser evidence',()=>{
 const s=guard.observe(history('preview','curl http://localhost:3000','HTTP 200\nExit code: 0'));
 assert.equal(update(s,[completed('浏览器验收')]).rows[0].status,'pending');
});
test('background command waits for correlated final output',()=>{
 const h=history('async','npm run test:browser','No output after 10 seconds. Command running in background with ID: abc-123.');
 const s=guard.observe(h);
 assert.equal(update(s,[completed('浏览器验收')]).rows[0].status,'pending');
 const poll=[{role:'assistant',tool_calls:[{id:'poll',function:{name:'get_output',arguments:JSON.stringify({shell_id:'abc-123'})}}]},
  {role:'tool',tool_call_id:'poll',content:'2 passed\nExit code: 0'}];
 guard.observe([...h,...poll],s);
 assert.equal(update(s,[completed('浏览器验收')]).rows[0].status,'completed');
});
test('source edit invalidates old verification without replay restoring it',()=>{
 const h=history('pass','npm test','2 passed\nExit code: 0');
 const edit=[{role:'assistant',tool_calls:[{id:'edit',function:{name:'edit',arguments:'{"file_path":"src/stock.ts"}'}}]},
  {role:'tool',tool_call_id:'edit',content:'Successfully edited file'}];
 const s=guard.observe([...h,...edit]);guard.observe([...h,...edit],s);
 assert.equal(update(s,[completed('后端测试')]).rows[0].status,'pending');
 guard.observe(history('rerun','npm test','2 passed\nExit code: 0'),s);
 assert.equal(update(s,[completed('后端测试')]).rows[0].status,'completed');
});
test('an edit later in the same response prevents premature completion',()=>{
 const s=guard.observe(history('pass','npm test','2 passed\nExit code: 0'));
 const r=guard.createResponseGuard(s),todo=call('todo','todo_write',{todos:[completed('后端测试')]}),edit=call('edit','edit',{file_path:'src/stock.ts'});
 assert.equal(r.shouldDefer(todo),true);
 assert.equal(r.shouldDefer(edit),false);
 const final=r.finish([todo,edit]);
 assert.equal(JSON.parse(final[0].arguments_json).todos[0].status,'pending');
});
test('plan-only updates do not invalidate passing checks',()=>{
 const s=guard.observe(history('pass','npm test','2 passed\nExit code: 0'));
 const r=guard.createResponseGuard(s),todo=call('todo','todo_write',{todos:[completed('后端测试')]}),plan=call('plan','write',{file_path:'plan.md'});
 assert.equal(JSON.parse(r.finish([todo,plan])[0].arguments_json).todos[0].status,'completed');
});
test('background checks started before an edit cannot certify the edited source',()=>{
 const h=history('async','npm run test:browser','Command running in background with ID: old-check.');
 const s=guard.observe(h);
 guard.observe([{role:'assistant',tool_calls:[{id:'new-edit',function:{name:'edit',arguments:'{"path":"src/stock.ts"}'}}]},
  {role:'tool',tool_call_id:'new-edit',content:'Successfully edited file'}],s);
 guard.observe([{role:'assistant',tool_calls:[{id:'late',function:{name:'get_output',arguments:'{"shell_id":"old-check"}'}}]},
  {role:'tool',tool_call_id:'late',content:'2 passed\nExit code: 0'}],s);
 assert.equal(update(s,[completed('浏览器验收')]).rows[0].status,'pending');
});
test('named rollback and restart checks are required',()=>{
 const s=guard.observe(history('generic','npm test','2 passed\nExit code: 0'));
 assert.equal(update(s,[completed('事务回滚测试'),completed('重启持久化验收')]).rows[0].status,'pending');
 guard.observe(history('special','npm test','PASS fault injection rollback\nPASS server restart persistence\n2 passed\nExit code: 0'),s);
 assert.deepEqual(update(s,[completed('事务回滚测试'),completed('重启持久化验收')]).rows.map(x=>x.status),['completed','completed']);
});
test('Anthropic tool use and error results follow the same rules',()=>{
 const s=guard.observe([{role:'assistant',content:[{type:'tool_use',id:'a',name:'exec',input:{command:'npm test'}}]},
  {role:'user',content:[{type:'tool_result',tool_use_id:'a',is_error:true,content:'2 passed\nExit code: 0'}]}]);
 assert.equal(update(s,[completed('后端测试')]).rows[0].status,'pending');
});
test('scope replacement clears evidence; continuation retains it',()=>{
 const s=guard.observe(history('passed','npm test','2 passed\nExit code: 0'));
 guard.observe([{role:'user',content:'继续'}],s);assert.equal(s.evidence.get('tests').status,'passed');
 guard.observe([{role:'user',content:'新任务：做另一个项目'}],s);assert.equal(s.evidence.size,0);
});
test('unrelated sessions cannot borrow passing evidence',()=>{
 const a=guard.observe(history('a','npm test','2 passed\nExit code: 0')),b=guard.createState();
 assert.equal(update(a,[completed('测试')]).rows[0].status,'completed');
 assert.equal(update(b,[completed('测试')]).rows[0].status,'pending');
});
test('process termination is removed before streaming and final delivery',()=>{
 for(const command of ['Get-Process chrome | Stop-Process -Force','taskkill /IM chrome.exe /F','pkill chrome','kill -9 123','node -e "process.kill(123)"']) {
  const r=guard.createResponseGuard(guard.createState());const c=call('kill','exec',{command});
  assert.equal(r.filter(c),null);assert.deepEqual(r.finish([c]),[]);assert.match(r.notice(true),/已阻止/);
 }
 const r=guard.createResponseGuard(guard.createState());
 assert.equal(r.filter(call('owned','kill_shell',{shell_id:'owned-shell'})).name,'kill_shell');
 assert.equal(r.filter(call('read','exec',{command:'Get-Process chrome | Select-Object Id'})).name,'exec');
});
test('partial todo lists, final warning, and explicit diagnostic opt-out',()=>{
 const s=guard.createState(),r=guard.createResponseGuard(s);
 r.filter(call('open','todo_write',{todos:[{content:'浏览器验收',status:'in_progress'}]}));
 assert.match(r.notice(true),/验收尚未全部通过/);
 assert.equal(update(s,[completed('浏览器验收')],{acceptance:false}).rows[0].status,'completed');
 const native=guard.createResponseGuard(s,{processSafety:false});
 assert.equal(native.filter(call('kill','exec',{command:'Stop-Process -Id 123'})).name,'exec');
});
console.log('ACCEPTANCE_GUARD_OK checks='+checks);
