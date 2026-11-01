'use strict';
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
function prepare({gatewayUrl,buildRoot,devLoopback=false,allowHttp=false}){
  const url=new URL(gatewayUrl),localTest=devLoopback&&url.protocol==='http:'&&['localhost','127.0.0.1','[::1]'].includes(url.hostname);
  if((url.protocol!=='https:'&&!localTest&&!(allowHttp&&url.protocol==='http:'))||url.pathname!=='/'||url.username||url.password||url.search||url.hash)throw Error('Pass the NEW business service HTTPS origin; use --dev-loopback for local HTTP or explicitly --allow-http for a fixed HTTP service');
  const source=path.resolve(__dirname,'..'),repo=path.dirname(source),parent=path.resolve(buildRoot||path.join(repo,'cloud-builds'));fs.mkdirSync(parent,{recursive:true});const stage=fs.mkdtempSync(path.join(parent,'release-')),dest=path.join(stage,'extension');fs.mkdirSync(dest);
  for(const entry of fs.readdirSync(source,{withFileTypes:true})){
    if(entry.isDirectory()&&!['server','media','devin-plugin'].includes(entry.name))continue;
    if(!entry.isDirectory()&&!/\.(?:js|cjs|json|txt|md)$/.test(entry.name))continue;
    fs.cpSync(path.join(source,entry.name),path.join(dest,entry.name),{recursive:true});
  }
  for(const name of ['node-forge','semver','detect-libc','tslib']){const from=path.join(source,'node_modules',name);if(!fs.existsSync(from))throw Error('Missing runtime dependency '+name);fs.cpSync(from,path.join(dest,'node_modules',name),{recursive:true});}
  for(const file of ['image-runtime.json','update-product.json'])fs.copyFileSync(path.join(repo,'packaging','cloud-'+file),path.join(dest,file));
  const pkg=JSON.parse(fs.readFileSync(path.join(dest,'package.json'),'utf8'));pkg.version='1.6.3';pkg.displayName=localTest?'Devin 云端对话（本机测试）':'Devin 云端对话';pkg.description='使用兑换码激活的 Devin Local 云端模型服务';delete pkg.devDependencies;delete pkg.scripts;
  for(const view of pkg.contributes.views.byokBridge||[]){view.name='云端服务';view.contextualTitle=pkg.displayName;}
  pkg.contributes.configuration.properties['byokBridge.updates.enabled'].default=true;
  pkg.contributes.commands.push({command:'byokBridge.cloud.redeem',title:'Devin 云端服务: 激活或充值'},{command:'byokBridge.cloud.refresh',title:'Devin 云端服务: 刷新额度和模型'});
  pkg.contributes.commands.push({command:'byokBridge.cloud.catalog.pair',title:'Devin 云端服务: 输入管理密钥'},{command:'byokBridge.cloud.catalog.sync',title:'Devin 云端服务: 立即同步原生目录'},{command:'byokBridge.cloud.catalog.export',title:'Devin 云端服务: 导出原生模型目录'});
  fs.writeFileSync(path.join(dest,'package.json'),JSON.stringify(pkg,null,2));fs.writeFileSync(path.join(dest,'cloud-product.json'),JSON.stringify({enabled:true,gatewayUrl:url.origin,name:pkg.displayName,...(allowHttp&&url.protocol==='http:'?{insecureHttpOrigin:url.origin}:{})},null,2));
  fs.writeFileSync(path.join(dest,'readme.md'),'# '+pkg.displayName+'\n\n在侧栏输入管理员提供的兑换码，然后在 Devin Local 中选择模型开始对话。在「我的额度卡」中展开详情并切换当前卡，分别查看剩余额度、可用模型和到期时间。每张卡独立计费，余额不足或到期后不会自动借用其他卡。需配合业务服务 0.6.0 或更新版本。\n\n1.5.0 增加服务档位、价格版本和模型倍率展示；需要业务服务 0.7.0 或更新版本使用档位卡。保留 Devin 普通版 3.11.234（1.126.0）和 Next 3.11.1228 的 SSH 模型入口及初始化，远端环境按软件通道分别配置，模式使用 Agent 返回的真实选项。安装后重新加载窗口并重新连接 SSH；首次更新远端配置后按提示再次重连。\n'+(localTest?'\n本机测试版固定连接 '+url.origin+'，使用期间保持服务器到本机的端口转发。正式分发请重新打包为公网 HTTPS 业务入口。\n':''));
  fs.appendFileSync(path.join(dest,'readme.md'),'\n1.5.1 修复额度卡允许所选模型却仍提示403的问题：新会话和不同发送入口统一关联模型，稳定版与Next分别读取对应会话记录；标题请求使用所属会话模型，无法确认归属时使用本地标题。保留卡片的模型限制和独立计费。只需更新插件，安装后重新加载窗口并刷新额度和模型。\n');
  fs.appendFileSync(path.join(dest,'readme.md'),'\n1.5.2 增加 Devin 普通版 3.11.238（提交 9e593c73d4ca24802eb3b302035f33cedad59802）原生模型菜单、会话发送和 SSH 模型入口适配，修复启动时 selected-value 兼容检查失败。保留普通版 3.11.234 和 Next 3.11.1228。未知构建会明确提示未适配，并可查看版本、文件指纹和组件诊断；不再误用旧版适配规则。安装后按提示重新加载窗口，原生补丁更新后再重新加载一次。无需更新服务器。\n');
  fs.appendFileSync(path.join(dest,'readme.md'),'\n1.5.3 建立原生菜单多版本兼容注册表：内置普通版 3.11.234、3.11.238 和 Next 3.11.1228 的验证方案，结合提交号、版本和实际代码自动选择；未知版本只有全部目标代码片段匹配才复用已有方案。检查两处菜单使用同一方案，拒绝版本信息冲突、不同版本混装和不完整结构；日志展示匹配方案。保留原生菜单与既有 Agent 流程。详情见 native-picker-compatibility.md。无需更新服务器。\n');
  fs.appendFileSync(path.join(dest,'readme.md'),'\n1.5.4 将原生模型菜单兼容范围扩展到官方历史页列出的 3.10、3.11 系列共 23 个普通版和 Next 的 Windows x64 构建，逐个提取真实程序文件测试。保留旧菜单的价格变化标记和后续菜单的供应商信息；修复旧版选模回调引用过期目录。相同代码复用规则，同时区分通道、构建及官方提交；旧补丁可升级或完整卸载。具体离散版本见 native-picker-compatibility.md，未声明整个版本区间或所有历史版本都支持。无需更新服务器。\n');
  fs.appendFileSync(path.join(dest,'readme.md'),'\n1.5.5 精简安装包：图片运行库首次需要时从配套服务器下载，校验后缓存到本机，图片仍在本地处理。失败时保留原图，纯文本与原生菜单/SSH 不依赖资源下载。首次下载需要服务器 0.7.3 的配套资源，已有完整缓存可离线复用。\n');
  fs.appendFileSync(path.join(dest,'readme.md'),'\n1.6.0 配套服务器 0.8.0：统一混合渠道展示，传递隔离会话标识供自动回切使用，并跟随服务端总超时。旧卡保留原计费账户和模型范围；按实际渠道账单结算，超时尝试也可能收费。\n');
  fs.appendFileSync(path.join(dest,'readme.md'),'\n1.6.1 配套服务器 0.8.1：展示每卡并发、RPM、输出限速和每24小时额度，支持手动移除已用完或到期卡片，保留账单；移除当前卡后需手动选卡。窄侧栏自动换行。服务端限制在兑换后按卡执行，旧卡不自动增加限制。\n');
  fs.appendFileSync(path.join(dest,'readme.md'),'\n1.6.3 卡片计费说明隐藏上游系统名称；卡片名称、详情值、统计标签和页面标题保持单行，超长省略并支持悬停查看完整内容。配套服务器0.8.3，兼容旧服务器计费文案。\n');
  const manifest=fs.readFileSync(path.join(repo,'packaging','extension.vsixmanifest'),'utf8').replace(/(<Identity[^>]*Version=")[^"]+/, '$1'+pkg.version).replace(/<DisplayName>[^<]+<\/DisplayName>/,'<DisplayName>'+pkg.displayName+'</DisplayName>').replace(/(<Description[^>]*>)[\s\S]*?(<\/Description>)/,'$1Managed cloud model service with redemption codes.$2');fs.writeFileSync(path.join(stage,'extension.vsixmanifest'),manifest);fs.copyFileSync(path.join(repo,'packaging','[Content_Types].xml'),path.join(stage,'[Content_Types].xml'));
  return {stage,output:path.join(parent,'devin-cloud-bridge-'+pkg.version+'-'+path.basename(stage)+'.vsix'),gatewayUrl:url.origin,localTest};
}
function main(args=process.argv.slice(2)){
  const gatewayIndex=args.indexOf('--gateway-url');if(gatewayIndex<0||!args[gatewayIndex+1])throw Error('Usage: node package-cloud.cjs --gateway-url https://your-business-domain [--prepare-only] [--dev-loopback] [--allow-http]');
  const result=prepare({gatewayUrl:args[gatewayIndex+1],devLoopback:args.includes('--dev-loopback'),allowHttp:args.includes('--allow-http')});
  if(!args.includes('--prepare-only')){const zip=spawnSync(process.platform==='win32'?'powershell.exe':'pwsh',['-NoProfile','-ExecutionPolicy','Bypass','-File',path.join(__dirname,'zip-cloud.ps1'),'-StagePath',result.stage,'-OutputPath',result.output],{encoding:'utf8',windowsHide:true});if(zip.error||zip.status!==0)throw Error(zip.error?.message||zip.stderr||'VSIX packaging failed');}
  console.log(JSON.stringify({...result,preparedOnly:args.includes('--prepare-only')},null,2));
}
if(require.main===module)try{main();}catch(e){console.error(e.message);process.exitCode=1;}
module.exports={prepare};
