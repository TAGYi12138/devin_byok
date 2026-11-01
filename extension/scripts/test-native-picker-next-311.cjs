"use strict";

// Execute the current transform against the installed Sessions/Editor component
// and mirror Devin Local's real lifecycle: model dispatch is client-side until
// the host flushes it before a prompt. The bridge route must be session-scoped
// without waiting for a synthetic immediate provider acknowledgement.
const fs = require("node:fs"), vm = require("node:vm");
const assert = require("node:assert/strict");
const host = process.argv[2] || "D:/Devin Next/resources/app/out/vs/sessions/sessions.desktop.main.js";
const installedSource = fs.readFileSync(host, "utf8");
const descriptor = process.env.BYOK_NATIVE_PICKER_DESCRIPTOR ? JSON.parse(fs.readFileSync(process.env.BYOK_NATIVE_PICKER_DESCRIPTOR,'utf8')) : null;
const adapter = require("../native-picker-patch.cjs");
const clean = adapter.unpatchNativePicker(installedSource).code;
const source = adapter.patchNativePicker(clean).code;
assert.equal(adapter.patchNativePicker(source).changed, false, "repeat install must be idempotent");
assert.equal(adapter.unpatchNativePicker(source).code, clean, "uninstall must restore the exact host bytes");
const stable238 = source.includes('p6s.displayName="AcpModelSelect"') || source.includes('rkU.displayName="AcpModelSelect"');
const stable = stable238 || source.includes('i6s.displayName="AcpModelSelect"') || source.includes('rkd.displayName="AcpModelSelect"');
const editor = descriptor ? descriptor.surface==='editor' : source.includes('rkl.displayName="AcpModelSelect"') || source.includes('rkd.displayName="AcpModelSelect"') || source.includes('rkU.displayName="AcpModelSelect"');
const decoratorCall=descriptor?descriptor.profile.rowExpression:stable238?(editor?'s(n4m(e),e)':'I(t3i(rs),rs)'):editor?(stable?"s(n4l(e),e)":"s(n4o(e),e)"):"I(Lfi(Bo),Bo)";
const brokenCall=descriptor?decoratorCall.replace(','+descriptor.profile.names.qo+')',')'):decoratorCall.replace(",e)",")").replace(",Bo)",")").replace(',rs)',')');
if(!descriptor){
const previousAdapter = source.replace(decoratorCall,brokenCall);
assert.notEqual(previousAdapter,source,"previous faulty recipe must be reconstructed");
assert.equal(adapter.patchNativePicker(previousAdapter).code,source,"previous faulty install must upgrade exactly");
assert.equal(adapter.unpatchNativePicker(previousAdapter).code,clean,"previous faulty install must remain removable");
}
const componentName = descriptor?descriptor.component:stable238?(editor?'rkU':'p6s'):editor ? (stable?"rkd":"rkl") : (stable?"i6s":"t6s");
const start = source.indexOf(componentName + "=(0,"), end = source.indexOf(";function ", start);
assert(start > 0 && end > start, "Current component boundary missing");
const componentSource = "var " + source.slice(start, end) + ";" + componentName;
const correctStart = source.indexOf(descriptor?'function '+descriptor.profile.names.Iot+'(':stable238?(editor?'function rEh(':'function ykt('):editor ? (stable?"function rEu(":"function rEs(") : (stable?"function okt(":"function rkt(")), correctEnd = source.indexOf("function ", correctStart+9);
assert(correctStart > 0 && correctEnd > correctStart, "Current selection correction boundary missing");
if(editor)assert(clean.includes((descriptor?descriptor.profile.names.Wj:stable238?'n1Q':stable?'n1Y':'n1W')+'.typeName="exa.codeium_common_pb.ClientModelConfig"'),"decoder must be the host ClientModelConfig protobuf, not another renamed class");
const old = { modelUid: "swe-1-6-slow", label: "Old default", disabled: false };
const bound = { modelUid: "bound-new", label: "Bound new", disabled: false, modelInfo: { partnerProviders: ["fixture-provider"] } };
const boundB = { modelUid: "bound-b", label: "Bound B", disabled: false };
const official = { modelUid: "unbound-official", label: "Official", disabled: false };

