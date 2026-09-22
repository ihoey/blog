import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
const baseline = JSON.parse(readFileSync(new URL('../../docs/migration/legacy-baseline.json', import.meta.url)));

// Keep fragment identifiers from the Hexo HTML, including its casing and Chinese text.
// The remaining headings use Astro's standard identifiers for newly written content.
export function legacyHeadings() {
  return (tree, file) => {
    const entry = baseline.posts.find(p => p.id === basename(file.path || '', '.md'));
    if (!entry) return;
    let index = 0;
    function visit(node) {
      if (node.type === 'raw' && node.value.includes('//fiddle.jshell.net/Lr73mn89/show/light/')) {
        node.value = node.value.replace(/<iframe\b[^>]*src="\/\/fiddle\.jshell\.net\/Lr73mn89\/show\/light\/"[^>]*>[\s\S]*?<\/iframe>/g,
          '<div class="legacy-embed"><p>原文的在线演示暂时无法访问，示例代码仍可在本文中阅读。</p><a href="https://fiddle.jshell.net/Lr73mn89/show/light/" target="_blank" rel="noopener noreferrer">查看原演示地址 ↗</a></div>');
      }
      // This link was already broken in the original Markdown. Fix its rendered
      // destination while keeping the archived article source byte-for-byte.
      if (entry.id === 'Node-part2' && node.tagName === 'a' && node.properties?.href === 'dash') {
        node.properties.href = 'https://kapeli.com/dash';
      }
      if (node.tagName === 'img' && String(node.properties?.src).startsWith('https://badge.juejin.im/')) {
        node.type = 'text'; node.value = '在掘金阅读原文';
        delete node.tagName; delete node.properties; delete node.children;
      }
      if (node.tagName === 'iframe' && node.properties?.src === '//fiddle.jshell.net/Lr73mn89/show/light/') {
        node.tagName = 'div'; node.properties = { className: ['legacy-embed'] };
        node.children = [{ type: 'element', tagName: 'p', properties: {}, children: [{ type: 'text', value: '原文的在线演示暂时无法访问，示例代码仍可在本文中阅读。' }] }, { type: 'element', tagName: 'a', properties: { href: 'https://fiddle.jshell.net/Lr73mn89/show/light/', rel: ['noopener', 'noreferrer'], target: '_blank' }, children: [{ type: 'text', value: '查看原演示地址 ↗' }] }];
      }
      if (node.type === 'element' && /^h[1-6]$/.test(node.tagName)) {
        const id = entry.headingIds[index++];
        if (id) node.properties = { ...node.properties, id };
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}
