import { getPosts } from '../lib/posts';
export async function GET() {
  const posts = await getPosts();
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${posts.map(p => `<url><loc>${new URL(p.path, 'https://blog.ihoey.com').href.replaceAll('&', '&amp;')}</loc><lastmod>${p.updated.toISOString()}</lastmod></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
