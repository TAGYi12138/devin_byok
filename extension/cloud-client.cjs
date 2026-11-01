'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const managed=require('./server/cloud-managed.cjs'),families=require('./model-families.cjs');
let current=null;
function writeRuntime(state){const file=managed.statePath();fs.mkdirSync(path.dirname(file),{recursive:true});const temp=file+'.'+process.pid+'.tmp';fs.writeFileSync(temp,JSON.stringify(state),{mode:0o600});fs.renameSync(temp,file);}
function createCloudClient({vscode,context,request=fetch}){
  const product=managed.product(),listeners=new Set();let state={},timer=null,busy=false,refreshing=null,localCatalog=null,syncState={},syncing=false,catalogError=null,catalogVerifiedUntil=0,catalogEpoch=0;
  const messages={invalid_code:'兑换码无效',code_already_claimed:'兑换码已被使用或绑定其他设备',code_expired:'兑换码已过期',credit_requires_session:'请先激活，再使用充值码',session_expired:'登录凭证已失效，请重新激活或联系管理员',license_disabled:'授权已停用',sub2api_unavailable:'额度服务暂不可用，请稍后重试',sub2api_api_rejected:'服务正在配置，请联系管理员',redemption_processing:'兑换正在处理中，请稍后用同一码重试',quota_exhausted:'额度已用完',credit_plan_mismatch:'充值码与当前套餐不匹配'};
  Object.assign(messages,{card_concurrency_limit:'当前额度卡已达到并发上限，请等待进行中的请求结束',card_request_rate_limit:'当前额度卡请求过于频繁，请稍后重试',card_daily_credit_limit:'当前额度卡已达到本周期额度上限，请等待重置',card_daily_usage_unavailable:'额度周期账单暂未同步，请稍后重试',credit_card_archived:'此额度卡已移除，请手动选择其他卡片',card_removal_requires_inactive:'只能移除已用完或已到期的额度卡',credit_card_not_allowed:'此额度卡不属于当前用户',credit_card_required:'请先兑换额度卡',credit_card_expired:'当前额度卡已到期，请手动切换其他卡片',credit_card_exhausted:'当前额度卡余额不足，请手动切换其他卡片',credit_card_pending:'该额度卡正在准备，请稍后重试',credit_card_model_not_allowed:'当前额度卡不支持所选模型，请切换卡片或模型'});
  Object.assign(messages,{tier_pricing_changed:'当前卡片计费策略发生变化，已暂停请求，请联系管理员',tier_version_not_allowed:'当前卡片的服务档位不可用，请联系管理员'});
  messages.catalog_management_key_invalid='管理密钥无效或已被重置';
  for(const code of ['tier_pricing_unavailable','tier_cross_group_fallback','tier_dynamic_price_not_supported','tier_balance_group_required'])messages[code]='当前卡片的计费策略不可用，请联系管理员';
  async function call(route,{body,auth=true,authToken,cardId=state.selectedCardId}={}){
    let response;try{response=await request(product.gatewayUrl+route,{method:body===undefined?'GET':'POST',redirect:'error',signal:AbortSignal.timeout(45000),headers:{'content-type':'application/json','x-installation-id':state.installationId,...(auth&&cardId&&['/api/models','/api/me','/api/usage'].some(p=>route.split('?')[0]===p)?{'x-credit-card-id':cardId}:{}),...(auth||authToken?{authorization:'Bearer '+(authToken||state.accessToken||'')}:{})},body:body===undefined?undefined:JSON.stringify(body)});}catch{throw Error('无法连接云端服务，请稍后重试');}
    let doc;try{doc=await response.json();}catch{throw Error('云端服务返回异常，请稍后重试');}if(!response.ok||doc.ok!==true){const code=typeof doc.error==='object'?doc.error.code:doc.error;const fallback=/sub2api/i.test(String(code))?'云端服务暂不可用，请稍后重试':'云端服务暂不可用（'+String(code||response.status)+'）';const error=Error(messages[code]||fallback);error.code=code;throw error;}return doc;
  }
  async function save(){await context.secrets.store('managed-cloud-session',JSON.stringify(state));writeRuntime(state);}
  function notify(){for(const fn of listeners)fn(publicState());}
  function publicState(){return {enabled:product.enabled,name:product.name||'Devin 云端服务',active:!!state.accessToken&&state.expiresAt>Date.now(),expiresAt:state.expiresAt||null,licenseId:state.licenseId||null,models:(state.models||[]).map(row=>({id:row.id,name:row.name,compatible:localCatalog?localCatalog.models.some(m=>families.matches(row,m.uid)):null})),cards:state.cards||[],selectedCardId:state.selectedCardId||null,balance:state.balance??null,unit:state.unit||'USD',busy,error:state.error?String(state.error).replace(/sub2api/gi,'云端服务'):null,catalogSync:{authorized:catalogVerifiedUntil>Date.now(),paired:!!syncState.syncToken,expiresAt:syncState.expiresAt||null,lastSync:syncState.lastSync||null,error:catalogError?String(catalogError).replace(/sub2api/gi,'云端服务'):null}};}
  async function verifyCatalogAccess(){
    if(!syncState.syncToken){catalogVerifiedUntil=0;return false;}
    const raw=syncState.syncToken,epoch=catalogEpoch;
    try{const status=await call('/api/catalog-status',{auth:false,authToken:raw});if(epoch!==catalogEpoch||raw!==syncState.syncToken)throw Error('管理模式已结束，请重新输入管理密钥');if(status.capability!=='catalog:write'||!(status.expiresAt>Date.now()))throw Error('目录同步权限无效');catalogVerifiedUntil=Math.min(status.expiresAt,Date.now()+90000);return true;}
    catch(error){if(epoch===catalogEpoch)catalogVerifiedUntil=0;throw error;}
  }
  function readCatalog(){localCatalog=require('./cloud-catalog.cjs').snapshot({vscode,context});return localCatalog;}
  async function unlockCatalog(key){
    const epoch=++catalogEpoch;
    const result=await call('/api/catalog-login',{auth:false,body:{key}});
    if(result.capability!=='catalog:write'||!result.syncToken||!(result.expiresAt>Date.now()))throw Error('管理授权无效');
    if(epoch!==catalogEpoch){await call('/api/catalog-logout',{auth:false,authToken:result.syncToken,body:{}}).catch(()=>{});throw Error('管理模式已结束，请重新输入管理密钥');}
    if(syncState.syncToken)await call('/api/catalog-logout',{auth:false,authToken:syncState.syncToken,body:{}}).catch(()=>{});
    if(epoch!==catalogEpoch){await call('/api/catalog-logout',{auth:false,authToken:result.syncToken,body:{}}).catch(()=>{});throw Error('管理模式已结束，请重新输入管理密钥');}
    syncState={syncToken:result.syncToken,expiresAt:result.expiresAt,autoSync:false};catalogVerifiedUntil=Math.min(result.expiresAt,Date.now()+90000);catalogError=null;notify();return {...publicState(),action:'catalog_login'};
  }
  async function exitCatalog(){catalogEpoch++;const raw=syncState.syncToken;syncState={};catalogVerifiedUntil=0;catalogError=null;notify();if(raw)await call('/api/catalog-logout',{auth:false,authToken:raw,body:{}}).catch(()=>{});}
  async function syncCatalog(force=false){
    if(syncing)return;syncing=true;const epoch=catalogEpoch,raw=syncState.syncToken;
    try{
      if(!syncState.syncToken){if(force)throw Error('请先在兑换框输入管理密钥');return;}
      await verifyCatalogAccess();if(epoch!==catalogEpoch)throw Error('管理模式已结束，请重新输入管理密钥');if(!force&&!syncState.autoSync)return;
      const body=readCatalog(),digest=crypto.createHash('sha256').update(JSON.stringify(body)).digest('hex');
      if(!force&&syncState.digest===digest&&Date.now()-(syncState.lastSync||0)<3600000)return;await call('/api/catalog-sync',{auth:false,authToken:raw,body});if(epoch!==catalogEpoch)return;Object.assign(syncState,{digest,lastSync:Date.now(),autoSync:true});catalogError=null;
    }catch(error){if(epoch===catalogEpoch){if(error.code==='catalog_sync_expired')catalogVerifiedUntil=0;catalogError=error.code==='catalog_sync_expired'?'管理模式已到期或失效，请重新输入管理密钥':error.message;}if(force)throw Error(catalogError||error.message);}
    finally{syncing=false;notify();}
  }
  async function pairCatalog(){const key=await vscode.window.showInputBox({title:'开启目录管理模式',prompt:'输入管理台生成的 ADM- 管理密钥，仅本次打开有效',password:true,ignoreFocusOut:true});if(key){await unlockCatalog(key.trim());vscode.window.showInformationMessage('管理模式已开启，仅本次打开有效');}}
  async function exportCatalog(){const doc=readCatalog(),target=await vscode.window.showSaveDialog({defaultUri:vscode.Uri.file(path.join(require('node:os').homedir(),'devin-native-models.json')),filters:{JSON:['json']}});if(target)await vscode.workspace.fs.writeFile(target,Buffer.from(JSON.stringify(doc,null,2)));}
  async function usage({page=1,period='today'}={}){if(!Number.isInteger(page)||page<1||page>10000||!['today','7d','30d','all'].includes(period))throw Error('查询范围无效');const data=await call('/api/usage?page='+page+'&period='+period+'&pageSize=10&view=compact');if(!Array.isArray(data.entries)||data.pageSize!==10||data.entries.length>10)throw Error('请先升级服务器到 0.4.1，以启用每页 10 条的调用记录');return data;}
  async function refreshNow(){
    if(!product.enabled||!state.accessToken)return publicState();
    try{
      if(state.expiresAt-Date.now()<86400000){const renewed=await call('/api/session/refresh',{body:{}});Object.assign(state,{accessToken:renewed.accessToken,expiresAt:renewed.expiresAt});await save();}
      const cardData=await call('/api/cards');if(!Array.isArray(cardData.cards))throw Error('请升级服务端以使用独立额度卡');
      if(!cardData.selectedCardId){Object.assign(state,{models:[],balance:null,cards:cardData.cards,selectedCardId:null,error:null});await save();notify();return publicState();}
      const [me,catalog]=await Promise.all([call('/api/me',{cardId:cardData.selectedCardId}),call('/api/models',{cardId:cardData.selectedCardId})]);
      const selected=cardData.cards.find(c=>c.id===cardData.selectedCardId),known=(state.cards||[]).find(c=>c.id===cardData.selectedCardId);
      if([selected,known].some(c=>c?.tierId&&c.tierId!=='standard')&&(!selected?.tierId||selected.tierId!==catalog.tierId||selected.priceVersion!==catalog.priceVersion)){state.models=[];await save();throw Object.assign(Error('服务端未正确返回档位路由，请升级服务端并刷新后再使用此卡'),{code:'server_tiers_upgrade_required'});}
      if(!Array.isArray(catalog.models)||catalog.models.length>2000||catalog.models.some(r=>!r||typeof r.id!=='string'||typeof r.nativeUid!=='string'||!['openai','openai_responses','anthropic'].includes(r.protocol)))throw Error('云端模型目录无效');
      Object.assign(state,{models:catalog.models,balance:me.balance,unit:me.unit,cards:cardData.cards,selectedCardId:cardData.selectedCardId,error:null});await save();
    }catch(error){state.error=error.message;if(['session_expired','license_disabled'].includes(error.code)){state.accessToken='';await save();}}
    notify();return publicState();
  }
  function refresh(){if(busy)return Promise.resolve(publicState());if(!refreshing)refreshing=refreshNow().finally(()=>{refreshing=null;});return refreshing;}
  async function selectCard(cardId){if(busy)throw Error('正在处理，请稍后重试');busy=true;notify();try{if(refreshing)await refreshing;const result=await call('/api/cards/select',{body:{cardId}});state.selectedCardId=result.selectedCardId;state.cards=result.cards;state.models=[];await save();await refreshNow();if(state.error)throw Error(state.error);await vscode.commands.executeCommand('byokBridge.refreshLocalModels').catch(()=>{});return publicState();}finally{busy=false;notify();}}
  async function archiveCard(cardId){if(busy)throw Error('正在处理，请稍后重试');busy=true;notify();try{if(refreshing)await refreshing;const result=await call('/api/cards/archive',{body:{cardId}});Object.assign(state,{cards:result.cards,selectedCardId:result.selectedCardId,models:[],balance:null,error:null});await save();await refreshNow();if(state.error)throw Error(state.error);await vscode.commands.executeCommand('byokBridge.refreshLocalModels').catch(()=>{});return publicState();}finally{busy=false;notify();}}
  async function redeem(code){if(busy)throw Error('正在处理，请稍后重试');busy=true;notify();try{
    if(refreshing)await refreshing;
    if(/^ADM-/.test(code))return await unlockCatalog(code);
    const doc=await call(state.accessToken?'/api/redeem':'/api/activate',{body:{code},auth:!!state.accessToken});
    Object.assign(state,{accessToken:doc.accessToken,expiresAt:doc.expiresAt,licenseId:doc.licenseId,error:null});await save();await refreshNow();
    await vscode.commands.executeCommand('byokBridge.refreshLocalModels').catch(()=>{});
    return publicState();
  }finally{busy=false;notify();}}
  async function start(){if(!product.enabled)return;
    try{state=JSON.parse(await context.secrets.get('managed-cloud-session')||'{}');}catch{state={};}
    if(state.gatewayOrigin!==product.gatewayUrl)state={};
    state.gatewayOrigin=product.gatewayUrl;
    catalogEpoch++;syncState={};catalogVerifiedUntil=0;await context.secrets.delete?.('managed-cloud-catalog-sync');
    try{readCatalog();}catch{}
    state.installationId||=crypto.randomBytes(32).toString('base64url');await save();
    // The existing Local daemon owns native ACP and certificate setup.
    const bindingFile=path.join(path.dirname(managed.statePath()),'localBindings.json');let bindings={};try{bindings=JSON.parse(fs.readFileSync(bindingFile,'utf8'));if(!fs.existsSync(bindingFile+'.pre-cloud.bak'))fs.copyFileSync(bindingFile,bindingFile+'.pre-cloud.bak');}catch{}
    Object.assign(bindings,{enabled:true,unlockModels:true,unlockScope:'local'});fs.writeFileSync(bindingFile,JSON.stringify(bindings),{mode:0o600});
    context.subscriptions.push(vscode.commands.registerCommand('byokBridge.cloud.redeem',async()=>{const code=await vscode.window.showInputBox({title:'激活或充值',prompt:'输入兑换码',password:true,ignoreFocusOut:true});if(code)try{const result=await redeem(code.trim());vscode.window.showInformationMessage(result.action==='catalog_login'?'管理模式已开启，仅本次打开有效':'兑换成功');}catch(e){vscode.window.showErrorMessage(e.message);}}));
    context.subscriptions.push(vscode.commands.registerCommand('byokBridge.cloud.refresh',refresh));
    context.subscriptions.push(vscode.commands.registerCommand('byokBridge.cloud.catalog.pair',pairCatalog),vscode.commands.registerCommand('byokBridge.cloud.catalog.sync',()=>syncCatalog(true)),vscode.commands.registerCommand('byokBridge.cloud.catalog.export',exportCatalog));
    const background=()=>refresh().catch(error=>{state.error=error.message;notify();});
    timer=setInterval(()=>{background();void syncCatalog();},60000);timer.unref?.();void background();if(syncState.syncToken)void syncCatalog();
  }
  async function logout(){if(busy)throw Error('正在处理，请稍后重试');busy=true;try{if(refreshing)await refreshing;try{await call('/api/logout',{body:{}});}catch{}state={installationId:state.installationId,gatewayOrigin:product.gatewayUrl,models:[]};await save();}finally{busy=false;notify();}}
  return {start,refresh,redeem,selectCard,archiveCard,logout,usage,pairCatalog,syncCatalog,exportCatalog,exitCatalog,publicState,onChange:fn=>{listeners.add(fn);return {dispose:()=>listeners.delete(fn)};},dispose:()=>{catalogEpoch++;clearInterval(timer);syncState={};catalogVerifiedUntil=0;listeners.clear();}};
}
async function initialize(options){if(!managed.product().enabled)return null;current=createCloudClient(options);await current.start();options.context.subscriptions.push(current);return current;}
module.exports={initialize,get:()=>current,createCloudClient,writeRuntime};
