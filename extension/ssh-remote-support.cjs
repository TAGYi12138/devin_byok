"use strict";

const crypto = require("node:crypto");
const childProcess = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const DEFAULT_REMOTE_PORT = 16778;
const LOCAL_PROXY_PORT = 6778;
const AGENT_IDS = ["devin-cli", "devin", "devin-local"];
const REMOTE_AGENT_ENABLE_IDS = ["devin-cli", "claude-acp", "devin-cloud"];

function decodeRemoteAuthority(authority) {
  const text = String(authority || "");
  const prefix = "ssh-remote+";
  if (!text.startsWith(prefix)) return null;
  const encoded = text.slice(prefix.length);
  try {
    const document = JSON.parse(Buffer.from(encoded, "hex").toString("utf8"));
    const host = String(document && (document.hostName || document.hostname) || "").trim();
    return host && !/[\r\n\0]/.test(host) ? host : null;
  } catch {
    // Older remote builds use the host alias directly instead of hex JSON.
    return encoded && !/[\r\n\0]/.test(encoded) ? encoded : null;
  }
}

function remoteFolder(vscode) {
  return (vscode.workspace.workspaceFolders || []).find(folder =>
    folder && folder.uri && folder.uri.scheme === "vscode-remote" &&
    String(folder.uri.authority || "").startsWith("ssh-remote+")
  ) || null;
}

function inferRemoteHome(remotePath) {
  const normalized = String(remotePath || "").replace(/\\/g, "/");
  const rootMatch = normalized.match(/^\/root(?:\/|$)/);
  if (rootMatch) return "/root";
  const homeMatch = normalized.match(/^\/home\/([^/]+)(?:\/|$)/);
  if (homeMatch) return "/home/" + homeMatch[1];
  const usersMatch = normalized.match(/^\/Users\/([^/]+)(?:\/|$)/);
  if (usersMatch) return "/Users/" + usersMatch[1];
  return null;
}

function remoteAcpRegistryPath(remotePath, configured = "") {
  const explicit = String(configured || "").trim();
  if (explicit) return explicit;
  const home = inferRemoteHome(remotePath) || "/root";
  return `${home}/.devin-server-next/data/User/acp/registry.json`;
}

function bundledAcpRegistry() {
  return {
    version: "1.0.0",
    agents: [{
      id: "devin-cli",
      name: "Devin Local",
      version: "1.0.0",
      description: "Bundled Devin Local ACP agent (seeded by BYOK Local when :6678 is down).",
      distribution: { binary: {
        "linux-x86_64": { archive: "bundled", cmd: "devin", args: ["acp"] },
        "linux-aarch64": { archive: "bundled", cmd: "devin", args: ["acp"] },
        "darwin-x86_64": { archive: "bundled", cmd: "devin", args: ["acp"] },
        "darwin-aarch64": { archive: "bundled", cmd: "devin", args: ["acp"] },
      } },
      "cognition.ai/bundled": true,
      "cognition.ai/featured": true,
    }, {
      id: "claude-acp",
      name: "Claude Agent",
      version: "1.0.0",
      description: "Claude Agent via ACP (npx). Seeded by BYOK Local when server registry is unavailable.",
      distribution: { npx: { package: "@agentclientprotocol/claude-agent-acp" } },
      "cognition.ai/featured": true,
    }],
  };
}

function markerForHost(host) {
  return crypto.createHash("sha256").update(String(host)).digest("hex").slice(0, 12);
}

function managedBlock(host, remotePort = DEFAULT_REMOTE_PORT) {
  const marker = markerForHost(host);
  return [
    `# >>> Devin BYOK Bridge SSH ${marker}`,
    `Host ${host}`,
    `  RemoteForward 127.0.0.1:${remotePort} 127.0.0.1:${LOCAL_PROXY_PORT}`,
    `# <<< Devin BYOK Bridge SSH ${marker}`,
  ].join(os.EOL);
}

function upsertManagedBlock(original, host, remotePort = DEFAULT_REMOTE_PORT) {
  const marker = markerForHost(host);
  const begin = `# >>> Devin BYOK Bridge SSH ${marker}`;
  const end = `# <<< Devin BYOK Bridge SSH ${marker}`;
  const escapedBegin = begin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedEnd = end.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const expression = new RegExp(`${escapedBegin}[\\s\\S]*?${escapedEnd}\\s*`, "g");
  const without = String(original || "").replace(expression, "").replace(/\s+$/, "");
  const block = managedBlock(host, remotePort);
  return (without ? without + os.EOL + os.EOL : "") + block + os.EOL;
}

