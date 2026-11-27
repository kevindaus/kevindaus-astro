// Per-page <title> + description. Parity floor: verbatim from the live Rank Math output (docs/seo.md).
// Improvements are decided in the seo pass and logged in docs/seo.md, not made ad hoc here.
export const seo = {
  home: {
    title: 'PHP Programmer / WordPress Developer - Kevin Florenz Daus',
    description:
      "Hi, I'm Kevin Florenz Daus. I'm a PHP Programmer and WordPress Developer. I believe that websites are not just fancy colours, dancing text and seductive image. They are the extension of your business and thus should speak about your business.",
  },
  about: {
    title: 'About Me - Kevin Florenz Daus - PHP Programmer / WordPress Developer',
    // live description is the whole ~700-char intro; parity keeps its opening paragraph (the part Google shows)
    description:
      'WordPress & Laravel FullStack Developer with a demonstrated history of working in the outsourcing/offshoring industry and a proven track record of building and maintaining PHP-based web applications.',
  },
  articles: {
    title: 'Articles - Kevin Florenz Daus - PHP Programmer / WordPress Developer',
    // live has no description; the page's own subtitle, verbatim
    description: 'Read the latest blog posts about general web development , Laravel, PHP and WordPress',
  },
  services: {
    // DRAFT (new page, 2026-11-12): title follows the live site's pattern; description built from the service names
    title: 'Services - Kevin Florenz Daus - PHP Programmer / WordPress Developer',
    description:
      'WordPress development, on-page SEO, WordPress custom plugin development, general web development with Laravel and Yii, and website maintenance. Things I do to help you with your business.',
  },
  notFound: {
    title: 'Page not found - Kevin Florenz Daus',
  },
};
