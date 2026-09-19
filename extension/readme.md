# Devin BYOK Bridge（自用版）

在 Devin 里把 Cascade / Devin Local 的模型请求，按你的配置路由到自己填写的 **OpenAI 兼容或 Anthropic 原生 API 供应商**（Base URL + API Key）。没绑定的模型继续走官方服务，绑定的模型由本地代理中转。

本版本为**个人自用构建**，已移除在线更新。1.0.61 将未明确选择第三方绑定时的默认路由恢复为 Devin 官方免费 SWE-1.6 Slow；保存、调整或删除第三方绑定不再改变全局兜底。Local/Cascade 每个模型绑定仍支持显式 300K/1M 上下文选择，Devin 官方压缩仍为第一路径。

## 1.0.74 原生延迟提交与首请求路由修复

- 按真实 Devin Local 生命周期处理模型选择：`_G` 在点击时只写 `clientSideConfigValues`，宿主在发送 prompt 前才 flush `session/set_config_option`。插件不再等待点击后并不存在的即时 ACP 回声，也不再使用 10 秒确认超时。
- 有真实会话 ID 时，选择按该 ID 串行写入路由表；快速 A → B 保证 B 最后落盘。没有 ID 的草稿仍执行原生 `Yce` 暂存，取得 ID 后再绑定并同步到具体 ACP 会话。
- 草稿组件在取得 ID 时若发生 remount，第一条请求仍可使用该请求自身携带、且当前确实已绑定的 wire UID。这个兜底只作用于当前请求和当前 metadata session，不读取全局/最近选择，也不会借用其他会话记录。
- 回归现在模拟宿主的延迟 flush，不再由 mock 在 `dispatch` 后伪造 `configOptions[].currentValue`。覆盖无回声持久化、无 10 秒超时、草稿绑定、快速切换顺序、官方整数 request ID、首请求 wire UID 和双会话隔离。
- 适配器升级为 Sessions V7 / Editor V5，并保留 V2–V6 / Editor V1–V4 的精确卸载与升级路径。

## 1.0.73 ACP 确认门禁与运行中证据（已被 1.0.74 纠正）

> 本节的“点击后等待 provider 确认”假设不符合 Devin Local 的真实实现：宿主会延迟到发送 prompt 前提交模型配置。1.0.74 已移除该门禁与相应的模拟确认测试。

- 模型点击先发原生 `session/set_config_option`；只有 provider 返回的 `configOptions[].currentValue` 与目标 UID 一致后，插件才持久化该会话的路由选择。Redux 的乐观值和 `dispatch` 返回值不再被当作 ACP 成功。
- 新增 Sessions V6 / Editor V4 运行适配器握手，并记录 `mounted → selection-requested → acp-confirmed → selection-persisted`；超时和落盘失败有独立阶段，日志中的会话只保留稳定哈希。
- 快速 A → B 切换使用选择 epoch 与串行持久化队列；A 的迟到确认不能覆盖 B。会话恢复不再因乐观模型值变化而重新运行、覆盖用户刚发出的选择。
- 磁盘补丁发生变化后自动重载当前窗口，避免“新版本已安装、当前 renderer 仍执行旧代码”造成假验证。
- 模拟回归覆盖未确认不落盘、确认后落盘、A → B 迟到确认、Sessions / Editor 双入口、旧标记升级、双文件校验与回滚。实际修复仍须以重载后的 ACP 日志、`sessions.db` 和请求 `wireUid` 联合验收。

## 1.0.72 原生会话路由修复与身份诊断

> 1.0.73 复核确认：1.0.72 的磁盘补丁未在当时窗口重载，而且选择器在 ACP 确认前就保存选择；因此下列“已修复”结论不构成真实窗口验收。

