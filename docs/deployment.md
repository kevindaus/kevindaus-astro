# Deployment — Cloudflare Pages

**Project:** `kevinflorenzdaus-com` · production branch `main` · build `npm run build` → `dist/` · Pages Functions in `functions/` (410s + `/api/contact`)
**Node:** 22 (`.nvmrc`, `engines`). Git-connected builds need `NODE_VERSION=22` set in the Pages project env. Git builds of `main` count as production automatically (`CF_PAGES_BRANCH=main`), so placeholder case studies are dropped; a local build for a `main` upload must use `npm run build:prod`.
**Deploy route today:** direct upload with Wrangler (`npx wrangler pages deploy dist`), run from the repo root so `functions/` ships too. Connect the GitLab repo in the Pages dashboard once `northbase/kevinflorenzdaus-com` exists.

## Commands

```bash
npx wrangler login                                   # once, interactive (Kevin)
npx wrangler pages project create kevinflorenzdaus-com --production-branch main
npm run build        # previews: includes placeholder case studies (marked, noindex)
npx wrangler pages deploy dist --project-name kevinflorenzdaus-com --branch preview   # preview → preview.kevinflorenzdaus-com.pages.dev
npm run build:prod   # production: SITE_ENV=production drops placeholder case studies
npx wrangler pages deploy dist --project-name kevinflorenzdaus-com --branch main      # 🛑 production (approval required)
```

## Contact form environment (Pages → Settings → Variables and secrets, Production **and** Preview)

| Name | Type | Value |
|---|---|---|
| `RESEND_API_KEY` | secret | Resend API key (resend.com → API Keys, "sending access" only) |
| `CONTACT_TO` | plain | the inbox enquiries go to |
| `CONTACT_FROM` | plain | a sender on a domain verified in Resend, e.g. `Website <contact@kevinflorenzdaus.com>` (add Resend's DNS records in Cloudflare) |
| `TURNSTILE_SECRET` | secret, optional | Turnstile secret key. Pair it with **build** variable `PUBLIC_TURNSTILE_SITE_KEY` (the widget only renders when that is set) |

Without the first three, `/api/contact` answers `500 not_configured` and the form shows its error message. Test locally with `npx wrangler pages dev dist --port 8788 --binding RESEND_API_KEY=… --binding CONTACT_TO=… --binding CONTACT_FROM=…`.

Local check of redirects/410s/headers with Cloudflare's runtime: `npx wrangler pages dev dist --port 8788`.
Previews on `*.pages.dev` send `X-Robots-Tag: noindex` (`public/_headers`). For a stronger preview gate: Cloudflare One → Access → self-hosted app on `*.kevinflorenzdaus-com.pages.dev` **and** `kevinflorenzdaus-com.pages.dev`, allowing listed emails with a one-time PIN. Remove or adjust it before the flip.

## Cutover runbook 🛑 needs Kevin's approval at the flip

1. **TTL:** skip. The records are proxied on Cloudflare (orange cloud, 300s Auto TTL).
2. **Preview review:** every page, every redirect (`docs/redirects.md`), 410s, headers. Send a test enquiry through `/contact/` (with and without JS) and confirm it arrives and Reply-To is the sender.
3. **Back up WordPress** (DB export + `wp-content/` tarball) and keep it 30+ days. *(Kevin: from the current host)*
4. **Flip:** Pages → project → Custom domains → add `kevinflorenzdaus.com` and `www.kevinflorenzdaus.com`. Because DNS is on the same Cloudflare account, Pages replaces the apex A/AAAA records with a CNAME to `kevinflorenzdaus-com.pages.dev` when you confirm. Keep a `www` → apex 301 (Bulk Redirect or Redirect Rule), as today. Confirm HTTPS provisions and that production isn't behind an Access app.
5. **+1 hour:**
   - Hit every URL and redirect on the real domain.
   - `curl -sI https://kevinflorenzdaus.com/ | grep -iE 'strict|x-content|referrer|x-frame|content-security|permissions'` → all 6 present.
   - Check indexability: no `X-Robots-Tag` on the apex, robots meta `index`.
   - GSC: submit `https://kevinflorenzdaus.com/sitemap-index.xml` and remove the old `sitemap_index.xml`. Bing: import from GSC.
   - Cloudflare Web Analytics: add the site (automatic injection for Pages).
   - Check share cards in the Facebook Sharing Debugger and the LinkedIn Post Inspector.
   - Clear the macOS DNS cache if the old site still shows: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`.
6. **+24 hours:** GSC coverage and crawl errors; 404s in Cloudflare analytics.
7. **+30 days:** decommission the WordPress hosting and cancel renewals.

## Rollback
Pages → Deployments → promote the previous production deployment. If the domain itself must go back to WordPress, restore the old A/AAAA records (note them before the flip: currently proxied to the WP origin).
