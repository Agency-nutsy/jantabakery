'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Plus,
  Minus,
  ShoppingCart,
  Share2,
  Check,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Phone,
  Building2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import {
  hampersData,
  featuredHampersData,
  GIFTING_CATEGORIES,
  CATEGORY_COVERS,
  type HamperItem,
  type GiftingCategory,
} from '@/data/giftingData';
import { useCart } from '@/lib/cartContext';
import { PHONE_DIGITS, PHONE_HREF, SITE_URL } from '@/lib/siteConfig';
import { trackClickWhatsapp, trackAddToCart } from '@/lib/analytics';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
    </svg>
  );
}

function getHamperOrderName(hamper: HamperItem): string {
  // Dry fruit and featured hampers already have their full name (e.g. Featured Hamper 1, Dry Fruit Hamper 1)
  if (hamper.category === 'dry-fruit' || hamper.category === 'featured') {
    return hamper.name;
  }
  // Generic hampers without a distinctive artwork name (e.g. Festive Hamper 01)
  if (hamper.name.startsWith('Festive Hamper')) {
    return `${hamper.name} (Basket Hamper)`;
  }
  // Distinct named hampers (e.g. Rani Rang, Vaibhav Vistara, etc.) — NO category in bracket
  return hamper.name;
}

function buildHamperWhatsAppUrl(hamper: HamperItem): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : SITE_URL;
  const productUrl = `${origin}/gifting/${hamper.id}`;
  const orderName = getHamperOrderName(hamper);
  const text = `Hi, I want to order:
*${orderName}*
Quantity: 1

${productUrl}`;

  return `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(text)}`;
}

function getHamperAspectRatioClass(category: GiftingCategory, id: string): string {
  if (category === 'dry-fruit') return 'aspect-square';
  if (category === 'featured') return 'aspect-[4/5]';
  if (category === 'basket') return 'aspect-[4/5]';
  if (
    id === 'boxed-divya-jyoti' ||
    id === 'boxed-gulabi-nazrana' ||
    id === 'boxed-janta-wishes' ||
    id === 'boxed-shahi-saugaat'
  ) {
    return 'aspect-[2/3]';
  }
  if (
    id === 'boxed-khushiyon-ki-saugaat' ||
    id === 'boxed-neel-kamal' ||
    id === 'boxed-sadaiv-mangal' ||
    id === 'boxed-swarnim-utsav'
  ) {
    return 'aspect-[3/4]';
  }
  return 'aspect-[4/5]';
}

