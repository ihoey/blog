#!/usr/bin/env python3
"""Regenerate committed WebP assets; requires cwebp. Builds stay offline."""
import hashlib
import json
from pathlib import Path
import subprocess
import urllib.request

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / 'work/image-originals'
CACHE.mkdir(parents=True, exist_ok=True)
MANIFEST = ROOT / 'src/data/optimized-images.json'


def encode(source, target, flags):
    subprocess.run(['cwebp', '-quiet', *flags, str(source), '-o', str(target)], check=True)


encode(ROOT / 'static/design/canopy.jpg', ROOT / 'static/design/canopy.webp', ['-q', '84', '-m', '6'])
encode(ROOT / 'static/avatar.png', ROOT / 'static/avatar.webp', ['-q', '88', '-m', '6', '-resize', '176', '0'])
manifest = json.loads(MANIFEST.read_text())
for image in manifest['articles']:
    original = CACHE / image['originalSha256']
    if not original.exists():
        request = urllib.request.Request(image['original'], headers={
            'User-Agent': 'Mozilla/5.0', 'Referer': 'https://blog.ihoey.com/'})
        with urllib.request.urlopen(request, timeout=45) as response:
            data = response.read()
        if hashlib.sha256(data).hexdigest() != image['originalSha256']:
            raise RuntimeError('Original image changed; review before regenerating: ' + image['original'])
        original.write_bytes(data)
    if hashlib.sha256(original.read_bytes()).hexdigest() != image['originalSha256']:
        raise RuntimeError('Cached original checksum mismatch: ' + image['original'])
    target = ROOT / 'static' / image['src'].lstrip('/')
    target.parent.mkdir(parents=True, exist_ok=True)
    flags = ['-lossless', '-m', '6'] if image['encoding'] == 'lossless' else ['-q', '88', '-m', '6']
    if image.get('resizeWidth'):
        flags += ['-resize', str(image['resizeWidth']), '0']
    encode(original, target, flags)
    if target.stat().st_size >= image['originalBytes']:
        raise RuntimeError('WebP is not smaller; review before updating: ' + image['src'])
    image['webpBytes'] = target.stat().st_size
MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
print('Regenerated canopy, avatar and', len(manifest['articles']), 'article images.')
