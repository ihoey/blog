import { createHash } from 'node:crypto';
import { readFile, writeFile, readdir, unlink, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, relative, basename } from 'node:path';
import { parse } from 'parse5';
import { Font, woff2 } from 'fonteditor-core';

const root = fileURLToPath(new URL('../', import.meta.url));
const digest = value => createHash('sha256').update(value).digest('hex').slice(0, 16);
const points = text => new Set([...text].map(character => character.codePointAt(0)));
const boldTags = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'b', 'th', 'nav', 'aside', 'button', 'footer']);
const skippedTags = new Set(['script', 'style', 'pre', 'code', 'svg', 'head']);
const generatedAsset = /^reading-(?:layout\.[a-f0-9]{16}\.css|fallback\.[a-f0-9]{16}\.css|(?:400|700)\.[a-f0-9]{16}\.woff2)$/;

// Parse rendered HTML, not Markdown: entities and legacy HTML must retain their glyphs.
// Code keeps its existing monospace font and must not inflate reading-font subsets.
export function collectFontCharacters(html, dynamicText = '') {
  let regular = dynamicText, bold = dynamicText;
  function visit(node, heavy = false) {
    if (skippedTags.has(node.tagName)) return;
    heavy ||= boldTags.has(node.tagName);
    if (node.nodeName === '#text') {
      regular += node.value;
      if (heavy) bold += node.value;
    }
    for (const child of node.childNodes || []) visit(child, heavy);
  }
  visit(parse(html));
  return { regular: points(regular), bold: points(bold) };
}

async function files(directory, extension) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await files(path, extension));
    else if (entry.name.endsWith(extension)) result.push(path);
  }
  return result.sort();
}

