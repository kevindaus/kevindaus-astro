# Redirect Map

Every live URL, and what happens to it at cutover. Default: same path, trailing slash, no redirect. Every change here gets a rule in `public/_redirects` (Cloudflare Pages) **and** in `vercel.json` (Vercel), and every rule has a row here. 410s: `functions/<path>/index.ts` (Cloudflare) + a `rewrites` entry to `api/gone.ts` (Vercel).
Status: **approved** by Kevin, 2026-09-29.

## Keep (same URL)

| Old URL | New URL | Notes |
|---|---|---|
| `/` | `/` | Home |
| `/about-me/` | `/about-me/` | |
| `/articles/` | `/articles/` | Blog archive |
| — | `/services/` | **New page** (2026-11-12). No live equivalent |
| `/2023/02/03/how-to-set-wordpress-configuration-variable-using-wp-cli/` | same | Date permalinks kept (§10.4) |
| `/2022/04/25/how-to-fix-woocommerce-there-are-no-shipping-options-available/` | same | |
| `/2022/04/14/how-to-save-model-without-triggering-events-in-laravel/` | same | |
| `/2022/04/12/how-to-fix-directory-autocomplete-doesnt-work-on-a-newly-created-user-in-linux/` | same | |

## 301

| Old URL | New URL | Reason |
|---|---|---|
| `/category/how-to/` | `/articles/` | WP category archives (200 on the live site, not in the sitemap). The new archive filters by category in one page |
| `/category/wordpress/` | `/articles/` | ″ |
| `/category/woocommerce/` | `/articles/` | ″ |
| `/category/laravel/` | `/articles/` | ″ |
| `/category/linux/` | `/articles/` | ″ |
| `/author/kevin_daus/` | `/about-me/` | Author archive (already 301s on the live site; point it at the person page) |
| `/2023/`, `/2022/`, `/2022/04/`, `/2023/02/` (date archives) | `/articles/` | Date archives (live `/2023/` already 301s) |
| `/sitemap_index.xml`, `/post-sitemap.xml`, `/page-sitemap.xml` | `/sitemap-index.xml` | Old Rank Math sitemaps (the one GSC knows) → the Astro sitemap index (2026-11-27) |
| `/sitemap.xml` | `/sitemap-index.xml` | Conventional sitemap name (2026-11-27) |
| `/feed/` | `/rss.xml` | Redesign (2026-11-27) adds an RSS feed; the WordPress feed URL (410 on the live site) now points at it. Was a 410 function |
| `/services-v2/` | `/services/` | Unfinished template page with placeholder copy, in the sitemap. Repointed from `/` to the new Services page (2026-11-12) |
| `/thank-you-page/` | `/` | Empty page (no form on the new site) |
| `/wp-content/uploads/2023/02/*.png` (post screenshots) | new asset paths | Images move into `src/assets/`. Redirect only the ones found in GSC / backlinks |

## 410 (gone)

| Old URL | Reason |
|---|---|
| `/elementor-26542/` | Elementor test page (another project's menu), in the sitemap |
| `/elementor-26489/` | Elementor template placeholder ("This is a title") |
| `/tteeete/` | Test page |
| `/test-menu/` | Test page |

## Not applicable

| URL | Notes |
|---|---|
| `/portfolio/` | Already 404. The Portfolio section and its button are removed for launch, so nothing links to it |
| `/contact/`, `/contact/sent/` | Already 404 on the live site. Briefly a form page in the redesign; **removed 2026-11-27** (contact = LinkedIn). Now 301 → `https://www.linkedin.com/in/kevinflorenzdaus/` (public/_redirects) |
| `/work/`, `/work/<slug>/` | New case-study pages. Not built until the first case study is published |
| `/rss.xml`, `/og/*.png` | New: RSS feed and generated Open Graph cards |
