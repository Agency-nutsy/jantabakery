'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Phone, Mail, Clock, Heart } from 'lucide-react';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-baby-pink via-baby-pink/60 to-baby-blue opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(249,196,210,0.3),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Logo & Tagline */}
          <div>
            <Link
              href="/"
              className="flex flex-col group"
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
                className="h-16 w-auto object-contain brightness-0 opacity-80 transition-opacity duration-300 group-hover:opacity-100"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/80">
              Since 1967 — A Legacy of Sweetness
            </p>
            <p className="mt-2 text-sm text-charcoal/60">
              Serving Delhi since 1967 with handcrafted cakes, pastries &amp; joy.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.instagram.com/jantabakery1967"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-charcoal/70 shadow-sm transition-all duration-300 hover:bg-deep-pink hover:text-white hover:shadow-lg hover:scale-110"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/919717179565?text=Hello%20Janta%20Bakery!%20I%20would%20like%20to%20enquire%20about..."
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-charcoal/70 shadow-sm transition-all duration-300 hover:bg-whatsapp-green hover:text-white hover:shadow-lg hover:scale-110"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-charcoal">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/menu', label: 'Menu' },
                { href: '/about', label: 'About' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-charcoal/70 transition-colors duration-300 hover:text-deep-pink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-charcoal">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://maps.app.goo.gl/QmQerXUhGQXYYSaVA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-charcoal/70 transition-colors duration-300 hover:text-deep-pink"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-deep-pink" />
                  43, Central Rd, Jangpura, Samman Bazar, Bhogal, New Delhi – 110014
                </a>
              </li>
              <li>
                <a
                  href="tel:+919717179565"
                  className="flex items-center gap-2 text-sm text-charcoal/70 transition-colors duration-300 hover:text-deep-pink"
                >
                  <Phone className="h-4 w-4 shrink-0 text-deep-pink" />
                  +91 97171 79565
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919717179565?text=Hello%20Janta%20Bakery!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-charcoal/70 transition-colors duration-300 hover:text-deep-pink"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-deep-pink" />
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a
                  href="mailto:bakery.janta@gmail.com"
                  className="flex items-center gap-2 text-sm text-charcoal/70 transition-colors duration-300 hover:text-deep-pink"
                >
                  <Mail className="h-4 w-4 shrink-0 text-deep-pink" />
                  bakery.janta@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Hours + Map */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-charcoal">
              Opening Hours
            </h3>
            <div className="mt-4 flex items-center gap-2 text-sm text-charcoal/70">
              <Clock className="h-4 w-4 shrink-0 text-deep-pink" />
              <div>
                <p>Mon – Sun</p>
                <p className="font-semibold text-charcoal">8:00 AM – 9:00 PM</p>
                <p className="text-xs text-deep-pink font-medium mt-0.5">Open all 7 days!</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="mb-2 text-sm font-medium text-charcoal/70">Find Us</p>
              <div className="overflow-hidden rounded-2xl shadow-lg shadow-baby-pink/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.5817415649417!2d77.24569757578277!3d28.582319875692235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3070745a433%3A0xaa231331a567490b!2sJanta%20Bakery!5e0!3m2!1sen!2sin!4v1780232707707!5m2!1sen!2sin"
                  width="100%"
                  height="150"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Janta Bakery Location"
                  className="w-full grayscale transition-all duration-300 hover:grayscale-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-charcoal/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row">
            <p className="text-xs text-charcoal/60">
              © {new Date().getFullYear()} Janta Bakery. All rights reserved.
            </p>
            <p className="flex items-center gap-1 text-xs text-charcoal/60">
              Designed with <Heart className="h-3 w-3 text-deep-pink" /> in Delhi
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
