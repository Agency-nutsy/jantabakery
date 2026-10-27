/**
 * Janta Bakery — GA4 event helpers.
 * Never send personal data, phone numbers, WhatsApp message text, or customer details.
 */
type GtagFn = (command: string, action: string, params?: Record<string, unknown>) => void;
declare global { interface Window { gtag?: GtagFn; } }
export interface AnalyticsItem {
  itemId: string;
  itemName: string;
  itemCategory?: string;
  price?: number;
  quantity?: number;
}
interface CartAnalyticsItem { id: string; name: string; qty: number; }
function fireEvent(eventName: string, params?: Record<string, unknown>) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  } catch {
    // Analytics must never block a link or cart action.
  }
}
function toGaItem(item: AnalyticsItem) {
  return {
    item_id: item.itemId,
    item_name: item.itemName,
    ...(item.itemCategory ? { item_category: item.itemCategory } : {}),
    ...(typeof item.price === 'number' ? { price: item.price } : {}),
    quantity: item.quantity ?? 1,
  };
}
function ecommerceParams(items: AnalyticsItem[]) {
  const priced = items.filter((item) => typeof item.price === 'number');
  const value = priced.reduce((sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1), 0);
  return { currency: 'INR', ...(priced.length ? { value } : {}), items: items.map(toGaItem) };
}
function hamperEventParams(item: AnalyticsItem, quantity = item.quantity ?? 1) {
  return {
    ...ecommerceParams([{ ...item, quantity }]),
    hamper_id: item.itemId,
    hamper_name: item.itemName,
    ...(item.itemCategory ? { hamper_category: item.itemCategory } : {}),
  };
}
export const trackClickCall = () => fireEvent('click_call');
export const trackClickWhatsapp = () => fireEvent('click_whatsapp');
export const trackClickDirections = () => fireEvent('click_directions');
export const trackViewItem = (item: AnalyticsItem) =>
  fireEvent('view_item', hamperEventParams(item, 1));
export const trackAddToCart = (item: AnalyticsItem) =>
  fireEvent('add_to_cart', hamperEventParams(item));
export const trackRemoveFromCart = (item: AnalyticsItem) =>
  fireEvent('remove_from_cart', ecommerceParams([item]));
export const trackViewCart = (items: CartAnalyticsItem[]) =>
  fireEvent('view_cart', ecommerceParams(items.map((item) => ({
    itemId: item.id, itemName: item.name, quantity: item.qty,
  }))));
/** Records an order-intent click, not a completed sale. */
export const trackOrderWhatsappClick = (item: AnalyticsItem) =>
  fireEvent('order_whatsapp_click', hamperEventParams(item));
/** Records sending the current cart to WhatsApp, not a completed sale. */
export const trackSendOrderWhatsapp = (items: CartAnalyticsItem[]) =>
  fireEvent('send_order_whatsapp', ecommerceParams(items.map((item) => ({
    itemId: item.id, itemName: item.name, quantity: item.qty,
  }))));
export const trackMenuSearch = () => fireEvent('menu_search');
export const trackMenuCategorySelect = (category: string) => fireEvent('menu_category_select', { category });
export const trackClickInstagram = () => fireEvent('click_instagram');
