'use strict';

function positiveInteger(value, fallback, minimum = 1, maximum = Number.MAX_SAFE_INTEGER) {
  const parsed = Number.parseInt(String(value ?? ''), 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.max(minimum, Math.min(maximum, parsed));
}

function activityFromStatus(status, now = Date.now()) {
  if (!status || typeof status !== 'object') {
    return { activeRequests: 0, ageMs: Number.POSITIVE_INFINITY, fresh: false };
  }
  const activeRequests = Math.max(0, Number(status.activeRequests ?? status.sessionMonitor?.activeRequests) || 0);
  const updatedAt = Number(status.statusUpdatedAt ?? status.updatedAt) || 0;
  const ageMs = updatedAt > 0 ? Math.max(0, now - updatedAt) : Number.POSITIVE_INFINITY;
  return { activeRequests, ageMs, fresh: Number.isFinite(ageMs) };
}

function evaluateProbeFailure(options = {}) {
  const previousFailures = Math.max(0, Number(options.previousFailures) || 0);
  if (options.live) return { action: 'healthy', failures: 0 };
  const threshold = positiveInteger(options.threshold, 3, 2, 10);
  const activeStatusMaxAgeMs = positiveInteger(options.activeStatusMaxAgeMs, 15000, 1000, 120000);
  const activeRequests = Math.max(0, Number(options.activeRequests) || 0);
  const statusAgeMs = Math.max(0, Number(options.statusAgeMs) || 0);
  if (activeRequests > 0 && statusAgeMs <= activeStatusMaxAgeMs) {
    return { action: 'defer-active-request', failures: 0, activeRequests, statusAgeMs };
  }
  const failures = previousFailures + 1;
  if (failures < threshold) return { action: 'defer-consecutive-failures', failures, threshold };
  return { action: 'verify-before-restart', failures, threshold };
}

module.exports = { activityFromStatus, evaluateProbeFailure };
