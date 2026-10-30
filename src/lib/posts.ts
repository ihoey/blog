import { getCollection } from 'astro:content';
import legacyPosts from '../data/legacy-posts.json';
import { articlePath, dateInShanghai, localDay } from './paths.mjs';
import { getPostPreview } from './post-preview.mjs';
import { postUpdated } from './seo.mjs';

export function summary(body: string, max = 135) {
  const intro = body.split(/<!--\s*more\s*-->|```/i)[0];
  const text = intro
    .replace(/<[^>]*>/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#*>`_]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > max ? text.slice(0, max) + '…' : text;
}

export async function getPosts() {
  const entries = await getCollection('posts', (p) => !p.data.draft);
  const posts = await Promise.all(
    entries.map(async (entry) => {
      const old = legacyPosts.find((p) => p.id === entry.id);
      const date = old ? new Date(old.date) : dateInShanghai(entry.data.date);
      const path =
        old?.path ?? articlePath(entry.id, entry.data.categories, date);
      const updated = postUpdated(entry.data.updated, old?.updated, date);
      const description =
        entry.data.description || summary(entry.body || '') || entry.data.title;
      return {
        ...entry,
        date,
        day: localDay(date),
        path,
        updated,
        updatedDay: localDay(updated),
        preview: await getPostPreview(
          entry.body || '',
          path,
          entry.data.description,
        ),
        description,
      };
    }),
  );
  return posts.sort(
    (a, b) => b.date.getTime() - a.date.getTime() || a.id.localeCompare(b.id),
  );
}

export type Post = Awaited<ReturnType<typeof getPosts>>[number];
export const tagPath = (tag: string) =>
  `/tags/${encodeURIComponent(tag.replace(/\s+/g, '-'))}/`;
export const categoryPath = (categories: string[]) =>
  `/categories/${categories.map(encodeURIComponent).join('/')}/`;

export function taxonomy(posts: Post[], kind: 'tags' | 'categories') {
  const values = new Map<
    string,
    { name: string; path: string; count: number }
  >();
  for (const post of posts) {
    post.data[kind].forEach((name, i) => {
      const path =
        kind === 'tags'
          ? tagPath(name)
          : categoryPath(post.data.categories.slice(0, i + 1));
      const old = values.get(path);
      values.set(path, { name, path, count: (old?.count || 0) + 1 });
    });
  }
  return [...values.values()].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name, 'zh-CN'),
  );
}
