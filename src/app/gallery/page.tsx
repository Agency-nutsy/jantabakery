import type { Metadata } from 'next';
import { Suspense } from 'react';
import GalleryPageClient from './GalleryPageClient';

export const metadata: Metadata = {
  title: 'Gallery — A Visual Feast',
  description:
    'Browse Janta Bakery\'s gallery — wedding cakes, birthday cakes, pastries, cookies & custom designs. A visual feast of our finest creations since 1967.',
};

export default function GalleryPage() {
  return (
    <Suspense fallback={null}>
      <GalleryPageClient />
    </Suspense>
  );
}
