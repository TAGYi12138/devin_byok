# Devin Model Gateway

将 Devin 的 Cascade 与 Devin Local 模型请求接入你自己的 API 供应商，在编辑器里统一管理供应商、模型绑定和代码补全。

当前本地插件版本：**1.1.50**。此仓库提供本地插件源码与 Windows 打包脚本。

## 功能

- **多供应商接入**：配置 Base URL、API Key 和模型，支持 OpenAI Chat Completions、OpenAI Responses 与 Anthropic Messages 协议。
- **模型路由**：分别为 Cascade、Local 和默认子代理设置模型绑定。
- **原生模型菜单**：在支持的 Devin 与 Devin Next 构建中，通过原生菜单选择模型并同步会话状态。
- **代码补全**：在面板里选择补全供应商、模型和等待时间，在编辑器中显示行内建议。
- **图片输入**：为支持视觉的模型转发图片，并使用随本地安装包提供的图片库进行预处理。
- **Remote SSH**：将 Linux 远端工作区的 Local 请求经回环转发连接到 Windows 本机网关。
- **子代理与 MCP**：安装测试、浏览器验收子代理配置，并按项目管理可选的 MCP 工具。
- **运行诊断**：查看代理状态、请求日志、Local 输出和崩溃诊断。

## 使用环境

- Windows x64，已安装兼容的 Devin Desktop 或 Devin Next。
- 可调用的模型 API 地址、凭据，以及该供应商实际支持的模型 ID。
- 从源码构建需要 Node.js、npm 和 PowerShell；建议使用 Node.js 22。
- 使用 Remote SSH 时，需要 Linux 远端主机和允许 TCP 转发的 SSH 服务。

原生菜单适配依赖具体的程序构建及代码结构，详见[兼容版本说明](extension/native-picker-compatibility.md)。不能仅凭相似版本号判断是否兼容。

## 从源码构建

在 PowerShell 中执行：

```powershell
git clone https://github.com/TAGYi12138/devin_byok.git
cd devin_byok/extension
npm install
npm run check:patch
npm run check:code
npm run package
```

安装包生成在仓库根目录，文件名为 `devin-byok-bridge-1.1.50.vsix`。`npm run package` 调用 `tools/build-vsix.ps1`，并使用 `packaging/` 中的清单文件。

在 Devin 的扩展页面选择“从 VSIX 安装”，选中生成的文件，再重新加载窗口。

## 快速开始

1. 点击侧边栏的 **Devin Model Gateway**，或在命令面板执行 **Devin Model Gateway: 打开控制面板**。
2. 添加供应商，填写 Base URL、API Key，并选择与供应商一致的 API 协议。
3. 添加或选择供应商支持的模型，设置模型能力与上下文参数。
4. 在 Cascade 或 Local 模型绑定中，将需要使用的原生模型入口绑定到目标供应商模型。
5. 按面板提示启动对应代理、安装必要的原生适配并重新加载窗口，然后新建会话验证。

未绑定的模型继续使用 Devin 官方服务。API Key 与模型配置在使用时填写，不需要写入源码。

## 代码补全

打开控制面板中的 **代码补全** 区块，启用补全，选择供应商和模型后保存。也可以在命令面板中搜索“代码补全”进行配置。优先选择响应较快的代码模型。

| 设置 | 默认值 | 用途 |
| --- | --- | --- |
| `byokBridge.completion.enabled` | `true` | 启用网关代码补全 |
| `byokBridge.completion.providerId` | 空 | 留空自动选择已绑定模型的供应商 |
| `byokBridge.completion.model` | 空 | 留空使用已有模型绑定 |
| `byokBridge.completion.timeoutMs` | `15000` | 每次补全的最长等待时间，单位毫秒 |

关闭网关补全后，继续使用 Devin 官方补全。编辑器的行内建议设置也需要启用。

## Remote SSH 与可选工具

先启动本机 Local 网关，再连接 SSH 主机。默认本机端口为 `6778`，远端回环转发端口为 `16778`。首次同步远端配置后，按提示断开并重新连接。

子代理和 MCP 的使用步骤、代理端口及排错入口见[使用说明](extension/readme.md)。可选 MCP 工具可能在首次开启时下载安装依赖，或连接对应的远程服务。

## 目录

```text
extension/                  插件入口、面板、模型适配和本地代理
  server/                   协议适配、流处理、补全与图片处理
  scripts/                  检查、回归测试和打包入口
  devin-plugin/             子代理配置
packaging/                  VSIX 清单与内容类型定义
tools/build-vsix.ps1        Windows 本地打包脚本
```

## 检查与测试

在 `extension/` 目录中执行：

```powershell
npm run check:patch
npm run check:code
npm run test:completion
npm run test:completion-lifecycle
```

其他专项测试入口见 `extension/package.json`。原生适配与浏览器测试可能需要本机 Devin 程序文件或额外的浏览器环境。

## 许可证

使用与分发条件见 [LICENSE.txt](extension/LICENSE.txt)。