function removeManagedBlock(original, host) {
  const marker = markerForHost(host);
  const begin = `# >>> Devin BYOK Bridge SSH ${marker}`;
  const end = `# <<< Devin BYOK Bridge SSH ${marker}`;
  const escapedBegin = begin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedEnd = end.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return String(original || "")
    .replace(new RegExp(`(?:\\r?\\n)?${escapedBegin}[\\s\\S]*?${escapedEnd}(?:\\r?\\n)?`, "g"), os.EOL)
    .replace(/(?:\r?\n){3,}/g, os.EOL + os.EOL)
    .replace(/^\s+|\s+$/g, "") + os.EOL;
}

function validateHostAlias(host) {
  if (!host || /[\s\r\n\0]/.test(host) || host.startsWith("-")) {
    throw new Error("无法从 Remote SSH 会话识别安全的主机别名");
  }
  return host;
}

function findLocalCa() {
  const candidates = [];
  if (process.env.BYOK_LOCAL_PROBE_CERTS) {
    candidates.push(path.join(process.env.BYOK_LOCAL_PROBE_CERTS, "rootCA.pem"));
  }
  if (process.platform === "win32") {
    const roaming = process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming");
    candidates.push(path.join(roaming, "BYOK-Local-Probe", "certs", "rootCA.pem"));
  } else if (process.platform === "darwin") {
    candidates.push(path.join(os.homedir(), "Library", "Application Support", "BYOK-Local-Probe", "certs", "rootCA.pem"));
  } else {
    candidates.push(path.join(process.env.XDG_CONFIG_HOME || path.join(os.homedir(), ".config"), "BYOK-Local-Probe", "certs", "rootCA.pem"));
  }
  return candidates.find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile()) || null;
}

function resolveSshConfigPath(vscode) {
  const configured = String(vscode.workspace.getConfiguration("remote.devinSSH").get("configFile") || "").trim();
  return configured ? path.resolve(configured) : path.join(os.homedir(), ".ssh", "config");
}

function writeFileAtomically(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temp = file + ".byok-tmp-" + process.pid;
  fs.writeFileSync(temp, text, { encoding: "utf8", mode: 0o600 });
  fs.renameSync(temp, file);
  hardenWindowsSshConfig(file);
}

function hardenWindowsSshConfig(file) {
  if (process.platform !== "win32") return;
  try {
    const whoami = childProcess.execFileSync("whoami", [], { encoding: "utf8", windowsHide: true }).trim();
    if (!whoami || /[\r\n]/.test(whoami)) return;
    // OpenSSH rejects config files accessible by Everyone. Remove inherited
    // grants and retain only the current user, SYSTEM, and Administrators.
    childProcess.execFileSync("icacls.exe", [
      file,
      "/inheritance:r",
      "/remove:g", "Everyone",
      "/grant:r", `${whoami}:F`, "SYSTEM:F", "Administrators:F",
    ], { encoding: "utf8", windowsHide: true, stdio: "ignore" });
  } catch {
    // Keep the config write successful; SSH diagnostics explain manual repair.
  }
}

function remoteContext(vscode) {
  if (vscode.env.remoteName !== "ssh-remote") return null;
  const folder = remoteFolder(vscode);
  if (!folder) return null;
  const host = decodeRemoteAuthority(folder.uri.authority);
  if (!host) return null;
  return { folder, host: validateHostAlias(host) };
}

function settingsBackupKey(host) {
  return "byokBridge.ssh.settingsBackup." + markerForHost(host);
}

