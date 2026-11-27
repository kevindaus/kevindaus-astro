// Contact form options — shared by the form (src/components/ContactForm.astro) and its
// server-side validation (functions/api/contact.ts). DRAFT labels (redesign, 2026-11-27).
export const projectTypes = [
  'WordPress build',
  'Maintenance & security',
  'Laravel / PHP development',
  'Technical SEO',
  'Something else',
] as const;
