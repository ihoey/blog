"""Read an existing Hexo build without loading Hexo or running its hooks."""
import argparse
import hashlib
import json
import re
import xml.etree.ElementTree as ET
from datetime import datetime
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
from zoneinfo import ZoneInfo


class ArticleParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonical = None
        self.headings = []
        self.assets = []
        self.embeds = []
        self.body_depth = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'link' and a.get('rel') == 'canonical':
            self.canonical = a['href']
        if tag == 'div':
            if self.body_depth:
                self.body_depth += 1
            elif 'post-body' in a.get('class', '').split():
                self.body_depth = 1
        if self.body_depth:
            if re.fullmatch(r'h[1-6]', tag) and 'id' in a:
                self.headings.append(a['id'])
            if tag in ['img', 'iframe', 'audio', 'video'] and a.get('src'):
                self.assets.append(a['src'])
            if tag in ['iframe', 'script', 'style']:
                self.embeds.append({'tag': tag, 'src': a.get('src')})

    def handle_endtag(self, tag):
        if tag == 'div' and self.body_depth:
            self.body_depth -= 1


def sitemap_paths(path):
    return sorted({unquote(urlsplit(e.text).path) for e in ET.parse(path).iter()
                   if e.tag.endswith('}loc') or e.tag == 'loc'})


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--legacy-root', required=True, type=Path)
    parser.add_argument('--live-sitemap', required=True, type=Path)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[2]
    old = args.legacy_root
    models = json.loads((old / 'db.json').read_text())['models']
    built = {}
    for p in (old / 'public/posts').rglob('*.html'):
        parsed = ArticleParser()
        parsed.feed(p.read_text())
        assert parsed.canonical, f'Missing canonical: {p}'
        built[p.name] = (p, parsed)

    categories = {c['_id']: c['name'] for c in models['Category']}
    tags = {t['_id']: t['name'] for t in models['Tag']}
    posts = []
    for post in models['Post']:
        source = 'source/' + post['source']
        raw = (root / source).read_bytes()
        assert raw == (old / source).read_bytes(), f'Worktree source changed: {source}'
        assert raw.decode() == post['raw'], f'Stale Hexo database: {source}'
        local = datetime.fromisoformat(post['date'].replace('Z', '+00:00')).astimezone(ZoneInfo('Asia/Shanghai'))
        filename = local.strftime('%Y-%m-%d-') + post['slug'] + '.html'
        p, html = built[filename]
        path = unquote(urlsplit(html.canonical).path)
        assert path == '/' + str(p.relative_to(old / 'public'))
        posts.append({
            'id': post['slug'], 'source': source, 'path': path,
            'title': post['title'], 'date': local.isoformat(),
            'updated': post['updated'],
            'categories': [categories[x['category_id']] for x in models['PostCategory'] if x['post_id'] == post['_id']],
            'tags': [tags[x['tag_id']] for x in models['PostTag'] if x['post_id'] == post['_id']],
            'sha256': hashlib.sha256(raw).hexdigest(),
            'headingIds': html.headings, 'assets': html.assets, 'embeds': html.embeds,
        })
    posts.sort(key=lambda p: p['path'])
    assert len({p['path'] for p in posts}) == len(posts) == len(built)
    old_paths = sitemap_paths(old / 'public/sitemap.xml')
    live_paths = sitemap_paths(args.live_sitemap)
    missing = sorted({p['path'] for p in posts} - set(live_paths))
    assert not missing, f'Articles missing from production sitemap: {missing}'
    listing_paths = sorted('/' + str(p.relative_to(old / 'public')) for p in (old / 'public').rglob('*.html')
                           if p.relative_to(old / 'public').parts[0] in ['archives', 'categories', 'tags', 'page'])
    result = {
        'schemaVersion': 1, 'site': 'https://blog.ihoey.com',
        'sourceCommit': '57828763', 'timezone': 'Asia/Shanghai',
        'posts': posts,
        'pages': [{'source': 'source/' + p['source'], 'path': '/' + p['path'], 'title': p['title']}
                  for p in models['Page'] if p['source'].endswith('.md')],
        'listingPaths': listing_paths,
        'sitemap': {'localCount': len(old_paths), 'liveCount': len(live_paths),
                    'onlyLocal': sorted(set(old_paths) - set(live_paths)),
                    'onlyLive': sorted(set(live_paths) - set(old_paths))},
    }
    dest = root / 'docs/migration/legacy-baseline.json'
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'posts': len(posts), 'listingPaths': len(listing_paths), 'sitemap': result['sitemap']}, ensure_ascii=False))


if __name__ == '__main__':
    main()
