import { dateInShanghai } from './paths.mjs';

// Explicit editorial updates only; builds and file mtimes are not content updates.
export function postUpdated(value, legacyUpdated, published) {
  const updated = value
    ? dateInShanghai(value)
    : legacyUpdated
      ? new Date(legacyUpdated)
      : published;
  if (updated < published || !Number.isFinite(updated.getTime())) {
    throw new Error(
      'Article updated must be a valid date on or after publication.',
    );
  }
  return updated;
}

export function listingSEO(listing) {
  const page = listing.page > 1 ? ` · 第 ${listing.page} 页` : '';
  return {
    title: `${listing.title}${page}`,
    description:
      listing.kind === 'articles'
        ? `${listing.title}：${listing.description}共 ${listing.total} 篇文章，当前第 ${listing.page} / ${listing.totalPages} 页。`
        : `${listing.title}：${listing.description}`,
  };
}

/**
 * @param {{ site: {url: string, name: string, description: string, author: string}, title: string, description: string, canonical: string, date?: Date, updated?: Date, image?: string, tags?: string[] }} options
 */
export function pageStructuredData({
  site,
  title,
  description,
  canonical,
  date,
  updated,
  image,
  tags = [],
}) {
  const home = new URL('/', site.url).href;
  const url = new URL(canonical, home).href;
  const author = {
    '@type': 'Person',
    name: site.author,
    url: new URL('/about/', home).href,
  };
  if (date) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      url,
      mainEntityOfPage: url,
      datePublished: date.toISOString(),
      dateModified: (updated || date).toISOString(),
      inLanguage: 'zh-CN',
      author,
      publisher: author,
      ...(image ? { image: new URL(image, url).href } : {}),
      ...(tags.length ? { keywords: tags } : {}),
    };
  }
  if (canonical === '/') {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: site.name,
      description: site.description,
      url: home,
      inLanguage: 'zh-CN',
      publisher: author,
    };
  }
  if (canonical === '/about/') {
    return {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: title,
      description,
      url,
      mainEntity: author,
    };
  }
}
