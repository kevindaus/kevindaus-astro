// 410 Gone for URLs removed on purpose (docs/redirects.md). _redirects can't send 410 on Cloudflare Pages.
export const gone = () =>
  new Response('<!doctype html><title>410 Gone</title><h1>410 Gone</h1>', {
    status: 410,
    headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex' },
  });