async function updateRemoteProcessSettings(vscode, context, host, folder, remotePort, caPath) {
  const proxy = `http://127.0.0.1:${remotePort}`;
  const agentConfig = vscode.workspace.getConfiguration("devin.acp", folder.uri);
  const existing = agentConfig.get("agentEnv") || {};
  // `http.proxy` is an application/user setting and cannot be written at
  // workspace scope. In an SSH window it would also point the local renderer
  // at the Linux loopback, so configure the Remote SSH server proxy instead.
  const sshConfig = vscode.workspace.getConfiguration("remote.devinSSH");
  const backupKey = settingsBackupKey(host);
  if (!context.workspaceState.get(backupKey)) {
    const agentInspect = agentConfig.inspect("agentEnv") || {};
    const httpInspect = sshConfig.inspect("httpProxy") || {};
    const httpsInspect = sshConfig.inspect("httpsProxy") || {};
    await context.workspaceState.update(backupKey, {
      agentEnv: { present: agentInspect.workspaceValue !== undefined, value: agentInspect.workspaceValue },
      httpProxy: { present: httpInspect.globalValue !== undefined, value: httpInspect.globalValue },
      httpsProxy: { present: httpsInspect.globalValue !== undefined, value: httpsInspect.globalValue },
    });
  }
  const merged = { ...existing };
  for (const id of AGENT_IDS) {
    merged[id] = {
      ...(existing[id] && typeof existing[id] === "object" ? existing[id] : {}),
      HTTPS_PROXY: proxy,
      HTTP_PROXY: proxy,
      NO_PROXY: "localhost,127.0.0.1,::1",
      no_proxy: "localhost,127.0.0.1,::1",
      NODE_EXTRA_CA_CERTS: caPath,
      BYOK_LOCAL_PROBE: "1",
      BYOK_LOCAL_PROBE_MITM: "1",
      BYOK_SSH_REMOTE: "1",
    };
  }
  // Workspace scope is deliberate: a Linux CA path must never overwrite the
  // Windows user setting used by normal local windows.
  await agentConfig.update("agentEnv", merged, vscode.ConfigurationTarget.Workspace);
  // These settings are consumed by the Remote SSH resolver when it launches
  // the Linux server. They are global by design, while the local `http.proxy`
  // remains untouched.
  await sshConfig.update("httpProxy", proxy, vscode.ConfigurationTarget.Global);
  await sshConfig.update("httpsProxy", proxy, vscode.ConfigurationTarget.Global);
}

async function restoreRemoteProcessSettings(vscode, context, host, folder) {
  const backupKey = settingsBackupKey(host);
  const backup = context.workspaceState.get(backupKey);
  if (!backup) return false;
  const agentConfig = vscode.workspace.getConfiguration("devin.acp", folder.uri);
  const sshConfig = vscode.workspace.getConfiguration("remote.devinSSH");
  const restore = item => item && item.present ? item.value : undefined;
  await agentConfig.update("agentEnv", restore(backup.agentEnv), vscode.ConfigurationTarget.Workspace);
  await sshConfig.update("httpProxy", restore(backup.httpProxy), vscode.ConfigurationTarget.Global);
  await sshConfig.update("httpsProxy", restore(backup.httpsProxy), vscode.ConfigurationTarget.Global);
  await context.workspaceState.update(backupKey, undefined);
  return true;
}

async function syncRemoteAcpRegistry(vscode, folder, configuredPath = "") {
  const registryPath = remoteAcpRegistryPath(folder.uri.path, configuredPath);
  const registryUri = vscode.Uri.from({
    scheme: folder.uri.scheme,
    authority: folder.uri.authority,
    path: registryPath,
  });
  const parentPath = registryPath.slice(0, registryPath.lastIndexOf("/"));
  await vscode.workspace.fs.createDirectory(registryUri.with({ path: parentPath }));
  let registry = bundledAcpRegistry();
  try {
    const bytes = await vscode.workspace.fs.readFile(registryUri);
    const existing = JSON.parse(Buffer.from(bytes).toString("utf8"));
    if (existing && Array.isArray(existing.agents)) {
      const byId = new Map(existing.agents.filter(agent => agent && typeof agent.id === "string").map(agent => [agent.id, agent]));
      for (const agent of registry.agents) byId.set(agent.id, { ...byId.get(agent.id), ...agent });
      registry = { ...existing, version: "1.0.0", agents: [...byId.values()] };
    }
  } catch {}
  await vscode.workspace.fs.writeFile(registryUri, Buffer.from(JSON.stringify(registry, null, 2) + "\n", "utf8"));
  const remoteAgentConfig = vscode.workspace.getConfiguration("devin.acp", folder.uri);
  const enabled = { ...(remoteAgentConfig.get("enabledAgents") || {}) };
  for (const id of REMOTE_AGENT_ENABLE_IDS) enabled[id] = true;
  await remoteAgentConfig.update("enabledAgents", enabled, vscode.ConfigurationTarget.Global);
  return { registryPath, agentIds: registry.agents.map(agent => agent.id) };
}

