# Deployment — Cloudflare Pages

**Config:** `wrangler.toml` (project `kevinflorenzdaus-com`, output `./dist`, compatibility date `2026-10-03`: the newest the pinned wrangler 4.143 runtime supports; bump it together with wrangler). Static output in `dist/`, Pages Functions in `functions/` (410s only), `_redirects` + `_headers` from `public/`. Production branch `main`.
**Node:** 22 (`.nvmrc`, `engines`). Pages' build image reads `.nvmrc`; set `NODE_VERSION=22` in the project env as a fallback.
**Placeholders:** production builds must drop placeholder case studies: `npm run build:prod` locally, or automatic on a Git build of `main` (`CF_PAGES_BRANCH=main`). There are none today.

## Option A — direct upload with Wrangler (works now, no Git remote needed)

```bash
npx wrangler login                                                    # once, interactive (Kevin): `! npx wrangler login`
npx wrangler pages project create kevinflorenzdaus-com --production-branch main   # once
npm run deploy:preview   # build → preview deployment → preview.kevinflorenzdaus-com.pages.dev (noindex)
npm run deploy:prod      # 🛑 production (approval required): build:prod → deploy --branch main
```

Run from the repo root so `functions/` ships. Local check with Cloudflare's runtime: `npm run build && npm run pages:dev` (port 8788).

## Option B — Git integration (once the GitLab repo exists)

Pages dashboard → Create → Connect to Git → `northbase/kevinflorenzdaus-com`:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Framework preset | Astro |
| Build command | `npm run build` (Git builds of `main` drop placeholders automatically) |
| Build output directory | `dist` |
| Root directory | `/` |
| Environment variable | `NODE_VERSION=22` (Production + Preview) |

Every other branch then gets a preview at `<branch>.kevinflorenzdaus-com.pages.dev`. If the project was already created with Option A, it can't be switched to Git: create the Git project under a new name or delete the direct-upload project first.

Previews on `*.pages.dev` send `X-Robots-Tag: noindex` (`public/_headers`). For a stronger preview gate: Cloudflare One → Access → self-hosted app on `*.kevinflorenzdaus-com.pages.dev` **and** `kevinflorenzdaus-com.pages.dev`, allowing listed emails with a one-time PIN. Remove or adjust it before the flip.

## Cutover runbook 🛑 needs Kevin's approval at the flip

1. **TTL:** skip. The records are proxied on Cloudflare (orange cloud, 300s Auto TTL).
2. **Preview review:** every page, every redirect (`docs/redirects.md`), 410s, headers. Check that every Contact / "Get in touch" link opens LinkedIn, and that `/contact/` 301s there.
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
