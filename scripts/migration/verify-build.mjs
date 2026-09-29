import { readFile, readdir, access, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, join } from 'node:path';
import { normalizeCommentPath, routeFile } from '../../src/lib/paths.mjs';

const root = resolve(new URL('../../', import.meta.url).pathname);
const baseline = JSON.parse(await readFile(join(root, 'docs/migration/legacy-baseline.json'), 'utf-8'));
// Explicit editorial revisions have their own hashes; keep the Hexo baseline intact.
const sourceEdits = JSON.parse(await readFile(join(root, 'docs/migration/source-edits.json'), 'utf-8'));
const errors = []; const legacyLinkWarnings = []; let headings = 0;
const decode = value => value.replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n))).replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const exists = async path => { try { await access(path); return true; } catch { return false; } };
const dist = join(root, 'dist');
const htmlFor = path => readFile(join(dist, routeFile(path)), 'utf-8');
const expected = [...baseline.posts.map(p => p.path), ...baseline.listingPaths, ...baseline.pages.map(p => p.path), '/', '/404.html'];
for (const path of expected) if (!await exists(join(dist, routeFile(path)))) errors.push(`Missing old route: ${path}`);
for (const post of baseline.posts) {
  const source = await readFile(join(root, post.source));
  const expectedHash = sourceEdits.find(edit => edit.source === post.source)?.sha256 ?? post.sha256;
  if (createHash('sha256').update(source).digest('hex') !== expectedHash) errors.push(`Article source changed: ${post.source}`);
  if (!await exists(join(dist, post.path))) continue;
  const html = await htmlFor(post.path);
  if (!html.includes(`href="${baseline.site}${post.path}"`)) errors.push(`Wrong canonical: ${post.path}`);
  if (!html.includes(`datetime="${new Date(post.date).toISOString()}"`)) errors.push(`Wrong date: ${post.path}`);
  if (!html.includes(`data-comment-path="${normalizeCommentPath(post.path)}"`)) errors.push(`Wrong Hitalk path: ${post.path}`);
  const ids = new Set([...html.matchAll(/\bid="([^"]*)"/g)].map(m => decode(m[1])));
  for (const id of post.headingIds.filter(Boolean)) {
    headings++;
    if (!ids.has(id)) errors.push(`Missing heading ${id} in ${post.path}`);
  }
}
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]))).flat();
}
const files = (await walk(dist)).filter(f => f.endsWith('.html'));
for (const file of files) {
  const html = await readFile(file, 'utf-8');
  const pagePath = '/' + file.slice(dist.length + 1);
  if ((html.match(/data-global-companion(?:[\s=>])/g) || []).length !== 1) errors.push(`Expected exactly one global Eevee: ${pagePath}`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const href = decode(match[1]);
    if (/^(mailto:|tel:|javascript:|data:)/.test(href)) continue;
    let url;
    try { url = new URL(href, baseline.site + pagePath); } catch { continue; }
    if (url.origin !== baseline.site) continue;
    const path = decodeURIComponent(url.pathname);
    let target = join(dist, routeFile(path));
    if (!await exists(target) && !path.endsWith('.html')) target = join(dist, path, 'index.html');
    if (!await exists(target)) {
      const warning = `${pagePath} -> ${path}`;
      // Inline code samples are escaped; these are actual document links.
      legacyLinkWarnings.push(warning);
    }
    if (url.hash && (path === pagePath || path === pagePath.replace(/index\.html$/, ''))) {
      const ids = new Set([...html.matchAll(/\bid="([^"]*)"/g)].map(m => decode(m[1])));
      if (!ids.has(decodeURIComponent(url.hash.slice(1)))) errors.push(`Broken local fragment: ${pagePath}${url.hash}`);
    }
  }
}
for (const path of ['/atom.xml', '/sitemap.xml', '/robots.txt', '/sw.js', '/favicon.ico']) {
  if (!await exists(join(dist, path))) errors.push(`Missing public file: ${path}`);
}
const wildfire = baseline.posts.find(p => p.id === 'Hexo-NexT-Wildfire');
const wildfireText = decode((await htmlFor(wildfire.path)).replace(/<[^>]*>/g, ''));
if (!wildfireText.includes('{% if page.comments %}')) errors.push('Swig tutorial code was not preserved as text');
const dragDemo = baseline.posts.find(p => p.id === 'use-javascript-to-achieve-simple-drag-and-drop');
const demoHTML = await htmlFor(dragDemo.path);
if (demoHTML.includes('<iframe') || !demoHTML.includes('legacy-embed')) errors.push('Unavailable demo must have a readable fallback');
const manifest = JSON.parse(await readFile(join(root, 'static/lib/hitalk/3.0.0/manifest.json'), 'utf-8'));
for (const asset of [...Object.values(manifest.assets), ...Object.values(manifest.extras)]) {
  const bytes = await readFile(join(dist, asset.path));
  if (createHash('sha256').update(bytes).digest('hex') !== asset.sha256) errors.push(`Hitalk asset differs from its source manifest: ${asset.path}`);
}
const report = { articles: baseline.posts.length, htmlPages: files.length, checkedLegacyRoutes: new Set(expected).size, checkedLegacyHeadingIds: headings, errors, internalLinkWarnings: [...new Set(legacyLinkWarnings)] };
await mkdir(join(root, 'work'), { recursive: true });
await writeFile(join(root, 'work/migration-verification.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
if (errors.length || legacyLinkWarnings.length) process.exitCode = 1;
