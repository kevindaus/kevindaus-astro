# Design System — "Noir"

**Status:** approved by Kevin, 2026-09-29 (playbook §14 Path A, elevate).
**Source mockups** (gitignored playground, `UI/`): `home-v4.html` (the shell the other pages are built from) · `about-v1.html` · `articles-v1.html` · `post-*-v1.html` (4 posts, one template).
**Approved screenshots** (committed): `docs/design/approved-{home,about,articles,post}-{1440,390}.png`. Captured with reduced motion, so they show where every animation ends up.

This file, not the HTML, is what the Astro build uses. Every value below becomes a Tailwind v4 theme token. No arbitrary `text-[#…]` in components.

---

## 1. Direction

Film noir, strictly monochrome. Black stage, bone-white type, greys for hierarchy. There's no accent colour: emphasis comes from **inverting** (bone panel, black text), **scale** (huge condensed display type) and **light** (spotlight, venetian-blind shadows, grain).
Two faces only: a condensed poster display (Anton) and a monospace (JetBrains Mono) for everything else. The monospace font points to the code work without needing illustrations.

Rejected directions, for the record: v1 dark + lime, v2 light + lime, v3 navy + gold (the existing brand colours).

## 2. Palette

| Token | Hex | Use |
|---|---|---|
| `noir` | `#0A0A0A` | Page background, text on bone panels |
| `noir-900` | `#111111` | Alternate section band (Portfolio, Experience) |
| `noir-800` | `#1A1A1A` | Portrait backdrop, inline code bg |
| `noir-700` | `#262626` | Reserved (hover surfaces) |
| `bone` | `#EDEBE6` | Primary text, primary button, inverted panels (ticker, testimonials) |
| `bone-200` | `#D9D6CF` | Reserved (pressed state on bone) |
| `smoke` | `#8C8C8C` | Labels, meta, secondary text on dark |
| `ash` | `#5C5C5C` | Secondary text on bone panels |
| `line` | `rgba(255,255,255,.15)` (`white/15`) | Rules, card borders, grid lines on dark |
| `line-ink` | `rgba(10,10,10,.2)` (`noir/20`) | Rules on bone panels |

Body copy on dark uses bone at reduced opacity: `bone/80` for lead text, `bone/75` for card body, `bone/65` for excerpts. Decorative-only values (`white/15` for "Case 01" placeholders, `white/[.07]` for the footer name, `white/25` for the education years) are never used for meaningful text.

**Contrast (measured, WCAG 2.2):**

| Pair | Ratio | |
|---|---|---|
| bone on noir | 16.6:1 | AAA |
| bone/80 · /75 · /65 on noir | 10.7 · 9.4 · 7.2 | AAA |
| smoke on noir / noir-900 | 5.9 / 5.6 | AA |
| noir on bone | 16.6:1 | AAA |
| ash on bone | 5.6:1 | AA |

**Focus:** `outline: 2px solid bone; outline-offset: 3px` on `:focus-visible`, everywhere.
**Links:** in prose, bone text with a 1px underline, offset 4px, thickening to 2px on hover. In UI, an underline wipes in from the left (`.link-u`).

## 3. Typography

| Role | Font | Fontsource package | Licence |
|---|---|---|---|
| Display | **Anton** 400 (only weight), always uppercase | `@fontsource/anton` (not variable) | OFL |
| Everything else | **JetBrains Mono** 300–700 + italic 400 | `@fontsource-variable/jetbrains-mono` | OFL |

Both are self-hosted in the build (no Google Fonts CDN in production, playbook §8). Display text is set `uppercase`, `letter-spacing: .005em`, `line-height: .88` unless noted.

**Scale** (fluid; `clamp(min, vw, max)`):

| Token | Size | Line-height | Where |
|---|---|---|---|
| `display-page` | `clamp(5rem, 18vw, 17rem)` | .8 | Inner-page H1 ("ABOUT ME", "ARTICLES") |
| `display-hero` | `clamp(3.75rem, 9.5vw, 9.25rem)` | .88 | Home H1 |
| `display-cta` | `clamp(3.5rem, 12vw, 11rem)` | .88 | "Need a hand on your project?" |
| `display-section` | `clamp(3rem, 8vw, 7.5rem)` | .88 | Section H2 |
| `display-statement` | `clamp(2.75rem, 6.5vw, 6rem)` | 1.22 (room for the bone highlight) | About statement |
| `display-post` | `clamp(2.75rem, 7vw, 6.5rem)` · long titles (>90 chars) `clamp(2.25rem, 5vw, 4.5rem)` | .92 / .98 | Post H1 |
| `display-card` | 2.25rem → 3rem (`text-4xl sm:text-5xl`) | 1 | Card/job H3, testimonial quotes |
| `display-row` | 1.875rem → 2.25rem (`text-3xl sm:text-4xl`) | 1.02 | Article list titles |
| `lead` | 1.125rem (18px) | 1.65 | Intro paragraphs |
| `body` | 15px site / **16px in prose** | 1.65 / 1.85 | Mono body |
| `small` | 14px | 1.6 | Excerpts, captions |
| `label` | 11–12px, uppercase, tracking `.25–.3em` | 1 | Eyebrows (`[01] A BIT ABOUT ME`), meta, nav |
| `button` | 12px bold, uppercase, tracking `.25em` | 1 | All buttons |

