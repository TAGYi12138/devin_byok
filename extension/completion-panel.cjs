'use strict';

const html = `<style>
#codeCompletionSection .section-title{cursor:default}
#codeCompletionSection .completion-heading{display:flex;align-items:center;justify-content:space-between;gap:10px}
#codeCompletionSection .completion-toggle{display:flex;align-items:center;gap:6px;font-size:11px;cursor:pointer;white-space:nowrap}
#codeCompletionSection .completion-toggle input{width:14px;height:14px;margin:0;accent-color:#2dd4bf}
#codeCompletionSection .completion-fields{display:grid;grid-template-columns:minmax(0,1fr);gap:10px;margin-top:10px;border:0;padding:0;min-width:0}
#codeCompletionSection .completion-field{display:flex;flex-direction:column;gap:5px;font-size:11px;min-width:0}
#codeCompletionSection{color-scheme:dark;--completion-input-bg:var(--vscode-editor-background,#11171e);--completion-input-fg:var(--vscode-editor-foreground,var(--vscode-foreground,#e6edf3));--completion-muted:color-mix(in srgb,var(--completion-input-fg) 65%,var(--completion-input-bg))}
body.vscode-light #codeCompletionSection,body.vscode-high-contrast-light #codeCompletionSection{color-scheme:light}
#codeCompletionSection input:not([type=checkbox]),#codeCompletionSection select{box-sizing:border-box;width:100%;min-width:0;height:31px;border:1px solid var(--fb-border-strong,#34404d);border-radius:6px;background:var(--completion-input-bg);color:var(--completion-input-fg);-webkit-text-fill-color:var(--completion-input-fg);caret-color:var(--completion-input-fg);padding:4px 8px;font:inherit;transition:border-color .15s}
#codeCompletionSection input::placeholder{color:var(--completion-muted);-webkit-text-fill-color:var(--completion-muted);opacity:1}
#codeCompletionSection input:disabled,#codeCompletionSection select:disabled{color:var(--completion-muted);-webkit-text-fill-color:var(--completion-muted);opacity:1}
#codeCompletionSection input:-webkit-autofill,#codeCompletionSection input:-webkit-autofill:hover,#codeCompletionSection input:-webkit-autofill:focus{box-shadow:0 0 0 1000px var(--completion-input-bg) inset!important;-webkit-text-fill-color:var(--completion-input-fg)!important;caret-color:var(--completion-input-fg)}
#codeCompletionSection input:focus-visible,#codeCompletionSection select:focus-visible{outline:1px solid var(--vscode-focusBorder,#2dd4bf);outline-offset:1px}
#codeCompletionSection .completion-model-row{display:flex;gap:6px;align-items:center;min-width:0}
#codeCompletionSection .completion-model-row input{flex:1;min-width:0}
#codeCompletionSection .completion-model-row button{height:31px;flex-shrink:0}
#codeCompletionSection .completion-footer{display:flex;align-items:center;gap:10px;margin-top:12px}
#codeCompletionSection .completion-status{font-size:11px;line-height:1.5;overflow-wrap:anywhere;color:var(--vscode-descriptionForeground,#93a1b1)}
#codeCompletionSection .completion-status.error{color:var(--vscode-errorForeground,#f87171)}
#codeCompletionSection .completion-help{font-size:11px;line-height:1.6;color:var(--vscode-descriptionForeground,#93a1b1);margin:10px 0 0}
@media(min-width:460px){#codeCompletionSection .completion-fields{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}#codeCompletionSection .completion-model-field{grid-column:1/-1}}
</style>
<section class="section fb-glass-surface" id="codeCompletionSection" aria-label="代码补全设置">
  <div class="section-title completion-heading"><span class="section-title-text">代码补全</span><label class="completion-toggle"><input type="checkbox" id="completionEnabled">启用</label></div>
  <div class="section-body-inner">
    <div class="completion-fields">
      <label class="completion-field">供应商<select id="completionProvider" aria-label="补全供应商"><option value="">自动选择已绑定的模型</option></select></label>
      <label class="completion-field">最长等待时间（毫秒）<input id="completionTimeout" type="number" min="100" max="30000" step="100" value="15000"></label>
      <label class="completion-field completion-model-field">模型<div class="completion-model-row"><input id="completionModel" type="text" list="completionModelOptions" placeholder="选择或输入模型 ID" autocomplete="off"><button type="button" class="btn btn-secondary" id="completionRefresh">刷新模型</button></div><datalist id="completionModelOptions"></datalist></label>
    </div>
    <p class="completion-help">输入时显示灰色建议，按 Tab 接受。建议选择响应快的模型；关闭后使用 Devin 官方补全。</p>
    <div class="completion-footer"><button type="button" class="btn btn-primary" id="completionSave">保存设置</button><span id="completionStatus" class="completion-status" role="status" aria-live="polite">正在读取设置…</span></div>
  </div>
</section>
`;

