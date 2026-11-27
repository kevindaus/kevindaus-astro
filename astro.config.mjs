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
// lastmod for articles: frontmatter `updated`, else `date`, keyed by the preserved WordPress `path`.
// Other pages get no lastmod rather than a made-up one.
const blogDir = './src/content/blog';
/** @type {Map<string, string>} */
const lastmod = new Map(
  readdirSync(blogDir).filter((f) => /\.mdx?$/.test(f) && !f.startsWith('_')).flatMap((f) => {
    const fm = readFileSync(`${blogDir}/${f}`, 'utf8').split(/^---$/m)[1] ?? '';
    /** @param {string} k */
    const get = (k) => fm.match(new RegExp(`^${k}:\\s*"?([^"\\n]+)"?`, 'm'))?.[1]?.trim();
    const path = get('path');
    const when = get('updated') ?? get('date');
    return path && when && !/^draft:\s*true/m.test(fm) ? [[`https://kevinflorenzdaus.com${path}`, new Date(when).toISOString()]] : [];
  }),
);
/** @param {import('@astrojs/sitemap').SitemapItem} item */
const serialize = (item) => (lastmod.has(item.url) ? { ...item, lastmod: lastmod.get(item.url) } : item);

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
  integrations: [mdx(), sitemap({ filter: sitemapFilter, serialize })],
});
