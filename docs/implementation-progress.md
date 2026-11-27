# Implementation Progress
**Last Updated:** 2026-11-23 · **Mode:** rebuild

## Current Focus
**Working on:** launch (target today, 2026-09-29)
**Next steps:** Kevin: `npx wrangler login` + create the GitLab repo → first commit → preview deploy → review → 🛑 production deploy + domain flip (docs/deployment.md)
**Last completed:** **Full build**: all 7 pages + 404 in Astro from the approved mockups; redirects/410s/headers verified in `wrangler pages dev`; Lighthouse mobile 100/100/100/100 on every page, CLS 0.

## Page Status
| Old URL | New URL | Status | Notes |
|---|---|---|---|
| / | / | ✅ Built | src/pages/index.astro |
| — (draft) | /homepage-v2/ | 🚧 Draft for review | src/pages/homepage-v2.astro. noindex, not in the sitemap or nav. **Layout + H1 awaiting approval** |
| /about-me/ | /about-me/ | ✅ Built | src/pages/about-me.astro |
| /articles/ | /articles/ | ✅ Built | src/pages/articles.astro |
| — (new) | /services/ | ✅ Built (draft copy) | src/pages/services.astro + src/data/services.ts. **Copy awaiting approval** |
| /2023/02/03/how-to-set-wordpress-configuration-variable-using-wp-cli/ | same | ✅ Built | src/content/blog/*.mdx |
| /2022/04/25/how-to-fix-woocommerce-there-are-no-shipping-options-available/ | same | ✅ Built | src/content/blog/*.mdx |
| /2022/04/14/how-to-save-model-without-triggering-events-in-laravel/ | same | ✅ Built | src/content/blog/*.mdx |
| /2022/04/12/how-to-fix-directory-autocomplete-doesnt-work-on-a-newly-created-user-in-linux/ | same | ✅ Built | src/content/blog/*.mdx |
| /services-v2/ | (301 → /services/) | ✅ Built (301) | Repointed 2026-11-12 |
| /thank-you-page/ | (301 → /) | ✅ Built (301) | public/_redirects |
| /elementor-26542/, /elementor-26489/, /tteeete/, /test-menu/ | (410) | ✅ Built (410) | functions/ |
| /category/*/, /author/kevin_daus/, date archives | (301) | ✅ Built (301) | public/_redirects |
Legend: 🔍 Researched · ✏️ Drafting · 🚧 Building · ✅ Built · ⏭️ Removed