function panelRuntime() {
  var completionDraft = null;
  var completionDirty = false;
  var completionSaving = false;
  function completionNote(message, error) {
    var note = $('completionStatus'); if (!note) return;
    note.textContent = message; note.classList.toggle('error', !!error);
  }
  function completionReadForm() {
    return { enabled: $('completionEnabled').checked, providerId: $('completionProvider').value,
      model: $('completionModel').value.trim(), timeoutMs: Number($('completionTimeout').value) };
  }
  function completionPaintModels() {
    var providerId = $('completionProvider').value;
    var input = $('completionModel'), list = $('completionModelOptions');
    list.replaceChildren();
    (providerId ? modelsForProvider(providerId) : []).forEach(function(model) {
      var option = document.createElement('option'); option.value = model; list.appendChild(option);
    });
    input.disabled = !providerId || completionSaving;
    input.placeholder = providerId ? '选择或输入模型 ID' : '自动沿用已有模型绑定';
    $('completionRefresh').disabled = !providerId || completionSaving;
  }
  function renderCompletionPanel() {
    if (!$('codeCompletionSection') || !state) return;
    if (!completionDirty && !completionSaving) completionDraft = Object.assign({ enabled: true, providerId: '', model: '', timeoutMs: 15000 }, state.completion || {});
    if (!completionDraft) return;
    var select = $('completionProvider'), active = document.activeElement;
    // Background state polls must preserve the user's pending form edits.
    if (active !== select) {
      select.replaceChildren();
      function option(value, label) { var item = document.createElement('option'); item.value = value; item.textContent = label; select.appendChild(item); }
      option('', '自动选择已绑定的模型');
      var providers = (state.config && state.config.providers || []).filter(function(p) { return p.enabled !== false; });
      providers.forEach(function(p) { option(p.id, p.name || p.id); });
      if (completionDraft.providerId && !providers.some(function(p) { return p.id === completionDraft.providerId; })) option(completionDraft.providerId, '供应商已删除或停用 · 请重新选择');
      select.value = completionDraft.providerId;
    }
    $('completionEnabled').checked = !!completionDraft.enabled;
    if (active !== $('completionModel')) $('completionModel').value = completionDraft.model || '';
    if (active !== $('completionTimeout')) $('completionTimeout').value = completionDraft.timeoutMs;
    select.disabled = completionSaving;
    $('completionEnabled').disabled = completionSaving;
    $('completionTimeout').disabled = completionSaving;
    $('completionSave').disabled = completionSaving;
    completionPaintModels();
    if (!completionDirty && !completionSaving) completionNote(completionDraft.enabled ? '已启用 · 保存后立即生效' : '已关闭 · 使用 Devin 官方补全');
  }
  // Export to the main panel renderer, which also runs on external setting changes.
  window.renderCompletionPanel = renderCompletionPanel;
  var section = $('codeCompletionSection');
  if (!section) return;
  function changed(event) {
    if (completionSaving) return;
    if (event.target.id === 'completionProvider') $('completionModel').value = '';
    completionDraft = completionReadForm(); completionDirty = true;
    completionPaintModels(); completionNote('有未保存的更改');
  }
  section.addEventListener('input', changed);
  section.addEventListener('change', changed);
  $('completionSave').addEventListener('click', async function() {
    if (completionSaving) return;
    completionDraft = completionReadForm();
    if (!Number.isInteger(completionDraft.timeoutMs) || completionDraft.timeoutMs < 100 || completionDraft.timeoutMs > 30000) return completionNote('等待时间须为 100–30000 毫秒的整数', true);
    if (completionDraft.enabled && completionDraft.providerId && !completionDraft.model) return completionNote('请选择或输入补全模型', true);
    completionSaving = true; renderCompletionPanel(); completionNote('正在保存…');
    try {
      var result = await call('completionSave', { payload: completionDraft });
      if (!result || !result.ok) throw Error(result && result.error || '保存失败');
      state.completion = result.completion; completionDirty = false;
      completionDraft = Object.assign({}, result.completion);
      completionNote('已保存，立即生效');
    } catch (error) { completionDirty = true; completionNote(error.message, true); }
    finally { completionSaving = false; renderCompletionPanel(); }
  });
  $('completionRefresh').addEventListener('click', async function() {
    var providerId = $('completionProvider').value; if (!providerId) return;
    var button = this; button.disabled = true; completionNote('正在读取模型…');
    try {
      var result = await call('fetchModels', { providerId: providerId });
      if (!result || !result.ok) throw Error(result && result.error || '模型读取失败');
      if (!state.config.modelCatalog) state.config.modelCatalog = {};
      state.config.modelCatalog[providerId] = { models: result.models || [] };
      completionPaintModels(); completionNote('已读取 ' + (result.models || []).length + ' 个模型，可选择或手填');
    } catch (error) { completionNote(error.message, true); }
    finally { button.disabled = !$('completionProvider').value || completionSaving; }
  });
  renderCompletionPanel();
}

function attach(markup, runtime) {
  const anchor = '<div class="main-tab-panel active" id="mainTabCascade"';
  if (!markup.includes(anchor)) throw Error('completion panel HTML anchor missing');
  if (!runtime.includes('  renderProviderList();')) throw Error('completion panel render anchor missing');
  if (!runtime.includes('\nbootstrapPanel();\n')) throw Error('completion panel boot anchor missing');
  return {
    html: markup.replace(anchor, html + '\n' + anchor),
    script: runtime.replace('  renderProviderList();', '  renderProviderList();\n  if (window.renderCompletionPanel) window.renderCompletionPanel();')
      .replace('\nbootstrapPanel();\n', '\n(' + panelRuntime.toString() + ')();\nbootstrapPanel();\n')
  };
}
module.exports = { html, panelRuntime, attach };
