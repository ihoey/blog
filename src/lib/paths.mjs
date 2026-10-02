/** @returns {'page' | 'location' | undefined} */
export function navigationCurrent(path, href) {
  // Directory URLs and the original Hexo index.html links name the same page.
  const normalize = value => normalizeCommentPath(value).replace(/\/?$/, '/');
  const current = normalize(path);
  const target = normalize(href);
  if (current === target) return 'page';
  if (target === '/' ? /^\/page\/\d+\/$/.test(current) : current.startsWith(target)) return 'location';
  return undefined;
}

export function normalizeCommentPath(path) {
  return new URL(path, 'https://blog.ihoey.com').pathname.replace(/\/index\.html$/, '/');
}

export function dateInShanghai(value) {
  // YAML parses timestamp scalars as Date objects without retaining the source zone.
  // Existing posts always use the checked-in Hexo baseline. New posts should quote
  // a date with an explicit +08:00 offset, or a local YYYY-MM-DD HH:mm:ss value.
  if (value instanceof Date) {
    throw new Error('New article dates must be quoted strings with an explicit timezone or local date.');
  }
  const local = /^(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/.exec(value);
  if (local) {
    const [, y, m, d, h = '00', min = '00', sec = '00'] = local;
    value = `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}T${h.padStart(2, '0')}:${min}:${sec}+08:00`;
    const check = new Date(value);
    if (Number(m) < 1 || Number(m) > 12 || Number(d) < 1 || Number(h) > 23 || Number(min) > 59 || Number(sec) > 59 || !Number.isFinite(check.getTime()) || localDay(check) !== value.slice(0, 10)) {
      throw new Error(`Invalid publication date: ${value}`);
    }
  }
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) throw new Error(`Invalid publication date: ${value}`);
  return date;
}

export function localDay(date) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}

export function articlePath(id, categories, date) {
  return `/posts/${categories.join('/')}/${localDay(date)}-${id}.html`;
}

export function routeFile(path) {
  return path.endsWith('/') ? `${path}index.html` : path;
}