export default function GiftingPageClient() {
  const [activeCategory, setActiveCategory] = useState<'all' | GiftingCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { cart, addToCart, incrementItem, decrementItem } = useCart();
  const filterBarRef = useRef<HTMLDivElement>(null);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 150);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Support direct hash navigation on page load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('ring-4', 'ring-rose/60');
          setTimeout(() => el.classList.remove('ring-4', 'ring-rose/60'), 3000);
        }, 400);
      }
    }
  }, []);

  // Filter hampers by category and query
  const filteredHampers = useMemo(() => {
    let result = hampersData;

    if (activeCategory !== 'all') {
      result = result.filter((h) => h.category === activeCategory);
    }

    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase().trim();
      result = result.filter((h) => {
        const textToMatch = `${h.name} ${h.categoryLabel}`.toLowerCase();
        return textToMatch.includes(q);
      });
    }

    return result;
  }, [activeCategory, debouncedQuery]);


  // Tab click handler with scroll to top
  const handleCategoryClick = useCallback((cat: 'all' | GiftingCategory) => {
    setActiveCategory(cat);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Lightbox handlers
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const navigateLightbox = useCallback(
    (direction: number, e?: React.MouseEvent) => {
      e?.stopPropagation();
      setLightboxIndex((prev) => {
        if (prev === null) return null;
        let next = prev + direction;
        if (next < 0) next = filteredHampers.length - 1;
        if (next >= filteredHampers.length) next = 0;
        return next;
      });
    },
    [filteredHampers.length]
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, closeLightbox, navigateLightbox]);

  // Share handler
  const handleShare = async (hamper: HamperItem) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : SITE_URL;
    const shareUrl = `${origin}/gifting/${hamper.id}`;
    const shareText = `Check out this ${hamper.name} (${hamper.categoryLabel}) from Janta Bakery!`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${hamper.name} — Janta Bakery`,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopiedId(hamper.id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Fallback silent
    }
  };

  const renderHamperCard = (hamper: HamperItem, index: number, isFeaturedView = false) => {
    const cartKey = hamper.id;
    const inCartItem = cart.find((c) => c.id === cartKey);
    const inCartQty = inCartItem?.qty || 0;
    const isFeatured = isFeaturedView || hamper.category === 'featured';

    return (
      <motion.div
        key={hamper.id}
        id={hamper.id}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: (index % 8) * 0.04, duration: 0.3 }}
        className={`group flex flex-col rounded-2xl bg-white transition-all duration-300 hover:-translate-y-0.5 overflow-hidden ${
          isFeatured
            ? 'shadow-sm ring-1 ring-amber-500/25 hover:shadow-xl hover:ring-amber-500/50'
            : 'shadow-xs hover:shadow-lg'
        }`}
      >
        {/* Hamper Image Box */}
        <div
          onClick={() => openLightbox(index)}
          className={`relative w-full ${getHamperAspectRatioClass(
            hamper.category,
            hamper.id
          )} overflow-hidden cursor-pointer bg-warm-cream/30`}
        >
          <Image
            src={hamper.image}
            alt={hamper.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            loading={isFeatured && index < 4 ? undefined : 'lazy'}
            priority={isFeatured && index < 4}
          />

          {/* Hover Overlay with Zoom Icon */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <span className="flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-charcoal shadow-md backdrop-blur-xs">
              <ZoomIn className="h-3.5 w-3.5 text-rose" />
              View
            </span>
          </div>
        </div>

        {/* Hamper Content */}
        <div className="p-3 sm:p-3.5 flex flex-col flex-1 justify-between gap-2.5">
          {/* Title & Share */}
          <div className="flex items-start justify-between gap-1.5 min-w-0">
            <div className="min-w-0 flex-1">
              <h3 className="font-[family-name:var(--font-display)] text-base sm:text-lg font-bold text-charcoal leading-snug line-clamp-2">
                {hamper.name}
              </h3>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare(hamper);
              }}
              title="Share Hamper"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-warm-cream/80 text-charcoal/60 hover:text-rose hover:bg-rose/15 transition-colors"
              aria-label={`Share ${hamper.name}`}
            >
              {copiedId === hamper.id ? (
                <Check className="h-3.5 w-3.5 text-emerald-600" />
              ) : (
                <Share2 className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          {/* Action Buttons: 50% Order / 50% Add to Cart */}
          <div className="flex items-center gap-1.5 pt-1">
            {/* WhatsApp Trigger (50%) */}
            <a
              href={buildHamperWhatsAppUrl(hamper)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClickWhatsapp()}
              className="flex flex-1 h-[34px] items-center justify-center gap-1 rounded-xl px-2 text-[11px] sm:text-xs font-bold text-white shadow-xs transition-all duration-200 hover:brightness-105 active:scale-95 truncate"
              style={{
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              }}
            >
              <WhatsAppIcon className="h-3 w-3 shrink-0" />
              <span className="truncate">Order</span>
            </a>

            {/* Add to Cart Trigger (50%) */}
            {inCartQty > 0 ? (
              <div className="flex flex-1 h-[34px] items-center justify-between rounded-xl border border-rose/30 bg-rose/5 px-1.5 shadow-2xs">
                <button
                  onClick={() => decrementItem(cartKey)}
                  className="flex h-6 w-6 items-center justify-center rounded-lg text-rose hover:bg-rose/15 active:scale-90 transition-all"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="text-[11px] sm:text-xs font-bold text-rose px-0.5 truncate">{inCartQty} in cart</span>
                <button
                  onClick={() => incrementItem(cartKey)}
                  className="flex h-6 w-6 items-center justify-center rounded-lg text-rose hover:bg-rose/15 active:scale-90 transition-all"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  addToCart({
                    id: cartKey,
                    name: getHamperOrderName(hamper),
                  });
                  trackAddToCart(hamper.name);
                }}
                className="flex flex-1 h-[34px] items-center justify-center gap-1 rounded-xl border border-rose/30 bg-rose/10 text-rose text-[11px] sm:text-xs font-bold shadow-2xs hover:bg-rose hover:text-white transition-all active:scale-95 px-1.5"
                title="Add to order cart"
                aria-label={`Add ${hamper.name} to cart`}
              >
                <ShoppingCart className="h-3 w-3 shrink-0" />
                <span className="truncate">Add to Cart</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#FFF5F7] via-white to-soft-white">
      {/* ═══════ HERO SECTION (CLEAN & MINIMAL) ═══════ */}
      <section className="relative overflow-hidden pt-28 pb-6 sm:pb-8">
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 h-80 w-[950px] rounded-full bg-gradient-to-r from-baby-pink/30 via-warm-cream/40 to-baby-blue/20 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal tracking-tight"
          >
            Festive Gift Hampers
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-2 text-sm sm:text-base text-charcoal/70"
          >
            Handcrafted Diwali &amp; festive gift collections in Bhogal, New Delhi.
          </motion.p>
        </div>
      </section>

      {/* ═══════ STICKY FILTER & SEARCH BAR ═══════ */}
      <motion.div
        ref={filterBarRef}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="sticky top-[78px] z-40 flex justify-center px-4 pointer-events-none transition-all duration-300 mb-6"
      >
        <div
          style={{
            backgroundColor: 'rgba(26, 17, 20, 0.90)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderColor: 'rgba(255, 182, 193, 0.28)',
            boxShadow:
              '0 8px 32px rgba(0,0,0,0.32), 0 0 24px rgba(255,182,193,0.18), inset 0 1px 0 rgba(255,182,193,0.22)',
          }}
          className="pointer-events-auto w-full max-w-5xl rounded-3xl md:rounded-full border p-2 md:px-4 md:py-2.5"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto py-1 md:py-0.5 pb-2 md:pb-0.5 category-scroll">
              {GIFTING_CATEGORIES.map((tab) => {
                const isActive = activeCategory === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleCategoryClick(tab.id)}
                    className={`shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-deep-pink to-rose text-white shadow-[0_2px_12px_rgba(235,94,85,0.45)] border border-baby-pink/40 scale-[1.02]'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search input */}
            <div className="relative w-full md:w-60 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-baby-pink/80 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (window.scrollY > 150) {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }
                }}
                placeholder="Search hampers..."
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

      {/* ═══════ CATEGORY SPOTLIGHT COVER BANNER ═══════ */}
      {activeCategory !== 'all' && !debouncedQuery && (
        <section className="mx-auto max-w-7xl px-4 mb-6">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-2xl bg-white shadow-sm p-4 sm:p-6 flex flex-col md:flex-row items-center gap-5"
          >
            <div
              className={`relative shrink-0 overflow-hidden rounded-xl shadow-xs ${
                activeCategory === 'dry-fruit'
                  ? 'w-32 h-32 sm:w-36 sm:h-36 aspect-square'
                  : activeCategory === 'basket' || activeCategory === 'featured'
                  ? 'w-28 h-35 sm:w-32 sm:h-40 aspect-[4/5]'
                  : 'w-28 h-37 sm:w-32 sm:h-42 aspect-[3/4]'
              }`}
            >
              <Image
                src={CATEGORY_COVERS[activeCategory].image}
                alt={CATEGORY_COVERS[activeCategory].title}
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-charcoal">
                {CATEGORY_COVERS[activeCategory].title}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-charcoal/70 leading-relaxed max-w-2xl">
                {CATEGORY_COVERS[activeCategory].subtitle}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href={`https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(
                    `Hello Janta Bakery! I would like to enquire about bulk / corporate orders for ${CATEGORY_COVERS[activeCategory].title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-whatsapp-green px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:brightness-105 transition-all"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                  Bulk / Corporate Enquiry
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* ═══════ HAMPERS GRID (COMPACT & 25% SMALLER) ═══════ */}
      <section className="flex-1 py-2 px-3 sm:px-4">
        <div className="mx-auto max-w-7xl">
          {/* Search Result Info */}
          {debouncedQuery && (
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs sm:text-sm font-medium text-muted-gray">
                Found <span className="font-bold text-charcoal">{filteredHampers.length}</span> hampers matching &ldquo;{debouncedQuery}&rdquo;
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
          )}

          {filteredHampers.length === 0 ? (
            <div className="py-16 text-center text-muted-gray">
              <p className="text-base font-medium text-charcoal">No hampers found for &ldquo;{debouncedQuery}&rdquo;</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="mt-4 rounded-full bg-rose/15 px-4 py-1.5 text-xs font-bold text-rose hover:bg-rose hover:text-white transition-all shadow-xs"
              >
                Show All Hampers
              </button>
            </div>
          ) : (
            <>
              {/* ═══════ FEATURED DIWALI HAMPERS SHOWCASE SECTION (TOP OF "ALL" CATEGORY) ═══════ */}
              {activeCategory === 'all' && !debouncedQuery && (
                <div className="mb-14">
                  {/* Festive Showcase Sleek Banner (50%+ Thinner) */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#2D1219] via-[#4A1525] to-[#2D1219] py-3.5 px-4 sm:px-6 shadow-md border border-amber-500/30 mb-5 text-white">
                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center gap-3 text-center sm:text-left">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-lg border border-amber-400/30">
                          🪔
                        </span>
                        <div>
                          <h2 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold tracking-tight text-white">
                            Featured Diwali Hampers
                          </h2>
                          <p className="text-[11px] sm:text-xs text-white/70">
                            Handcrafted centerpieces &amp; royal keepsakes curated for festive gifting
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <a
                          href={`https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(
                            'Hello Janta Bakery! I would like to enquire about your Featured Diwali Gift Hampers.'
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackClickWhatsapp()}
                          className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:brightness-105 active:scale-95 transition-all"
                          style={{
                            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                          }}
                        >
                          <WhatsAppIcon className="h-3.5 w-3.5" />
                          WhatsApp Order
                        </a>
                        <a
                          href={PHONE_HREF}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90 hover:bg-white/20 transition-all"
                        >
                          <Phone className="h-3 w-3 text-amber-300" />
                          Bulk Call
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Featured Hampers Grid (7 Showpiece Hampers) */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                    {featuredHampersData.map((hamper, idx) => {
                      const globalIdx = filteredHampers.findIndex((h) => h.id === hamper.id);
                      return renderHamperCard(hamper, globalIdx >= 0 ? globalIdx : idx, true);
                    })}
                  </div>

                  {/* Transition Header to the Rest of the Collection (Basket, Boxed, Dry Fruit) */}
                  <div className="mt-12 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-rose/15 pt-8">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-charcoal">
                        Complete Hamper Collection
                      </h3>
                      <p className="text-xs sm:text-sm text-charcoal/60">
                        Explore our full collection of artisanal baskets, designer boxes &amp; royal dry fruit chests.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-rose bg-rose/10 px-3.5 py-1.5 rounded-full">
                      <span>{filteredHampers.length - featuredHampersData.length} More Hampers Below</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              )}

              {/* General Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                {(activeCategory === 'all' && !debouncedQuery
                  ? filteredHampers.slice(featuredHampersData.length)
                  : filteredHampers
                ).map((hamper, idx) => {
                  const globalIdx =
                    activeCategory === 'all' && !debouncedQuery
                      ? idx + featuredHampersData.length
                      : idx;
                  return renderHamperCard(hamper, globalIdx, false);
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ═══════ CORPORATE & BULK GIFTING BANNER ═══════ */}
      <section className="py-12 px-4 bg-gradient-to-r from-warm-cream via-baby-pink/20 to-warm-cream mt-10 border-y border-rose/15">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose/15 text-rose mb-3">
              <Building2 className="h-6 w-6" />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-charcoal">
              Corporate &amp; Custom Bulk Orders
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-charcoal/75 leading-relaxed max-w-2xl mx-auto">
              Customized packaging, personalized greeting cards, corporate logo ribbons, and bulk delivery across Delhi NCR.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={PHONE_HREF}
                className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-rose bg-white px-6 py-2.5 text-xs font-bold text-rose shadow-sm transition-all duration-300 hover:bg-rose hover:text-white hover:scale-105"
              >
                <Phone className="h-3.5 w-3.5" />
                Call Corporate Desk
              </a>
              <a
                href={`https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(
                  'Hello Janta Bakery! I would like to enquire about Corporate / Bulk Diwali Hampers.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-whatsapp-green px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-whatsapp-green/30 transition-all duration-300 hover:brightness-105 hover:scale-105"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                WhatsApp Corporate Enquiry
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════ FESTIVE BLESSING POSTER SHOWCASE ═══════ */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4A0E17] via-[#2A080E] to-[#1A0509] p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center gap-6 sm:gap-8 border border-amber-300/30">
            <div className="relative w-full md:w-56 aspect-[2/3] shrink-0 overflow-hidden rounded-xl shadow-lg ring-1 ring-amber-300/40">
              <Image
                src="/gallery/hampers/dry-fruit/happy-diwali-poster.webp"
                alt="Happy Diwali from Janta Bakery"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 220px"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-amber-300">
                A Legacy of Sweetness Since 1967
              </span>
              <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold mt-1 text-white leading-tight">
                Wishing You Light, Prosperity &amp; Sweetness
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed">
                For over 59 years, Janta Bakery has been proud to celebrate festivals with Delhi. Visit our store in Bhogal, Jangpura or connect with us on WhatsApp to select your festive hampers.
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href={`https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(
                    'Hello Janta Bakery! Wishing you a Happy Diwali! I would like to order festive hampers.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-charcoal px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider shadow-md hover:brightness-110 transition-all"
                >
                  Connect on WhatsApp
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FULL-SCREEN LIGHTBOX MODAL ═══════ */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredHampers[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Close photo preview"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={(e) => navigateLightbox(-1, e)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Previous hamper"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => navigateLightbox(1, e)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Next hamper"
            >
              <ChevronRight className="h-7 w-7" />
            </button>

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#1A1114] rounded-3xl overflow-hidden border border-rose/30 shadow-2xl"
            >
              {/* Photo Box */}
              <div className="relative w-full h-[55vh] sm:h-[68vh] bg-black/60 flex items-center justify-center p-2">
                <Image
                  src={filteredHampers[lightboxIndex].image}
                  alt={filteredHampers[lightboxIndex].name}
                  fill
                  className="object-contain p-1"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />
              </div>

              {/* Action Bar */}
              <div className="p-4 sm:p-5 flex items-center justify-between gap-3 text-white bg-[#1A1114] border-t border-white/10">
                <div className="min-w-0">
                  <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-white truncate">
                    {filteredHampers[lightboxIndex].name}
                  </h3>
                  <p className="text-xs text-rose font-medium">
                    {filteredHampers[lightboxIndex].categoryLabel}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      addToCart({
                        id: filteredHampers[lightboxIndex].id,
                        name: getHamperOrderName(filteredHampers[lightboxIndex]),
                      });
                      trackAddToCart(filteredHampers[lightboxIndex].name);
                    }}
                    className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-white bg-white/10 hover:bg-rose hover:text-white transition-all border border-white/15"
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Add to Cart</span>
                  </button>

                  <a
                    href={buildHamperWhatsAppUrl(filteredHampers[lightboxIndex])}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClickWhatsapp()}
                    className="flex items-center gap-1.5 rounded-full py-2 px-3.5 text-xs font-bold text-white shadow-md transition-all duration-200 hover:brightness-105 active:scale-95"
                    style={{
                      background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    }}
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
