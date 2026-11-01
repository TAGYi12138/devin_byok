'use strict';
const completion = require('./server/code-completion.cjs');
function register(vscode, getRuntime, log = () => {}) {
  const callers = new Set(), jobs = new Map();
  let cached = null, sequence = 0, disposed = false;
  function record(event, details) { try { log('[completions] ' + JSON.stringify({ event, ...details })); } catch {} }
  function cancelJob(job, reason) { if (job && !job.done) { job.cancelReason = reason; job.controller.abort(); } }
  function waitForJob(job, signal) {
    job.users++; clearTimeout(job.idleTimer);
    return new Promise((resolve, reject) => {
      let ended = false;
      function finish(error, code) {
        if (ended) return; ended = true;
        signal.removeEventListener('abort', cancelled); job.users--;
        // Preserve a pending request across same-context editor refreshes.
        if (!job.users && !job.done) job.idleTimer = setTimeout(() => cancelJob(job, 'no-active-callers'), 750);
        error ? reject(error) : resolve(code);
      }
      const cancelled = () => finish(Error('editor cancelled completion'));
      signal.addEventListener('abort', cancelled, { once: true });
      job.promise.then(code => finish(null, code), error => finish(error));
      if (signal.aborted) cancelled();
    });
  }
  function sameContext(job, document, fingerprint, prefix, suffix) {
    return job && !job.controller.signal.aborted && job.language === document.languageId && job.fingerprint === fingerprint && job.prefix === prefix && job.suffix === suffix;
  }
  function startJob(document, route, fingerprint, prefix, suffix) {
    const job = { id: ++sequence, controller: new AbortController(), users: 0, done: false,
      start: Date.now(), language: document.languageId, fingerprint, prefix, suffix, version: document.version };
    jobs.set(document, job);
    record('request', { id: job.id, model: route.model, protocol: route.protocol, timeoutMs: route.timeoutMs });
    job.promise = completion.requestCode(route, { prefix, suffix, language: job.language }, job.controller.signal)
      .then(code => {
        job.code = code;
        record(code ? 'received' : 'empty', { id: job.id, chars: code.length, durationMs: Date.now() - job.start });
        if (code && document.version === job.version && !job.controller.signal.aborted) cached = { document, language: job.language, fingerprint, time: Date.now(), prefix, suffix, code, id: job.id };
        return code;
      }, error => {
        record(job.controller.signal.aborted ? 'cancelled' : 'failed', { id: job.id, durationMs: Date.now() - job.start, reason: job.cancelReason || error.message });
        job.error = error; throw error;
      }).finally(() => { job.done = true; job.end = Date.now(); clearTimeout(job.idleTimer); });
    return job;
  }
  function item(code, position, id) {
    const result = new vscode.InlineCompletionItem(code, new vscode.Range(position, position));
    if (acceptanceCommand) result.command = { command: 'byokBridge.completionAccepted', title: '', arguments: [id] };
    record('provided', { id, chars: code.length });
    return result;
  }
  const acceptanceCommand = vscode.commands?.registerCommand('byokBridge.completionAccepted', id => record('accepted', { id }));
  const registration = vscode.languages.registerInlineCompletionItemProvider(
    [{ scheme: 'file' }, { scheme: 'untitled' }, { scheme: 'vscode-remote' }],
    { async provideInlineCompletionItems(document, position, _context, token) {
      const controller = new AbortController(); callers.add(controller);
      const subscription = token.onCancellationRequested(() => controller.abort());
      try {
        if (disposed || token.isCancellationRequested) return [];
        const version = document.version, text = document.getText(), offset = document.offsetAt(position);
        if (!text.length) return [];
        await new Promise(resolve => {
          const done = () => { clearTimeout(timer); controller.signal.removeEventListener('abort', done); resolve(); };
          const timer = setTimeout(done, 300); controller.signal.addEventListener('abort', done, { once: true });
        });
        if (controller.signal.aborted) return [];
        const route = completion.resolveRoute(await getRuntime());
        if (!route || controller.signal.aborted || token.isCancellationRequested || document.version !== version) return [];
        const prefix = text.slice(0, offset), suffix = text.slice(offset);
        const fingerprint = JSON.stringify([route.url.href, route.apiKey, route.model, route.protocol]);
        if (cached && cached.document === document && cached.language === document.languageId && cached.fingerprint === fingerprint && Date.now() - cached.time < 5000 && cached.suffix === suffix && prefix.startsWith(cached.prefix)) {
          const consumed = prefix.slice(cached.prefix.length);
          if (cached.code.startsWith(consumed) && cached.code.length > consumed.length) return [item(cached.code.slice(consumed.length), position, cached.id)];
        }
        let job = jobs.get(document);
        if (!sameContext(job, document, fingerprint, prefix, suffix) || job.done && Date.now() - job.end > (job.code ? 5000 : 2000)) {
          cancelJob(job, 'context-changed'); job = startJob(document, route, fingerprint, prefix, suffix);
        }
        const code = await waitForJob(job, controller.signal);
        if (!code || controller.signal.aborted || token.isCancellationRequested || document.version !== version) return [];
        return [item(code, position, job.id)];
      } catch (error) {
        if (!controller.signal.aborted) record('provider-error', { reason: error.message });
        return [];
      }
      finally { subscription.dispose(); callers.delete(controller); }
    } }
  );
  const closeListener = vscode.workspace?.onDidCloseTextDocument?.(document => {
    cancelJob(jobs.get(document), 'document-closed'); jobs.delete(document);
    if (cached?.document === document) cached = null;
  });
  return { dispose() {
    disposed = true; registration.dispose(); acceptanceCommand?.dispose(); closeListener?.dispose();
    for (const controller of callers) controller.abort();
    for (const job of jobs.values()) { clearTimeout(job.idleTimer); cancelJob(job, 'disposed'); }
    callers.clear(); jobs.clear(); cached = null;
  } };
}
module.exports = { register };
