'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Share2,
  Check,
  ShoppingBag,
  Phone,
  Sparkles,
  ShieldCheck,
  Truck,
  Building2,
  Plus,
  Minus,
  ZoomIn,
  X,
  ChevronRight,
  Heart,
} from 'lucide-react';
import {
  HamperItem,
  getHamperOrderName,
  getHamperDescription,
  GiftingCategory,
} from '@/data/giftingData';
import { useCart } from '@/lib/cartContext';
import { PHONE_DIGITS, PHONE_HREF, SITE_URL } from '@/lib/siteConfig';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

interface HamperDetailClientProps {
  hamper: HamperItem;
  relatedHampers: HamperItem[];
}

export default function HamperDetailClient({ hamper, relatedHampers }: HamperDetailClientProps) {
  const [qty, setQty] = useState(1);
  const [isCopied, setIsCopied] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const { cart, addToCart, incrementItem } = useCart();

  const orderName = useMemo(() => getHamperOrderName(hamper), [hamper]);
  const description = useMemo(() => getHamperDescription(hamper), [hamper]);

  const inCartItem = cart.find((item) => item.id === hamper.id || item.id === `gifting-${hamper.id}`);
  const inCartQty = inCartItem?.qty || 0;

  // Build the WhatsApp message matching exact user prompt
  const origin = typeof window !== 'undefined' ? window.location.origin : SITE_URL;
  const productUrl = `${origin}/gifting/${hamper.id}`;

  const whatsappMessage = `Hi, I want to order:
*${orderName}*
Quantity: ${qty}

${productUrl}`;

  const whatsappUrl = `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(whatsappMessage)}`;

  // Share handler
  const handleShare = async () => {
    const shareText = `Check out ${orderName} from Janta Bakery!`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${orderName} — Janta Bakery`,
          text: shareText,
          url: productUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(`${shareText}\n${productUrl}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch {
      // Ignored
    }
  };

  const handleAddToCart = () => {
    const cartKey = `gifting-${hamper.id}`;
    if (inCartQty === 0) {
      addToCart({
        id: cartKey,
        name: orderName,
      });
      // If qty > 1, increment remaining
      for (let i = 1; i < qty; i++) {
        incrementItem(cartKey);
      }
    } else {
      for (let i = 0; i < qty; i++) {
        incrementItem(cartKey);
      }
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-charcoal">
      {/* ═══════ TOP BREADCRUMB & BACK LINK ═══════ */}
      <div className="border-b border-amber-900/10 bg-white/70 backdrop-blur-md sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link
            href="/gifting"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-charcoal/70 hover:text-amber-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Hampers</span>
          </Link>

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-2 text-xs text-charcoal/50">
            <Link href="/" className="hover:text-charcoal transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/gifting" className="hover:text-charcoal transition-colors">Gifting</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-amber-800 font-medium capitalize">{hamper.categoryLabel}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-charcoal font-semibold truncate max-w-[180px]">{hamper.name}</span>
          </nav>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-full border border-amber-900/15 bg-white px-3 py-1.5 text-xs font-medium text-charcoal/80 hover:bg-amber-50 hover:text-amber-900 transition-all shadow-2xs"
            aria-label="Share Hamper"
          >
            {isCopied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ═══════ MAIN PRODUCT SECTION ═══════ */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Hamper Image Showcase (5 or 6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative group overflow-hidden rounded-3xl bg-warm-cream border border-amber-900/10 shadow-lg">
              {/* Category Pill Tag */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-amber-900 shadow-md backdrop-blur-xs border border-amber-900/10">
                <span>{hamper.categoryIcon}</span>
                <span>{hamper.categoryLabel}</span>
              </div>

              {/* Zoom Button */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-charcoal/70 hover:text-amber-900 hover:scale-105 shadow-md backdrop-blur-xs transition-all"
                aria-label="Zoom image"
                title="Click to view full photo"
              >
                <ZoomIn className="h-4 w-4" />
              </button>

              {/* Main Image Container */}
              <div
                className={`relative w-full ${
                  hamper.category === 'dry-fruit'
                    ? 'aspect-square'
                    : hamper.category === 'basket'
                    ? 'aspect-[4/5]'
                    : 'aspect-[3/4]'
                } cursor-zoom-in`}
                onClick={() => setIsLightboxOpen(true)}
              >
                <Image
                  src={hamper.image}
                  alt={orderName}
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Click to expand prompt */}
              <div
                onClick={() => setIsLightboxOpen(true)}
                className="py-2.5 px-4 bg-amber-950/5 text-center text-[11px] font-semibold text-charcoal/60 cursor-pointer hover:bg-amber-950/10 transition-colors flex items-center justify-center gap-1.5"
              >
                <ZoomIn className="h-3 w-3 text-amber-800" />
                <span>Tap image to view high-resolution photo</span>
              </div>
            </div>

            {/* Quality Assurance Strip */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white border border-amber-900/10 text-center text-xs text-charcoal/75 shadow-2xs">
              <div className="flex flex-col items-center gap-1 py-1">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <span className="font-semibold text-[11px]">Freshly Baked</span>
              </div>
              <div className="flex flex-col items-center gap-1 py-1 border-x border-amber-900/10">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span className="font-semibold text-[11px]">100% Pure Veg</span>
              </div>
              <div className="flex flex-col items-center gap-1 py-1">
                <Truck className="h-4 w-4 text-rose" />
                <span className="font-semibold text-[11px]">Delhi NCR Delivery</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Details & Ordering (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] uppercase tracking-[0.2em] font-extrabold text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-md">
                  Since 1967 • Bhogal, New Delhi
                </span>
                {hamper.category === 'dry-fruit' && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Premium Dry Fruits
                  </span>
                )}
              </div>

              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal tracking-tight leading-tight">
                {hamper.name}
              </h1>

              <p className="mt-1 text-sm font-medium text-charcoal/60">
                Diwali &amp; Festive Collection • Handcrafted Keepsake Hamper
              </p>
            </div>

            {/* Price & Enquiry Status Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-900">
                  Custom Quotation
                </span>
                <span className="text-xs font-semibold text-charcoal/60">
                  (Prices confirmed on WhatsApp)
                </span>
              </div>
              <p className="mt-1 text-xs text-charcoal/75 leading-relaxed">
                Hampers are freshly packed with customized selections of dry fruits, artisan cookies, and celebratory confections based on your preference and budget.
              </p>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-xs uppercase tracking-widest font-bold text-charcoal/50">
                About This Hamper
              </h2>
              <p className="text-sm sm:text-base text-charcoal/85 leading-relaxed">
                {description}
              </p>
            </div>

            {/* What's Included / Highlights */}
            <div className="rounded-2xl bg-white p-4 sm:p-5 border border-amber-900/10 space-y-3 shadow-2xs">
              <h3 className="text-xs uppercase tracking-wider font-bold text-amber-950 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                <span>Hamper Highlights</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal/80">
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Artisan festive packaging</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Freshly made signature treats</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Custom greeting card included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Bulk &amp; corporate custom ribbons</span>
                </li>
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs uppercase tracking-wider font-bold text-charcoal/70">
                Quantity:
              </span>
              <div className="flex items-center rounded-xl border border-amber-900/20 bg-white p-1 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-charcoal/70 hover:bg-amber-50 active:scale-95 transition-all"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center font-bold text-sm text-charcoal">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((prev) => prev + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-charcoal/70 hover:bg-amber-50 active:scale-95 transition-all"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <span className="text-xs text-charcoal/50">
                (Need 10+? Ask for bulk pricing)
              </span>
            </div>

            {/* ACTION BUTTONS (50/50 Layout) */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {/* WhatsApp Order Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 rounded-2xl px-6 py-4 text-sm font-bold text-white shadow-md transition-all duration-300 hover:brightness-105 active:scale-98"
                style={{
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                }}
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                <span>Order on WhatsApp</span>
              </a>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2.5 rounded-2xl border-2 border-rose bg-rose/5 px-6 py-4 text-sm font-bold text-rose shadow-2xs hover:bg-rose hover:text-white transition-all duration-200 active:scale-98"
              >
                {justAdded ? (
                  <>
                    <Check className="h-5 w-5 text-emerald-600" />
                    <span className="text-emerald-700">Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5 shrink-0" />
                    <span>
                      {inCartQty > 0 ? `In Cart (${inCartQty}) • Add More` : 'Add to Cart'}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Call & Instant Help */}
            <div className="flex items-center justify-between text-xs text-charcoal/60 pt-2 border-t border-amber-900/10">
              <span>Prefer to speak with us directly?</span>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-1.5 font-bold text-amber-900 hover:underline"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>+91 97171 79565</span>
              </a>
            </div>
          </div>
        </div>

        {/* ═══════ CORPORATE GIFTING BANNER ═══════ */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-[#3D2614] via-[#2A180A] to-[#1F1005] p-6 sm:p-10 text-white shadow-xl border border-amber-500/30">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300 mb-3">
              <Building2 className="h-3.5 w-3.5" />
              <span>Corporate &amp; Bulk Festive Gifting</span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold leading-tight">
              Looking for 10 to 500+ Hampers for Your Team or Clients?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed">
              We provide custom branded sleeves, company logo ribbons, greeting message cards, and scheduled direct-to-office deliveries across New Delhi and NCR.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(
                  `Hello Janta Bakery! I would like to enquire about bulk/corporate order for ${orderName}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp-green px-5 py-2.5 text-xs font-bold text-white shadow-md hover:brightness-110 transition-all"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
                <span>Corporate WhatsApp Enquiry</span>
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 px-5 py-2.5 text-xs font-bold text-white transition-all border border-white/20"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call Desk: +91 97171 79565</span>
              </a>
            </div>
          </div>
        </div>

        {/* ═══════ RELATED HAMPERS ═══════ */}
        {relatedHampers.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-amber-800">
                  Explore More
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-charcoal">
                  You May Also Like
                </h2>
              </div>
              <Link
                href="/gifting"
                className="text-xs sm:text-sm font-bold text-amber-900 hover:underline inline-flex items-center gap-1"
              >
                <span>View Full Collection</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedHampers.slice(0, 4).map((rel) => {
                const relOrderName = getHamperOrderName(rel);
                return (
                  <Link
                    key={rel.id}
                    href={`/gifting/${rel.id}`}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-amber-900/10 shadow-xs hover:shadow-md transition-all duration-300"
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-warm-cream">
                      <Image
                        src={rel.image}
                        alt={relOrderName}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                      <span className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-amber-900 shadow-2xs backdrop-blur-xs">
                        {rel.categoryLabel}
                      </span>
                    </div>
                    <div className="p-3 flex flex-col flex-1 justify-between gap-1">
                      <h3 className="font-[family-name:var(--font-display)] text-sm sm:text-base font-bold text-charcoal group-hover:text-amber-800 transition-colors line-clamp-1">
                        {rel.name}
                      </h3>
                      <p className="text-[11px] font-medium text-amber-900/80">
                        Price on Enquiry
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* ═══════ FULL-SCREEN LIGHTBOX MODAL ═══════ */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-5 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close photo preview"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="relative max-h-[85vh] max-w-[90vw] aspect-square flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={hamper.image}
              alt={orderName}
              width={1000}
              height={1000}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