- 修复 Sessions 与编辑器选择器只保存插件选择、却没有把已确认的绑定 UID 写回 ACP 会话配置的问题；新选择和旧会话恢复都会在服务端确认后同步到原生会话。
- 真实 `GetChatMessage.chat_model_uid` 现在直接携带当前会话选择。路由不再依赖并不存在的 `Metadata.session_id`，也不需要推断 UI 会话 ID 与 `cascade_id` 的对应关系。
- 隔离原生 ACP 探测覆盖两个会话并发选择 GLM Flash / DeepSeek：请求得到不同 `cascade_id`，且各自始终携带自己的模型 UID；探测使用 `CHISEL_SESSION_DB` 临时数据库并核验真实 `sessions.db` 未变化。
- 修正官方 `Metadata.request_id` 为 protobuf 整数时被当作字符串读取的问题；同时兼容旧字符串格式，并为 64 位整数保留精确值。
- 每个 `GetChatMessage` 入口记录 `[BYOK-IDENTITY]`：只记录稳定哈希、protobuf wire type、字段形状、选择命中方式、候选数量和最终 UID，不记录消息正文或密钥。
- 原生选择动作记录同算法的 `[BYOK-SELECT-ID]` 会话哈希，可直接与请求入口日志核对；相同 UID 在不同窗口重复选择也会分别记录。
- 会话未命中或后缀歧义时明确记录 `session-miss` / `suffix-ambiguous`，保持请求原始 UID，不使用名称、消息内容、全局选择或“最近选择”猜测归属。
- 回归覆盖官方整数 request ID、精确/唯一后缀命中、未命中 fail-safe、双会话同文案并发、共享供应商并发、取消隔离以及响应流隔离。

## 1.0.58 官方压缩优先

- 默认将压缩请求交给 Devin 官方处理。
- 需要测试自有压缩时，可在启动 Local 代理前设置 `BYOK_LOCAL_COMPACTOR_POLICY=byok`；该模式使用已验证的会话路由。
- 官方响应会记录传输成功、失败或未知；摘要是否被 Devin 采纳仍以客户端最终状态为准。

## 1.0.57 原生压缩会话关联

> 1.0.72 的原生探测已确认当前 Devin CLI 不发送 `Metadata.session_id`；本节所述旧关联方案已被 1.0.72 的原生 `chat_model_uid` 会话配置方案取代。

- 保留 Devin 原生压缩触发、提示词、历史范围和摘要回接；插件只负责已绑定模型的路由与协议适配。
- 使用请求协议中的 `Metadata.session_id` 关联普通聊天与压缩请求，不再依赖会变化的消息 ID 或压缩包装正文。
- 两个并发会话按原生 session ID 隔离；无法证明会话归属时安全转交官方，不按“最近模型”猜测。
- 分别统计压缩请求、会话命中、BYOK 成败、官方转交以及官方传输响应成功/失败/未知。
- 官方 HTTP 响应只记作传输层结果，并明确标注摘要是否被 Devin 采纳仍不可由代理直接观测。

## 1.0.56 编辑器与 Sessions 双入口

- 同时适配编辑器实际加载的 `windsurf-chat-client/index.js` 与独立 Sessions 界面；不再因为 Sessions 文件存在就遗漏编辑器入口。
- 两个入口均支持默认绑定激活、菜单目录刷新、绑定 UID 精确判断和官方模型原生选择。
- 安装前校验所有目标与 checksum；两个模块及 product.json 统一写入，失败时回滚已写入的文件。
- 磁盘完整性检查覆盖两个入口；安装日志列出实际目标，持续提示本轮写入所需的窗口重载，不把磁盘校验当作运行验证。

## 1.0.55 Sessions 选择器一致性

- 原生模型目录、绑定 UID 和默认 UID 使用同一次服务端快照；首次加载、打开下拉、切换会话及绑定变化后都会刷新。
- 新会话会激活当前默认绑定；用户明确切回官方模型后会保留官方选择，不再被默认绑定覆盖。
- 仅当前真实绑定的 UID 走 BYOK；未绑定官方模型继续使用 Devin 原生选择流程。
- 异步选择使用顺序保护并等待服务端确认，避免旧响应、旧回调或原生自动纠正覆盖输入框中的最新选择。
- 安装器可在完整验证后将 Sessions V2 原地升级为 V3，卸载仍精确恢复干净宿主文件。

