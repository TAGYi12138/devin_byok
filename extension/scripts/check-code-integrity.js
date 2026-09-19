/* eslint-disable no-console */
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const extensionRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(extensionRoot, "..");
const pkg = JSON.parse(fs.readFileSync(path.join(extensionRoot, "package.json"), "utf8"));
const mainPath = path.resolve(extensionRoot, pkg.main || "");
assert(mainPath.startsWith(extensionRoot + path.sep), "package main escapes extension root");
assert(fs.statSync(mainPath).isFile(), "package main is missing");

const manifest = fs.readFileSync(path.join(repoRoot, "packaging", "extension.vsixmanifest"), "utf8");
const manifestVersion = /Identity[^>]*Version="([^"]+)"/.exec(manifest)?.[1];
assert.equal(manifestVersion, pkg.version, "package and VSIX manifest versions differ");
assert.deepEqual(pkg.extensionKind, ["ui"], "Remote SSH support requires the bridge to stay in the local UI host");
assert(/ExtensionKind" Value="ui"/.test(manifest), "VSIX manifest must declare UI extension kind");

const extensionSource = fs.readFileSync(path.join(extensionRoot, "extension.js"), "utf8");
const localSource = fs.readFileSync(path.join(extensionRoot, "server", "run-local-mitm.cjs"), "utf8");
const sshSupportPath = path.join(extensionRoot, "ssh-remote-support.cjs");
assert(fs.statSync(sshSupportPath).isFile(), "SSH remote support module is missing");
const sshSupportSource = fs.readFileSync(sshSupportPath, "utf8");
for (const marker of ["RemoteForward", "ConfigurationTarget.Workspace", "NODE_EXTRA_CA_CERTS"]) {
  assert(sshSupportSource.includes(marker), `SSH remote contract marker missing: ${marker}`);
}
assert(extensionSource.includes("byokSshRemoteSupport.prepare()"), "SSH remote support is not activated");
for (const marker of ["reasoningDialect", "apiFormat", "supportsVision", "openai_responses"]) {
  assert(extensionSource.includes(marker), `extension capability marker missing: ${marker}`);
  assert(localSource.includes(marker), `local adapter capability marker missing: ${marker}`);
}
for (const marker of ["prompt_cache_hit_tokens", "prompt_cache_miss_tokens", "message_nodes", "response.completed", "thinking"]) {
  assert(localSource.includes(marker), `local runtime contract marker missing: ${marker}`);
}
assert(extensionSource.includes("__BYOK_MULTIWINDOW_ACP_SHARED_V1__"), "multi-window ACP lifecycle marker is missing");
assert(extensionSource.includes("gate skip — adopted live 6778 without bouncing global ACP"), "live 6778 must be adopted without an ACP bounce");
assert(extensionSource.includes("global disk-off latch skipped"), "ordinary window disposal must not turn global ACP off");

console.log(`CODE_INTEGRITY_OK version=${pkg.version} main=${path.basename(mainPath)} contracts=16 ssh=ui-local multiwindow=shared-6778`);
