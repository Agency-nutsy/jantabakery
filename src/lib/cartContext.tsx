'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */

export interface CartItem {
  id: string;
  name: string;
  qty: number;
}

interface CartContextValue {
  cart: CartItem[];
  cartCount: number;
  addToCart: (item: { id: string; name: string }) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

/* ═══════════════════════════════════════════
   CONTEXT
   ═══════════════════════════════════════════ */

function cleanItemName(name: string): string {
  if (!name) return '';
  return name.replace(/\s*\([^)]*\d+\s*(?:g|kg|gm|ml|l|pc|pcs)[^)]*\)/gi, '').trim();
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage only after mount on client to avoid SSR hydration mismatch
  useEffect(() => {
    try {
      const saved = localStorage.getItem('janta-cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Normalize legacy IDs (e.g. 'madrasi-mixture-200g' -> 'madrasi-mixture')
          // and deduplicate / merge quantities if needed
          const merged: CartItem[] = [];
          for (const raw of parsed) {
            if (!raw || !raw.id || typeof raw.name !== 'string') continue;
            const cleanId = raw.id.replace(/-(?:[0-9]+(?:g|kg|ml|l|pc|pcs)|half|full)$/i, '');
            const sanitizedName = cleanItemName(raw.name);
            const existing = merged.find((m) => m.id === cleanId || m.id === raw.id);
            if (existing) {
              existing.name = sanitizedName;
              existing.qty += raw.qty || 1;
            } else {
              merged.push({
                id: cleanId,
                name: sanitizedName,
                qty: Math.max(1, raw.qty || 1),
              });
            }
          }
          setCart(merged);
        }
      }
    } catch { /* storage full or disabled */ }
    setIsLoaded(true);
  }, []);

  // Persist to localStorage on every change, only after initial load has occurred
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('janta-cart', JSON.stringify(cart));
    } catch { /* storage full or disabled */ }
  }, [cart, isLoaded]);

  const addToCart = useCallback((item: { id: string; name: string }) => {
    const cleanName = cleanItemName(item.name);
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id || c.id.startsWith(`${item.id}-`));
      if (existing) {
        return prev.map((c) => c.id === existing.id ? { ...c, name: cleanName, qty: c.qty + 1 } : c);
      }
      return [...prev, { id: item.id, name: cleanName, qty: 1 }];
    });
  }, []);

  const incrementItem = useCallback((id: string) => {
    setCart((prev) => {
      const item = prev.find((c) => c.id === id || c.id.startsWith(`${id}-`) || id.startsWith(`${c.id}-`));
      const targetId = item ? item.id : id;
      return prev.map((c) => c.id === targetId ? { ...c, qty: c.qty + 1 } : c);
    });
  }, []);

  const decrementItem = useCallback((id: string) => {
    setCart((prev) => {
      const item = prev.find((c) => c.id === id || c.id.startsWith(`${id}-`) || id.startsWith(`${c.id}-`));
      if (!item) return prev;
      const targetId = item.id;
      if (item.qty <= 1) return prev.filter((c) => c.id !== targetId);
      return prev.map((c) => c.id === targetId ? { ...c, qty: c.qty - 1 } : c);
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => {
      const item = prev.find((c) => c.id === id || c.id.startsWith(`${id}-`) || id.startsWith(`${c.id}-`));
      const targetId = item ? item.id : id;
      return prev.filter((c) => c.id !== targetId);
    });
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, incrementItem, decrementItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
