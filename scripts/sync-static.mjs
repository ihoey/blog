import { cp, readdir, realpath, rm, stat } from 'node:fs/promises';
import { resolve, relative, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const git = (directory, ...args) => execFileSync('git', ['-C', directory, ...args], { encoding: 'utf8' }).trim();
const contains = (parent, child) => !relative(parent, child).startsWith('..');

export async function syncStatic(artifactDirectory, publishDirectory) {
  const artifact = await realpath(artifactDirectory);
  const publish = await realpath(publishDirectory);
  if (contains(artifact, publish) || contains(publish, artifact)) throw new Error('Artifact and publish directories must be separate.');
  if (!(await stat(join(artifact, 'index.html'))).isFile()) throw new Error('A built index.html is required.');
  if (await realpath(git(publish, 'rev-parse', '--show-toplevel')) !== publish) throw new Error('Publish directory must be a repository root.');
  if (git(publish, 'symbolic-ref', '--short', 'HEAD') !== 'master') throw new Error('Static artifacts may only be synchronized into master.');
  if (git(publish, 'status', '--porcelain')) throw new Error('Publish checkout must be clean.');

  for (const entry of await readdir(publish)) {
    if (entry !== '.git') await rm(join(publish, entry), { recursive: true, force: true });
  }
  for (const entry of await readdir(artifact)) {
    if (entry === '.git' || entry === '.prerender') continue;
    await cp(join(artifact, entry), join(publish, entry), { recursive: true });
  }
  git(publish, 'add', '--all');
  console.log('Static artifacts synchronized; Git metadata retained, stale artifacts removed.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [, , artifact, publish] = process.argv;
  if (!artifact || !publish) throw new Error('Usage: node scripts/sync-static.mjs <dist> <master-checkout>');
  await syncStatic(resolve(artifact), resolve(publish));
}