## Decisions & Divergences
- 2026-11-23 **Homepage v2 draft at /homepage-v2/** (Kevin's request: same content, a better layout, refocused as "web developer with WordPress expertise"). Uses the Noir system as it stands. Changes from /: H1 refocused · the hero's decorative tech line is now a real "Stack" list · the statement is the meta description's belief sentence, so it no longer repeats the terminal line · services split into WordPress (featured card + 3) and PHP / Laravel / Yii (wide card) · new Experience band listing the 5 WordPress roles from /about-me/ (jobs moved to `src/data/experience.ts`, shared with About) · articles shown as cards with WordPress posts first · testimonials moved last so the proof sits right before the CTA. Lighthouse mobile 100/100/100 (SEO 69 only because of the intentional noindex). **Hero banner** (2026-11-23): Kevin's noir portrait (`src/assets/people/kevin-noir-banner.png`) is now a full-bleed background, CSS-masked into the page (right 62% on desktop, top of the hero on mobile). It replaces the Portrait/Fig. 01 card. LCP 1.7s, CLS 0. If approved: replace index.astro with it, then delete the route and the sitemap filter in astro.config.mjs.
- 2026-11-12 **New /services/ page** (Kevin's request): all 5 "What I do best" services, verbatim homepage leads + DRAFT expansions. Added to the nav (Home · About Me · Services · Articles) and footer. Homepage service cards now link to `/services/#<slug>`, plus an "All services" link. `/services-v2/` now 301s to `/services/` instead of `/`. Services data moved to `src/data/services.ts` (shared by both pages).
- 2026-09-29 **Home: meta description shown as visible copy** (statement under "A bit about me"). Verbatim from the live `<meta name="description">`.
- 2026-09-29 **Home: latest-articles list added** (verbatim titles/dates/excerpts from `/articles/`).
- 2026-09-29 **"Need a hand on your project?" CTA** (from `/articles/`) added to the end of every page.
- 2026-09-29 **About: intro shown once** (the live page renders it 3× for different screen sizes). Its H1 is demoted to H2 (one H1 per page).
- 2026-09-29 **About: rotating titles** (PHP Programmer / WordPress Developer / Loves Laravel) rendered as a ticker.
- 2026-09-29 **wp-cli post: duplicate in-content H1 removed**. Steps 4–5.1 commands also shown as copyable code blocks (the text is on the live page); screenshots kept.
- 2026-09-29 **Archive: "No Comments" meta dropped** (no comments on the new site). Category filter added (wayfinding).
- 2026-09-29 **Post time shown**: only the Laravel post's "5:21 am" was seen rendered on the live site; the other three are derived from `datePublished` (UTC).
- 2026-09-29 **Logo**: rendered as an inline SVG redraw of `KD.png` (black circle, white KD) until the vector arrives.
- 2026-09-29 **Fonts changed** (Libre Baskerville / Source Sans Pro → Anton / JetBrains Mono) as part of the elevate direction.
- 2026-09-29 **Typos kept verbatim** ("optimices", "varilables", "Ive", "ive", "Thats it!") per §10.2. Kevin can approve fixes; each fix would be logged here.

- 2026-09-29 **Portfolio section removed for launch** (the live section is empty; "Checkout More" → `/portfolio/` is 404). Kevin's decision. The heading "Projects Ive Worked On" and the button are not migrated.
- 2026-09-29 **Hosting on Cloudflare Pages**, not the Vercel default: DNS is already on Cloudflare (Kevin's decision).

- 2026-09-29 Session 1 gate passed: page list + redirect map approved; `lang` stays en-US; category archives → /articles/; no RSS.

- 2026-09-29 **About: "NOW" tag from the mockup replaced by a plain square marker**. "NOW" isn't live copy (the date already says CURRENT).
- 2026-09-29 **Instagram footer link omitted** until a real profile URL exists (the live link points to bare instagram.com).
- 2026-09-29 **About meta description** = the first paragraph of the live ~700-char description (the part Google shows). `/articles/` description = its visible subtitle (the live page has none).
- 2026-09-29 **wp-cli post: live H4s ("Required Tools:", "Before we can…") rendered as styled paragraphs, and steps as H2** for a valid heading order. Same words, same look.
- 2026-09-29 **404 page**: status code + existing nav labels only (no new prose).
- 2026-09-29 **Motion: vanilla engine instead of Motion One** (§8). The approved mockup's engine is ported 1:1 (~4 kB, no dependency).
- 2026-09-29 **Decorative UI labels from the approved design**: "Fig. 01/02", "No. 01–04", "Scroll", "~/kevin · zsh · whoami", "Filter/All", "Share", "On this page", "Copy". Wayfinding/decoration, not content.
- 2026-09-29 **npm audit**: 0 production vulnerabilities; 3 moderate in `wrangler`'s bundled `undici` (dev-only deploy tool). Not force-fixed.

## Copy Awaiting Approval
- **/homepage-v2/** (2026-11-23): About statement "Not just fancy colours and dancing text. A website that speaks for your business." (Kevin chose option 3; replaces the visible "I believe that websites are not just fancy colours…" sentence; the meta description is unchanged) · About intro "Hi, I'm Kevin Florenz Daus, a WordPress and Laravel developer." (replaces "…I'm a PHP Programmer and WordPress Developer.") + an "About Me →" button under the socials · H1 "WordPress Developer and Laravel when it needs more" (chosen by Kevin 2026-11-23 from 5 options; replaces the first draft "Web Developer with WordPress Expertise"; the live H1 is "PHP Developer / WordPress Developer") · UI labels "Stack", "[A] WordPress", "[B] PHP / Laravel / Yii" (the last is the About skill name, verbatim) · the stack list (WordPress, Elementor, Crocoblock, WooCommerce, WP-CLI, Laravel, Yii) names only tools that already appear in site copy or posts. Everything else is verbatim.
- **/services/** (2026-11-12) — drafted at Kevin's request ("a bit expanded copy of what's in the homepage"), only from facts already on the live site. In `src/data/services.ts`:
  - `body` paragraphs (2 per service) and `included` lists for all 5 services
  - the plugin service's lead is the About page's sentence, verbatim (the homepage lists the service with no description)
  - SEO title + description in `src/data/seo.ts` → `services`
  - UI labels: "Services" (nav + H1), "All services" (homepage link), "What’s included", "Related article"

## Blockers (external)
- Logo vector · GSC export · Instagram URL · wp-cli Step 2 screenshot · GitLab repo

## Known Issues & Tech Debt
1. Live `/portfolio/` is 404 but linked from the homepage (the section is dropped on the new site).
2. The live sitemap lists test pages.

## Session Log
### 2026-09-29: Build (Sessions 2–4 compressed)
- Astro 7.3 scaffold, Tailwind v4 tokens, Fontsource fonts (preloaded), SeoHead + Person @graph, BlogPosting + BreadcrumbList + ItemList schema
- Pages: home, about-me, articles, 4 posts (MDX collection at WP date URLs), 404; OG default card + favicons generated from the KD mark
- public/_redirects (301s), functions/ (410s), public/_headers (security + preview noindex); verified with `wrangler pages dev`
- QA: verbatim word diff vs legacy/raw (fixed MDX smart quotes), Playwright desktop/mobile (no overflow, no errors), Lighthouse mobile all 100s after fixing footer contrast, heading order and font-swap CLS

### 2026-09-29: Kickoff, mockups, design approval
- Probed the site by hand (no probe script on this machine) → docs/kickoff.md
- Created `UI/` (gitignored) and captured the live pages into `legacy/raw/`
- Mockups: home v1 (Ink & Lime), v2 (Paper & Lime), v3 (Navy & Gold, the existing brand), v4 (Noir) → Noir chosen; built about, articles and 4 posts in the same style (`UI/_gen/` generator)
- Added the motion layer (curtain, word reveals, image wipes, blinds drift, velocity ticker, typewriter, reading progress; reduced-motion safe). Tested in real Chrome via Playwright
- Graduated: docs/design-system.md, docs/design/approved-{home,about,articles,post}-{1440,390}.png
- Wrote content-inventory, redirects (proposed), seo (parity capture)
