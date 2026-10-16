/**
 * Janta Bakery — GA4 event helpers.
 *
 * All event firing is resilient: if window.gtag is undefined (GA blocked or
 * NEXT_PUBLIC_GA_ID not set), the call is silently skipped.
 * Events never delay or prevent phone/map/WhatsApp links from working.
 *
 * NOTE: Do NOT send personal data, order contents, phone numbers, or message
 * text to GA.
 */

type GtagFn = (
  command: string,
  action: string,
  params?: Record<string, string | number | boolean>
) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

function fireEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  } catch {
    // GA blocked or unavailable — fail silently
  }
}

export const trackClickCall = () => fireEvent('click_call');
export const trackClickWhatsapp = () => fireEvent('click_whatsapp');
export const trackClickDirections = () => fireEvent('click_directions');
export const trackAddToCart = (itemName: string) =>
  fireEvent('add_to_cart', { item_name: itemName });
export const trackRemoveFromCart = (itemName: string) =>
  fireEvent('remove_from_cart', { item_name: itemName });
export const trackSendOrderWhatsapp = () => fireEvent('send_order_whatsapp');
export const trackMenuSearch = () => fireEvent('menu_search');
export const trackMenuCategorySelect = (category: string) =>
  fireEvent('menu_category_select', { category });
export const trackClickInstagram = () => fireEvent('click_instagram');
