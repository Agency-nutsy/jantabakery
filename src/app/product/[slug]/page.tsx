import { permanentRedirect, notFound } from 'next/navigation';
import { getHamperBySlug } from '@/data/giftingData';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductRedirectPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const hamper = getHamperBySlug(slug);

  if (hamper) {
    permanentRedirect(`/gifting/${hamper.id}`);
  }

  notFound();
}
