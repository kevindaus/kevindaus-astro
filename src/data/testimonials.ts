// Testimonials — VERBATIM from the live homepage ("My Client Said"), including spelling.
import type { ImageMetadata } from 'astro';
import mandy from '../assets/people/mandy-pawley.jpg';
import stuart from '../assets/people/stuart-cox.jpg';

export interface Testimonial { name: string; role: string; photo: ImageMetadata; lead?: string; quote: string }

export const testimonials: Testimonial[] = [
  {
    name: 'Mandy Pawley',
    role: 'Marketing Manager at Tindo Solar',
    photo: mandy,
    quote: 'Kevin was a fantastic part of my team. He produced quality websites and was always eager to learn new skills and help with whatever he could.',
  },
  {
    name: 'Stuart Cox',
    role: 'Digital Consultant / Creative Director',
    photo: stuart,
    lead: 'Kevin is one of the finest developers ive had the pleasure of dealing with.',
    quote: "Kevin was a full time member of my team for over 2 years, and I couldn't have been happier with what we achieved. No job was too small or too big for Kevin. His infectious attitude to work was a pleasure to deal with on a daily basis. Whilst im sad Kevin is no longer part of our team, I wish him continued success into the future, and look forward to witnessing his continued ascent as a developer.",
  },
];