## 1.0.54 Devin 1.126 宿主健康检查

- P3 支持 Devin 1.126 原生的 `localhost:6688` inference 输入结构；默认端口判定为已应用，自定义端口仍可检测漂移并同步。
- 完整 Sessions 原生适配器已安装时，Local 解锁明确跳过废弃的 Workbench `bn/Qde` 选择器分支，不再误报锚点缺失。

## 1.0.53 Devin 1.126 Sessions 适配

- 原生 ACP 模型选择器和上下文用量适配迁移到 `sessions.desktop.main.js`，不再把旧选择器锚点强行应用到 Workbench。
- 补丁安装、重复安装和卸载严格互逆；锚点漂移或 checksum 不一致时保持原文件不变。
- 本地模型选择按 Devin 会话保存；切换会话会恢复该会话的选择，切回官方模型会清理兼容路由。
- 新 Sessions 主机明确跳过已经过时的 Workbench Qde 路径，避免无意义的兼容警告。

## 1.0.52 会话模型与压缩路由

- 自定义 BYOK UID 属于兼容路由，不冒充 CLI 已接受的原生模型；官方模型仍由 CLI 原生切换。
- 移除模型选择器加载时的全局自动同步，避免旧会话或其他会话的选择被自动写入当前会话。
- 兼容选择提示的有效期缩短为 10 分钟，仅用于紧邻的 SWE 占位请求恢复。
- 压缩请求无法可靠关联父会话时不再静默回退到普通 BYOK 默认模型，而是交给 Devin 官方压缩路径处理，避免跨模型和重试循环。
- 如需固定由某个已绑定 UID 执行压缩，可设置 `BYOK_LOCAL_COMPACTOR_UID`；未设置时保持上述官方压缩降级。

## 1.0.51 原生控制权恢复

- 不再从任意工具文本中的 `done / completed / succeeded / passed` 推断当前任务或子操作完成；旧日志、源码示例和数据库内容只作为普通工具观察返回给模型。
- 循环状态机只保留内部诊断，不再注入“调查已经足够”的权威系统消息，也不再临时隐藏读取、搜索或浏览工具。
- compactor 输出原样返回，不再把压缩包装、旧摘要或任意工具文本二次附加为 `<byok_recent_execution_evidence>`；继续保留 Devin 原生三段摘要和最近原始消息。
- compactor 只使用可验证的会话绑定；关联失败时使用用户显式配置的默认绑定，不再根据“最近成功模型”的时间邻近关系猜测跨会话路由。
- 回复语言会回看最近真实用户消息，忽略 `Conversation to summarize` 等压缩包装，并支持显式切换为英文；该约束只影响用户可见回复，不改写工具参数和协议字段。
- 增加 `BYOK_LOCAL_PROTOCOL_DIAGNOSTICS=1` 诊断开关，只记录上游协议、模型、消息/系统块数量、工具名、工具契约哈希、tool choice 哈希和请求字节数，不记录密钥或消息正文。
- 回归测试验证 `todo_write` 的名称、描述、JSON Schema 和 tool choice 在 OpenAI 兼容与 Anthropic 原生协议中的传输保持一致。是否主动规划仍取决于模型本身。

## 1.0.50 原生会话连续性

- `compactor` 优先按稳定 messageId/工具调用/任务锚点关联到原会话绑定，不再仅依赖 30 秒“最近成功模型”提示；长时间工具运行结束后仍使用同一会话模型，短期提示只作为无法识别会话时的兼容回退。
- 保留 Devin 宿主自动触发 compactor 的原生节奏，不跳过内部检查点；压缩请求继续禁用工具和 reasoning，并保持 Devin 自带的三段摘要契约。
- 压缩附加证据改为最近工具结果、结构化计划和终态的有界增量，默认最多 4800 字符；会剔除旧的 `<byok_recent_execution_evidence>`，避免摘要递归膨胀。
- 通用识别工具结果中的 `done / completed / succeeded / passed` 结构化终态，并按 thread/job/run/operation/artifact ID 去重。终态只完成对应子操作，提示主模型与当前计划核对，不把任意子任务误判为整个用户任务完成。
- 从最近真实用户消息检测中文、日文或韩文，并以独立的最小系统约束保持用户可见的思考、进度和最终回复语言；代码、路径、标识符和原生协议标题保持原样。

