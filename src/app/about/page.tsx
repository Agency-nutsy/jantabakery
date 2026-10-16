import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';
import { SITE_URL } from '@/lib/siteConfig';

const yearsInBusiness = new Date().getFullYear() - 1967;

export const metadata: Metadata = {
  title: 'About Us — Our Story Since 1967',
  description:
    `Discover the story of Janta Bakery — from a small shop in Bhogal to Delhi's most beloved bakery. ${yearsInBusiness} years of love, flour, and sweetness. Founded by Saawan Kumar in 1967.`,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: 'About Janta Bakery — Our Story Since 1967',
    description: `${yearsInBusiness} years of love, flour, and sweetness. Founded by Saawan Kumar in Bhogal, Jangpura, New Delhi.`,
    url: `${SITE_URL}/about`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Janta Bakery — Since 1967' }],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
