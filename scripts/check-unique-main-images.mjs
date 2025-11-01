#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.resolve(__dirname, '../src/dev-data.ts');

const source = fs.readFileSync(DATA_FILE, 'utf8');
// naive parse of product objects for image field
const productRegex = /{\s*id:\s*(\d+)[\s\S]*?image:\s*"(https:\/\/images\.unsplash\.com\/[^"\n]+)"[\s\S]*?category:/g;
const images = [];
let match;
while ((match = productRegex.exec(source)) !== null) {
  images.push({ id: Number(match[1]), url: match[2] });
}
const urlMap = images.reduce((acc, p) => {
  acc[p.url] = acc[p.url] || [];
  acc[p.url].push(p.id);
  return acc;
}, {});
const duplicates = Object.entries(urlMap).filter(([_, ids]) => ids.length > 1);
if (duplicates.length === 0) {
  console.log('All product.image URLs are unique. Count:', images.length);
} else {
  console.log('Found duplicates:');
  console.log(JSON.stringify(duplicates, null, 2));
  process.exitCode = 1;
}
