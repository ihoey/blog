import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
import { readingCompatibility, absoluteFeedHTML, escapeXML } from '../src/lib/reading-compatibility.mjs';

test('RSS content keeps its HTML but resolves relative images and removes XML control characters', () => {
  const html = '<p>原文\b <strong>加粗</strong></p><img src="/avatar.png"><a href="#章节">章节</a>';
  const full = absoluteFeedHTML(html, '/posts/Linux/example.html');
  assert.match(full, /src="https:\/\/blog.ihoey.com\/avatar.png"/);
  assert.match(full, /example.html#%E7%AB%A0%E8%8A%82/);
  assert.match(escapeXML(full), /&lt;strong&gt;加粗/);
  assert.equal(escapeXML(full).includes('\b'), false);
});

test('legacy images become lazy without altering an authored loading choice or code samples', () => {
  const tree = { children: [
    { tagName: 'img', properties: { src: '/photo.png' } },
    { tagName: 'img', properties: { src: '/cover.png', loading: 'eager' } },
    { type: 'raw', value: '<img src="/raw.png" /><a href="https://example.com" rel="nofollow">外链</a>' },
    { type: 'text', value: '<img src="/code.png">' },
    { tagName: 'a', properties: { href: 'https://example.com/', rel: ['author'] } },
    { tagName: 'a', properties: { href: '/about/' } },
  ] };
  readingCompatibility()(tree);
  assert.equal(tree.children[0].properties.loading, 'lazy');
  assert.equal(tree.children[1].properties.loading, 'eager');
  assert.match(tree.children[2].value, /loading="lazy"/);
  assert.match(tree.children[2].value, /rel="nofollow noopener noreferrer"/);
  assert.match(tree.children[2].value, /target="_blank"/);
  assert.equal(tree.children[3].value, '<img src="/code.png">');
  assert.deepEqual(tree.children[4].properties.rel, ['author', 'noopener', 'noreferrer']);
  assert.equal(tree.children[5].properties.target, undefined);
});

test('copy attribution is reserved for long selections and retains canonical article identity', () => {
  const exports = {};
  const code = ts.transpileModule(readFileSync(new URL('../src/lib/copy-attribution.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  vm.runInNewContext(code, { exports });
  assert.equal(exports.copyAttribution('短句', '/'), '');
  const attribution = exports.copyAttribution('文章内容'.repeat(22), 'https://blog.ihoey.com/posts/Linux/example.html');
  assert.match(attribution, /作者：Ihoey/);
  assert.match(attribution, /posts\/Linux\/example.html/);
});
