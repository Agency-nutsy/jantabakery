import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About Us — Our Story Since 1967',
  description:
    'Discover the story of Janta Bakery — from a small shop in Bhogal to Delhi\'s most beloved bakery. 57 years of love, flour, and sweetness. Founded by Saawan Kumar in 1967.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
