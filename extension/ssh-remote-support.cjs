"use strict";

const crypto = require("node:crypto");
const childProcess = require("node:child_process");
const fs = require("node:fs");
const net = require("node:net");
const os = require("node:os");
const path = require("node:path");

const DEFAULT_REMOTE_PORT = 16778;
const LOCAL_PROXY_PORT = 6778;
const AGENT_IDS = ["devin-cli", "devin", "devin-local"];
const SYSTEM_CA_BUNDLE_PATHS = [
  "/etc/ssl/certs/ca-certificates.crt",
  "/etc/pki/tls/certs/ca-bundle.crt",
  "/etc/ssl/cert.pem",
];

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

function remoteAcpRegistryPath(remotePath, configured = "", appName = "", remoteHome = "") {
  const explicit = String(configured || "").trim();
  if (explicit) return explicit;
  const home = remoteHome || inferRemoteHome(remotePath) || "/root";
  // Devin's ACP LocalRegistry uses getWindsurfConfigDirectory(), not the
  // remote VS Code server's data/User directory. Match its Linux app channels.
  const name = String(appName || "");
  let configDir = ".windsurf";
  if (name.startsWith("Devin - Insiders") || name.startsWith("Windsurf - Insiders")) configDir = ".windsurf-insiders";
  else if (name.startsWith("Devin - Next") || name.startsWith("Windsurf - Next")) configDir = ".windsurf-next";
  else if (name.startsWith("Devin - Airgap") || name.startsWith("Windsurf - Airgap")) configDir = ".windsurf-airgap";
  return `${home}/${configDir}/acp/registry.json`;
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
    // Remote extensions inherit the UI's http.proxy=127.0.0.1:6778. Keep
    // that loopback address reachable as well as the ACP agent proxy port.
    ...(remotePort === LOCAL_PROXY_PORT ? [] : [`  RemoteForward 127.0.0.1:${LOCAL_PROXY_PORT} 127.0.0.1:${LOCAL_PROXY_PORT}`]),
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
  if (!host || /[\s\r\n\0*?!]/.test(host) || host.startsWith("-")) {
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

function localProxyReady(timeoutMs = 350) {
  return new Promise(resolve => {
    const socket = net.connect({ host: "127.0.0.1", port: LOCAL_PROXY_PORT });
    let settled = false;
    const finish = ready => {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve(ready);
    };
    socket.once("connect", () => finish(true));
    socket.once("error", () => finish(false));
    socket.setTimeout(timeoutMs, () => finish(false));
  });
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

function remoteContext(vscode, context) {
  if (vscode.env.remoteName !== "ssh-remote") return null;
  let folder = remoteFolder(vscode);
  if(!folder){
    const connection=context?.workspaceState?.get('byokBridge.ssh.connection');
    if(connection?.authority&&decodeRemoteAuthority(connection.authority)===connection.host)folder={uri:vscode.Uri.from({scheme:'vscode-remote',authority:connection.authority,path:'/'})};
  }
  if (!folder) return null;
  const host = decodeRemoteAuthority(folder.uri.authority);
  if (!host) return null;
  return { folder, host: validateHostAlias(host) };
}

async function remoteHomeFolder(vscode,folder){
  if(inferRemoteHome(folder.uri.path))return folder;
  const read=async file=>Buffer.from(await vscode.workspace.fs.readFile(folder.uri.with({path:file}))).toString('utf8');
  const status=await read('/proc/self/status'),uid=status.match(/^Uid:\s*(\d+)/m)?.[1];
  const home=uid&&(await read('/etc/passwd')).split('\n').map(line=>line.split(':')).find(parts=>parts[2]===uid)?.[5];
  if(!home||!home.startsWith('/')||/[\r\n\0]/.test(home))throw Error('无法确认 SSH 远端用户目录，请先打开远端用户目录下的文件夹');
  return {...folder,remoteHome:home};
}

function settingsBackupKey(host) {
  return "byokBridge.ssh.settingsBackup." + markerForHost(host);
}

async function updateRemoteProcessSettings(vscode, context, host, folder, remotePort, caPath, bundlePath) {
  const proxy = `http://127.0.0.1:${remotePort}`;
  const agentConfig = vscode.workspace.getConfiguration("devin.acp", folder.uri);
  const existing = agentConfig.get("agentEnv") || {};
  // Bootstrap proxy selection belongs to the per-host native SSH preflight.
  // A global loopback proxy may outlive its tunnel or leak into other hosts.
  const backupKey = settingsBackupKey(host);
  if (!context.workspaceState.get(backupKey)) {
    const agentInspect = agentConfig.inspect("agentEnv") || {};
    await context.workspaceState.update(backupKey, {
      agentEnv: { present: agentInspect.workspaceValue !== undefined, value: agentInspect.workspaceValue },
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
      SSL_CERT_FILE: bundlePath,
      BYOK_LOCAL_PROBE: "1",
      BYOK_LOCAL_PROBE_MITM: "1",
      BYOK_SSH_REMOTE: "1",
    };
  }
  // Workspace scope is deliberate: a Linux CA path must never overwrite the
  // Windows user setting used by normal local windows.
  if (JSON.stringify(merged) !== JSON.stringify(existing)) {
    await agentConfig.update("agentEnv", merged, vscode.ConfigurationTarget.Workspace);
  }
}

async function restoreRemoteProcessSettings(vscode, context, host, folder) {
  const backupKey = settingsBackupKey(host);
  const backup = context.workspaceState.get(backupKey);
  if (!backup) return false;
  const agentConfig = vscode.workspace.getConfiguration("devin.acp", folder.uri);
  const sshConfig = vscode.workspace.getConfiguration("remote.devinSSH");
  const restore = item => item && item.present ? item.value : undefined;
  await agentConfig.update("agentEnv", restore(backup.agentEnv), vscode.ConfigurationTarget.Workspace);
  // Restore proxy settings only for backups made by older versions that
  // actually changed them. New per-host setup never owns global SSH proxies.
  if (backup.httpProxy) await sshConfig.update("httpProxy", restore(backup.httpProxy), vscode.ConfigurationTarget.Global);
  if (backup.httpsProxy) await sshConfig.update("httpsProxy", restore(backup.httpsProxy), vscode.ConfigurationTarget.Global);
  await context.workspaceState.update(backupKey, undefined);
  return true;
}

async function syncRemoteAcpRegistry(vscode, folder, configuredPath = "") {
  const registryPath = remoteAcpRegistryPath(folder.uri.path, configuredPath, vscode.env.appName,folder.remoteHome);
  const registryUri = vscode.Uri.from({
    scheme: folder.uri.scheme,
    authority: folder.uri.authority,
    path: registryPath,
  });
  const parentPath = registryPath.slice(0, registryPath.lastIndexOf("/"));
  await vscode.workspace.fs.createDirectory(registryUri.with({ path: parentPath }));
  let registry = bundledAcpRegistry();
  let previousBytes = null;
  try {
    const bytes = await vscode.workspace.fs.readFile(registryUri);
    previousBytes = Buffer.from(bytes);
    const existing = JSON.parse(Buffer.from(bytes).toString("utf8"));
    if (existing && Array.isArray(existing.agents)) {
      const byId = new Map(existing.agents.filter(agent => agent && typeof agent.id === "string").map(agent => [agent.id, agent]));
      for (const agent of registry.agents) byId.set(agent.id, { ...byId.get(agent.id), ...agent });
      registry = { ...existing, version: "1.0.0", agents: [...byId.values()] };
    }
  } catch {}
  const nextBytes = Buffer.from(JSON.stringify(registry, null, 2) + "\n", "utf8");
  const changed = !previousBytes || !previousBytes.equals(nextBytes);
  if (changed) await vscode.workspace.fs.writeFile(registryUri, nextBytes);
  // The remote User/settings.json is updated below. Updating Global here
  // targets the UI host's user settings, which can be unsaved and must not
  // prevent the remote registry from being written.
  return { registryPath, agentIds: registry.agents.map(agent => agent.id), changed };
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
  const home = folder.remoteHome || inferRemoteHome(folder.uri.path) || "/root";
  const channel=/Next/.test(String(vscode.env.appName||''))?'.devin-server-next':'.devin-server';
  const fullPath = `${home}/${channel}/data/${relativePath}`;
  const uri = vscode.Uri.from({ scheme: folder.uri.scheme, authority: folder.uri.authority, path: fullPath });
  const parent = fullPath.slice(0, fullPath.lastIndexOf("/"));
  await vscode.workspace.fs.createDirectory(uri.with({ path: parent }));
  const current = await readRemoteJson(vscode, uri);
  const merged = { ...current, ...patch };
  for (const key of ["devin.acp.enabledAgents", "windsurf.acp.enabledAgents", "devin.acp.agentEnv"]) {
    if (current[key] && typeof current[key] === "object" && !Array.isArray(current[key])) {
      merged[key] = { ...current[key], ...patch[key] };
      if (key === "devin.acp.agentEnv") {
        for (const id of AGENT_IDS) {
          const existingEnv = current[key][id];
          if (existingEnv && typeof existingEnv === "object" && !Array.isArray(existingEnv)) {
            merged[key][id] = { ...existingEnv, ...patch[key][id] };
          }
        }
      }
    }
  }
  const nextBytes = Buffer.from(JSON.stringify(merged, null, 2) + "\n", "utf8");
  let previousBytes;
  try { previousBytes = Buffer.from(await vscode.workspace.fs.readFile(uri)); } catch {}
  if (!previousBytes || !previousBytes.equals(nextBytes)) await vscode.workspace.fs.writeFile(uri, nextBytes);
  return fullPath;
}

async function syncRemoteAgentSettings(vscode, folder, remotePort, caPath, bundlePath) {
  const proxy = `http://127.0.0.1:${remotePort}`;
  const env = {};
  for (const id of AGENT_IDS) {
    env[id] = {
      HTTP_PROXY: proxy,
      HTTPS_PROXY: proxy,
      NO_PROXY: "localhost,127.0.0.1,::1",
      no_proxy: "localhost,127.0.0.1,::1",
      NODE_EXTRA_CA_CERTS: caPath,
      SSL_CERT_FILE: bundlePath,
      BYOK_LOCAL_PROBE: "1",
      BYOK_LOCAL_PROBE_MITM: "1",
      BYOK_SSH_REMOTE: "1",
    };
  }
  const patch = {
    "devin.acp.enabledAgents": { "devin-cli": true, "claude-acp": true, "devin-cloud": true },
    "windsurf.acp.enabledAgents": { "devin-cli": true, "claude-acp": true, "devin-cloud": true },
    "devin.acp.agentEnv": env,
  };
  const files = [];
  for (const relativePath of ["User/settings.json", "Machine/settings.json"]) {
    files.push(await mergeRemoteSettings(vscode, folder, relativePath, patch));
  }
  return files;
}

async function writeRemoteCaBundle(vscode, folder, caPath, caBytes) {
  const base = { scheme: folder.uri.scheme, authority: folder.uri.authority };
  let systemBytes;
  let systemPath;
  for (const candidate of SYSTEM_CA_BUNDLE_PATHS) {
    try {
      const bytes = Buffer.from(await vscode.workspace.fs.readFile(vscode.Uri.from({ ...base, path: candidate })));
      if (bytes.includes(Buffer.from("-----BEGIN CERTIFICATE-----"))) {
        systemBytes = bytes;
        systemPath = candidate;
        break;
      }
    } catch {}
  }
  if (!systemBytes) throw new Error("远端系统 CA 证书包不可读取，无法安全配置 Devin Local 的 TLS 信任");
  if (!caBytes.includes(Buffer.from("-----BEGIN CERTIFICATE-----"))) {
    throw new Error("本地代理 CA 证书格式无效");
  }
  const bundlePath = `${caPath.slice(0, caPath.lastIndexOf("/"))}/ca-bundle.pem`;
  const bundleUri = vscode.Uri.from({ ...base, path: bundlePath });
  const separator = systemBytes.at(-1) === 10 ? Buffer.alloc(0) : Buffer.from("\n");
  const bundleBytes = Buffer.concat([systemBytes, separator, caBytes, Buffer.from("\n")]);
  let existing;
  try { existing = Buffer.from(await vscode.workspace.fs.readFile(bundleUri)); } catch {}
  if (!existing || !existing.equals(bundleBytes)) await vscode.workspace.fs.writeFile(bundleUri, bundleBytes);
  return { bundlePath, systemPath };
}

function createSshRemoteSupport({ vscode, context, logger }) {
  let last = null;

  function setting(name, fallback) {
    return vscode.workspace.getConfiguration("byokBridge.ssh").get(name, fallback);
  }

  async function installForwardForHost(host, interactive = false) {
    if (!setting("enabled", true)) return { ok: false, skipped: true, reason: "disabled" };
    host = validateHostAlias(String(host || "").trim());
    const remotePort = Number(setting("remotePort", DEFAULT_REMOTE_PORT));
    if (!Number.isInteger(remotePort) || remotePort < 1024 || remotePort > 65535) {
      throw new Error("SSH 远端代理端口必须是 1024–65535 的整数");
    }
    const configPath = resolveSshConfigPath(vscode);
    const before = fs.existsSync(configPath) ? fs.readFileSync(configPath, "utf8") : "";
    const after = upsertManagedBlock(before, host, remotePort);
    const changed = after !== before;
    if (changed) writeFileAtomically(configPath, after);
    else hardenWindowsSshConfig(configPath);
    logger.info(`[SSH] reverse forward ${host} 127.0.0.1:${remotePort} -> local 127.0.0.1:${LOCAL_PROXY_PORT}${changed ? " installed" : " verified"}`);
    if (interactive) {
      vscode.window.showInformationMessage(changed
        ? `已为 ${host} 写入 BYOK SSH 通道。请重新连接该 SSH 主机。`
        : `${host} 的 BYOK SSH 通道配置已经存在。`);
    }
    // The native resolver reads this value after the hook returns. Supply it
    // only for this host, without changing the application's global proxy.
    let ready = false;
    if (!context.globalState?.get("userStopped")) {
      for (let attempt = 0; attempt < 8 && !ready; attempt++) {
        ready = await localProxyReady();
        if (!ready && attempt < 7) await new Promise(resolve => setTimeout(resolve, 350));
      }
    }
    if (!ready) logger.warn(`[SSH] local 127.0.0.1:${LOCAL_PROXY_PORT} is unavailable; ${host} will use its existing resolver proxy setting`);
    return { ok: true, changed, host, remotePort, configPath, ...(ready ? { proxy: `http://127.0.0.1:${remotePort}` } : {}) };
  }

  async function installForward(interactive = false) {
    const remote = remoteContext(vscode,context);
    if (!remote) return { ok: false, skipped: true, reason: "not-ssh-remote" };
    return installForwardForHost(remote.host, interactive);
  }

  async function installRemoteCaAndSettings(interactive = false) {
    const remote = remoteContext(vscode,context);
    if (!remote) return { ok: false, skipped: true, reason: "not-ssh-remote" };
    remote.folder=await remoteHomeFolder(vscode,remote.folder);
    const localCa = findLocalCa();
    if (!localCa) throw new Error("本地 6778 CA 尚未生成，请先启动 Local 后重试");
    const configuredCaPath = String(setting("remoteCaPath", "") || "").trim();
    const inferredHome = remote.folder.remoteHome || inferRemoteHome(remote.folder.uri.path);
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
    const caBytes = fs.readFileSync(localCa);
    await vscode.workspace.fs.writeFile(caUri, caBytes);
    const caBundle = await writeRemoteCaBundle(vscode, remote.folder, caPath, caBytes);
    const remotePort = Number(setting("remotePort", DEFAULT_REMOTE_PORT));
    const registry = await syncRemoteAcpRegistry(vscode, remote.folder, setting("remoteAcpRegistryPath", ""));
    const settings = await syncRemoteAgentSettings(vscode, remote.folder, remotePort, caPath, caBundle.bundlePath);
    let settingsPending = null;
    try {
      await updateRemoteProcessSettings(vscode, context, remote.host, remote.folder, remotePort, caPath, caBundle.bundlePath);
    } catch (error) {
      settingsPending = String(error && error.message || error);
      logger.warn(`[SSH] UI settings pending for ${remote.host}: ${settingsPending}`);
    }
    logger.info(`[SSH] remote CA installed ${caPath}; TLS bundle=${caBundle.bundlePath} (system=${caBundle.systemPath}); agent proxy=http://127.0.0.1:${remotePort}; ACP registry=${registry.registryPath}; settings=${settings.join(",")}`);
    if (interactive) {
      vscode.window.showInformationMessage("Linux 远端 CA 和 Devin 代理环境已更新；请重启当前 Devin 会话。");
    }
    return { ok: true, host: remote.host, remotePort, caPath, bundlePath: caBundle.bundlePath, registryChanged: registry.changed, settingsPending };
  }

  let preparation=null;
  function prepare(){
    if(!preparation)preparation=prepareOnce().finally(()=>{preparation=null;});
    return preparation;
  }
  async function prepareOnce() {
    if (!setting("enabled", true)) return { ok: false, skipped: true, reason: "disabled" };
    const remote = remoteContext(vscode,context);
    if (!remote) return { ok: false, skipped: true, reason: "not-ssh-remote" };
    const forward = await installForward(false);
    try {
      const remoteSetup = await installRemoteCaAndSettings(false);
      last = { ok: true, forward, remote: remoteSetup };
    } catch (error) {
      last = { ok: false, forward, error: String(error && error.message || error) };
      logger.warn("[SSH] remote setup pending: " + last.error);
    }
    if (forward.changed || last.remote?.registryChanged) {
      vscode.window.showWarningMessage(
        `Devin BYOK 已更新 ${forward.host} 的 SSH 通道或 ACP 注册表。请重新连接该主机以加载远端 ACP 配置。`,
        "打开 SSH 日志"
      ).then(choice => {
        if (choice === "打开 SSH 日志") vscode.commands.executeCommand("windsurf-remote-openssh.showLog");
      });
    }
    return last;
  }

  async function remove(interactive = true) {
    const remote = remoteContext(vscode,context);
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
  const preflightCommand = vscode.commands.registerCommand("byokBridge.prepareSshHost", async(host,authority) => {
    host=validateHostAlias(String(host||'').trim());
    if(typeof authority==='string'&&decodeRemoteAuthority(authority)===host)await context.workspaceState?.update('byokBridge.ssh.connection',{host,authority});
    const result=await installForwardForHost(host);
    // This continues after the resolver returns. Remote filesystem access may
    // wait for the SSH connection; it must never block that same connection.
    void prepare().catch(error=>logger.warn('[SSH] remote setup pending: '+String(error?.message||error)));
    return result;
  });
  context.subscriptions.push(configureCommand, removeCommand, preflightCommand);
  const foldersChanged=vscode.workspace.onDidChangeWorkspaceFolders?.(()=>{void prepare().catch(error=>logger.warn('[SSH] remote setup pending: '+String(error?.message||error)));});
  if(foldersChanged)context.subscriptions.push(foldersChanged);

  return { prepare, installForward, installForwardForHost, installRemoteCaAndSettings, remove, getStatus: () => last };
}

module.exports = {
  DEFAULT_REMOTE_PORT,
  LOCAL_PROXY_PORT,
  decodeRemoteAuthority,
  inferRemoteHome,
  remoteAcpRegistryPath,
  syncRemoteAcpRegistry,
  syncRemoteAgentSettings,
  writeRemoteCaBundle,
  remoteHomeFolder,
  managedBlock,
  upsertManagedBlock,
  removeManagedBlock,
  hardenWindowsSshConfig,
  createSshRemoteSupport,
};
