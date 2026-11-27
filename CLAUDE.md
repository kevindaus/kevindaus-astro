# Kevin Florenz Daus — Rebuild of kevinflorenzdaus.com from WordPress

Mode: rebuild. Playbook: `~/.config/northbase/playbooks/astro-playbook.md` (master; read the relevant section when starting a new phase) · **built against 2026.09.29** · last audited: not yet.
A static Astro rebuild of Kevin's WordPress/Elementor personal site in the approved "Noir" design. Every word is verbatim, every URL is kept, and SEO is at parity or better.

## Session Checklist
**Start:** read docs/implementation-progress.md → Current Focus · `git status` / `git branch` · curl the live page before touching it · check docs/redirects.md before any URL change.
**End:** update Current Focus + the page table · update the redirect map if routes changed · commit.

## Source of Truth
- Live site: https://kevinflorenzdaus.com — the verbatim content source until it's decommissioned. `legacy/` is reference only.
- Metadata: docs/seo.md → src/data/seo.ts (pages) + post frontmatter `seoTitle`/`seoDescription` · Person/nav/socials: src/data/site.ts
- Redirects: docs/redirects.md → `public/_redirects` (301s) + `functions/*` (410s)
- Design: docs/design-system.md + docs/design/approved-*.png (mockups in `UI/`, gitignored; `UI/home-v4.html` is the shell)
Never invent content, NAP, metrics or meta. Missing → ask.

## Stack
Astro 7 static · Tailwind v4 (`@theme` tokens in src/styles/global.css) · MDX (posts) · Fontsource: Anton + JetBrains Mono (variable) · vanilla motion engine `src/scripts/motion.ts` (no Motion One; see Decisions) · no forms (contact = LinkedIn) · Cloudflare Web Analytics · Cloudflare Pages `kevinflorenzdaus-com` · GitLab `northbase/kevinflorenzdaus-com` · Node 22 (.nvmrc)

## Rules
- Read components before writing; name them for what they are.
- Zero JS by default. The only scripts are motion.ts, the Terminal copy button and the archive filter.
- One <h1>; alt on every image; width/height on every image (astro:assets).
- All <head> output goes through SeoHead in BaseLayout. Schema via buildSchema() — Person-centred `/#person`.
- Posts live in src/content/blog/*.mdx at their WordPress URL via frontmatter `path` (/YYYY/MM/DD/slug/). `markdown.smartypants` is off so punctuation stays verbatim.
- URLs: trailing slash always; every change = 301 in public/_redirects (or a 410 function) + a row in docs/redirects.md.
- Animations need a reason + a prefers-reduced-motion guard (global.css bottom block). Only transform/opacity/clip-path/filter.
- Divergences from the source are logged in implementation-progress.md.
- Ask before: prod deploy, DNS, removing a preview gate, Search Console submissions.

## Targets
Lighthouse mobile Perf/A11y/BP ≥ 95, SEO 100 (all pages at 100/100/100/100 on 2026-09-29) · LCP < 2.5s, CLS < 0.1, INP < 200ms · WCAG 2.2 AA.
Definition of done: playbook §15.

## Dev
`npm run dev` (4321) · `npm run build` · `npm run preview` · `npx astro check` · `npx wrangler pages dev dist --port 8788` (redirects/410s/headers as Cloudflare serves them) ·
`npx lighthouse http://localhost:4321 --view` · port clash: `lsof -i :4321 -t | xargs kill -9`

## Deployment
docs/deployment.md. `main` → production, other branches → preview (`<branch>.kevinflorenzdaus-com.pages.dev`, noindex via _headers). Git-connected builds: set `NODE_VERSION=22`. Rollback: Pages → Deployments → promote the previous one.

## Project Gotchas
- Cloudflare `_redirects` can't send 410 → removed URLs are Pages Functions (`functions/<path>/index.ts` → `_lib/gone.ts`). Deploy from the repo root so `functions/` ships.
- Critical fonts are preloaded in BaseLayout (the `?url` imports resolve to the same hashed files as the CSS). Removing the preloads brings back font-swap CLS on long post titles.
- The footer's giant name is a CSS `content: attr(data-text)` pseudo-element on purpose: as real text, axe flags its decorative contrast.
- Headline word-splitting happens client-side (motion.ts). Keep `.display` H1/H2s free of interactive children.

## Docs
implementation-progress · kickoff · seo · redirects · content-inventory · design-system · deployment (all in docs/)
