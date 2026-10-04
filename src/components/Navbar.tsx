'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { shouldShowLoadingScreen } from '@/lib/loadingState';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();

  // Delay navbar entrance only when loading screen is actively showing on refresh
  const [navDelay] = useState(() => {
    if (shouldShowLoadingScreen()) {
      return 1.5;
    }
    return 0.1;
  });

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  // How much has the user scrolled — drives the glass opacity/blur
  const scrollProgress = Math.min(scrollY / 200, 1); // 0 → 1 over first 200px

  const isHome = pathname === '/';

  // On home, starts translucent to blend with the dark hero image.
  // On other pages (with light backgrounds), starts with a rich dark chocolate frosted glass
  // with a baby pink glow and border, so the white logo and text are never invisible at the top!
  const bgOpacity = isHome ? 0.08 + scrollProgress * 0.72 : 0.82 + scrollProgress * 0.12;
  const blurAmount = isHome ? 10 + scrollProgress * 14 : 20 + scrollProgress * 6;
  const pinkGlow = isHome ? scrollProgress * 0.18 : 0.24;
  const borderColor = isHome && scrollProgress < 0.2
    ? `rgba(255, 255, 255, ${0.12 + scrollProgress * 0.08})`
    : `rgba(255, 182, 193, ${0.28 + scrollProgress * 0.14})`;

  return (
    <>
      {/* ── FLOATING PILL ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            delay: navDelay,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            backgroundColor: `rgba(26, 17, 20, ${bgOpacity})`,
            backdropFilter: `blur(${blurAmount}px) saturate(${150 + scrollProgress * 50}%)`,
            WebkitBackdropFilter: `blur(${blurAmount}px) saturate(${150 + scrollProgress * 50}%)`,
            borderColor: borderColor,
            boxShadow: `0 8px 32px rgba(0,0,0,${isHome ? 0.08 + scrollProgress * 0.24 : 0.24}), 0 0 24px rgba(255,182,193,${pinkGlow}), inset 0 1px 0 rgba(255,182,193,0.22)`,
          }}
          className="pointer-events-auto mx-4 sm:mx-auto w-[calc(100%-32px)] sm:w-full max-w-5xl rounded-full border transition-[box-shadow,border-color] duration-300"
        >
          <div className="flex h-[60px] items-center px-5 gap-4 md:px-8">

            {/* ── LOGO ── */}
            <Link
              href="/"
              className="shrink-0"
              onClick={(e) => {
                if (pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <img
                src="/logo.png"
                alt="Janta Bakery"
                className="h-7 w-auto object-contain drop-shadow-[0_1px_6px_rgba(0,0,0,0.3)]"
              />
            </Link>

            {/* ── DESKTOP NAV LINKS ── */}
            <div className="hidden flex-1 items-center justify-center gap-7 md:flex">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      if (pathname === link.href) {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`relative py-1 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-[2px] w-full rounded-full bg-baby-pink shadow-[0_0_8px_rgba(255,182,193,0.8)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* ── DESKTOP CTA ── */}
            <div className="hidden shrink-0 items-center md:flex">
              <a
                href="tel:+919717179565"
                className="flex items-center gap-1.5 rounded-full border border-baby-pink/35 bg-baby-pink/15 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-baby-pink/30 hover:border-baby-pink/60 hover:shadow-lg hover:shadow-baby-pink/25"
              >
                <Phone className="h-3 w-3 text-baby-pink" />
                Order Now
              </a>
            </div>

            {/* ── MOBILE HAMBURGER ── */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isOpen ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </AnimatePresence>
            </button>

          </div>
        </motion.nav>
      </div>

      {/* ── MOBILE DROPDOWN ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-[82px] left-4 right-4 z-50 overflow-hidden rounded-3xl border border-baby-pink/30 shadow-2xl"
            style={{
              backgroundColor: 'rgba(26, 17, 20, 0.92)',
              backdropFilter: 'blur(28px) saturate(200%)',
              WebkitBackdropFilter: 'blur(28px) saturate(200%)',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45), 0 0 30px rgba(255, 182, 193, 0.15)',
            }}
          >
            <div className="flex flex-col items-center gap-1 py-6 px-4">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-full"
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      setIsOpen(false);
                      if (pathname === link.href) {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`flex w-full items-center justify-center rounded-2xl px-4 py-3 text-[12px] font-semibold uppercase tracking-[0.2em] transition-all duration-200 ${
                      pathname === link.href
                        ? 'bg-baby-pink/20 text-white font-bold border border-baby-pink/30'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                href="tel:+919717179565"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-baby-pink/40 bg-baby-pink/20 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-baby-pink/30 hover:shadow-lg hover:shadow-baby-pink/20"
              >
                <Phone className="h-4 w-4 text-baby-pink" />
                Order Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
