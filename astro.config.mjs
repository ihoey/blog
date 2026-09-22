import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { legacyHeadings } from './src/lib/legacy-headings.mjs';

export default defineConfig({
  site: 'https://blog.ihoey.com',
  output: 'static',
  publicDir: './static',
  build: { format: 'preserve' },
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: { theme: 'github-light', wrap: false },
    processor: unified({ rehypePlugins: [legacyHeadings] }),
  },
  devToolbar: { enabled: false },
});
