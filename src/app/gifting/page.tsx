import type { Metadata } from 'next';
import { Suspense } from 'react';
import GiftingPageClient from './GiftingPageClient';
import { SITE_URL, BUSINESS_NAME, FOUNDED_YEAR } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Diwali & Festive Gift Hampers — Artisan Baskets, Boxed & Dry Fruit Hampers',
  description:
    `Explore ${BUSINESS_NAME}'s festive gift hamper collection since ${FOUNDED_YEAR}. Handcrafted Diwali hampers including Luxury Basket Hampers, Designer Boxed Hampers, and Royal Dry Fruit Keepsake Chests. Custom & corporate gifting available across Delhi NCR.`,
  alternates: { canonical: `${SITE_URL}/gifting` },
  openGraph: {
    title: `Diwali & Festive Gift Hampers | ${BUSINESS_NAME} — Since ${FOUNDED_YEAR}`,
    description:
      'Handcrafted festive hampers — Artisan Baskets, Designer Boxed Hampers, and Royal Dry Fruit Chests in Bhogal, New Delhi.',
    url: `${SITE_URL}/gifting`,
    images: [
      {
        url: `${SITE_URL}/gallery/hampers/featured/diwali-gifting-showcase.webp`,
        width: 1122,
        height: 1402,
        alt: `${BUSINESS_NAME} — Diwali Festive Hamper Showcase`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Festive Gift Hampers | ${BUSINESS_NAME}`,
    description: 'Artisan Diwali Baskets, Designer Boxed Hampers & Dry Fruit Gift Chests.',
    images: [`${SITE_URL}/gallery/hampers/featured/diwali-gifting-showcase.webp`],
  },
};

export default function GiftingPage() {
  return (
    <Suspense fallback={null}>
      <GiftingPageClient />
    </Suspense>
  );
}
