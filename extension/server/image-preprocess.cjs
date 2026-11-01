'use strict';

const crypto = require('node:crypto');

const MAX_IMAGE_BYTES = 32 * 1024 * 1024;
const MAX_PIXELS = 1_690_000;
const MAX_EDGE = 1568;
const MAX_TILES = 6;
const CACHE_ENTRIES = 24;
const CACHE_BYTES = 16 * 1024 * 1024;
const cache = new Map();
let cacheBytes = 0;
const runtime = require('./image-runtime.cjs');

function codec() {
  return runtime.get();
}

function imageUrl(block) {
  if (!block || block.type !== 'image_url') return '';
  return typeof block.image_url === 'string' ? block.image_url : String(block.image_url && block.image_url.url || '');
}

function dimensions(meta) {
  return { width: Number(meta.width) || 0, height: Number(meta.height) || 0 };
}

function fit(width, height) {
  return Math.min(1, MAX_EDGE / Math.max(width, height), Math.sqrt(MAX_PIXELS / (width * height)));
}

async function encode(source, options = {}) {
  let pipeline = codec()(source, { failOn: 'error', limitInputPixels: 100_000_000 }).rotate();
  if (options.extract) pipeline = pipeline.extract(options.extract);
  if (options.width || options.height) pipeline = pipeline.resize({ width: options.width, height: options.height, fit: 'inside', withoutEnlargement: true });
  return pipeline.webp({ quality: 84, effort: 3 }).toBuffer();
}

async function optimizeDataUrl(url) {
  const match = /^data:(image\/(?:png|jpeg|webp|bmp));base64,([a-z0-9+/=]+)$/i.exec(String(url || ''));
  if (!match) return { urls: [url], reason: 'unsupported-format' };
  if (match[2].length > Math.ceil(MAX_IMAGE_BYTES * 4 / 3) + 4) return { urls: [url], reason: 'image-byte-limit' };
  const source = Buffer.from(match[2], 'base64');
  if (!source.length || source.length > MAX_IMAGE_BYTES) return { urls: [url], reason: 'image-byte-limit' };
  if (!codec() && !await runtime.ensure()) return { urls: [url], reason: 'codec-unavailable-original-preserved' };
  const key = crypto.createHash('sha256').update(source).digest('hex');
  if (cache.has(key)) {
    const hit = cache.get(key);
    cache.delete(key);
    cache.set(key, hit);
    return hit;
  }
  let result = { urls: [url], reason: 'kept-original' };
  try {
    const sourceMeta = await codec()(source, { limitInputPixels: 100_000_000 }).metadata();
    const meta = dimensions(sourceMeta);
    if ([5, 6, 7, 8].includes(Number(sourceMeta.orientation))) [meta.width, meta.height] = [meta.height, meta.width];
    if (meta.width && meta.height) {
      // A small original is already cheap to transmit. Re-encoding fine
      // screenshot text merely to save a few kilobytes can reduce legibility.
      if (match[1].toLowerCase() !== 'image/bmp' && source.length <= 256 * 1024 && meta.width * meta.height <= MAX_PIXELS) {
        return { urls: [url], reason: 'small-original' };
      }
      const tall = meta.height / meta.width >= 2.7 && meta.height * meta.width > MAX_PIXELS;
      let buffers;
      if (tall) {
        const count = Math.min(MAX_TILES, Math.max(2, Math.ceil(meta.height / Math.max(meta.width, 1200))));
        const tileHeight = Math.ceil(meta.height / count);
        buffers = [];
        for (let i = 0; i < count; i += 1) {
          const top = i * tileHeight;
          const height = Math.min(tileHeight, meta.height - top);
          const scale = fit(meta.width, height);
          buffers.push(await encode(source, {
            extract: { left: 0, top, width: meta.width, height },
            width: Math.max(1, Math.round(meta.width * scale)),
            height: Math.max(1, Math.round(height * scale))
          }));
        }
      } else {
        const scale = fit(meta.width, meta.height);
        buffers = [await encode(source, scale < 1 ? {
          width: Math.max(1, Math.round(meta.width * scale)),
          height: Math.max(1, Math.round(meta.height * scale))
        } : {})];
      }
      const total = buffers.reduce((sum, buffer) => sum + buffer.length, 0);
      if (total < source.length || tall || meta.width * meta.height > MAX_PIXELS) {
        result = { urls: buffers.map(buffer => 'data:image/webp;base64,' + buffer.toString('base64')), reason: tall ? 'tiled' : 'optimized', width: meta.width, height: meta.height, inputBytes: source.length, outputBytes: total };
      }
    }
  } catch (error) {
    result = { urls: [url], reason: 'encode-failed:' + String(error && error.message || error).slice(0, 80) };
  }
  // Cache only compact results. Original data URLs are already retained by
  // the native conversation and should not be pinned a second time here.
  if ((result.reason === 'optimized' || result.reason === 'tiled') && result.outputBytes <= CACHE_BYTES) {
    cache.set(key, result);
    cacheBytes += result.outputBytes;
    while (cache.size > CACHE_ENTRIES || cacheBytes > CACHE_BYTES) {
      const oldest = cache.keys().next().value;
      cacheBytes -= cache.get(oldest).outputBytes;
      cache.delete(oldest);
    }
  }
  return result;
}

async function optimizeMessages(messages) {
  if (!Array.isArray(messages)) return { messages, changed: false, images: 0, reasons: [] };
  let changed = false;
  let images = 0;
  const reasons = [];
  const output = [];
  for (const message of messages) {
    if (!message || !Array.isArray(message.content)) { output.push(message); continue; }
    const content = [];
    for (const block of message.content) {
      const url = imageUrl(block);
      if (!url) { content.push(block); continue; }
      images += 1;
      const result = await optimizeDataUrl(url);
      reasons.push(result.reason);
      if (result.urls.length !== 1 || result.urls[0] !== url) changed = true;
      for (const nextUrl of result.urls) content.push({ ...block, image_url: { url: nextUrl } });
    }
    output.push({ ...message, content });
  }
  return { messages: changed ? output : messages, changed, images, reasons };
}

module.exports = { optimizeDataUrl, optimizeMessages, fit, codecAvailable: () => !!codec() };
