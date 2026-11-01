'use strict';

// Verified common ACP transport boundary in stable/Next 3.11 Sessions and Editor.
// New-session, queued-send and editor-action paths bypass the composer send hook.
function transportEdit(editor, overrides = {}) {
  const p=overrides.p||(editor?'e':'m'), req=overrides.req||(editor?'i':'g'), ready=overrides.ready||(editor?'r':'u'), user=overrides.user||(editor?'n':'s'), state=overrides.state||(editor?'tlc':'ol'), thunk=overrides.thunk||(editor?'e5q':'OI');
  const before=`if(!${ready})throw Error("ACP request API not available");return ${state}.dispatch(${thunk}(${p},${req},${ready},{optimisticMessageSender:${user}?{id:${user}}:{}}))`;
  const preflight=`let __byokParams=${req}&&${req}.method==="session/prompt"?${req}.params:null,__byokSession=String(__byokParams&&__byokParams.sessionId||"");if(__byokParams&&(__byokSession.startsWith("acp/devin-cli/")||String(${p})==="devin-cli"&&__byokSession)){if(!__byokSession.startsWith("acp/"))__byokSession="acp/devin-cli/"+__byokSession;let __byokPending=window.__byokPickerWrites?.get(__byokSession);if(__byokPending&&!(await __byokPending)?.ok)throw Error("模型选择保存失败，请重新选择后发送");let __byokPrompt=__byokParams.prompt,__byokAbort=new AbortController(),__byokDeadline=setTimeout(()=>__byokAbort.abort(),3000);try{let __byokResponse=await fetch("http://127.0.0.1:6778/__byok/prompt-identity",{method:"POST",signal:__byokAbort.signal,cache:"no-store",credentials:"omit",headers:{"content-type":"application/json"},body:JSON.stringify({sessionId:__byokSession,prompt:__byokPrompt,src:"acp-transport"})}),__byokResult=await __byokResponse.json();if(!__byokResponse.ok||!__byokResult||__byokResult.ok!==!0)throw Error("模型会话关联失败，请重新选择模型后发送")}finally{clearTimeout(__byokDeadline)}}`;
  return {name:'prompt-transport',before,replacement:before.replace(';return',';'+preflight+'return')};
}
module.exports={transportEdit};
