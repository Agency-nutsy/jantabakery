'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { shouldShowLoadingScreen } from '@/lib/loadingState';

/* Accurate 4-colour Google Maps logo recreation */
function GoogleMapsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 56 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* The teardrop / pin silhouette used as clip-path */}
        <clipPath id="gm-pin-clip">
          <path d="M28 2C13.64 2 2 13.64 2 28C2 47.88 28 66 28 66C28 66 54 47.88 54 28C54 13.64 42.36 2 28 2Z" />
        </clipPath>
      </defs>

      {/* ── 4 colour zones, all clipped to the pin shape ── */}
      {/* RED — upper-left */}
      <rect x="0"  y="0"  width="28" height="28" fill="#EA4335" clipPath="url(#gm-pin-clip)" />
      {/* BLUE — upper-right */}
      <rect x="28" y="0"  width="28" height="28" fill="#4285F4" clipPath="url(#gm-pin-clip)" />
      {/* YELLOW — lower-left */}
      <rect x="0"  y="28" width="28" height="40" fill="#FBBC04" clipPath="url(#gm-pin-clip)" />
      {/* GREEN — lower-right + entire tail */}
      <rect x="28" y="28" width="28" height="40" fill="#34A853" clipPath="url(#gm-pin-clip)" />

      {/* ── White circle punched out of the centre ── */}
      <circle cx="28" cy="28" r="10.5" fill="white" clipPath="url(#gm-pin-clip)" />
    </svg>
  );
}


export default function FloatingWidgets() {
  const [delayParams] = useState(() => {
    if (shouldShowLoadingScreen()) {
      return { map: 1.6, wa: 1.5 };
    }
    return { map: 0.2, wa: 0.1 };
  });

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 md:flex">
        {/* Google Maps / Directions Button */}
        <motion.a
          href="https://maps.app.goo.gl/QmQerXUhGQXYYSaVA"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: delayParams.map, duration: 0.5, ease: 'easeOut' }}
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg shadow-black/15 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-black/20 flex"
          aria-label="Get directions on Google Maps"
        >
          <GoogleMapsIcon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
        </motion.a>

        {/* WhatsApp Button */}
        <motion.a
          href="https://wa.me/919717179565?text=Hello%20Janta%20Bakery!%20I%20would%20like%20to%20enquire%20about..."
          target="_blank"
          rel="noopener noreferrer"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: delayParams.wa, duration: 0.5, ease: 'easeOut' }}
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp-green text-white shadow-lg shadow-whatsapp-green/40 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-whatsapp-green/50 flex"
          aria-label="Chat on WhatsApp"
        >
          <svg
            className="h-7 w-7 transition-transform group-hover:scale-110"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </motion.a>
      </div>
    </>
  );
}
