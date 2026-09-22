import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const list = z.union([z.string(), z.array(z.string())]).transform(v => Array.isArray(v) ? v : [v]);
const posts = defineCollection({
  loader: glob({ base: './source/_posts', pattern: '**/*.md', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({
    title: z.string(), date: z.union([z.string(), z.date()]),
    tags: list, categories: list,
    description: z.string().optional(), draft: z.boolean().default(false),
  }),
});
const pages = defineCollection({
  loader: glob({ base: './source', pattern: '{about,links,guestbook}/index.md', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: z.object({ title: z.string(), comments: z.boolean().optional(),
    addNotes: z.array(z.string()).optional(), declare: z.array(z.string()).optional(), quotes: z.string().optional() }),
});
export const collections = { posts, pages };
