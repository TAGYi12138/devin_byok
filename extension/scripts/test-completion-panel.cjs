'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const panel = require('../completion-panel.cjs');
const settings = require('../completion-settings.cjs');
const values = {}, updates = [];
const config = {
  get: (key, fallback) => values[key] ?? fallback,
  inspect: key => key === 'timeoutMs' ? { workspaceValue: values.timeoutMs } : {},
  update: async (key, value, scope) => { updates.push({ key, value, scope }); values[key] = value; }
};
const vscode = { workspace: { getConfiguration: () => config }, ConfigurationTarget: { Global: 1, Workspace: 2, WorkspaceFolder: 3 } };
const providers = { publicView: async () => ({ providers: [{ id: 'fast', name: '快速代码模型' }] }) };
const good = { enabled: true, providerId: 'fast', model: 'fast-code', timeoutMs: 2500 };

async function browserCases() {
  const { chromium } = require('playwright');
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 360, height: 950 }, deviceScaleFactor: 1 });
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  let deleted = false;
  const getState = () => ({ completion: settings.read(vscode), config: { providers: [{ id: 'fast', name: '快速代码模型' }], modelCatalog: { fast: { models: ['fast-code', 'another-code-model'] } } } });
  await page.exposeFunction('panelBridge', async (cmd, extra) => {
    if (cmd === 'completionSave') {
      try { return { ok: true, completion: await settings.save(vscode, extra.payload, deleted ? { publicView: async () => ({ providers: [] }) } : providers) }; }
      catch (error) { return { ok: false, error: error.message }; }
    }
    if (cmd === 'fetchModels') return { ok: true, models: ['fast-code', 'refreshed-code-model'] };
    throw Error('unexpected panel command: ' + cmd);
  });
  const source = fs.readFileSync(path.resolve(__dirname, '../extension.js'), 'utf8');
  const baseHtml = JSON.parse(/var _0x59758d = ("(?:[^"\\]|\\.)*")/.exec(source)[1]);
  const baseCss = JSON.parse(/var _0x34df32 = ("(?:[^"\\]|\\.)*")/.exec(source)[1]);
  const shell = panel.attach(baseHtml, 'function render(){\n  renderProviderList();\n}\nbootstrapPanel();\n').html;
  async function load() {
    await page.setContent('<!doctype html><html><head><style>' + baseCss + '</style></head><body>' + shell + '</body></html>');
    // The full panel renderer dismisses this startup overlay. This isolated
    // widget fixture does not start daemons or run the surrounding boot flow.
    await page.evaluate(() => document.getElementById('runtimeBootOverlay')?.remove());
    await page.addScriptTag({ content: 'var state=' + JSON.stringify(getState()) + '; function $(id){return document.getElementById(id)}; function modelsForProvider(id){return state.config.modelCatalog[id]?.models || []}; function call(cmd,extra){return window.panelBridge(cmd,extra)}; (' + panel.panelRuntime.toString() + ')();' });
  }
  try {
    await load();
    assert.equal(await page.locator('#codeCompletionSection').count(), 1);
    await page.locator('#completionProvider').selectOption('fast');
    await page.locator('#completionModel').fill('fast-code');
    await page.locator('#completionTimeout').fill('3000');
    // A normal background state update must leave unsaved edits alone.
    await page.evaluate(() => { state.completion = { enabled: false, providerId: '', model: '', timeoutMs: 5000 }; window.renderCompletionPanel(); });
    assert.equal(await page.locator('#completionModel').inputValue(), 'fast-code');
    assert.equal(await page.locator('#completionTimeout').inputValue(), '3000');
    await page.locator('#completionSave').click();
    await page.waitForFunction(() => !document.getElementById('completionSave').disabled);
    assert.equal(values.model, 'fast-code'); assert.equal(values.timeoutMs, 3000);
    await load();
    assert.equal(await page.locator('#completionModel').inputValue(), 'fast-code', 'saved selection survives panel reload');
    await page.locator('#completionRefresh').click();
    await page.waitForFunction(() => document.querySelector('#completionModelOptions option[value="refreshed-code-model"]'));
    await page.locator('#completionTimeout').fill('0'); await page.locator('#completionSave').click();
    assert.match(await page.locator('#completionStatus').innerText(), /100–30000/); assert.equal(values.timeoutMs, 3000);
    await page.locator('#completionTimeout').fill('3000');
    deleted = true;
    await page.locator('#completionSave').click();
    await page.waitForFunction(() => document.getElementById('completionStatus').textContent.includes('已删除'));
    assert.equal(await page.locator('#completionModel').inputValue(), 'fast-code', 'save failure retains draft');
    deleted = false;
    await page.locator('#completionEnabled').uncheck(); await page.locator('#completionSave').click();
    await page.waitForFunction(() => !document.getElementById('completionSave').disabled); assert.equal(values.enabled, false);
    await page.locator('#completionProvider').selectOption(''); await page.locator('#completionEnabled').check();
    await page.locator('#completionSave').click(); await page.waitForFunction(() => !document.getElementById('completionSave').disabled);
    assert.equal(values.providerId, ''); assert.equal(values.model, '');
    const output = path.resolve(__dirname, '../../artifacts/completion-panel'); fs.mkdirSync(output, { recursive: true });
    for (const width of [320, 500]) {
      await page.setViewportSize({ width, height: 950 });
      const box = page.locator('#codeCompletionSection'); await box.scrollIntoViewIfNeeded();
      assert.equal(await box.evaluate(element => element.scrollWidth <= element.clientWidth + 1), true, 'panel fits ' + width + 'px');
      await box.screenshot({ path: path.join(output, 'completion-panel-' + width + '.png') });
    }
    assert.deepEqual(errors, []);
    console.log('COMPLETION_PANEL_BROWSER_OK save+reload refresh validation deleted-provider dirty-draft toggle widths=320+500');
  } finally { await browser.close(); }
}

(async () => {
  const source = fs.readFileSync(path.resolve(__dirname, '../extension.js'), 'utf8');
  const markup = JSON.parse(/var _0x59758d = ("(?:[^"\\]|\\.)*")/.exec(source)[1]);
  const runtime = JSON.parse(/var _0x500998 = "\\n" \+ _0xdad961 \+ ("(?:[^"\\]|\\.)*");/.exec(source)[1]);
  new Function(panel.attach(markup, runtime).script);
  await settings.save(vscode, good, providers); assert.equal(settings.read(vscode).model, 'fast-code');
  values.timeoutMs = 4000;
  await settings.save(vscode, good, providers); assert.equal(updates.at(-2).scope, vscode.ConfigurationTarget.Workspace, 'honor the effective configuration scope');
  const count = updates.length;
  await assert.rejects(settings.save(vscode, { ...good, timeoutMs: -1 }, providers), /等待时间/);
  await assert.rejects(settings.save(vscode, { ...good, model: '' }, providers), /模型/);
  await assert.rejects(settings.save(vscode, { ...good, providerId: 'deleted' }, providers), /删除/);
  assert.equal(updates.length, count, 'invalid form cannot partially change settings');
  await settings.save(vscode, { enabled: false, providerId: 'deleted', model: '', timeoutMs: 5000 }, providers);
  assert.equal(settings.read(vscode).enabled, false, 'a deleted provider never prevents disabling completion');
  await settings.save(vscode, { enabled: true, providerId: '', model: '', timeoutMs: 5000 }, providers);
  if (process.argv.includes('--browser')) await browserCases();
  console.log('COMPLETION_PANEL_SETTINGS_OK validation=atomic scope=preserved disabled-provider=allowed');
})().catch(error => { console.error(error); process.exitCode = 1; });
