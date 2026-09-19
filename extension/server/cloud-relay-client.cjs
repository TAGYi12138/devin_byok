'use strict';

// Thin client boundary for the cloud separation mode.
// The extension sends the already-decoded Devin request to this endpoint;
// provider selection, protocol conversion and upstream credentials stay on
// the server.  This module deliberately contains no provider logic or keys.

const https = require('node:https');
const http = require('node:http');

const HOP_BY_HOP = new Set([
  'connection', 'keep-alive', 'proxy-authenticate', 'proxy-authorization',
  'te', 'trailer', 'transfer-encoding', 'upgrade', 'content-length', 'host'
]);

function cloudRelayConfig(env = process.env) {
  const endpoint = String(env.BYOK_CLOUD_RELAY_URL || '').trim();
  const token = String(env.BYOK_CLOUD_RELAY_TOKEN || '').trim();
  if (!endpoint || !token) return null;
  let url;
  try {
    url = new URL(endpoint);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
  return {
    url,
    token,
    timeoutMs: Math.max(5000, Math.min(300000, Number(env.BYOK_CLOUD_RELAY_TIMEOUT_MS) || 120000))
  };
}

function forwardedHeaders(headers) {
  const out = {};
  for (const [key, value] of Object.entries(headers || {})) {
    const lower = String(key).toLowerCase();
    if (HOP_BY_HOP.has(lower)) continue;
    if (value == null) continue;
    out[lower] = Array.isArray(value) ? value.join(', ') : String(value);
  }
  return out;
}

/**
 * Forward one raw Devin chat request to the cloud gateway.
 * The response is streamed to the caller so Devin's existing response path
 * and cancellation behavior remain intact.
 */
function forwardRaw(options = {}) {
  const cfg = options.config || cloudRelayConfig();
  if (!cfg) return Promise.reject(new Error('cloud relay is not configured'));
  const target = cfg.url;
  const body = Buffer.isBuffer(options.body) ? options.body : Buffer.from(options.body || '');
  const headers = forwardedHeaders(options.headers);
  headers.authorization = `Bearer ${cfg.token}`;
  headers['content-type'] = 'application/octet-stream';
  headers['content-length'] = String(body.length);
  headers['x-byok-target-host'] = String(options.targetHost || '');
  headers['x-byok-target-port'] = String(options.targetPort || 443);
  headers['x-byok-target-method'] = String(options.targetMethod || 'POST');
  headers['x-byok-target-path'] = String(options.targetPath || '/');
  headers['x-byok-client-version'] = String(options.clientVersion || 'unknown');

  const requestOptions = {
    protocol: target.protocol,
    hostname: target.hostname,
    port: target.port || (target.protocol === 'https:' ? 443 : 80),
    method: 'POST',
    path: `${target.pathname || '/'}${target.search || ''}`,
    headers,
    timeout: cfg.timeoutMs,
    agent: options.agent
  };
  const transport = target.protocol === 'https:' ? https : http;

  return new Promise((resolve, reject) => {
    let settled = false;
    const fail = (err) => {
      if (settled) return;
      settled = true;
      reject(err instanceof Error ? err : new Error(String(err)));
    };
    const req = transport.request(requestOptions, (res) => {
      if (settled) return;
      settled = true;
      if (typeof options.onResponse === 'function') {
        options.onResponse(res.statusCode || 502, res.headers || {});
      }
      res.on('data', (chunk) => {
        if (typeof options.onData === 'function') options.onData(chunk);
      });
      res.on('end', () => {
        if (typeof options.onEnd === 'function') options.onEnd();
        resolve({ status: res.statusCode || 502, headers: res.headers || {} });
      });
      res.on('error', fail);
    });
    req.on('timeout', () => req.destroy(new Error(`cloud relay timeout after ${cfg.timeoutMs}ms`)));
    req.on('error', fail);
    req.end(body);
  });
}

module.exports = { cloudRelayConfig, forwardedHeaders, forwardRaw };
