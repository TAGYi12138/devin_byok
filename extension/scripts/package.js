/* eslint-disable no-console */
"use strict";

const { spawnSync } = require("node:child_process");
const path = require("node:path");

const script = path.resolve(__dirname, "..", "..", "tools", "build-vsix.ps1");
const shell = process.platform === "win32" ? "powershell.exe" : "pwsh";
const result = spawnSync(shell, ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", script], {
  cwd: path.resolve(__dirname, "..", ".."),
  encoding: "utf8",
  windowsHide: true,
  stdio: "inherit",
});
if (result.error) throw result.error;
process.exitCode = result.status || 0;
