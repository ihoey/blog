import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { parse } from 'parse5';

const root = new URL('../dist/', import.meta.url);
const read = async (path) => readFile(new URL(path, root), 'utf8');
async function files(dir = '') {
  const entries = await readdir(new URL(dir, root), { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((entry) =>
        entry.isDirectory()
          ? files(`${dir}${entry.name}/`)
          : [`${dir}${entry.name}`],
      ),
    )
  ).flat();
}
function nodes(node) {
  return [node, ...(node.childNodes || []).flatMap(nodes)];
}
const sitemap = await read('sitemap.xml');
const baidu = await read('baidusitemap.xml');
const feed = await read('atom.xml');
const entries = [...feed.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(
  (match) => match[1],
);
let pages = 0;
let articles = 0;
for (const path of (await files()).filter((path) => path.endsWith('.html'))) {
  const all = nodes(parse(await read(path)));
  const attr = (node, name) => node.attrs?.find((a) => a.name === name)?.value;
  const meta = (name) =>
    attr(
      all.find(
        (n) =>
          n.tagName === 'meta' &&
          (attr(n, 'name') === name || attr(n, 'property') === name),
      ) || {},
      'content',
    );
  const canonical = attr(
    all.find((n) => n.tagName === 'link' && attr(n, 'rel') === 'canonical') ||
      {},
    'href',
  );
  if (!canonical) {
    assert.equal(path, 'baidu_verify_HR5eYsvhwq.html');
    continue;
  }
  pages++;
  assert.equal(new URL(canonical).origin, 'https://blog.ihoey.com');
  assert.equal(meta('og:url'), canonical);
  assert.ok(meta('description')?.trim(), `Empty description: ${path}`);
  assert.equal(meta('description'), meta('og:description'));
  assert.equal(meta('description'), meta('twitter:description'));
  const script = all.find(
    (n) => n.tagName === 'script' && attr(n, 'type') === 'application/ld+json',
  );
  if (/^(400|404)\.html$/.test(path)) {
    assert.equal(meta('robots'), 'noindex, follow');
    assert.equal(script, undefined);
    assert.ok(!sitemap.includes(canonical));
    continue;
  }
  assert.equal(meta('robots'), undefined);
  const graph = JSON.parse(
    script.childNodes.map((n) => n.value || '').join(''),
  )['@graph'];
  assert.ok(graph.some((n) => n['@type'] === 'WebSite'));
  const article = graph.find((n) => n['@type'] === 'BlogPosting');
  if (!article) continue;
  articles++;
  assert.equal(article.description, meta('description'));
  assert.equal(article.datePublished, meta('article:published_time'));
  assert.equal(article.dateModified, meta('article:modified_time'));
  for (const date of new Set([article.datePublished, article.dateModified])) {
    assert.ok(
      all.some((n) => n.tagName === 'time' && attr(n, 'datetime') === date),
      `Missing visible date ${path}: ${date}`,
    );
  }
  for (const xml of [sitemap, baidu]) {
    assert.ok(
      xml.includes(
        `<loc>${canonical}</loc><lastmod>${article.dateModified}</lastmod>`,
      ),
      `Sitemap date drift: ${path}`,
    );
  }
  const entry = entries.find((entry) =>
    entry.includes(`<id>${canonical}</id>`),
  );
  if (entry) {
    assert.ok(
      entry.includes(`<published>${article.datePublished}</published>`),
    );
    assert.ok(entry.includes(`<updated>${article.dateModified}</updated>`));
  }
}
assert.ok(articles >= 57);
assert.ok(pages >= 183);
const deployment = JSON.parse(await read('vercel.json'));
assert.equal(
  deployment.headers
    .find((rule) => rule.source === '/atom.xml')
    .headers.find((header) => header.key === 'Content-Type').value,
  'application/atom+xml; charset=utf-8',
);
console.log(
  `SEO: ${pages} pages, ${articles} articles; canonical / descriptions / graph / visible dates / feed / sitemaps consistent; error pages noindex.`,
);
