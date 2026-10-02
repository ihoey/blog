import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Font, woff2 } from 'fonteditor-core';
import { collectFontCharacters } from '../optimize-fonts.mjs';

const dist = fileURLToPath(new URL('../../dist/', import.meta.url));
await woff2.init();
const originals = new Map([[400, new Map()], [700, new Map()]]);
const fallbackNames = readdirSync(join(dist, '_astro')).filter(name => name.startsWith('reading-fallback.'));
assert.equal(fallbackNames.length, 1, 'Repeated builds must not retain stale fallback stylesheets.');
const [fallbackName] = fallbackNames;
assert.ok(fallbackName, 'Complete fonts must remain available for dynamic text.');
const fallback = readFileSync(join(dist, '_astro', fallbackName), 'utf8');
const faces = [...fallback.matchAll(/@font-face\{[^}]*\}/g)].map(match => match[0]);
assert.equal(faces.length, new Set(faces).size, 'Repeated builds must not duplicate font-face declarations.');
function glyphs(path) {
  const font = Font.create(readFileSync(join(dist, path.slice(1))), { type: 'woff2', compound2simple: true }).get();
  const map = new Map();
  for (const glyph of font.glyf) for (const point of glyph.unicode || []) map.set(point, glyph);
  return map;
}
for (const match of fallback.matchAll(/@font-face\{[^}]*\}/g)) {
  const weight = Number(match[0].match(/font-weight:(\d+)/)[1]);
  const url = match[0].match(/src:url\(([^)]+)\)/)[1];
  for (const [point, glyph] of glyphs(url)) originals.get(weight).set(point, glyph);
}
function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory()
    ? htmlFiles(join(directory, entry.name)) : entry.name.endsWith('.html') ? [join(directory, entry.name)] : []);
}
const generated = new Map();
let pages = 0, checked = 0;
for (const path of htmlFiles(dist)) {
  const html = readFileSync(path, 'utf8');
  // Search-engine ownership verification is a plain-text .html file, not a page.
  if (!html.includes('<html')) continue;
  const characters = collectFontCharacters(html);
  const matches = [...html.matchAll(/src:url\((\/_astro\/reading-(400|700)\.[^)]+)\)/g)];
  assert.equal(matches.length, 2, `Missing page subsets in ${path}`);
  assert.ok(html.includes('media="print" onload="this.media=\'all\'"'), `Fallback CSS must not block rendering: ${path}`);
  for (const match of matches) {
    const weight = Number(match[2]);
    let subset = generated.get(match[1]);
    if (!subset) {
      subset = glyphs(match[1]);
      for (const [point, glyph] of subset) {
        const before = originals.get(weight).get(point);
        if (!before) continue;
        assert.equal(glyph.advanceWidth, before.advanceWidth, `Changed width for U+${point.toString(16)}`);
        assert.deepEqual(glyph.contours, before.contours, `Changed outline for U+${point.toString(16)}`);
        checked++;
      }
      generated.set(match[1], subset);
    }
    for (const point of weight === 400 ? characters.regular : characters.bold) {
      if (originals.get(weight).has(point)) assert.ok(subset.has(point), `Missing U+${point.toString(16)} in ${path}`);
    }
  }
  pages++;
}
console.log(`Reading fonts verified: ${pages} pages; ${generated.size} subsets; ${checked} glyph outlines and advance widths match upstream.`);
