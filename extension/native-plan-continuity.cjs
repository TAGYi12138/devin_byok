'use strict';

// Migration only. Devin owns planning, approval, todo organization and compaction.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

function configPath() {
  return path.join(process.env.APPDATA || path.join(os.homedir(), '.config'), 'devin', 'config.json');
}
function isOwnedHook(hook) {
  if (!hook || hook.type !== 'command') return false;
  const command = String(hook.command || '').replace(/\\/g, '/');
  return /(?:^|[\s"'])[^\r\n"']*Devin-BYOK-Bridge\/hooks\/native-plan-continuity\.cjs(?:["'\s]|$)/i.test(command);
}
function removeHooks(options = {}) {
  const targetConfig = options.configPath || configPath();
  if (!fs.existsSync(targetConfig)) return { changed: false, removed: 0, configPath: targetConfig };
  const original = fs.readFileSync(targetConfig, 'utf8');
  // Never replace malformed user configuration with an empty object.
  const config = JSON.parse(original);
  if (!config.hooks || typeof config.hooks !== 'object' || Array.isArray(config.hooks)) {
    return { changed: false, removed: 0, configPath: targetConfig };
  }
  let removed = 0;
  for (const [event, entries] of Object.entries(config.hooks)) {
    if (!Array.isArray(entries)) continue;
    const retained = [];
    for (const entry of entries) {
      if (!Array.isArray(entry && entry.hooks)) { retained.push(entry); continue; }
      const hooks = entry.hooks.filter(hook => {
        if (!isOwnedHook(hook)) return true;
        removed += 1;
        return false;
      });
      if (hooks.length === entry.hooks.length) retained.push(entry);
      else if (hooks.length) retained.push({ ...entry, hooks });
    }
    if (retained.length) config.hooks[event] = retained;
    else delete config.hooks[event];
  }
  if (!removed) return { changed: false, removed: 0, configPath: targetConfig };
  const backupPath = `${targetConfig}.before-native-plan-migration-${Date.now()}-${process.pid}.bak`;
  fs.copyFileSync(targetConfig, backupPath, fs.constants.COPYFILE_EXCL);
  const temp = `${targetConfig}.${process.pid}.tmp`;
  fs.writeFileSync(temp, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
  fs.renameSync(temp, targetConfig);
  return { changed: true, removed, configPath: targetConfig, backupPath };
}
// Compatibility for old command callers: install now restores native behavior.
function installHooks(options = {}) { return { ...removeHooks(options), retired: true }; }
function handleHook() { return null; }
function requestReminder() { return null; }
function requestReminderFromMessages() { return null; }
module.exports = { removeHooks, installHooks, handleHook, requestReminder, requestReminderFromMessages };
