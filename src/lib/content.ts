// The only place pages read repeating content from (§19.6).
import { getCollection, render, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;
export type CaseStudy = CollectionEntry<'work'>;

const published = <T extends { data: { draft: boolean } }>(e: T) => import.meta.env.DEV || !e.data.draft;

/** Published articles, newest first. Drafts show in `astro dev` only. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', published);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** True for production builds: `npm run build:prod`, a Cloudflare Pages build of `main`, or a Vercel production build. */
export const isProductionBuild = () =>
  process.env.SITE_ENV === 'production' || process.env.CF_PAGES_BRANCH === 'main' || process.env.VERCEL_ENV === 'production';

/** Published case studies, by `order` then newest first. Drafts show in `astro dev` only;
 *  placeholders show everywhere except production builds. */
export async function getWork(): Promise<CaseStudy[]> {
  const items = await getCollection('work', (e) => published(e) && !(e.data.placeholder && isProductionBuild()));
  return items.sort((a, b) => a.data.order - b.data.order || (b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0));
}

const pad = (n: number) => String(n).padStart(2, '0');

/** An article's URL: its preserved WordPress path, otherwise /YYYY/MM/DD/<id>/ (the same permalink scheme). */
export const postPath = (post: Post) => {
  if (post.data.path) return post.data.path;
  const d = post.data.date;
  return `/${d.getUTCFullYear()}/${pad(d.getUTCMonth() + 1)}/${pad(d.getUTCDate())}/${post.id}/`;
};

export const workPath = (item: CaseStudy) => `/work/${item.id}/`;

export const renderEntry = (entry: Post | CaseStudy) => render(entry);

/** Minutes to read, from the raw body (code and JSX tags stripped, 220 wpm). */
export function readingTime(body = ''): number {
  const text = body
    .replace(/^import .*$/gm, '')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_`>[\]()]/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Articles sharing the most tags with `post` (internal linking), newest first. */
export function relatedPosts(post: Post, all: Post[], limit = 3): Post[] {
  const tags = new Set(post.data.tags);
  return all
    .filter((p) => p.id !== post.id)
    .map((p) => ({ p, score: p.data.tags.filter((t) => tags.has(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.p.data.date.valueOf() - a.p.data.date.valueOf())
    .slice(0, limit)
    .map((x) => x.p);
}

/** "3 Feb 2023" (AU/UK order). Stored in UTC (site timezone). */
export const fmtDate = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
/** "2023-02-03" — the compact mono form used in lists. */
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
