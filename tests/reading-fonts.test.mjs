import { test } from 'node:test';
import assert from 'node:assert/strict';
import { collectFontCharacters } from '../scripts/optimize-fonts.mjs';

test('reading subsets include decoded HTML and supplementary characters, but exclude code and scripts', () => {
  const { regular, bold } = collectFontCharacters('<html><head><title>不</title></head><body><h1>标题</h1><p>文&amp;𠮷<strong>粗</strong></p><pre>码</pre><code>块</code><script>脚</script><svg><text>图</text></svg></body></html>', '动态');
  for (const character of '标题文&𠮷粗动态') assert.ok(regular.has(character.codePointAt(0)), character);
  for (const character of '标题粗动态') assert.ok(bold.has(character.codePointAt(0)), character);
  assert.ok(!bold.has('文'.codePointAt(0)));
  for (const character of '不码块脚图') assert.ok(!regular.has(character.codePointAt(0)), character);
});

test('bold inheritance covers nested headings and navigation without treating all prose as bold', () => {
  const { regular, bold } = collectFontCharacters('<nav><a><span>首</span>页</a></nav><p>正文<em>斜</em><b><span>重</span></b></p><h2><a>节</a></h2>');
  for (const character of '首页正文斜重节') assert.ok(regular.has(character.codePointAt(0)));
  for (const character of '首页重节') assert.ok(bold.has(character.codePointAt(0)));
  for (const character of '正文斜') assert.ok(!bold.has(character.codePointAt(0)));
});