## 1.0.49 原生风格执行状态机

- 保留 protobuf turn 的稳定 `messageId`，优先用真实消息连续性关联会话状态；工具调用 ID 和用户任务锚点仅作为兼容回退。
- 以结构化计划和真实工具结果推进 `investigate → implement → verify/recover`，重复提交未变化的计划不再被视为新进展。
- 编辑目标或创建 `_e2e*`、`_verify*`、测试脚本后进入待验证阶段；只有实际运行验证并成功返回，才清除待验证状态并推进下一计划步骤。
- 记录失败结果指纹，识别 PowerShell `&&`、控制台 GBK 编码和缺少 Unix `head` 等重复失败，要求改变执行策略而不是继续复现。
- 第一次停滞只注入结构化 `<execution_state>`；连续无视两次后临时隐藏纯读取、搜索和浏览工具一轮，仍保留编辑、执行和计划工具作为 BYOK 兜底。

## 1.0.48 跨压缩调查循环保护

- 执行保护按会话累计调查状态，不再只看 compactor 之后的短消息窗口；通过重叠工具调用和用户任务锚点关联连续请求，并以 30 分钟 TTL、128 会话上限隔离和清理状态。
- `docker ps`、HTTP GET、SQLite SELECT、文件读取/搜索以及未知的只读 shell 命令不再被误判为代码实施；编辑 `_probe*`、`_inspect*` 等临时诊断脚本同样继续消耗调查预算。
- 真正编辑目标文件、执行 PUT/POST 等变更命令、运行测试/构建或更新结构化计划时才开启新的执行阶段并重置预算。
- 连续 6 个只读请求、累计 12 个调查工具，或同一目标至少重复 3 次且累计调查达到 8 次时，会注入明确的执行指令；即使不断更换读取目标，也不会绕过保护。

## 1.0.47 续跑会话模型路由

- 当 Devin 续跑旧会话仍发送 `swe-1-6-slow/fast` 占位 UID 时，代理会使用最近一次原生模型选择器记录的 BYOK 模型，确保界面选中的 DeepSeek、Claude 或其他绑定模型真正用于请求。
- 显式模型 UID 和 `compactor`、`memory-migration-default` 等内部 UID 仍保持最高优先级，不会被全局选择覆盖。
- 选择记录默认 24 小时后失效，可用 `BYOK_LOCAL_SELECTED_MODEL_TTL_MS` 缩短（最长仍限制为 24 小时）；代理日志会记录 `[BYOK-SESSION-ROUTE]` 以便核对实际路由。

## 1.0.46 执行连续性与重复读取保护

- 压缩摘要携带最近的真实工具调用、路径和结果证据，避免压缩后重新调查已经确认的文件。
- 本地回退压缩保留成功的工具结果以及最新结构化计划，不再只保留错误工具输出。
- 检测到同一目标连续重复读取且没有编辑、计划更新或测试执行时，会注入执行保护，要求进入下一项具体动作。
- 自动压缩仍使用 Devin 原生摘要格式和当前会话模型；上述连续性证据不改变任务计划状态，也不会凭空推断完成情况。

## 1.0.45 原生压缩与任务状态连续性

