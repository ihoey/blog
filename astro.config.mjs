import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { readingCompatibility } from './src/lib/reading-compatibility.mjs';
import { legacyHeadings } from './src/lib/legacy-headings.mjs';

export default defineConfig({
  site: 'https://blog.ihoey.com',
  output: 'static',
  publicDir: './static',
  build: { format: 'preserve' },
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: { theme: 'dracula', wrap: false },
    processor: unified({ rehypePlugins: [legacyHeadings, readingCompatibility] }),
  },
  devToolbar: { enabled: false },
});
