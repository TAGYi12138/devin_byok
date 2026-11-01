'use strict';

const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const { runCapabilityChecks } = require('../server/provider-capability-checks.cjs');

async function main(args = process.argv.slice(2)) {
  const uid = args[0];
  if (!uid || uid.startsWith('-') || !args.includes('--run')) {
    console.log('Usage: node extension/scripts/probe-provider-capabilities.cjs <Local model UID> --run [--vision-only] [--out <report.json>]');
    console.log('Sends at most 4 synthetic model requests using the current Local binding; provider charges may apply. No tools are executed.');
    return;
  }
  const configDir = process.env.BYOK_CONFIG_DIR || path.join(process.env.APPDATA || path.join(os.homedir(), '.config'), 'Devin-BYOK-Bridge', 'config');
  const bindings = JSON.parse(fs.readFileSync(path.join(configDir, 'localBindings.json'), 'utf8'));
  const providers = JSON.parse(fs.readFileSync(path.join(configDir, 'providers.json'), 'utf8'));
  if (bindings.enabled === false) throw new Error('Local bindings are disabled');
  const binding = bindings.bindings?.[uid];
  if (!binding || binding.enabled === false) throw new Error('Active Local binding not found');
  const provider = providers.providers?.find(item => item.id === binding.providerId);
  if (!provider || !provider.apiKey || !binding.modelId) throw new Error('Provider credentials or model are missing');
  const cfg = {
    ...provider, ...binding, model: binding.modelId, apiKey: provider.apiKey,
    baseUrl: binding.baseUrl || provider.baseUrl,
    protocol: binding.protocol || provider.protocol || 'openai',
    timeoutMs: 45000
  };
  process.env.BYOK_LOCAL_MITM_TEST_EXPORTS = '1';
  const serverPath = path.join(__dirname, '../server/run-local-mitm.cjs');
  const adapter = require(serverPath);
  const sharp = require('sharp');
  const image = await sharp({ create: { width: 96, height: 96, channels: 3, background: { r: 0, g: 0, b: 255 } } }).png().toBuffer();
  const report = await runCapabilityChecks({ adapter, cfg, identity: { uid }, onlyVision: args.includes('--vision-only'), imageUrl: 'data:image/png;base64,' + image.toString('base64'), onProgress: name => console.error('PROBE ' + name) });
  const url = new URL(cfg.baseUrl);
  const out = {
    generatedAt: new Date().toISOString(), scope: 'Local provider adapter; no native Agent end-to-end claim',
    baselineVersion: require('../package.json').version,
    adapterSha256: crypto.createHash('sha256').update(fs.readFileSync(serverPath)).digest('hex'),
    target: { uid, providerId: provider.id, model: cfg.model, protocol: adapter.resolveModelCapabilities(cfg).protocol,
      endpointFingerprint: crypto.createHash('sha256').update(JSON.stringify([url.origin + url.pathname, adapter.resolveModelCapabilities(cfg).protocol, cfg.openaiPath || '/chat/completions', cfg.anthropicPath || '/messages'])).digest('hex').slice(0, 16) },
    ...report,
    limitations: ['No native permission, tool execution, cancellation or subagent behavior is validated.', 'No context-limit or cache-hit benchmark is performed.', 'A probe failure is not proof that the model never supports this capability.']
  };
  const at = args.indexOf('--out');
  if (at >= 0) {
    if (!args[at + 1]) throw new Error('--out requires a path');
    const output = path.resolve(args[at + 1]);
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, JSON.stringify(out, null, 2) + '\n');
  }
  console.log(JSON.stringify(out, null, 2));
  if (Object.values(report.checks).some(check => check.status === 'failed')) process.exitCode = 2;
}

if (require.main === module) main().catch(() => { console.error('Capability probe could not run. Check Local binding, configuration paths and runtime dependencies.'); process.exitCode = 1; });
module.exports = { main };
