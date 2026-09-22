import { categoryPath, tagPath, taxonomy, type Post } from './posts';

export interface Listing {
  path: string; title: string; description: string; kind: 'articles' | 'tags' | 'categories' | 'page';
  posts: Post[]; page: number; totalPages: number; base: string; total: number; pageId?: string;
}

export function getListings(posts: Post[]) {
  const result: Listing[] = [];
  function add(base: string, title: string, description: string, entries: Post[], perPage: number) {
    const totalPages = Math.max(1, Math.ceil(entries.length / perPage));
    for (let page = 1; page <= totalPages; page++) {
      result.push({ path: page === 1 ? base : `${base}page/${page}/`, title, description,
        kind: 'articles', posts: entries.slice((page - 1) * perPage, page * perPage), page, totalPages, base, total: entries.length });
    }
  }
  add('/', '文章', '记录学到的知识，也记录折腾的过程。', posts, 5);
  add('/archives/', '文章归档', '从 2015 年开始，慢慢积累。', posts, 20);
  const years = [...new Set(posts.map(p => p.day.slice(0, 4)))];
  for (const year of years) {
    add(`/archives/${year}/`, `${year} 年`, '这一年的文章。', posts.filter(p => p.day.startsWith(year)), 20);
    const months = [...new Set(posts.filter(p => p.day.startsWith(year)).map(p => p.day.slice(5, 7)))];
    for (const month of months) add(`/archives/${year}/${month}/`, `${year} 年 ${Number(month)} 月`, '这个月的文章。', posts.filter(p => p.day.startsWith(`${year}-${month}`)), 20);
  }
  for (const tag of taxonomy(posts, 'tags')) {
    add(tag.path, tag.name, '同一标签下的文章。', posts.filter(p => p.data.tags.some(t => tagPath(t) === tag.path)), 10);
  }
  for (const category of taxonomy(posts, 'categories')) {
    add(category.path, category.name, '沿着一个主题继续读。', posts.filter(p => p.data.categories.some((_, i) => categoryPath(p.data.categories.slice(0, i + 1)) === category.path)), 5);
  }
  for (const kind of ['tags', 'categories'] as const) {
    result.push({ path: `/${kind}/`, title: kind === 'tags' ? '标签' : '分类', description: '找到感兴趣的方向。', kind, posts: [], page: 1, totalPages: 1, base: `/${kind}/`, total: taxonomy(posts, kind).length });
  }
  for (const [pageId, title, description] of [['about', '关于我', '你好，我是 Ihoey。'], ['links', '友情链接', '在互联网的某个角落，遇见有趣的人。'], ['guestbook', '留言板', '路过也好，常来也好，留句话吧。']]) {
    result.push({ path: `/${pageId}/`, title, description, kind: 'page', posts: [], page: 1, totalPages: 1, base: `/${pageId}/`, total: 0, pageId });
  }
  return result;
}
