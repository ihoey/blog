import { createMarkdownProcessor } from '@astrojs/markdown-remark';

const more = /^<!--\s*more\s*-->$/i;
const cache = new Map();

function textOf(node, includeCode = true) {
  if (node.type === 'html' || node.type === 'definition' || node.type === 'image') return '';
  if (node.type === 'code' && !includeCode) return '';
  return node.value ?? (node.children || []).map(child => textOf(child, includeCode)).join('');
}

function selectPreview() {
  return (tree, file) => {
    const data = file.data.astro.frontmatter;
    const prose = tree.children.map(node => textOf(node, false)).join(' ');
    const allText = tree.children.map(node => textOf(node)).join(' ');
    let codeLines = 0;
    const countCode = node => {
      if (node.type === 'code') codeLines += node.value.split('\n').length;
      node.children?.forEach(countCode);
    };
    countCode(tree);
    const chinese = (prose.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu) || []).length;
    const words = (prose.match(/[\p{Script=Latin}\d]+(?:['’-][\p{Script=Latin}\d]+)*/gu) || []).length;
    data.wordCount = [...allText.replace(/\s/g, '')].length;
    data.readingMinutes = Math.max(1, Math.ceil(chinese / 300 + words / 200 + codeLines / 15));

    const boundary = tree.children.findIndex(node => node.type === 'html' && more.test(node.value.trim()));
    const definitions = tree.children.filter(node => node.type === 'definition');
    if (boundary >= 0) {
      tree.children = tree.children.slice(0, boundary);
      data.previewSource = 'more';
    } else if (data.description) {
      tree.children = [{ type: 'paragraph', children: [{ type: 'text', value: data.description }] }];
      data.previewSource = 'description';
    } else {
      // Keep whole introductory blocks, including code, rather than cutting Markdown syntax.
      const selected = [];
      let length = 0;
      for (const node of tree.children) {
        if (node.type === 'definition' || node.type === 'html') continue;
        if (selected.length && (length >= 320 || selected.length >= 3 || node.type === 'heading')) break;
        selected.push(node);
        length += textOf(node).length;
        if (node.type === 'code') break;
      }
      tree.children = selected;
      data.previewSource = 'auto';
    }
    // Preserve reference links even when their definitions appear after <!--more-->.
    tree.children.push(...definitions);
    const clean = node => {
      if (!node.children) return;
      node.children = node.children.filter(child => child.type !== 'html');
      for (const child of node.children) {
        if (child.type === 'code') {
          const lines = child.value.split('\n');
          if (lines.length > 6) {
            child.value = lines.slice(0, 6).join('\n').trimEnd();
            data.codeClipped = true;
          }
        }
        // Headings in an excerpt must not create duplicate homepage anchors.
        if (child.type === 'heading') {
          child.type = 'paragraph';
          child.data = { hProperties: { className: ['excerpt-heading'] } };
        }
        if ((child.type === 'link' || child.type === 'definition') && child.url.startsWith('#')) child.url = data.path + child.url;
        clean(child);
      }
    };
    clean(tree);
  };
}

function stylePreview() {
  return tree => {
    const visit = node => {
      if (node.tagName === 'img') node.properties = { ...node.properties, loading: 'lazy', decoding: 'async' };
      if (node.tagName === 'pre') {
        const code = node.children?.find(child => child.tagName === 'code');
        const language = node.properties?.dataLanguage || code?.properties?.className?.find(name => name.startsWith('language-'))?.slice(9) || 'Code';
        return { type: 'element', tagName: 'div', properties: { className: ['excerpt-code'] }, children: [
          { type: 'element', tagName: 'div', properties: { className: ['excerpt-code-label'] }, children: [{ type: 'text', value: `${language} · 代码预览` }] },
          node,
        ] };
      }
      if (node.children) node.children = node.children.map(visit);
      return node;
    };
    visit(tree);
  };
}

const renderer = createMarkdownProcessor({
  shikiConfig: { theme: 'dracula', wrap: false },
  remarkPlugins: [selectPreview], rehypePlugins: [stylePreview], smartypants: false,
});

export async function getPostPreview(body, path, description = '') {
  const key = JSON.stringify([body, path, description]);
  if (!cache.has(key)) cache.set(key, (async () => {
    const result = await (await renderer).render(body, { frontmatter: { path, description } });
    const { wordCount, readingMinutes, previewSource, codeClipped = false } = result.metadata.frontmatter;
    return { html: result.code, wordCount, readingMinutes, previewSource, codeClipped };
  })());
  return cache.get(key);
}
