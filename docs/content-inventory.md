# Content Inventory

Source: live site, captured 2026-09-29 into `legacy/raw/` (reference only; re-curl each page when building it, §10.2).
Platform: WordPress + Elementor Pro (Hello Elementor child theme), Ultimate Addons for Elementor, Perfmatters, Rank Math SEO.

## Pages to migrate

| Page | URL | Content | Mockup | Notes |
|---|---|---|---|---|
| Home | `/` | Hero (H1), about blurb, "What I do best" list, 4 services, Portfolio heading (empty → **removed for launch**), 2 testimonials | `UI/home-v4.html` | Additions: meta description shown as a visible statement; latest articles; CTA from `/articles/` |
| About Me | `/about-me/` | Rotating titles, intro (3 paras), Education, Experience (8 roles), Skills (4 groups) | `UI/about-v1.html` | Intro block is repeated 3× on the live page (responsive duplicates) → used once |
| Services *(new)* | `/services/` | 5 services: verbatim homepage leads + **draft** expansions + "What’s included" + related article | — (built from the design system) | Draft copy awaiting approval (2026-11-12) |
| Articles | `/articles/` | H1, subtitle, 4 post cards, CTA | `UI/articles-v1.html` | "No Comments" meta dropped |
| Post: wp-cli | `/2023/02/03/…-using-wp-cli/` | Intro, image, required tools, steps 1–5.1 (screenshots + 3 commands), "Thats it!" | `UI/post-wp-cli-v1.html` | Duplicate in-content H1 dropped. **Step 2 reuses the Step 1 screenshot on the live site** |
| Post: WooCommerce shipping | `/2022/04/25/…-available/` | Intro + 3 Reason/Solution pairs | `UI/post-woocommerce-shipping-v1.html` | |
| Post: Laravel saveQuietly | `/2022/04/14/…-in-laravel/` | 2 paras + PHP snippet | `UI/post-laravel-save-quietly-v1.html` | |
| Post: Linux autocomplete | `/2022/04/12/…-in-linux/` | 1 para + bash snippet + 2 lines | `UI/post-linux-autocomplete-v1.html` | Post ends at "Login to your user" (as on the live site) |

Post meta used verbatim: author `kevin_daus`, date, time. Categories: How-To, WordPress, WooCommerce, Laravel, Linux.

## Excluded from the live site (not content)

| Item | Why |
|---|---|
| `/services-v2/` | Template placeholder ("Service One… Add your service description here") |
| `/elementor-26542/` | Another project's mega-menu test (settlement / tenancy services) |
| `/elementor-26489/` | Template placeholder ("This is a title", "Type your paragraph here") |
| `/tteeete/`, `/test-menu/` | Test pages, H1 only |
| `/thank-you-page/` | Empty |
| About page responsive duplicates | Same intro block rendered for desktop/tablet/mobile |

## Assets

- Portrait `2020/10/Kevin-Florenz-Daus-1.png` (471×542, transparent PNG) — a larger original would be better
- Logo `2020/12/KD.png` (raster, white background) → **need the vector**
- Service images: `wordpress-cms.jpg`, `website-maintenance.jpg`, `managewp-manage-website.jpg`, `seo-service-scaled.jpg`
- Testimonial avatars: `2022/03/1605754017152.jpg` (Mandy Pawley), `2022/09/1517225427203.jpeg` (Stuart Cox)
- wp-cli post: `what-is-wp-cli.png` (1024×725) + 5 step screenshots (`step-1…`, `step-3…`, `step-4…`, `step-5…`, `set-environment-variable.png`)
- No PDFs, no video embeds (the YouTube links are channel links only)

## Links to check

- Instagram footer link → `https://www.instagram.com/` (no profile). Needs the real URL, or remove it
- "Checkout More" → `/portfolio/` (404). The button is removed along with the Portfolio section
- All "Contact Me" buttons → LinkedIn (`/in/kevinflorenzdaus/`)
- Socials: Facebook `/kevinflorenzdaus/`, Twitter `@KevinDaus`, YouTube channel `UC9vVRj5C1ZvaUVgiIQI8z5Q`
