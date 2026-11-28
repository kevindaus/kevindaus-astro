// Vercel Function: 410 Gone for URLs removed on purpose (docs/redirects.md). vercel.json rewrites them here,
// because Vercel redirects can't send 410. Same response as functions/_lib/gone.ts (Cloudflare Pages).
const gone = () =>
  new Response('<!doctype html><title>410 Gone</title><h1>410 Gone</h1>', {
    status: 410,
    headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex' },
  });

export const GET = () => gone();
export const HEAD = () => gone();
