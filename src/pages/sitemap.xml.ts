import { getPosts } from '../lib/posts';
import { getListings } from '../lib/listings';
export async function GET() {
  const posts = await getPosts();
  const updates = new Map(posts.map(p => [p.path, p.updated.toISOString()]));
  const paths = [...posts.map(p => p.path), ...getListings(posts).map(l => l.path)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(p => `<url><loc>${new URL(p, 'https://blog.ihoey.com').href.replaceAll('&', '&amp;')}</loc>${updates.has(p) ? `<lastmod>${updates.get(p)}</lastmod>` : ''}</url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
