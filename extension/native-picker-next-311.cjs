"use strict";

// Exact adapters for Devin Next 3.11.1228 and stable Devin 3.11.234/3.11.238. Reuse the existing
// session lifecycle; only verified host boundaries and minifier names differ.
const EDITOR_MARKER = "BYOK_NATIVE_PICKER_EDITOR_NEXT_311";
const SESSIONS_MARKER = "BYOK_NATIVE_PICKER_SESSIONS_NEXT_311";
const STABLE_EDITOR_MARKER = "BYOK_NATIVE_PICKER_EDITOR_STABLE_311";
const STABLE_SESSIONS_MARKER = "BYOK_NATIVE_PICKER_SESSIONS_STABLE_311";
const STABLE_238_EDITOR_MARKER = "BYOK_NATIVE_PICKER_EDITOR_STABLE_238";
const STABLE_238_SESSIONS_MARKER = "BYOK_NATIVE_PICKER_SESSIONS_STABLE_238";

function buildProfiles(definitions, rename, materialize) {
  const names = new Set(["picker-state", "picker-rows", "picker-row-deps",
    "picker-selected-value", "picker-effects", "picker-selection", "picker-selection-deps"]);
  const profiles = [
    { marker: STABLE_238_SESSIONS_MARKER, component: 'p6s.displayName="AcpModelSelect"',
      names: {m:"R",Ie:"Xe",h:"k",ae:"Oe",Ge:"Ht",ut:"I",A9e:"t3i",$e:"Yt",gt:"$t",Rt:"di",Dt:"ai",yt:"Hi",Kt:"Ki",tn:"ro",Iot:"ykt",on:"$i",Bt:"Jn",sn:"Io",bn:"po",Zt:"On",In:"xo",Mn:"Sn",Ws:"ol",_G:"LG",Yce:"Rve",Wj:"Nj",ei:"ds",qo:"rs",Ti:"Gr"},
      state: "hi=m8(rs=>rs.state.modelSorts),", deps: "[k,$i,Ht,gt]),Gr=",
      promptNames: {a:"u",r:"o",p:"m",y:"k",v:"I"}, transport:{thunk:'NI'},
      selector: {before:'function dmt(){let o=Hqr(),s=eV(),u=mc(g=>g.acp.pendingSwitchTarget!==null),m=mc(g=>g.acp.cachedConfigOptionsByProvider[s]);return u?m??o??jhs:o?.length?o:m??jhs}',provider:'s',remote:'GC()',connectors:'u6()',isDevin:'dY'},
    },
    { marker: STABLE_238_EDITOR_MARKER, component: 'rkU.displayName="AcpModelSelect"', editor:true,
      names: {m:"tK",Ie:"S",h:"c",ae:"C",Ge:"M",ut:"s",A9e:"n4m",$e:"N",gt:"B",Rt:"F",Dt:"U",yt:"j",Kt:"q",tn:"H",Iot:"rEh",on:"J",Bt:"z",sn:"G",bn:"V",Zt:"W",In:"$",Mn:"Y",Ws:"tld",_G:"el0",Yce:"el2",Wj:"n1Q",ei:"et",qo:"e",Ti:"en"},
      state: "L=tVx(e=>e.state.modelSorts),", deps: "[c,J,M,D]),en=",
      promptNames: {a:"r",r:"e",p:"i",y:"a",v:"s"}, transport:{state:'tld',thunk:'e5z'},
      selector: {before:'function nQi(){let e=tly(),n=tl$(),r=tlf(e=>null!==e.acp.pendingSwitchTarget),i=tlf(e=>e.acp.cachedConfigOptionsByProvider[n]);return r?i??e??nQr:e?.length?e:i??nQr}',provider:'n',remote:'D8()',connectors:'tsi()',isDevin:'esD'},
    },
    { marker: SESSIONS_MARKER, component: 't6s.displayName="AcpModelSelect"',
      names: {m:"R",Ie:"Xe",h:"k",ae:"Oe",Ge:"gt",ut:"I",A9e:"Lfi",$e:"Wt",gt:"Kt",Rt:"$t",Dt:"hi",yt:"jt",Kt:"di",tn:"Yi",Iot:"rkt",on:"si",Bt:"zi",sn:"Ki",bn:"Jn",Zt:"So",In:"ro",Mn:"mo",Ws:"ol",_G:"NG",Yce:"hve",Wj:"qj",ei:"gr",qo:"Bo",Ti:"Ro"},
      state: "Ht=p8(Bo=>Bo.state.modelSorts),", deps: "[k,si,gt,ot]),Ro=",
      promptNames: {a:"u",r:"o",p:"m",y:"k",v:"I"},
      selector: {before:'function ymt(){let o=Nqr(),s=sV(),u=bc(g=>g.acp.pendingSwitchTarget!==null),m=bc(g=>g.acp.cachedConfigOptionsByProvider[s]);return u?m??o??qhs:o?.length?o:m??qhs}',provider:'s',remote:'GC()',connectors:'s6()',isDevin:'eY'},
    },
    { marker: EDITOR_MARKER, component: 'rkl.displayName="AcpModelSelect"',
      names: {m:"tK",Ie:"S",h:"c",ae:"C",Ge:"D",ut:"s",A9e:"n4o",$e:"P",gt:"O",Rt:"N",Dt:"L",yt:"B",Kt:"F",tn:"J",Iot:"rEs",on:"U",Bt:"j",sn:"q",bn:"z",Zt:"G",In:"H",Mn:"V",Ws:"tlc",_G:"elZ",Yce:"el0",Wj:"n1W",ei:"Z",qo:"e",Ti:"Q"},
      state: "M=tVk(e=>e.state.modelSorts),", deps: "[c,U,D,x]),Q=",
      promptNames: {a:"r",r:"e",p:"i",y:"a",v:"s"},
      selector: {before:'function nZ8(){let e=tlv(),n=tlH(),r=tlp(e=>null!==e.acp.pendingSwitchTarget),i=tlp(e=>e.acp.cachedConfigOptionsByProvider[n]);return r?i??e??nZ6:e?.length?e:i??nZ6}',provider:'n',remote:'D7()',connectors:'tsn()',isDevin:'esT'},
    },
    { marker: STABLE_SESSIONS_MARKER, component: 'i6s.displayName="AcpModelSelect"',
      names: {m:"R",Ie:"Xe",h:"k",ae:"Oe",Ge:"gt",ut:"I",A9e:"Lfi",$e:"Wt",gt:"Kt",Rt:"$t",Dt:"hi",yt:"jt",Kt:"di",tn:"Yi",Iot:"okt",on:"si",Bt:"zi",sn:"Ki",bn:"Jn",Zt:"So",In:"ro",Mn:"mo",Ws:"ol",_G:"NG",Yce:"hve",Wj:"qj",ei:"gr",qo:"Bo",Ti:"Ro"},
      state: "Ht=p8(Bo=>Bo.state.modelSorts),", deps: "[k,si,gt,ot]),Ro=",
      promptNames: {a:"u",r:"o",p:"m",y:"k",v:"I"},
      selector: {before:'function ymt(){let o=Bqr(),s=sV(),u=bc(g=>g.acp.pendingSwitchTarget!==null),m=bc(g=>g.acp.cachedConfigOptionsByProvider[s]);return u?m??o??qhs:o?.length?o:m??qhs}',provider:'s',remote:'GC()',connectors:'s6()',isDevin:'eY'},
    },
    { marker: STABLE_EDITOR_MARKER, component: 'rkd.displayName="AcpModelSelect"',
      names: {m:"tK",Ie:"S",h:"c",ae:"C",Ge:"D",ut:"s",A9e:"n4l",$e:"P",gt:"O",Rt:"N",Dt:"L",yt:"B",Kt:"F",tn:"J",Iot:"rEu",on:"U",Bt:"j",sn:"q",bn:"z",Zt:"G",In:"H",Mn:"V",Ws:"tlc",_G:"elZ",Yce:"el0",Wj:"n1Y",ei:"Z",qo:"e",Ti:"Q"},
      state: "M=tVw(e=>e.state.modelSorts),", deps: "[c,U,D,x]),Q=",
      promptNames: {a:"r",r:"e",p:"i",y:"a",v:"s"},
      selector: {before:'function nQe(){let e=tlv(),n=tlH(),r=tlp(e=>null!==e.acp.pendingSwitchTarget),i=tlp(e=>e.acp.cachedConfigOptionsByProvider[n]);return r?i??e??nZ9:e?.length?e:i??nZ9}',provider:'n',remote:'D7()',connectors:'tsn()',isDevin:'esT'},
    },
  ];
  profiles.push(...require('./native-picker-release-profiles.json'));
  const built = profiles.map(profile => {
    const edits = definitions.filter(d => names.has(d.name)).map(d => {
      let before = rename(d.before, profile.names);
      let replacement = rename(d.replacement, profile.names);
      let priorReplacement;
      if (d.name === "picker-rows") {
        // Next 3.11 decorates picker rows using the original protobuf too.
        // The second argument carries modelInfo.partnerProviders.
        const call = rename("ut(A9e(qo))", profile.names);
        if (!replacement.includes(call)) throw Error("Next 3.11 model decorator anchor missing");
        priorReplacement = replacement;
        replacement = replacement.replace(call, profile.rowExpression || rename("ut(A9e(qo),qo)", profile.names));
      }
      if (d.name === "picker-row-deps" && profile.rowDepsBefore) {
        before = profile.rowDepsBefore;
        replacement = before.replace(']),', ',' + profile.names.Ie + ',__byokNativeSnapshot]),');
      }
      if (d.name === "picker-state") {
        const start = replacement.indexOf("[__byokNativeSnapshot");
        const end = replacement.indexOf(",{unacknowledgedModelUids");
        if (start < 0 || end < start) throw Error("Next 3.11 state recipe missing");
        before = profile.state;
        replacement = before + replacement.slice(start, end) + ",";
      }
      if (d.name === "picker-selection-deps") {
        before = profile.deps;
        replacement = before.replace("]),", ",__byokNativeSnapshot,__byokPersistSelection]),");
      }
      return { name:d.name, before, replacement, priorReplacement };
    });
    const prompt = definitions.find(d => d.name === "prompt-identity");
    edits.push({name:prompt.name, before:rename(prompt.before,profile.promptNames),
      replacement:rename(prompt.replacement,profile.promptNames)});
    const previousEdits=edits.slice(),selector=profile.selector;
    edits.push(require('./native-prompt-preflight.cjs').transportEdit(profile.editor||profile.marker===EDITOR_MARKER||profile.marker===STABLE_EDITOR_MARKER,profile.transport));
    // Mount the existing model picker while SSH's provider cache is empty.
    // Mode IDs, labels and defaults must always come from the native agent.
    const selectorReplacement=selector.before.replace(/return ([\s\S]+)}$/,(_match,result)=>
      `let __byokOptions=${result},__byokRemote=${selector.remote},__byokProvider=${selector.connectors}.find(__byokRow=>__byokRow.id===${selector.provider});if(!${selector.isDevin}(${selector.provider})||!(__byokRemote&&__byokRemote.isRemoteConnection&&String(__byokRemote.remoteName||"").startsWith("ssh-remote")||__byokProvider&&__byokProvider.location&&["ssh","ssh-remote"].includes(__byokProvider.location.kind)))return __byokOptions;return Array.isArray(__byokOptions)&&__byokOptions.some(__byokRow=>__byokRow&&__byokRow.type==="select"&&(__byokRow.category==="model"||__byokRow.id==="model"))?__byokOptions:[...(Array.isArray(__byokOptions)?__byokOptions:[]),{id:"model",category:"model",name:"Model",type:"select",currentValue:"",options:[]}]}`);
    if(selectorReplacement===selector.before)throw Error('SSH composer selector recipe missing');
    edits.push({name:'composer-config-selector-fallback',before:selector.before,replacement:selectorReplacement});
    const priorEdits = [edits,edits.filter(d=>d.name!=='prompt-transport'),previousEdits].flatMap(recipe=>[
      materialize(recipe.map(d=>({...d,replacement:d.name==='picker-selection-deps'?d.before:d.replacement})),profile.marker),
      materialize(recipe.map(d=>({...d,replacement:d.name==='picker-selection-deps'?d.before:d.priorReplacement??d.replacement})),profile.marker),
      materialize(recipe.map(d=>({...d,replacement:d.priorReplacement??d.replacement})),profile.marker),
    ]);
    return {...profile, edits:materialize(edits,profile.marker),priorEdits};
  });
  // Deduplicate identical recipes so shared stable/Next source can use one
  // exact adapter. Keep original markers first to preserve installed upgrades.
  const seen = new Set();
  return built.filter(profile => {
    const key = JSON.stringify([profile.component,profile.edits.map(edit=>[edit.name,edit.before,edit.replacement])]);
    if(seen.has(key))return false;seen.add(key);return true;
  });
}
module.exports = { buildProfiles, EDITOR_MARKER, SESSIONS_MARKER, STABLE_EDITOR_MARKER, STABLE_SESSIONS_MARKER, STABLE_238_EDITOR_MARKER, STABLE_238_SESSIONS_MARKER };
