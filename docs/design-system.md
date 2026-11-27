# Design System — "Editorial" (Swiss minimalism + developer aesthetic)

**Status:** **approved by Kevin 2026-11-27** and merged into `main`, replacing Noir. Brief: `docs/kevinflorenzdaus-redesign-prompt-gpt.md`. Audit and decisions: `docs/audit-editorial.md`. The unused alternative ("Engineer's notebook") is on branch `redesign`.

Source: `src/styles/global.css` (tokens, base, components) · `src/styles/motion.css` (motion tokens + utilities) · `src/scripts/reveal.ts` · `src/scripts/ui.ts`.

## 1. Colour

Semantic CSS variables flip under `html.dark`, and Tailwind reads them through `@theme inline` (`bg-bg`, `text-muted`, `border-line`, `text-accent-ink`, …).

| Token | Light | Dark | Use | Contrast (L / D) |
|---|---|---|---|---|
| `bg` | `#F5F4F0` paper | `#171717` | page | — |
| `surface` | `#FFFFFF` white | `#1F1F1E` | inputs, code, frames | — |
| `fg` | `#171717` charcoal | `#F5F4F0` | text, primary button, 1px "rule" dividers | 16.3 / 16.3 |
| `muted` | `#666666` | `#A3A19B` | secondary text | 5.2 / 6.9 |
| `subtle` | `#6F6F6F` | `#8C8A85` | small mono meta | 4.6 / 5.2 |
| `line` / `line-strong` | `#DEDCD5` / `#BDBAB1` | `#2E2D2B` / `#4A4844` | thin dividers / inputs | — |
| `accent` | `#D95B35` rust | `#E8734D` | fills, large type, the "." in KFD., focus ring, button hover | 3.5 / 6.0 |
| `accent-ink` | `#B34420` | `#EE8A68` | small rust text, links, indices | 5.1 / 7.2 |
| `accent-fg` | `#171717` | `#171717` | text on rust | 4.7 |
| `invert-bg` / `invert-fg` | `#171717` / `#F5F4F0` | `#0D0D0D` / `#F5F4F0` | the contact band | — |

The brief's `#777777` (4.07:1 on paper) is nudged to `#6F6F6F`, and body-size secondary text uses `#666666`. Rust `#D95B35` is never used for small text.

## 2. Type

Space Grotesk Variable (headings, wordmark, stack list), Inter Variable (body), JetBrains Mono Variable (labels, metadata, code). All three are self-hosted via Fontsource, `font-display: swap`, with the latin subset of each preloaded.

| Utility | Size | Line height | Tracking | Use |
|---|---|---|---|---|
| `text-hero` | clamp(48 → 136px) | .94 | −0.045em | home H1, page H1s, contact heading |
| `text-display` | clamp(40 → 84px) | 1.0 | −0.04em | section headings, case study H1 |
| `text-title` | clamp(34 → 60px) | 1.04 | −0.035em | smaller section headings, article H1 |
| `text-heading` | clamp(24 → 32px) | 1.15 | −0.025em | card titles, service names |
| body | 16px (prose 17px, leads 20px) | 1.65 | — | Inter |
| `mono` | 12px uppercase | 1.5 | +0.04em | labels, indices, metadata |

## 3. Layout

- 12-column grid inside `max-w-wide` (1280px) with gutters `px-5 → sm:px-8 → lg:px-12`. Reading column `max-w-read` (680px).
- **Section pattern:** a 1px charcoal rule, then index + mono label in columns 1–3 and an oversized heading in columns 4–12 (`SectionHeader`). Content usually starts at column 4. This is the asymmetry: disciplined, not decorative.
- Spacing: Tailwind 4px scale. Sections `py-16 → lg:py-24`.
- Radius: 2px (tags, code) / 4px (buttons, inputs). Imagery is square-cornered with a 1px border.
- No shadows and no decorative gradients. The only pattern is the hatched placeholder frame.

## 4. Components

