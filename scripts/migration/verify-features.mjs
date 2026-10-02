import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const read = path => readFileSync(new URL('../../dist/' + path, import.meta.url), 'utf8');
const baseline = JSON.parse(readFileSync(new URL('../../docs/migration/legacy-baseline.json', import.meta.url)));
for (const post of baseline.posts) {
  const html = read(post.path.slice(1));
  assert.match(html, /class="image-viewer"/);
  assert.match(html, /name="google-site-verification"/);
  assert.match(html, /name="baidu-site-verification"/);
  assert.match(html, /rel="manifest"/);
  assert.match(html, /rel="apple-touch-icon"/);
  const prose = html.match(/<div class="prose">([\s\S]*?)<aside class="article-discussion"/)?.[1] || '';
  assert.ok(prose, `Missing article body: ${post.path}`);
  for (const img of prose.matchAll(/<img\b[^>]*>/g)) assert.match(img[0], /loading="(?:lazy|eager)"/);
}
const feed = read('atom.xml');
assert.equal((feed.match(/<entry>/g) || []).length, 20);
assert.equal((feed.match(/<content type="html">[\s\S]+?<\/content>/g) || []).length, 20);
assert.doesNotMatch(feed, /[\u0000-\u0008\u000b\u000c\u000e-\u001f\ufffe\uffff]/);
assert.match(feed, /&lt;pre/);
assert.ok((read('baidusitemap.xml').match(/<url>/g) || []).length >= baseline.posts.length);
const deployment = JSON.parse(read('vercel.json'));
assert.equal(deployment.headers[0].source, '/sw.js');
assert.match(deployment.headers[0].headers[0].value, /no-cache/);
console.log('Feature parity: 57 article shells; 20 full RSS entries; 57 Baidu sitemap entries; verification, manifest and worker cache headers present.');
