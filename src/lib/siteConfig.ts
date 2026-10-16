/**
 * Janta Bakery -- Central site configuration.
 * All shared constants live here so they stay in sync across every page.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jantabakery.com';

/** Founding year -- used to compute years-in-business dynamically. */
export const FOUNDED_YEAR = 1967;

/** Returns how many years Janta Bakery has been in business as of the current year. */
export function yearsInBusiness(): number {
  return new Date().getFullYear() - FOUNDED_YEAR;
}

/** Phone -- E.164 digits only (no spaces, no +) */
export const PHONE_DIGITS = '919717179565';

/** Phone -- formatted for display */
export const PHONE_DISPLAY = '+91 97171 79565';

/** Phone -- tel: href */
export const PHONE_HREF = 'tel:+919717179565';

/** WhatsApp -- base link (no pre-filled text) */
export const WHATSAPP_BASE = 'https://wa.me/919717179565';

/** WhatsApp -- general enquiry link */
export const WHATSAPP_ENQUIRY = WHATSAPP_BASE + '?text=' + encodeURIComponent('Hello Janta Bakery! I would like to enquire about...');

/** WhatsApp -- quick contact link */
export const WHATSAPP_HELLO = WHATSAPP_BASE + '?text=' + encodeURIComponent('Hello Janta Bakery!');

export const BUSINESS_NAME = 'Janta Bakery';

export const ADDRESS = {
  street: '43, Central Road, Samman Bazar',
  locality: 'Bhogal, Jangpura',
  city: 'New Delhi',
  postalCode: '110014',
  region: 'Delhi',
  country: 'IN',
  full: '43, Central Road, Samman Bazar, Bhogal, Jangpura, New Delhi 110014',
  short: '43, Central Rd, Jangpura, Samman Bazar, Bhogal, New Delhi - 110014',
};

export const OPENING_HOURS = 'Mo-Su 08:00-21:00';
export const OPENING_HOURS_DISPLAY = 'Monday - Sunday: 8:00 AM - 9:00 PM';

export const INSTAGRAM_URL = 'https://www.instagram.com/jantabakery1967';
export const MAPS_PLACE_URL = 'https://www.google.com/maps/place/?q=place_id:ChIJ2zY65zDkDTkR9K2P64d4G8Q';
export const MAPS_DIRECTIONS_URL = 'https://maps.app.goo.gl/QmQerXUhGQXYYSaVA';