| Component | File | States |
|---|---|---|
| Header | `SiteHeader.astro` | KFD. wordmark · numbered mono nav (01 Work / 02 About / 03 Contact) · scrolled (hairline + blur) · hides on scroll down (mobile) · `aria-current` |
| Mobile menu | in SiteHeader | large Space Grotesk links, staggered in · Esc / link closes |
| Footer | `SiteFooter.astro` | wordmark, Pages nav, verified socials + RSS, © |
| Section header | `SectionHeader.astro` | index, label, heading, intro, "see all →" |
| Buttons | `.btn-primary` (charcoal → rust on hover) · `.btn-secondary` (outline → charcoal border) | hover lift + arrow nudge · active `scale(.98)` · focus ring |
| Project card | `ProjectCard.astro` + `ProjectImage.astro` | image 1.00 → 1.03 on hover · title → rust · "Placeholder" badge · whole card clickable |
| Placeholder frame | `ProjectImage.astro` (`.placeholder-frame`) | hatched frame, "Screenshot to be supplied", `role="img"` with label |
| Testimonial | `Testimonial.astro` | index, large Space Grotesk quote, rust quote marks, greyscale avatar |
| Article row | `ArticleItem.astro` | ISO date, title (→ rust), reading time, "→" slides in |
| Stack list | home + About | grouped, slash-separated, no ratings or progress bars |
| Contact button | `ContactButton.astro` | every "Get in touch" CTA → LinkedIn, new tab, ↗ + screen-reader "opens in a new tab". The nav "Contact" link does the same |
| Code block, Callout, TOC, Reading progress, Tag | unchanged components, restyled through tokens | see `redesign` docs |

## 5. Motion

Tokens (`motion.css`): durations 100 / 150 / 250 / 400ms · ease-out `cubic-bezier(.16,1,.3,1)` · ease-in `(.7,0,.84,0)` · ease-in-out `(.65,0,.35,1)` · distances 4 / 12px · stagger 60ms (max 6 items).

| Animation | Trigger | Property | Duration / easing | Reduced motion |
|---|---|---|---|---|
| Hero word reveal | home, first load in a session (not back/forward or later visits) | each word translateY 105% → 0 inside a clipped span, 60ms stagger | 700ms ease-out | none |
| Hero supporting rows | same | opacity + translateY 12px, staggered | 400ms ease-out | none |
| Section entrances | enter viewport, once | opacity + translateY 12px; lists stagger | 250ms ease-out | visible |
| Nav / text links | hover, focus | underline draws left → right | 150ms | same (no movement) |
| Buttons | hover / active | colour; lift 4px; arrow +3px; press .98 | 150 / 100ms | colour only |
| Project cards | hover, focus | image scale 1.00 → 1.03 (clipped); title colour | 400ms ease-out | colour only |
| Case study cover | enters viewport, once | clip-path wipe up + image settles from 1.06 | 900 / 1200ms | shown immediately |
| Page transitions | ClientRouter navigation | cross-fade of `<main>`; title + cover morph card → case study | 250ms | none |
| Theme toggle | click | circular reveal from the button; icon cross-rotate | 400 / 250ms | instant |
| Header | scroll | hairline/blur fade; mobile hide on scroll down | 150 / 250ms | no hide |
| Reading progress, TOC indicator, copy, filter, mobile menu | as on `redesign` | transform/opacity | 150–250ms | instant or ≤100ms fade |

No parallax, scroll hijacking, floating or looping decoration, bounce or 3D.

## 6. Notes

- **Placeholders, not stock.** With no real projects, the work grid shows marked placeholders that never reach production (`npm run build:prod`). Adding one real case study (`src/content/work/_template.mdx`) switches on Work for production.
- **Oversized type without layout shift.** All three faces are preloaded. Headlines are split into word spans at build time, not client-side, so there's no reflow. CLS stays 0.
- **Accessible contrast over brand purity.** Two palette values are adjusted (see §1), and the rust accent keeps its role where 3:1 is enough.
- **No skill bars or ratings, no testimonial edits, no invented metrics.**
