import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { dateInShanghai, localDay, articlePath, normalizeCommentPath } from '../src/lib/paths.mjs';
const baseline = JSON.parse(readFileSync(new URL('../docs/migration/legacy-baseline.json', import.meta.url)));

test('all 57 existing article paths match the old Hexo output, including case and nested category', () => {
  assert.equal(baseline.posts.length, 57);
  for (const post of baseline.posts) {
    assert.equal(articlePath(post.id, post.categories, new Date(post.date)), post.path);
  }
});

test('local publication dates stay in Shanghai even around the UTC day boundary', () => {
  const local = dateInShanghai('2019-2-18 00:15:00');
  assert.equal(local.toISOString(), '2019-02-17T16:15:00.000Z');
  assert.equal(localDay(local), '2019-02-18');
  assert.equal(localDay(dateInShanghai('2019-02-17T16:15:00Z')), '2019-02-18');
  assert.throws(() => dateInShanghai('2026-02-30'));
  assert.throws(() => dateInShanghai('2026-01-01 25:00:00'));
  assert.throws(() => dateInShanghai(new Date()), /quoted strings/);
});

test('Hitalk identities keep article html suffixes and normalize index aliases only', () => {
  assert.equal(normalizeCommentPath('/guestbook/index.html?preview=1#comments'), '/guestbook/');
  assert.equal(normalizeCommentPath('/guestbook/'), '/guestbook/');
  assert.equal(normalizeCommentPath('https://blog.ihoey.com/about/index.html'), '/about/');
  for (const post of baseline.posts) assert.equal(normalizeCommentPath(post.path), encodeURI(post.path));
});

test('worker retirement deletes only Hexo cache names, claims clients, and unregisters', async () => {
  const listeners = {}; const actions = []; let pending;
  vm.runInNewContext(readFileSync(new URL('../static/sw.js', import.meta.url), 'utf-8'), {
    self: {
      addEventListener: (name, fn) => { listeners[name] = fn; },
      skipWaiting: () => actions.push('skip'),
      clients: { claim: async () => actions.push('claim') },
      registration: { unregister: async () => actions.push('unregister') },
    },
    caches: { keys: async () => ['bs-0-0-7', 'api-0-0-3', 'unrelated-cache'], delete: async key => actions.push(key) },
  });
  listeners.install();
  listeners.activate({ waitUntil: p => { pending = p; } });
  await pending;
  assert.deepEqual(actions, ['skip', 'bs-0-0-7', 'api-0-0-3', 'claim', 'unregister']);
  assert.equal(listeners.fetch, undefined);
});
