"use strict";

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawn, spawnSync } = require("node:child_process");

// Add future MCP servers here. Local npm servers are installed on first use;
// remote servers only need a URL in the Devin project config.
const CATALOG = Object.freeze([
  Object.freeze({
    name: "playwright",
    label: "浏览器工具 · Playwright",
    description: "浏览页面、点击、读取内容和截图（约 25 个工具）",
    packageName: "@playwright/mcp",
    version: "0.0.83",
    cliPath: ["node_modules", "@playwright", "mcp", "cli.js"],
    aliases: ["playwright-mcp", "browser-mcp/node_modules/@playwright/mcp"],
    requiresBrowser: true,
    launchArgs(browser) { return ["--browser", browser, "--headless", "--isolated"]; },
  }),
  Object.freeze({
    name: "context7",
    label: "开发文档 · Context7",
    description: "查询较新的库文档和版本用法（2 个工具）",
    kind: "remote",
    url: "https://mcp.context7.com/mcp",
  }),
  Object.freeze({
    name: "threejs-devtools-mcp",
    label: "Three.js 场景调试",
    description: "检查场景、材质和性能（需运行 Three.js 开发服务器，约 60 个工具）",
    packageName: "threejs-devtools-mcp",
    version: "0.4.1",
    minNodeMajor: 22,
    cliPath: ["node_modules", "threejs-devtools-mcp", "dist", "index.js"],
    launchArgs() { return []; },
  }),
  Object.freeze({
    name: "blender",
    label: "Blender 建模",
    description: "在本机 Blender 中建模、编辑材质并导出 GLB（需启动 Blender 内的连接）",
    kind: "uvx",
    packageName: "mcp-for-blender",
    aliases: ["blender-mcp"],
    version: "2.1.1",
    uvArgs: ["--python", "3.11", "--from", "mcp-for-blender==2.1.1", "mcp-for-blender"],
  }),
]);

const installs = new Map();

function catalogEntry(name) {
  const entry = CATALOG.find(item => item.name === name);
  if (!entry) throw new Error("未知 MCP 工具：" + name);
  return entry;
}

function configPath(workspaceDir) {
  if (!workspaceDir || !path.isAbsolute(workspaceDir)) throw new Error("请先打开一个本地项目");
  return path.join(workspaceDir, ".devin", "mcp_config.local.json");
}

function runtimeDir(entry, options = {}) {
  const base = options.runtimeBase || path.join(
    process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming"),
    "Devin-BYOK-Bridge", "mcp"
  );
  return path.join(base, entry.name);
}

function readConfig(file) {
  if (!fs.existsSync(file)) return { mcpServers: {} };
  const value = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("MCP 配置文件格式无效");
  if (value.mcpServers != null && (typeof value.mcpServers !== "object" || Array.isArray(value.mcpServers))) {
    throw new Error("MCP 配置中的 mcpServers 格式无效");
  }
  return value;
}

function writeConfig(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temporary = file + "." + process.pid + ".tmp";
  try {
    fs.writeFileSync(temporary, JSON.stringify(value, null, 2) + "\n", "utf8");
    fs.renameSync(temporary, file);
  } finally {
    if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
  }
}

function installedVersion(entry, options = {}) {
  if (entry.kind === "remote") return "";
  if (entry.installedVersion) return entry.installedVersion(runtimeDir(entry, options));
  if (entry.kind === "uvx") {
    try { return fs.readFileSync(path.join(runtimeDir(entry, options), ".installed-version"), "utf8").trim(); }
    catch { return ""; }
  }
  const file = path.join(runtimeDir(entry, options), "node_modules", ...entry.packageName.split("/"), "package.json");
  try { return JSON.parse(fs.readFileSync(file, "utf8")).version || ""; }
  catch { return ""; }
}

function isCompatibleServer(entry, server) {
  if (!server || typeof server !== "object" || Array.isArray(server)) return false;
  if (entry.kind === "remote") {
    return (server.url === entry.url || server.url === entry.url + "/oauth") && !server.command;
  }
  if (server.url) return false;
  const command = String(server.command || "");
  const args = Array.isArray(server.args) ? server.args.map(String).join(" ") : "";
  const launch = (command + " " + args).toLowerCase().replace(/\\/g, "/");
  return [entry.packageName, ...(entry.aliases || [])]
    .some(name => launch.includes(String(name).toLowerCase()));
}

