"use strict";

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const MARKER = "<!-- devin-model-gateway-managed-v1 -->";
const PROFILE_FILES = ["test-runner.md", "browser-qa.md"];

function nativeAgentsDir(env = process.env) {
  const root = process.platform === "win32"
    ? env.APPDATA || path.join(os.homedir(), "AppData", "Roaming")
    : env.XDG_CONFIG_HOME || path.join(os.homedir(), ".config");
  return path.join(root, "devin", "agents");
}

function installProfiles(options = {}) {
  const sourceDir = options.sourceDir || path.join(__dirname, "devin-plugin", "agents");
  const targetDir = options.targetDir || nativeAgentsDir();
  const files = PROFILE_FILES.map(name => {
    const source = fs.readFileSync(path.join(sourceDir, name), "utf8");
    if (!source.includes(MARKER)) throw new Error("unrecognized bundled subagent profile: " + name);
    const target = path.join(targetDir, name);
    const existing = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : null;
    if (existing !== null && existing !== source) {
      throw new Error("existing Devin subagent profile differs from the bundled version: " + target);
    }
    return { name, source, target, existing };
  });
  fs.mkdirSync(targetDir, { recursive: true });
  const installed = [];
  for (const file of files) {
    if (file.existing === file.source) continue;
    fs.writeFileSync(file.target, file.source, "utf8");
    installed.push(file.name);
  }
  return { targetDir, installed, profiles: PROFILE_FILES.slice() };
}

function profileStatus(options = {}) {
  const sourceDir = options.sourceDir || path.join(__dirname, "devin-plugin", "agents");
  const targetDir = options.targetDir || nativeAgentsDir();
  const profiles = PROFILE_FILES.map(name => {
    const target = path.join(targetDir, name);
    if (!fs.existsSync(target)) return { name, status: "missing" };
    const expected = fs.readFileSync(path.join(sourceDir, name), "utf8");
    const current = fs.readFileSync(target, "utf8");
    return { name, status: current === expected ? "installed" : "modified" };
  });
  return { targetDir, installed: profiles.every(item => item.status === "installed"), profiles };
}

function removeProfiles(options = {}) {
  const sourceDir = options.sourceDir || path.join(__dirname, "devin-plugin", "agents");
  const targetDir = options.targetDir || nativeAgentsDir();
  const files = PROFILE_FILES.map(name => {
    const target = path.join(targetDir, name);
    if (!fs.existsSync(target)) return { name, target, exists: false };
    const expected = fs.readFileSync(path.join(sourceDir, name), "utf8");
    const existing = fs.readFileSync(target, "utf8");
    if (existing !== expected) throw new Error("Devin subagent profile was modified; remove it manually: " + target);
    return { name, target, exists: true };
  });
  const removed = [];
  for (const file of files) {
    if (!file.exists) continue;
    fs.unlinkSync(file.target);
    removed.push(file.name);
  }
  return { targetDir, removed };
}

module.exports = { MARKER, PROFILE_FILES, nativeAgentsDir, installProfiles, profileStatus, removeProfiles };
