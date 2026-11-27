# SEO

## Parity capture (live `<head>`, raw curl, 2026-09-29)

Plugin: **Rank Math**. Every page: `robots: follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large`, self-canonical on the apex (`https://kevinflorenzdaus.com/…`), `html lang="en-US"`. `www` and `http` 301 to the apex. GSC verification TXT is on the domain.

| Page | Title | Meta description | og:image | Schema types |
|---|---|---|---|---|
| `/` | PHP Programmer / WordPress Developer - Kevin Florenz Daus | Hi, I'm Kevin Florenz Daus. I'm a PHP Programmer and WordPress Developer. I believe that websites are not just fancy colours, dancing text and seductive image. They are the extension of your business and thus should speak about your business. | Kevin-Florenz-Daus-1.png | WebSite (+SearchAction), WebPage, Person, Article, ImageObject |
| `/about-me/` | About Me - Kevin Florenz Daus - PHP Programmer / WordPress Developer | (the whole 3-paragraph intro, ~700 chars) | Kevin-Florenz-Daus-1.png | WebPage, Person, Article, ImageObject |
| `/articles/` | Articles - Kevin Florenz Daus - PHP Programmer / WordPress Developer | **none** | KD.png | CollectionPage, Person |
| wp-cli post | How to set WordPress configuration variable using wp-cli - Kevin Florenz Daus - PHP Programmer / WordPress Developer | In this post, I'll be sharing a valuable tip specifically for WordPress owners and developers: how to effortlessly configure your WordPress settings using the | what-is-wp-cli.png | BlogPosting, HowToStep, HowToTool |
| WooCommerce post | How to fix Woocommerce There are no shipping options available | How to fix Woocommerce There are no shipping options available. Please ensure that your address has been entered correctly, or contact us if you need any help. | KD.png | BlogPosting |
| Laravel post | How to save model without triggering events in Laravel - Kevin Florenz Daus - PHP Programmer / WordPress Developer | I faced this problem yesterday while playing with Laravel where I need to save a model but I dont want to trigger any model events . | KD.png | BlogPosting |
| Linux post | How To Fix directory autocomplete doesn't work on a newly created user in debian linux - Kevin Florenz Daus - PHP Programmer / WordPress Developer | In this tutorial I will show you how to fix directory autocomplete that doesnt work on newly created debian linux user | KD.png | BlogPosting |

`robots.txt`: disallows `/wp-admin/`, sitemap `sitemap_index.xml` (post + page sitemaps, which include test pages).
Analytics: **none found** (no GA4/GTM or other tags).

## Parity floor → improvements (for the seo pass, §11)

- Keep every title and description above as the starting point. Rewrites get decided in the seo pass and logged here
- Fix: most titles are over 60 characters (site name + tagline repeated). The About description is ~700 chars. `/articles/` has no description. The wp-cli description is cut off mid-sentence
- `lang`: `en-US` on the live site. **Kevin's market needs confirming** (he freelances for Australian clients). Log any change
- Schema: one `@graph` centred on a **Person** (`/#person`, §11.4) with `sameAs` = LinkedIn, Facebook, Twitter, YouTube. BlogPosting per post; keep HowTo markup on the wp-cli post as HowToStep inside BlogPosting (Google no longer shows HowTo rich results, so it's harmless but optional)
- New sitemap: only the 7 real pages; no test pages
- OG images: a noir title card per page instead of `KD.png`

## Keyword map

To do. Needs the **GSC export** (Queries + Pages, 16 months) in `docs/gsc/`.
