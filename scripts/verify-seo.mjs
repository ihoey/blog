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
const xmlText = (xml, tag) =>
  xml
    .match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))?.[1]
    .replaceAll('&amp;', '&');
const sitemapDates = [sitemap, baidu].map(
  (xml) =>
    new Map(
      [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, entry]) => [
        xmlText(entry, 'loc'),
        xmlText(entry, 'lastmod'),
      ]),
    ),
);
const entries = [...feed.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(
  (match) => match[1],
);
let pages = 0;
let articles = 0;
for (const path of (await files()).filter((path) => path.endsWith('.html'))) {
  const html = await read(path);
  // Ownership verification files are plain text, not site pages.
  if (!/<html(?:\s|>)/i.test(html)) continue;
  const all = nodes(parse(html));
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
  assert.ok(canonical, `Missing canonical: ${path}`);
  pages++;
  assert.equal(new URL(canonical).origin, 'https://blog.ihoey.com');
  assert.equal(meta('og:url'), canonical);
  assert.ok(meta('description')?.trim(), `Empty description: ${path}`);
  assert.equal(meta('description'), meta('og:description'));
  assert.equal(meta('description'), meta('twitter:description'));
  const scripts = all.filter(
    (n) => n.tagName === 'script' && attr(n, 'type') === 'application/ld+json',
  );
  if (/^(400|404)\.html$/.test(path)) {
    assert.equal(meta('robots'), 'noindex, follow');
    assert.ok(!sitemap.includes(canonical));
    continue;
  }
  const data = scripts.flatMap((script) => {
    const value = JSON.parse(
      script.childNodes.map((n) => n.value || '').join(''),
    );
    return value['@graph'] || (Array.isArray(value) ? value : [value]);
  });
  if (new URL(canonical).pathname === '/') {
    assert.ok(
      data.some((n) => n['@type'] === 'WebSite'),
      'Missing site identity on homepage',
    );
  }
  if (!new URL(canonical).pathname.startsWith('/posts/')) continue;
  const article = data.find((n) => n['@type'] === 'BlogPosting');
  assert.ok(article, `Missing article metadata: ${path}`);
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
  for (const dates of sitemapDates) {
    assert.equal(
      dates.get(canonical),
      article.dateModified,
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
assert.ok(articles > 0);
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
