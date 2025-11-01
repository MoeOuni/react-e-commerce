#!/usr/bin/env node
/*
 Image Validation Script
 Parses src/dev-data.ts, extracts all image and detailImages URLs, then validates accessibility.
 Usage: node scripts/validate-images.js
 Output: Prints summary JSON with counts and failing URLs.
*/

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.resolve(__dirname, '../src/dev-data.ts');

function extractUrls(source) {
  // Match https://images.unsplash.com/... optionally followed by query params
  const regex = /https:\/\/images\.unsplash\.com\/[^"'\s]+/g;
  const matches = source.match(regex) || [];
  // Normalize unsplash URLs: ensure auto=format&q=80 is included for stability
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
  // Prefer fetch HEAD, fall back to GET if HEAD not allowed
  try {
    const resHead = await fetch(url, { method: 'HEAD' });
    if (resHead.ok) return { url, ok: true, status: resHead.status, method: 'HEAD' };
    // Some CDNs may not allow HEAD; try GET
    const resGet = await fetch(url, { method: 'GET' });
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
  if (failing.length > 0) {
    process.exitCode = 2;
  }
}

main();
