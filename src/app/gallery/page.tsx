import type { Metadata } from 'next';
import { Suspense } from 'react';
import GalleryPageClient from './GalleryPageClient';
import { SITE_URL } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Gallery — A Visual Feast',
  description:
    "Browse Janta Bakery's gallery — wedding cakes, birthday cakes, pastries, cookies & custom designs. A visual feast of our finest creations since 1967.",
  alternates: { canonical: `${SITE_URL}/gallery` },
  openGraph: {
    title: "Gallery — Janta Bakery's Finest Creations",
    description:
      "Wedding cakes, birthday cakes, pastries, cookies & custom designs from Delhi's most beloved bakery since 1967.",
    url: `${SITE_URL}/gallery`,
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Janta Bakery Gallery' }],
  },
};

export default function GalleryPage() {
  return (
    <Suspense fallback={null}>
      <GalleryPageClient />
    </Suspense>
  );
}
