/* eslint-disable no-console */
"use strict";

const { spawnSync } = require("node:child_process");
const path = require("node:path");

const extensionRoot = path.resolve(__dirname, "..");
const files = [
  "extension.js",
  "native-picker-install.cjs",
  "native-picker-patch.cjs",
  "crash-diagnostics.js",
  path.join("server", "run-local-mitm.cjs"),
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