function harness({ online = true, rows = [old, bound, boundB, official], brokenDecorator = false } = {}) {
  const slots = [], effects = [], requests = [], actions = [], timerDelays = [];
  let cursor = 0, session = "session-a", value = old.modelUid, connected = online, catalog = rows;
  const listeners = new Map();
  const browserWindow = {
    addEventListener(name, fn) { if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(fn); },
    removeEventListener(name, fn) { listeners.get(name)?.delete(fn); },
    dispatchEvent(event) { for (const fn of listeners.get(event.type) || []) fn(event); },
  };
  const same = (a, b) => a && b && a.length === b.length && a.every((x, i) => Object.is(x, b[i]));
  function memo(fn, deps) {
    const i = cursor++, prev = slots[i];
    if (!prev || !same(prev.deps, deps)) slots[i] = { value: fn(), deps };
    return slots[i].value;
  }
  const react = {
    memo: fn => fn, useMemo: memo, useCallback: (fn, deps) => memo(() => fn, deps), useRef: initial => memo(() => ({ current: initial }), []),
    useState(initial) {
      const i = cursor++;
      if (!slots[i]) slots[i] = { value: initial };
      return [slots[i].value, next => { slots[i].value = typeof next === "function" ? next(slots[i].value) : next; }];
    },
    useEffect(fn, deps) {
      const i = cursor++, prev = slots[i];
      if (!prev || !same(prev.deps, deps)) effects.push(() => { prev?.cleanup?.(); slots[i] = { deps, cleanup: fn() }; });
    },
  };
  const config = { id: "model", type: "select", category: "model", currentValue: value, options: [{ value: old.modelUid, name: old.label }] };
  const events = { toggleModelSelector: { on: () => () => {} } }, priceChanges = new Set();
  if(descriptor&&Object.values(descriptor.aliases).includes('IZn'))priceChanges.add(bound.modelUid);
  const state = { state: { visibleModelConfigs: [old], modelSorts: [] }, acp: { retiredSessions: {}, pendingSwitchTarget: null } };
  const context = {
    m: react, _: { jsx: (type, props) => ({ type, props }) },
    $s: () => ({ t() {} }), Kl: () => ({ logEvent() {}, userStatus: {},props:{openGenericUrl(){}},refetchUserStatus(){} }), Aw: () => ({ activeSessionId: session }),
    _Lt: () => ({ shortcutEvents: events }), eh: () => ({}), mO: () => () => "", IL: () => ({ data: [], set() {}, isPending: false }),
    LRe: v => v, MRe: v => v, T9e: () => [config], D9e: () => value, PW: () => "devin-cli", $ce: () => true,
    Zr: fn => fn(state), Sa: fn => fn(state), IZn: () => ({ unacknowledgedModelUids: priceChanges }),
    A9e: row => row, dcs: options => new Set(options.map(row => row.value)), b41: options => options.map(row => ({ modelUid: row.value, label: row.name })),
    pns: sorts => sorts, XQn: (uid, list) => [uid, ...list],
    Ws: { getState: () => state, dispatch: action => { actions.push(action); value = action.value; return action; } }, _G: v => v, Yce: v => v,
    dco: () => false, hTt: () => false, O5o() {}, xes: () => [], kes: () => [], Eu: { ToggleModelSelector: "model" },
    T5o: "NativePicker", y41: false, y4n() {}, B8e: () => false,
    Wj: { fromBinary: bytes => JSON.parse(Buffer.from(bytes).toString()) }, Uint8Array, atob, AbortController, window: browserWindow,
    setTimeout: (_fn, delay) => { timerDelays.push(delay); return timerDelays.length; }, clearTimeout() {},
    fetch: async (url, options = {}) => {
      requests.push({ url, body: options.body ? JSON.parse(options.body) : null });
      if (!connected) throw new Error("bridge not started yet");
      if (url.endsWith("/native-model-configs")) return { ok: true, json: async () => ({ ok: true, enabled: true, boundUids: catalog.filter(row => row.modelUid.startsWith("bound-")).map(row => row.modelUid), defaultUid: bound.modelUid, models: catalog.map(row => ({ uid: row.modelUid, protoB64: Buffer.from(JSON.stringify(row)).toString("base64") })) }) };
      if (url.endsWith("/native-picker-event")) return { ok: true, status: 200, json: async () => ({ ok: true }) };
      if (options.body) {
        const body = JSON.parse(options.body);
        if (body.activate) return { ok: true, json: async () => ({ ok: true, uid: bound.modelUid, defaulted: true }) };
        if (body.uid) return { ok: true, json: async () => ({ ok: true, uid: body.uid }) };
        return { ok: true, json: async () => ({ ok: true, cleared: true, official: true }) };
      }
      return { ok: true, json: async () => ({ ok: true, cleared: true }) };
    },
  };
  if(descriptor){
    Object.assign(context,{Remember:()=>({remember(){}}),Metadata:()=>({getMetadata(){return {}}}),OrgSettings:()=>({visible:false}),PartnerProviders:providers=>providers?.length?Array.from(providers):undefined});
    const fixtureRoles={...context};
    for(const [name,role] of Object.entries(descriptor.aliases)){assert(Object.hasOwn(fixtureRoles,role),'Unknown fixture role '+role);context[name]=fixtureRoles[role];}
    if(descriptor.partnerSource)vm.runInNewContext(descriptor.partnerSource,context);
  }else{
  if (editor) {
    const aliases = {tZ:"m",tX:"_",UW:"$s",Pv:"Kl",tCL:"Aw",nn_:"_Lt",MD:"eh",ne7:"mO",OX:"IL",OM:"LRe",OR:"MRe",nc5:"T9e",nc3:"D9e",t6E:"PW",eT8:"$ce",nGO:"Zr",tCk:"Sa",nug:"IZn",ncW:"A9e",nqP:"dcs",nqO:"b41",ncQ:"pns",t9O:"XQn",e$n:"Ws",eL_:"_G",eLv:"Yce",eki:"dco",exZ:"hTt",nc2:"O5o",nnT:"xes",nnS:"kes",neR:"Eu",nis:"T5o",nqD:"y41",nqN:"y4n",eT5:"B8e",c8:"Wj"};
    for (const [name, original] of Object.entries(aliases)) context[name]=context[original];
  }
  const aliases = stable238 ? (editor ? {
 tK:'m',tY:'_',emv:'$s',tlv:'Aw',tW0:'_Lt',D8:'eh',tV6:'mO',O1:'IL',OB:'LRe',OF:'MRe',nQi:'T9e',nQa:'D9e',tl$:'PW',esD:'$ce',tVx:'Zr',tlf:'Sa',n4m:'A9e',rkL:'dcs',rkN:'b41',n4p:'pns',tzO:'XQn',tld:'Ws',el0:'_G',el2:'Yce',t_t:'dco',tgY:'hTt',rkT:'O5o',rkI:'kes',nV_:'kes',rkD:'XQn',tVI:'Eu',rkx:'T5o',rkF:'y41',rkB:'y4n',esT:'B8e',n1Q:'Wj'
 } : {
 R:'m',T:'_',ms:'$s',p_t:'Aw',q_t:'_Lt',GC:'eh',x1t:'mO',TW:'IL',Uct:'LRe',Hct:'MRe',dmt:'T9e',zPe:'D9e',eV:'PW',dY:'$ce',m8:'Zr',mc:'Sa',t3i:'A9e',d6s:'dcs',iLu:'b41',x5u:'pns',n6o:'XQn',ol:'Ws',LG:'_G',Rve:'Yce',PGr:'dco',ghi:'hTt',l6s:'O5o',XRu:'kes',Omu:'kes',ZRu:'XQn',$1:'Eu',a6s:'T5o',nLu:'y41',Iln:'y4n',rie:'B8e',Nj:'Wj'
 }) : stable ? (editor ? {
 tK:"m",tY:"_",emg:"$s",tlg:"Aw",tWX:"_Lt",D7:"eh",tV5:"mO",OQ:"IL",ON:"LRe",OL:"MRe",nQe:"T9e",nQt:"D9e",tlH:"PW",esT:"$ce",tVw:"Zr",tlp:"Sa",n4l:"A9e",rkl:"dcs",rks:"b41",n4c:"pns",tzR:"XQn",tlc:"Ws",elZ:"_G",el0:"Yce",tg8:"dco",tgV:"hTt",rke:"O5o",rkt:"kes",nVp:"kes",rkn:"XQn",tVS:"Eu",rw9:"T5o",rku:"y41",rkc:"y4n",esS:"B8e",n1Y:"Wj"
 } : {
 R:"m",T:"_",ds:"$s",YAt:"Aw",x_t:"_Lt",GC:"eh",B1t:"mO",HW:"IL",Gct:"LRe",jct:"MRe",ymt:"T9e",v$e:"D9e",sV:"PW",eY:"$ce",p8:"Zr",bc:"Sa",Lfi:"A9e",t6s:"dcs",RRu:"b41",C5u:"pns",t6o:"XQn",ol:"Ws",NG:"_G",hve:"Yce",DGr:"dco",jmi:"hTt",Xbs:"O5o",xRu:"kes",Tmu:"kes",kRu:"XQn",im:"Eu",Qbs:"T5o",LRu:"y41",Lln:"y4n",jte:"B8e",qj:"Wj"
 }) : editor ? {
 tK:"m",tY:"_",emg:"$s",tlg:"Aw",tWZ:"_Lt",D7:"eh",tV4:"mO",OQ:"IL",ON:"LRe",OL:"MRe",nZ8:"T9e",nZ9:"D9e",tlH:"PW",esT:"$ce",tVk:"Zr",tlp:"Sa",n4o:"A9e",rka:"dcs",rki:"b41",n4s:"pns",tzP:"XQn",tlc:"Ws",elZ:"_G",el0:"Yce",tg9:"dco",tgW:"hTt",rw6:"O5o",rw8:"kes",nVd:"kes",rw9:"XQn",tVx:"Eu",rw7:"T5o",rks:"y41",rko:"y4n",esS:"B8e",n1W:"Wj"
 } : {
 R:"m",T:"_",ds:"$s",YAt:"Aw",x_t:"_Lt",GC:"eh",B1t:"mO",HW:"IL",Gct:"LRe",jct:"MRe",ymt:"T9e",v$e:"D9e",sV:"PW",eY:"$ce",p8:"Zr",bc:"Sa",Lfi:"A9e",e6s:"dcs",kRu:"b41",g5u:"pns",e6o:"XQn",ol:"Ws",NG:"_G",hve:"Yce",RGr:"dco",Jmi:"hTt",Qbs:"O5o",wRu:"kes",_mu:"kes",ARu:"XQn",im:"Eu",Ybs:"T5o",TRu:"y41",Rln:"y4n",jte:"B8e",qj:"Wj"
 };
 for (const [name, original] of Object.entries(aliases)) context[name] = context[original];
 context[stable238?(editor?'tcw':'Im'):editor ? "tcb" : "Wm"] = () => ({logEvent(){},userStatus:{},props:{openGenericUrl(){}}});
 if(stable238){context[editor?'tlk':'yul']=()=>'';context[editor?'rwi':'XDu']=()=>({visible:false});}
 // Execute the shipped helper, whose callback reads the second argument's
 // modelInfo. A one-argument stub hid the renderer crash in the first adapter.
 context[stable238?(editor?'tuz':'g_t'):editor ? "tuj" : "ZAt"] = () => ({getMetadata(){return {};}});
 context[stable238?(editor?'n55':'sfs'):editor ? (stable?"n50":"n5Z") : "nfs"] = () => [];
 context[stable238?(editor?'n4i':'cfs'):editor ? (stable?"n4e":"n58") : "afs"] = providers => providers?.length ? Array.from(providers) : undefined;
 const partnerStart = clean.indexOf(stable238?(editor?'function rkP(){':'function tLu(){'):editor ? (stable?"function rki(){":"function rkt(){") : (stable?"function DRu(){":"function xRu(){"));
 const partnerEnd = clean.indexOf("function ", partnerStart+9);
 assert(partnerStart > 0 && partnerEnd > partnerStart, "shipped partner decorator boundary missing");
 vm.runInNewContext(clean.slice(partnerStart,partnerEnd),context);
 context[stable238?(editor?'rkR':'eLu'):editor ? (stable?"rkr":"rke") : (stable?"TRu":"_Ru")] = () => ({remember(){}});
  }
  const testedComponent = brokenDecorator ? componentSource.replace(decoratorCall,brokenCall) : componentSource;
  if (brokenDecorator) assert.notEqual(testedComponent,componentSource,"regression must reconstruct the broken call");
  const component = vm.runInNewContext(source.slice(correctStart, correctEnd) + testedComponent, context);
  function render() { cursor = 0; const props = component({ disabled: false }).props; while (effects.length) effects.shift()(); return props; }
  return { render, requests, actions, timerDelays, setOnline: next => { connected = next; }, setSession: next => { session = next; }, setCatalog: next => { catalog = next; }, ack: uid => { config.currentValue = uid; }, emit: type => browserWindow.dispatchEvent({ type }), cleanup: () => slots.forEach(slot => slot?.cleanup?.()) };
}
async function settle() { for (let n = 0; n < 4; n++) await new Promise(resolve => setImmediate(resolve)); }
async function open(h) { h.render().onOpenChange(true); h.render(); await settle(); return h.render(); }

