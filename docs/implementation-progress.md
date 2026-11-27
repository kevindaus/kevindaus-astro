# Implementation Progress
**Last Updated:** 2026-11-27 · **Mode:** rebuild

## Current Focus
**Working on:** the **Editorial** redesign is approved (Kevin, 2026-11-27) and merged into `main` (docs/kevinflorenzdaus-redesign-prompt-gpt.md, audit: docs/audit-editorial.md). It replaces Noir. The `redesign` ("Engineer's notebook") and `redesign-editorial` branches are kept for reference.
**Next steps:** Kevin: approve or revise the drafts under "Copy Awaiting Approval" → role + story for the 3 Northbase case studies → public email + GitHub URL → create the GitLab repo and add it as `origin` → `npx wrangler login` → preview deploy → 🛑 production deploy with `npm run build:prod` + domain flip
**Last completed:** Editorial redesign + 3 real Northbase case studies (Loreto Toorak, Noosa Film Society, WordPress maintenance & migration; screenshots only, no outbound links, sensitive dashboard data blurred). Merged into `main` as a single squashed commit, so `main`'s history never contains the earlier, less-redacted dashboard image. Lighthouse mobile 100/100/100/100 on most pages (About 99 performance), CLS 0, astro check 0 errors.

## Page Status
| Old URL | New URL | Status | Notes |
|---|---|---|---|
| / | / | ✅ Built | src/pages/index.astro |
| — (draft) | /homepage-v2/ | ⏭️ Removed (redesign) | Noir draft, superseded by the redesign homepage. Still on `main` |
| /contact/ (404 live) | (301 → LinkedIn) | ⏭️ Removed 2026-11-27 | Contact = LinkedIn only (public/_redirects) |
| — (new) | /work/, /work/<slug>/ | ✅ Built (placeholders) | src/pages/work/[...slug].astro + src/content/work/. Editorial branch: 3 marked placeholder case studies (noindex, not in the sitemap, dropped by production builds). Production builds /work/ only once a real case study exists |
| /feed/ (410 live) | /rss.xml | ✅ Built (301) | src/pages/rss.xml.ts |
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
- 2026-11-27 **Contact form removed** (Kevin): every "Contact" / "Get in touch" link now goes to LinkedIn (`site.contactUrl`, `src/components/ContactButton.astro`), opening in a new tab with a ↗ and a screen-reader note. Deleted: `/contact/`, `/contact/sent/`, `ContactForm.astro`, `src/data/contact.ts`, `functions/api/contact.ts` and the form styles; the Resend setup is no longer needed. `/contact/`, `/contact` and `/contact/sent/` 301 to LinkedIn. The homepage contact intro now reads "…Send me a message on LinkedIn." (DRAFT).
- 2026-11-27 **Third real case study: WordPress maintenance & migration** (`src/content/work/northbase-wordpress-maintenance.mdx`), done **while working with Northbase**. Cover = Kevin's WP Remote dashboard screenshot. **Client site names and Kevin's account email are blurred** in the published image (so Northbase's client list isn't exposed); the unblurred original isn't in the repo. Figures are a dated snapshot from that dashboard (27 Nov 2026: 117 sites up/0 down, 848 backups/0 failed for 21–27 Nov). **Also blurred (Kevin, 2026-11-27):** the Plans figures and usage bar, the Network team-member and client counts, and the Alerts figures (sites-with-alerts badge, hacked/critical/warnings counts). The copy no longer mentions the client count or alert counts. Replaces the last placeholder, so no placeholders remain. New `coverPosition` field (card crop anchor), and case-study covers now render uncropped at their own aspect ratio.
- 2026-11-27 **Second real case study: Noosa Film Society** (`src/content/work/noosa-film-society.mdx`), a Laravel CRM with Mailchimp integration that Kevin worked on **while working with Northbase**. Laravel + Livewire confirmed from the live app. No link (same convention as Loreto Toorak). The CRM is behind a login, so the screenshot is the public member login page (`src/assets/work/noosa-film-society.png`). The Laravel placeholder was removed; one placeholder is left (maintenance & hosting, previews only). **To supply:** Kevin's role, the case-study story, and ideally a screenshot from inside the CRM with member data hidden.
- 2026-11-27 **First real case study: Loreto Toorak** (`src/content/work/loreto-toorak.mdx`), a WordPress (Elementor) site Kevin worked on **while working with Northbase**. Per Kevin: no link to the school's site (`url` left out), screenshot only (`src/assets/work/loreto-toorak.png`, homepage at 1440×900 @2x, captured 2026-11-27). New optional `via` field: cards show "· with Northbase", the case study shows "Worked on with: Northbase", and the work sections note that projects marked "with Northbase" were done while working with Northbase. The WordPress placeholder was removed. Production now builds /work/ with this one project. **To supply:** Kevin's role on the project and the Problem → Approach → Implementation → Outcome story (the page shows only the one-line summary until then), plus the second Northbase website.
- 2026-11-27 **Editorial redesign chosen** (Kevin: "I like this design") and merged into `main`, replacing Noir.
- 2026-11-27 **Editorial redesign** (branch `redesign-editorial`, from `redesign`). Full reasoning: docs/audit-editorial.md. In short: same stack and URLs · header nav Work/About/Contact (Services + Articles via homepage sections and the footer) · **marked placeholder case studies** (no real projects exist on the live site; the brief allows marked placeholders) that production builds exclude · palette adjusted for AA (`#777777` → `#666666`/`#6F6F6F` for text; rust text uses `#B34420`) · footer socials back to the verified LinkedIn/Facebook/Twitter/YouTube · removed the `redesign` branch's unverified "Available for contract work", "How I work" and timezone copy · hero identity line uses the live H1 "PHP Developer / WordPress Developer" · contact = closing CTA band on the homepage + the /contact/ form page.
- 2026-11-27 **Redesign: "Engineer's notebook"** (Kevin's brief, docs/kevinflorenzdaus-redesign-prompt.md), built on branch `redesign`. Kevin's decisions (2026-11-27): **keep current URLs** (/about-me/, WordPress date permalinks; new /work/ + /contact/) · **I draft the new copy, he approves** · **contact form = Pages Function + email API** (Resend; Turnstile optional) · **commit Noir to `main`, redesign on a branch**. Details: docs/design-system.md.
- 2026-11-27 Redesign: **fonts** Anton → Inter Variable (JetBrains Mono kept) · **dark mode** with toggle (follows prefers-color-scheme until chosen) · **Astro View Transitions** (ClientRouter; header/footer persisted; title morphs) · **JS**: ui.ts + reveal.ts + ClientRouter (~7.5 KB gz), plus page scripts for TOC, reading progress, filter and form. Replaces motion.ts, the curtain, film grain and the Noir effects.
- 2026-11-27 Redesign: **nav** = Work (only once a case study exists) · Services · Articles · About, plus a "Get in touch" CTA → /contact/. The brief lists Work/Articles/About; Services is kept because the page exists and the "What I do" rows link into it. The "About Me" nav label is now "About" (page H1 unchanged).
- 2026-11-27 Redesign: **homepage** = hero → What I do (4 rows merging "What I do best" + Services) → Selected work (hidden, no case studies yet) → 3 latest articles → testimonials ("My Client Said", verbatim) + contact. Removed: the H1 "PHP Developer / WordPress Developer" (still in the `<title>`), the "A web developer focusing in…" statement, the meta-description statement, and the 4 service images (stock; files deleted).
- 2026-11-27 Redesign: **footer** = GitHub + LinkedIn only (GitHub hidden until Kevin supplies the URL). Facebook/Twitter/YouTube links removed from the page; they stay in the Person schema `sameAs`.
- 2026-11-27 Redesign: **articles**: frontmatter renamed to the brief's typed schema (`date`, `updated`, `description` (= verbatim archive excerpt), `tags` (= old categories), `cover`, `draft`); `seoTitle`/`seoDescription`/`path` kept. Posts now show reading time, an auto TOC (hand-written `toc` still overrides it for the wp-cli JSX step headings), related articles by tag, and Shiki code blocks (the Terminal component → CodeBlock). The "Read More »" label, share buttons and the post time are dropped. Dates are shown as "3 Feb 2023" (AU/UK) and ISO in lists. New posts without `path` get /YYYY/MM/DD/<file>/.
- 2026-11-27 Redesign: **About**: verbatim content kept (the rotating titles are now a mono line); added a draft experience summary line, a Stack grouping, "How I work" and a timezone table. Portrait kept (a real photo, not stock).
- 2026-11-27 Redesign: **RSS** at /rss.xml; `/feed/` changes from a 410 to a 301 → /rss.xml (functions/feed removed). **OG images** are generated per post at /og/<id>.png (satori + resvg at build), with /og/site.png as the default (replaces og-default.jpg, which is unused but kept in public/).
- 2026-11-27 Redesign: **404** now has one line of prose ("The page you’re after doesn’t exist, or it has moved.").
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
- **Maintenance case study** (2026-11-27, written from the dashboard screenshot): description, role line ("Maintenance, updates, security, backups and migrations"), client line ("Northbase clients", "Agency WordPress fleet, Australia"), and the Problem / Approach / Implementation / Outcome sections. Migration copy rewritten 2026-11-27 from Kevin's description (WP-CLI, Bash, SSH; no screenshots), linking the wp-cli article. **Kevin to confirm:** the migration wording, that the client types ("schools, sporting associations, building companies") may be mentioned. Dashboard figures: only sites up/down and backups remain visible.
- **Editorial branch** (2026-11-27), sources marked in `src/data/home.ts`: hero headline + supporting line (the brief's own wording) · About title "Practical development for sites that have to keep working." + 2 paragraphs reworded from the live intro · 6 service descriptions (outcome-focused rewording of the live service copy) · section headings "Things I’ve built.", "The stack.", "Notes from the work." · contact intro · the stack grouping (`src/data/stack.ts`) · placeholder project copy (to be replaced, not approved) · 404 line · OG card text
- **Redesign** (2026-11-27), all in AU/UK English. Most of it is in `src/data/home.ts`:
  - Hero: eyebrow `// wordpress · laravel · linux` · H1 "I build, maintain and secure WordPress sites for agencies and businesses in Australia and the UK." (the brief's example) · subline "I’m Kevin Florenz Daus, a PHP and WordPress developer based in the Philippines. I’ve worked with teams in the UK and Australia since 2013." · status "Available for contract work" (**confirm it's true at launch**) · CTAs "Get in touch" / "Read articles"
  - "What I do" rows: 4 titles + one-line descriptions
  - Contact: intro "Tell me what you’re building, or what’s broken. I’ll reply by email." · thank-you "Thanks, your message is on its way. / I’ll get back to you by email soon." · field labels · project types (`src/data/contact.ts`) · validation messages · "Or message me on LinkedIn."
  - About (`src/pages/about-me.astro`): "Full-time and contract roles with teams in the United Kingdom, Sweden and Australia since 2013." · Stack grouping (adds **Docker** and **security hardening** from the brief) · "How I work" (3 items: **claims about how Kevin works, which need his check**) · timezone table (offsets are facts; the overlap wording needs his check)
  - SEO for /work/ and /contact/ (`src/data/seo.ts`) · 404 line · OG default card text
  - UI labels: `// what i do`, `// latest articles`, `// on this page`, `// related`, "min read", "filter:", "Previous/Next", "all services/articles/work"
- **Needed from Kevin:** the public email to show beside the form (`site.email`, unset) · GitHub URL (`site.github`, unset) · case studies (copy `src/content/work/example-case-study.mdx`) · Resend account + verified sending domain
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
