'use strict';

function read(vscode) {
  const config = vscode.workspace.getConfiguration('byokBridge.completion');
  return { enabled: config.get('enabled', true), providerId: config.get('providerId', ''), model: config.get('model', ''), timeoutMs: config.get('timeoutMs', 15000), editorProvider: true };
}

async function configure(vscode, providers) {
  const view = await providers.publicView();
  const choice = await vscode.window.showQuickPick([
    { label: '自动选择已绑定的模型', mode: 'auto' },
    ...(view.providers || []).filter(p => p.enabled !== false).map(p => ({ label: p.name || p.id, description: p.id, providerId: p.id })),
    { label: '使用 Devin 官方补全', mode: 'official' }
  ], { placeHolder: '选择代码补全供应商' });
  if (!choice) return;
  let model = '';
  if (choice.providerId) {
    model = await vscode.window.showInputBox({ prompt: '输入补全使用的模型 ID', placeHolder: '填写供应商支持的完整模型 ID', validateInput: value => value.trim() ? undefined : '请输入模型 ID' });
    if (model === undefined) return;
  }
  const config = vscode.workspace.getConfiguration('byokBridge.completion');
  await config.update('providerId', choice.providerId || '', vscode.ConfigurationTarget.Global);
  await config.update('model', model.trim(), vscode.ConfigurationTarget.Global);
  await config.update('enabled', choice.mode !== 'official', vscode.ConfigurationTarget.Global);
}
async function save(vscode, payload, providers) {
  if (!payload || typeof payload.enabled !== 'boolean') throw Error('请选择是否开启代码补全');
  const providerId = String(payload.providerId || '').trim();
  const model = String(payload.model || '').trim();
  const timeoutMs = Number(payload.timeoutMs);
  if (!Number.isInteger(timeoutMs) || timeoutMs < 100 || timeoutMs > 30000) throw Error('等待时间须为 100–30000 毫秒的整数');
  if (model.length > 256 || providerId.length > 256) throw Error('供应商或模型 ID 过长');
  if (payload.enabled && providerId) {
    const view = await providers.publicView();
    if (!(view.providers || []).some(p => p.id === providerId && p.enabled !== false)) throw Error('供应商已删除或停用，请重新选择');
    if (!model) throw Error('请选择或输入补全模型');
  }
  const config = vscode.workspace.getConfiguration('byokBridge.completion');
  for (const [key, value] of Object.entries({ providerId, model, timeoutMs, enabled: payload.enabled })) {
    const scope = config.inspect?.(key);
    const target = scope?.workspaceFolderValue !== undefined ? vscode.ConfigurationTarget.WorkspaceFolder
      : scope?.workspaceValue !== undefined ? vscode.ConfigurationTarget.Workspace : vscode.ConfigurationTarget.Global;
    await config.update(key, value, target);
  }
  return read(vscode);
}
module.exports = { read, configure, save };
