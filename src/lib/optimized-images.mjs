import manifest from '../data/optimized-images.json' with { type: 'json' };

const images = new Map(manifest.articles.map(image => [new URL(image.original).pathname, image]));
export function optimizedImage(src) {
  try {
    const url = new URL(src);
    // Only replace our explicitly converted CDN images, never arbitrary embeds or GIFs.
    if (url.origin !== 'https://cdn.ihoey.com') return undefined;
    return images.get(url.pathname);
  } catch { return undefined; }
}

export function optimizeImageProperties(properties) {
  const image = optimizedImage(properties.src);
  if (!image || properties.srcSet || properties.srcset) return properties;
  return {
    ...properties, src: image.src, 'data-original-src': properties.src,
    ...(!properties.width && !properties.height ? { width: image.width, height: image.height } : {}),
  };
}

export function optimizeImageTag(tag) {
  if (/\b(?:srcset|data-original-src)\s*=/i.test(tag)) return tag;
  const match = tag.match(/\bsrc\s*=\s*(['"])(.*?)\1/i);
  const image = match && optimizedImage(match[2].replaceAll('&amp;', '&'));
  if (!image) return tag;
  const dimensions = /\b(?:width|height)\s*=/i.test(tag) ? '' : ` width="${image.width}" height="${image.height}"`;
  return tag.replace(match[0], `src="${image.src}" data-original-src=${match[1]}${match[2]}${match[1]}${dimensions}`);
}
