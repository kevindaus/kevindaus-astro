# Kevin Florenz Daus — Rebuild of kevinflorenzdaus.com from WordPress

Mode: rebuild. Playbook: `~/.config/northbase/playbooks/astro-playbook.md` (master; read the relevant section when starting a new phase) · **built against 2026.09.29** · last audited: not yet.
A static Astro rebuild of Kevin's WordPress/Elementor personal site in the approved **"Editorial"** design (2026-11-27; brief docs/kevinflorenzdaus-redesign-prompt-gpt.md, audit docs/audit-editorial.md). It replaced "Noir" (commit 884d192). Branch `redesign` keeps the unused "Engineer's notebook" alternative. Every word is verbatim, every URL is kept, and SEO is at parity or better.

## Session Checklist
**Start:** read docs/implementation-progress.md → Current Focus · `git status` / `git branch` · curl the live page before touching it · check docs/redirects.md before any URL change.
**End:** update Current Focus + the page table · update the redirect map if routes changed · commit.

## Source of Truth
- Live site: https://kevinflorenzdaus.com — the verbatim content source until it's decommissioned. `legacy/` is reference only.
- Metadata: docs/seo.md → src/data/seo.ts (pages) + post frontmatter `seoTitle`/`seoDescription` · Person/nav/socials: src/data/site.ts
- Redirects: docs/redirects.md → `public/_redirects` (301s) + `functions/*` (410s) on Cloudflare; `vercel.json` + `api/gone.ts` on Vercel (keep both in step)
- Design: docs/design-system.md (tokens, components, motion spec). docs/design/approved-*.png + `UI/` are the superseded Noir mockups
- Copy: src/data/home.ts (homepage copy, sources marked) · src/data/stack.ts · src/data/testimonials.ts · src/data/services.ts · case studies in src/content/work/
Never invent content, NAP, metrics or meta. Missing → ask. Case-study screenshots: blur client names, emails and internal figures before committing (never commit an unredacted original).

## Stack
Astro 7 static + ClientRouter (View Transitions) · Tailwind v4 (semantic colour vars + `@theme` in src/styles/global.css; motion tokens in src/styles/motion.css; class-based dark mode) · MDX (posts, case studies) · Shiki · Fontsource: Space Grotesk + Inter + JetBrains Mono (variable) · satori + resvg (OG images at build) · @astrojs/rss · no forms (every Contact / "Get in touch" link → LinkedIn via `site.contactUrl` / `ContactButton`) · Cloudflare Web Analytics · Cloudflare Pages `kevinflorenzdaus-com` · GitLab `northbase/kevinflorenzdaus-com` · Node 22 (.nvmrc)

## Rules
- Read components before writing; name them for what they are.
- Near-zero JS. The only scripts are the ClientRouter, src/scripts/ui.ts (+ reveal.ts), and the page scripts for the TOC, reading progress and article filter. Page scripts init on `astro:page-load` and must be safe to run more than once.
- One <h1>; alt on every image; width/height on every image (astro:assets).
- All <head> output goes through SeoHead in BaseLayout. Schema via buildSchema() — Person-centred `/#person`.
- Posts live in src/content/blog/*.mdx at their WordPress URL via frontmatter `path` (/YYYY/MM/DD/slug/). `markdown.smartypants` is off so punctuation stays verbatim.
- URLs: trailing slash always; every change = 301 in public/_redirects (or a 410 function) + a row in docs/redirects.md.
- Animations need a reason, use the motion tokens, and get a row in the docs/design-system.md spec table + a reduced-motion rule (motion.css bottom block). Only transform/opacity (+ colour).
- Divergences from the source are logged in implementation-progress.md.
- Ask before: prod deploy, DNS, removing a preview gate, Search Console submissions.

## Targets
Lighthouse mobile Perf/A11y/BP ≥ 95, SEO 100 (all pages at 100/100/100/100 on 2026-09-29) · LCP < 2.5s, CLS < 0.1, INP < 200ms · WCAG 2.2 AA.
Definition of done: playbook §15.

## Dev
`npm run dev` (4321) · `npm run build` (previews) · `npm run build:prod` (production) · `npm run preview` · `npx astro check` · `npm run pages:dev` (wrangler.toml; redirects/410s/headers as Cloudflare serves them, port 8788) · `npm run deploy:preview` · `npm run deploy:prod` (🛑 approval) ·
`npx lighthouse http://localhost:4321 --view` · port clash: `lsof -i :4321 -t | xargs kill -9`

## Deployment
docs/deployment.md + wrangler.toml. `main` → production, other branches → preview (`<branch>.kevinflorenzdaus-com.pages.dev`, noindex via _headers). Git-connected builds: set `NODE_VERSION=22`. Rollback: Pages → Deployments → promote the previous one.

## Project Gotchas
- Cloudflare `_redirects` can't send 410 → removed URLs are Pages Functions (`functions/<path>/index.ts` → `_lib/gone.ts`). Deploy from the repo root so `functions/` ships.
- Critical fonts are preloaded in BaseLayout (the `?url` imports resolve to the same hashed files as the CSS). Removing the preloads brings back font-swap CLS on long post titles.
- ClientRouter swaps `<html>` attributes on navigation: the inline head script in BaseLayout re-applies `.dark` and `data-js` on `astro:after-swap`. Anything stored on `<html>` must be re-applied there.
- /work/ and the Work nav link only exist once a non-draft case study is published. `placeholder: true` case studies count on previews but are dropped from production builds: `npm run build:prod` (SITE_ENV=production) or a Pages build of `main`. Never deploy `main` from a plain `npm run build`.
- OG images: satori misplaces padded 100%-height boxes; the card uses an absolute inner frame (src/pages/og/[slug].png.ts).

## Docs
implementation-progress · kickoff · seo · redirects · content-inventory · design-system · deployment (all in docs/)