Prose measure: `max-width ≈ 68ch` (8/12 columns at 1440). One `<h1>` per page. The live site's extra H1s are demoted to H2 (logged).

## 4. Spacing & layout

- **8pt grid.** Section padding: `py-28` (7rem) on mobile, `py-40` (10rem) from `sm`. Page heroes: `pt-32 sm:pt-40`.
- **Gutters:** `px-4` (16px) on mobile, `px-6` from `sm`.
- **Containers:** full-bleed bands (ticker, CTA, section backgrounds) · **content** `max-w-7xl` (80rem) on a 12-col grid · **prose** 8 of 12 cols (with a 3-col sticky TOC when a post has steps).
- **Borders over shadows.** Cards are 1px `line` boxes that share edges (`border-t border-l` on the grid + `border-r border-b` on cells). The only shadow is the hard offset "print" shadow on terminal windows: `10–12px 10–12px 0 rgba(0,0,0,.6)`.
- **Radius: 0.** Everything is square, except the circular logo mark.
- Nav is fixed, 64px tall, `noir/80` with backdrop blur, and has a bottom rule.

## 5. Components

| Component | Purpose | Notes |
|---|---|---|
| `SiteHeader` | Logo mark + name, 3 nav links, Contact button, mobile menu | Active link in bone, others smoke. Hides on scroll-down, returns on scroll-up |
| `LogoMark` | KD monogram, inline SVG | Black circle, white KD, thin light ring (`bone/25`). Redrawn from `KD.png`: **swap for the original vector when supplied** |
| `Curtain` | Page-load/leave shutter | `aria-hidden`; not rendered for reduced motion |
| `Eyebrow` | `[NN] LABEL` or `—— LABEL` | Numbered section labels |
| `DisplayHeading` | H1/H2 in Anton, word-mask reveal | Levels are set by props; the look stays the same |
| `Button` | Primary (bone fill) · Secondary (1px outline) | Arrow `→` nudges on hover; primary is magnetic on fine pointers |
| `Portrait` | Grayscale photo, blinds overlay, vignette, "Fig. 0N" caption | Photo "develops" on reveal; slight parallax |
| `Terminal` | Window chrome (`~/kevin · zsh` or language label) + mono content | Variants: typewriter (hero `whoami`), code block with **Copy** button, screenshot frame |
| `Ticker` | Full-bleed bone band, Anton, looping | Scroll-velocity speed + skew; the About page reuses it for the rotating titles |
| `ServiceCard` | No. 0N, image (wipes in), Anton H3, body | 2×2 shared-edge grid |
| `Statement` | Anton paragraph with one inverted highlight | `box-decoration-break: clone` |
| `PullQuote` / `Testimonial` | Big quote mark, Anton quote, avatar + name/role | Lives on an inverted bone section |
| `ExperienceRow` | Index, role (Anton), org · type, dates, location, `NOW` tag | Ordered list |
| `SkillCard` | No. 0N, name, dash-bulleted items | 2×2 shared-edge grid |
| `ArticleRow` | Date, category chips, title, excerpt, "Read More »" | Title nudges on hover |
| `FeaturedArticle` | Image + chips + title card | Latest post on the archive |
| `CategoryChip` | Outline / inverted | Archive filter + post header |
| `CategoryFilter` | Button group (`aria-pressed`) | Small vanilla island; hides the featured duplicate while unfiltered |
| `PostHeader` | Breadcrumb, chips, H1, `kevin_daus · date · time` | |
| `Toc` | Sticky "On this page" | Only when a post has step anchors |
| `ReasonSolution` | Paired cells | WooCommerce post |
| `ShareLinks` | Facebook · Twitter · LinkedIn | Outline buttons |
| `PostNav` | Previous / Next cards | Same order as the live site |
| `ReadingProgress` | 2px bone bar at the top of the screen | Posts only |
| `CtaBand` | "Need a hand on your project?" + Contact | Spotlight + blinds shadow |
| `SiteFooter` | Name, tagline, nav, socials, giant outline name | Name drifts in on scroll |
| `Breadcrumbs` | `HOME / PAGE` | Inner pages |

