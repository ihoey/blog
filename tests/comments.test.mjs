import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const compiled = ts.transpileModule(readFileSync(new URL('../src/lib/comments.ts', import.meta.url), 'utf-8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function fixture(hostname, sdk, observer) {
  const children = []; const scripts = []; const exports = {};
  const element = { dataset: { commentPath: '/guestbook/', commentTitle: '留言板' }, replaceChildren: (...nodes) => { children.splice(0, children.length, ...nodes); } };
  vm.runInNewContext(compiled, {
    exports, location: { hostname }, window: { Hitalk: sdk }, IntersectionObserver: observer,
    document: { querySelector: () => element, createElement: () => ({ setAttribute() {} }), head: { append: script => scripts.push(script) } },
  });
  return { exports, element, children, scripts };
}

test('local preview never loads or mounts a production write-capable SDK', async () => {
  let calls = 0;
  const f = fixture('127.0.0.1', { mount() { calls++; } });
  await f.exports.mountComments();
  assert.equal(calls, 0); assert.equal(f.scripts.length, 0);
  assert.match(f.children[0].textContent, /本地预览/);
});

test('production mounting passes the existing page identity to Hitalk without a write', async () => {
  let args;
  const f = fixture('blog.ihoey.com', { mount: (...values) => { args = values; } });
  await f.exports.mountComments();
  assert.equal(args[0], f.element);
  assert.equal(args[1].path, '/guestbook/');
  assert.equal(args[1].title, '留言板');
  assert.equal(args[1].server, 'https://hitalk-next-api.ihoey.com/api');
});

test('SDK failures leave readable fallback content', async () => {
  const f = fixture('blog.ihoey.com', { mount() { throw new Error('test error'); } });
  await f.exports.mountComments();
  assert.match(f.children[0].textContent, /暂时无法加载/);
});

test('production discussion waits for the viewport and disconnects before mounting', () => {
  let callback, observed, disconnected = 0, calls = 0;
  const f = fixture('blog.ihoey.com', { mount() { calls++; } }, class {
    constructor(run, options) { callback = run; assert.equal(options.rootMargin, '300px'); }
    observe(element) { observed = element; }
    disconnect() { disconnected++; }
  });
  f.exports.mountCommentsWhenVisible();
  assert.equal(observed, f.element); assert.equal(calls, 0);
  callback([{ isIntersecting: false }]); assert.equal(calls, 0);
  callback([{ isIntersecting: true }]); assert.equal(disconnected, 1);
  return new Promise(resolve => setImmediate(() => { assert.equal(calls, 1); resolve(); }));
});

test('browsers without IntersectionObserver still mount the discussion', async () => {
  let calls = 0;
  const f = fixture('blog.ihoey.com', { mount() { calls++; } });
  f.exports.mountCommentsWhenVisible();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(calls, 1);
});
