import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { getPostPreview } from '../src/lib/post-preview.mjs';
const article = name => readFileSync(new URL(`../source/_posts/${name}.md`, import.meta.url), 'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');

test('WebRTC preview preserves the complete authored introduction before more, with rich formatting', async () => {
  const preview = await getPostPreview(article('getting-started-overview-webrtc'), '/webrtc.html');
  assert.equal(preview.previewSource, 'more');
  assert.match(preview.html, /<strong>WebRTC/);
  assert.match(preview.html, /<blockquote>/);
  assert.match(preview.html, /下面将分别阐述这四个步骤/);
  assert.doesNotMatch(preview.html, /信令服务器|<h[1-6]/);
});

test('code-led article shows its introduction and a bounded Dracula code preview', async () => {
  const preview = await getPostPreview(article('rust-wechat-game-ylgy'), '/rust.html');
  assert.match(preview.html, /<strong>热搜第一羊了个羊/);
  assert.match(preview.html, /astro-code dracula/);
  assert.match(preview.html, /代码预览/);
  assert.doesNotMatch(preview.html, /USER_AGENT|TOKEN|本代码仅供/);
  assert.equal(preview.codeClipped, true);
  assert.ok(preview.wordCount > 1000);
  assert.ok(preview.readingMinutes >= 1);
});

test('more in a code sample is not a delimiter and reference links remain resolvable', async () => {
  const body = '[链接][ref]\n\n```html\n<!--more-->\n```\n\n<!-- more -->\n\n后文\n\n[ref]: https://example.com';
  const preview = await getPostPreview(body, '/test.html');
  assert.match(preview.html, /href="https:\/\/example.com"/);
  assert.match(preview.html, /(?:&lt;|&#x3C;)!--more--(?:&gt;|>)/);
  assert.doesNotMatch(preview.html, /后文/);
});

test('previews exclude executable HTML, avoid duplicate heading IDs and keep Unicode text intact', async () => {
  const preview = await getPostPreview('## 标题\n\n你好 **世界**，😀。\n\n<script>alert(1)</script>\n\n<!--more-->', '/test.html');
  assert.match(preview.html, /你好 <strong>世界<\/strong>，😀/);
  assert.doesNotMatch(preview.html, /<script|alert\(1\)|id=|<h2/);
  assert.equal(preview.readingMinutes, 1);
});
