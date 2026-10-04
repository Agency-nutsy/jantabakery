'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, X, Plus, Minus, Send, ExternalLink, Trash2, Camera } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { menuItems, CATEGORY_LABELS, CATEGORY_ICONS, type MenuCategory, type MenuItem } from './menuData';

/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
   TYPES
   Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */

interface CartItem {
  id: string;
  name: string;
  qty: number;
}

/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
   CONSTANTS
   Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */

const ALL_CATEGORIES: MenuCategory[] = ['cakes', 'pastries', 'rusks', 'biscuits', 'namkeens', 'snacks'];
const MENU_TABS: ('all' | MenuCategory)[] = ['all', 'cakes', 'pastries', 'rusks', 'biscuits', 'namkeens', 'snacks'];

const TAB_LABELS: Record<'all' | MenuCategory, string> = {
  all: 'All',
  cakes: 'Cakes',
  pastries: 'Pastries',
  rusks: 'Rusks',
  biscuits: 'Biscuits',
  namkeens: 'Namkeens',
  snacks: 'Snacks',
};

const TAB_ICONS: Record<'all' | MenuCategory, string> = {
  all:      'âœ¨',
  cakes:    'ðŸŽ‚',
  pastries: 'ðŸ§',
  rusks:    'ðŸž',
  biscuits: 'ðŸª',
  namkeens: 'ðŸ«˜',
  snacks:   'ðŸ¥—',
};

const WA_NUMBER = '919717179565';

/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
   WHATSAPP MESSAGE BUILDER
   Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */

