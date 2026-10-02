import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import manifest from '../src/data/optimized-images.json' with { type: 'json' };
import { readingCompatibility } from '../src/lib/reading-compatibility.mjs';
import { optimizeImageProperties, optimizeImageTag } from '../src/lib/optimized-images.mjs';

test('converted images exist, are WebP, and are smaller than the original', () => {
  assert.ok(manifest.articles.length > 0);
  for (const image of manifest.articles) {
    const bytes = readFileSync(new URL('../static' + image.src, import.meta.url));
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
    assert.equal(bytes.length, image.webpBytes);
    assert.ok(bytes.length < image.originalBytes);
    assert.ok(image.width > 0 && image.height > 0);
  }
});

test('article images use local WebP while retaining original full-size URLs', () => {
  const image = manifest.articles[0];
  const original = image.original.replace('%7C', '|');
  const props = optimizeImageProperties({ src: original, alt: '截图', loading: 'eager' });
  assert.equal(props.src, image.src);
  assert.equal(props['data-original-src'], original);
  assert.equal(props.width, image.width);
  assert.equal(props.loading, 'eager');
  assert.equal(optimizeImageProperties({src:original,width:300}).height, undefined);
  assert.equal(optimizeImageProperties({src:original,srcSet:'custom.webp 2x'}).src, original);
  for (const src of ['/qcode/alipay_qcode.png','https://example.com/photo.png','https://cdn.ihoey.com/unconverted.gif']) {
    assert.deepEqual(optimizeImageProperties({src}), {src});
  }
});

test('raw HTML and Markdown images optimize, but escaped image examples do not', () => {
  const image = manifest.articles[0];
  const original = image.original;
  const raw = `<img src='${original}' alt="例子" />`;
  const tree = {children:[{tagName:'img',properties:{src:original}},{type:'raw',value:raw},{type:'text',value:raw}]};
  readingCompatibility()(tree);
  assert.equal(tree.children[0].properties.src,image.src);
  assert.ok(tree.children[1].value.includes(`src="${image.src}"`));
  assert.ok(tree.children[1].value.includes(`data-original-src='${original}'`));
  assert.ok(tree.children[1].value.includes('loading="lazy"'));
  assert.equal(tree.children[2].value,raw);
  assert.equal(optimizeImageTag(tree.children[1].value),tree.children[1].value);
});