async function readRemoteJson(vscode, uri) {
  try {
    const bytes = await vscode.workspace.fs.readFile(uri);
    const parsed = JSON.parse(Buffer.from(bytes).toString("utf8"));
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

async function mergeRemoteSettings(vscode, folder, relativePath, patch) {
  const home = inferRemoteHome(folder.uri.path) || "/root";
  const fullPath = `${home}/.devin-server-next/data/${relativePath}`;
  const uri = vscode.Uri.from({ scheme: folder.uri.scheme, authority: folder.uri.authority, path: fullPath });
  const parent = fullPath.slice(0, fullPath.lastIndexOf("/"));
  await vscode.workspace.fs.createDirectory(uri.with({ path: parent }));
  const current = await readRemoteJson(vscode, uri);
  const merged = { ...current, ...patch };
  await vscode.workspace.fs.writeFile(uri, Buffer.from(JSON.stringify(merged, null, 2) + "\n", "utf8"));
  return fullPath;
}

async function syncRemoteAgentSettings(vscode, folder, remotePort, caPath) {
  const proxy = `http://127.0.0.1:${remotePort}`;
  const env = {};
  for (const id of AGENT_IDS) {
    env[id] = {
      HTTP_PROXY: proxy,
      HTTPS_PROXY: proxy,
      NO_PROXY: "localhost,127.0.0.1,::1",
      no_proxy: "localhost,127.0.0.1,::1",
      NODE_EXTRA_CA_CERTS: caPath,
      BYOK_LOCAL_PROBE: "1",
      BYOK_LOCAL_PROBE_MITM: "1",
      BYOK_SSH_REMOTE: "1",
    };
  }
  const patch = {
    "devin.acp.enabledAgents": { "devin-cli": true, "claude-acp": true, "devin-cloud": true },
    "windsurf.acp.enabledAgents": { "devin-cli": true, "claude-acp": true, "devin-cloud": true },
    "devin.acp.agentEnv": env,
    "devin.acp.agentPreferences": { "devin-cli": { model: "default", mode: "plan" } },
    "windsurf.acp.agentPreferences": { "devin-cli": { model: "default", mode: "plan" } },
  };
  const files = [];
  for (const relativePath of ["User/settings.json", "Machine/settings.json"]) {
    files.push(await mergeRemoteSettings(vscode, folder, relativePath, patch));
  }
  return files;
}

function createSshRemoteSupport({ vscode, context, logger }) {
  let last = null;

  function setting(name, fallback) {
    return vscode.workspace.getConfiguration("byokBridge.ssh").get(name, fallback);
  }

  async function installForward(interactive = false) {
    const remote = remoteContext(vscode);
    if (!remote) return { ok: false, skipped: true, reason: "not-ssh-remote" };
    const remotePort = Number(setting("remotePort", DEFAULT_REMOTE_PORT));
    if (!Number.isInteger(remotePort) || remotePort < 1024 || remotePort > 65535) {
      throw new Error("SSH 远端代理端口必须是 1024–65535 的整数");
    }
    const configPath = resolveSshConfigPath(vscode);
    const before = fs.existsSync(configPath) ? fs.readFileSync(configPath, "utf8") : "";
    const after = upsertManagedBlock(before, remote.host, remotePort);
    const changed = after !== before;
    if (changed) writeFileAtomically(configPath, after);
    else hardenWindowsSshConfig(configPath);
    logger.info(`[SSH] reverse forward ${remote.host} 127.0.0.1:${remotePort} -> local 127.0.0.1:${LOCAL_PROXY_PORT}${changed ? " installed" : " verified"}`);
    if (interactive) {
      vscode.window.showInformationMessage(changed
        ? `已为 ${remote.host} 写入 BYOK SSH 通道。请重新连接该 SSH 主机。`
        : `${remote.host} 的 BYOK SSH 通道配置已经存在。`);
    }
    return { ok: true, changed, host: remote.host, remotePort, configPath };
  }

  async function installRemoteCaAndSettings(interactive = false) {
    const remote = remoteContext(vscode);
    if (!remote) return { ok: false, skipped: true, reason: "not-ssh-remote" };
    const localCa = findLocalCa();
    if (!localCa) throw new Error("本地 6778 CA 尚未生成，请先启动 Local 后重试");
    const configuredCaPath = String(setting("remoteCaPath", "") || "").trim();
    const inferredHome = inferRemoteHome(remote.folder.uri.path);
    const caPath = configuredCaPath || (inferredHome
      ? `${inferredHome}/.config/BYOK-Local-Probe/certs/rootCA.pem`
      : `${remote.folder.uri.path.replace(/\/$/, "")}/.devin-byok/rootCA.pem`);
    const caUri = vscode.Uri.from({
      scheme: remote.folder.uri.scheme,
      authority: remote.folder.uri.authority,
      path: caPath,
    });
    const certDir = caUri.with({ path: caPath.slice(0, caPath.lastIndexOf("/")) });
    await vscode.workspace.fs.createDirectory(certDir);
    await vscode.workspace.fs.writeFile(caUri, fs.readFileSync(localCa));
    const remotePort = Number(setting("remotePort", DEFAULT_REMOTE_PORT));
    await updateRemoteProcessSettings(vscode, context, remote.host, remote.folder, remotePort, caPath);
    const registry = await syncRemoteAcpRegistry(vscode, remote.folder, setting("remoteAcpRegistryPath", ""));
    const settings = await syncRemoteAgentSettings(vscode, remote.folder, remotePort, caPath);
    logger.info(`[SSH] remote CA installed ${caPath}; agent proxy=http://127.0.0.1:${remotePort}; ACP registry=${registry.registryPath}; settings=${settings.join(",")}`);
    if (interactive) {
      vscode.window.showInformationMessage("Linux 远端 CA 和 Devin 代理环境已更新；请重启当前 Devin 会话。");
    }
    return { ok: true, host: remote.host, remotePort, caPath };
  }

  async function prepare() {
    if (!setting("enabled", true)) return { ok: false, skipped: true, reason: "disabled" };
    const remote = remoteContext(vscode);
    if (!remote) return { ok: false, skipped: true, reason: "not-ssh-remote" };
    const forward = await installForward(false);
    try {
      const remoteSetup = await installRemoteCaAndSettings(false);
      last = { ok: true, forward, remote: remoteSetup };
    } catch (error) {
      last = { ok: false, forward, error: String(error && error.message || error) };
      logger.warn("[SSH] remote setup pending: " + last.error);
    }
    if (forward.changed) {
      vscode.window.showWarningMessage(
        `Devin BYOK 已为 ${forward.host} 安装 SSH 通道。重新连接该主机后，Linux 远端请求才会进入本机 6778。`,
        "打开 SSH 日志"
      ).then(choice => {
        if (choice === "打开 SSH 日志") vscode.commands.executeCommand("windsurf-remote-openssh.showLog");
      });
    }
    return last;
  }

  async function remove(interactive = true) {
    const remote = remoteContext(vscode);
    if (!remote) return { ok: false, skipped: true, reason: "not-ssh-remote" };
    const configPath = resolveSshConfigPath(vscode);
    let changed = false;
    if (fs.existsSync(configPath)) {
      const before = fs.readFileSync(configPath, "utf8");
      const after = removeManagedBlock(before, remote.host);
      changed = after !== before;
      if (changed) writeFileAtomically(configPath, after);
    }
    const settingsRestored = await restoreRemoteProcessSettings(vscode, context, remote.host, remote.folder);
    logger.info(`[SSH] reverse forward ${remote.host} ${changed ? "removed" : "not present"}`);
    if (interactive) vscode.window.showInformationMessage(changed || settingsRestored ? "BYOK SSH 通道和远端工作区配置已移除，重连后生效。" : "当前主机没有 BYOK SSH 通道配置。");
    return { ok: true, changed, settingsRestored, host: remote.host, configPath };
  }

  const configureCommand = vscode.commands.registerCommand("byokBridge.configureSsh", async () => {
    await installForward(true);
    await installRemoteCaAndSettings(true);
  });
  const removeCommand = vscode.commands.registerCommand("byokBridge.removeSsh", () => remove(true));
  context.subscriptions.push(configureCommand, removeCommand);

  return { prepare, installForward, installRemoteCaAndSettings, remove, getStatus: () => last };
}

module.exports = {
  DEFAULT_REMOTE_PORT,
  LOCAL_PROXY_PORT,
  decodeRemoteAuthority,
  inferRemoteHome,
  managedBlock,
  upsertManagedBlock,
  removeManagedBlock,
  hardenWindowsSshConfig,
  createSshRemoteSupport,
};
