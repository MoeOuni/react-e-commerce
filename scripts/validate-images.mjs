#!/usr/bin/env node
/**
 * Image Validation Script (ESM)
 * Parses src/dev-data.ts, extracts Unsplash URLs, normalizes them, and validates accessibility.
 * Usage: npm run validate:images
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, '../src/dev-data.ts');

function extractUrls(source) {
  const regex = /https:\/\/images\.unsplash\.com\/[^"'\s]+/g;
  const matches = source.match(regex) || [];
  const normalized = matches.map(u => {
    if (!u.includes('auto=format')) {
      const joiner = u.includes('?') ? '&' : '?';
      return u + joiner + 'auto=format&q=80';
    }
    return u;
  });
  return Array.from(new Set(normalized));
}

async function headOrGet(url) {
  try {
    const resHead = await fetch(url, { method: 'HEAD' });
    if (resHead.ok) return { url, ok: true, status: resHead.status, method: 'HEAD' };
    const resGet = await fetch(url); // GET
    return { url, ok: resGet.ok, status: resGet.status, method: 'GET' };
  } catch (e) {
    return { url, ok: false, status: 0, error: e.message };
  }
}

async function validate(urls, concurrency = 5) {
  const results = [];
  let index = 0;
  async function worker() {
    while (index < urls.length) {
      const current = urls[index++];
      const result = await headOrGet(current);
      results.push(result);
      process.stdout.write(`Checked ${results.length}/${urls.length}\r`);
    }
  }
  const workers = Array.from({ length: Math.min(concurrency, urls.length) }, () => worker());
  await Promise.all(workers);
  return results;
}

async function main() {
  if (!fs.existsSync(DATA_FILE)) {
    console.error('Data file not found:', DATA_FILE);
    process.exit(1);
  }
  const source = fs.readFileSync(DATA_FILE, 'utf8');
  const urls = extractUrls(source);
  console.log(`Found ${urls.length} unique Unsplash URLs.`);
  const results = await validate(urls);
  const failing = results.filter(r => !r.ok);
  const summary = {
    total: urls.length,
    passed: results.length - failing.length,
    failed: failing.length,
    failures: failing
  };
  console.log('\nValidation Summary:\n');
  console.log(JSON.stringify(summary, null, 2));
  if (failing.length > 0) process.exitCode = 2;
}

main();
