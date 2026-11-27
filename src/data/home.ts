// Homepage copy (contact = LinkedIn, no form) for the "Editorial" redesign (branch redesign-editorial, 2026-11-27).
// Labels: VERBATIM = unchanged from the live site · BRIEF = wording given in docs/kevinflorenzdaus-redesign-prompt-gpt.md ·
// DRAFT = reworded from facts on the live site (About page, experience, services). Drafts are listed under
// "Copy Awaiting Approval" in docs/implementation-progress.md.

export const hero = {
  identity: 'PHP Developer / WordPress Developer', // VERBATIM (the live H1)
  headline: 'Building digital solutions that work.', // BRIEF
  supporting: 'I develop websites, custom applications and practical solutions using WordPress, Laravel and modern web technologies.', // BRIEF
  // facts strip — all from the live /about-me/ page
  facts: [
    { label: 'Focus', value: 'WordPress · Laravel · Yii' },
    { label: 'Experience', value: 'Since 2013 · UK, Sweden, Australia' },
    { label: 'Education', value: 'BS Information Technology' },
  ],
};

export const about = {
  title: 'Practical development for sites that have to keep working.', // DRAFT
  paragraphs: [ // DRAFT, reworded from the live About intro
    'I’m Kevin Florenz Daus, a WordPress and Laravel full-stack developer. I’ve spent my career building and maintaining PHP-based websites and applications, much of it for agencies and businesses in the outsourcing and offshoring industry.',
    'The work is practical: custom plugins, integrations with third-party APIs, performance and security improvements through regular updates and monitoring, and web automation that streamlines a client’s business process.',
  ],
};

// Services: only those supported by the live site. Each links to its section on /services/.
export const services = [ // DRAFT descriptions (outcome-focused rewording of the live service copy)
  { title: 'WordPress Development', text: 'Professional, responsive WordPress sites built with Elementor and Crocoblock, so your team can manage content without touching code.', href: '/services/#wordpress-development' },
  { title: 'Custom PHP Applications', text: 'Web applications for the not-so-common use case, when an off-the-shelf tool doesn’t fit how your business works.', href: '/services/#general-web-development' },
  { title: 'Laravel Development', text: 'Laravel applications and integrations with third-party APIs, built to be maintained long after launch.', href: '/services/#general-web-development' },
  { title: 'Website Maintenance', text: 'Updates, monitoring and fixes, so a plugin, theme, PHP version or attack doesn’t take your site down.', href: '/services/#website-maintenance' },
  { title: 'Technical SEO', text: 'Technical SEO audits, then the changes made directly in the site: the right keywords, in the right places, with the right tags.', href: '/services/#on-page-seo' },
  { title: 'Process Automation', text: 'Turning manual business processes into web automation, so your team spends less time on repetitive work.', href: '/services/#general-web-development' },
];

export const contactCopy = {
  heading: 'Need a hand on your project?', // VERBATIM (live /articles/ CTA)
  intro: 'Tell me what you’re building, or what needs fixing. Send me a message on LinkedIn.', // DRAFT
};
