# Devin Model Gateway

将 Devin 的 Cascade 与 Local 模型请求路由至自定义 OpenAI 兼容或 Anthropic 原生 API，支持多供应商、模型绑定、协议适配、上下文管理和 Remote SSH。

## 项目说明

这是一个 VS Code 扩展，用于统一配置 Devin 的模型供应商和模型绑定。绑定的模型请求由本地网关完成路由与协议适配，未绑定的模型继续使用 Devin 官方服务。

## 使用方法

1. 安装扩展
2. 在 VS Code 设置中配置 API 供应商地址
3. 重启 VS Code 即可使用

## 许可证

请参考 `extension/LICENSE.txt` 中的许可证条款。

## 主要能力

- 接入 OpenAI 兼容与 Anthropic 原生 API
- 分别管理 Cascade 与 Local 的模型绑定
- 支持上下文管理、视觉请求和提示词缓存
- 历史管理默认采用原生保真模式：Local 普通请求与 Cascade 缓存历史均不再由桥接层预先裁剪；仅在上游明确拒绝上下文长度且尚未产生输出或工具调用时，Local 执行一次压缩重试。可用 `BYOK_LOCAL_HISTORY_FALLBACK=proactive` 临时恢复 Local 旧主动裁剪模式；仅在兼容旧 Cascade 行为时显式设置 `BYOK_HISTORY_COMPRESS=1`。
- 支持 Windows 本地与 Linux Remote SSH 工作区
- 支持安装 Devin Local 原生子代理配置，并为 `subagent-default` 请求单独选择 Local 模型绑定
- 提供代理状态、日志和崩溃诊断

## 1.1.23 验收补救

1.1.23 曾默认依据命令结果检查验收待办，缺少匹配通过证据的 completed 会保留为 pending；通用终端中的常见进程终止命令也会被拦截。1.1.28 起这些补救默认关闭，边界和按需开启方式见 [扩展说明](extension/readme.md)。

本版保留 1.1.22 的流处理改进，并修正“创建浏览器测试”被误判为验收的情况；没有新证据时，重复提交同一完成申请会被停止。

## 1.1.24 验收状态回报

当重复验收待办调用被停止且模型没有留下正文时，网关会在最终回复中列出当前待办状态及最近的验证结果，避免只剩一条抽象警告。

## 1.1.25 阶段待办分类

将“阶段三：扩展页面表单、余额、错误提示和持久化记录”等实现任务与持久化验收分开；补充、完善等实现阶段也不会因标题包含浏览器测试而被误拦截。明确写有运行或验证动作的待办仍需对应通过证据。

## 1.1.26 陈旧证据测试收尾

源码改动后仍拒绝沿用旧验证结果；记录验证结果、清理探针等非验收动作可正常完成。待办因缺少新证据被改回 pending 后，下一次请求会提醒模型继续用户要求的清理与重验步骤，避免只重复提交待办。

## 1.1.27 长任务探索阶段误判修复

修正“检查现有代码、存储结构与测试约定”被误判为测试验收，继而在重复待办调用时截断长任务的问题。探索项目与测试约定不要求测试通过证据；明确运行测试或检查测试结果的待办仍按实际结果验收。

## 1.1.28 原生执行优先

BYOK 继续负责模型路由、协议转换和传输兼容；默认不向 Devin 请求追加语言或执行提示，不改写验收待办，也不拦截 Devin 的终端工具调用。需要排查特定问题时，可分别显式设置 `BYOK_LOCAL_RESPONSE_LANGUAGE_PROMPT=on`、`BYOK_LOCAL_EXECUTION_PROMPTS=on`、`BYOK_LOCAL_ACCEPTANCE_GUARD=on`、`BYOK_LOCAL_PROCESS_GUARD=on`，仅开启所需补救。

自动原生长测脚本默认禁止在共享桌面主机执行。只有在专用、具有进程隔离的虚拟机中，明确设置 `DEVIN_AB_ISOLATED_HOST=1` 才能启动；该开关是运行者声明，不提供或检测系统隔离。日常回归使用只连接本机模拟接口、不执行模型命令的测试。

## 从源码构建本地插件

当前本地版：1.1.46。详细功能说明见 [扩展说明](extension/readme.md)。

在 extension 目录执行 npm install，然后执行 npm run check:patch 和 npm run check:code。返回项目根目录，执行 powershell -NoProfile -ExecutionPolicy Bypass -File tools/build-vsix.ps1，生成本地 VSIX 安装包。

本仓库此次同步仅包含本地插件及构建所需文件。