function findOnPath(filename, env = process.env) {
  const pathValue = env.PATH || env.Path || "";
  for (const dir of pathValue.split(path.delimiter)) {
    if (!dir) continue;
    const candidate = path.join(dir.replace(/^"|"$/g, ""), filename);
    if (fs.existsSync(candidate)) return candidate;
  }
  return "";
}

function findNode(env = process.env, minMajor = 18) {
  const names = process.platform === "win32" ? ["node.exe"] : ["node"];
  const candidates = names.map(name => findOnPath(name, env)).filter(Boolean);
  if (process.platform === "win32") candidates.push(path.join(env.ProgramFiles || "C:\\Program Files", "nodejs", "node.exe"));
  for (const candidate of candidates) {
    if (!fs.existsSync(candidate)) continue;
    const result = spawnSync(candidate, ["--version"], { encoding: "utf8", windowsHide: true, timeout: 5000 });
    const major = Number((result.stdout || "").match(/^v(\d+)/)?.[1]);
    if (result.status === 0 && major >= minMajor) return candidate;
  }
  throw new Error("需要 Node.js " + minMajor + " 或更新版本；请先安装 Node.js");
}

function findUvx(env = process.env) {
  const filename = process.platform === "win32" ? "uvx.exe" : "uvx";
  const home = env.USERPROFILE || env.HOME || os.homedir();
  const candidates = [findOnPath(filename, env), path.join(home, ".local", "bin", filename)];
  for (const candidate of candidates) {
    if (!candidate || !fs.existsSync(candidate)) continue;
    const result = spawnSync(candidate, ["--version"], { encoding: "utf8", windowsHide: true, timeout: 5000 });
    if (result.status === 0) return candidate;
  }
  throw new Error("未找到 uvx；请先从 https://docs.astral.sh/uv/getting-started/installation/ 安装 uv");
}

function findBrowser(env = process.env) {
  if (process.platform === "win32") {
    const roots = [env.ProgramFiles, env["ProgramFiles(x86)"], env.LOCALAPPDATA].filter(Boolean);
    for (const [channel, suffix] of [
      ["chrome", ["Google", "Chrome", "Application", "chrome.exe"]],
      ["msedge", ["Microsoft", "Edge", "Application", "msedge.exe"]],
    ]) {
      for (const root of roots) if (fs.existsSync(path.join(root, ...suffix))) return channel;
    }
  } else {
    if (findOnPath("google-chrome", env) || findOnPath("chromium", env)) return "chrome";
    if (findOnPath("microsoft-edge", env)) return "msedge";
  }
  throw new Error("未找到 Chrome 或 Edge；请先安装其中一个浏览器");
}

function npmCliForNode(nodePath) {
  const cli = path.join(path.dirname(nodePath), "node_modules", "npm", "bin", "npm-cli.js");
  if (!fs.existsSync(cli)) throw new Error("未找到 npm；请安装包含 npm 的 Node.js");
  return cli;
}

function runInstall(nodePath, entry, target) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(target, { recursive: true });
    const args = [npmCliForNode(nodePath), "install", "--prefix", target, "--no-save", "--omit=dev",
      "--no-audit", "--no-fund", "--ignore-scripts", "--registry=https://registry.npmjs.org",
      entry.packageName + "@" + entry.version];
    const child = spawn(nodePath, args, {
      windowsHide: true,
      env: { ...process.env, PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: "1" },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    for (const stream of [child.stdout, child.stderr]) stream.on("data", chunk => { output = (output + chunk).slice(-4000); });
    const timer = setTimeout(() => { child.kill(); reject(new Error("安装超时；请检查网络后重试")); }, 180000);
    child.on("error", error => { clearTimeout(timer); reject(error); });
    child.on("close", code => {
      clearTimeout(timer);
      code === 0 ? resolve() : reject(new Error("安装失败：" + output.trim().slice(-1200)));
    });
  });
}

