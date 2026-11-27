// Single source for the person, nav, socials and footer (and the schema's main entity).
// Every value is verbatim from the live site (kevinflorenzdaus.com, captured 2026-09-29).
export const site = {
  lang: 'en-US', // live site uses en-US; kept (decision 2026-09-29)
  themeColor: '#0A0A0A',
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
  contactUrl: 'https://www.linkedin.com/in/kevinflorenzdaus/',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About Me', href: '/about-me/' },
    { label: 'Services', href: '/services/' }, // new page 2026-11-12
    { label: 'Articles', href: '/articles/' },
  ],
  // footer socials (live footer order). Instagram is omitted until a real profile URL exists (live links to bare instagram.com).
  footerSocials: [
    { label: 'Facebook', href: 'https://www.facebook.com/kevinflorenzdaus/' },
    { label: 'Twitter', href: 'https://twitter.com/KevinDaus' },
  ],
  // "A bit about me" socials (live order)
  aboutSocials: [
    { label: 'Facebook', href: 'https://www.facebook.com/kevinflorenzdaus/' },
    { label: 'Twitter', href: 'https://twitter.com/KevinDaus' },
    { label: 'Youtube', href: 'https://www.youtube.com/channel/UC9vVRj5C1ZvaUVgiIQI8z5Q' },
  ],
};