- `compactor` 仍由 Devin 自动触发，不作为工具暴露给主模型，也不允许压缩轮次调用读文件、搜索或执行工具。
- 插件不再追加 1.0.44 的“调查阶段”六段模板，而是原样转发 Devin 自带的 `<summary>`、`Overview`、`Key Details & Breadcrumbs`、`Current State` 提示词。因此编码中、测试失败、等待用户或需求变更都能按真实阶段交接。
- 压缩继续跟随当前对话绑定的模型和供应商，使用独立的 4096-token 输出预算，不继承主对话的 high/max reasoning。可用 `BYOK_LOCAL_COMPACTOR_MAX_TOKENS` 覆盖，合法范围 1024～8192。
- 本地溢出兜底按 token 预算切分旧前缀，并至少保留最近 4 个完整用户交互回合；从真实用户消息边界切分，避免拆开 assistant 工具调用及其 tool result。可用 `BYOK_LOCAL_HISTORY_RECENT_TURNS` 调整为 2～12。
- 若最后一次 `todo_write`、`update_plan`、`todo_list` 或 `update_todo_list` 位于被压缩的旧前缀，插件会把该次结构化参数及匹配结果作为独立的 `<last_todo_list>` 状态原样保留。它不进入自然语言摘要，不推断或改写 `pending / in_progress / completed`；若更新版本的计划仍在最近原始回合中，则不重复旧计划。
- 原生 Devin 仍负责创建、更新和显示计划；插件没有建立第二套会话编排器。日志只报告原生摘要三段结构、最近保留回合数，以及是否额外保存了旧前缀中的结构化计划，不记录正文或密钥。

## 1.0.43 压缩模型跟随当前对话

- 普通模型请求成功后记录短期、受限的路由提示；紧随其后的 `compactor` / `memory-migration-default` 使用同一绑定模型和供应商，不再无条件落到全局默认模型。
- 不使用跨对话的全局“最后选择模型”。3 秒内若有多个不同模型并发完成，路由会判定为歧义并回退到用户配置的默认绑定，防止把一个会话的压缩内容发给另一个模型供应商。
- 日志增加 `wire=compactor` 与 `compactorRoute=follow-current:recent-success`；只有缺少、过期或歧义提示时才出现 `compactorRoute=fallback-default:*`。

## 1.0.42 Workbench 重新适配

- 重新启用当前 Devin Next Workbench 的安全 renderer 适配。补丁只在版本锚点、校验和和备份检查通过时写入，遇到不兼容版本会自动跳过。
- 恢复输入框中的原生上下文圆环；上下文数据来自本地 `6778/api/v2/context-snapshot`，可见窗口约 5 秒轮询，隐藏窗口暂停，显示真实的 `tokensUsed / contextLimit`（例如 `26K / 1M`）。
- 保留 renderer 侧的聊天队列、模型切换和 ACP 快照降频/可见性保护，避免恢复 UI 的同时重新引入高频轮询。

## 1.0.42 上下文状态、压缩与绑定上限

- 恢复 Devin 原生上下文圆环所需的 Local usage 快照，但只在可见窗口轮询：运行中约 5 秒、空闲 15 秒，切换模型/会话时自动隔离，隐藏窗口暂停。
- 上下文桥只依赖原生组件稳定提供的会话 ID；模型 UID 为可选提示，避免变量作用域变化导致原生上下文组件整体不渲染。
- 按绑定模型真实上下文窗口计算：优先使用显式绑定值和 Devin 原生模型 protobuf；未知模型默认 300K，安全上限 2M。
- 本地历史压缩默认在 78% 触发，压到 58%（1M 模型约 780K→580K；300K 模型约 234K→174K），可用环境变量覆盖。
- Cascade 绑定支持显式 `contextLimit`（规范化到 8K～2M）；未填写时关闭 1M 也按 300K 作为 BYOK 默认值，不再误套 Devin 旧版 200K 限制。内部 `compactor` / `memory-migration-default` 会复用第一个可用 BYOK 绑定，但不改变内部 UID。
- BYOK 默认保留 Devin 的 `run_subagent` 工具，以免复杂编程任务失去子 Agent 能力；如某个供应商不接受该工具，可设置 `BYOK_DISABLE_SUBAGENT=1` 后重启代理临时关闭。

## 1.0.38 原生模型选择

