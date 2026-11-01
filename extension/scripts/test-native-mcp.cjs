"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const mcp = require("../native-mcp.cjs");

async function main() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "devin-native-mcp-test-"));
  const workspace = path.join(root, "project");
  const runtimeBase = path.join(root, "runtime");
  fs.mkdirSync(path.join(workspace, ".devin"), { recursive: true });
  const configFile = mcp.configPath(workspace);
  fs.writeFileSync(configFile, JSON.stringify({
    mcpServers: { other: { command: "other-server", args: ["--safe"] } },
    customSetting: "preserve",
  }), "utf8");
  let installs = 0;
  const options = {
    runtimeBase,
    nodePath: process.execPath,
    browser: "chrome",
    install: async (_node, entry, target) => {
      installs++;
      if (entry.kind === "uvx") {
        fs.mkdirSync(target, { recursive: true });
        fs.writeFileSync(path.join(target, ".installed-version"), entry.version + "\n");
        return;
      }
      const packageDir = path.join(target, "node_modules", ...entry.packageName.split("/"));
      fs.mkdirSync(packageDir, { recursive: true });
      fs.writeFileSync(path.join(packageDir, "package.json"), JSON.stringify({ version: entry.version }));
      const cli = path.join(target, ...entry.cliPath);
      fs.mkdirSync(path.dirname(cli), { recursive: true });
      fs.writeFileSync(cli, "// test fixture\n");
    },
  };
  try {
    assert.equal(mcp.status(workspace, options)[0].enabled, false);
    let [state] = await mcp.setEnabled(workspace, "playwright", true, options);
    assert.equal(state.enabled, true);
    assert.equal(state.installed, true);
    assert.equal(installs, 1);
    let config = JSON.parse(fs.readFileSync(configFile, "utf8"));
    assert.equal(config.customSetting, "preserve");
    assert.equal(config.mcpServers.other.command, "other-server");
    assert.equal(config.mcpServers.playwright.command, process.execPath);
    assert.deepEqual(config.mcpServers.playwright.args.slice(-4), ["--browser", "chrome", "--headless", "--isolated"]);

    [state] = await mcp.setEnabled(workspace, "playwright", false, options);
    assert.equal(state.enabled, false);
    assert.equal(state.installed, true);
    assert.equal(JSON.parse(fs.readFileSync(configFile, "utf8")).mcpServers.playwright.disabled, true);
    [state] = await mcp.setEnabled(workspace, "playwright", true, options);
    assert.equal(state.enabled, true);
    assert.equal(installs, 1, "re-enabling must not download again");

    let context7 = (await mcp.setEnabled(workspace, "context7", true, options)).find(item => item.name === "context7");
    assert.equal(context7.enabled, true);
    assert.equal(context7.kind, "remote");
    assert.equal(context7.installed, false);
    assert.equal(installs, 1, "remote MCP must not download a package");
    config = JSON.parse(fs.readFileSync(configFile, "utf8"));
    assert.equal(config.mcpServers.context7.url, "https://mcp.context7.com/mcp");
    assert.equal(config.mcpServers.playwright.disabled, false);
    config.mcpServers.context7.headers = { Authorization: "Bearer test-only" };
    fs.writeFileSync(configFile, JSON.stringify(config), "utf8");
    context7 = (await mcp.setEnabled(workspace, "context7", false, options)).find(item => item.name === "context7");
    assert.equal(context7.enabled, false);
    context7 = (await mcp.setEnabled(workspace, "context7", true, options)).find(item => item.name === "context7");
    assert.equal(context7.enabled, true);
    assert.equal(JSON.parse(fs.readFileSync(configFile, "utf8")).mcpServers.context7.headers.Authorization, "Bearer test-only");

    const threeEntry = mcp.CATALOG.find(item => item.name === "threejs-devtools-mcp");
    assert.equal(threeEntry.minNodeMajor, 22);
    let three = (await mcp.setEnabled(workspace, threeEntry.name, true, options)).find(item => item.name === threeEntry.name);
    assert.equal(three.enabled, true);
    assert.equal(three.installed, true);
    assert.equal(installs, 2);
    config = JSON.parse(fs.readFileSync(configFile, "utf8"));
    assert.deepEqual(config.mcpServers[threeEntry.name].args, [path.join(runtimeBase, threeEntry.name, ...threeEntry.cliPath)]);
    config.mcpServers[threeEntry.name].env = { DEV_PORT: "5173" };
    fs.writeFileSync(configFile, JSON.stringify(config), "utf8");
    three = (await mcp.setEnabled(workspace, threeEntry.name, false, options)).find(item => item.name === threeEntry.name);
    assert.equal(three.enabled, false);
    three = (await mcp.setEnabled(workspace, threeEntry.name, true, options)).find(item => item.name === threeEntry.name);
    assert.equal(three.enabled, true);
    assert.equal(installs, 2, "re-enabling Three.js MCP must not download again");
    assert.equal(JSON.parse(fs.readFileSync(configFile, "utf8")).mcpServers[threeEntry.name].env.DEV_PORT, "5173");

    const blenderEntry = mcp.CATALOG.find(item => item.name === "blender");
    assert.equal(blenderEntry.version, "2.1.1");
    const blender = (await mcp.setEnabled(workspace, "blender", true, { ...options, uvxPath: process.execPath })).find(item => item.name === "blender");
    assert.equal(blender.enabled, true);
    assert.equal(blender.installed, true);
    assert.equal(blender.external, false);
    assert.equal(installs, 3);
    config = JSON.parse(fs.readFileSync(configFile, "utf8"));
    assert.equal(config.mcpServers.blender.command, process.execPath);
    assert.deepEqual(config.mcpServers.blender.args, blenderEntry.uvArgs);
    assert.equal(config.mcpServers.blender.env.BLENDER_MCP_SAFE_MODE, "1");
    assert.equal(config.mcpServers.blender.env.UV_OFFLINE, "1");
    config.mcpServers.blender.env.BLENDER_PORT = "9877";
    fs.writeFileSync(configFile, JSON.stringify(config), "utf8");
    await mcp.setEnabled(workspace, "blender", false, options);
    await mcp.setEnabled(workspace, "blender", true, { ...options, uvxPath: process.execPath });
    config = JSON.parse(fs.readFileSync(configFile, "utf8"));
    assert.equal(config.mcpServers.blender.env.BLENDER_PORT, "9877");
    assert.equal(installs, 3, "re-enabling Blender MCP must not install again");

    config = JSON.parse(fs.readFileSync(configFile, "utf8"));
    config.mcpServers.playwright = { command: "unrelated-server", args: [] };
    fs.writeFileSync(configFile, JSON.stringify(config), "utf8");
    await assert.rejects(mcp.setEnabled(workspace, "playwright", true, options), /同名但不同/);
    assert.equal(JSON.parse(fs.readFileSync(configFile, "utf8")).mcpServers.playwright.command, "unrelated-server");
  } finally {
    const relative = path.relative(os.tmpdir(), root);
    if (!relative.startsWith("..") && !path.isAbsolute(relative) && path.basename(root).startsWith("devin-native-mcp-test-")) {
      fs.rmSync(root, { recursive: true, force: true });
    }
  }
  console.log("NATIVE_MCP_OK");
}

main().catch(error => { console.error(error); process.exitCode = 1; });
