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
 * @param {{ site: {url: string, name: string, seoDescription: string, author: string}, title: string, description: string, canonical: string, date?: Date, updated?: Date, image?: string, tags?: string[] }} options
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
  const author = new URL('/about/', home).href;
  const websiteId = `${home}#website`;
  const personId = `${author}#person`;
  const pageId = `${url}#webpage`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: home,
        name: site.name,
        description: site.seoDescription,
        inLanguage: 'zh-CN',
        publisher: { '@id': personId },
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: site.author,
        url: author,
      },
      {
        '@type': canonical === '/about/' ? 'AboutPage' : 'WebPage',
        '@id': pageId,
        url,
        name: title,
        description,
        inLanguage: 'zh-CN',
        isPartOf: { '@id': websiteId },
        ...(date ? { mainEntity: { '@id': `${url}#article` } } : {}),
        ...(canonical === '/about/' ? { mainEntity: { '@id': personId } } : {}),
      },
      ...(date
        ? [
            {
              '@type': 'BlogPosting',
              '@id': `${url}#article`,
              headline: title,
              description,
              url,
              mainEntityOfPage: { '@id': pageId },
              isPartOf: { '@id': websiteId },
              datePublished: date.toISOString(),
              dateModified: (updated || date).toISOString(),
              inLanguage: 'zh-CN',
              author: { '@id': personId },
              publisher: { '@id': personId },
              ...(image ? { image: new URL(image, url).href } : {}),
              ...(tags.length ? { keywords: tags } : {}),
            },
          ]
        : []),
    ],
  };
}
