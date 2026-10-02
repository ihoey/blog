import { optimizeImageProperties, optimizeImageTag } from './optimized-images.mjs';
const site = 'https://blog.ihoey.com';
const external = href => {
  try { return /^(?:https?:)?\/\//i.test(href) && new URL(href, site).origin !== site; } catch { return false; }
};
export function readingCompatibility() {
  return tree => {
    function visit(node) {
      if (node.tagName === 'img') node.properties = optimizeImageProperties({ loading: 'lazy', decoding: 'async', ...node.properties });
      if (node.tagName === 'a' && external(String(node.properties?.href || ''))) {
        node.properties.target = '_blank';
        node.properties.rel = [...new Set([...(Array.isArray(node.properties.rel) ? node.properties.rel : []), 'noopener', 'noreferrer'])];
      }
      // Raw HTML in legacy pages does not pass through element nodes.
      if (node.type === 'raw') {
        node.value = node.value.replace(/<a\b[^>]*>/gi, tag => {
          const href = tag.match(/\bhref=(['"])(.*?)\1/i)?.[2];
          if (!href || !external(href)) return tag;
          if (!/\btarget\s*=/i.test(tag)) tag = tag.replace(/>$/, ' target="_blank">');
          const rel = tag.match(/\brel=(['"])(.*?)\1/i);
          const values = [...new Set([...(rel?.[2].split(/\s+/) || []), 'noopener', 'noreferrer'])].join(' ');
          return rel ? tag.replace(rel[0], `rel="${values}"`) : tag.replace(/>$/, ` rel="${values}">`);
        });
        node.value = node.value.replace(/<img\b[^>]*>/gi, tag => optimizeImageTag(tag).replace(/\s*\/?>$/, end => `${/\bloading\s*=/i.test(tag) ? '' : ' loading="lazy"'}${/\bdecoding\s*=/i.test(tag) ? '' : ' decoding="async"'}${end}`));
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}

export function absoluteFeedHTML(html, path) {
  const base = new URL(path, site);
  return html.replace(/\b(href|src|poster)=(['"])(.*?)\2/gi, (all, attr, quote, url) => {
    if (/^(?:data:|mailto:|tel:)/i.test(url)) return all;
    try { return `${attr}=${quote}${new URL(url.replaceAll('&amp;', '&'), base).href.replaceAll('&', '&amp;')}${quote}`; }
    catch { return all; }
  });
}

export const escapeXML = text => text.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\ufffe\uffff]/g, '').replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[c]));
