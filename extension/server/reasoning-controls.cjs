'use strict';

const DIALECTS = new Set([
  'deepseek-chat', 'glm-chat', 'zhipu-chat', 'kimi-k3', 'grok-chat',
  'gemini-chat', 'qwen-chat', 'openai-chat', 'none'
]);

function requestedEffort(identity) {
  const source = identity && typeof identity === 'object' ? identity : {};
  let effort = String(source.reasoningEffort || source.effort || '').trim().toLowerCase();
  if (!effort) {
    const uid = String(source.uid || source.modelUid || '').trim().toLowerCase().replace(/_/g, '-');
    effort = uid.match(/(?:^|-)(none|minimal|low|medium|high|xhigh|max|ultra)(?:-|$)/)?.[1] || '';
  }
  return ['none', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max', 'ultra'].includes(effort) ? effort : '';
}

function resolveDialect(modelId, explicitValue) {
  const model = String(modelId || '').trim().toLowerCase();
  const explicit = String(explicitValue || '').trim().toLowerCase();
  if (/^claude(?:[-_]|$)/.test(model)) return 'legacy-claude';
  if (DIALECTS.has(explicit)) return explicit === 'zhipu-chat' ? 'glm-chat' : explicit;
  if (/deepseek/.test(model)) return 'deepseek-chat';
  if (/^glm[-_.]?5[-_.]?3(?:[-_.]|$)/.test(model)) return 'glm-chat';
  if (/^kimi[-_.]?k3(?:[-_.]|$)/.test(model)) return 'kimi-k3';
  if (/^grok[-_.]/.test(model)) return 'grok-chat';
  if (/^gemini[-_.]/.test(model)) return 'gemini-chat';
  if (/^qwen[-_.]?3/.test(model)) return 'qwen-chat';
  if (/^(?:gpt-|o[1-4](?:[.-]|$))/.test(model)) return 'openai-chat';
  return 'unknown';
}

function mapDeepSeekEffort(value) {
  const effort = String(value || '').trim().toLowerCase();
  if (effort === 'minimal' || effort === 'low') return 'low';
  if (['medium', 'high', 'xhigh'].includes(effort)) return 'high';
  if (effort === 'max' || effort === 'ultra') return 'max';
  return '';
}

function mapGlmEffort(value) {
  const effort = String(value || '').trim().toLowerCase();
  if (['minimal', 'low'].includes(effort)) return 'low';
  if (['medium', 'high'].includes(effort)) return 'high';
  if (['xhigh', 'max', 'ultra'].includes(effort)) return 'max';
  return '';
}

function mapKimiEffort(value) {
  return mapGlmEffort(value);
}

function mapCompatibleEffort(requested, capabilities) {
  if (!requested) return { effort: '', recognized: false };
  const model = String(capabilities?.model || '').trim().toLowerCase();
  const protocol = capabilities?.protocol || 'openai';
  const dialect = capabilities?.reasoningDialect || resolveDialect(model, capabilities?.reasoningDialect);
  let levels = null;
  let effort = requested;
  if (dialect === 'none') return { effort: '', recognized: false };
  if (protocol === 'openai_responses' && dialect === 'glm-chat') {
    return { effort: mapGlmEffort(requested), recognized: true };
  }
  if (protocol === 'openai_responses' && dialect === 'kimi-k3') {
    return { effort: mapKimiEffort(requested), recognized: true };
  }
  if (/^grok-4[._-]3(?:[-_.]|$)/.test(model)) levels = ['none', 'low', 'medium', 'high'];
  else if (/^grok-4[._-]5(?:[-_.]|$)/.test(model)) levels = ['low', 'medium', 'high'];
  else if (/^grok-4[._-][67](?:[-_.]|$)/.test(model)) levels = ['low', 'medium', 'high', 'xhigh'];
  else if (dialect === 'grok-chat' && !/^grok[-_.]/.test(model)) levels = ['low', 'medium', 'high'];
  else if (protocol === 'openai' && /^gemini-2[._-]5(?:[-_.]|$)/.test(model)) {
    levels = ['low', 'medium', 'high'];
    if (/^gemini-2[._-]5-flash(?:[-_.]|$)/.test(model)) levels.push('none');
  }
  else if (protocol === 'openai' && /^gemini-3(?:[-_.]|$)/.test(model)) {
    levels = /^gemini-3-pro-preview(?:[-_.]|$)/.test(model) ? ['low', 'high'] : ['low', 'medium', 'high'];
    if (/^gemini-(?:3[._-](?:5|6)-flash|3[._-]1-flash-lite|3-flash-preview)(?:[-_.]|$)/.test(model)) levels.push('minimal');
    if (/^gemini-3[._-]1-pro(?:[-_.]|$)/.test(model) && requested === 'minimal') effort = 'low';
  }
  else if (protocol === 'openai' && dialect === 'gemini-chat' && !/^gemini[-_.]/.test(model)) levels = ['low', 'medium', 'high'];
  else if (/^qwen3[._-](?:[5-8]|max)(?:[-_.]|$)/.test(model) || dialect === 'qwen-chat' && !/^qwen(?:3|[-_.])/.test(model)) levels = ['none', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max'];
  else if (/^gpt-6(?:[-_.]|$)/.test(model)) {
    levels = ['low', 'medium', 'high', 'xhigh', 'max'];
    if (/^gpt-6[-_](?:sol|luna)(?:[-_.]|$)/.test(model)) levels.push('none');
  }
  else if (/^gpt-5[._-]6(?:[-_.]|$)/.test(model)) levels = ['none', 'low', 'medium', 'high', 'xhigh', 'max'];
  else if (/^gpt-5[._-](?:2|4|5)(?:[-_.]|$)/.test(model) && /[-_]pro(?:[-_.]|$)/.test(model)) {
    levels = protocol === 'openai_responses' ? ['medium', 'high', 'xhigh'] : null;
  }
  else if (/^gpt-5[-_]pro(?:[-_.]|$)/.test(model)) levels = protocol === 'openai_responses' ? ['high'] : null;
  else if (/^gpt-5[._-](?:2|4|5)(?:[-_.]|$)/.test(model)) levels = ['none', 'low', 'medium', 'high', 'xhigh'];
  else if (/^gpt-5[._-]3(?:[-_.]|$)/.test(model)) levels = ['low', 'medium', 'high', 'xhigh'];
  else if (/^gpt-5[._-]1(?:[-_.]|$)/.test(model)) levels = ['none', 'low', 'medium', 'high'];
  else if (/^gpt-5(?:[-_.]|$)/.test(model)) levels = ['minimal', 'low', 'medium', 'high'];
  else if (/^(?:o[1-4](?:[.-]|$)|claude(?:[-_]|$))/.test(model)) levels = ['minimal', 'low', 'medium', 'high', 'xhigh', 'max'];
  else if (/^gpt-/.test(model)) levels = [];
  else if (dialect === 'openai-chat') levels = ['none', 'minimal', 'low', 'medium', 'high', 'xhigh', 'max'];
  if (levels && requested !== 'none') {
    if (requested === 'minimal' && !levels.includes('minimal')) {
      effort = 'low';
    }
    if (requested === 'medium' && !levels.includes('medium') && levels.includes('high')) effort = 'high';
    if (['xhigh', 'max', 'ultra'].includes(requested) && !levels.includes(requested)) {
      effort = ['xhigh', 'high'].find(level => levels.includes(level)) || '';
      if (requested === 'ultra' && levels.includes('max')) effort = 'max';
    }
  }
  return { effort: levels && levels.includes(effort) ? effort : '', recognized: !!levels };
}

function applyChatControls(body, identity, capabilities, compaction = false) {
  if (!body || typeof body !== 'object' || capabilities.protocol === 'anthropic') return capabilities;
  const requested = requestedEffort(identity);
  if (capabilities.reasoningDialect === 'deepseek-chat') {
    if (compaction || requested === 'none') {
      body.thinking = { type: 'disabled' };
      delete body.reasoning_effort;
      return capabilities;
    }
    const effort = mapDeepSeekEffort(requested);
    if (effort) {
      body.thinking = { type: 'enabled' };
      body.reasoning_effort = effort;
    }
    return capabilities;
  }
  if (capabilities.reasoningDialect === 'glm-chat') {
    body.thinking = { type: 'enabled' };
    if (!compaction) {
      const effort = mapGlmEffort(requested);
      if (effort) body.reasoning_effort = effort;
    }
    return capabilities;
  }
  if (capabilities.reasoningDialect === 'kimi-k3') {
    delete body.thinking;
    if (!compaction) {
      const effort = mapKimiEffort(requested);
      if (effort) body.reasoning_effort = effort;
    }
    return capabilities;
  }
  if (!compaction) {
    const effort = mapCompatibleEffort(requested, capabilities).effort;
    if (effort) body.reasoning_effort = effort;
  }
  return capabilities;
}

module.exports = {
  requestedEffort,
  resolveDialect,
  mapDeepSeekEffort,
  mapGlmEffort,
  mapKimiEffort,
  mapCompatibleEffort,
  applyChatControls
};
