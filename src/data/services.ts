// Services — single source for the homepage cards and /services/.
//
// `lead` is VERBATIM from the live homepage (kevinflorenzdaus.com, 2026-09-29).
// `body` and `included` are DRAFT copy (2026-11-12), written only from facts already on the live site
// (About page intro/skills/experience, the posts). Needs Kevin's approval → docs/implementation-progress.md
// "Copy Awaiting Approval". No metrics, client names or claims beyond what the site already states.
import type { ImageMetadata } from 'astro';
import imgWp from '../assets/home/wordpress-development.jpg';
import imgDev from '../assets/home/general-web-development.jpg';
import imgMaint from '../assets/home/website-maintenance.jpg';
import imgSeo from '../assets/home/on-page-seo.jpg';

export interface Service {
  slug: string;              // anchor on /services/
  title: string;             // homepage card title (verbatim)
  image?: { src: ImageMetadata; alt: string };
  lead: string[];            // verbatim (homepage paragraphs; About page for the plugin service)
  body: string[];            // DRAFT
  included: string[];        // DRAFT
  related?: string;          // path of a related post (wayfinding)
  onHome: boolean;           // has a card on the homepage
}

// Order = the live "What I do best" list.
export const services: Service[] = [
  {
    slug: 'wordpress-development',
    title: 'WordPress Development',
    image: { src: imgWp, alt: 'WordPress Development' },
    lead: [
      'WordPress is a popular option for organizations and people wishing to create professional websites without the need for complicated coding because of its user-friendly interface and large range of features and plugins.',
      'With Elementor and Crocoblock you make wonders without typing a lot of code.',
    ],
    body: [
      'I build modern, responsive WordPress sites that are SEO optimized from the start. Building with Elementor and Crocoblock means that once the site is handed over, you can update your own pages without touching code.',
      'When a project needs more than a page builder can do, I write the custom code: theme changes, WooCommerce fixes, custom plugins and integrations with third-party APIs.',
    ],
    included: [
      'Custom WordPress sites built with Elementor and Crocoblock',
      'Responsive, SEO optimized builds',
      'WooCommerce setup and troubleshooting',
      'Integrations with third-party APIs',
    ],
    related: '/2022/04/25/how-to-fix-woocommerce-there-are-no-shipping-options-available/',
    onHome: true,
  },
  {
    slug: 'on-page-seo',
    title: 'On-Page SEO',
    image: { src: imgSeo, alt: 'SEO' },
    lead: [
      'On-site SEO is the process of optimizing a website’s content in order to improve its search engine rankings.',
      'Sometimes using the right keywords at the right place and with the right tags makes a difference.',
    ],
    body: [
      'I start with a technical SEO audit of your site, then implement the changes myself: page titles and descriptions, heading structure and the tags search engines read.',
      'Because I’m also the developer, the fixes don’t sit in a report waiting for someone else to make them.',
    ],
    included: [
      'Technical SEO audits',
      'Implementing the audit’s changes on your site',
      'The right keywords, in the right places, with the right tags',
      'SEO optimized WordPress builds',
    ],
    onHome: true,
  },
  {
    slug: 'wordpress-custom-plugin-development',
    title: 'WordPress Custom Plugin Development',
    lead: [
      // the live homepage lists this service without a description; the About page's own words, verbatim
      'I have developed and maintained WordPress and Laravel applications for clients, implemented custom plugins and integrations with third-party APIs, and collaborated with cross-functional teams to plan and execute projects.',
    ],
    body: [
      'Sometimes no off-the-shelf plugin does exactly what your business needs. That’s when a custom plugin makes sense: code written around how you work.',
      'Your features live in their own plugin, separate from your theme, so a redesign doesn’t take them with it.',
    ],
    included: [
      'Custom features packaged as their own plugin',
      'Integrations with third-party APIs',
      'Code kept separate from your theme',
    ],
    onHome: false,
  },
  {
    slug: 'general-web-development',
    title: 'General Web Development',
    image: { src: imgDev, alt: 'General Web Development' },
    lead: [
      'Web development can range from creating a simple static web page to developing interactive and widely-complex web applications.',
      'If you need a custom solution for a not-so-common use case. I’m here to help. I have created and deployed multiple web applications using different PHP frameworks such as Laravel and Yii.',
    ],
    body: [
      'Not every project belongs on WordPress. For web applications with their own logic, users and data, I build on Laravel or Yii, with front ends in TailwindCSS, VueJS or AlpineJS where they fit.',
      'A lot of this work is web automation: taking a process your team does by hand and turning it into an application that does it for them.',
    ],
    included: [
      'Custom web applications in Laravel and Yii',
      'Business process automation',
      'Front ends with TailwindCSS, VueJS and AlpineJS',
      'Integrations with third-party APIs',
    ],
    related: '/2022/04/14/how-to-save-model-without-triggering-events-in-laravel/',
    onHome: true,
  },
  {
    slug: 'website-maintenance',
    title: 'General Website Maintenance',
    image: { src: imgMaint, alt: 'General Website Maintenance' },
    lead: [
      'Every day thousands of website breaks. It could be because of a plugin or a theme update. It could be your hosting that’s using an old PHP version or it could be because of a hacker who is trying to destroy your site.',
      'I’ve faced those issues before in my career and I’m here to help you fix your website.',
    ],
    body: [
      'Maintenance is about catching those problems before your customers do. I keep WordPress, themes and plugins up to date, and improve site performance and security through regular updates and monitoring.',
      'If your site has outgrown shared hosting, I can move it to cloud hosting like DigitalOcean or Cloudways. I’ve migrated multiple websites that way.',
    ],
    included: [
      'WordPress, theme and plugin updates',
      'Performance and security monitoring',
      'Fixing sites broken by an update',
      'Migrations from shared hosting to DigitalOcean or Cloudways',
      'Linux server management',
    ],
    related: '/2023/02/03/how-to-set-wordpress-configuration-variable-using-wp-cli/',
    onHome: true,
  },
];

// The homepage keeps the live card order.
const HOME_ORDER = ['wordpress-development', 'general-web-development', 'website-maintenance', 'on-page-seo'];
export const homeServices = HOME_ORDER.map((slug) => services.find((s) => s.slug === slug)!);
