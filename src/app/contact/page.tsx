import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';
import { SITE_URL, PHONE_DISPLAY } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: 'Contact — Get In Touch',
  description:
    `Contact Janta Bakery at 43 Central Road, Bhogal, Jangpura, New Delhi. Call ${PHONE_DISPLAY}, WhatsApp us, or visit our store. Open 7 days: 8 AM – 9 PM.`,
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: 'Contact Janta Bakery — Bhogal, Jangpura, New Delhi',
    description: `Call us at ${PHONE_DISPLAY} or WhatsApp. Located at 43 Central Road, Bhogal, Jangpura, New Delhi. Open Mon–Sun 8 AM–9 PM.`,
    url: `${SITE_URL}/contact`,
    images: [{ url: `${SITE_URL}/whatsapp-hero.webp`, width: 1200, height: 630, alt: 'Contact Janta Bakery' }],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
