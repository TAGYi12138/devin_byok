'use strict';

// Command-result evidence is deliberately separate from a model's todo status.
// This is a conservative transport safeguard, not a sandbox or a proof that
// a passing test suite covers the user's entire specification.
const { createHash } = require('node:crypto');
const hash = value => createHash('sha256').update(String(value)).digest('hex');
function text(value) {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(x => text(x?.text ?? x?.content ?? '')).join('\n');
  return '';
}
function args(call) {
  const value = call.arguments_json ?? call.arguments ?? call.input ?? call.function?.arguments;
  if (value && typeof value === 'object') return value;
  try { return JSON.parse(value || '{}'); } catch { return {}; }
}
function calls(message) {
  return [...(message.tool_calls || []).map(c => ({ ...c, name:c.function?.name || c.name, arguments:c.function?.arguments ?? c.arguments })),
    ...(Array.isArray(message.content) ? message.content.filter(c => c.type === 'tool_use').map(c => ({id:c.id,name:c.name,input:c.input})) : [])];
}
function createState() {
  return { events:new Set(), users:new Set(), evidence:new Map(), shells:new Map(), todos:[], revision:0, blockedTodos:new Set() };
}
function invalidate(state) { state.revision+=1;state.evidence.clear();state.blockedTodos?.clear(); }
function categories(label) {
  const stagePrefix=/^(?:第[一二三四五六七八九十百\d]+阶段|阶段[一二三四五六七八九十百\d]+|phase\s*\d+)\s*[:：-]\s*/i;
  const task=String(label).trim().replace(stagePrefix,'');
  // Reading a project's test conventions is discovery, not evidence that tests ran.
  // Treat ambiguous inspection steps as non-verification unless they explicitly
  // ask to execute checks or assess their results.
  const exploresTask=/^(?:检查|查看|阅读|梳理|了解|分析|调查|盘点|熟悉|研究|inspect\b|review\b|read\b|explore\b|analyze\b|understand\b)/i.test(task);
  const checksResult=/(?:运行|执行).{0,16}(?:测试|检查|验收|验证)|(?:测试|检查|验收|验证).{0,12}(?:结果|通过|失败|完成)|\b(?:run|execute|pass|validate|verify)\b/i.test(task);
  if(exploresTask&&!checksResult) return [];
  const implementsTask=/^(?:创建|新建|搭建|编写|实现|开发|添加|新增|配置|准备|生成|设计|修复|制作|扩展|补充|完善|改造|重构|升级|接入|集成|迁移|优化|记录|汇总|整理|撰写|总结|报告|移除|删除|清理|恢复|create\b|add\b|write\b|implement\b|develop\b|configure\b|prepare\b|extend\b|expand\b|supplement\b|improve\b|refactor\b|upgrade\b|integrate\b|migrate\b|optimize\b|record\b|summarize\b|document\b|report\b|remove\b|clean\b|restore\b)/i.test(task);
  const alsoVerifies=/(?:并|且|再|随后|然后|后|同时|以及|and\b|then\b).{0,32}(?:运行|执行|验证|验收|检查|核对|通过(?:测试|检查|验收)|完成.{0,12}验收|run\b|execute\b|verify\b|validate\b|check\b|pass\b)/i.test(task);
  if (implementsTask&&!alsoVerifies) return [];
  if (stagePrefix.test(label)&&!/验收|测试|验证|检查|构建|打包|test|verif|check|build/i.test(task)) return [];
  const out=[];
  if (/browser|playwright|e2e|浏览器|页面.*验收|控制台/i.test(task)) out.push('browser');
  if (/rollback|atomic|transaction|回滚|原子性|事务/i.test(task)) out.push('transaction');
  if (/persist|restart|持久化|重启/i.test(task)) out.push('persistence');
  if (/build|构建|打包/i.test(task)) out.push('build');
  if (/type.?check|tsc|类型检查/i.test(task)) out.push('types');
  if (/lint|静态检查/i.test(task)) out.push('lint');
  if (!out.length && /test|验收|测试|验证|verify|verification/i.test(task)) out.push('tests');
  return out;
}
function commandCategories(command) {
  const out=[];
  if (/playwright|test[:\-]browser|test[:\-]e2e|test.*browser|\be2e\b/i.test(command)) out.push('browser');
  if (/\b(?:test|pytest|vitest|jest|mocha)\b|(?:test|spec)[\w.\-]*\.(?:c?js|mjs|ts|py)\b/i.test(command)) out.push('tests');
  if (/\bbuild\b|\btsc\b/i.test(command)) out.push('build');
  if (/type.?check|\btsc\b[^\n]*--noEmit/i.test(command)) out.push('types');
  if (/\blint\b|\beslint\b/i.test(command)) out.push('lint');
  return [...new Set(out)];
}
function outcome(output, isError=false) {
  const exitMatches=[...output.matchAll(/\bexit(?:\s+code|_code)?\s*[:=]?\s*(-?\d+)\b/ig)];
  const exit=exitMatches.length ? Number(exitMatches.at(-1)[1]) : null;
  const failed=isError || (exit != null && exit !== 0) || /(?:#\s*fail\s+[1-9]\d*\b|\b[1-9]\d*\s+(?:failed|failing)\b|\bfailures?\s*:\s*[1-9]\d*|EACCES|EADDRINUSE|ERR_TEST_FAILURE|no tests? (?:found|ran)|\b(?:tests?|pass)\s*[:=]?\s*0\b|\b0\s+(?:tests?|passed)\b)/i.test(output);
  const pending=/command running in background|still running|No output yet|Stopped waiting for output/i.test(output) && exit == null;
  const counts=[...output.matchAll(/(?:\b(\d+)\s+passed\b|#\s*pass\s+(\d+)\b|\bpassed\s*:\s*(\d+)\b)/ig)].map(m=>Number(m[1]||m[2]||m[3]));
  return { status:failed?'failed':pending?'running':exit===0?'passed':'unknown', passedTests:Math.max(0,...counts) };
}
function observe(messages, state=createState()) {
  const items=Array.isArray(messages)?messages:[];
  for (let i=0;i<items.length;i++) {
    const m=items[i];
    const isResult=m.role==='tool'||m.tool_call_id||(Array.isArray(m.content)&&m.content.some(b=>b.type==='tool_result'));
    if (m.role==='user'&&!isResult) {
      const userText=text(m.content), key=hash(userText);
      if (!state.users.has(key)) {
        state.users.add(key);
        if (/取消(?:之前|原来|当前)?的?(?:任务|计划)|换个任务|新任务[:：]|cancel the (?:previous|current) task|new task:/i.test(userText)) {
          invalidate(state);state.shells.clear();state.todos=[];
        }
      }
    }
    for (const call of calls(m)) {
      if (!call.id) continue;
      const results=[];
      for (let j=i+1;j<items.length;j++) {
        const next=items[j];
        if (next.role==='user'&&!next.tool_call_id&&!(Array.isArray(next.content)&&next.content.some(b=>b.type==='tool_result'))) break;
        if(next.tool_call_id===call.id) results.push({text:text(next.content),error:next.is_error===true});
        for(const b of Array.isArray(next.content)?next.content:[]) if(b.tool_use_id===call.id) results.push({text:text(b.content),error:b.is_error===true});
      }
      if(!results.length) continue;
      const output=results.map(r=>r.text).join('\n');
      const key=call.id+'|'+hash(output+results.some(r=>r.error));
      if(state.events.has(key)) continue;
      state.events.add(key);
      const a=args(call), name=String(call.name||'').toLowerCase();
      if(/^(todo_write|update_plan|update_todo_list|update_tasks)$/.test(name)) {
        const rows=a.todos??a.plan??a.steps??a.tasks;
        if(Array.isArray(rows)&&outcome(output,results.some(r=>r.error)).status!=='failed') state.todos=rows.map(r=>({...r}));
        continue;
      }
      const command=String(a.command??a.cmd??a.script??'');
      const run=/^(exec|exec_command|run|run_command|execute|terminal|command|shell|bash|powershell)$/.test(name);
      const poll=/^(get_output|read_process_output|write_to_process)$/.test(name);
      const result=outcome(output,results.some(r=>r.error));
      if(changesProject(call)&&result.status!=='failed'&&result.status!=='running') {
        invalidate(state);
      }
      let context=run?{command,categories:commandCategories(command),callId:call.id,revision:state.revision}:poll?state.shells.get(String(a.shell_id??a.process_id??'')):null;
      if(!context?.categories.length) continue;
      if(context.revision!==state.revision) continue;
      const shell=(output.match(/(?:background with ID|shell(?:_id)?)\s*[:=]?\s*([\w-]+)/i)||[])[1];
      if(shell&&result.status==='running') state.shells.set(shell,context);
      if(result.status==='running') {
        for(const category of context.categories) state.evidence.set(category,{status:'running',callId:call.id});
        continue;
      }
      if(result.status==='unknown') continue;
      const observed=[...context.categories];
      // Specialized checks need named evidence; a generic green suite does
      // not prove fault injection or an actual server restart happened.
      if(context.categories.includes('tests')&&result.passedTests>0) {
        if(/rollback|fault.inject|回滚|故障注入/i.test(output)) observed.push('transaction');
        if(/restart|persist.*(?:disk|reopen)|重启|持久化/i.test(output)) observed.push('persistence');
      }
      for(const category of observed) {
        const testsRequired=['tests','browser','transaction','persistence'].includes(category);
        state.evidence.set(category,{status:result.status==='passed'&&(!testsRequired||result.passedTests>0)?'passed':result.status==='failed'?'failed':'unverified',callId:call.id});
      }
    }
  }
  while(state.events.size>512) state.events.delete(state.events.values().next().value);
  while(state.users.size>128) state.users.delete(state.users.values().next().value);
  while(state.shells.size>64) state.shells.delete(state.shells.keys().next().value);
  return state;
}
function label(row) { return String(row.content??row.step??row.title??row.task??row.description??''); }
function missing(row,state) { return categories(label(row)).filter(c=>state.evidence.get(c)?.status!=='passed'); }
function blockedTodoKey(rows,state) {
  return hash(JSON.stringify(rows)+'|'+state.revision+'|'+JSON.stringify([...state.evidence]));
}
function continuationHint(state) {
  if(!state?.blockedTodos?.size) return '';
  const open=state.todos.filter(row=>row.status!=='completed').length;
  if(!open) return '';
  return '[BYOK acceptance follow-through]\nA previous todo completion was changed to pending because matching verification evidence is missing. Do not repeat an unchanged todo_write. Continue the user-requested sequence, including any remaining cleanup or restore step, then run the required checks before updating verification todos. There are '+open+' open steps in the existing todo list. If a step cannot be completed, report the blocker and actual status.';
}
function unsafeProcessCommand(call) {
  if(!/^(exec|exec_command|run|run_command|execute|terminal|command|shell|bash|powershell)$/i.test(call.name||call.function?.name||'')) return false;
  const a=args(call), command=String(a.command??a.cmd??a.script??'');
  return /\b(?:Stop-Process|taskkill|pkill|killall)\b|(?:^|[\s;|&])kill(?:\s+-\w+)?\s+|\b(?:os|process)\s*\.\s*kill\s*\(/i.test(command);
}
function changesProject(call) {
  if (/^(edit|multi_edit|write|write_to_file|apply_patch|patch_file|create_file|replace_file)$/i.test(call.name||call.function?.name||'')) {
    const a=args(call), target=String(a.file_path??a.filePath??a.path??a.file??a.filename??'').replace(/\\/g,'/');
    if(/(?:^|\/)(?:plan|todos?|tasks?|roadmap)(?:[._-][^/]*)?\.md$/i.test(target)||/\.(?:log|png|jpe?g|webp)$/i.test(target)) return false;
    return true;
  }
  if (!/^(exec|exec_command|run|run_command|execute|terminal|command|shell|bash|powershell)$/i.test(call.name||call.function?.name||'')) return false;
  const a=args(call);
  return /set-content|out-file|apply_patch|writeFile|\.write_text\(|\bnpm\s+(?:install|ci)\b/i.test(String(a.command??a.cmd??a.script??''));
}
function createResponseGuard(state,{acceptance=true,processSafety=true,onEvent=()=>{}}={}) {
  const cache=new Map(), notices=new Set();
  let repeatSuppressed=false;
  function filter(call) {
    const key=String(call.id||'')+'|'+hash(JSON.stringify(call));
    if(cache.has(key)) return cache.get(key);
    if(processSafety&&unsafeProcessCommand(call)) {
      notices.add('已阻止通过通用终端工具终止进程的命令。请使用本任务的 kill_shell 工具停止所属终端，或由用户确认目标进程后操作。');
      onEvent({kind:'process-blocked',id:call.id,name:call.name});cache.set(key,null);return null;
    }
    const a=args(call), field=['todos','plan','steps','tasks'].find(k=>Array.isArray(a[k]));
    const todo=/^(todo_write|update_plan|update_todo_list|update_tasks)$/i.test(call.name||call.function?.name||'');
    let guarded=call;
    if(acceptance&&todo&&field) {
      let changed=false;
      const rows=a[field].map(row=>{
        if(row?.status==='completed'&&missing(row,state).length) {
          changed=true;onEvent({kind:'acceptance-pending',id:call.id,categories:missing(row,state)});
          return {...row,status:'pending'};
        }
        return {...row};
      });
      state.todos=rows;
      if(changed) {
        const blocked=state.blockedTodos ||= new Set();
        const fingerprint=blockedTodoKey(rows,state);
        if(blocked.has(fingerprint)) {
          repeatSuppressed=true;
          notices.add('相同的验收完成申请已被拦截，且没有新的通过证据；已停止重复待办调用。');
          onEvent({kind:'acceptance-repeat-suppressed',id:call.id,name:call.name});
          cache.set(key,null);return null;
        }
        blocked.add(fingerprint);
        while(blocked.size>64) blocked.delete(blocked.values().next().value);
        const json=JSON.stringify({...a,[field]:rows});
        guarded=call.function?{...call,function:{...call.function,arguments:json}}:
          Object.hasOwn(call,'arguments_json')?{...call,arguments_json:json}:
          Object.hasOwn(call,'input')?{...call,input:{...a,[field]:rows}}:{...call,arguments:json};
        notices.add('缺少对应通过证据的验收待办已保留为 pending（未验收）；构建或 API 测试不能替代浏览器验收。');
      }
    }
    cache.set(key,guarded);return guarded;
  }
  return {
    filter,
    // Defer todos until the whole turn is known: an edit later in the same
    // turn invalidates the evidence even when the todo call came first.
    shouldDefer:call=>acceptance&&/^(todo_write|update_plan|update_todo_list|update_tasks)$/i.test(call.name||call.function?.name||''),
    finish(tools=[]) {
      if(acceptance&&tools.some(changesProject)) {
        invalidate(state);
        for(const call of tools) if(/^(todo_write|update_plan|update_todo_list|update_tasks)$/i.test(call.name||call.function?.name||'')) cache.delete(String(call.id||'')+'|'+hash(JSON.stringify(call)));
      }
      return tools.map(filter).filter(Boolean);
    },
    notice(final=false) {
      if(final&&repeatSuppressed) {
        const statuses={completed:'已完成',in_progress:'进行中',pending:'待处理',blocked:'受阻'};
        const rows=state.todos.map((row,index)=>`${index+1}. ${label(row).replace(/\s+/g,' ').slice(0,120)}：${statuses[row.status]||String(row.status||'未知')}`);
        if(rows.length) notices.add('当前待办状态：\n'+rows.join('\n'));
        const names={browser:'浏览器测试',tests:'测试',transaction:'事务检查',persistence:'持久化检查',build:'构建',types:'类型检查',lint:'静态检查'};
        const states={passed:'通过',failed:'失败',running:'运行中',unverified:'未验证'};
        const evidence=[...state.evidence].map(([name,result])=>`${names[name]||name}：${states[result.status]||'未知'}`);
        if(evidence.length) notices.add('最近验证结果：'+evidence.join('；'));
      }
      if(acceptance&&final&&state.todos.some(row=>categories(label(row)).length&&(row.status!=='completed'||missing(row,state).length))) notices.add('验收尚未全部通过，请依据实际证据查看剩余待办与阻塞项。');
      return notices.size?'\n\n[BYOK 验收与执行检查]\n'+[...notices].join('\n'):'';
    }
  };
}
module.exports={createState,observe,categories,outcome,unsafeProcessCommand,createResponseGuard,continuationHint};
