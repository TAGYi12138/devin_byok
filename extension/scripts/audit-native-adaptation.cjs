'use strict';

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');

const fingerprint = value => crypto.createHash('sha256').update(String(value)).digest('hex').slice(0, 12);
function audit({ configDir, dbPath, installRoots = [], limit = 8 } = {}) {
  const report = {
    generatedAt: new Date().toISOString(), baselineVersion: require('../package.json').version,
    scope: 'Read-only active-chain and on-disk installation audit; no live request or screen verification',
    installations: [], sessions: [], warnings: [],
    limitations: ['Installed files do not prove which version is running.', 'Database usage does not prove live request identity or UI display.', 'No prompt text, tool arguments, workspace paths or raw session IDs are recorded.']
  };
  const sourcePath = path.join(__dirname, '../server/run-local-mitm.cjs');
  const sourceHash = crypto.createHash('sha256').update(fs.readFileSync(sourcePath)).digest('hex');
  for (const root of installRoots) {
    if (!fs.existsSync(root)) continue;
    for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
      if (!entry.isDirectory() || !entry.name.includes('devin-byok-bridge')) continue;
      const pkg = path.join(root, entry.name, 'package.json');
      const server = path.join(root, entry.name, 'server/run-local-mitm.cjs');
      if (!fs.existsSync(pkg)) continue;
      const version = JSON.parse(fs.readFileSync(pkg, 'utf8')).version;
      report.installations.push({ version, adapterMatchesWorkspace: fs.existsSync(server) && crypto.createHash('sha256').update(fs.readFileSync(server)).digest('hex') === sourceHash });
    }
  }
  if (report.installations.length && !report.installations.some(item => item.adapterMatchesWorkspace)) report.warnings.push('No installed adapter matches the workspace baseline; live evidence cannot be attributed to this source version.');
  const bindingsFile = path.join(configDir, 'localBindings.json');
  const bindings = fs.existsSync(bindingsFile) ? JSON.parse(fs.readFileSync(bindingsFile, 'utf8')) : {};
  if (!fs.existsSync(dbPath)) { report.warnings.push('Native sessions database is unavailable.'); return report; }
  const { DatabaseSync } = require('node:sqlite');
  const db = new DatabaseSync(dbPath, { readOnly: true });
  try {
    db.exec('PRAGMA busy_timeout=250');
    const sessions = db.prepare('SELECT id, model, main_chain_id, last_activity_at FROM sessions ORDER BY last_activity_at DESC LIMIT ?').all(Math.max(1, Math.min(20, limit)));
    const chainQuery = db.prepare('WITH RECURSIVE chain(node_id,parent_node_id,chat_message,metadata,depth) AS (SELECT node_id,parent_node_id,chat_message,metadata,0 FROM message_nodes WHERE session_id=? AND node_id=? UNION ALL SELECT m.node_id,m.parent_node_id,m.chat_message,m.metadata,chain.depth+1 FROM message_nodes m JOIN chain ON m.session_id=? AND m.node_id=chain.parent_node_id WHERE chain.depth<4096) SELECT chat_message,metadata,depth FROM chain ORDER BY depth');
    for (const session of sessions) {
      const binding = bindings.enabled === false ? null : bindings.bindings?.[session.model];
      const row = { sessionFingerprint: fingerprint(session.id), selectedModelUid: session.model, bound: !!binding && binding.enabled !== false, lastActivityAt: session.last_activity_at, activeChainNodes: 0, activeCompactor: false, latestUsage: null, chainTraversalCapped: false };
      if (session.main_chain_id == null) { report.sessions.push(row); continue; }
      const chain = chainQuery.all(session.id, session.main_chain_id, session.id);
      row.activeChainNodes = chain.length;
      row.chainTraversalCapped = chain.some(node => node.depth >= 4096);
      for (const node of chain) {
        let message, metadata;
        try { message = JSON.parse(node.chat_message); metadata = JSON.parse(node.metadata || '{}'); } catch { continue; }
        const source = message?.metadata || {};
        if (source.generation_model === 'compactor' && metadata?.summarized_from != null) row.activeCompactor = true;
        if (row.latestUsage || message?.role !== 'assistant' || !source.metrics || !source.generation_model) continue;
        const m = source.metrics;
        const number = value => Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0;
        const total = number(m.input_tokens) + number(m.cache_read_tokens) + number(m.cache_creation_tokens);
        const preceding = number(metadata?.num_tokens_preceding);
        row.latestUsage = {
          generatedModelUid: source.generation_model,
          matchesSelectedModel: source.generation_model === session.model,
          inputTotal: total, precedingTokens: preceding,
          cacheReadTokens: number(m.cache_read_tokens), outputTokens: number(m.output_tokens),
          accountingAgrees: preceding > 0 && total > 0 ? preceding === total : null,
          createdAt: source.created_at || null
        };
      }
      report.sessions.push(row);
    }
  } finally { db.close(); }
  return report;
}

function main(args = process.argv.slice(2)) {
  const appData = process.env.APPDATA || path.join(os.homedir(), '.config');
  const report = audit({
    configDir: process.env.BYOK_CONFIG_DIR || path.join(appData, 'Devin-BYOK-Bridge/config'),
    dbPath: process.env.BYOK_LOCAL_SESSIONS_DB || path.join(appData, 'devin/cli-next/sessions.db'),
    installRoots: [path.join(os.homedir(), '.devin-next/extensions'), path.join(os.homedir(), '.devin/extensions')]
  });
  const at = args.indexOf('--out');
  if (at >= 0) {
    if (!args[at + 1]) throw new Error('--out requires a path');
    const output = path.resolve(args[at + 1]);
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
  }
  console.log(JSON.stringify(report, null, 2));
}

if (require.main === module) { try { main(); } catch { console.error('Read-only native adaptation audit failed; check database schema and configuration.'); process.exitCode = 1; } }
module.exports = { audit };
