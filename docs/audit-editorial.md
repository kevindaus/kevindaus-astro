# Audit — "Editorial" redesign (docs/kevinflorenzdaus-redesign-prompt-gpt.md)

Branch `redesign-editorial`, created 2026-11-27 from `redesign` (the "Engineer's notebook" build) to reuse its infrastructure. `main` = the approved Noir rebuild.

## 1. Live site (kevinflorenzdaus.com, WordPress + Elementor, Rank Math)

| Page | Content worth keeping | Problems |
|---|---|---|
| `/` | H1 "PHP Developer / WordPress Developer", the "What I do best" list, 4 service blurbs, 2 testimonials (Mandy Pawley, Stuart Cox) | **Portfolio section is empty** ("Projects Ive Worked On" heading only), and "Checkout More" → `/portfolio/` is a 404 |
| `/about-me/` | Intro (3 paragraphs), rotating titles, 8 roles (UK, Sweden, Australia, Philippines; 2012–current), 4 skill groups, education | Intro rendered 3× (responsive duplicates), extra H1, ~700-char meta description |
| `/articles/` + 4 posts | WP-CLI, WooCommerce shipping, Laravel `saveQuietly`, Debian autocomplete | No meta description on the archive; long titles |
| Contact | LinkedIn only (`/contact/` is a 404) | No direct contact method on the site |
| Test pages | — | `/elementor-*`, `/tteeete/`, `/test-menu/` in the sitemap |

**Verified facts available:** stack (PHP, Laravel, Yii, WordPress, Elementor, Crocoblock, WooCommerce, WP-CLI, TailwindCSS, VueJS, AlpineJS, Bootstrap, jQuery, Git, JavaScript, Linux, DigitalOcean, Cloudways, technical SEO); services (WordPress development, on-page SEO, custom plugins, general web development in Laravel/Yii, maintenance); socials (LinkedIn, Facebook, Twitter, YouTube; the Instagram link points to bare instagram.com). Docker and security hardening come from Kevin's first redesign brief.

**Missing (cannot be derived from the site):** any real project (title, client, screenshot, problem, outcome) · a public email address · a GitHub URL.

## 2. Current codebase (what this redesign keeps)

Astro 7 static on Cloudflare Pages, Tailwind v4, MDX content collections (`blog`, `work`), ClientRouter page transitions, a contact form posting to a Pages Function (`functions/api/contact.ts` → Resend), RSS, build-time OG images, Person-centred JSON-LD, preserved WordPress URLs + the 301/410 map. **No stack change is needed.** The redesign swaps only the design layer (tokens, fonts, components, page layouts) and adds no runtime dependency (one font package).

## 3. Decisions

- **Selected Work uses clearly marked placeholders** (the brief allows them; no real projects exist). Three `placeholder: true` case studies in `src/content/work/` show a "Placeholder" badge and a hatched "Screenshot to be supplied" frame instead of stock imagery. They are noindex, out of the sitemap, and **dropped from production builds** (`npm run build:prod`, or Cloudflare building `main`). With no real case studies, production shows no Work link and no Selected Work section, and the hero CTA becomes "Explore Services".
- **Header nav** = Work, About, Contact (per the brief). Services and Articles are linked from the homepage sections and the footer, so nothing is orphaned.
- **Palette accessibility:** the brief's grey `#777777` is 4.07:1 on the paper, and rust `#D95B35` is 3.47:1. Both are below AA for body text. Secondary text uses `#666666` (5.2:1) and small meta `#6F6F6F` (4.6:1). Rust stays the accent for fills, large type and the focus ring (≥3:1). Small rust text and links use `#B34420` (5.1:1). Primary buttons are charcoal and turn rust on hover (charcoal on rust = 4.7:1).
- **Dark mode kept** from the base branch, re-tuned to the palette. The contact band stays charcoal in both themes.
- **Copy:** the testimonials and About content are verbatim. The hero headline and supporting line are the brief's wording. Everything reworded is marked DRAFT in `src/data/home.ts` and listed for approval.
- **Removed from the base branch:** the "Available for contract work" status (unverified), the drafted "How I work" and timezone sections (unverified claims), and the GitHub + LinkedIn-only footer (verified socials are restored).

## 4. Plan → implemented

Design system (tokens, Space Grotesk / Inter / JetBrains Mono, 12-column editorial grid) → header/footer → homepage (hero, selected work, about, services, stack, testimonials, articles, contact) → work index + case study template (Problem → Approach → Implementation → Outcome) → About, Services, Articles, post, Contact and 404 restyled → motion (word reveal, section entrances, underline nav, 1.03 card zoom, image reveal, fade transitions, reduced motion) → OG cards → QA.
