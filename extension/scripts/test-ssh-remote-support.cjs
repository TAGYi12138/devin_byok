"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const {
  createSshRemoteSupport,
  remoteAcpRegistryPath,
  syncRemoteAcpRegistry,
  syncRemoteAgentSettings,
  writeRemoteCaBundle,
  remoteHomeFolder,
  managedBlock,
} = require("../ssh-remote-support.cjs");

async function main() {
  assert.match(managedBlock("test-host"), /RemoteForward 127\.0\.0\.1:6778 127\.0\.0\.1:6778/);
  assert.equal((managedBlock("test-host", 6778).match(/RemoteForward/g) || []).length, 1,
    "matching ACP and UI proxy ports must not create duplicate forwards");
  assert.equal(remoteAcpRegistryPath("/root/myproject", "", "Devin - Next"), "/root/.windsurf-next/acp/registry.json");
  assert.equal(remoteAcpRegistryPath("/home/alice/project", "", "Windsurf - Next"), "/home/alice/.windsurf-next/acp/registry.json");
  assert.equal(remoteAcpRegistryPath("/home/alice/project", "", "Devin"), "/home/alice/.windsurf/acp/registry.json");
  assert.equal(remoteAcpRegistryPath("/home/alice/project", "", "Devin - Insiders"), "/home/alice/.windsurf-insiders/acp/registry.json");
  assert.equal(remoteAcpRegistryPath("/root/project", "/custom/registry.json", "Devin - Next"), "/custom/registry.json");

  const files = new Map();
  const writes = [];
  const folders = [];
  const uri = value => ({ ...value, with(patch) { return uri({ ...this, ...patch }); } });
  const vscode = {
    env: { appName: "Devin - Next" },
    Uri: { from: uri },
    ConfigurationTarget: { Global: "global" },
    workspace: {
      fs: {
        async createDirectory(target) { folders.push(target.path); },
        async readFile(target) {
          if (!files.has(target.path)) throw new Error("FileNotFound");
          return files.get(target.path);
        },
        async writeFile(target, bytes) {
          writes.push(target.path);
          files.set(target.path, Buffer.from(bytes));
        },
      },
      getConfiguration(section) {
        throw new Error(`Remote registry sync must not write UI settings: ${section}`);
      },
    },
  };
  const folder = { uri: uri({ scheme: "vscode-remote", authority: "ssh-remote+test", path: "/root/myproject" }) };
  const first = await syncRemoteAcpRegistry(vscode, folder);
  assert.equal(first.registryPath, "/root/.windsurf-next/acp/registry.json");
  assert.equal(first.changed, true);
  assert.deepEqual(writes, [first.registryPath]);
  assert.deepEqual(folders, ["/root/.windsurf-next/acp"]);
  assert.ok(JSON.parse(files.get(first.registryPath)).agents.some(agent => agent.id === "devin-cli"));

  const second = await syncRemoteAcpRegistry(vscode, folder);
  assert.equal(second.changed, false, "an unchanged remote registry is not rewritten");
  assert.equal(writes.length, 1);

  const withCustomAgent = JSON.parse(files.get(first.registryPath));
  withCustomAgent.agents.push({ id: "custom-acp", name: "Custom ACP" });
  files.set(first.registryPath, Buffer.from(JSON.stringify(withCustomAgent)));
  const third = await syncRemoteAcpRegistry(vscode, folder);
  assert.equal(third.changed, true);
  assert.ok(JSON.parse(files.get(first.registryPath)).agents.some(agent => agent.id === "custom-acp"),
    "existing remote ACP agents survive the SSH sync");

  const systemPath = "/etc/ssl/certs/ca-certificates.crt";
  const systemCert = Buffer.from("-----BEGIN CERTIFICATE-----\nSYSTEM\n-----END CERTIFICATE-----\n");
  const proxyCert = Buffer.from("-----BEGIN CERTIFICATE-----\nPROXY\n-----END CERTIFICATE-----\n");
  files.set(systemPath, systemCert);
  const bundle = await writeRemoteCaBundle(vscode, folder, "/root/.config/BYOK-Local-Probe/certs/rootCA.pem", proxyCert);
  assert.equal(bundle.bundlePath, "/root/.config/BYOK-Local-Probe/certs/ca-bundle.pem");
  assert.equal(bundle.systemPath, systemPath);
  assert.equal(files.get(bundle.bundlePath).toString("utf8"), systemCert.toString("utf8") + proxyCert.toString("utf8") + "\n");
  const writeCount = writes.length;
  await writeRemoteCaBundle(vscode, folder, "/root/.config/BYOK-Local-Probe/certs/rootCA.pem", proxyCert);
  assert.equal(writes.length, writeCount, "an unchanged CA bundle is not rewritten");

  const remoteUserSettings = "/root/.devin-server-next/data/User/settings.json";
  files.set(remoteUserSettings, Buffer.from(JSON.stringify({
    "devin.acp.agentEnv": { "devin-cli": { CUSTOM_FLAG: "keep" }, "other-agent": { OTHER: "keep" } },
    "devin.acp.agentPreferences": { "devin-cli": { model: "user-choice" } },
  })));
  await syncRemoteAgentSettings(vscode, folder, 16778, "/remote/rootCA.pem", bundle.bundlePath);
  const remoteSettings = JSON.parse(files.get(remoteUserSettings).toString("utf8"));
  assert.equal(remoteSettings["devin.acp.agentEnv"]["devin-cli"].SSL_CERT_FILE, bundle.bundlePath);
  assert.equal(remoteSettings["devin.acp.agentEnv"]["devin-cli"].CUSTOM_FLAG, "keep");
  assert.equal(remoteSettings["devin.acp.agentEnv"]["other-agent"].OTHER, "keep");
  assert.equal(remoteSettings["devin.acp.agentPreferences"]["devin-cli"].model, "user-choice");
  const stableVscode={...vscode,env:{appName:'Devin'}};
  const stablePaths=await syncRemoteAgentSettings(stableVscode,folder,16778,'/remote/rootCA.pem',bundle.bundlePath);
  assert.deepEqual(stablePaths,['/root/.devin-server/data/User/settings.json','/root/.devin-server/data/Machine/settings.json']);
  const stableSettings=JSON.parse(files.get(stablePaths[0]));assert.equal(stableSettings['devin.acp.agentEnv']['devin-cli'].NODE_EXTRA_CA_CERTS,'/remote/rootCA.pem');assert.equal(stableSettings['devin.acp.agentEnv']['devin-cli'].SSL_CERT_FILE,bundle.bundlePath);

  const localContext = { subscriptions: [] };
  const localVscode = {
    env: { appName: "Devin - Next", remoteName: undefined },
    workspace: {
      getConfiguration() { return { get() { return true; } }; },
      workspaceFolders: [],
    },
    commands: { registerCommand() { return { dispose() {} }; } },
  };
  const localSupport = createSshRemoteSupport({ vscode: localVscode, context: localContext, logger: {} });
  assert.deepEqual(await localSupport.prepare(), { ok: false, skipped: true, reason: "not-ssh-remote" });
  assert.equal(localContext.subscriptions.length, 3);

  const configPath = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "byok-ssh-first-")), "config");
  const commands = new Map();
  const firstVscode = {
    env: { remoteName: undefined },
    workspace: {
      workspaceFolders: [],
      getConfiguration(section) {
        if (section === "remote.devinSSH") return { get: () => configPath };
        if (section === "byokBridge.ssh") return { get: (_key, fallback) => fallback };
        throw new Error("Unexpected configuration: " + section);
      },
    },
    commands: { registerCommand(name, handler) { commands.set(name, handler); return { dispose() {} }; } },
  };
  const support = createSshRemoteSupport({ vscode: firstVscode, context: { subscriptions: [], globalState: { get: () => true } }, logger: { info() {}, warn() {} } });
  assert.deepEqual(await support.prepare(), { ok: false, skipped: true, reason: "not-ssh-remote" });
  assert.equal(fs.existsSync(configPath), false, "local startup must not write an SSH config");
  const firstHost = await commands.get("byokBridge.prepareSshHost")("fresh-server");
  assert.equal(firstHost.changed, true);
  assert.equal(firstHost.proxy, undefined, "stopped Local must not supply a bootstrap proxy");
  const firstText = fs.readFileSync(configPath, "utf8");
  assert.match(firstText, /Host fresh-server\r?\n  RemoteForward 127\.0\.0\.1:16778 127\.0\.0\.1:6778/);
  const repeat = await support.installForwardForHost("fresh-server");
  assert.equal(repeat.changed, false, "first-connect configuration must be idempotent");
  assert.equal(fs.readFileSync(configPath, "utf8"), firstText);
  await assert.rejects(() => support.installForwardForHost("*"), /安全的主机别名/);

  const certDir = fs.mkdtempSync(path.join(os.tmpdir(), "byok-ssh-ca-"));
  const previousCertDir = process.env.BYOK_LOCAL_PROBE_CERTS;
  fs.writeFileSync(path.join(certDir, "rootCA.pem"), proxyCert);
  process.env.BYOK_LOCAL_PROBE_CERTS = certDir;
  try {
    const configurationWrites = [];
    const state = new Map();
    const remoteVscode = {
      ...vscode,
      env: { appName: "Devin - Next", remoteName: "ssh-remote" },
      commands: { registerCommand() { return { dispose() {} }; } },
      workspace: {
        ...vscode.workspace,
        workspaceFolders: [folder],
        getConfiguration(section) {
          if (section === "byokBridge.ssh") return { get: (_key, fallback) => fallback };
          if (section === "devin.acp") return {
            get: () => ({ "devin-cli": { CUSTOM_FLAG: "keep" } }),
            inspect: () => ({ workspaceValue: undefined }),
            async update(key, value, target) { configurationWrites.push({ section, key, value, target }); },
          };
          throw new Error(`SSH setup must not access global proxy settings: ${section}`);
        },
      },
      ConfigurationTarget: { Global: "global", Workspace: "workspace" },
    };
    const remoteSupport = createSshRemoteSupport({
      vscode: remoteVscode,
      context: {
        subscriptions: [],
        workspaceState: { get: key => state.get(key), async update(key, value) { state.set(key, value); } },
      },
      logger: { info() {}, warn() {} },
    });
    const configured = await remoteSupport.installRemoteCaAndSettings();
    assert.equal(configured.settingsPending, null);
    assert.equal(configurationWrites.length, 1);
    assert.equal(configurationWrites[0].target, "workspace");
    assert.equal(configurationWrites[0].value["devin-cli"].HTTP_PROXY, "http://127.0.0.1:16778");
    assert.equal(configurationWrites[0].value["devin-cli"].CUSTOM_FLAG, "keep");
    assert.deepEqual(Object.keys([...state.values()][0]), ["agentEnv"]);

    // The SSH resolver can connect an empty window before any folder exists.
    // Bind setup to that exact authority and discover the actual remote home.
    const authority='ssh-remote+'+Buffer.from(JSON.stringify({hostName:'empty-server'})).toString('hex'),connectionState=new Map(),emptyCommands=new Map();
    files.set('/proc/self/status',Buffer.from('Name:\tremote-server\nUid:\t1001\t1001\t1001\t1001\n'));
    files.set('/etc/passwd',Buffer.from('root:x:0:0:root:/root:/bin/bash\nalice:x:1001:1001:Alice:/srv/alice:/bin/sh\n'));
    const rootFolder={uri:uri({scheme:'vscode-remote',authority,path:'/'})};
    assert.equal((await remoteHomeFolder(remoteVscode,rootFolder)).remoteHome,'/srv/alice');
    const emptyVscode={...remoteVscode,env:{appName:'Devin',remoteName:'ssh-remote'},commands:{registerCommand(name,handler){emptyCommands.set(name,handler);return {dispose(){}};}},window:{showWarningMessage:async()=>undefined},workspace:{...remoteVscode.workspace,workspaceFolders:[],getConfiguration(section){if(section==='remote.devinSSH')return {get:()=>configPath};return remoteVscode.workspace.getConfiguration(section);}}};
    const emptySupport=createSshRemoteSupport({vscode:emptyVscode,context:{subscriptions:[],globalState:{get:()=>true},workspaceState:{get:key=>connectionState.get(key),async update(key,value){connectionState.set(key,value);}}},logger:{info(){},warn(){}}});
    assert.equal((await emptySupport.prepare()).skipped,true,'unrelated empty windows must never guess a remote authority');
    await emptyCommands.get('byokBridge.prepareSshHost')('empty-server',authority);
    const setups=await Promise.all([emptySupport.prepare(),emptySupport.prepare()]);assert.equal(setups[0],setups[1]);assert.equal(setups[0].ok,true);assert.equal(setups[0].remote.settingsPending,null);
    assert.equal(setups[0].remote.caPath,'/srv/alice/.config/BYOK-Local-Probe/certs/rootCA.pem');for(const file of ['/srv/alice/.devin-server/data/User/settings.json','/srv/alice/.devin-server/data/Machine/settings.json']){assert(files.has(file));assert.equal(JSON.parse(files.get(file))['devin.acp.agentEnv']['devin-cli'].NODE_EXTRA_CA_CERTS,setups[0].remote.caPath);}
    assert(files.has('/srv/alice/.windsurf/acp/registry.json'),'empty SSH windows must seed the remote agent registry');assert.equal(writes.filter(file=>file==='/srv/alice/.windsurf/acp/registry.json').length,1,'concurrent setup must not duplicate registry writes');
  } finally {
    if (previousCertDir === undefined) delete process.env.BYOK_LOCAL_PROBE_CERTS;
    else process.env.BYOK_LOCAL_PROBE_CERTS = previousCertDir;
    fs.rmSync(certDir, { recursive: true, force: true });
  }

  console.log("SSH_REMOTE_SUPPORT_OK paths=5 registry=idempotent+merged ca=system+proxy settings=preserved+host-scoped local=skipped");
}

main().catch(error => { console.error(error); process.exitCode = 1; });
