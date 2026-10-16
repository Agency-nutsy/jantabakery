import type { Metadata } from 'next';
import MenuPageClient from './MenuPageClient';
import { SITE_URL } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Menu — Cakes, Pastries, Rusks, Biscuits, Namkeens & Snacks',
  description:
    "Explore Janta Bakery's full menu across all categories: Cakes, Pastries, Rusks, Biscuits, Namkeens & Snacks. Fresh, affordable, delicious. Since 1967 in Bhogal, Jangpura, New Delhi.",
  alternates: { canonical: `${SITE_URL}/menu` },
  openGraph: {
    title: "Menu — Janta Bakery | Cakes, Pastries & More",
    description:
      "Explore our full menu: cakes, pastries, rusks, biscuits, namkeens & snacks. Fresh, affordable and delicious since 1967 in Bhogal, New Delhi.",
    url: `${SITE_URL}/menu`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Janta Bakery Menu' }],
  },
};

export default function MenuPage() {
  return <MenuPageClient />;
}
