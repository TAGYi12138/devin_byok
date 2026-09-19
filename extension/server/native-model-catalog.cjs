"use strict";

// Shared by the daemon and extension host. No renderer, timers or global cache.
const fs = require("node:fs");
const MAX_BYTES = 8 * 1024 * 1024;
const MAX_MODELS = 2000;

function fields(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length > MAX_BYTES) throw new Error("model payload exceeds limit");
  let offset = 0;
  function varint() {
    let value = 0, shift = 0, byte;
    do {
      if (offset >= buffer.length || shift > 63) throw new Error("invalid model protobuf");
      byte = buffer[offset++];
      value += (byte & 127) * 2 ** shift;
      shift += 7;
    } while (byte & 128);
    return value;
  }
  const result = [];
  while (offset < buffer.length) {
    if (result.length >= 50000) throw new Error("too many protobuf fields");
    const start = offset, tag = varint(), field = Math.floor(tag / 8), wire = tag % 8;
    let value;
    if (!field) throw new Error("invalid model field");
    if (wire === 2) {
      const size = varint();
      if (!Number.isSafeInteger(size) || size < 0 || offset + size > buffer.length) throw new Error("invalid model length");
      value = buffer.subarray(offset, offset + size);
      offset += size;
    } else if (wire === 0) value = varint();
    else if (wire === 1) offset += 8;
    else if (wire === 5) offset += 4;
    else throw new Error("unsupported model wire type");
    if (offset > buffer.length) throw new Error("truncated model field");
    result.push({ field, wire, value, raw: buffer.subarray(start, offset) });
  }
  return result;
}
function varint(value) {
  const bytes = [];
  do { const byte = value % 128; value = Math.floor(value / 128); bytes.push(byte | (value ? 128 : 0)); } while (value);
  return Buffer.from(bytes);
}
function bytes(field, value) {
  const body = Buffer.isBuffer(value) ? value : Buffer.from(String(value));
  return Buffer.concat([varint(field * 8 + 2), varint(body.length), body]);
}
function stringField(entry, number) {
  const item = fields(entry).find(item => item.field === number && item.wire === 2);
  return item ? item.value.toString("utf8") : "";
}
function modelRows(payload) {
  const rows = fields(payload).filter(item => item.field === 1 && item.wire === 2);
  if (rows.length > MAX_MODELS) throw new Error("model count exceeds limit");
  const seen = new Set();
  return rows.map(item => ({ uid: stringField(item.value, 22), label: stringField(item.value, 1), raw: item.value }))
    .filter(row => {
      if (!row.uid || row.uid.length > 256 || seen.has(row.uid)) return false;
      seen.add(row.uid);
      return true;
    });
}

function readCache(file) {
  const stat = fs.statSync(file);
  if (!stat.isFile() || stat.size > Math.ceil(MAX_BYTES * 1.5)) throw new Error("model cache exceeds limit");
  let raw = fs.readFileSync(file);
  if (raw[0] === 123) {
    const doc = JSON.parse(raw.toString("utf8"));
    if (typeof doc.payload !== "string") throw new Error("invalid model cache envelope");
    raw = Buffer.from(doc.payload, "base64");
  }
  if (raw.length > MAX_BYTES) throw new Error("model cache exceeds limit");
  return raw;
}
function latestCache(paths, minCount = 1) {
  // A smaller new snapshot can replace a large old one. Never rank by count.
  const candidates = [...new Set(paths)].map(file => {
    try { return { file, mtime: fs.statSync(file).mtimeMs }; } catch { return null; }
  }).filter(Boolean).sort((a, b) => b.mtime - a.mtime).slice(0, 32);
  for (const { file, mtime } of candidates) {
    try {
      const buf = readCache(file), count = modelRows(buf).length;
      if (count >= Math.max(1, minCount)) return { buf, modelCount: count, path: file, mtime };
    } catch {}
  }
  return null;
}

