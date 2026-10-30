import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const code = ts.transpileModule(
  readFileSync(new URL('../src/lib/site-services.ts', import.meta.url), 'utf8'),
  {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  },
).outputText;
async function fixture(hostname, response, cache = null, repeat = false) {
  const scripts = [],
    quote = { textContent: '原寄语' },
    writes = [];
  let requests = 0;
  const exports = {};
  const context = {
    exports,
    require: () => ({
      legacyPublic: {
        baiduAnalytics: 'test-id',
        googleAnalytics: 'G-TEST123456',
      },
    }),
    location: { hostname },
    window: {},
    Date,
    JSON,
    AbortSignal,
    sessionStorage: {
      getItem: () => cache,
      setItem: (...args) => writes.push(args),
    },
    document: {
      querySelector: (selector) =>
        selector === '.home-quote'
          ? quote
          : scripts.find((node) => 'blogGa4' in node.dataset),
      createElement: () => ({ dataset: {} }),
      head: { append: (node) => scripts.push(node) },
    },
    fetch: async () => {
      requests++;
      if (response instanceof Error) throw response;
      return { ok: true, json: async () => response };
    },
  };
  vm.runInNewContext(code, context);
  if (repeat) vm.runInNewContext(`(() => {${code}\n})()`, context);
  await new Promise((resolve) => setImmediate(resolve));
  return { scripts, quote, requests, writes, window: context.window };
}
test('preview never loads analytics; random quote is text and is cached without polling', async () => {
  const f = await fixture('127.0.0.1', {
    hitokoto: '<b>一句话</b>',
    from: '出处',
  });
  assert.equal(f.scripts.length, 0);
  assert.equal(f.requests, 1);
  assert.equal(f.quote.textContent, '<b>一句话</b> —— 出处');
  assert.equal(f.writes.length, 1);
});
test('quote network failure keeps the motto, fresh cached quote needs no request', async () => {
  const failed = await fixture('localhost', new Error('offline'));
  assert.equal(failed.quote.textContent, '原寄语');
  const cached = await fixture(
    'localhost',
    null,
    JSON.stringify({ hitokoto: '缓存一言', from: '', savedAt: Date.now() }),
  );
  assert.equal(cached.requests, 0);
  assert.equal(cached.quote.textContent, '缓存一言');
});
test('only production loads GA4 and Baidu; GA4 config queues a single automatic page view', async () => {
  const f = await fixture('blog.ihoey.com', {});
  assert.equal(f.scripts.length, 2);
  assert.equal(
    f.scripts[0].src,
    'https://www.googletagmanager.com/gtag/js?id=G-TEST123456',
  );
  assert.equal(f.scripts[0].async, true);
  assert.match(f.scripts[1].src, /^https:\/\/hm.baidu.com\/hm.js\?/);
  assert.deepEqual(
    Array.from(f.window.dataLayer, (args) => args[0]),
    ['js', 'config'],
  );
  assert.equal(f.window.dataLayer[1][1], 'G-TEST123456');
  assert.equal(f.quote.textContent, '原寄语');
});

test('GA4 initializes once per document; previews and unrelated hosts do not load tags', async () => {
  const production = await fixture('blog.ihoey.com', {}, null, true);
  assert.equal(
    production.scripts.filter((script) =>
      script.src.includes('googletagmanager.com'),
    ).length,
    1,
  );
  assert.equal(production.window.dataLayer.length, 2);
  for (const hostname of [
    'localhost',
    '127.0.0.1',
    'blog-preview.vercel.app',
    'other.example.com',
  ]) {
    const f = await fixture(hostname, {});
    assert.equal(f.scripts.length, 0);
    assert.equal(f.window.dataLayer, undefined);
  }
});
