'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2, Send } from 'lucide-react';
import { useCart, type CartItem } from '@/lib/cartContext';
import { PHONE_DIGITS } from '@/lib/siteConfig';

export function buildWhatsAppOrderUrl(cart: CartItem[]): string {
  const lines = cart.map((item) => {
    // Strip weight/pack sizes from the display name for a cleaner WhatsApp message
    const cleanName = item.name.replace(/\s*\([^)]*\d+\s*(?:g|kg|gm|ml|l|pc|pcs)[^)]*\)/gi, '').trim();
    return `${item.qty}x ${cleanName}`;
  }).join('\n');
  const text = `Hello Janta Bakery! I would like to place an order:\n\n${lines}\n\nPlease confirm availability and pricing. Thank you!`;
  return `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(text)}`;
}

export function FloatingCartBar({
  isVisible,
  onOpenCart,
}: {
  isVisible: boolean;
  onOpenCart: () => void;
}) {
  const { cartCount, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isVisible && cartCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          className="fixed z-40 bottom-4 left-4 right-[5.5rem] md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-full md:max-w-md pointer-events-none md:px-4"
        >
          <div
            className="pointer-events-auto w-full flex items-center justify-between gap-2 md:gap-3 rounded-full border px-3 py-2 md:px-4 md:py-2.5 transition-all duration-300 shadow-2xl"
            style={{
              backgroundColor: 'rgba(26, 17, 20, 0.94)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              borderColor: 'rgba(255, 182, 193, 0.30)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.32), 0 0 24px rgba(235,94,85,0.20), inset 0 1px 0 rgba(255,182,193,0.18)',
            }}
          >
            <button
              type="button"
              onClick={onOpenCart}
              id="open-cart-button"
              aria-label="Open cart"
              className="flex items-center gap-2.5 flex-1 min-w-0 text-left hover:opacity-90 transition-opacity py-1 pl-1"
            >
              <div className="relative shrink-0">
                <ShoppingCart className="h-5 w-5 text-white/80" />
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-deep-pink text-[10px] font-bold text-white leading-none">
                  {cartCount}
                </span>
              </div>
              <span className="text-sm font-semibold text-white/90 truncate">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            </button>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={clearCart}
                id="floating-clear-cart-button"
                aria-label="Clear cart"
                title="Clear whole cart"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-rose/25 hover:text-rose hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onOpenCart}
                className="shrink-0 rounded-full bg-gradient-to-r from-deep-pink to-rose px-3 py-1.5 md:px-4 md:py-2 text-xs font-bold text-white shadow-md hover:brightness-110 active:scale-95 transition-all duration-200"
              >
                View Order &rarr;
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CartModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { cart, incrementItem, decrementItem, removeItem, clearCart } = useCart();
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm"
          />

          {/* Centered Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 24 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full max-w-md flex flex-col rounded-3xl bg-white shadow-2xl overflow-hidden"
              style={{ maxHeight: '85vh' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-baby-pink/20 px-6 py-4 shrink-0">
                <div className="flex items-center gap-2.5">
                  <ShoppingCart className="h-5 w-5 text-deep-pink" />
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-charcoal">
                    Your Order
                  </h2>
                  {totalItems > 0 && (
                    <span className="rounded-full bg-deep-pink px-2 py-0.5 text-xs font-bold text-white">
                      {totalItems}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      id="clear-cart-button"
                      className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-rose hover:bg-red-50 hover:text-red-600 transition-colors"
                      title="Clear whole cart"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Clear Cart
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted-gray transition-colors hover:bg-baby-pink/20 hover:text-charcoal"
                    aria-label="Close cart"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 modal-scroll">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                    <ShoppingCart className="h-12 w-12 text-baby-pink" />
                    <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-charcoal/60">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-muted-gray">Add items to get started</p>
                  </div>
                ) : (
                  <ul className="space-y-2.5">
                    {cart.map((item) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-3 rounded-xl border border-baby-pink/15 bg-soft-white px-4 py-3"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-charcoal truncate">{item.name}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => decrementItem(item.id)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-charcoal shadow-sm transition-all hover:bg-deep-pink hover:text-white active:scale-95"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-charcoal">{item.qty}</span>
                          <button
                            onClick={() => incrementItem(item.id)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-charcoal shadow-sm transition-all hover:bg-deep-pink hover:text-white active:scale-95"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-1 flex h-7 w-7 items-center justify-center rounded-full text-muted-gray transition-all hover:bg-red-50 hover:text-red-500 active:scale-95"
                            aria-label="Remove item"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="border-t border-baby-pink/20 px-6 py-4 space-y-3 shrink-0">
                  <div className="flex items-center justify-between text-xs text-muted-gray">
                    <span>Prices confirmed on WhatsApp</span>
                    <button
                      onClick={clearCart}
                      className="font-medium text-rose hover:text-red-600 hover:underline transition-colors"
                    >
                      Clear all items
                    </button>
                  </div>
                  <a
                    href={buildWhatsAppOrderUrl(cart)}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="whatsapp-order-button"
                    className="flex w-full items-center justify-center gap-3 rounded-full bg-whatsapp-green py-4 text-base font-bold text-white shadow-xl shadow-whatsapp-green/30 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Send className="h-5 w-5" />
                    Send Order on WhatsApp
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