## 6. Imagery

- **Treatment:** all photos in grayscale. Service/article images use `grayscale(1) contrast(1.25) brightness(.9)`; tutorial screenshots use a lighter `grayscale(1) contrast(1.05)` so they stay readable. Hover lifts contrast and brightness and scales to 1.04.
- **Ratios:** services 16:9 · portrait 471:542 (source) · featured article: fills the card · avatars 1:1 at 56px, square.
- **Portrait:** always with the blinds overlay, a radial vignette and a caption.
- **Screenshots** (wp-cli steps) sit inside a `Terminal` frame, full width, at their real height.
- **Alt text:** descriptive (the live site's alts are kept where they exist; empty ones get real alts in the build). Decorative overlays are `aria-hidden`.
- Build with `<Picture formats={['avif','webp']}>` for the hero portrait (LCP) and `<Image>` elsewhere, with width/height always set.

## 7. Motion

**Principles:** motion sets the noir mood and shows what's happening (entering, loading, where you are). It only animates `transform`, `opacity`, `clip-path` and `filter`, never layout. The page can always be used while things animate. Build it with Motion One + small vanilla islands, `client:visible` where possible.

| Effect | Timing / easing | Trigger |
|---|---|---|
| Page curtain (shutter up / down) | 700ms, `cubic-bezier(.76,0,.24,1)`; navigation waits 650ms | Load / internal link click (not new-tab or modifier clicks). Restored on back/forward cache |
| Headline word reveal (mask, translateY 115% → 0) | 1000ms, `cubic-bezier(.2,.8,.1,1)`, 45ms stagger, capped at 600ms | In view |
| Block reveal (fade + 24px rise) | 900ms, `cubic-bezier(.2,.7,.2,1)`, 90ms batch stagger, capped at 450ms | In view (15% threshold, starts after the curtain) |
| Image wipe (clip-path top → bottom) | 1300ms, `cubic-bezier(.77,0,.18,1)` | In view |
| Portrait "develop" (brightness 0 → .9) | 2200ms + 250ms delay | In view |
| Blinds drift | 24s linear loop | Always |
| Spotlight flicker | 9s loop, dips to .84 opacity for about 1% of the cycle | Always |
| Spotlight follows cursor | Eased 6% per frame | Fine pointer only |
| Ticker | Base 0.7px/frame + scroll velocity; follows scroll direction; skew ±7° | Always |
| Nav hide / show | 450ms | Scroll down past 160px / scroll up |
| Magnetic buttons | 300ms return | Fine pointer only |
| Row nudge | 350ms, 10px | Hover |
| Terminal typewriter | 70–140ms per character, output after 260ms | Hero terminal enters view (+1.1s) |
| Footer name drift | 18% → 0 as the footer scrolls in | Scroll |
| Portrait parallax | 5% of the offset from the centre of the screen | Fine pointer only |
| Reading progress | Follows the article | Posts |
| Film grain | 1.2s stepped loop | Always |

**Reduced motion (`prefers-reduced-motion: reduce`):** no curtain, no word split, no drift/flicker/grain/ticker animation, no typewriter, no magnetic buttons or parallax, and images arrive already revealed. Content appears in place without fades. Every animation must have this fallback, and the screenshots in `docs/design/` show this state.

**Performance guard:** one shared `requestAnimationFrame` loop for all scroll-linked effects. Pointer effects only on `(hover: hover) and (pointer: fine)`.

## 8. Tailwind v4 theme (starting point)

```css
@theme {
  --color-noir: #0A0A0A;  --color-noir-900: #111111;  --color-noir-800: #1A1A1A;  --color-noir-700: #262626;
  --color-bone: #EDEBE6;  --color-bone-200: #D9D6CF;
  --color-smoke: #8C8C8C; --color-ash: #5C5C5C;
  --font-display: "Anton", Impact, sans-serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, monospace;
  --ease-noir: cubic-bezier(.2,.7,.2,1);
  --ease-shutter: cubic-bezier(.76,0,.24,1);
  --ease-wipe: cubic-bezier(.77,0,.18,1);
  --radius: 0;
}
```

## 9. Open design items

- **Logo:** the original vector of the KD mark is needed (the mockup SVG is a hand redraw).
- **Portfolio:** **removed for launch** (Kevin, 2026-09-29). The mockup still shows it; the build leaves it out. If it returns, reuse the mockup's 1 large + 2 small grid.
- **Favicon + OG image:** not designed yet. Use the circular KD mark (favicon) and a noir title card (OG).
- **404 page:** not mocked up. Build it in the same style; any copy it needs is new and needs client approval.
