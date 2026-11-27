// RSS feed for articles (/rss.xml). The old WordPress /feed/ 301s here (public/_redirects).
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postPath } from '../lib/content';

export async function GET(context: APIContext) {
  const posts = (await getPosts()).filter((p) => !p.data.draft);
  return rss({
    title: 'Kevin Florenz Daus — Articles',
    description: 'Read the latest blog posts about general web development , Laravel, PHP and WordPress',
    site: context.site!,
    trailingSlash: true,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      pubDate: p.data.date,
      link: postPath(p),
      categories: p.data.tags,
    })),
    customData: '<language>en-us</language>',
  });
}
