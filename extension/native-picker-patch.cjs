"use strict";

// One bounded data adapter inside Devin's existing ACP model picker. This does
// not install a renderer bridge or replace the native model-selection handler.
const MARKER = "BYOK_NATIVE_PICKER_V2";
const LEGACY_MARKER = "BYOK_NATIVE_PICKER_V1";
const SESSIONS_MARKER = "BYOK_NATIVE_PICKER_SESSIONS_V7";
const PREVIOUS_SESSIONS_MARKER = "BYOK_NATIVE_PICKER_SESSIONS_V6";
const LEGACY_SESSIONS_MARKER = "BYOK_NATIVE_PICKER_SESSIONS_V5";
const OLDER_SESSIONS_MARKER = "BYOK_NATIVE_PICKER_SESSIONS_V4";
const OLDEST_SESSIONS_MARKER = "BYOK_NATIVE_PICKER_SESSIONS_V3";
const EARLIEST_SESSIONS_MARKER = "BYOK_NATIVE_PICKER_SESSIONS_V2";
const NEXT_310_SESSIONS_MARKER = "BYOK_NATIVE_PICKER_SESSIONS_NEXT_310";

// Serialized into the installed component. Keep every dependency explicit: the
// only captured variables are component state and the native protobuf class Ii.
function legacyRefreshNativeModels() {
  if (!xe) { __byokSetNativeModels(null); return; }
  if (!xn) return;
  let stopped = false;
  const controller = new AbortController();
  const deadline = setTimeout(() => controller.abort(), 2000);
  const maxBytes = 12 * 1024 * 1024;
  void (async () => {
    try {
      const response = await fetch("http://127.0.0.1:6778/__byok/native-model-configs", {
        signal: controller.signal,
        cache: "no-store",
        credentials: "omit",
      });
      if (stopped) return;
      if (controller.signal.aborted) throw new Error("Native model request timed out");
      if (!response.ok || Number(response.headers.get("content-length") || 0) > maxBytes || !response.body) {
        throw new Error("Native model response unavailable");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8", { fatal: true });
      let size = 0, text = "";
      try {
        for (;;) {
          const part = await reader.read();
          if (stopped) return;
          if (controller.signal.aborted) throw new Error("Native model request timed out");
          if (part.done) break;
          size += part.value.byteLength;
          if (size > maxBytes) throw new Error("Native model response exceeds limit");
          text += decoder.decode(part.value, { stream: true });
        }
        text += decoder.decode();
      } finally {
        // Cancel unread data on timeout, overflow, unmount, or a closed menu.
        await reader.cancel().catch(() => {});
        reader.releaseLock();
      }
      if (stopped) return;
      if (controller.signal.aborted) throw new Error("Native model request timed out");
      const document = JSON.parse(text);
      if (document.ok !== true || document.enabled !== true) { __byokSetNativeModels(null); return; }
      if (!Array.isArray(document.models) || !document.models.length || document.models.length > 2000) throw new Error("Native model count is unavailable or exceeds limit");
      const seen = new Set();
      const rows = document.models.map(entry => {
        if (!entry || typeof entry.uid !== "string" || !entry.uid || entry.uid.length > 256 || seen.has(entry.uid) ||
            typeof entry.protoB64 !== "string" || !entry.protoB64 || !/^[A-Za-z0-9+/]*={0,2}$/.test(entry.protoB64)) {
          throw new Error("Invalid native model record");
        }
        const raw = atob(entry.protoB64);
        const row = Ii.fromBinary(Uint8Array.from(raw, character => character.charCodeAt(0)));
        if (row.modelUid !== entry.uid) throw new Error("Native model identity mismatch");
        if (entry.familyKey) row.familyKey = String(entry.familyKey);
        seen.add(entry.uid);
        return row;
      });
      if (!stopped && !controller.signal.aborted) __byokSetNativeModels(rows);
    } catch {
      if (!stopped) __byokSetNativeModels(null);
    } finally {
      clearTimeout(deadline);
      controller.abort();
    }
  })();
  return () => { stopped = true; clearTimeout(deadline); controller.abort(); };
}

function refreshNativeModels() {
  if (!xe) { __byokNativeOpened.current = false; __byokSetNativeModels(null); __byokSetNativeDefaultUid(""); return; }
  if (!xn && __byokNativeOpened.current) return;
  if (xn) __byokNativeOpened.current = true;
  let stopped = false;
  const controller = new AbortController();
  const deadline = setTimeout(() => controller.abort(), 2000);
  const maxBytes = 12 * 1024 * 1024;
  void (async () => {
    try {
      const response = await fetch("http://127.0.0.1:6778/__byok/native-model-configs", {
        signal: controller.signal,
        cache: "no-store",
        credentials: "omit",
      });
      if (stopped) return;
      if (controller.signal.aborted) throw new Error("Native model request timed out");
      if (!response.ok || Number(response.headers.get("content-length") || 0) > maxBytes || !response.body) {
        throw new Error("Native model response unavailable");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8", { fatal: true });
      let size = 0, text = "";
      try {
        for (;;) {
          const part = await reader.read();
          if (stopped) return;
          if (controller.signal.aborted) throw new Error("Native model request timed out");
          if (part.done) break;
          size += part.value.byteLength;
          if (size > maxBytes) throw new Error("Native model response exceeds limit");
          text += decoder.decode(part.value, { stream: true });
        }
        text += decoder.decode();
      } finally {
        // Cancel unread data on timeout, overflow, unmount, or a closed menu.
        await reader.cancel().catch(() => {});
        reader.releaseLock();
      }
      if (stopped) return;
      if (controller.signal.aborted) throw new Error("Native model request timed out");
      const document = JSON.parse(text);
      if (document.ok !== true || document.enabled !== true) { __byokSetNativeModels(null); __byokSetNativeDefaultUid(""); return; }
      if (!Array.isArray(document.models) || !document.models.length || document.models.length > 2000) throw new Error("Native model count is unavailable or exceeds limit");
      const seen = new Set();
      const rows = document.models.map(entry => {
        if (!entry || typeof entry.uid !== "string" || !entry.uid || entry.uid.length > 256 || seen.has(entry.uid) ||
            typeof entry.protoB64 !== "string" || !entry.protoB64 || !/^[A-Za-z0-9+/]*={0,2}$/.test(entry.protoB64)) {
          throw new Error("Invalid native model record");
        }
        const raw = atob(entry.protoB64);
        const row = Ii.fromBinary(Uint8Array.from(raw, character => character.charCodeAt(0)));
        if (row.modelUid !== entry.uid) throw new Error("Native model identity mismatch");
        if (entry.familyKey) row.familyKey = String(entry.familyKey);
        seen.add(entry.uid);
        return row;
      });
      const candidateDefaultUid = typeof document.defaultUid === "string" ? document.defaultUid.trim() : "";
      const defaultUid = candidateDefaultUid && rows.some(row => row && row.modelUid === candidateDefaultUid) ? candidateDefaultUid : "";
      if (!stopped && !controller.signal.aborted) {
        __byokSetNativeDefaultUid(defaultUid);
        __byokSetNativeModels(rows);
      }
    } catch {
      if (!stopped) { __byokSetNativeDefaultUid(""); __byokSetNativeModels(null); }
    } finally {
      clearTimeout(deadline);
      controller.abort();
    }
  })();
  return () => { stopped = true; clearTimeout(deadline); controller.abort(); };
}

// Binding can change while the composer is already mounted.  Poll only the
// small UID document so a fresh binding is applied without opening the menu.
function pollNativeDefaultUid() {
  if (!xe) { __byokSetNativeDefaultUid(""); return; }
  let stopped = false, running = false, controller = null, deadline = null;
  const load = async () => {
    if (stopped || running) return;
    running = true;
    controller = new AbortController();
    deadline = setTimeout(() => controller.abort(), 2000);
    try {
      const response = await fetch("http://127.0.0.1:6778/__byok/bound-uids", {
        signal: controller.signal,
        cache: "no-store",
        credentials: "omit",
      });
      if (stopped || controller.signal.aborted || !response.ok || Number(response.headers.get("content-length") || 0) > 1024 * 1024) return;
      const document = await response.json();
      if (stopped || !document || document.armed !== true) return;
      const uid = typeof document.defaultUid === "string" ? document.defaultUid.trim() : "";
      const uids = Array.isArray(document.uids) ? document.uids : [];
      __byokSetNativeDefaultUid(uid && uid.length <= 256 && uids.some(value => String(value || "") === uid) ? uid : "");
    } catch {
      // A transient daemon restart must not overwrite a valid in-memory UID.
    } finally {
      if (deadline !== null) clearTimeout(deadline);
      deadline = null;
      controller = null;
      running = false;
    }
  };
  void load();
  const timer = setInterval(load, 1500);
  return () => {
    stopped = true;
    clearInterval(timer);
    if (deadline !== null) clearTimeout(deadline);
    if (controller) controller.abort();
  };
}

const legacyDefinitions = [
  {
    name: "selected-value",
    before: "rn=mXe({configId:Zt,rawValue:pn,availableValues:An.length>0?An:null,activeSessionId:f})??pn",
    replacement: "rn=mXe({configId:Zt,rawValue:pn,availableValues:xe&&__byokNativeModels===null?null:An.length>0?An:null,activeSessionId:f})??pn",
  },
  {
    name: "candidate-deps",
    before: "[de,Vt,rt]",
    replacement: "[de,Vt,rt,xe,__byokNativeModels]",
  },
  {
    name: "sort-deps",
    before: "[Vt,at,de,xt]",
    replacement: "[Vt,at,de,xt,xe,__byokNativeModels]",
  },
  {
    name: "state",
    before: "jzo=(0,o.memo)(({disabled:d})=>{let{logEvent:s,userStatus:m}=H1()",
    replacement: "jzo=(0,o.memo)(({disabled:d})=>{let[__byokNativeModels,__byokSetNativeModels]=(0,o.useState)(null);let{logEvent:s,userStatus:m}=H1()",
  },
  {
    name: "source",
    before: "rt=Qa(Os=>Os.state.visibleModelConfigs),at=Qa(Os=>Os.state.modelSorts),pt=xe?rt:void 0",
    replacement: "__byokStockModels=Qa(Os=>Os.state.visibleModelConfigs),rt=xe&&__byokNativeModels!==null?__byokNativeModels:__byokStockModels,at=Qa(Os=>Os.state.modelSorts),pt=xe?rt:void 0",
  },
  {
    name: "candidates",
    before: "xt=(0,o.useMemo)(()=>{if(!de)return[];if(Vt){let Os=Gzo(de.options);return rt.filter(Cs=>Os.has(Cs.modelUid)||Cs.disabled).map(lpt)}",
    replacement: "xt=(0,o.useMemo)(()=>{if(!de)return[];if(xe&&__byokNativeModels!==null)return rt.map(lpt);if(Vt){let Os=Gzo(de.options);return rt.filter(Cs=>Os.has(Cs.modelUid)||Cs.disabled).map(lpt)}",
  },
  {
    name: "sorts",
    before: "Ot=(0,o.useMemo)(()=>{if(Vt&&at.length>0&&de){let Os=Gzo(de.options)",
    replacement: "Ot=(0,o.useMemo)(()=>{if(xe&&__byokNativeModels!==null)return[{name:\"All\",groups:[{groupName:\"Available models\",options:xt}],isDefault:!0}];if(Vt&&at.length>0&&de){let Os=Gzo(de.options)",
  },
  {
    name: "refresh",
    before: "[xn,pi]=(0,o.useState)(!1),Kn=(0,o.useRef)(null)",
    replacement: "[xn,pi]=(0,o.useState)(!1),__byokNativeRefresh=(0,o.useEffect)(" + refreshNativeModels.toString() + ",[xe,xn]),Kn=(0,o.useRef)(null)",
  },
];

function materialize(definitions, marker) {
  return definitions.map(edit => ({ ...edit, after: "/*" + marker + ":" + edit.name + ":start*/" + edit.replacement + "/*" + marker + ":" + edit.name + ":end*/" }));
}

const legacyEdits = materialize(legacyDefinitions.map(edit => edit.name === "refresh" ? {
  ...edit,
  replacement: "[xn,pi]=(0,o.useState)(!1),__byokNativeRefresh=(0,o.useEffect)(" + legacyRefreshNativeModels.toString().replace("legacyRefreshNativeModels", "refreshNativeModels") + ",[xe,xn]),Kn=(0,o.useRef)(null)",
} : edit), LEGACY_MARKER);
const edits = materialize([
  ...legacyDefinitions.filter(edit => edit.name !== "state" && edit.name !== "refresh"),
  {
    name: "state",
    before: "jzo=(0,o.memo)(({disabled:d})=>{let{logEvent:s,userStatus:m}=H1()",
    replacement: "jzo=(0,o.memo)(({disabled:d})=>{let[__byokNativeModels,__byokSetNativeModels]=(0,o.useState)(null);let[__byokNativeDefaultUid,__byokSetNativeDefaultUid]=(0,o.useState)(\"\");let __byokNativeOpened=(0,o.useRef)(!1);let{logEvent:s,userStatus:m}=H1()",
  },
  {
    name: "refresh",
    before: "[xn,pi]=(0,o.useState)(!1),Kn=(0,o.useRef)(null)",
    replacement: "[xn,pi]=(0,o.useState)(!1),__byokNativeDefaultPoll=(0,o.useEffect)(" + pollNativeDefaultUid.toString() + ",[xe]),__byokNativeRefresh=(0,o.useEffect)(" + refreshNativeModels.toString() + ",[xe,xn]),Kn=(0,o.useRef)(null)",
  },
  {
    name: "default-selection",
    before: "Zt=de?.id??\"model\",pn=oe??de?.currentValue,An=",
    replacement: "Zt=de?.id??\"model\",pn=oe??de?.currentValue,An=",
  },
  {
    name: "manual-selection",
    before: "zo=(0,o.useCallback)(Os=>{if(f&&!Cc.getState().acp.pendingSwitchTarget?",
    replacement: "zo=(0,o.useCallback)(Os=>{try{if(xe&&Os&&Os.modelUid){let __byokSelected=String(Os.modelUid);window.__BYOK_LOCAL_SELECTED_UID=__byokSelected;setTimeout(()=>fetch(\"http://127.0.0.1:6778/__byok/selected-model\",{method:\"POST\",headers:{\"content-type\":\"application/json\"},body:JSON.stringify({uid:__byokSelected,sessionId:String(f||\"\"),src:\"native-select-requested\"})}).catch(()=>{}),0)}}catch(_){}let __byokBoundSelection=!1;try{let __byokBound=window.__BYOK_BOUND_UIDS,__byokUid=String(Os&&Os.modelUid||\"\");__byokBoundSelection=!!(xe&&__byokUid&&__byokBound&&((typeof __byokBound.has===\"function\"&&__byokBound.has(__byokUid))||__byokBound[__byokUid]!=null))}catch(_){}if(!__byokBoundSelection&&f&&!Cc.getState().acp.pendingSwitchTarget?",
  },
], MARKER);

function count(code, fragment) { return code.split(fragment).length - 1; }

// Devin 1.126 moved AcpModelSelect and AcpContextWindowIndicator from the
// Workbench bundle into sessions.desktop.main.js. These exact, marker-wrapped
// edits are intentionally reversible: an update either applies every edit once
// or changes nothing, and uninstall reconstructs the byte-identical host text.
const sessionsDefinitions = [
  {
    name: "picker-state",
    before: "let{t:o}=$s(),{logEvent:a,userStatus:p}=Kl(),{activeSessionId:h}=Aw(),{shortcutEvents:v}=_Lt(),{fedPortalUrl:w}=eh(),y=mO(),{data:k,set:A}=IL(\"pinnedCascadeModelUids\"),O=(0,m.useMemo)(()=>LRe(k)??[],[k]),{data:H,set:q,isPending:W}=IL(\"lastSelectedCascadeModelUids\"),{data:j,set:X,isPending:ee}=IL(\"lastSelectedAcpModelUids\"),se=T9e().find(qo=>qo.category===\"model\"&&qo.type===\"select\"),ae=se?.type===\"select\"?se:void 0,he=D9e(ae?.id??\"model\"),Se=PW(),Ie=$ce(Se),Ae=Ie?H:j,Ue=Ie?q:X,Ge=Ie?W:ee,ze=(0,m.useMemo)(()=>LRe(Ae)??[],[Ae]),$e=Zr(qo=>qo.state.visibleModelConfigs),Xe=Zr(qo=>qo.state.modelSorts),{unacknowledgedModelUids:ot}=IZn()",
    replacement: "let{t:o}=$s(),{logEvent:a,userStatus:p}=Kl(),{activeSessionId:h}=Aw(),{shortcutEvents:v}=_Lt(),{fedPortalUrl:w}=eh(),y=mO(),{data:k,set:A}=IL(\"pinnedCascadeModelUids\"),O=(0,m.useMemo)(()=>LRe(k)??[],[k]),{data:H,set:q,isPending:W}=IL(\"lastSelectedCascadeModelUids\"),{data:j,set:X,isPending:ee}=IL(\"lastSelectedAcpModelUids\"),se=T9e().find(qo=>qo.category===\"model\"&&qo.type===\"select\"),ae=se?.type===\"select\"?se:void 0,he=D9e(ae?.id??\"model\"),Se=PW(),Ie=$ce(Se),Ae=Ie?H:j,Ue=Ie?q:X,Ge=Ie?W:ee,ze=(0,m.useMemo)(()=>LRe(Ae)??[],[Ae]),$e=Zr(qo=>qo.state.visibleModelConfigs),Xe=Zr(qo=>qo.state.modelSorts),[__byokNativeModels,__byokSetNativeModels]=(0,m.useState)(null),[__byokSelectedUid,__byokSetSelectedUid]=(0,m.useState)(\"\"),{unacknowledgedModelUids:ot}=IZn()",
  },
  {
    name: "picker-rows",
    before: "gt=Ie?$e:void 0,Rt=Ie,Dt=Ie&&$e.length>0,yt=(0,m.useMemo)(()=>{if(!ae)return[];if(Dt){",
    replacement: "gt=Ie&&__byokNativeModels!==null?__byokNativeModels:Ie?$e:void 0,Rt=Ie,Dt=Ie&&__byokNativeModels===null&&$e.length>0,yt=(0,m.useMemo)(()=>{if(!ae)return[];if(Ie&&__byokNativeModels!==null)return __byokNativeModels.map(qo=>ut(A9e(qo)));if(Dt){",
  },
  {
    name: "picker-row-deps",
    before: "[ut,ae,Dt,$e]),Kt=",
    replacement: "[ut,ae,Dt,$e,Ie,__byokNativeModels]),Kt=",
  },
  {
    name: "picker-selected-value",
    before: "tn=Iot({configId:on,rawValue:Bt,availableValues:sn.length>0?sn:null,activeSessionId:h})??Bt,bn=(0,m.useMemo)(()=>tn?[tn]:[],[tn])",
    replacement: "tn=Iot({configId:on,rawValue:Bt,availableValues:sn.length>0?sn:null,activeSessionId:h})??Bt,bn=(0,m.useMemo)(()=>__byokSelectedUid?[__byokSelectedUid]:tn?[tn]:[],[tn,__byokSelectedUid])",
  },
  {
    name: "picker-effects",
    before: "[Zt,In]=(0,m.useState)(!1),Mn=(0,m.useRef)(null);",
    replacement: "[Zt,In]=(0,m.useState)(!1),Mn=(0,m.useRef)(null);(0,m.useEffect)(()=>{if(!Ie){__byokSetNativeModels(null);__byokSetSelectedUid(\"\");return}let __byokStop=!1,__byokController=new AbortController(),__byokTimer=setTimeout(()=>__byokController.abort(),2500);fetch(\"http://127.0.0.1:6778/__byok/native-model-configs\",{signal:__byokController.signal,cache:\"no-store\",credentials:\"omit\"}).then(__byokResponse=>__byokResponse.ok?__byokResponse.json():null).then(__byokDoc=>{if(__byokStop||!__byokDoc||__byokDoc.ok!==!0||__byokDoc.enabled!==!0||!Array.isArray(__byokDoc.models)||__byokDoc.models.length>2000)return;let __byokSeen=new Set,__byokRows=__byokDoc.models.map(__byokModel=>{let __byokUid=String(__byokModel&&__byokModel.uid||\"\"),__byokB64=String(__byokModel&&__byokModel.protoB64||\"\");if(!__byokUid||__byokUid.length>256||__byokSeen.has(__byokUid)||!__byokB64||!(/^[A-Za-z0-9+/]*={0,2}$/).test(__byokB64))throw Error(\"invalid model\");let __byokRaw=atob(__byokB64),__byokRow=Wj.fromBinary(Uint8Array.from(__byokRaw,__byokChar=>__byokChar.charCodeAt(0)));if(String(__byokRow.modelUid||\"\")!==__byokUid)throw Error(\"model mismatch\");__byokSeen.add(__byokUid);return __byokRow});if(!__byokStop&&__byokRows.length)__byokSetNativeModels(__byokRows)}).catch(()=>{if(!__byokStop)__byokSetNativeModels(null)}).finally(()=>clearTimeout(__byokTimer));return()=>{__byokStop=!0;clearTimeout(__byokTimer);__byokController.abort()}},[Ie]);(0,m.useEffect)(()=>{__byokSetSelectedUid(\"\");if(!Ie||!h)return;let __byokStop=!1,__byokController=new AbortController(),__byokTimer=setTimeout(()=>__byokController.abort(),2500);fetch(\"http://127.0.0.1:6778/__byok/selected-model\",{method:\"POST\",signal:__byokController.signal,cache:\"no-store\",credentials:\"omit\",headers:{\"content-type\":\"application/json\"},body:JSON.stringify({sessionId:String(h),activate:!0,src:\"sessions-native-activate\"})}).then(__byokResponse=>__byokResponse.ok?__byokResponse.json():null).then(__byokDoc=>{if(!__byokStop&&__byokDoc&&__byokDoc.ok&&__byokDoc.uid)__byokSetSelectedUid(String(__byokDoc.uid))}).catch(()=>{}).finally(()=>clearTimeout(__byokTimer));return()=>{__byokStop=!0;clearTimeout(__byokTimer);__byokController.abort()}},[Ie,h]);",
  },
  {
    name: "picker-selection",
    before: "let ei=(0,m.useCallback)(qo=>{if(h&&!Ws.getState().acp.pendingSwitchTarget?Ws.dispatch(_G({sessionId:h,configId:on,value:qo.modelUid})):Ws.dispatch(Yce({configId:on,value:qo.modelUid})),Ge)",
    replacement: "let ei=(0,m.useCallback)(qo=>{let __byokUid=String(qo&&qo.modelUid||\"\"),__byokBoundSelection=Array.isArray(__byokNativeModels)&&__byokNativeModels.some(__byokModel=>String(__byokModel&&__byokModel.modelUid||\"\")===__byokUid);if(__byokBoundSelection){__byokSetSelectedUid(__byokUid);fetch(\"http://127.0.0.1:6778/__byok/selected-model\",{method:\"POST\",headers:{\"content-type\":\"application/json\"},body:JSON.stringify({uid:__byokUid,sessionId:String(h||\"\"),src:\"sessions-native-select\"})}).catch(()=>{})}else{__byokSetSelectedUid(\"\");fetch(\"http://127.0.0.1:6778/__byok/selected-model\",{method:\"POST\",headers:{\"content-type\":\"application/json\"},body:JSON.stringify({uid:\"\",sessionId:String(h||\"\"),src:\"sessions-native-official\"})}).catch(()=>{});h&&!Ws.getState().acp.pendingSwitchTarget?Ws.dispatch(_G({sessionId:h,configId:on,value:qo.modelUid})):Ws.dispatch(Yce({configId:on,value:qo.modelUid}))}if(Ge)",
  },
  {
    name: "context-state",
    before: "Pns=(0,m.memo)(()=>{let r=Lh(),o=m5t(),a=wns(),p=Sa(O=>r?O.acp.perSession[r]?.contextUsage:void 0),h=",
    replacement: "Pns=(0,m.memo)(()=>{let r=Lh(),o=m5t(),a=wns(),p=Sa(O=>r?O.acp.perSession[r]?.contextUsage:void 0),[__byokCtxSnap,__byokSetCtxSnap]=(0,m.useState)(null),h=",
  },
  {
    name: "context-effect",
    before: "{userStatus:w}=Kl(),y=MTr(w?.planStatus?.planInfo);if(!p||p.size===0)return null;",
    replacement: "{userStatus:w}=Kl(),y=MTr(w?.planStatus?.planInfo);(0,m.useEffect)(()=>{__byokSetCtxSnap(null);if(!r)return;let __byokAlive=!0,__byokTimer=null,__byokController=null;let __byokPull=()=>{if(!__byokAlive||__byokController||typeof document!==\"undefined\"&&document.visibilityState!==\"visible\")return;let __byokCurrent=new AbortController;__byokController=__byokCurrent;let __byokDeadline=setTimeout(()=>__byokCurrent.abort(),1500);fetch(\"http://127.0.0.1:6778/api/v2/context-snapshot?conversationId=\"+encodeURIComponent(String(r)),{signal:__byokCurrent.signal,cache:\"no-store\",credentials:\"omit\"}).then(__byokResponse=>__byokResponse.ok?__byokResponse.json():null).then(__byokDoc=>{let __byokSnap=__byokDoc&&__byokDoc.schemaVersion===2&&__byokDoc.status===\"ready\"?__byokDoc.snapshot:null,__byokUsed=Number(__byokSnap&&__byokSnap.tokensUsed),__byokSize=Number(__byokSnap&&__byokSnap.contextLimit);if(__byokAlive&&__byokSnap&&Number.isFinite(__byokUsed)&&__byokUsed>=0&&Number.isFinite(__byokSize)&&__byokSize>0)__byokSetCtxSnap({used:Math.round(__byokUsed),size:Math.round(__byokSize),inputTokens:Math.max(0,Math.round(Number(__byokSnap.inputTokens)||__byokUsed)),cachedReadTokens:Math.max(0,Math.round(Number(__byokSnap.cacheReadTokens)||0)),cachedWriteTokens:Math.max(0,Math.round(Number(__byokSnap.cacheWriteTokens)||0)),timestampMs:Number(__byokSnap.timestampMs)||Date.now()})}).catch(()=>{}).finally(()=>{clearTimeout(__byokDeadline);if(__byokController===__byokCurrent)__byokController=null;if(__byokAlive)__byokTimer=setTimeout(__byokPull,5000)})};__byokPull();return()=>{__byokAlive=!1;if(__byokTimer!==null)clearTimeout(__byokTimer);if(__byokController)__byokController.abort()}},[r]);if(__byokCtxSnap)p=__byokCtxSnap;if(!p||p.size===0)return null;",
  },
];
// Older profiles are kept as exact removal recipes so installed V2-V5
// adapters can upgrade without relying on a stale whole-file backup. V6 keeps
// the same clean host anchors and replaces only the bounded component slices.
const earliestSessionsEdits = materialize(sessionsDefinitions, EARLIEST_SESSIONS_MARKER);
const sessionsDefinitionsV3 = sessionsDefinitions.map(definition => {
  if (definition.name === "picker-state") return { ...definition, replacement: definition.replacement.replace(
    '[__byokNativeModels,__byokSetNativeModels]=(0,m.useState)(null),[__byokSelectedUid,__byokSetSelectedUid]=(0,m.useState)("")',
    '[__byokNativeSnapshot,__byokSetNativeSnapshot]=(0,m.useState)(null),[__byokSelectedUid,__byokSetSelectedUid]=(0,m.useState)(""),[__byokRefreshTick,__byokSetRefreshTick]=(0,m.useState)(0),__byokSelectionEpoch=(0,m.useRef)(0),__byokActivatedSession=(0,m.useRef)(""),__byokCatalogTick=(0,m.useRef)(-1),__byokActivationTick=(0,m.useRef)(-1)'
  ) };
  if (definition.name === "picker-rows") return { ...definition, replacement: "gt=Ie&&__byokNativeSnapshot!==null?__byokNativeSnapshot.models:Ie?$e:void 0,Rt=Ie,Dt=Ie&&__byokNativeSnapshot===null&&$e.length>0,yt=(0,m.useMemo)(()=>{if(!ae)return[];if(Ie&&__byokNativeSnapshot!==null)return __byokNativeSnapshot.models.map(qo=>ut(A9e(qo)));if(Dt){" };
  if (definition.name === "picker-row-deps") return { ...definition, replacement: "[ut,ae,Dt,$e,Ie,__byokNativeSnapshot]),Kt=" };
  if (definition.name === "picker-selected-value") return { ...definition, replacement: "tn=Iot({configId:on,rawValue:Bt,availableValues:Ie&&__byokNativeSnapshot!==null?null:sn,activeSessionId:h})??Bt,bn=(0,m.useMemo)(()=>__byokSelectedUid?[__byokSelectedUid]:tn?[tn]:[],[tn,__byokSelectedUid])" };
  if (definition.name === "picker-effects") return { ...definition, replacement: '[Zt,In]=(0,m.useState)(!1),Mn=(0,m.useRef)(null);(0,m.useEffect)(()=>{let __byokRefresh=()=>__byokSetRefreshTick(__byokValue=>(__byokValue|0)+1);try{window.addEventListener("byok-local-live",__byokRefresh);window.addEventListener("byok-model-picker-refresh",__byokRefresh)}catch(_){}return()=>{try{window.removeEventListener("byok-local-live",__byokRefresh);window.removeEventListener("byok-model-picker-refresh",__byokRefresh)}catch(_){}}},[]);(0,m.useEffect)(()=>{if(!Ie){__byokSetNativeSnapshot(null);__byokSetSelectedUid("");__byokActivatedSession.current="";return}if(!Zt&&__byokNativeSnapshot!==null&&__byokCatalogTick.current===__byokRefreshTick)return;__byokCatalogTick.current=__byokRefreshTick;let __byokStop=!1,__byokController=new AbortController(),__byokTimer=setTimeout(()=>__byokController.abort(),2500);fetch("http://127.0.0.1:6778/__byok/native-model-configs",{signal:__byokController.signal,cache:"no-store",credentials:"omit"}).then(__byokResponse=>__byokResponse.ok?__byokResponse.json():null).then(__byokDoc=>{if(__byokStop)return;if(!__byokDoc||__byokDoc.ok!==!0||__byokDoc.enabled!==!0||!Array.isArray(__byokDoc.models)||!__byokDoc.models.length||__byokDoc.models.length>2000||!Array.isArray(__byokDoc.boundUids)){__byokSetNativeSnapshot(null);return}let __byokSeen=new Set,__byokRows=__byokDoc.models.map(__byokModel=>{let __byokUid=String(__byokModel&&__byokModel.uid||""),__byokB64=String(__byokModel&&__byokModel.protoB64||"");if(!__byokUid||__byokUid.length>256||__byokSeen.has(__byokUid)||!__byokB64||!(/^[A-Za-z0-9+/]*={0,2}$/).test(__byokB64))throw Error("invalid model");let __byokRaw=atob(__byokB64),__byokRow=Wj.fromBinary(Uint8Array.from(__byokRaw,__byokChar=>__byokChar.charCodeAt(0)));if(String(__byokRow.modelUid||"")!==__byokUid)throw Error("model mismatch");__byokSeen.add(__byokUid);return __byokRow}),__byokBound=new Set(__byokDoc.boundUids.map(__byokUid=>String(__byokUid||"")).filter(__byokUid=>__byokSeen.has(__byokUid))),__byokDefault=String(__byokDoc.defaultUid||"");if(__byokDefault&&!__byokBound.has(__byokDefault))__byokDefault="";if(!__byokStop)__byokSetNativeSnapshot({models:__byokRows,boundUids:__byokBound,defaultUid:__byokDefault})}).catch(()=>{if(!__byokStop)__byokSetNativeSnapshot(null)}).finally(()=>clearTimeout(__byokTimer));return()=>{__byokStop=!0;clearTimeout(__byokTimer);__byokController.abort()}},[Ie,Zt,h,__byokRefreshTick]);(0,m.useEffect)(()=>{if(!Ie||!h){__byokSetSelectedUid("");__byokActivatedSession.current="";return}if(!Zt&&__byokActivatedSession.current===String(h)&&__byokActivationTick.current===__byokRefreshTick)return;__byokActivationTick.current=__byokRefreshTick;let __byokStop=!1,__byokController=new AbortController(),__byokTimer=setTimeout(()=>__byokController.abort(),2500),__byokEpoch=++__byokSelectionEpoch.current;fetch("http://127.0.0.1:6778/__byok/selected-model",{method:"POST",signal:__byokController.signal,cache:"no-store",credentials:"omit",headers:{"content-type":"application/json"},body:JSON.stringify({sessionId:String(h),activate:!0,src:"sessions-native-activate"})}).then(__byokResponse=>__byokResponse.ok?__byokResponse.json():null).then(__byokDoc=>{if(__byokStop||__byokEpoch!==__byokSelectionEpoch.current||!__byokDoc||!__byokDoc.ok)return;__byokActivatedSession.current=String(h);__byokSetSelectedUid(__byokDoc.uid?String(__byokDoc.uid):"")}).catch(()=>{}).finally(()=>clearTimeout(__byokTimer));return()=>{__byokStop=!0;clearTimeout(__byokTimer);__byokController.abort()}},[Ie,h,Zt,__byokRefreshTick]);' };
  if (definition.name === "picker-selection") return { ...definition, replacement: 'let ei=(0,m.useCallback)(qo=>{let __byokUid=String(qo&&qo.modelUid||""),__byokBoundSelection=!!(__byokNativeSnapshot&&__byokNativeSnapshot.boundUids&&typeof __byokNativeSnapshot.boundUids.has==="function"&&__byokNativeSnapshot.boundUids.has(__byokUid)),__byokEpoch=++__byokSelectionEpoch.current;if(__byokBoundSelection){fetch("http://127.0.0.1:6778/__byok/selected-model",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({uid:__byokUid,sessionId:String(h||""),src:"sessions-native-select"})}).then(__byokResponse=>__byokResponse.ok?__byokResponse.json():null).then(__byokDoc=>{if(__byokEpoch===__byokSelectionEpoch.current&&__byokDoc&&__byokDoc.ok&&String(__byokDoc.uid||"")===__byokUid){__byokActivatedSession.current=String(h||"");__byokSetSelectedUid(__byokUid)}}).catch(()=>{})}else{__byokSetSelectedUid("");__byokActivatedSession.current=String(h||"");fetch("http://127.0.0.1:6778/__byok/selected-model",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({uid:"",official:!0,officialUid:__byokUid,sessionId:String(h||""),src:"sessions-native-official"})}).catch(()=>{});h&&!Ws.getState().acp.pendingSwitchTarget?Ws.dispatch(_G({sessionId:h,configId:on,value:qo.modelUid})):Ws.dispatch(Yce({configId:on,value:qo.modelUid}))}if(Ge)' };
  return definition;
});
sessionsDefinitionsV3.splice(6, 0, {
  name: "picker-selection-deps",
  before: "[h,on,Ge]),Ti=",
  replacement: "[h,on,Ge,__byokNativeSnapshot]),Ti=",
});
const oldestSessionsEdits = materialize(sessionsDefinitionsV3, OLDEST_SESSIONS_MARKER);
const sessionsDefinitionsV4 = sessionsDefinitionsV3.map(definition => {
  if (definition.name !== "picker-effects") return definition;
  const oldActivation = '__byokActivatedSession.current=String(h);__byokSetSelectedUid(__byokDoc.uid?String(__byokDoc.uid):"")';
  const newActivation = 'let __byokEffectiveUid=String(__byokDoc.effectiveUid||__byokDoc.uid||__byokDoc.officialUid||"");__byokActivatedSession.current=String(h);__byokSetSelectedUid(__byokEffectiveUid);if(__byokDoc.official===!0&&__byokEffectiveUid&&String(tn||"")!==__byokEffectiveUid){h&&!Ws.getState().acp.pendingSwitchTarget?Ws.dispatch(_G({sessionId:h,configId:on,value:__byokEffectiveUid})):Ws.dispatch(Yce({configId:on,value:__byokEffectiveUid}))}';
  if (!definition.replacement.includes(oldActivation)) throw new Error("Sessions V4 activation anchor missing");
  return {
    ...definition,
    replacement: definition.replacement.replace(oldActivation, newActivation).replace(
      '[Ie,h,Zt,__byokRefreshTick]);',
      '[Ie,h,Zt,__byokRefreshTick,tn,on]);'
    ),
  };
});
const olderSessionsEdits = materialize(sessionsDefinitionsV4, OLDER_SESSIONS_MARKER);
const sessionsDefinitionsV5 = sessionsDefinitionsV4.map(definition => {
  if (definition.name === "picker-effects") {
    const oldActivation = 'if(__byokDoc.official===!0&&__byokEffectiveUid&&String(tn||"")!==__byokEffectiveUid){h&&!Ws.getState().acp.pendingSwitchTarget?Ws.dispatch(_G({sessionId:h,configId:on,value:__byokEffectiveUid})):Ws.dispatch(Yce({configId:on,value:__byokEffectiveUid}))}';
    const newActivation = 'if(__byokEffectiveUid&&String(tn||"")!==__byokEffectiveUid){h&&!Ws.getState().acp.pendingSwitchTarget?Ws.dispatch(_G({sessionId:h,configId:on,value:__byokEffectiveUid})):Ws.dispatch(Yce({configId:on,value:__byokEffectiveUid}))}';
    if (!definition.replacement.includes(oldActivation)) throw new Error("Sessions V5 activation anchor missing");
    return { ...definition, replacement: definition.replacement.replace(oldActivation, newActivation) };
  }
  if (definition.name === "picker-selection") {
    const oldAccepted = '__byokActivatedSession.current=String(h||"");__byokSetSelectedUid(__byokUid)';
    const newAccepted = '__byokActivatedSession.current=String(h||"");__byokSetSelectedUid(__byokUid);h&&!Ws.getState().acp.pendingSwitchTarget?Ws.dispatch(_G({sessionId:h,configId:on,value:__byokUid})):Ws.dispatch(Yce({configId:on,value:__byokUid}))';
    if (!definition.replacement.includes(oldAccepted)) throw new Error("Sessions V5 selection anchor missing");
    return { ...definition, replacement: definition.replacement.replace(oldAccepted, newAccepted) };
  }
  return definition;
});
const legacySessionsEdits = materialize(sessionsDefinitionsV5, LEGACY_SESSIONS_MARKER);
// V6 treats the provider response (configOptions[].currentValue), not Redux's
// optimistic clientSideConfigValues, as the ACP acknowledgement.  The native
// action is dispatched first; only an observed provider echo may persist the
// per-session bridge choice.  This keeps UI state, sessions.db and routing in
// the same order and makes rapid A -> B changes monotonic.
const sessionsDefinitionsV6 = sessionsDefinitionsV5.map(definition => {
  if (definition.name === "picker-state") {
    const oldState = '__byokActivationTick=(0,m.useRef)(-1)';
    const newState = '__byokActivationTick=(0,m.useRef)(-1),__byokPendingSelection=(0,m.useRef)(null),[__byokPendingTick,__byokSetPendingTick]=(0,m.useState)(0),__byokPersistQueue=(0,m.useRef)(Promise.resolve())';
    if (!definition.replacement.includes(oldState)) throw new Error("Sessions V6 state anchor missing");
    return { ...definition, replacement: definition.replacement.replace(oldState, newState) };
  }
  if (definition.name === "picker-effects") {
    const effectStart = '[Zt,In]=(0,m.useState)(!1),Mn=(0,m.useRef)(null);';
    const mountedEffect = effectStart + '(0,m.useEffect)(()=>{if(!Ie||!h)return;let __byokMountedSession=String(h);fetch("http://127.0.0.1:6778/__byok/native-picker-event",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({adapter:"sessions-v6",phase:"mounted",sessionId:__byokMountedSession})}).catch(()=>{});return()=>{let __byokPending=__byokPendingSelection.current;if(__byokPending&&__byokPending.sessionId===__byokMountedSession){if(__byokPending.timer)clearTimeout(__byokPending.timer);__byokPendingSelection.current=null}}},[Ie,h]);';
    const activationStart = '(0,m.useEffect)(()=>{if(!Ie||!h){__byokSetSelectedUid("");__byokActivatedSession.current="";return}';
    const activationStartV6 = '(0,m.useEffect)(()=>{if(!Ie||!h){__byokSetSelectedUid("");__byokActivatedSession.current="";return}if(__byokActivatedSession.current!==String(h))__byokSetSelectedUid("");';
    const oldActivation = 'let __byokEffectiveUid=String(__byokDoc.effectiveUid||__byokDoc.uid||__byokDoc.officialUid||"");__byokActivatedSession.current=String(h);__byokSetSelectedUid(__byokEffectiveUid);if(__byokEffectiveUid&&String(tn||"")!==__byokEffectiveUid){h&&!Ws.getState().acp.pendingSwitchTarget?Ws.dispatch(_G({sessionId:h,configId:on,value:__byokEffectiveUid})):Ws.dispatch(Yce({configId:on,value:__byokEffectiveUid}))}';
    const newActivation = 'let __byokEffectiveUid=String(__byokDoc.effectiveUid||__byokDoc.uid||__byokDoc.officialUid||"");if(!__byokEffectiveUid)return;let __byokPreviousPending=__byokPendingSelection.current;if(__byokPreviousPending&&__byokPreviousPending.timer)clearTimeout(__byokPreviousPending.timer);let __byokPending={epoch:__byokEpoch,uid:__byokEffectiveUid,sessionId:String(h),kind:"activate",bound:__byokDoc.official!==!0,timer:null};__byokPendingSelection.current=__byokPending;fetch("http://127.0.0.1:6778/__byok/native-picker-event",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({adapter:"sessions-v6",phase:"selection-requested",sessionId:__byokPending.sessionId,uid:__byokPending.uid,kind:__byokPending.kind})}).catch(()=>{});__byokPending.timer=setTimeout(()=>{if(__byokPendingSelection.current===__byokPending){__byokPendingSelection.current=null;fetch("http://127.0.0.1:6778/__byok/native-picker-event",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({adapter:"sessions-v6",phase:"acp-timeout",sessionId:__byokPending.sessionId,uid:__byokPending.uid,error:"provider currentValue did not confirm selection"})}).catch(()=>{})}},1e4);__byokSetPendingTick(__byokValue=>(__byokValue|0)+1);if(String(ae&&ae.currentValue||"")!==__byokEffectiveUid){h&&!Ws.getState().acp.pendingSwitchTarget?Ws.dispatch(_G({sessionId:h,configId:on,value:__byokEffectiveUid})):Ws.dispatch(Yce({configId:on,value:__byokEffectiveUid}))}';
    const activationDeps = '[Ie,h,Zt,__byokRefreshTick,tn,on]);';
    const confirmationEffect = '[Ie,h,Zt,__byokRefreshTick,on]);(0,m.useEffect)(()=>{let __byokPending=__byokPendingSelection.current,__byokConfirmedUid=String(ae&&ae.currentValue||"");if(!__byokPending||__byokPending.sessionId!==String(h||"")||!__byokConfirmedUid||__byokConfirmedUid!==__byokPending.uid)return;__byokPendingSelection.current=null;if(__byokPending.timer)clearTimeout(__byokPending.timer);fetch("http://127.0.0.1:6778/__byok/native-picker-event",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({adapter:"sessions-v6",phase:"acp-confirmed",sessionId:__byokPending.sessionId,uid:__byokPending.uid,kind:__byokPending.kind})}).catch(()=>{});if(__byokPending.kind==="activate"){if(__byokPending.epoch===__byokSelectionEpoch.current){__byokActivatedSession.current=__byokPending.sessionId;__byokSetSelectedUid(__byokPending.uid)}return}let __byokBody=__byokPending.bound?{uid:__byokPending.uid,sessionId:__byokPending.sessionId,src:"sessions-native-select"}:{uid:"",official:!0,officialUid:__byokPending.uid,sessionId:__byokPending.sessionId,src:"sessions-native-official"};__byokPersistQueue.current=__byokPersistQueue.current.catch(()=>{}).then(()=>fetch("http://127.0.0.1:6778/__byok/selected-model",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(__byokBody)})).then(__byokResponse=>__byokResponse.ok?__byokResponse.json():Promise.reject(Error("selected-model HTTP "+__byokResponse.status))).then(__byokDoc=>{if(!__byokDoc||!__byokDoc.ok)throw Error(String(__byokDoc&&__byokDoc.error||"selection persistence rejected"));if(__byokPending.epoch===__byokSelectionEpoch.current){__byokActivatedSession.current=__byokPending.sessionId;__byokSetSelectedUid(__byokPending.uid)}fetch("http://127.0.0.1:6778/__byok/native-picker-event",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({adapter:"sessions-v6",phase:"selection-persisted",sessionId:__byokPending.sessionId,uid:__byokPending.uid,kind:__byokPending.bound?"bound":"official"})}).catch(()=>{})}).catch(__byokError=>{fetch("http://127.0.0.1:6778/__byok/native-picker-event",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({adapter:"sessions-v6",phase:"persistence-failed",sessionId:__byokPending.sessionId,uid:__byokPending.uid,error:String(__byokError&&__byokError.message||__byokError)})}).catch(()=>{})})},[h,ae&&ae.currentValue,__byokPendingTick]);';
    let replacement = definition.replacement;
    for (const [before, after, label] of [[effectStart,mountedEffect,"mount"],[activationStart,activationStartV6,"activation-start"],[oldActivation,newActivation,"activation"],[activationDeps,confirmationEffect,"confirmation"]]) {
      if (!replacement.includes(before)) throw new Error("Sessions V6 " + label + " anchor missing");
      replacement = replacement.replace(before, after);
    }
    return { ...definition, replacement };
  }
  if (definition.name === "picker-selection") {
    return { ...definition, replacement: 'let ei=(0,m.useCallback)(qo=>{let __byokUid=String(qo&&qo.modelUid||""),__byokBoundSelection=!!(__byokNativeSnapshot&&__byokNativeSnapshot.boundUids&&typeof __byokNativeSnapshot.boundUids.has==="function"&&__byokNativeSnapshot.boundUids.has(__byokUid)),__byokEpoch=++__byokSelectionEpoch.current,__byokSessionId=String(h||"");if(__byokUid&&__byokSessionId){let __byokPreviousPending=__byokPendingSelection.current;if(__byokPreviousPending&&__byokPreviousPending.timer)clearTimeout(__byokPreviousPending.timer);let __byokPending={epoch:__byokEpoch,uid:__byokUid,sessionId:__byokSessionId,kind:"select",bound:__byokBoundSelection,timer:null};__byokPendingSelection.current=__byokPending;fetch("http://127.0.0.1:6778/__byok/native-picker-event",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({adapter:"sessions-v6",phase:"selection-requested",sessionId:__byokSessionId,uid:__byokUid,kind:__byokBoundSelection?"bound":"official"})}).catch(()=>{});__byokPending.timer=setTimeout(()=>{if(__byokPendingSelection.current===__byokPending){__byokPendingSelection.current=null;fetch("http://127.0.0.1:6778/__byok/native-picker-event",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({adapter:"sessions-v6",phase:"acp-timeout",sessionId:__byokSessionId,uid:__byokUid,error:"provider currentValue did not confirm selection"})}).catch(()=>{})}},1e4);__byokSetPendingTick(__byokValue=>(__byokValue|0)+1);h&&!Ws.getState().acp.pendingSwitchTarget?Ws.dispatch(_G({sessionId:h,configId:on,value:qo.modelUid})):Ws.dispatch(Yce({configId:on,value:qo.modelUid}))}if(Ge)' };
  }
  return definition;
});
const previousSessionsEdits = materialize(sessionsDefinitionsV6, PREVIOUS_SESSIONS_MARKER);

// V7 follows Devin Local's real lifecycle. For devin-cli/model, _G stores a
// client-side value and the host flushes session/set_config_option immediately
// before the prompt. Persist the bridge route under the same concrete session
// id at click time; do not wait for an immediate provider echo that the host
// deliberately does not send. Drafts still use native Yce and are bound once
// the host assigns an id. The request parser has a separate exact-wire fallback
// for the remount/first-message race, so no process-wide selection is needed.
const sessionsDefinitionsV7 = sessionsDefinitionsV5.map(definition => {
  if (definition.name === "picker-state") {
    const oldState = '__byokActivationTick=(0,m.useRef)(-1)';
    const newState = '__byokActivationTick=(0,m.useRef)(-1),__byokDraftSelection=(0,m.useRef)(null),__byokSkipActivationSession=(0,m.useRef)(""),__byokPersistQueue=(0,m.useRef)(Promise.resolve()),__byokPersistSelection=(0,m.useCallback)(__byokSelection=>{let __byokCascadeId="";try{let __byokState=Ws.getState();__byokCascadeId=String(__byokState.cascadeState?.cascadeId||__byokState.state?.cascadeState?.cascadeId||__byokState.acp?.cascadeState?.cascadeId||"")}catch(_){}let __byokBody=__byokSelection.bound?{uid:__byokSelection.uid,sessionId:__byokSelection.sessionId,cascadeId:__byokCascadeId,src:"sessions-native-select"}:{uid:"",official:!0,officialUid:__byokSelection.uid,sessionId:__byokSelection.sessionId,cascadeId:__byokCascadeId,src:"sessions-native-official"};__byokPersistQueue.current=__byokPersistQueue.current.catch(()=>{}).then(()=>fetch("http://127.0.0.1:6778/__byok/selected-model",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(__byokBody)})).then(async __byokResponse=>{let __byokDoc=null;try{__byokDoc=await __byokResponse.json()}catch(_){}if(!__byokResponse.ok||!__byokDoc||!__byokDoc.ok)throw Error(String(__byokDoc&&__byokDoc.error||"selected-model HTTP "+__byokResponse.status));fetch("http://127.0.0.1:6778/__byok/native-picker-event",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({adapter:"sessions-v7",phase:"selection-persisted",sessionId:__byokSelection.sessionId,uid:__byokSelection.uid,kind:__byokSelection.bound?"bound":"official"})}).catch(()=>{});return __byokDoc}).catch(__byokError=>{fetch("http://127.0.0.1:6778/__byok/native-picker-event",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({adapter:"sessions-v7",phase:"persistence-failed",sessionId:__byokSelection.sessionId,uid:__byokSelection.uid,error:String(__byokError&&__byokError.message||__byokError)})}).catch(()=>{})});return __byokPersistQueue.current},[])';
    if (!definition.replacement.includes(oldState)) throw new Error("Sessions V7 state anchor missing");
    return { ...definition, replacement: definition.replacement.replace(oldState, newState) };
  }
  if (definition.name === "picker-effects") {
    const effectStart = '[Zt,In]=(0,m.useState)(!1),Mn=(0,m.useRef)(null);';
    const lifecycleEffects = effectStart + '(0,m.useEffect)(()=>{if(!Ie)return;fetch("http://127.0.0.1:6778/__byok/native-picker-event",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({adapter:"sessions-v7",phase:"mounted",sessionId:String(h||"")})}).catch(()=>{})},[Ie,h]);(0,m.useEffect)(()=>{if(!Ie||!h)return;let __byokDraft=__byokDraftSelection.current;if(!__byokDraft||__byokDraft.sessionId)return;__byokDraft={...__byokDraft,sessionId:String(h),kind:"draft-bound"};__byokDraftSelection.current=null;__byokSkipActivationSession.current=String(h);__byokActivatedSession.current=String(h);__byokSetSelectedUid(__byokDraft.uid);Ws.dispatch(_G({sessionId:h,configId:on,value:__byokDraft.uid}));__byokPersistSelection(__byokDraft);fetch("http://127.0.0.1:6778/__byok/native-picker-event",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({adapter:"sessions-v7",phase:"draft-bound",sessionId:String(h),uid:__byokDraft.uid,kind:__byokDraft.bound?"bound":"official"})}).catch(()=>{})},[Ie,h,on,__byokPersistSelection]);';
    const activationStart = '(0,m.useEffect)(()=>{if(!Ie||!h){__byokSetSelectedUid("");__byokActivatedSession.current="";return}';
    const activationStartV7 = '(0,m.useEffect)(()=>{if(!Ie||!h){__byokSetSelectedUid("");__byokActivatedSession.current="";return}if(__byokSkipActivationSession.current===String(h)){__byokSkipActivationSession.current="";return}if(__byokActivatedSession.current!==String(h))__byokSetSelectedUid("");';
    let replacement = definition.replacement;
    for (const [before, after, label] of [[effectStart,lifecycleEffects,"lifecycle"],[activationStart,activationStartV7,"activation-start"]]) {
      if (!replacement.includes(before)) throw new Error("Sessions V7 " + label + " anchor missing");
      replacement = replacement.replace(before, after);
    }
    replacement = replacement.replace(
      'body:JSON.stringify({sessionId:String(h),activate:!0,src:"sessions-native-activate"})',
      'body:JSON.stringify({sessionId:String(h),cascadeId:(()=>{try{let __byokState=Ws.getState();return String(__byokState.cascadeState?.cascadeId||__byokState.state?.cascadeState?.cascadeId||__byokState.acp?.cascadeState?.cascadeId||"")}catch(_){return ""}})(),activate:!0,src:"sessions-native-activate"})'
    );
    return { ...definition, replacement };
  }
  if (definition.name === "picker-selection") {
    return { ...definition, replacement: 'let ei=(0,m.useCallback)(qo=>{let __byokUid=String(qo&&qo.modelUid||""),__byokBoundSelection=!!(__byokNativeSnapshot&&__byokNativeSnapshot.boundUids&&typeof __byokNativeSnapshot.boundUids.has==="function"&&__byokNativeSnapshot.boundUids.has(__byokUid)),__byokEpoch=++__byokSelectionEpoch.current,__byokSessionId=String(h||"");if(__byokUid){let __byokSelection={epoch:__byokEpoch,uid:__byokUid,sessionId:__byokSessionId,kind:__byokSessionId?"select":"draft",bound:__byokBoundSelection};__byokSetSelectedUid(__byokUid);if(__byokSessionId){__byokDraftSelection.current=null;__byokActivatedSession.current=__byokSessionId;__byokPersistSelection(__byokSelection)}else{__byokDraftSelection.current=__byokSelection;fetch("http://127.0.0.1:6778/__byok/native-picker-event",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({adapter:"sessions-v7",phase:"draft-staged",sessionId:"",uid:__byokUid,kind:__byokBoundSelection?"bound":"official"})}).catch(()=>{})}h&&!Ws.getState().acp.pendingSwitchTarget?Ws.dispatch(_G({sessionId:h,configId:on,value:qo.modelUid})):Ws.dispatch(Yce({configId:on,value:qo.modelUid}))}if(Ge)' };
  }
  if (definition.name === "picker-selection-deps") {
    const oldDeps = '[h,on,Ge,__byokNativeSnapshot]),Ti=';
    const newDeps = '[h,on,Ge,__byokNativeSnapshot,__byokPersistSelection]),Ti=';
    if (!definition.replacement.includes(oldDeps)) throw new Error("Sessions V7 selection deps anchor missing");
    return { ...definition, replacement: definition.replacement.replace(oldDeps, newDeps) };
  }
  return definition;
});
const sessionsDefinitionsV8 = sessionsDefinitionsV7.map(definition => {
  if (definition.name !== "context-effect") return definition;
  const before = 'timestampMs:Number(__byokSnap.timestampMs)||Date.now()})';
  const after = 'timestampMs:__byokSnap.cacheExpiryMode==="estimated"?(Number(__byokSnap.timestampMs)||Date.now()):null,cacheExpiryMode:String(__byokSnap.cacheExpiryMode||"upstream"),cacheTtlMs:Math.max(0,Number(__byokSnap.cacheTtlMs)||0)})';
  if (!definition.replacement.includes(before)) throw new Error("Sessions cache-status anchor missing");
  return { ...definition, replacement: definition.replacement.replace(before, after) };
});
sessionsDefinitionsV8.push(
  { name: "context-breakdown", before: 'A=oZl(p);return(0,_.jsx)(V5o,{tokensUsed:p.used,contextLimit:p.size,isRunning:k,isCreditBillingUser:y,isFreeModel:v,coloredEnabled:a,breakdown:A})', replacement: 'A=oZl(p);if(__byokCtxSnap&&A)A={...A,cacheExpiryMode:__byokCtxSnap.cacheExpiryMode,cacheTtlMs:__byokCtxSnap.cacheTtlMs};return(0,_.jsx)(V5o,{tokensUsed:p.used,contextLimit:p.size,isRunning:k,isCreditBillingUser:y,isFreeModel:v,coloredEnabled:a,breakdown:A})' },
  { name: "cache-timer", before: "Date.now()-O>=_Zn", replacement: "Date.now()-O>=(y?.cacheTtlMs||_Zn)" },
  { name: "cache-timer-stop", before: "Ae-O>=_Zn", replacement: "Ae-O>=(y?.cacheTtlMs||_Zn)" },
  { name: "cache-timer-deps", before: "clearInterval(Ie)}},[O]);let W=", replacement: "clearInterval(Ie)}},[O,y?.cacheTtlMs]);let W=" },
  { name: "cache-expiry-deps", before: "},[O,H]),j=y", replacement: "},[O,H,y?.cacheTtlMs]),j=y" },
  { name: "cache-expiry", before: "Ie>=_Zn?{expired:!0,secondsLeft:0}:{expired:!1,secondsLeft:Math.ceil((_Zn-Ie)/1e3)}", replacement: "Ie>=(y?.cacheTtlMs||_Zn)?{expired:!0,secondsLeft:0}:{expired:!1,secondsLeft:Math.ceil(((y?.cacheTtlMs||_Zn)-Ie)/1e3)}" },
  { name: "cache-breakdown", before: "X=j||(W?.expired??!1),ee=", replacement: "X=y?.cacheExpiryMode?!1:j||(W?.expired??!1),ee=" },
  { name: "cache-upstream-label", before: '):W?(0,_.jsx)("div",{className:"text-12",children:W.expired?', replacement: '):y?.cacheExpiryMode==="upstream"?(0,_.jsx)("div",{className:"text-12 text-text-secondary",children:"缓存由上游管理，过期时间未知"}):W?(0,_.jsx)("div",{className:"text-12",children:W.expired?' },
  { name: "cache-expiry-warning", before: '["Prompt cache has expired.",(0,_.jsx)("br",{}),"Higher cost expected."]', replacement: '["预计缓存有效期已过，实际命中以请求为准。"]' }
);
// 1.0.104 refreshed an already-mounted picker only when another bridge event
// happened.  Watch the small 6778 binding summary as well so adding, removing,
// or retargeting a binding invalidates the catalog in every open conversation.
const sessionsEditsV8Installed = materialize(sessionsDefinitionsV8, SESSIONS_MARKER);
const sessionsDefinitionsV9 = sessionsDefinitionsV8.map(definition => {
  if (definition.name === "picker-state") {
    const before = '__byokCatalogTick=(0,m.useRef)(-1)';
    const after = before + ',__byokCatalogSignature=(0,m.useRef)("")';
    if (!definition.replacement.includes(before)) throw new Error("Sessions binding poll state anchor missing");
    return { ...definition, replacement: definition.replacement.replace(before, after) };
  }
  if (definition.name === "picker-effects") {
    const before = '[Zt,In]=(0,m.useState)(!1),Mn=(0,m.useRef)(null);';
    const poll = before + '(0,m.useEffect)(()=>{if(!Ie){__byokCatalogSignature.current="";return}let __byokStopped=!1,__byokRunning=!1,__byokController=null,__byokDeadline=null,__byokPollTimer=null;let __byokPoll=()=>{if(__byokStopped||__byokRunning)return;__byokRunning=!0;__byokController=new AbortController();__byokDeadline=setTimeout(()=>__byokController.abort(),2e3);fetch("http://127.0.0.1:6778/__byok/bound-uids",{signal:__byokController.signal,cache:"no-store",credentials:"omit"}).then(__byokResponse=>__byokResponse.ok?__byokResponse.json():null).then(__byokDoc=>{if(__byokStopped||!__byokDoc||__byokDoc.armed!==!0)return;let __byokSignature=JSON.stringify([String(__byokDoc.defaultUid||""),Array.isArray(__byokDoc.uids)?__byokDoc.uids:[],Array.isArray(__byokDoc.slots)?__byokDoc.slots:[]]);if(__byokCatalogSignature.current&&__byokCatalogSignature.current!==__byokSignature)__byokSetRefreshTick(__byokValue=>(__byokValue|0)+1);__byokCatalogSignature.current=__byokSignature}).catch(()=>{}).finally(()=>{if(__byokDeadline!==null)clearTimeout(__byokDeadline);__byokDeadline=null;__byokController=null;__byokRunning=!1;if(!__byokStopped)__byokPollTimer=setTimeout(__byokPoll,1500)});};__byokPoll();return()=>{__byokStopped=!0;if(__byokPollTimer!==null)clearTimeout(__byokPollTimer);if(__byokDeadline!==null)clearTimeout(__byokDeadline);if(__byokController)__byokController.abort()}},[Ie]);';
    if (!definition.replacement.includes(before)) throw new Error("Sessions binding poll effect anchor missing");
    return { ...definition, replacement: definition.replacement.replace(before, poll) };
  }
  return definition;
});
// Register the actual ACP send with the local router. The picker can retain an
// old cascadeId after a conversation resumes, so selection-time IDs alone are
// insufficient. This hook uses the active ACP session and the submitted text.
const sessionsDefinitionsV10 = sessionsDefinitionsV9.map(definition => {
  if (definition.name !== "picker-state") return definition;
  const before = 'return __byokPersistQueue.current},[])';
  const after = 'try{let __byokWrites=window.__byokPickerWrites??=new Map;__byokWrites.set(String(__byokSelection.sessionId||""),__byokPersistQueue.current);while(__byokWrites.size>128)__byokWrites.delete(__byokWrites.keys().next().value)}catch(_){}return __byokPersistQueue.current},[])';
  if (!definition.replacement.includes(before)) throw new Error("Sessions prompt identity persistence anchor missing");
  return { ...definition, replacement: definition.replacement.replace(before, after) };
}).concat({
  name: "prompt-identity",
  before: 'return await r(p,{method:"session/prompt",params:y}),!0',
  replacement: 'if(String(a||"").startsWith("acp/devin-cli/")){let __byokPending=window.__byokPickerWrites?.get(String(a));if(__byokPending&&!(await __byokPending)?.ok)throw Error("模型选择保存失败，请重新选择后发送");let __byokPrompt=Array.isArray(v)?v.filter(__byokPart=>__byokPart&&__byokPart.type==="text"&&typeof __byokPart.text==="string").map(__byokPart=>__byokPart.text):typeof v==="string"?v:[],__byokAbort=new AbortController(),__byokDeadline=setTimeout(()=>__byokAbort.abort(),3000);try{let __byokResponse=await fetch("http://127.0.0.1:6778/__byok/prompt-identity",{method:"POST",signal:__byokAbort.signal,cache:"no-store",credentials:"omit",headers:{"content-type":"application/json"},body:JSON.stringify({sessionId:String(a),prompt:__byokPrompt})}),__byokResult=await __byokResponse.json();if(!__byokResponse.ok||!__byokResult||__byokResult.ok!==!0)throw Error("模型会话关联失败："+String(__byokResult&&__byokResult.reason||"local bridge unavailable"))}finally{clearTimeout(__byokDeadline)}}return await r(p,{method:"session/prompt",params:y}),!0'
});
// 1.0.102 briefly shipped a wider cascade-id lookup while retaining the V7
// marker.  Keep an exact recipe for that installed shape so a 1.0.98-based
// build can validate and remove it transactionally before applying its own
// adapter.  These definitions are compatibility-only; they are never used as
// the adapter installed by this build.
function buildV102CascadeCompatibility(definitions) {
  const findCascadeIds = '__byokFindCascadeIds=(s=>{let a=new Set,r=new Set,q=[{v:null,rel:!1,d:0}],seen=new Set;try{q[0].v=Ws.getState()}catch(_){}while(q.length){let x=q.shift(),v=x.v;if(!v||typeof v!=="object"||x.d>7||seen.has(v))continue;seen.add(v);let ks=Object.keys(v).slice(0,300),rel=x.rel;for(let k of ks){let z=v[k];if(typeof z==="string"&&(/session.?id|conversation.?id/.test(String(k).toLowerCase()))&&String(z)===String(s))rel=!0}for(let k of ks){let z=v[k],lk=String(k).toLowerCase();if(typeof z==="string"){if(/cascade.?id/.test(lk)&&z.trim())(rel?r:a).add(z.trim())}else if(z&&typeof z==="object")q.push({v:z,rel:rel||String(k)===String(s),d:x.d+1})}}return Array.from(r.size?r:a).slice(0,16)}),';
  return definitions.map(definition => {
    if (definition.name === "picker-state") {
      let replacement = definition.replacement;
      const persistAnchor = '__byokPersistSelection=(0,m.useCallback)';
      const directLookup = 'let __byokCascadeId="";try{let __byokState=Ws.getState();__byokCascadeId=String(__byokState.cascadeState?.cascadeId||__byokState.state?.cascadeState?.cascadeId||__byokState.acp?.cascadeState?.cascadeId||"")}catch(_){}';
      const recursiveLookup = 'let __byokCascadeIds=__byokFindCascadeIds(String(__byokSelection.sessionId||"")),';
      const selectionEvent = 'kind:__byokSelection.bound?"bound":"official"})';
      if (!replacement.includes(persistAnchor) || !replacement.includes(directLookup) || !replacement.includes(selectionEvent)) {
        throw new Error("Sessions 1.0.102 compatibility state anchor missing");
      }
      replacement = replacement
        .replace(persistAnchor, findCascadeIds + persistAnchor)
        .replace(directLookup, recursiveLookup)
        .replace(',let __byokBody=', ',__byokBody=')
        .replaceAll(',cascadeId:__byokCascadeId', ',cascadeIds:__byokCascadeIds,cascadeId:__byokCascadeIds[0]||""')
        .replace(selectionEvent, 'kind:__byokSelection.bound?"bound":"official",cascadeIds:__byokCascadeIds})');
      return { ...definition, replacement };
    }
    if (definition.name === "picker-effects") {
      const directActivation = 'body:JSON.stringify({sessionId:String(h),cascadeId:(()=>{try{let __byokState=Ws.getState();return String(__byokState.cascadeState?.cascadeId||__byokState.state?.cascadeState?.cascadeId||__byokState.acp?.cascadeState?.cascadeId||"")}catch(_){return ""}})(),activate:!0,src:"sessions-native-activate"})';
      const recursiveActivation = 'body:JSON.stringify({sessionId:String(h),cascadeIds:__byokFindCascadeIds(String(h||"")),activate:!0,src:"sessions-native-activate"})';
      if (!definition.replacement.includes(directActivation)) throw new Error("Sessions 1.0.102 compatibility activation anchor missing");
      return { ...definition, replacement: definition.replacement.replace(directActivation, recursiveActivation) };
    }
    return definition;
  });
}
const sessionsDefinitionsV7From102 = buildV102CascadeCompatibility(sessionsDefinitionsV7);
const sessionsDefinitionsV8From102 = buildV102CascadeCompatibility(sessionsDefinitionsV8);
const sessionsEditsV9Installed = materialize(sessionsDefinitionsV9, SESSIONS_MARKER);
const sessionsEdits = materialize(sessionsDefinitionsV10, SESSIONS_MARKER);
const sessionsEditsV8From102 = materialize(sessionsDefinitionsV8From102, SESSIONS_MARKER);
const sessionsEditsV7Installed = materialize(sessionsDefinitionsV7, SESSIONS_MARKER);
const sessionsEditsV7From102 = materialize(sessionsDefinitionsV7From102, SESSIONS_MARKER);
// Existing 1.0.75 installs already carry the V7 marker but predate the
// cascadeId payload. Keep an exact removal recipe so the next activation can
// upgrade that installed adapter instead of treating it as a corrupt patch.
const sessionsDefinitionsV7BeforeCascade = sessionsDefinitionsV7.map(definition => {
  if (definition.name === "picker-state") {
    return { ...definition, replacement: definition.replacement
      .replace('let __byokCascadeId="";try{let __byokState=Ws.getState();__byokCascadeId=String(__byokState.cascadeState?.cascadeId||__byokState.state?.cascadeState?.cascadeId||__byokState.acp?.cascadeState?.cascadeId||"")}catch(_){}', "")
      .replaceAll(',cascadeId:__byokCascadeId', "") };
  }
  if (definition.name === "picker-effects") {
    return { ...definition, replacement: definition.replacement.replace(
      'body:JSON.stringify({sessionId:String(h),cascadeId:(()=>{try{let __byokState=Ws.getState();return String(__byokState.cascadeState?.cascadeId||__byokState.state?.cascadeState?.cascadeId||__byokState.acp?.cascadeState?.cascadeId||"")}catch(_){return ""}})(),activate:!0,src:"sessions-native-activate"})',
      'body:JSON.stringify({sessionId:String(h),activate:!0,src:"sessions-native-activate"})'
    ) };
  }
  return definition;
});
const sessionsEditsV7BeforeCascade = materialize(sessionsDefinitionsV7BeforeCascade, SESSIONS_MARKER);

// Editor windows import a separate shipped chat client. It coexists with the
// Sessions application; the existence of one bundle says nothing about the other.
const EDITOR_MARKER = "BYOK_NATIVE_PICKER_EDITOR_V5";
const PREVIOUS_EDITOR_MARKER = "BYOK_NATIVE_PICKER_EDITOR_V4";
const LEGACY_EDITOR_MARKER = "BYOK_NATIVE_PICKER_EDITOR_V3";
const OLDER_EDITOR_MARKER = "BYOK_NATIVE_PICKER_EDITOR_V2";
const OLDEST_EDITOR_MARKER = "BYOK_NATIVE_PICKER_EDITOR_V1";
const NEXT_310_EDITOR_MARKER = "BYOK_NATIVE_PICKER_EDITOR_NEXT_310";
function renameAdapterIdentifiers(source, names) {
  return source.replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[A-Za-z_$][\w$]*/g,
    token => Object.prototype.hasOwnProperty.call(names, token) ? names[token] : token);
}
const editorNames = { m:"tZ", Ie:"E", Zt:"F", In:"q", Mn:"J", h:"i", Wj:"c8",
  gt:"I", $e:"k", Rt:"M", Dt:"R", yt:"O", ae:"_", qo:"e", ut:"L", A9e:"ncW", Kt:"P",
  tn:"U", Iot:"nFA", on:"N", Bt:"D", sn:"B", bn:"j", ei:"W", Ws:"e$n", _G:"eL_", Yce:"eLv", Ge:"b", Ti:"Y" };
// Both bundles ship the same behavior with different minifier spellings.
const editorContextNames = {m:"tZ", Pns:"ndt", r:"e", o:"t", a:"n", p:"r", h:"i", Lh:"tCS", m5t:"tCO", wns:"nuS", Sa:"tCk", O:"t", w:"o", Kl:"Pv", y:"s", MTr:"exQ"};
function buildEditorDefinitions(sessionDefinitions) {
  const definitions = sessionDefinitions.filter(d => !d.name.startsWith("context-")).map(d => {
    if (d.name.startsWith("cache-")) {
      if (d.name === "cache-breakdown") return { name:d.name, before:"f=h||(p?.expired??!1),C=", replacement:"f=s?.cacheExpiryMode?!1:h||(p?.expired??!1),C=" };
      if (d.name === "cache-timer") return { name:d.name, before:"Date.now()-u>=nu1", replacement:"Date.now()-u>=(s?.cacheTtlMs||nu1)" };
      if (d.name === "cache-timer-stop") return { name:d.name, before:"t-u>=nu1", replacement:"t-u>=(s?.cacheTtlMs||nu1)" };
      if (d.name === "cache-timer-deps") return { name:d.name, before:"clearInterval(e)}},[u]);let p=", replacement:"clearInterval(e)}},[u,s?.cacheTtlMs]);let p=" };
      if (d.name === "cache-expiry-deps") return { name:d.name, before:"},[u,d]),h=null", replacement:"},[u,d,s?.cacheTtlMs]),h=null" };
      if (d.name === "cache-expiry") return { name:d.name, before:"e>=nu1?{expired:!0,secondsLeft:0}:{expired:!1,secondsLeft:Math.ceil((nu1-e)/1e3)}", replacement:"e>=(s?.cacheTtlMs||nu1)?{expired:!0,secondsLeft:0}:{expired:!1,secondsLeft:Math.ceil(((s?.cacheTtlMs||nu1)-e)/1e3)}" };
      if (d.name === "cache-ttl") return { name:d.name, before:"let nu1=3e5,nu0=", replacement:"let nu1=3e5,nu0=" };
      const translate = value => value.replaceAll("_Zn", "nu1").replaceAll("ZQl", "nu0")
        .replaceAll("y?.cacheExpiryMode", "s?.cacheExpiryMode")
        .replaceAll("X=j", "f=h").replaceAll("ee=", "C=")
        .replaceAll("W?.expired", "p?.expired").replaceAll('):W?', '):p?')
        .replaceAll('children:W.expired?', 'children:p.expired?')
        .replaceAll("(0,_.jsx)", "(0,tX.jsx)");
      return { name:d.name, before:translate(d.before), replacement:translate(d.replacement) };
    }
    if (d.name === "picker-state") {
      const state = d.replacement.slice(d.replacement.indexOf("[__byokNativeSnapshot"), d.replacement.indexOf(",{unacknowledgedModelUids"));
      return { name:d.name, before:"{unacknowledgedModelUids:S}=nug()", replacement:renameAdapterIdentifiers(state,editorNames)+",{unacknowledgedModelUids:S}=nug()" };
    }
    const before = renameAdapterIdentifiers(d.before, editorNames);
    return {name:d.name, before, replacement:renameAdapterIdentifiers(d.replacement,editorNames).replaceAll('"sessions-v6"','"editor-v4"').replaceAll('"sessions-v7"','"editor-v5"')};
  });
  for (const d of sessionDefinitions.filter(d => d.name.startsWith("context-"))) {
    if (d.name === "context-breakdown") {
      const before = 'c=nde(r);return(0,tX.jsx)(nu3,{tokensUsed:r.used,contextLimit:r.size,isRunning:l,isCreditBillingUser:s,isFreeModel:a,coloredEnabled:n,breakdown:c})';
      const replacement = before.replace('c=nde(r);return', 'c=nde(r);if(__byokCtxSnap&&c)c={...c,cacheExpiryMode:__byokCtxSnap.cacheExpiryMode,cacheTtlMs:__byokCtxSnap.cacheTtlMs};return');
      definitions.push({name:d.name,before,replacement});
      continue;
    }
    definitions.push({name:d.name,
      before: d.name === "context-state" ? 'ndt=(0,tZ.memo)(()=>{let e=tCS(),t=tCO(),n=nuS(),r=tCk(t=>e?t.acp.perSession[e]?.contextUsage:void 0),i=' : '{userStatus:o}=Pv(),s=exQ(o?.planStatus?.planInfo);if(!r||0===r.size)return null;',
      replacement:renameAdapterIdentifiers(d.replacement,editorContextNames)});
  }
  return definitions;
}
const oldestEditorDefinitions = buildEditorDefinitions(sessionsDefinitionsV3);
const oldestEditorEdits = materialize(oldestEditorDefinitions, OLDEST_EDITOR_MARKER);
const olderEditorDefinitions = buildEditorDefinitions(sessionsDefinitionsV4);
const olderEditorEdits = materialize(olderEditorDefinitions, OLDER_EDITOR_MARKER);
const legacyEditorDefinitions = buildEditorDefinitions(sessionsDefinitionsV5);
const legacyEditorEdits = materialize(legacyEditorDefinitions, LEGACY_EDITOR_MARKER);
const previousEditorDefinitions = buildEditorDefinitions(sessionsDefinitionsV6);
const previousEditorEdits = materialize(previousEditorDefinitions, PREVIOUS_EDITOR_MARKER);
const editorDefinitions = buildEditorDefinitions(sessionsDefinitionsV9);
// Some Remote SSH ACP hosts create a Devin Local session without returning
// configOptions when the optional Cascade registry (:6678) is unavailable.
// The native composer then has no model/mode rows to mount. Seed only the
// Local bridge path; the existing picker adapter fills the model options from
// 6778 once the row exists.
const fallbackBefore = 'if(!("title"in o)||void 0===o.title){';
const fallbackUnconditional = 'try{let __byokConfigIds=new Set((o.configOptions||[]).map(__byokConfig=>String(__byokConfig&&__byokConfig.id||"")));if(!__byokConfigIds.has("model"))o.configOptions.push({id:"model",category:"model",name:"Model",type:"select",currentValue:"",options:[]});if(!__byokConfigIds.has("mode"))o.configOptions.push({id:"mode",name:"Mode",type:"select",currentValue:"plan",options:[{value:"plan",name:"Plan"},{value:"code",name:"Code"}]})}catch(_){}if(!("title"in o)||void 0===o.title){';
const fallbackConditional = 'try{let __byokLocalFallback=(typeof globalThis!=="undefined"&&(globalThis.__BYOK_LOCAL_LIVE===true||globalThis.__BYOK_BOUND_LIVE===true||globalThis.__BYOK_PICKER_MODE==="local"));if(__byokLocalFallback){let __byokConfigIds=new Set((o.configOptions||[]).map(__byokConfig=>String(__byokConfig&&__byokConfig.id||"")));if(!__byokConfigIds.has("model"))o.configOptions.push({id:"model",category:"model",name:"Model",type:"select",currentValue:"",options:[]});if(!__byokConfigIds.has("mode"))o.configOptions.push({id:"mode",name:"Mode",type:"select",currentValue:"plan",options:[{value:"plan",name:"Plan"},{value:"code",name:"Code"}]})}}catch(_){}if(!("title"in o)||void 0===o.title){';
const fallbackUnconditionalLegacy = fallbackUnconditional.replace('category:"model",','');
const fallbackConditionalLegacy = fallbackConditional.replace('category:"model",','');
editorDefinitions.push({ name: "local-config-options-fallback", before: fallbackBefore, replacement: fallbackUnconditional });
const sessionNewOptions = 'o.configOptions&&(a.configOptions=(0,eo9.normalizeConfigOptionsToV1)(o.configOptions))';
const sessionNewOptionsPatched = 'o.configOptions&&(a.configOptions=(0,eo9.normalizeConfigOptionsToV1)(o.configOptions),a.configOptions.some(e=>"model"===e.id)||a.configOptions.push({id:"model",category:"model",name:"Model",type:"select",currentValue:"",options:[]}),a.configOptions.some(e=>"mode"===e.id)||a.configOptions.push({id:"mode",name:"Mode",type:"select",currentValue:"plan",options:[{value:"plan",name:"Plan"},{value:"code",name:"Code"}]}))';
editorDefinitions.push({ name: "session-new-config-options-existing", before: sessionNewOptions, replacement: sessionNewOptionsPatched });
const sessionNewOptionsNew = 'o.configOptions&&(n.configOptions=(0,eo9.normalizeConfigOptionsToV1)(o.configOptions))';
const sessionNewOptionsNewPatched = 'o.configOptions&&(n.configOptions=(0,eo9.normalizeConfigOptionsToV1)(o.configOptions),n.configOptions.some(e=>"model"===e.id)||n.configOptions.push({id:"model",category:"model",name:"Model",type:"select",currentValue:"",options:[]}),n.configOptions.some(e=>"mode"===e.id)||n.configOptions.push({id:"mode",name:"Mode",type:"select",currentValue:"plan",options:[{value:"plan",name:"Plan"},{value:"code",name:"Code"}]}))';
editorDefinitions.push({ name: "session-new-config-options-new", before: sessionNewOptionsNew, replacement: sessionNewOptionsNewPatched });
const providerPrefetch = 'let t=(0,eo9.normalizeConfigOptionsToV1)(m.configOptions??[]);n(eLw({providerId:e,configOptions:t}))';
const providerPrefetchPatched = 'let t=(0,eo9.normalizeConfigOptionsToV1)(m.configOptions??[]);t.some(e=>"model"===e.id)||t.push({id:"model",category:"model",name:"Model",type:"select",currentValue:"",options:[]}),t.some(e=>"mode"===e.id)||t.push({id:"mode",name:"Mode",type:"select",currentValue:"plan",options:[{value:"plan",name:"Plan"},{value:"code",name:"Code"}]}),n(eLw({providerId:e,configOptions:t}))';
editorDefinitions.push({ name: "provider-config-options-prefetch", before: providerPrefetch, replacement: providerPrefetchPatched });
// An SSH connector may be listed before its ACP process has supplied any
// config options. The composer reads the empty provider cache in that state,
// so session creation and prefetch fallbacks have no opportunity to run yet.
// Only seed the missing rows for a selected Devin connector on an SSH host.
const editorEditsV5BeforeSsh = materialize(editorDefinitions, EDITOR_MARKER);
// Exact 1.0.102 Editor recipe.  It paired the wider cascade lookup above with
// a single SSH composer fallback instead of the four 1.0.98 fallback edits.
const composerConfigSelectorFrom102 = 'let nc4=[];function nc5(){let e=tCR(),t=t6E(),n=tCk(e=>null!==e.acp.pendingSwitchTarget),r=tCk(e=>e.acp.cachedConfigOptionsByProvider[t]);return n?r??e??nc4:e?.length?e:r??nc4}';
const composerConfigSelectorPatchedFrom102 = 'let nc4=[];const __byokSshFallbackOptions=[{id:"model",category:"model",name:"Model",type:"select",currentValue:"",options:[]},{id:"mode",name:"Mode",type:"select",currentValue:"plan",options:[{value:"plan",name:"Plan"},{value:"code",name:"Code"}]}];function nc5(){let e=tCR(),t=t6E(),n=tCk(e=>null!==e.acp.pendingSwitchTarget),r=tCk(e=>e.acp.cachedConfigOptionsByProvider[t]),i=n?r??e??nc4:e?.length?e:r??nc4,o=tCW().find(e=>e&&e.id===t),a=!!(o&&o.location&&("ssh"===o.location.kind||"ssh-remote"===o.location.kind));if(!a||!eT8(t))return i;let s=Array.isArray(i)?i.slice():[],l=new Set(s.map(e=>String(e&&e.id||"")));if(l.has("model")&&l.has("mode"))return i;return l.has("model")||s.push(__byokSshFallbackOptions[0]),l.has("mode")||s.push(__byokSshFallbackOptions[1]),s}';
// In a Remote SSH window the selected connector can still have kind="local":
// it is local to the remote extension host. Read the chat client's own remote
// context instead of assuming that every SSH workspace uses a kind="ssh"
// connector (that kind belongs to the separate RemoteHosts feature).
const composerConfigSelectorRemoteContext = composerConfigSelectorPatchedFrom102.replace(
  'if(!a||!eT8(t))return i;',
  'let c=MD(),h=!!(c&&c.isRemoteConnection&&String(c.remoteName||"").startsWith("ssh-remote"));if(!(a||h)||!eT8(t))return i;'
);
const editorEditsV5BeforeRemoteContext = materialize([
  ...editorDefinitions,
  { name: "composer-config-selector-fallback", before: composerConfigSelectorFrom102, replacement: composerConfigSelectorPatchedFrom102 },
], EDITOR_MARKER);
editorDefinitions.push({ name: "composer-config-selector-fallback", before: composerConfigSelectorFrom102, replacement: composerConfigSelectorRemoteContext });
const editorEdits = materialize(editorDefinitions, EDITOR_MARKER);

// Devin Next 3.10.1035 (internal 1.126.0-next) changed both minified picker
// bundles. Keep a separate, exact recipe: older installations retain their
// existing adapters, and a later Devin update fails closed if an anchor moves.
const next310SessionNames = { Ie:"_e", Ge:"ze", ze:"Ge", ut:"dt", q:"V",
  IL:"wL", PW:"RW", $ce:"Yce", IZn:"_Zn", Ws:"Ws", _G:"IG", Yce:"Xce", Wj:"Hj" };
const next310EditorNames = { nug:"nub", ncW:"nc0", nFA:"nFO",
  "e$n":"e$o", "eL_":"eLA", eLv:"eLb" };
const next310PickerNames = new Set([
  "picker-state", "picker-rows", "picker-row-deps", "picker-selected-value",
  "picker-effects", "picker-selection", "picker-selection-deps",
]);
const next310SessionDefinitionsInstalled = sessionsDefinitionsV9.filter(d => next310PickerNames.has(d.name)).map(d => {
  const replacement = renameAdapterIdentifiers(d.replacement, next310SessionNames);
  if (d.name === "picker-state") {
    const inserted = replacement.slice(replacement.indexOf("[__byokNativeSnapshot"), replacement.indexOf(",{unacknowledgedModelUids"));
    if (!inserted.startsWith("[__byokNativeSnapshot") || inserted.length < 100) throw new Error("Devin Next Sessions state recipe is incomplete");
    const before = "{unacknowledgedModelUids:ot}=_Zn()";
    return { name:d.name, before, replacement:inserted + "," + before };
  }
  if (d.name === "picker-rows") return { name:d.name,
    before:"gt=_e?$e:void 0,Rt=_e,Dt=_e&&$e.length>0,yt=(0,m.useMemo)(()=>{if(!ae)return[];if(Dt){",
    replacement };
  if (d.name === "picker-row-deps") return { name:d.name, before:"[dt,ae,Dt,$e]),Kt=", replacement };
  if (d.name === "picker-selection") return { name:d.name,
    before:"let ei=(0,m.useCallback)(qo=>{if(h&&!Ws.getState().acp.pendingSwitchTarget?Ws.dispatch(IG({sessionId:h,configId:on,value:qo.modelUid})):Ws.dispatch(Xce({configId:on,value:qo.modelUid})),ze)",
    replacement };
  if (d.name === "picker-selection-deps") return { name:d.name, before:"[h,on,ze]),Ti=", replacement };
  return { name:d.name, before:d.before, replacement };
});
const next310SessionDefinitions = next310SessionDefinitionsInstalled.map(definition => {
  if (definition.name !== "picker-state") return definition;
  const before = 'return __byokPersistQueue.current},[])';
  const after = 'try{let __byokWrites=window.__byokPickerWrites??=new Map;__byokWrites.set(String(__byokSelection.sessionId||""),__byokPersistQueue.current);while(__byokWrites.size>128)__byokWrites.delete(__byokWrites.keys().next().value)}catch(_){}return __byokPersistQueue.current},[])';
  if (!definition.replacement.includes(before)) throw new Error("Devin Next Sessions prompt identity anchor missing");
  return { ...definition, replacement: definition.replacement.replace(before, after) };
}).concat(sessionsDefinitionsV10.find(definition => definition.name === "prompt-identity"));
const next310EditorDefinitionsInstalled = editorDefinitions.filter(d => next310PickerNames.has(d.name)).map(d => {
  const before = renameAdapterIdentifiers(d.before, next310EditorNames);
  const replacement = renameAdapterIdentifiers(d.replacement, next310EditorNames);
  if (d.name === "picker-selection") return { name:d.name,
    before:"let W=(0,tZ.useCallback)(e=>{if(i&&!e$o.getState().acp.pendingSwitchTarget?e$o.dispatch(eLA({sessionId:i,configId:N,value:e.modelUid})):e$o.dispatch(eLb({configId:N,value:e.modelUid})),b)",
    replacement };
  return { name:d.name, before, replacement };
});
// Next 3.10 renamed the composer selector independently of the model picker.
// Keep the verified seven-edit recipe available for upgrades, and seed rows
// before an SSH connector has returned session/new config options.
const next310ComposerNames = { nc4:"nue", nc5:"nut", tCR:"tCD", t6E:"t6x",
  tCk:"tCI", tCW:"tCZ", eT8:"eT9" };
const next310EditorDefinitionsWithModeFallback = next310EditorDefinitionsInstalled.concat({
  name: "composer-config-selector-fallback",
  before: renameAdapterIdentifiers(composerConfigSelectorFrom102, next310ComposerNames),
  replacement: renameAdapterIdentifiers(composerConfigSelectorRemoteContext, next310ComposerNames),
});
// Model rows can be supplied by the BYOK catalog. Modes must come from the
// selected ACP provider: retain its IDs, labels, defaults, and native handlers.
const composerConfigSelectorNativeModes = 'let nc4=[];const __byokSshFallbackOptions=[{id:"model",category:"model",name:"Model",type:"select",currentValue:"",options:[]}];function nc5(){let e=tCR(),t=t6E(),n=tCk(e=>null!==e.acp.pendingSwitchTarget),r=tCk(e=>e.acp.cachedConfigOptionsByProvider[t]),i=n?r??e??nc4:e?.length?e:r??nc4,o=tCW().find(e=>e&&e.id===t),a=!!(o&&o.location&&("ssh"===o.location.kind||"ssh-remote"===o.location.kind)),c=MD(),h=!!(c&&c.isRemoteConnection&&String(c.remoteName||"").startsWith("ssh-remote"));if(!(a||h)||!eT8(t))return i;return Array.isArray(i)&&i.some(e=>e&&"select"===e.type&&("model"===e.category||"model"===e.id))?i:[...(Array.isArray(i)?i:[]),__byokSshFallbackOptions[0]]}';
const next310EditorDefinitions = next310EditorDefinitionsInstalled.concat({
  name: "composer-config-selector-fallback",
  before: renameAdapterIdentifiers(composerConfigSelectorFrom102, next310ComposerNames),
  replacement: renameAdapterIdentifiers(composerConfigSelectorNativeModes, next310ComposerNames),
});
const next310SessionEditsInstalled = materialize(next310SessionDefinitionsInstalled, NEXT_310_SESSIONS_MARKER);
const next310SessionEdits = materialize(next310SessionDefinitions, NEXT_310_SESSIONS_MARKER);
const next310EditorEdits = materialize(next310EditorDefinitions, NEXT_310_EDITOR_MARKER);
const next310EditorEditsInstalled = materialize(next310EditorDefinitionsInstalled, NEXT_310_EDITOR_MARKER);
const next310EditorPriorRecipes = [
  materialize(next310EditorDefinitionsWithModeFallback, NEXT_310_EDITOR_MARKER),
  next310EditorEditsInstalled,
];

const next311Profiles = require("./native-picker-next-311.cjs").buildProfiles(
  sessionsDefinitionsV10, renameAdapterIdentifiers, materialize);

function exactPriorRecipe(code, marker, priorEdits) {
  const candidates = Array.isArray(priorEdits[0]) ? priorEdits : [priorEdits];
  for (const candidate of candidates) {
    try { validateSessionsPatched(code, marker, candidate); return candidate; }
    catch {}
  }
  throw new Error("Devin Next prior picker patch is incomplete or incompatible");
}

function patchExactNext310(code, marker, edits, priorEdits = null) {
  if (code.includes(marker)) {
    try {
      validateSessionsPatched(code, marker, edits);
      return { changed:false, code };
    } catch (error) {
      if (!priorEdits) throw error;
      const previous = exactPriorRecipe(code, marker, priorEdits);
      for (const edit of previous) code = code.replace(edit.after, edit.before);
      if (code.includes(marker)) throw new Error("Devin Next prior picker removal verification failed");
    }
  }
  for (const edit of edits) if (count(code, edit.before) !== 1) {
    throw new Error("Devin Next 3.10 picker compatibility check failed: " + edit.name);
  }
  for (const edit of edits) code = code.replace(edit.before, edit.after);
  validateSessionsPatched(code, marker, edits);
  return { changed:true, code };
}
function unpatchExactNext310(code, marker, edits, priorEdits = null) {
  if (!code.includes(marker)) return { changed:false, code };
  try { validateSessionsPatched(code, marker, edits); }
  catch (error) {
    if (!priorEdits) throw error;
    edits = exactPriorRecipe(code, marker, priorEdits);
  }
  for (const edit of edits) code = code.replace(edit.after, edit.before);
  if (code.includes(marker)) throw new Error("Devin Next picker removal verification failed");
  return { changed:true, code };
}
const editorDefinitionsV5From102 = buildEditorDefinitions(sessionsDefinitionsV8From102);
editorDefinitionsV5From102.push({ name: "composer-config-selector-fallback", before: composerConfigSelectorFrom102, replacement: composerConfigSelectorPatchedFrom102 });
const editorEditsV5From102 = materialize(editorDefinitionsV5From102, EDITOR_MARKER);
const editorDefinitionsV5ConditionalFallback = buildEditorDefinitions(sessionsDefinitionsV8);
editorDefinitionsV5ConditionalFallback.push({ name: "local-config-options-fallback", before: fallbackBefore, replacement: fallbackConditional });
const editorEditsV5ConditionalFallback = materialize(editorDefinitionsV5ConditionalFallback, EDITOR_MARKER);
const editorDefinitionsV5UnconditionalFallback = buildEditorDefinitions(sessionsDefinitionsV8);
editorDefinitionsV5UnconditionalFallback.push({ name: "local-config-options-fallback", before: fallbackBefore, replacement: fallbackUnconditional });
const editorEditsV5UnconditionalFallback = materialize(editorDefinitionsV5UnconditionalFallback, EDITOR_MARKER);
const editorDefinitionsV5SessionFallback = buildEditorDefinitions(sessionsDefinitionsV8);
editorDefinitionsV5SessionFallback.push({ name: "local-config-options-fallback", before: fallbackBefore, replacement: fallbackUnconditional });
editorDefinitionsV5SessionFallback.push({ name: "session-new-config-options-existing", before: sessionNewOptions, replacement: sessionNewOptionsPatched });
editorDefinitionsV5SessionFallback.push({ name: "session-new-config-options-new", before: sessionNewOptionsNew, replacement: sessionNewOptionsNewPatched });
const editorEditsV5SessionFallback = materialize(editorDefinitionsV5SessionFallback, EDITOR_MARKER);
const editorDefinitionsV5ProviderPrefetch = buildEditorDefinitions(sessionsDefinitionsV8);
editorDefinitionsV5ProviderPrefetch.push({ name: "local-config-options-fallback", before: fallbackBefore, replacement: fallbackUnconditional });
editorDefinitionsV5ProviderPrefetch.push({ name: "session-new-config-options-existing", before: sessionNewOptions, replacement: sessionNewOptionsPatched });
editorDefinitionsV5ProviderPrefetch.push({ name: "session-new-config-options-new", before: sessionNewOptionsNew, replacement: sessionNewOptionsNewPatched });
editorDefinitionsV5ProviderPrefetch.push({ name: "provider-config-options-prefetch", before: providerPrefetch, replacement: providerPrefetchPatched });
const editorEditsV5ProviderPrefetch = materialize(editorDefinitionsV5ProviderPrefetch, EDITOR_MARKER);
const editorDefinitionsV5ProviderPrefetchLegacy = buildEditorDefinitions(sessionsDefinitionsV8);
editorDefinitionsV5ProviderPrefetchLegacy.push({ name: "local-config-options-fallback", before: fallbackBefore, replacement: fallbackUnconditionalLegacy });
editorDefinitionsV5ProviderPrefetchLegacy.push({ name: "session-new-config-options-existing", before: sessionNewOptions, replacement: sessionNewOptionsPatched.replace('category:"model",','') });
editorDefinitionsV5ProviderPrefetchLegacy.push({ name: "session-new-config-options-new", before: sessionNewOptionsNew, replacement: sessionNewOptionsNewPatched.replace('category:"model",','') });
editorDefinitionsV5ProviderPrefetchLegacy.push({ name: "provider-config-options-prefetch", before: providerPrefetch, replacement: providerPrefetchPatched.replace('category:"model",','') });
const editorEditsV5ProviderPrefetchLegacy = materialize(editorDefinitionsV5ProviderPrefetchLegacy, EDITOR_MARKER);
// 1.0.86 installed the current V5 editor adapter before the Local fallback
// row was added. Keep an exact removal recipe for that intermediate shape so
// upgrades are transactional instead of being rejected as incompatible.
const editorEditsV5Current = materialize(buildEditorDefinitions(sessionsDefinitionsV8), EDITOR_MARKER);
const editorEditsV5Installed = materialize(buildEditorDefinitions(sessionsDefinitionsV7), EDITOR_MARKER);
// 1.0.75/1.0.76 used the current Editor marker before cascadeId was added to
// the payload. Sessions already had an exact upgrade recipe; Editor needs the
// same recipe or a mixed install (both bundles present) aborts transactionally
// after Sessions validates but Editor reports an incompatible current marker.
const editorDefinitionsV5BeforeCascade = buildEditorDefinitions(sessionsDefinitionsV7BeforeCascade);
const editorEditsV5BeforeCascade = materialize(editorDefinitionsV5BeforeCascade, EDITOR_MARKER);
const priorEditorRecipes = [
  editorEditsV5BeforeRemoteContext,
  editorEditsV5BeforeSsh,
  editorEditsV5Installed,
  editorEditsV5From102,
  editorEditsV5ProviderPrefetch,
  editorEditsV5ProviderPrefetchLegacy,
  editorEditsV5SessionFallback,
  editorEditsV5UnconditionalFallback,
  editorEditsV5ConditionalFallback,
  editorEditsV5Current,
  editorEditsV5BeforeCascade,
];
function isEditorPickerPatched(code) {
  try {
    const source = String(code || "");
    const current = next311Profiles.find(profile => profile.marker.includes("EDITOR") && source.includes(profile.marker));
    if (current) { validateSessionsPatched(source, current.marker, current.edits); return true; }
    if (source.includes(NEXT_310_EDITOR_MARKER)) validateSessionsPatched(source, NEXT_310_EDITOR_MARKER, next310EditorEdits);
    else validateSessionsPatched(source, EDITOR_MARKER, editorEdits);
    return true;
  } catch { return false; }
}
function patchEditorPicker(code) {
  if (code.includes(EDITOR_MARKER)) {
    try {
      validateSessionsPatched(code,EDITOR_MARKER,editorEdits);
      return {changed:false,code};
    } catch {
      let prior = null;
      for (const recipe of priorEditorRecipes) {
        try { validateSessionsPatched(code,EDITOR_MARKER,recipe); prior = recipe; break; }
        catch {}
      }
      if (!prior) throw new Error("Previous Editor picker patch is incompatible");
      for (const edit of prior) code=code.replace(edit.after,edit.before);
      if (code.includes(EDITOR_MARKER)) throw new Error("Previous Editor picker patch removal verification failed");
    }
  }
  if (code.includes(PREVIOUS_EDITOR_MARKER)) {
    validateSessionsPatched(code,PREVIOUS_EDITOR_MARKER,previousEditorEdits);
    for (const edit of previousEditorEdits) code=code.replace(edit.after,edit.before);
    if (code.includes(PREVIOUS_EDITOR_MARKER)) throw new Error("Previous Editor picker patch removal verification failed");
  } else if (code.includes(LEGACY_EDITOR_MARKER)) {
    validateSessionsPatched(code,LEGACY_EDITOR_MARKER,legacyEditorEdits);
    for (const edit of legacyEditorEdits) code=code.replace(edit.after,edit.before);
    if (code.includes(LEGACY_EDITOR_MARKER)) throw new Error("Legacy Editor picker patch removal verification failed");
  } else if (code.includes(OLDER_EDITOR_MARKER)) {
    validateSessionsPatched(code,OLDER_EDITOR_MARKER,olderEditorEdits);
    for (const edit of olderEditorEdits) code=code.replace(edit.after,edit.before);
    if (code.includes(OLDER_EDITOR_MARKER)) throw new Error("Older Editor picker patch removal verification failed");
  } else if (code.includes(OLDEST_EDITOR_MARKER)) {
    validateSessionsPatched(code,OLDEST_EDITOR_MARKER,oldestEditorEdits);
    for (const edit of oldestEditorEdits) code=code.replace(edit.after,edit.before);
    if (code.includes(OLDEST_EDITOR_MARKER)) throw new Error("Oldest Editor picker patch removal verification failed");
  }
  if (!code.includes('c8.typeName="exa.codeium_common_pb.ClientModelConfig"')) throw new Error("Editor protobuf boundary missing");
  for (const edit of editorEdits) if (count(code,edit.before)!==1) throw new Error("Editor picker compatibility check failed: "+edit.name);
  for (const edit of editorEdits) code=code.replace(edit.before,edit.after);
  validateSessionsPatched(code,EDITOR_MARKER,editorEdits);
  return {changed:true,code};
}
function unpatchEditorPicker(code) {
  const previous = !code.includes(EDITOR_MARKER) && code.includes(PREVIOUS_EDITOR_MARKER);
  const legacy = !code.includes(EDITOR_MARKER) && !previous && code.includes(LEGACY_EDITOR_MARKER);
  const older = !code.includes(EDITOR_MARKER) && !previous && !legacy && code.includes(OLDER_EDITOR_MARKER);
  const oldest = !code.includes(EDITOR_MARKER) && !previous && !legacy && !older && code.includes(OLDEST_EDITOR_MARKER);
  if (!code.includes(EDITOR_MARKER) && !previous && !legacy && !older && !oldest) return {changed:false,code};
  const marker = previous ? PREVIOUS_EDITOR_MARKER : legacy ? LEGACY_EDITOR_MARKER : older ? OLDER_EDITOR_MARKER : oldest ? OLDEST_EDITOR_MARKER : EDITOR_MARKER;
  const editsToRemove = previous ? previousEditorEdits : legacy ? legacyEditorEdits : older ? olderEditorEdits : oldest ? oldestEditorEdits : editorEdits;
  let exactEdits = editsToRemove;
  if (marker === EDITOR_MARKER) {
    let matched = false;
    for (const recipe of [editorEdits, ...priorEditorRecipes]) {
      try { validateSessionsPatched(code,marker,recipe); exactEdits=recipe; matched=true; break; }
      catch {}
    }
    if (!matched) throw new Error("Editor picker patch is incompatible");
  } else {
    validateSessionsPatched(code,marker,exactEdits);
  }
  for (const edit of exactEdits) code=code.replace(edit.after,edit.before);
  if (code.includes(marker)) throw new Error("Editor picker patch removal verification failed");
  return {changed:true,code};
}

function validateSessionsPatched(code, marker = SESSIONS_MARKER, edits = sessionsEdits) {
  if (count(code, marker) !== edits.length * 2 || edits.some(edit => count(code, edit.after) !== 1)) {
    throw new Error("Sessions picker patch is incomplete or incompatible; restore its verified backup first");
  }
}

function isSessionsPickerPatched(code) {
  const current = next311Profiles.find(profile => profile.marker.includes("SESSIONS") && String(code || "").includes(profile.marker));
  if (current) { try { validateSessionsPatched(code, current.marker, current.edits); return true; } catch { return false; } }
  try {
    const source = String(code || "");
    if (source.includes(NEXT_310_SESSIONS_MARKER)) validateSessionsPatched(source, NEXT_310_SESSIONS_MARKER, next310SessionEdits);
    else validateSessionsPatched(source);
    return true;
  } catch {
    return false;
  }
}
function patchSessionsPicker(code) {
  if (code.includes(SESSIONS_MARKER)) {
    try {
      validateSessionsPatched(code);
      return { changed: false, code };
    } catch {
      let prior = sessionsEditsV9Installed;
      try { validateSessionsPatched(code, SESSIONS_MARKER, prior); }
      catch {
        try { prior = sessionsEditsV8Installed; validateSessionsPatched(code, SESSIONS_MARKER, prior); }
        catch {
          try { prior = sessionsEditsV7Installed; validateSessionsPatched(code, SESSIONS_MARKER, prior); }
          catch {
            try { prior = sessionsEditsV8From102; validateSessionsPatched(code, SESSIONS_MARKER, prior); }
            catch {
              try { prior = sessionsEditsV7From102; validateSessionsPatched(code, SESSIONS_MARKER, prior); }
              catch { prior = sessionsEditsV7BeforeCascade; validateSessionsPatched(code, SESSIONS_MARKER, prior); }
            }
          }
        }
      }
      for (const edit of prior) code = code.replace(edit.after, edit.before);
      if (code.includes(SESSIONS_MARKER)) throw new Error("Previous Sessions picker patch removal verification failed");
    }
  }
  if (code.includes(PREVIOUS_SESSIONS_MARKER)) {
    validateSessionsPatched(code, PREVIOUS_SESSIONS_MARKER, previousSessionsEdits);
    for (const edit of previousSessionsEdits) code = code.replace(edit.after, edit.before);
    if (code.includes(PREVIOUS_SESSIONS_MARKER)) throw new Error("Previous Sessions picker patch removal verification failed");
  } else if (code.includes(LEGACY_SESSIONS_MARKER)) {
    validateSessionsPatched(code, LEGACY_SESSIONS_MARKER, legacySessionsEdits);
    for (const edit of legacySessionsEdits) code = code.replace(edit.after, edit.before);
    if (code.includes(LEGACY_SESSIONS_MARKER)) throw new Error("Legacy Sessions picker patch removal verification failed");
  } else if (code.includes(OLDER_SESSIONS_MARKER)) {
    validateSessionsPatched(code, OLDER_SESSIONS_MARKER, olderSessionsEdits);
    for (const edit of olderSessionsEdits) code = code.replace(edit.after, edit.before);
    if (code.includes(OLDER_SESSIONS_MARKER)) throw new Error("Older Sessions picker patch removal verification failed");
  } else if (code.includes(OLDEST_SESSIONS_MARKER)) {
    validateSessionsPatched(code, OLDEST_SESSIONS_MARKER, oldestSessionsEdits);
    for (const edit of oldestSessionsEdits) code = code.replace(edit.after, edit.before);
    if (code.includes(OLDEST_SESSIONS_MARKER)) throw new Error("Oldest Sessions picker patch removal verification failed");
  } else if (code.includes(EARLIEST_SESSIONS_MARKER)) {
    validateSessionsPatched(code, EARLIEST_SESSIONS_MARKER, earliestSessionsEdits);
    for (const edit of earliestSessionsEdits) code = code.replace(edit.after, edit.before);
    if (code.includes(EARLIEST_SESSIONS_MARKER)) throw new Error("Earliest Sessions picker patch removal verification failed");
  }
  for (const edit of sessionsEdits) if (count(code, edit.before) !== 1) {
    throw new Error("Sessions picker compatibility check failed: " + edit.name);
  }
  for (const edit of sessionsEdits) code = code.replace(edit.before, edit.after);
  validateSessionsPatched(code);
  return { changed: true, code };
}
function unpatchSessionsPicker(code) {
  const previous = !code.includes(SESSIONS_MARKER) && code.includes(PREVIOUS_SESSIONS_MARKER);
  const legacy = !code.includes(SESSIONS_MARKER) && !previous && code.includes(LEGACY_SESSIONS_MARKER);
  const older = !code.includes(SESSIONS_MARKER) && !previous && !legacy && code.includes(OLDER_SESSIONS_MARKER);
  const oldest = !code.includes(SESSIONS_MARKER) && !previous && !legacy && !older && code.includes(OLDEST_SESSIONS_MARKER);
  const earliest = !code.includes(SESSIONS_MARKER) && !previous && !legacy && !older && !oldest && code.includes(EARLIEST_SESSIONS_MARKER);
  const marker = previous ? PREVIOUS_SESSIONS_MARKER : legacy ? LEGACY_SESSIONS_MARKER : older ? OLDER_SESSIONS_MARKER : oldest ? OLDEST_SESSIONS_MARKER : earliest ? EARLIEST_SESSIONS_MARKER : SESSIONS_MARKER;
  let edits = previous ? previousSessionsEdits : legacy ? legacySessionsEdits : older ? olderSessionsEdits : oldest ? oldestSessionsEdits : earliest ? earliestSessionsEdits : sessionsEdits;
  if (!previous && !legacy && !older && !oldest && !earliest) {
    try { validateSessionsPatched(code, marker, edits); }
    catch {
      try { edits = sessionsEditsV9Installed; validateSessionsPatched(code, marker, edits); }
      catch {
        try { edits = sessionsEditsV8Installed; validateSessionsPatched(code, marker, edits); }
        catch {
          try { edits = sessionsEditsV7Installed; validateSessionsPatched(code, marker, edits); }
          catch {
            try { edits = sessionsEditsV8From102; validateSessionsPatched(code, marker, edits); }
            catch {
              try { edits = sessionsEditsV7From102; validateSessionsPatched(code, marker, edits); }
              catch { edits = sessionsEditsV7BeforeCascade; validateSessionsPatched(code, marker, edits); }
            }
          }
        }
      }
    }
  } else {
    validateSessionsPatched(code, marker, edits);
  }
  for (const edit of edits) code = code.replace(edit.after, edit.before);
  if (code.includes(marker)) throw new Error("Sessions picker patch removal verification failed");
  return { changed: true, code };
}

function validatePatched(code) {
  if (count(code, MARKER) !== edits.length * 2 || edits.some(edit => count(code, edit.after) !== 1)) {
    throw new Error("Native picker patch is incomplete or incompatible; restore its verified backup first");
  }
}
function validateLegacyPatched(code) {
  if (count(code, LEGACY_MARKER) !== legacyEdits.length * 2 || legacyEdits.some(edit => count(code, edit.after) !== 1)) {
    throw new Error("Legacy native picker patch is incomplete or incompatible; restore its verified backup first");
  }
}
function unpatchLegacyPicker(code) {
  validateLegacyPatched(code);
  for (const edit of legacyEdits) code = code.replace(edit.after, edit.before);
  return { changed: true, code };
}
function patchNativePicker(code) {
  if (typeof code !== "string") throw new TypeError("Native picker source must be a string");
  if (!next311Profiles.some(profile => code.includes(profile.marker)) && code.includes('BYOK_NATIVE_PICKER_')) {
    const restored = unpatchNativePicker(code);
    if (restored.changed) {
      const updated = patchNativePicker(restored.code);
      return {code:updated.code,changed:updated.code!==code};
    }
  }
  const current = next311Profiles.find(profile => code.includes(profile.marker)) ||
    next311Profiles.find(profile => code.includes(profile.component) && profile.edits.every(edit => count(code, edit.before) === 1));
  if (current) return patchExactNext310(code, current.marker, current.edits, current.priorEdits);
  if (code.includes(NEXT_310_EDITOR_MARKER) || code.includes('nqW.displayName="AcpModelSelect"')) {
    return patchExactNext310(code, NEXT_310_EDITOR_MARKER, next310EditorEdits, next310EditorPriorRecipes);
  }
  if (code.includes(NEXT_310_SESSIONS_MARKER) || code.includes('fcs.displayName="AcpModelSelect"')) {
    return patchExactNext310(code, NEXT_310_SESSIONS_MARKER, next310SessionEdits, next310SessionEditsInstalled);
  }
  if (code.includes('nqB.displayName="AcpModelSelect"')) {
    const hasEditorMarker = code.includes(EDITOR_MARKER) || code.includes(PREVIOUS_EDITOR_MARKER) || code.includes(LEGACY_EDITOR_MARKER) || code.includes(OLDER_EDITOR_MARKER) || code.includes(OLDEST_EDITOR_MARKER);
    if (code.includes(EDITOR_MARKER)) {
      try { validateSessionsPatched(code, EDITOR_MARKER, editorEdits); return { changed: false, code }; }
      catch {}
    }
    if (hasEditorMarker) code = unpatchEditorPicker(code).code;
    return patchEditorPicker(code);
  }
  if (code.includes("mcs=(0,m.memo)") && code.includes("AcpModelSelect")) return patchSessionsPicker(code);
  if (code.includes(MARKER)) { validatePatched(code); return { changed: false, code }; }
  if (code.includes(LEGACY_MARKER)) code = unpatchLegacyPicker(code).code;
  // Unknown modern builds used to fall through to the oldest Workbench
  // recipe and report its first missing anchor ("selected-value"). That
  // obscures the actual problem and cannot identify the remote host build.
  if (!code.includes('jzo=(0,o.memo)(({disabled:d})=>{let{logEvent:s,userStatus:m}=H1()')) {
    const error = new Error("当前 Devin 构建尚未适配原生模型菜单，请提供 Devin 和插件版本及兼容性诊断");
    error.code = "BYOK_NATIVE_PICKER_UNSUPPORTED";
    throw error;
  }
  for (const edit of edits) if (count(code, edit.before) !== 1) {
    throw new Error("Native picker compatibility check failed: " + edit.name);
  }
  for (const edit of edits) code = code.replace(edit.before, edit.after);
  return { changed: true, code };
}
function unpatchNativePicker(code) {
  if (typeof code !== "string") throw new TypeError("Native picker source must be a string");
  const current = next311Profiles.find(profile => code.includes(profile.marker));
  if (current) return unpatchExactNext310(code, current.marker, current.edits, current.priorEdits);
  if (code.includes(NEXT_310_EDITOR_MARKER)) return unpatchExactNext310(code, NEXT_310_EDITOR_MARKER, next310EditorEdits, next310EditorPriorRecipes);
  if (code.includes(NEXT_310_SESSIONS_MARKER)) return unpatchExactNext310(code, NEXT_310_SESSIONS_MARKER, next310SessionEdits, next310SessionEditsInstalled);
  if (code.includes(EDITOR_MARKER) || code.includes(PREVIOUS_EDITOR_MARKER) || code.includes(LEGACY_EDITOR_MARKER) || code.includes(OLDER_EDITOR_MARKER) || code.includes(OLDEST_EDITOR_MARKER)) return unpatchEditorPicker(code);
  if (code.includes(SESSIONS_MARKER) || code.includes(PREVIOUS_SESSIONS_MARKER) || code.includes(LEGACY_SESSIONS_MARKER) || code.includes(OLDER_SESSIONS_MARKER) || code.includes(OLDEST_SESSIONS_MARKER) || code.includes(EARLIEST_SESSIONS_MARKER)) return unpatchSessionsPicker(code);
  if (!code.includes(MARKER)) {
    if (code.includes(LEGACY_MARKER)) return unpatchLegacyPicker(code);
    return { changed: false, code };
  }
  validatePatched(code);
  for (const edit of edits) code = code.replace(edit.after, edit.before);
  return { changed: true, code };
}

function resolveNativePickerCompatibility(source, options = {}) {
  const clean = unpatchNativePicker(source).code;
  return require('./native-picker-compat.cjs').select(clean, next311Profiles, options);
}
module.exports = { MARKER, SESSIONS_MARKER, PREVIOUS_SESSIONS_MARKER, LEGACY_SESSIONS_MARKER, OLDER_SESSIONS_MARKER, OLDEST_SESSIONS_MARKER, EARLIEST_SESSIONS_MARKER, NEXT_310_SESSIONS_MARKER, EDITOR_MARKER, PREVIOUS_EDITOR_MARKER, LEGACY_EDITOR_MARKER, OLDER_EDITOR_MARKER, OLDEST_EDITOR_MARKER, NEXT_310_EDITOR_MARKER, patchNativePicker, unpatchNativePicker, patchSessionsPicker, unpatchSessionsPicker, isSessionsPickerPatched, patchEditorPicker, unpatchEditorPicker, isEditorPickerPatched, resolveNativePickerCompatibility, nativePickerProfiles: () => next311Profiles };
