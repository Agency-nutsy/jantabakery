'use client';

import { useEffect, useState } from 'react';
import { shouldShowLoadingScreen, markLoadingScreenShown } from '@/lib/loadingState';

export default function LoadingScreen() {
  const [shouldShow] = useState(() => shouldShowLoadingScreen());
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(() => !shouldShowLoadingScreen());

  useEffect(() => {
    if (!shouldShow) return;
    markLoadingScreenShown();
  }, [shouldShow]);

  const handleAnimationEnd = () => {
    setLoaded(true);
    setTimeout(() => {
      setHidden(true);
    }, 200);
  };

  // If hidden is true or shouldn't show, don't render anything
  if (hidden || !shouldShow) return null;

  return (
    <>
      <style>{`
        html, body {
          overflow: hidden !important;
        }
      `}</style>
      <div className={`loading-screen ${loaded ? 'loaded' : ''}`}>
      {/* Elegant CSS-only Dark Background (Loads instantly, zero flash) */}
      <div className="absolute inset-0 bg-charcoal" />
      
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-baby-pink/10 via-charcoal to-charcoal" />

      {/* Brand Logo with sophisticated slow pulse */}
      <div className="z-10 flex flex-col items-center animate-pulse">
        <img 
          src="/logo.png" 
          alt="Janta Bakery" 
          className="h-16 w-auto object-contain opacity-90 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]" 
        />
        <p className="mt-6 text-[9px] uppercase tracking-[0.5em] pl-[0.5em] text-white/50 font-medium">
          A Legacy of Sweetness
        </p>
      </div>

      {/* Ultra-minimal cinematic loading line */}
      <div className="absolute bottom-1/4 h-[1px] w-64 overflow-hidden bg-white/10">
        <div
          className="h-full w-full origin-left bg-gradient-to-r from-transparent via-[#C8717A] to-white"
          style={{
            animation: 'loading-bar 2.2s cubic-bezier(0.65, 0, 0.35, 1) forwards',
          }}
          onAnimationEnd={handleAnimationEnd}
        />
      </div>
    </div>
    </>
  );
}
