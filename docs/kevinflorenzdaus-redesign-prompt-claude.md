# ui-ux-pro-max Prompt — kevinflorenzdaus.com Redesign

Redesign my personal portfolio site **kevinflorenzdaus.com** as a new **Astro + Tailwind CSS** build. The current site is WordPress/Elementor. Keep all existing content (pages, articles, testimonials), but replace the design and structure completely.

---

## Who I am / audience

- Kevin Florenz Daus, PHP / WordPress developer based in the Philippines
- Stack: WordPress (custom plugins, Elementor, Crocoblock), Laravel, Yii, PHP, Linux, Docker, technical SEO, server management and security hardening
- Audience: agencies and businesses in Australia and the UK hiring a contractor to build, maintain and secure WordPress sites
- Goal: come across as a calm, trustworthy senior developer, not a template agency. Main conversions: contact enquiries and article readership.

---

## Style direction: "Engineer's notebook"

Minimal, typography-led and editorial, with subtle technical accents. It should read like a senior developer's working notes.

- **Background:** warm off-white `#FAFAF7` (light), `#0A0A0B` (dark)
- **Text:** near-black `#18181B` / zinc scale for secondary text
- **Single accent:** deep teal `#0F766E` (offer signal orange `#EA580C` as an alternative)
- No gradients, no stock photos, no heavy shadows, no boxed card overload. Use thin 1px dividers and generous whitespace instead.
- **Headings/body:** Inter or Geist Sans
- **Mono accent:** JetBrains Mono or Geist Mono for labels, dates, tags, meta lines and small section eyebrows (e.g. `// wordpress · laravel · linux`)
- **Widths:** reading column ~680px; wide sections (project grid) ~1100px
- **Dark mode:** supported from day one via Tailwind `dark:` classes, with a toggle that respects `prefers-color-scheme`

---

## Motion design

Motion should feel **precise, quiet and purposeful**, like a well-tuned tool rather than a showcase. It supports reading and orientation; it never decorates for its own sake.

### Principles

1. **Purpose first.** Every animation must explain something: where content came from, what changed, or what is interactive.
2. **Fast and subtle.** Short durations and small distances. Nothing bounces, spins or overshoots.
3. **Content is never blocked.** No animation delays reading, scrolling or clicking. Content is visible and usable if JS fails.
4. **CSS first.** Use CSS transitions, `@keyframes`, the Web Animations API and Astro View Transitions. No heavy animation libraries. If a library is truly needed, use Motion One (small) and load it only on pages that need it.
5. **Reduced motion is respected everywhere.** Under `prefers-reduced-motion: reduce`, replace movement with instant changes or simple opacity fades of ≤100ms, and disable all scroll-driven and looping effects.

### Motion tokens

Define these as CSS variables and Tailwind theme extensions:

| Token | Value | Use |
|---|---|---|
| `--duration-instant` | 100ms | Colour/state changes, focus rings |
| `--duration-fast` | 150ms | Hovers, button presses, underlines |
| `--duration-base` | 250ms | Reveals, dropdowns, toggles |
| `--duration-slow` | 400ms | Page transitions, hero entrance |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Elements entering |
| `--ease-in` | `cubic-bezier(0.7, 0, 0.84, 0)` | Elements leaving |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Movement between states |
| `--distance-sm` | 4px | Hover lifts, nudges |
| `--distance-md` | 12px | Scroll reveals |
| `--stagger` | 40–60ms | Delay between list items |

Animate only `transform` and `opacity` (plus colour where needed) to stay on the compositor and avoid layout shift. Keep CLS at 0.

### Page-level motion

- **Page transitions:** Astro View Transitions (`<ClientRouter />`). Default cross-fade at `--duration-base`. Shared-element morphs for:
  - Article list item title → article page title (`transition:name`)
  - Case study title/thumbnail → case study page header
  - Header and footer persist (`transition:persist`) so they never flash
- **Hero entrance (homepage only, first load only):** staggered fade-up of the eyebrow, headline, subline and CTAs (`--distance-md`, `--duration-slow`, `--stagger` 60ms). Skip on back/forward navigation and on later visits in the session.
- **Status indicator:** the "● Available for contract work" dot has a slow, soft pulse (opacity 1 → 0.4, 2.4s loop). Disabled under reduced motion.

### Scroll motion

- **Section reveals:** sections and list items fade up `--distance-md` once as they enter the viewport (IntersectionObserver or CSS `animation-timeline: view()` with a fallback). Run once only; never re-animate on scroll back up.
- **Lists:** article and project lists stagger children by `--stagger`, capped at 6 items so long lists don't feel slow.
- **Reading progress bar:** thin 2px accent bar at the top of article pages, driven by `animation-timeline: scroll()` with a lightweight JS fallback.
- **Table of contents:** the active heading highlights with a sliding indicator (`--duration-base`, `--ease-in-out`) as the reader scrolls.
- **Header:** on scroll down, the header gains a hairline border and a subtle backdrop blur (`--duration-fast`). Optionally hide on scroll down and reveal on scroll up on mobile only.
- No parallax, no scroll-jacking, no smooth-scroll overrides beyond `scroll-behavior: smooth` for in-page anchor links (disabled under reduced motion).