function buildWhatsAppUrl(cart: CartItem[]): string {
  const lines = cart.map((item) => `Ã¢â‚¬Â¢ ${item.qty}x ${item.name}`).join('\n');
  const text = `Hello Janta Bakery! I would like to place an order:\n\n${lines}\n\nPlease confirm availability and pricing. Thank you!`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
   CATEGORY Ã¢â€ â€™ GALLERY TAB MAPPING
   Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */
const CATEGORY_TO_GALLERY_TAB: Record<MenuCategory, string> = {
  cakes:     'Cakes',
  pastries:  'Pastries',
  rusks:     'Rusks',
  biscuits:  'Biscuits',
  namkeens:  'Namkeens',
  snacks:    'Snacks',
};

/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
   TEXT ROW Ã¢â‚¬â€ for items without photos
   Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */

function TextRow({
  item,
  onAdd,
  cartQty,
  onIncrement,
  onDecrement,
  }: {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
  cartQty: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-4 sm:px-5 sm:py-5 shadow-sm transition-all duration-200 hover:shadow-md hover:bg-soft-white border border-transparent hover:border-baby-pink/20">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <span className="text-base sm:text-lg font-medium text-charcoal truncate">
          {item.name.split(' (')[0]}
          {item.name.includes(' (') && (
            <span className="text-[10px] sm:text-[11px] text-muted-gray ml-1.5 font-normal">
              ({item.name.split(' (')[1]}
            </span>
          )}
        </span>
        {item.isSeasonal && (
          <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
            Seasonal
          </span>
        )}
        
      </div>
      {cartQty > 0 ? (
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onDecrement(item.id)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-baby-pink/20 text-rose transition-all duration-200 hover:bg-deep-pink hover:text-white active:scale-95"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="w-5 text-center text-sm font-bold text-charcoal">{cartQty}</span>
          <button
            onClick={() => onIncrement(item.id)}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-baby-pink/20 text-rose transition-all duration-200 hover:bg-deep-pink hover:text-white active:scale-95"
            aria-label="Increase quantity"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => onAdd(item)}
          id={`add-${item.id}`}
          className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-baby-pink/20 text-rose transition-all duration-200 hover:bg-deep-pink hover:text-white active:scale-95"
          aria-label={`Add ${item.name} to cart`}
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
   CART DRAWER
   Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */



function CartModal({
  cart,
  isOpen,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
  onClearCart,
}: {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
  onClearCart: () => void;
}) {
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

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
                      onClick={onClearCart}
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
                    <p className="text-sm text-muted-gray">Add items from the menu to get started</p>
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
                          <button onClick={() => onDecrement(item.id)} className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-charcoal shadow-sm transition-all hover:bg-deep-pink hover:text-white active:scale-95" aria-label="Decrease quantity">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-charcoal">{item.qty}</span>
                          <button onClick={() => onIncrement(item.id)} className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-charcoal shadow-sm transition-all hover:bg-deep-pink hover:text-white active:scale-95" aria-label="Increase quantity">
                            <Plus className="h-3 w-3" />
                          </button>
                          <button onClick={() => onRemove(item.id)} className="ml-1 flex h-7 w-7 items-center justify-center rounded-full text-muted-gray transition-all hover:bg-red-50 hover:text-red-500 active:scale-95" aria-label="Remove item">
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
                      onClick={onClearCart}
                      className="font-medium text-rose hover:text-red-600 hover:underline transition-colors"
                    >
                      Clear all items
                    </button>
                  </div>
                  <a
                    href={buildWhatsAppUrl(cart)}
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

/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â
   MAIN COMPONENT
   Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */

export default function MenuPageClient() {
  const [activeCategory, setActiveCategory] = useState<'all' | MenuCategory>('all');
  const [highlightedCategory, setHighlightedCategory] = useState<'all' | MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Restore cart from localStorage on mount so it persists across navigation
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('janta-cart');
        return saved ? JSON.parse(saved) : [];
      } catch { return []; }
    }
    return [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const isManualScrollingRef = useRef(false);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('janta-cart', JSON.stringify(cart));
    } catch { /* storage full or disabled */ }
  }, [cart]);

  // Always start at the very top on initial mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const isSearching = searchQuery.trim().length > 0;

  // Search matches across all menu items (name + category)
  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const q = searchQuery.toLowerCase().trim();
    return menuItems.filter((item) =>
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      CATEGORY_LABELS[item.category].toLowerCase().includes(q)
    );
  }, [isSearching, searchQuery]);

  // Scroll-spy: in 'all' mode, highlight the category currently in view
  useEffect(() => {
    if (activeCategory !== 'all' || isSearching) return;

    const onScroll = () => {
      if (isManualScrollingRef.current) return;
      if (window.scrollY < 240) {
        setHighlightedCategory('all');
        return;
      }

      const threshold = 180;
      let current: 'all' | MenuCategory = 'all';

      for (const cat of ALL_CATEGORIES) {
        const el = document.getElementById(`menu-category-${cat}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold) {
            current = cat;
          }
        }
      }
      setHighlightedCategory(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeCategory, isSearching]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = useCallback((item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { id: item.id, name: item.name, qty: 1 }];
    });
  }, []);

  const incrementItem = useCallback((id: string) => {
    setCart((prev) => prev.map((c) => c.id === id ? { ...c, qty: c.qty + 1 } : c));
  }, []);

  const decrementItem = useCallback((id: string) => {
    setCart((prev) => {
      const item = prev.find((c) => c.id === id);
      if (!item) return prev;
      if (item.qty <= 1) return prev.filter((c) => c.id !== id);
      return prev.map((c) => c.id === id ? { ...c, qty: c.qty - 1 } : c);
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const handleTabClick = (tab: 'all' | MenuCategory) => {
    isManualScrollingRef.current = true;
    setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 800); // Disable scroll spy for 800ms during smooth scroll

    setSearchQuery('');
    if (tab === 'all') {
      setActiveCategory('all');
      setHighlightedCategory('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (activeCategory === 'all') {
      const el = document.getElementById(`menu-category-${tab}`);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 145;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        setHighlightedCategory(tab);
      }
    } else {
      setActiveCategory(tab);
      if (filterBarRef.current) {
        const filterBarTop = filterBarRef.current.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY > filterBarTop) {
          window.scrollTo({ top: filterBarTop - 74, behavior: 'smooth' });
        }
      }
    }
  };

  const isTabActive = (tab: 'all' | MenuCategory) => {
    if (isSearching) return false;
    if (activeCategory === 'all') {
      return highlightedCategory === tab;
    }
    return activeCategory === tab;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-warm-cream via-white to-soft-white">
      {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â PAGE HERO Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
      <section className="relative overflow-hidden pt-28 pb-14">

        <div className="absolute -top-28 left-1/2 -translate-x-1/2 h-72 w-[850px] rounded-full bg-baby-pink/25 blur-3xl pointer-events-none" />
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-baby-pink/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-[family-name:var(--font-display)] text-5xl font-bold text-charcoal sm:text-6xl"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-lg text-muted-gray"
          >
            Freshly baked every day across all categories
          </motion.p>
        </div>
      </section>

      {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â STICKY FILTER BAR (SEARCH + CATEGORIES) Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
      {/* Sticky Category Tabs & Search Bar Ã¢â‚¬â€ Styled as a Floating Dark Glass Pill matching the Navbar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        ref={filterBarRef}
        className="sticky top-[84px] z-40 flex justify-center px-4 pointer-events-none transition-all duration-300 mb-6"
      >
        <div
          style={{
            backgroundColor: 'rgba(26, 17, 20, 0.88)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderColor: 'rgba(255, 182, 193, 0.28)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.28), 0 0 24px rgba(255,182,193,0.18), inset 0 1px 0 rgba(255,182,193,0.22)',
          }}
          className="pointer-events-auto w-full max-w-5xl rounded-3xl md:rounded-full border p-2 md:px-4 md:py-2 transition-[box-shadow,border-color] duration-300"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-2.5">
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto py-1 md:py-0.5 pb-2 md:pb-0.5 category-scroll">
              {MENU_TABS.map((tab) => {
                const active = isTabActive(tab);
                return (
                  <button
                    key={tab}
                    id={`tab-${tab}`}
                    onClick={() => handleTabClick(tab)}
                    className={`shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 ${
                      active
                        ? 'bg-gradient-to-r from-deep-pink to-rose text-white shadow-[0_2px_12px_rgba(235,94,85,0.45)] border border-baby-pink/40 scale-[1.02]'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {TAB_LABELS[tab]}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-baby-pink/80 pointer-events-none" />
              <input
                id="menu-search"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  const val = e.target.value;
                  const wasEmpty = !searchQuery.trim();
                  const isNowEmpty = !val.trim();
                  setSearchQuery(val);
                  if (val.trim() && window.scrollY > 0) {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  } else if (isNowEmpty && !wasEmpty && window.scrollY > 0) {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }
                }}
                placeholder="Search menu..."
                className="block w-full rounded-full border border-baby-pink/25 bg-white/10 py-1.5 pl-8 pr-8 text-xs text-white placeholder:text-white/45 focus:border-baby-pink/70 focus:bg-white/15 focus:outline-none focus:ring-1 focus:ring-baby-pink/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â MENU CONTENT Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
      <section className="flex-1 py-10 px-4">
        <div className="mx-auto max-w-7xl">
          {isSearching ? (
            /* â”€â”€ SEARCH RESULTS â”€â”€ */
            <div>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm font-medium text-muted-gray">
                  Found <span className="font-bold text-charcoal">{searchResults.length}</span> items matching &ldquo;{searchQuery}&rdquo;
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="text-xs font-semibold text-deep-pink hover:underline"
                >
                  Clear search
                </button>
              </div>

              {searchResults.length === 0 ? (
                <div className="py-16 text-center text-muted-gray">
                  <p className="text-lg">No items found for &ldquo;{searchQuery}&rdquo;</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                    className="mt-4 rounded-full bg-baby-pink/20 px-5 py-2 text-sm font-semibold text-rose hover:bg-deep-pink hover:text-white transition-all shadow-xs"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {searchResults.map((item) => (
                    <TextRow
                      key={item.id}
                      item={item}
                      onAdd={addToCart}
                      cartQty={cart.find((c) => c.id === item.id)?.qty ?? 0}
                      onIncrement={incrementItem}
                      onDecrement={decrementItem}
                                          />
                  ))}
                </div>
              )}
            </div>
          ) : activeCategory === 'all' ? (
            /* â”€â”€ ALL CATEGORIES VIEW (One after another with scroll-spy) â”€â”€ */
            <div className="space-y-16">
              {ALL_CATEGORIES.map((cat) => {
                const catItems = menuItems.filter((i) => i.category === cat);

                return (
                  <div
                    key={cat}
                    id={`menu-category-${cat}`}
                    className="scroll-mt-36"
                  >
                    {/* Category heading */}
                    <div className="mb-6 flex items-center gap-3 border-b border-baby-pink/20 pb-3">
                      <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-charcoal">
                        {TAB_LABELS[cat]}
                      </h2>
                    </div>

                    {/* All items in category */}
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {catItems.map((item) => (
                        <TextRow
                          key={item.id}
                          item={item}
                          onAdd={addToCart}
                          cartQty={cart.find((c) => c.id === item.id)?.qty ?? 0}
                          onIncrement={incrementItem}
                          onDecrement={decrementItem}
                                                  />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* â”€â”€ SINGLE CATEGORY VIEW â”€â”€ */
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                {/* Category heading */}
                <div className="mb-6 flex items-center justify-between border-b border-baby-pink/20 pb-3">
                  <div className="flex items-center gap-3">
                    <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-charcoal">
                      {TAB_LABELS[activeCategory]}
                    </h2>
                  </div>
                  <button
                    onClick={() => handleTabClick('all')}
                    className="text-xs font-semibold text-deep-pink hover:underline"
                  >
                    View All Categories â†’
                  </button>
                </div>

                {/* Items in active category */}
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {menuItems
                    .filter((i) => i.category === activeCategory)
                    .map((item) => (
                      <TextRow
                        key={item.id}
                        item={item}
                        onAdd={addToCart}
                        cartQty={cart.find((c) => c.id === item.id)?.qty ?? 0}
                        onIncrement={incrementItem}
                        onDecrement={decrementItem}
                                              />
                    ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>


{/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â CUSTOM ORDER CTA Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
      <section className="py-16 px-4 bg-gradient-to-br from-warm-cream to-baby-pink/20">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-charcoal sm:text-4xl">
              Looking for a Custom Cake?
            </p>
            <p className="mt-3 text-muted-gray">
              Weddings Â· Birthdays Â· Anniversaries Â· Corporate Events
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:+919717179565"
                className="flex items-center gap-2 rounded-full border-2 border-deep-pink bg-white px-8 py-4 text-base font-semibold text-deep-pink shadow-md transition-all duration-300 hover:bg-deep-pink hover:text-white hover:shadow-xl hover:scale-105"
              >
                ðŸ“ž Call Us
              </a>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello Janta Bakery! I would like to enquire about a custom cake.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-whatsapp-green px-8 py-4 text-base font-semibold text-white shadow-xl shadow-whatsapp-green/30 transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                ðŸ’¬ WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â FLOATING CART BUTTON Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
      {/* FLOATING CART BAR */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto w-full flex items-center justify-between gap-3 rounded-full border px-4 py-2.5 transition-all duration-300 shadow-2xl"
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
                onClick={() => setIsCartOpen(true)}
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
                  {cartCount} {cartCount === 1 ? 'item' : 'items'} in cart
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
                  onClick={() => setIsCartOpen(true)}
                  className="shrink-0 rounded-full bg-gradient-to-r from-deep-pink to-rose px-4 py-2 text-xs font-bold text-white shadow-md hover:brightness-110 active:scale-95 transition-all duration-200"
                >
                  View Order &rarr;
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â CART DRAWER Ã¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢ÂÃ¢â€¢Â */}
      <CartModal
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onIncrement={incrementItem}
        onDecrement={decrementItem}
        onRemove={removeItem}
        onClearCart={clearCart}
      />


    </div>
  );
}
