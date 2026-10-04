'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Search, ZoomIn } from 'lucide-react';
import Image from 'next/image';

// Import the processed JSON data
import galleryData from '@/data/galleryData.json';

interface GalleryItem {
  file: string;
  name: string;
  posterTitle: string;
  category: string;
  keywords: string[];
  categories: string[];
  imagePath: string | null;
  width?: number;
  height?: number;
}

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'cakes-pastries', label: 'Cakes & Pastries' },
  { id: 'custom-cakes', label: 'Custom Cakes' },
  { id: 'rusks', label: 'Rusks' },
  { id: 'biscuits', label: 'Biscuits' },
  { id: 'namkeens', label: 'Namkeens' },
  { id: 'snacks', label: 'Snacks' }
];

export default function GalleryPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialTab = searchParams.get('category') || 'all';
  const isValidTab = TABS.some(t => t.id === initialTab);
  const [activeTab, setActiveTab] = useState(isValidTab ? initialTab : 'all');
  
  const [searchInput, setSearchInput] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Debounce search input (~150ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchInput);
    }, 150);
    return () => clearTimeout(handler);
  }, [searchInput]);

  // Sync URL when tab changes (optional, but good for linking)
  useEffect(() => {
    if (activeTab === 'all') {
      router.replace('/gallery', { scroll: false });
    } else {
      router.replace(`/gallery?category=${activeTab}`, { scroll: false });
    }
  }, [activeTab, router]);

  // Pre-filter valid items (only those with imagePath)
  const validItems = useMemo(() => {
    return (galleryData as GalleryItem[]).filter(i => i.imagePath !== null);
  }, []);

  // Filter items by active tab
  const itemsInTab = useMemo(() => {
    if (activeTab === 'all') {
      // "All" shows every item exactly once, already handled by validItems uniqueness
      return validItems;
    }
    return validItems.filter(item => item.categories.includes(activeTab));
  }, [validItems, activeTab]);

  // Filter by search query
  const filteredItems = useMemo(() => {
    let result = itemsInTab;
    if (debouncedQuery.trim()) {
      const searchWords = debouncedQuery.toLowerCase().split(/\s+/).filter(Boolean);
      result = itemsInTab.filter(item => {
        const targetText = [
          item.name.toLowerCase(),
          item.posterTitle.toLowerCase(),
          ...item.keywords.map(k => k.toLowerCase())
        ].join(' ');
        return searchWords.every(word => targetText.includes(word));
      });
    }

    // Deterministically mix the grid when viewing "All" to showcase variety
    if (activeTab === 'all' && !debouncedQuery.trim()) {
      // Create a shallow copy before sorting
      result = [...result].sort((a, b) => {
        const hashA = (a.file.charCodeAt(0) + a.file.charCodeAt(a.file.length - 1) * 17) % 100;
        const hashB = (b.file.charCodeAt(0) + b.file.charCodeAt(b.file.length - 1) * 17) % 100;
        return hashA - hashB;
      });
    }

    return result;
  }, [itemsInTab, debouncedQuery, activeTab]);

  // Compute item counts for tabs dynamically based on validItems
  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { all: validItems.length };
    TABS.forEach(tab => {
      if (tab.id !== 'all') {
        counts[tab.id] = validItems.filter(i => i.categories.includes(tab.id)).length;
      }
    });
    return counts;
  }, [validItems]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const navigateLightbox = useCallback((direction: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      let next = prev + direction;
      if (next < 0) next = filteredItems.length - 1;
      if (next >= filteredItems.length) next = 0;
      return next;
    });
  }, [filteredItems.length]);

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

  // Swipe support for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) navigateLightbox(1);
    if (diff < -50) navigateLightbox(-1);
    setTouchStart(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-baby-pink/15 via-white to-soft-white">
      {/* Page Hero */}
      <section className="relative overflow-hidden pt-28 pb-10">
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 h-72 w-[850px] rounded-full bg-baby-pink/25 blur-3xl pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-[family-name:var(--font-display)] text-5xl font-bold text-charcoal sm:text-6xl"
          >
            Our Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-muted-gray"
          >
            A visual feast of our finest creations
          </motion.p>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
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
          className="pointer-events-auto w-full max-w-6xl rounded-3xl md:rounded-full border p-2 md:px-4 md:py-2"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto category-scroll w-full md:w-auto py-1 md:py-0.5 pb-2 md:pb-0.5">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSearchInput('');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className={`shrink-0 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-deep-pink to-rose text-white shadow-[0_2px_12px_rgba(235,94,85,0.45)] border border-baby-pink/40 scale-[1.02]'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-baby-pink/80 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search..."
                className="block w-full rounded-full border border-baby-pink/25 bg-white/10 py-1.5 pl-8 pr-8 text-xs text-white placeholder:text-white/45 focus:border-baby-pink/70 focus:bg-white/15 focus:outline-none focus:ring-1 focus:ring-baby-pink/30 transition-all"
              />
              {searchInput && (
                <button
                  onClick={() => setSearchInput('')}
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

      {/* Gallery Grid */}
      <section className="flex-1 py-6 px-4">
        <div className="mx-auto max-w-7xl">
          {/* Search result text */}
          {debouncedQuery.trim() && (
            <div className="mb-6 flex items-center justify-between text-sm text-muted-gray">
              <p>
                Found <span className="font-bold text-charcoal">{filteredItems.length}</span> results for &ldquo;{debouncedQuery}&rdquo;
              </p>
            </div>
          )}

          {filteredItems.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center">
              <p className="text-lg text-muted-gray mb-4">
                No results in <span className="font-bold text-charcoal">{TABS.find(t => t.id === activeTab)?.label}</span>
              </p>
              {activeTab !== 'all' && (
                <button
                  onClick={() => setActiveTab('all')}
                  className="rounded-full bg-baby-pink/20 px-6 py-2.5 text-sm font-semibold text-rose hover:bg-deep-pink hover:text-white transition-all"
                >
                  Search in All Categories
                </button>
              )}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="columns-2 md:columns-3 lg:columns-4 gap-3 [column-fill:_balance]"
              >
                {filteredItems.map((item, index) => {
                  // First 8: eager load + staggered entrance on page load
                  // Rest: lazy load + whileInView scroll reveal
                  const isEager = index < 8;
                  const staggerDelay = isEager ? index * 0.07 : 0;
                  
                  // Use precise dimensions to reserve space (zero layout shift)
                  const aspectRatio = (item.width && item.height) ? `${item.width} / ${item.height}` : '3 / 4';

                  return (
                    <motion.div
                      key={`${item.file}-${index}`}
                      initial={{ opacity: 0, scale: 0.96 }}
                      {...(isEager
                        ? { animate: { opacity: 1, scale: 1 } }
                        : { whileInView: { opacity: 1, scale: 1 }, viewport: { once: true, margin: '-60px' } }
                      )}
                      transition={{ delay: staggerDelay, duration: 0.45, ease: 'easeOut' }}
                      onClick={() => openLightbox(index)}
                      className="group relative mb-3 cursor-pointer overflow-hidden rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 break-inside-avoid"
                      style={{ aspectRatio }}
                    >
                      {/* Natural uncropped image, space pre-reserved by container */}
                      <img
                        src={item.imagePath!}
                        alt={item.name}
                        width={item.width}
                        height={item.height}
                        className="h-full w-full bg-soft-white/60 object-cover rounded-xl transition-transform duration-500 group-hover:scale-[1.05]"
                        loading={isEager ? 'eager' : 'lazy'}
                      />

                      {/* Elegant hover overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-4 text-center rounded-xl">
                        <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white">
                          <ZoomIn className="h-5 w-5" />
                        </div>
                        <span className="rounded-full bg-white/95 px-3.5 py-1 text-xs sm:text-sm font-bold tracking-wide text-charcoal shadow-lg backdrop-blur-sm">
                          {item.name}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeLightbox}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
              aria-hidden="true"
            />
            
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 transition-all"
            >
              <X className="h-6 w-6" />
            </button>

            {filteredItems.length > 1 && (
              <>
                <button
                  onClick={(e) => navigateLightbox(-1, e)}
                  className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white hover:bg-white/20 transition-all backdrop-blur-sm"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={(e) => navigateLightbox(1, e)}
                  className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white hover:bg-white/20 transition-all backdrop-blur-sm"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 w-full max-w-4xl max-h-[85vh] flex flex-col items-center"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="relative w-full h-[75vh]"
              >
                <Image
                  src={filteredItems[lightboxIndex].imagePath!}
                  alt={filteredItems[lightboxIndex].name}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">
                  {filteredItems[lightboxIndex].name}
                </h3>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
