import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, access, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { syncStatic } from '../scripts/sync-static.mjs';

async function fixture(t, branch = 'master') {
  const root = await mkdtemp(join(tmpdir(), 'static-publish-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const dist = join(root, 'dist'), publish = join(root, 'publish');
  await mkdir(dist); await mkdir(publish);
  const git = (...args) => execFileSync('git', ['-C', publish, ...args], { encoding: 'utf8', stdio: 'pipe' });
  git('init', '--initial-branch=' + branch);
  await writeFile(join(publish, 'stale.html'), 'old');
  git('add', '.');
  git('-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', 'commit', '-m', 'baseline');
  await writeFile(join(dist, 'index.html'), '<h1>new</h1>');
  return { dist, publish, git };
}

test('static publication retains Git metadata and binary bytes, removes stale assets and excludes build internals', async t => {
  const { dist, publish, git } = await fixture(t);
  const binary = Buffer.from([0, 255, 128, 10]);
  await writeFile(join(dist, 'font.woff2'), binary);
  await mkdir(join(dist, '.prerender')); await writeFile(join(dist, '.prerender', 'internal.mjs'), 'internal');
  const head = git('rev-parse', 'HEAD');
  await syncStatic(dist, publish);
  assert.equal(git('rev-parse', 'HEAD'), head);
  assert.equal(await readFile(join(publish, 'index.html'), 'utf8'), '<h1>new</h1>');
  assert.deepEqual(await readFile(join(publish, 'font.woff2')), binary);
  await assert.rejects(access(join(publish, 'stale.html')));
  await assert.rejects(access(join(publish, '.prerender')));
});

test('publication rejects a source branch before touching its files', async t => {
  const { dist, publish } = await fixture(t, 'main');
  await assert.rejects(syncStatic(dist, publish), /only.*master/);
  assert.equal(await readFile(join(publish, 'stale.html'), 'utf8'), 'old');
});

test('an incomplete build cannot remove the current publication', async t => {
  const { dist, publish } = await fixture(t);
  await rm(join(dist, 'index.html'));
  await assert.rejects(syncStatic(dist, publish));
  assert.equal(await readFile(join(publish, 'stale.html'), 'utf8'), 'old');
});
