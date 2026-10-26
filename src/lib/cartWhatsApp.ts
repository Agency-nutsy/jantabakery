import { hampersData, getHamperBySlug, getHamperOrderName } from '@/data/giftingData';
import { PHONE_DIGITS, SITE_URL } from '@/lib/siteConfig';
import type { CartItem } from '@/lib/cartContext';

/**
 * Builds the WhatsApp order link for the cart.
 * If an item is a hamper (from the gifting collection), its dedicated preview link is attached
 * so bakery staff can see the exact product photo, items list, and packaging details.
 * Regular bakery menu items are listed cleanly without links.
 */
export function buildCartWhatsAppUrl(cart: CartItem[]): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : SITE_URL;
  const baseUrl = origin.includes('localhost') ? SITE_URL : origin;

  const lines = cart
    .map((item) => {
      const cleanName = item.name.replace(/\s*\([^)]*\d+\s*(?:g|kg|gm|ml|l|pc|pcs)[^)]*\)/gi, '').trim();

      // Check if this item is a hamper (by ID, slug, or by name)
      const rawId = item.id.replace(/^gifting-/, '');
      const matchedHamper =
        getHamperBySlug(rawId) ||
        getHamperBySlug(item.id) ||
        hampersData.find(
          (h) =>
            h.id === rawId ||
            h.id === item.id ||
            h.name.toLowerCase() === item.name.toLowerCase() ||
            h.name.toLowerCase() === cleanName.toLowerCase() ||
            getHamperOrderName(h).toLowerCase() === item.name.toLowerCase() ||
            getHamperOrderName(h).toLowerCase() === cleanName.toLowerCase()
        );

      const isHamper =
        Boolean(matchedHamper) ||
        rawId.startsWith('featured-') ||
        rawId.startsWith('basket-') ||
        rawId.startsWith('boxed-') ||
        rawId.startsWith('dry-fruit-') ||
        item.id.startsWith('gifting-') ||
        item.name.toLowerCase().includes('hamper');

      if (isHamper) {
        const hamperSlug = matchedHamper ? matchedHamper.id : rawId;
        return `${item.qty}x *${cleanName}*\n${baseUrl}/gifting/${hamperSlug}`;
      }
      return `${item.qty}x ${cleanName}`;
    })
    .join('\n\n');

  const text = `Hello Janta Bakery! I would like to place an order:\n\n${lines}\n\nPlease confirm availability and pricing. Thank you!`;
  return `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(text)}`;
}
