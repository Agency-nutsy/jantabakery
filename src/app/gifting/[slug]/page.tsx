import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  hampersData,
  getHamperBySlug,
  getHamperOrderName,
  getHamperDescription,
} from '@/data/giftingData';
import { SITE_URL } from '@/lib/siteConfig';
import HamperDetailClient from './HamperDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return hampersData.map((hamper) => ({
    slug: hamper.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const hamper = getHamperBySlug(slug);

  if (!hamper) {
    return {
      title: 'Hamper Not Found | Janta Bakery',
      description: 'The requested festive gift hamper was not found. Browse all festive hampers at Janta Bakery.',
    };
  }

  const orderName = getHamperOrderName(hamper);
  const title = `${orderName} — Festive Gift Hamper | Janta Bakery`;
  const description = `${getHamperDescription(hamper)} Handcrafted fresh in Bhogal, New Delhi. Call/WhatsApp +91 97171 79565 for bulk & festive orders.`;
  const ogImageUrl = `${SITE_URL}/gallery/hampers/og/${hamper.id}.jpg`;
  const pageUrl = `${SITE_URL}/gifting/${hamper.id}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'Janta Bakery — Since 1967',
      locale: 'en_IN',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${orderName} — Janta Bakery`,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function HamperPage({ params }: PageProps) {
  const { slug } = await params;
  const hamper = getHamperBySlug(slug);

  if (!hamper) {
    notFound();
  }

  // Get related hampers from the same category or general collection
  const sameCategory = hampersData.filter(
    (h) => h.category === hamper.category && h.id !== hamper.id
  );
  const otherHampers = hampersData.filter(
    (h) => h.category !== hamper.category && h.id !== hamper.id
  );
  const relatedHampers = [...sameCategory, ...otherHampers].slice(0, 4);

  return <HamperDetailClient hamper={hamper} relatedHampers={relatedHampers} />;
}