function repairSorts(primary, sortFallback = Buffer.alloc(0)) {
  const rows = modelRows(primary);
  if (!rows.length) return primary;
  const source = fields(primary);
  let sorts = source.filter(item => item.field === 2 && item.wire === 2);
  if (!sorts.length && sortFallback.length) sorts = fields(sortFallback).filter(item => item.field === 2 && item.wire === 2);
  if (!sorts.length) return primary; // Devin already falls back to the complete model list.
  const labels = new Set(rows.map(row => row.label).filter(Boolean));
  const all = sorts.find(item => stringField(item.value, 1) === "All");
  const covered = new Set();
  if (all) for (const group of fields(all.value).filter(item => item.field === 2 && item.wire === 2)) {
    for (const item of fields(group.value)) if (item.field === 2 && item.wire === 2) covered.add(item.value.toString("utf8"));
  }
  const missing = [...labels].filter(label => !covered.has(label));
  if (missing.length) {
    const group = bytes(2, Buffer.concat([bytes(1, "Available models"), ...missing.map(label => bytes(2, label))]));
    const complete = bytes(2, Buffer.concat(all ? [all.value, group] : [bytes(1, "All"), group]));
    // All must precede Recommended: the native picker chooses the first default.
    sorts = [{ raw: complete }, ...sorts.filter(item => item !== all)];
  } else if (all) sorts = [all, ...sorts.filter(item => item !== all)];
  let inserted = false;
  const output = [];
  for (const item of source) {
    if (item.field === 2 && item.wire === 2) {
      if (!inserted) { output.push(...sorts.map(item => item.raw)); inserted = true; }
    } else output.push(item.raw);
  }
  if (!inserted) output.push(...sorts.map(item => item.raw));
  const result = Buffer.concat(output);
  if (result.length > MAX_BYTES) throw new Error("repaired model catalog exceeds limit");
  return result;
}

function reconcile(primary, fallback) {
  // Successful complete upstream snapshots are authoritative, including removals.
  // Fallback supplies sorting metadata only; it cannot revive or override models.
  if (modelRows(primary).length) return repairSorts(primary, fallback);
  return fallback && fallback.length ? repairSorts(fallback) : primary;
}
function saveSnapshot(file, payload) {
  if (!modelRows(payload).length) return;
  writeDocument(file, { version: 1, payload: payload.toString("base64") });
}
function writeDocument(file, document) {
  const encoded = JSON.stringify(document);
  try { if (fs.statSync(file).size <= MAX_BYTES * 1.5 && fs.readFileSync(file, "utf8") === encoded) return; } catch {}
  fs.mkdirSync(require("node:path").dirname(file), { recursive: true });
  // One bounded file, replaced atomically. Watch the containing directory.
  const pending = file + "." + process.pid + ".tmp";
  try { fs.writeFileSync(pending, encoded); fs.renameSync(pending, file); }
  finally { try { fs.unlinkSync(pending); } catch {} }
}

function savePickerBaseline(file, accountHash, publishedHash, payload) {
  if (!modelRows(payload).length) throw new Error("empty picker baseline");
  // One bounded rollback snapshot, containing model data and hashes only.
  writeDocument(file, { version: 1, accountHash, publishedHash, payload: payload.toString("base64") });
}
function readPickerBaseline(file, accountHash, currentHash) {
  try {
    if (fs.statSync(file).size > MAX_BYTES * 1.5) return null;
    const document = JSON.parse(fs.readFileSync(file, "utf8"));
    if (document.accountHash !== accountHash || document.publishedHash !== currentHash || typeof document.payload !== "string") return null;
    const payload = Buffer.from(document.payload, "base64");
    return modelRows(payload).length ? payload : null;
  } catch { return null; }
}

module.exports = { MAX_BYTES, MAX_MODELS, fields, bytes, modelRows, readCache, latestCache, repairSorts, reconcile, saveSnapshot, savePickerBaseline, readPickerBaseline };