### Micro-interactions

- **Links:** underline draws in from left to right on hover (`background-size` or `scaleX`, `--duration-fast`).
- **Buttons:** primary button darkens slightly and lifts `--distance-sm` on hover; presses down to `scale(0.98)` on active. Arrow icons in CTAs nudge right 3px on hover.
- **Article list items:** the title shifts to the accent colour and a "→" fades in and slides 4px; no card lift.
- **Case study items:** thumbnail scales to 1.02 inside a clipped frame; title shifts to accent.
- **Theme toggle:** sun/moon icon cross-rotates (≤90°) and fades at `--duration-base`; the colour theme changes via a View Transition circular reveal from the toggle where supported, with an instant swap as fallback.
- **Code blocks:** "Copy" button shows a check icon and "Copied" for 1.5s with a fast fade.
- **Mobile menu:** slides down/fades in at `--duration-base` with `--ease-out`, links staggered by 30ms; closes with `--ease-in` at `--duration-fast`.
- **Focus states:** visible accent focus ring that appears instantly (no transition delay on focus).

### Form motion

- Field focus: border colour transitions to accent at `--duration-fast`.
- Validation errors: message fades in below the field; no shaking.
- Submit: button shows an inline spinner, then morphs to a success state with a check icon; the form collapses to a short thank-you message with a fade.

### Motion deliverables

- Motion token file (CSS variables + Tailwind config extension)
- A `motion.css` utility layer (e.g. `.reveal`, `.reveal-stagger`, `.link-underline`) and a tiny, optional `reveal.ts` IntersectionObserver script (<1KB)
- A reduced-motion strategy documented per animation
- A short motion spec table listing each animation: trigger, property, duration, easing, reduced-motion behaviour

---

## Homepage structure (5 sections)

1. **Hero:** one-line positioning statement, e.g. *"I build, maintain and secure WordPress sites for agencies and businesses in Australia and the UK."* Mono status line: `● Available for contract work`. Two CTAs: **Get in touch** (primary), **Read articles** (secondary).
2. **What I do:** 3–4 compact rows (WordPress builds, maintenance & security, Laravel/PHP development, technical SEO), each one line with an optional small icon. Merge the old "What I do best" and "Services" sections into this.
3. **Selected work:** 3–6 case study cards/rows showing client type, problem, what I did and the outcome. Link to a full `/work` page with individual case study pages.
4. **Latest articles:** plain list of the 3 newest posts showing date (mono), title and reading time. Link to `/articles`.
5. **Testimonials + contact:** pull-quote style testimonials (Mandy Pawley, Marketing Manager at Tindo Solar; Stuart Cox, Digital Consultant / Creative Director), then a clear contact block with a form plus email and LinkedIn.

**Footer:** minimal nav, GitHub + LinkedIn only, small "Built with Astro" note, copyright.

---

## Other pages

- **/about:** short bio, experience with AU/UK clients (contract and full-time), stack, working style, timezone (UTC+8) and overlap with AU/UK hours
- **/articles:** list view with tag filtering (filter changes animate with a quick fade/reflow); no heavy cards
- **/articles/[slug]:** article template with title, date, reading time, tags, auto table of contents (sticky on desktop), reading progress bar, styled code blocks with copy button (Shiki), callout/note components, related articles at the end (for internal linking), prev/next links, auto-generated Open Graph image per post
- **/work** and **/work/[slug]:** case study template (Context → Problem → What I did → Outcome → Stack)
- **/contact:** simple form (name, email, project type, message) with clear success/error states
- **404** page in the same style

---

## UX requirements

- Mobile-first, fully responsive; single nav component (no duplicated menus)
- Sticky minimal header with logo "KD", nav (Work, Articles, About), contact CTA and dark-mode toggle
- **Accessibility:** WCAG 2.1 AA — contrast, visible focus states, skip link, semantic landmarks, keyboard navigable, `prefers-reduced-motion` honoured throughout
- **Performance:** Lighthouse 95–100 on all categories, near-zero client JS, CLS 0, optimised images via `astro:assets`, self-hosted fonts with `font-display: swap`
- **SEO:** per-page meta and canonical tags, JSON-LD (Person, WebSite, Article, BreadcrumbList), sitemap, RSS feed for articles
- **Content:** articles and case studies as Astro content collections (Markdown/MDX) with typed frontmatter (`title`, `description`, `date`, `updated`, `tags`, `cover`, `draft`) so new articles can be added continuously

---

## Deliverables

1. **Design system summary:** colour tokens (light/dark), type scale, spacing scale, radius, border and component styles, written as a Tailwind config / CSS variables
2. **Motion system:** motion tokens, utility classes, reveal script and the motion spec table (see Motion design section)
3. **Component list with states:** header, footer, button variants, article list item, case study item, testimonial, callout, code block, form fields, tag, theme toggle, mobile menu, reading progress bar, table of contents
4. **Page layouts:** home, article, article index, case study, about and contact
5. **Implementation** in Astro + Tailwind with clean, reusable components
6. **Notes** on any anti-patterns avoided (including motion anti-patterns) and the reasoning behind key choices

**Spelling:** Australian/UK English throughout the copy.