export async function optimizeFonts(dist = join(root, 'dist')) {
  await woff2.init();
  const sources = [], rewrites = [], fontFaces = [];
  for (const path of await files(join(dist, '_astro'), '.css')) {
    // Astro can retain generated assets between builds. Never treat our fallback
    // as a new source stylesheet or duplicate its font-face declarations.
    if (generatedAsset.test(basename(path))) continue;
    const css = await readFile(path, 'utf8');
    const faces = [...css.matchAll(/@font-face\{[^}]*\}/g)].map(match => match[0]).filter(face => /font-family:["']?LXGW WenKai/.test(face));
    if (!faces.length) continue;
    fontFaces.push(...faces);
    let criticalCSS = css;
    for (const face of faces) {
      criticalCSS = criticalCSS.replace(face, '');
      const url = face.match(/src:url\(["']?([^"')]+)["']?\)/)?.[1];
      const weight = Number(face.match(/font-weight:(\d+)/)?.[1]);
      if (!url?.startsWith('/_astro/') || ![400, 700].includes(weight)) throw new Error(`Unexpected font source: ${face}`);
      sources.push({ url, weight });
    }
    const url = `/_astro/reading-layout.${digest(criticalCSS)}.css`;
    await writeFile(join(dist, url.slice(1)), criticalCSS);
    rewrites.push({ old: '/' + relative(dist, path).replaceAll('\\', '/'), url, path });
  }
  if (!fontFaces.length) throw new Error('Reading fonts were not emitted; run this step after a fresh Astro build.');

  // Keep the original unicode-range fonts for arbitrary comments and random quotes.
  // A different first-choice family covers authored content; fallback shards are
  // requested only for characters absent from that page's two compact subsets.
  const fallbackCSS = fontFaces.join('');
  const fallbackURL = `/_astro/reading-fallback.${digest(fallbackCSS)}.css`;
  await writeFile(join(dist, fallbackURL.slice(1)), fallbackCSS);
  const families = new Map();
  for (const { url, weight } of sources) {
    const font = Font.create(await readFile(join(dist, url.slice(1))), { type: 'woff2', compound2simple: true }).get();
    let family = families.get(weight);
    if (!family) families.set(weight, family = { template: font, glyphs: new Map() });
    for (const glyph of font.glyf) for (const point of glyph.unicode || []) family.glyphs.set(point, glyph);
  }
  const dynamicSources = await files(join(root, 'src/lib'), '.ts');
  const dynamicText = ' ' + Array.from({ length: 95 }, (_, index) => String.fromCharCode(32 + index)).join('')
    + (await Promise.all(dynamicSources.map(path => readFile(path, 'utf8')))).join('').replace(/[^\p{Script=Han}，。！？、：；「」『』（）…—～↗←→♥]/gu, '');
  const cache = new Map(), report = [];
  let cachedCount = 0;
  const cacheDirectory = join(root, '.astro/reading-font-cache');
  await mkdir(cacheDirectory, { recursive: true });
  const sourceKey = digest((await readFile(fileURLToPath(import.meta.url), 'utf8')) + fallbackCSS);
  async function subset(weight, requested) {
    const family = families.get(weight);
    const characters = [...requested].filter(point => family.glyphs.has(point)).sort((a, b) => a - b);
    const key = `${weight}:${characters.join(',')}`;
    if (cache.has(key)) return cache.get(key);
    const cachedPath = join(cacheDirectory, `${sourceKey}-${digest(key)}.woff2`);
    let output;
    try { output = await readFile(cachedPath); cachedCount++; }
    catch (error) {
      if (error.code !== 'ENOENT') throw error;
      const glyphs = [...new Set(characters.map(point => family.glyphs.get(point)))];
      const ttf = structuredClone({ ...family.template, glyf: [family.template.glyf[0], ...glyphs] });
      // Subsets have their own internal name; original typeface and license stay intact.
      Object.assign(ttf.name, { fontFamily: 'WenKai Blog Subset', fullName: `WenKai Blog Subset ${weight}`, postScriptName: `WenKaiBlogSubset-${weight}` });
      output = Font.create(ttf).write({ type: 'woff2' });
      await writeFile(cachedPath, output);
    }
    const url = `/_astro/reading-${weight}.${digest(output)}.woff2`;
    await writeFile(join(dist, url.slice(1)), output);
    const face = `@font-face{font-family:"LXGW WenKai Page";font-style:normal;font-weight:${weight};font-display:swap;src:url(${url}) format("woff2")}`;
    const result = { face, url, bytes: output.length, characters: characters.length };
    cache.set(key, result);
    return result;
  }
  for (const path of await files(dist, '.html')) {
    let html = await readFile(path, 'utf8');
    if (!rewrites.some(({ old }) => html.includes(old))) continue;
    const characters = collectFontCharacters(html, dynamicText);
    const regular = await subset(400, characters.regular), bold = await subset(700, characters.bold);
    for (const { old, url } of rewrites) html = html.replaceAll(old, url);
    const fonts = `<style data-reading-fonts>${regular.face}${bold.face}</style>`;
    const fallback = `<link rel="stylesheet" href="${fallbackURL}" media="print" onload="this.media='all'"><noscript><link rel="stylesheet" href="${fallbackURL}"></noscript>`;
    html = html.replace('</head>', fonts + fallback + '</head>');
    await writeFile(path, html);
    report.push({ page: relative(dist, path), regular, bold, bytes: regular.bytes + bold.bytes });
  }
  // Remove obsolete CSS only after all page references point at the new content hash.
  for (const { path } of rewrites) await unlink(path);
  const retained = new Set([fallbackURL, ...rewrites.map(({ url }) => url), ...[...cache.values()].map(({ url }) => url)]);
  for (const name of await readdir(join(dist, '_astro'))) {
    if (generatedAsset.test(name) && !retained.has(`/_astro/${name}`)) await unlink(join(dist, '_astro', name));
  }
  const home = report.find(page => page.page === 'index.html');
  console.log(`Reading fonts: ${report.length} pages; ${cache.size} reusable subsets (${cachedCount} cached); homepage ${home?.bytes.toLocaleString()} B in two files.`);
  return report;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await optimizeFonts();
