'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const migration = require('../native-plan-continuity.cjs');
const root = fs.mkdtempSync(path.join(os.tmpdir(), 'byok-native-plan-migration-'));
const configPath = path.join(root, 'config.json');
const owned = { type: 'command', command: '"C:/Users/Test/AppData/Roaming/Devin-BYOK-Bridge/hooks/native-plan-continuity.cjs" --hook' };
const user = { type: 'command', command: 'node ./native-plan-continuity.cjs' };
try {
  const config = { version: 1, permissions: { allow: ['Exec(git status)'] }, agent: { compaction_threshold_tokens: 100000 }, hooks: {
    PreToolUse: [{ matcher: 'exec', hooks: [user, owned], timeout: 12 }],
    Stop: [{ matcher: '', hooks: [owned] }, { matcher: '', hooks: [{ type: 'prompt', prompt: 'Verify acceptance criteria' }] }],
    PostCompaction: [{ matcher: '', hooks: [{ ...owned, command: owned.command.replaceAll('/', '\\') }] }]
  } };
  fs.writeFileSync(configPath, JSON.stringify(config));
  const result = migration.removeHooks({ configPath });
  assert.equal(result.removed, 3);
  assert.deepEqual(JSON.parse(fs.readFileSync(result.backupPath, 'utf8')), config);
  const expected = structuredClone(config);
  expected.hooks.PreToolUse[0].hooks = [user];
  expected.hooks.Stop.shift();
  delete expected.hooks.PostCompaction;
  assert.deepEqual(JSON.parse(fs.readFileSync(configPath, 'utf8')), expected);
  assert.equal(migration.removeHooks({ configPath }).changed, false);
  assert.equal(migration.installHooks({ configPath }).changed, false);
  assert.equal(migration.handleHook({ hook_event_name: 'PreToolUse', tool_name: 'exec' }), null);
  assert.equal(migration.requestReminder('existing-session'), null);
  assert.equal(migration.requestReminderFromMessages([]), null);
  fs.writeFileSync(configPath, '{invalid');
  assert.throws(() => migration.removeHooks({ configPath }), SyntaxError);
  assert.equal(fs.readFileSync(configPath, 'utf8'), '{invalid');
  assert.equal(migration.removeHooks({ configPath: path.join(root, 'absent.json') }).changed, false);
  const runtime = fs.readFileSync(path.join(__dirname, '../server/run-local-mitm.cjs'), 'utf8');
  assert(!runtime.includes('__byokNativePlanContinuity'));
  console.log('native plan migration tests passed: mixed hooks preserved, backup, idempotence, invalid config, no stage gate');
} finally {
  const resolved = path.resolve(root);
  if (!resolved.startsWith(path.resolve(os.tmpdir()) + path.sep)) throw new Error('Unsafe test cleanup');
  fs.rmSync(resolved, { recursive: true, force: true });
}
