import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact — Get In Touch',
  description:
    'Contact Janta Bakery at 43 Central Road, Bhogal, Jangpura, New Delhi. Call 011-24373877, WhatsApp us, or visit our store. Open 7 days: 8 AM – 9 PM.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