- 配置一次 Local 供应商绑定，之后在 Devin 对话框的原生模型菜单中选择。取消状态栏的“实际模型”选择器。
- 模型来源是 Devin 返回的完整数据，不维护固定型号名单。最新有效响应优先，缺少响应时才回退到本地缓存；列表和分组使用同一份数据。
- 修正 1.0.36 更新了错误数据层的问题：在原生模型选择组件内增加局部数据适配，打开菜单时向本地代理请求一次。保留原生会话选模动作，移除认证状态同步监听。
- 不扫描 React 或 DOM，不新增周期轮询。请求超时 2 秒，响应最多 12 MiB、2000 个模型；关闭菜单或卸载组件时取消请求，完成后清除计时器。读取失败回退原生列表。
- 适配器会验证当前 Devin 版本的代码锚点、保存备份并更新校验和；不兼容时停止安装并提示，不恢复旧界面桥。
- 未绑定模型保留官方可用状态；想用自有 API 调用新模型，需要先在 Local 绑定中配置对应供应商和上游模型。
- 刷新遇到问题，可运行命令 **Devin BYOK Local: 刷新原生模型列表**。升级后请重载 Devin 窗口，以便扩展和本地代理一起加载新版。

---

## 安装

1. **先卸载旧版**：在 Devin 的扩展面板（`Ctrl+Shift+X`）里卸载 `a8-devin-byok`（如有）；
2. **恢复干净的 workbench**（如之前安装过补丁）：完全退出 Devin 后，把
   `D:\Devin Next\resources\app\out\vs\workbench\workbench.desktop.main.js.a8l.bak`
   复制回 `workbench.desktop.main.js`（建议先备份当前文件）；
3. Devin → Extensions → **Install from VSIX** → 选择本包 → 重载窗口；
4. 左侧活动栏点 **Devin BYOK Bridge** 打开面板，或 `Ctrl+Shift+P` 搜“打开控制面板”。

> 不要用 `code --install-extension` 装进 Cursor；也不要与旧的 `a8-devin-local-probe` 同时使用。

---

## 快速开始（三步）

面板顶部有可视化引导，对应下面三步：

1. **添加供应商**：在「供应商列表 → 自定义供应商」点「+」，选择接口协议和提示词缓存 TTL，再填写名称、Base URL、API Key，点「测试连接」通过后保存；Claude 提示词缓存请优先选择 **Anthropic 原生（`/messages`）**。TTL 默认 **5 分钟**，供应商支持时可选 **1 小时**；
2. **绑定模型**：在「Cascade 模型绑定」（或「Local 模型绑定」）点「+」，把想中转的模型家族选到你的供应商；
3. **启动代理**：切到对应 Tab 点「启动」（Local 是开关）。之后未绑定的模型仍走官方，绑定的走你的供应商。

### 发送本地图片

Devin Local 的 protobuf 往往不含粘贴图字节，官方 UI 里能看到缩略图，但 6778 MITM 只能看到纯文本。本版补了三条路：

1. **粘贴 / 拖放 / 选文件**：发送前把图片同步 POST 到 `127.0.0.1:6778/__byok/pending-images`，代理合并进最后一条 user 消息；
2. **文本路径**（兜底）：消息里写本机路径，代理读文件转成 `image_url`，例如 `G:\web\EvalForge\logo-1.jpg 帮我看下这个 logo`；
3. **历史缓存**：按 `messageId` / prompt 记住已转换的图，后续回合切模型时不必再从磁盘读。

绑定行有 **视觉** 勾选（默认开）。关掉后，发给该绑定模型时会去掉图片并加占位说明，避免 `does not support vision`。未强制指定时按模型名猜测；若上游仍返回 vision 相关 400，会先原样重试一次（kimi 中继抖动），再剥图重试一次。

支持 `jpg / jpeg / png / gif / webp / bmp`，单张不超过 15MB；路径也支持 `~/图片/a.png`。改完绑定或补丁后请重载 Devin 窗口，并确认 Local 代理已启动。

---

## 端口

- hybrid：`127.0.0.1:6678`（Cascade）
- inference：`127.0.0.1:6688`（Cascade）
- Local：`127.0.0.1:6778`（Devin Local）
- Remote SSH：Linux 远端默认使用 `127.0.0.1:16778`，由 SSH 反向转发到本机 `127.0.0.1:6778`

