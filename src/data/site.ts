// Single source for the person, nav, socials and footer (and the schema's main entity).
// Person values are verbatim from the live site (kevinflorenzdaus.com, captured 2026-09-29) unless marked.
export const site = {
  lang: 'en-US', // live site uses en-US; kept (decision 2026-09-29). New copy is written in AU/UK English.
  themeColor: { light: '#F5F4F0', dark: '#171717' },
  org: {
    type: 'Person' as const,
    name: 'Kevin Florenz Daus',
    jobTitle: 'PHP Programmer / WordPress Developer',
    logo: '/favicon-512.png',
    image: '/kevin-florenz-daus.png',
    sameAs: [
      'https://www.linkedin.com/in/kevinflorenzdaus/',
      'https://www.facebook.com/kevinflorenzdaus/',
      'https://twitter.com/KevinDaus',
      'https://www.youtube.com/channel/UC9vVRj5C1ZvaUVgiIQI8z5Q',
    ],
  },
  tagline: 'PHP Developer / WordPress Developer',
  linkedin: 'https://www.linkedin.com/in/kevinflorenzdaus/',
  // Not published until Kevin supplies them (never guess contact details):
  email: null as string | null,  // public contact address shown next to the form
  github: null as string | null, // GitHub profile URL for the footer
  contactPath: '/contact/',
  // Header nav (editorial brief: Work, About, Contact). "Work" needs at least one case study (getWork()).
  nav: [
    { label: 'Work', href: '/work/', needsWork: true },
    { label: 'About', href: '/about-me/' },
    { label: 'Contact', href: '/contact/' },
  ],
  // Footer nav: everything, so Services and Articles stay one click away
  footerNav: [
    { label: 'Work', href: '/work/', needsWork: true },
    { label: 'About', href: '/about-me/' },
    { label: 'Services', href: '/services/' },
    { label: 'Articles', href: '/articles/' },
    { label: 'Contact', href: '/contact/' },
  ],
};

/** Verified social links (live site footer + About; GitHub once supplied). Instagram omitted: the live link is bare instagram.com. */
export const socials = [
  { label: 'LinkedIn', href: site.linkedin },
  site.github && { label: 'GitHub', href: site.github },
  { label: 'Facebook', href: 'https://www.facebook.com/kevinflorenzdaus/' },
  { label: 'Twitter', href: 'https://twitter.com/KevinDaus' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UC9vVRj5C1ZvaUVgiIQI8z5Q' },
].filter(Boolean) as { label: string; href: string }[];
