import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const path = z.string().regex(/^\/(.+\/)?$/, 'path must start and end with "/"');

// Articles (playbook §10.4, §18.8). Bodies are verbatim from the live posts.
// Add a new article: drop an .md/.mdx file in src/content/blog/ with this frontmatter.
const blog = defineCollection({
  loader: glob({ pattern: ['**/*.{md,mdx}', '!**/_*'], base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),                 // list excerpt (verbatim archive excerpt for migrated posts)
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
      // migrated posts keep their exact WordPress URL; new posts default to /YYYY/MM/DD/<file-name>/
      path: path.optional(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
      // optional hand-written table of contents (for headings written as JSX with fixed ids);
      // otherwise the TOC is built from the article's ## / ### headings
      toc: z.array(z.object({ id: z.string(), label: z.string() })).optional(),
    }).refine((d) => !d.cover || d.coverAlt !== undefined, { message: 'cover needs coverAlt', path: ['coverAlt'] }),
});

// Case studies at /work/<slug>/. Body sections (## headings): Problem → Approach → Implementation → Outcome.
// Files starting with "_" are templates and are never built. `placeholder: true` entries are clearly marked
// stand-ins (no real project supplied yet): noindex, out of the sitemap, and dropped from production builds
// (`npm run build:prod`, or SITE_ENV=production / CF_PAGES_BRANCH=main).
const work = defineCollection({
  loader: glob({ pattern: ['**/*.{md,mdx}', '!**/_*'], base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.string(),        // e.g. "WordPress development"
      description: z.string(),     // one or two sentences for the card and meta
      client: z.string().optional(),      // client name, or a description if under NDA
      clientType: z.string().optional(),  // e.g. "Digital agency, Australia"
      stack: z.array(z.string()).default([]),
      via: z.string().optional(),  // the agency Kevin did the work with, e.g. "Northbase"
      role: z.string().optional(), // what Kevin did on the project (only once Kevin supplies it)
      date: z.coerce.date().optional(),
      updated: z.coerce.date().optional(),
      cover: image().optional(),   // a real screenshot (never stock)
      coverAlt: z.string().optional(),
      coverPosition: z.string().default('center'), // CSS object-position for cropped cards, e.g. 'left top'
      url: z.url().optional(),     // live project URL; leave out to show no link
      order: z.number().default(100),     // lower = earlier in lists
      placeholder: z.boolean().default(false),
      draft: z.boolean().default(false),
    }).refine((d) => !d.cover || d.coverAlt !== undefined, { message: 'cover needs coverAlt', path: ['coverAlt'] }),
});

export const collections = { blog, work };
