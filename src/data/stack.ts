// Technology stack, grouped. Every item is named on the live site (About intro + skills, services, posts),
// except Docker and security hardening, which Kevin listed in his first redesign brief.
// No progress bars or percentage ratings.
export const stack: { group: string; items: string[] }[] = [
  { group: 'Core', items: ['PHP', 'Laravel', 'Yii', 'WordPress'] },
  { group: 'WordPress', items: ['Custom plugins', 'Elementor', 'Crocoblock', 'WooCommerce', 'WP-CLI'] },
  { group: 'Front end', items: ['JavaScript', 'VueJS', 'AlpineJS', 'TailwindCSS', 'Bootstrap', 'jQuery'] },
  { group: 'Infrastructure', items: ['Linux', 'Git', 'Docker', 'DigitalOcean', 'Cloudways', 'Server management', 'Security hardening'] },
  { group: 'Search', items: ['Technical SEO audits', 'On-page SEO'] },
];
