import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog posts (playbook §10.4, §18.8). Bodies are verbatim from the live posts.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      excerpt: z.string().optional(),           // verbatim archive excerpt
      heroImage: image().optional(),
      heroAlt: z.string().optional(),
      author: z.string().default('kevin_daus'),
      categories: z.array(z.string()).default([]),
      toc: z.array(z.object({ id: z.string(), label: z.string() })).default([]),
      // the exact old WordPress URL; it IS the new URL
      path: z.string().regex(/^\/(.+\/)?$/, 'path must start and end with "/"').optional(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
      draft: z.boolean().default(false),
    }).refine((d) => !d.heroImage || d.heroAlt !== undefined, { message: 'heroImage needs heroAlt', path: ['heroAlt'] }),
});

export const collections = { blog };
