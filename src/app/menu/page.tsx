import type { Metadata } from 'next';
import MenuPageClient from './MenuPageClient';

export const metadata: Metadata = {
  title: 'Menu — Cakes, Pastries, Rusks, Biscuits, Namkeens & Snacks',
  description:
    'Explore Janta Bakery\'s full menu across all categories: Cakes, Pastries, Rusks, Biscuits, Namkeens & Snacks. Fresh, affordable, delicious. Since 1967 in Bhogal, Jangpura, New Delhi.',
};

export default function MenuPage() {
  return <MenuPageClient />;
}
