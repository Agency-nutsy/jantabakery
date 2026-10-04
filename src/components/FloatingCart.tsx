'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2, Send } from 'lucide-react';
import { useCart } from '@/lib/cartContext';

const WA_NUMBER = '919717179565';

function buildWhatsAppUrl(cart: { name: string; qty: number }[]): string {
  const lines = cart.map((item) => `• ${item.qty}x ${item.name}`).join('\n');
  const text = `Hello Janta Bakery! I would like to place an order:\n\n${lines}\n\nPlease confirm availability and pricing. Thank you!`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function FloatingCart() {
  const { cart, cartCount, incrementItem, decrementItem, removeItem, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  // Don't render the button at all if cart is empty
  if (cartCount === 0 && !isOpen) return null;

  return (
    <>
      {/* ── FLOATING CART BUTTON ── */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.button
            key="cart-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-[7.5rem] right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-deep-pink/40 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-deep-pink/50"
            style={{
              background: 'linear-gradient(135deg, #eb5e55 0%, #c8717a 100%)',
            }}
            aria-label={`Open cart — ${cartCount} items`}
          >
            <ShoppingCart className="h-6 w-6 text-white" />
            {/* Badge */}
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-deep-pink shadow">
              {cartCount}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── CART DRAWER ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 32 }}
              className="fixed right-0 top-0 bottom-0 z-50 flex w-full max-w-sm flex-col shadow-2xl"
              style={{
                backgroundColor: 'rgba(26, 17, 20, 0.97)',
                backdropFilter: 'blur(24px) saturate(180%)',
                borderLeft: '1px solid rgba(255, 182, 193, 0.2)',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-baby-pink/20 px-5 py-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-baby-pink" />
                  <h2 className="font-semibold text-white">Your Cart</h2>
                  <span className="rounded-full bg-baby-pink/20 px-2 py-0.5 text-xs font-bold text-baby-pink">
                    {cartCount} item{cartCount !== 1 ? 's' : ''}
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Items list */}
              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-3 py-16 text-center">
                    <ShoppingCart className="h-12 w-12 text-white/20" />
                    <p className="text-white/40 text-sm">Your cart is empty</p>
                    <p className="text-white/25 text-xs">Add items from the menu!</p>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/5 px-3 py-3"
                      >
                        <span className="flex-1 text-sm text-white/90 leading-snug">{item.name}</span>
                        <div className="flex shrink-0 items-center gap-1.5">
                          <button
                            onClick={() => decrementItem(item.id)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-baby-pink/30 hover:text-white"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold text-white">{item.qty}</span>
                          <button
                            onClick={() => incrementItem(item.id)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-baby-pink/30 hover:text-white"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-1 flex h-7 w-7 items-center justify-center rounded-full text-white/30 transition-colors hover:bg-rose/20 hover:text-rose"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer actions */}
              {cart.length > 0 && (
                <div className="border-t border-baby-pink/20 px-4 py-4 space-y-2.5">
                  <a
                    href={buildWhatsAppUrl(cart)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { clearCart(); setIsOpen(false); }}
                    className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                    style={{
                      background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                      boxShadow: '0 4px 20px rgba(37, 211, 102, 0.35)',
                    }}
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    Send Order on WhatsApp
                  </a>
                  <button
                    onClick={clearCart}
                    className="flex w-full items-center justify-center gap-1.5 rounded-full border border-white/10 py-2.5 text-xs font-medium text-white/40 transition-colors hover:border-rose/30 hover:text-rose/70"
                  >
                    <Trash2 className="h-3 w-3" />
                    Clear cart
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
