import { getPosts } from '../lib/posts';
const escape = (text: string) => text.replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[c]!));
export async function GET() {
  const posts = await getPosts();
  const site = 'https://blog.ihoey.com';
  const updated = new Date(Math.max(...posts.map(p => p.updated.getTime()))).toISOString();
  return new Response(`<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom"><title>梦魇小栈</title><subtitle>专注于分享</subtitle><id>${site}/</id><link href="${site}/"/><link href="${site}/atom.xml" rel="self"/><updated>${updated}</updated><author><name>Ihoey</name></author>${posts.slice(0, 20).map(p => `<entry><title>${escape(p.data.title)}</title><id>${site}${escape(p.path)}</id><link href="${site}${escape(p.path)}"/><published>${p.date.toISOString()}</published><updated>${p.updated.toISOString()}</updated><summary>${escape(p.description)}</summary></entry>`).join('')}</feed>`, { headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' } });
}
