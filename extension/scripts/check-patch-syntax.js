/* eslint-disable no-console */
"use strict";

const { spawnSync } = require("node:child_process");
const path = require("node:path");

const extensionRoot = path.resolve(__dirname, "..");
const files = [
  "extension.js",
  "cloud-client.cjs",
  "cloud-dashboard.cjs",
  path.join("server", "public-errors.cjs"),
  "cloud-panel.cjs",
  "plugin-updater.cjs",
  path.join("server", "cloud-managed.cjs"),
  "native-picker-install.cjs",
  "native-picker-patch.cjs",
  "native-picker-next-311.cjs",
  "native-picker-compat.cjs",
  path.join("server", "image-runtime.cjs"),
  "native-prompt-preflight.cjs",
  "ssh-remote-support.cjs",
  "native-ssh-preflight.cjs",
  "crash-diagnostics.js",
  path.join("server", "run-local-mitm.cjs"),
  path.join("server", "session-identity.cjs"),
  path.join("server", "hybrid-server.js"),
  path.join("server", "inference-proxy.js"),
  path.join("server", "output-health.cjs"),
  path.join("server", "provider-stream.cjs"),
  path.join("server", "acceptance-guard.cjs"),
  path.join("server", "subagent-tool-calls.cjs"),
  path.join("server", "inline-reasoning.cjs"),
  path.join("server", "native-model-catalog.cjs"),
  path.join("server", "native-picker-migration.cjs"),
  path.join("server", "native-picker-sync.cjs"),
];

for (const relative of files) {
  const result = spawnSync(process.execPath, ["--check", path.join(extensionRoot, relative)], {
    encoding: "utf8",
    windowsHide: true,
  });
  if (result.error || result.status !== 0) {
    process.stderr.write(result.error ? `${result.error.message}\n` : String(result.stderr || result.stdout));
    process.exit(result.status || 1);
  }
}

console.log(`PATCH_SYNTAX_OK files=${files.length}`);