async function checkPromptIdentity() {
  const marker = descriptor ? /\/\*(BYOK_NATIVE_PICKER_[^:]+):picker-state:start/.exec(source)[1] : "BYOK_NATIVE_PICKER_"+(editor?"EDITOR":"SESSIONS")+"_"+(stable?"STABLE":"NEXT")+(stable238?'_238':"_311");
  const begin = source.indexOf("/*" + marker + ":prompt-identity:start*/") + ("/*" + marker + ":prompt-identity:start*/").length;
  const end = source.indexOf("/*" + marker + ":prompt-identity:end*/", begin);
  assert(end > begin, "send boundary must have a prompt identity adapter");
  const body = source.slice(begin, end);
  for (const status of ["ready", "persist-failed", "identity-failed"]) {
    const session = "acp/devin-cli/isolated-session", calls = [];
    const nativeSend = async () => { calls.push("native-send"); };
    const context = { window:{__byokPickerWrites:new Map([[session, Promise.resolve({ok:status!=="persist-failed"})]])},
      AbortController, setTimeout, clearTimeout,
      fetch:async (_url, options) => { const data=JSON.parse(options.body); assert.equal(data.sessionId,session); assert.deepEqual(data.prompt,["isolated greeting"]); calls.push("prompt-identity"); return {ok:status!=="identity-failed",json:async()=>({ok:status!=="identity-failed"})}; },
    };
    if(descriptor){for(const [key,value]of Object.entries({a:session,r:nativeSend,p:'devin-cli',y:{},v:[{type:'text',text:'isolated greeting'}]}))context[descriptor.profile.promptNames[key]]=value;}
    else Object.assign(context, editor ? {r:session,e:nativeSend,i:"devin-cli",a:{},s:[{type:"text",text:"isolated greeting"}]} : {u:session,o:nativeSend,m:"devin-cli",k:{},I:[{type:"text",text:"isolated greeting"}]});
    const run = vm.runInNewContext("(async()=>{" + body + "})", context);
    if(status==="ready") { assert.equal(await run(),true); assert.deepEqual(calls,["prompt-identity","native-send"]); }
    else { await assert.rejects(run()); assert(!calls.includes("native-send"),"failed selection/identity must block the prompt"); }
  }
}

