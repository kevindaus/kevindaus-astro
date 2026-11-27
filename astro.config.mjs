// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://kevinflorenzdaus.com', // canonical origin: apex, https (www + http 301 here on the live site)
  trailingSlash: 'always',               // live WordPress URLs all end in "/"
  build: { format: 'directory' },
  markdown: { smartypants: false }, // keep the live posts' punctuation verbatim (straight quotes)
  vite: { plugins: [tailwindcss()] },
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/homepage-v2/') })], // homepage-v2 = noindex draft
});
