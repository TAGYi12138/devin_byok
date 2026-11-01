'use strict';
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const catalog=require('./server/native-model-catalog.cjs');
function readModels(env=process.env){
 const local=process.platform==='win32'?(env.LOCALAPPDATA||path.join(os.homedir(),'AppData','Local')):process.platform==='darwin'?path.join(os.homedir(),'Library','Application Support'):(env.XDG_CACHE_HOME||path.join(os.homedir(),'.cache'));
 const appData=env.APPDATA||(process.platform==='darwin'?path.join(os.homedir(),'Library','Application Support'):(env.XDG_CONFIG_HOME||path.join(os.homedir(),'.config')));
 const capture=env.BYOK_HOST_MODEL_PATH||(env.BYOK_DEVIN_BYOK_DIR?path.join(env.BYOK_DEVIN_BYOK_DIR,'config','host-models.json'):path.join(appData,'Devin-BYOK-Bridge','config','host-models.json'));
 let latest=catalog.latestCache([capture+'.native.json']);
 if(!latest){const files=[];for(const dir of [path.join(local,'devin','cli-next'),path.join(local,'devin','cli')])try{for(const file of fs.readdirSync(dir).filter(v=>/^model_configs_v5(?:\..+)?\.bin$/i.test(v)))files.push(path.join(dir,file));}catch{}latest=catalog.latestCache(files);}
 if(!latest)throw Error('尚未读取到 Devin 原生模型目录，请先打开 Devin 模型菜单后重试');
 const models=catalog.modelRows(latest.buf).filter(r=>!/_BYOK|PRIVATE/i.test(r.uid)&&! /^(?:byok-slot|subagent-default|memory-migration-default)/i.test(r.uid)).map(({uid,label})=>({uid,label:label||uid}));
 if(!models.length)throw Error('Devin 原生模型目录为空');
 return models;
}
function snapshot({vscode,context,env=process.env}){
 const models=readModels(env);
 let hostVersion=String(vscode.version||'unknown');try{const pkg=JSON.parse(fs.readFileSync(path.join(vscode.env.appRoot,'package.json'),'utf8'));if(pkg.version)hostVersion=String(pkg.version);}catch{}
 return {hostProduct:String(vscode.env.appName||'Devin'),hostVersion,pluginVersion:String(context.extension?.packageJSON?.version||'1.3.0'),models};
}
module.exports={snapshot,readModels};