(async () => {
  await checkPromptIdentity();
  if(!descriptor||descriptor.partnerSource){const regression = harness({brokenDecorator:true});
  regression.render(); await settle();
  assert.throws(()=>regression.render(), /modelInfo/, "original regression must crash with the shipped decorator");
  regression.cleanup();
  }
  const first = harness();
  first.render(); await settle(); let props = first.render();
  assert(props.visibleModelConfigs.some(row => row.modelUid === bound.modelUid));
  if(!descriptor||descriptor.partnerSource)assert.deepEqual(Array.from(props.visibleModelConfigs.find(row => row.modelUid === bound.modelUid).partnerProviders), ["fixture-provider"], "raw model metadata was not forwarded to the native decorator");
  if(descriptor&&Object.values(descriptor.aliases).includes('IZn'))assert.equal(props.visibleModelConfigs.find(row=>row.modelUid===bound.modelUid).hasPriceChange,true,'native price-change decoration was dropped');
  assert.equal(first.actions.at(-1).value, bound.modelUid, "restored bound choice was not synchronized into the ACP session");
  first.render(); await settle(); props = first.render();
  assert.equal(props.selectedModels[0], bound.modelUid, "persisted session choice was not restored");
  const actionsBeforeSelect = first.actions.length;
  const persistedBeforeSelect = first.requests.filter(item => item.url.endsWith("/selected-model") && item.body && !item.body.activate).length;
  props.onModelSelect(props.visibleModelConfigs.find(row => row.modelUid === bound.modelUid));
  assert.equal(first.actions.length, actionsBeforeSelect + 1, "native ACP action was not dispatched first");
  await settle();
  first.render(); await settle(); props = first.render();
  assert.equal(first.actions.at(-1).value, bound.modelUid, "explicit bound choice was not synchronized into the ACP session");
  const persistedBound = first.requests.filter(item => item.url.endsWith("/selected-model") && item.body && item.body.src === "sessions-native-select").at(-1);
  assert.equal(persistedBound.body.uid, bound.modelUid, "session-scoped bound choice was not persisted");
  assert(first.requests.filter(item => item.url.endsWith("/selected-model") && item.body && !item.body.activate).length > persistedBeforeSelect, "selection incorrectly waited for a provider echo");
  assert.equal(props.selectedModels[0], bound.modelUid);
  first.setSession("session-b"); first.render(); await settle(); props = first.render();
  props.onModelSelect(props.visibleModelConfigs.find(row => row.modelUid === official.modelUid));
  assert.equal(first.actions.at(-1).value, official.modelUid);
  await settle(); first.render(); await settle();
  const persistedOfficial = first.requests.filter(item => item.url.endsWith("/selected-model") && item.body && item.body.src === "sessions-native-official").at(-1);
  assert.equal(persistedOfficial.body.official, true);
  first.cleanup();

  const unconfirmed = harness();
  unconfirmed.render(); await settle(); props = unconfirmed.render();
  const beforeUnconfirmed = unconfirmed.requests.filter(item => item.url.endsWith("/selected-model") && item.body && !item.body.activate).length;
  props.onModelSelect(props.visibleModelConfigs.find(row => row.modelUid === bound.modelUid));
  await settle(); unconfirmed.render(); await settle();
  assert.equal(unconfirmed.requests.filter(item => item.url.endsWith("/selected-model") && item.body && !item.body.activate).length, beforeUnconfirmed + 1, "delayed-flush choice was not persisted at click time");
  assert(!unconfirmed.timerDelays.includes(10000), "obsolete ten-second ACP acknowledgement timeout remains");
  unconfirmed.cleanup();

  const rapid = harness();
  rapid.render(); await settle(); props = rapid.render();
  props.onModelSelect(props.visibleModelConfigs.find(row => row.modelUid === bound.modelUid));
  props.onModelSelect(props.visibleModelConfigs.find(row => row.modelUid === boundB.modelUid));
  await settle(); rapid.render(); await settle();
  const rapidWrites = rapid.requests.filter(item => item.url.endsWith("/selected-model") && item.body && item.body.src === "sessions-native-select");
  const rapidPersisted = rapidWrites.at(-1);
  assert(rapidPersisted, "rapid persistence missing: " + JSON.stringify(rapid.requests));
  assert.deepEqual(rapidWrites.slice(-2).map(item => item.body.uid), [bound.modelUid, boundB.modelUid], "rapid A to B was not serialized in click order");
  assert.equal(rapidPersisted.body.uid, boundB.modelUid, "rapid A to B did not leave the newest choice last");
  rapid.cleanup();

  const draft = harness();
  draft.setSession(""); draft.render(); await settle(); props = draft.render();
  const draftWritesBefore = draft.requests.filter(item => item.url.endsWith("/selected-model") && item.body && !item.body.activate).length;
  props.onModelSelect(props.visibleModelConfigs.find(row => row.modelUid === bound.modelUid));
  assert.equal(draft.actions.at(-1).sessionId, undefined, "draft selection did not use native pending config");
  await settle();
  assert.equal(draft.requests.filter(item => item.url.endsWith("/selected-model") && item.body && !item.body.activate).length, draftWritesBefore, "id-less draft was persisted under an invented session");
  draft.setSession("session-from-draft"); draft.render(); await settle(); draft.render();
  const draftWrite = draft.requests.filter(item => item.url.endsWith("/selected-model") && item.body && item.body.src === "sessions-native-select").at(-1);
  assert.equal(draftWrite.body.sessionId, "session-from-draft", "draft choice was not bound to the assigned session id");
  assert.equal(draft.actions.at(-1).sessionId, "session-from-draft", "draft choice was not copied into the concrete ACP session");
  draft.cleanup();

  const late = harness({ online: false }); late.render(); await settle();
  late.setOnline(true); props = await open(late);
  assert.equal(late.requests.filter(item => item.url.endsWith("/native-model-configs")).length, 2);
  assert(props.visibleModelConfigs.some(row => row.modelUid === bound.modelUid));
  late.cleanup();

  const refresh = harness(); refresh.render(); await settle(); props = refresh.render();
  assert.equal(props.selectedModels[0], bound.modelUid);
  refresh.setCatalog([...refresh.render().visibleModelConfigs, { modelUid: "latest-added", label: "Latest added" }]);
  props = await open(refresh);
  assert(props.visibleModelConfigs.some(row => row.modelUid === "latest-added"));
  refresh.render().onOpenChange(false); refresh.render();
  refresh.setCatalog([...props.visibleModelConfigs, { modelUid: "event-added", label: "Event added" }]);
  refresh.emit("byok-local-live"); refresh.render(); await settle(); props = refresh.render();
  assert(props.visibleModelConfigs.some(row => row.modelUid === "event-added"));
  refresh.cleanup();

  const correction = harness({ rows: [bound, official] }); correction.render(); await settle(); correction.render();
  assert.equal(correction.actions.length, 1);
  assert.equal(correction.actions[0].value, bound.modelUid, "activation must restore the bound UID into native session state");
  correction.cleanup();
  console.log((editor ? "EDITOR_" : "SESSIONS_")+(stable?"STABLE":"NEXT")+(stable238?'_238':'_311')+"_OK callbackFresh=1 bindingExact=1 delayedFlush=1 noAckTimeout=1 rapidLatestWins=1 draftBinding=1 runtimeEvents=1 startupRetry=1 defaultActive=1 reopenRefresh=1 liveEventRefresh=1 nativeCorrectionIsolated=1");
})().catch(error => { console.error(error.stack); process.exitCode = 1; });
