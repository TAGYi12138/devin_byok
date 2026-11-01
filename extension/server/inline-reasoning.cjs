'use strict';

// Some OpenAI-compatible providers put reasoning at the beginning of content
// instead of using a separate reasoning field. Keep this parser streaming so a
// split opening tag can never be written to Devin as visible text.
const TAGS = [
  { open: '<thinking>', close: '</thinking>' },
  { open: '<think>', close: '</think>' }
];
const MAX_LEADING_WHITESPACE = 64;

function suffixPrefixLength(value, prefix) {
  const lower = value.toLowerCase();
  for (let length = Math.min(lower.length, prefix.length - 1); length > 0; length--) {
    if (prefix.startsWith(lower.slice(-length))) return length;
  }
  return 0;
}

function createInlineReasoningSplitter() {
  let state = 'prefix';
  let pending = '';
  let closeTag = '';
  let matched = false;
  let unclosed = false;

  function push(chunk, final = false) {
    pending += String(chunk || '');
    let text = '';
    let reasoning = '';

    while (pending) {
      if (state === 'text') {
        text += pending;
        pending = '';
        break;
      }

      if (state === 'prefix') {
        const first = pending.search(/\S/);
        if (first < 0) {
          if (final || pending.length > MAX_LEADING_WHITESPACE) {
            if (!matched) text += pending;
            pending = '';
            state = 'text';
          }
          break;
        }
        if (first > MAX_LEADING_WHITESPACE) {
          state = 'text';
          continue;
        }
        const candidate = pending.slice(first).toLowerCase();
        const tag = TAGS.find(item => candidate.startsWith(item.open));
        if (tag) {
          matched = true;
          pending = pending.slice(first + tag.open.length);
          closeTag = tag.close;
          state = 'reasoning';
          continue;
        }
        if (!final && TAGS.some(item => item.open.startsWith(candidate))) break;
        state = 'text';
        continue;
      }

      const lower = pending.toLowerCase();
      const end = lower.indexOf(closeTag);
      if (end >= 0) {
        reasoning += pending.slice(0, end);
        pending = pending.slice(end + closeTag.length);
        closeTag = '';
        state = 'prefix';
        continue;
      }
      if (final) {
        reasoning += pending;
        pending = '';
        unclosed = true;
        state = 'text';
        break;
      }
      const held = suffixPrefixLength(pending, closeTag);
      reasoning += pending.slice(0, pending.length - held);
      pending = pending.slice(pending.length - held);
      break;
    }

    if (final && state === 'reasoning') {
      unclosed = true;
      state = 'text';
    }

    return { text, reasoning, matched, unclosed };
  }

  return { push };
}

function splitInlineReasoningText(value) {
  return createInlineReasoningSplitter().push(value, true);
}

function sanitizeInlineReasoningHistory(messages) {
  const result = [];
  let stripped = 0;
  let removed = 0;
  for (const message of messages || []) {
    if (!message || message.role !== 'assistant' || typeof message.content !== 'string') {
      result.push(message);
      continue;
    }
    const split = splitInlineReasoningText(message.content);
    if (!split.matched) {
      result.push(message);
      continue;
    }
    stripped += 1;
    if (!split.text && !message.tool_calls?.length) {
      removed += 1;
      continue;
    }
    result.push({ ...message, content: split.text });
  }
  return { messages: result, stripped, removed };
}

module.exports = { createInlineReasoningSplitter, splitInlineReasoningText, sanitizeInlineReasoningHistory };