### Remote SSH（Windows 本地 + Linux 远端）

插件主体固定运行在本地 UI 扩展宿主，因此进入 SSH 工作区后控制面板和本机 6778 不会退出。首次进入某个 SSH 主机时，插件会：

1. 在本机 SSH config 中为当前主机写入带标记的 `RemoteForward`；
2. 只把本地 CA 的公共证书复制到 Linux 用户目录，不复制 CA 私钥或供应商密钥；
3. 为远端 Devin 进程配置 `127.0.0.1:16778` 和 Linux CA 路径。
4. 将 `Devin Local` 的 ACP 注册表和 ACP 设置同步到 Linux 的 `~/.devin-server-next/data/User`、`data/Machine`，让远程输入框能发现内置 Local agent 及其模型/模式选项。

首次配置或修改端口后，需要重新连接该 SSH 主机。服务器必须允许 TCP 转发（OpenSSH 默认允许）；如果服务器显式设置了 `AllowTcpForwarding no`，需由服务器管理员开启。可在命令面板执行 **Devin BYOK Bridge: 配置当前 SSH 主机** 重新配置，或执行 **Devin BYOK Bridge: 移除当前 SSH 主机配置** 完整删除插件写入的 SSH config 块。

---

## 数据目录

- Windows：`%APPDATA%\Devin-BYOK-Bridge\`
- macOS：`~/Library/Application Support/Devin-BYOK-Bridge/`
- Linux：`~/.config/Devin-BYOK-Bridge/`

常用文件：

- `config\providers.json` —— 供应商资料（**含 API Key，注意保密，不要上传/外发**）
- `config\cascadeBindings.json` —— Cascade 模型家族绑定
- `config\localBindings.json` —— Local 绑定（不含 apiKey）
- `config\.env` —— 端口与运行时配置
- `local-probe\` —— 6778 日志/状态

Local CA 默认在 `%APPDATA%\BYOK-Local-Probe\certs`。

---

## 常见问题

### 停止方式

- **普通停止/关闭**：撤销当前 Tab 的解锁和 BYOK 路由；为便于下次启动，后台探活或 6778 守护可能暂时保留。
- **完全停止（6778）**：在命令面板执行 **Devin BYOK Local: 完全停止（6778）**，清理 Local 代理、`http.proxy`/`agentEnv` 快照和残留进程。Cascade 的 6678/6688 仍需使用 Cascade 自己的停止命令。

### 安装前自检

使用仓库中的 `tools/build-vsix.ps1` 打包时会自动检查：

- `package.json` 的 `main` 文件确实存在；
- VSIX manifest 与 `package.json` 的版本一致；
- 主入口在写入 VSIX 暂存目录后仍然存在。

这样可以避免“VSIX 安装成功但扩展无法激活”的损坏包。

- **端口或补丁异常**：命令面板执行 **Devin BYOK Bridge: 安装补丁**，或查看 **Devin BYOK Bridge: 显示输出日志**；
- **Local 无法启动**：确认 6778 没有被占用，查看 **Devin BYOK Local: 显示输出日志**；必要时执行「完全停止（6778）」再重开；
- **请求没走第三方**：确认绑定行同时选了供应商和上游模型，且对应 Tab 已开启；未绑定入口本来就走官方；
- **API Key 报错**：重新编辑供应商填真实 Key，不要保存带 `****` 的脱敏值；
- **Claude 缓存只有写入、没有读取**：先确认供应商接口协议为 **Anthropic 原生**，并在 Local 日志里检查 `protocol=anthropic`、`cacheCreate` 和 `cacheRead`；旧供应商默认使用 5 分钟 TTL，也可在编辑供应商时改为 1 小时（需上游支持，且可能采用更高的缓存写入费率）；同一模型、Key/租户和 TTL 内的后续主对话请求还需要保持可缓存前缀一致；
- **模型下拉为空**：先启动对应 Tab，在 Devin 里用过一次模型后再刷新绑定行。
