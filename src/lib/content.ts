// The only place pages read repeating content from (§19.6).
import { getCollection, render, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Published posts, newest first. Drafts show in `astro dev` only. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** A post's URL: its preserved WordPress path, otherwise /blog/<id>/. */
export const postPath = (post: Post) => post.data.path ?? `/blog/${post.id}/`;

export const renderPost = (post: Post) => render(post);

/** "February 3, 2023" — the live site's date format. Posts are stored in UTC (site timezone). */
export const fmtDate = (d: Date) => d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
/** "5:21 am" — the live post meta time format. */
export const fmtTime = (d: Date) => d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' }).toLowerCase();
