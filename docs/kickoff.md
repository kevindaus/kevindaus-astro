# Kickoff — kevinflorenzdaus.com

**Mode:** rebuild (elevate) · **Playbook:** 2026.09.29 · **Started:** 2026-09-29
**Folder:** `~/Herd/kevindaus-astro` · **slug:** `kevinflorenzdaus-com`
`kickoff/probe.mjs` isn't on this machine, so the checks below were done by hand (read-only, about one request per second).

## Probe summary

| Area | Finding |
|---|---|
| Platform | WordPress + **Elementor Pro**, Hello Elementor child theme, Ultimate Addons for Elementor, Perfmatters |
| SEO plugin | Rank Math |
| Hosts | `https://kevinflorenzdaus.com` is canonical; `www` and `http` 301 to it |
| DNS | **Cloudflare** (`jean`/`walt.ns.cloudflare.com`), proxied (A/AAAA are Cloudflare IPs) |
| Mail | No MX, no DMARC, no Postmark `pm-bounces` record |
| GSC | `google-site-verification` TXT present → there's history to export |
| Content | 8 pages in the sitemap (3 real + 5 test/placeholder + an empty thank-you page), 4 posts, 5 categories. REST API is closed (401) |
| Forms | None. All "Contact Me" buttons go to LinkedIn |
| Fonts (live) | Libre Baskerville, Gothic A1, Source Sans Pro, Lustria (Google Fonts). The new design uses Anton + JetBrains Mono (both OFL), so there's nothing to license |
| Analytics | None found |
| Embeds | None (YouTube is a channel link only) |
| Shop / booking / members / multilingual | None |
| `html lang` | `en-US` |
| Feed | `/feed/` already returns 410 |

## Decisions so far

| Question | Answer |
|---|---|
| Design intent | **Elevate** — mockups in `UI/`. Direction chosen: **Noir** (v4: Anton + JetBrains Mono, monochrome, motion). Graduated to `docs/design-system.md` + `docs/design/approved-*.png` |
| Hosting | **Cloudflare Pages** (DNS already on Cloudflare). `public/_redirects`, `functions/`, `NODE_VERSION=22`, Cloudflare Access for previews, Cloudflare Web Analytics |
| Repo | **GitLab `northbase/kevinflorenzdaus-com`** — Kevin creates it (or approves creating it) before Session 2 |
| DNS control | **Kevin** (Cloudflare account) — confirmed |
| Analytics | None today → **Cloudflare Web Analytics** (cookieless, no banner) |
| Contact | **LinkedIn only**, as today. No form, so no Postmark |
| Portfolio section | **Removed for launch** (section + "Checkout More" button). Can return later |
| Launch date | **2026-09-29 (today)** |

## Owner asks

This is Kevin's own site, so there's no client email. These are the things only Kevin can supply:

- [ ] **GSC export:** Performance → Search results → last 16 months → Export (Queries + Pages) → `docs/gsc/`
- [ ] **Logo vector:** the original KD mark as SVG/AI (the mockup uses a hand redraw)
- [ ] **Portrait:** a larger original of `Kevin-Florenz-Daus-1.png`, if one exists
- [ ] **Instagram URL:** the real profile, or drop the link
- [ ] **wp-cli post, Step 2 screenshot:** the real one (the live post repeats Step 1's)
- [ ] **Cloudflare DNS access** for cutover (probably already Kevin's)

## Open questions

Resolved 2026-09-29 (defaults accepted): `lang` stays `en-US` · category archives 301 → `/articles/` · `/feed/` stays 410 (no RSS).
