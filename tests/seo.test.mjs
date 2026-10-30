import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  postUpdated,
  listingSEO,
  pageStructuredData,
} from '../src/lib/seo.mjs';

test('modification dates preserve legacy history and accept explicit updates without changing publication', () => {
  const published = new Date('2019-02-18T00:00:00Z');
  assert.equal(postUpdated(undefined, undefined, published), published);
  assert.equal(
    postUpdated(undefined, '2023-07-22T00:00:00Z', published).toISOString(),
    '2023-07-22T00:00:00.000Z',
  );
  assert.equal(
    postUpdated(
      '2026-10-30 12:00:00',
      '2023-07-22T00:00:00Z',
      published,
    ).toISOString(),
    '2026-10-30T04:00:00.000Z',
  );
  assert.equal(published.toISOString(), '2019-02-18T00:00:00.000Z');
  assert.throws(() => postUpdated('2018-01-01', undefined, published));
  assert.throws(() => postUpdated('invalid', undefined, published));
});

test('paginated SEO names the page while leaving the visible listing object intact', () => {
  const listing = {
    title: 'JavaScript',
    description: '技术笔记。',
    kind: 'articles',
    total: 12,
    page: 2,
    totalPages: 3,
  };
  assert.deepEqual(listingSEO(listing), {
    title: 'JavaScript · 第 2 页',
    description: 'JavaScript：技术笔记。共 12 篇文章，当前第 2 / 3 页。',
  });
  assert.equal(listing.title, 'JavaScript');
});

test('article metadata uses the real author and only an explicit article image', () => {
  const options = {
    site: {
      url: 'https://blog.ihoey.com',
      name: '梦魇小栈',
      description: '技术博客',
      author: 'Ihoey',
    },
    canonical: '/posts/example.html',
    title: '标题',
    description: '摘要',
    date: new Date('2020-01-01T00:00:00Z'),
    updated: new Date('2023-01-01T00:00:00Z'),
    tags: ['JavaScript'],
  };
  const article = pageStructuredData(options);
  assert.equal(article.datePublished, options.date.toISOString());
  assert.equal(article.dateModified, options.updated.toISOString());
  assert.equal(article.author.name, 'Ihoey');
  assert.equal(article.author.url, 'https://blog.ihoey.com/about/');
  assert.equal(article.image, undefined); // A portrait is not an article illustration.
  assert.equal(
    pageStructuredData({ ...options, image: './cover.webp' }).image,
    'https://blog.ihoey.com/posts/cover.webp',
  );
  const home = pageStructuredData({
    ...options,
    canonical: '/',
    date: undefined,
  });
  assert.equal(home.name, options.site.name);
  assert.equal(home.description, options.site.description);
});
