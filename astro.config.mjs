// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { readdirSync, readFileSync } from 'node:fs';

// Case studies flagged `placeholder: true` are stand-ins: never in the sitemap. /work/ itself is listed
// only when at least one real (non-placeholder, non-draft) case study exists.
const workDir = './src/content/work';
const realWork = readdirSync(workDir).filter((f) => /\.mdx?$/.test(f) && !f.startsWith('_'))
  .map((f) => readFileSync(`${workDir}/${f}`, 'utf8'))
  .filter((src) => !/^placeholder:\s*true/m.test(src) && !/^draft:\s*true/m.test(src));
/** @param {string} page */
const sitemapFilter = (page) =>
  !page.includes('/work/placeholder-') && (realWork.length > 0 || !page.endsWith('/work/'));

export default defineConfig({
  site: 'https://kevinflorenzdaus.com', // canonical origin: apex, https (www + http 301 here on the live site)
  trailingSlash: 'always',               // live WordPress URLs all end in "/"
  build: { format: 'directory' },
  markdown: {
    smartypants: false, // keep the live posts' punctuation verbatim (straight quotes)
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } }, // dark colours switch under .dark (global.css)
  },
  vite: { plugins: [tailwindcss()] },
  integrations: [mdx(), sitemap({ filter: sitemapFilter })],
});