function runBlenderInstall(uvxPath, entry, target) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(target, { recursive: true });
    const child = spawn(uvxPath, [...entry.uvArgs, "install-addon"], {
      windowsHide: true,
      env: { ...process.env, UV_PYTHON_PREFERENCE: "only-managed" },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    for (const stream of [child.stdout, child.stderr]) stream.on("data", chunk => { output = (output + chunk).slice(-4000); });
    const timer = setTimeout(() => { child.kill(); reject(new Error("Blender MCP 安装超时；请检查网络后重试")); }, 300000);
    child.on("error", error => { clearTimeout(timer); reject(error); });
    child.on("close", code => {
      clearTimeout(timer);
      if (code !== 0) return reject(new Error("Blender MCP 安装失败：" + output.trim().slice(-1200)));
      fs.writeFileSync(path.join(target, ".installed-version"), entry.version + "\n", "utf8");
      resolve();
    });
  });
}

async function ensureRuntime(entry, nodePath, options = {}) {
  if (installedVersion(entry, options) === entry.version) return;
  const target = runtimeDir(entry, options);
  if (!installs.has(target)) {
    const promise = (options.install || entry.install || (entry.kind === "uvx" ? runBlenderInstall : runInstall))(nodePath, entry, target)
      .then(() => {
        if (installedVersion(entry, options) !== entry.version) throw new Error("安装完成，但 MCP 版本校验失败");
      })
      .finally(() => installs.delete(target));
    installs.set(target, promise);
  }
  await installs.get(target);
}

function status(workspaceDir, options = {}) {
  const file = configPath(workspaceDir);
  const config = readConfig(file);
  return CATALOG.map(entry => {
    const server = config.mcpServers?.[entry.name];
    const compatible = server == null || isCompatibleServer(entry, server);
    return {
      name: entry.name,
      label: entry.label,
      description: entry.description,
      kind: entry.kind || "local",
      enabled: !!server && server.disabled !== true && compatible,
      installed: entry.kind !== "remote" && installedVersion(entry, options) === entry.version,
      external: entry.kind !== "remote" && entry.kind !== "uvx" && !!server && compatible && !String(server.args || "").includes(runtimeDir(entry, options)),
      conflict: !compatible,
      version: entry.version,
    };
  });
}

async function setEnabled(workspaceDir, name, enabled, options = {}) {
  const entry = catalogEntry(name);
  const file = configPath(workspaceDir);
  const config = readConfig(file);
  const servers = config.mcpServers || (config.mcpServers = {});
  const existing = servers[name];
  if (existing && !isCompatibleServer(entry, existing)) {
    throw new Error("当前项目已有同名但不同的 MCP 配置；请先手动处理：" + file);
  }
  if (!enabled) {
    if (existing && existing.disabled !== true) {
      servers[name] = { ...existing, disabled: true };
      writeConfig(file, config);
    }
    return status(workspaceDir, options);
  }
  if (entry.kind === "remote") {
    servers[name] = {
      ...(existing || {}),
      url: existing?.url || entry.url,
      transport: "http",
      disabled: false,
    };
    writeConfig(file, config);
    return status(workspaceDir, options);
  }
  if (entry.kind === "uvx") {
    const uvxPath = options.uvxPath || findUvx(options.env);
    await ensureRuntime(entry, uvxPath, options);
    servers[name] = {
      ...(existing || {}),
      command: uvxPath,
      args: entry.uvArgs,
      env: {
        UV_PYTHON_PREFERENCE: "only-managed",
        UV_OFFLINE: "1",
        BLENDER_HOST: "localhost",
        BLENDER_MCP_SAFE_MODE: "1",
        ...(existing?.env || {}),
      },
      transport: "stdio",
      disabled: false,
    };
    writeConfig(file, config);
    return status(workspaceDir, options);
  }
  const nodePath = options.nodePath || findNode(options.env, entry.minNodeMajor || 18);
  const browser = entry.requiresBrowser ? options.browser || findBrowser(options.env) : "";
  await ensureRuntime(entry, nodePath, options);
  const cli = path.join(runtimeDir(entry, options), ...entry.cliPath);
  if (!fs.existsSync(cli)) throw new Error("MCP 启动文件不存在：" + cli);
  servers[name] = {
    ...(existing || {}),
    command: nodePath,
    args: [cli, ...entry.launchArgs(browser)],
    transport: "stdio",
    disabled: false,
  };
  writeConfig(file, config);
  return status(workspaceDir, options);
}

module.exports = { CATALOG, configPath, runtimeDir, status, setEnabled, findNode, findUvx, findBrowser };
