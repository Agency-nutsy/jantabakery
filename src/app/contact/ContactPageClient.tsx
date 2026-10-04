'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Train, ChevronDown } from 'lucide-react';

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

/* ────── FAQ Data ────── */
const faqs = [
  {
    q: 'Do you make custom/designer cakes?',
    a: 'Yes! We specialise in custom cakes for weddings, birthdays, anniversaries, and corporate events. Call or WhatsApp us with your requirements and we\'ll make your vision a reality.',
  },
  {
    q: 'Are your products eggless?',
    a: 'Most of our cakes and pastries are available in eggless variants. Please confirm when ordering.',
  },
  {
    q: 'Do you deliver at home?',
    a: 'Currently we operate from our store in Bhogal, Jangpura. You can pick up your order or check with us for special delivery arrangements via phone or WhatsApp.',
  },
  {
    q: 'What are your timings?',
    a: 'We are open 7 days a week from 8:00 AM to 9:00 PM. No holidays!',
  },
  {
    q: 'Where exactly are you located?',
    a: '43, Central Road, Jangpura, Samman Bazar, Bhogal, New Delhi – 110014. Near Rajdoot Hotel. Just 0.6 km from Jangpura Metro Station (Violet Line).',
  },
];

/* ────── FAQ Accordion Item ────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-baby-pink/5"
      >
        <span className="font-[family-name:var(--font-display)] text-base font-semibold text-charcoal sm:text-lg">
          {q}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-deep-pink transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-muted-gray">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ────── Contact Info Card ────── */
function ContactCard({
  icon,
  label,
  children,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  href?: string;
}) {
  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href
    ? {
        href,
        target: href.startsWith('http') ? '_blank' as const : undefined,
        rel: href.startsWith('http') ? 'noopener noreferrer' : undefined,
      }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`group flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm transition-all duration-300 hover:bg-baby-pink/5 hover:shadow-md ${
        href ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-baby-pink/15 text-deep-pink transition-colors group-hover:bg-deep-pink group-hover:text-white">
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-gray">
          {label}
        </p>
        <div className="mt-1 text-sm text-charcoal">{children}</div>
      </div>
    </Wrapper>
  );
}

export default function ContactPageClient() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-baby-pink/25 via-white to-soft-white">
      {/* ═══════ SECTION 1 — HERO ═══════ */}
      <section className="relative overflow-hidden pt-28 pb-16">
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 h-72 w-[850px] rounded-full bg-baby-pink/30 blur-3xl pointer-events-none" />
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-baby-pink/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-[family-name:var(--font-display)] text-5xl font-bold text-charcoal sm:text-6xl"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-muted-gray"
          >
            We&apos;re always happy to hear from you
          </motion.p>
        </div>
      </section>

      {/* ═══════ SECTION 2 — PRIMARY CTAs ═══════ */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center justify-center gap-5 sm:flex-row"
          >
            <a
              href="tel:+919717179565"
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-deep-pink px-10 py-5 text-lg font-bold text-white shadow-xl shadow-deep-pink/30 transition-all duration-300 hover:shadow-2xl hover:scale-105 sm:w-auto"
            >
              <Phone className="h-6 w-6 transition-transform group-hover:rotate-12" />
              Call Now
            </a>
            <a
              href="https://wa.me/919717179565?text=Hello%20Janta%20Bakery!"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-whatsapp-green px-10 py-5 text-lg font-bold text-white shadow-xl shadow-whatsapp-green/30 transition-all duration-300 hover:shadow-2xl hover:scale-105 sm:w-auto"
            >
              <WhatsAppIcon className="h-6 w-6" />
              WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════ SECTION 3 — TWO COLUMN LAYOUT ═══════ */}
      <section className="py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <ContactCard
                icon={<MapPin className="h-5 w-5" />}
                label="Address"
                href="https://maps.app.goo.gl/QmQerXUhGQXYYSaVA"
              >
                <p className="font-medium">43, Central Rd, Jangpura, Samman Bazar</p>
                <p>Bhogal, New Delhi – 110014</p>
                <p className="text-xs text-muted-gray">(Near Rajdoot Hotel)</p>
              </ContactCard>

              <ContactCard
                icon={<Phone className="h-5 w-5" />}
                label="Phone"
                href="tel:+919717179565"
              >
                <p className="font-medium">+91 97171 79565</p>
              </ContactCard>

              <ContactCard
                icon={<WhatsAppIcon className="h-5 w-5" />}
                label="WhatsApp"
                href="https://wa.me/919717179565?text=Hello%20Janta%20Bakery!"
              >
                <p className="font-medium">+91 97171 79565</p>
                <p className="text-xs text-deep-pink">Chat with us on WhatsApp</p>
              </ContactCard>

              <ContactCard
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                href="mailto:bakery.janta@gmail.com"
              >
                <p>bakery.janta@gmail.com</p>
              </ContactCard>

              <ContactCard
                icon={<Clock className="h-5 w-5" />}
                label="Opening Hours"
              >
                <p className="font-medium">Monday – Sunday</p>
                <p>8:00 AM – 9:00 PM</p>
                <p className="text-xs text-deep-pink font-medium">Open all 7 days</p>
              </ContactCard>

              <ContactCard
                icon={<Train className="h-5 w-5" />}
                label="How to Reach"
              >
                <p><strong>Metro:</strong> Jangpura Metro Station (0.6 km) — Violet Line</p>
                <p><strong>Railway:</strong> Hazrat Nizamuddin Station (0.57 km)</p>
              </ContactCard>

              <ContactCard
                icon={<InstagramIcon className="h-5 w-5" />}
                label="Instagram"
                href="https://www.instagram.com/jantabakery1967"
              >
                <p className="text-deep-pink font-medium">@jantabakery1967 →</p>
              </ContactCard>
            </motion.div>

            {/* Right: Google Maps */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="sticky top-28 overflow-hidden rounded-3xl shadow-2xl shadow-baby-pink/20 ring-4 ring-baby-pink/10 bg-warm-cream/50 h-[250px] sm:h-[450px] flex items-center justify-center relative">
                {/* Instant Map Skeleton Placeholder */}
                {!isMapLoaded && (
                  <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-gradient-to-br from-warm-cream via-soft-white to-baby-pink/20 p-6 text-center animate-pulse">
                    <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-deep-pink/15 text-deep-pink shadow-inner mb-4">
                      <MapPin className="h-6 w-6 sm:h-8 sm:w-8 animate-bounce" />
                    </div>
                    <p className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-charcoal">
                      Janta Bakery
                    </p>
                    <p className="mt-1 text-[11px] sm:text-sm text-muted-gray max-w-xs">
                      43, Central Rd, Jangpura, Samman Bazar, Bhogal, New Delhi
                    </p>
                    <div className="mt-4 sm:mt-6 flex items-center gap-2 rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-deep-pink shadow-xs">
                      <span className="h-2 w-2 rounded-full bg-deep-pink animate-ping" />
                      Loading live map…
                    </div>
                  </div>
                )}

                {/* Live Google Map Iframe */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.5817415649417!2d77.24569757578277!3d28.582319875692235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3070745a433%3A0xaa231331a567490b!2sJanta%20Bakery!5e0!3m2!1sen!2sin!4v1780232707707!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Janta Bakery Location"
                  onLoad={() => setIsMapLoaded(true)}
                  className={`w-full relative z-10 transition-opacity duration-500 ${
                    isMapLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Floating Get Directions button */}
                <a
                  href="https://maps.app.goo.gl/QmQerXUhGQXYYSaVA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full bg-deep-pink px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-deep-pink/30 transition-all duration-300 hover:shadow-2xl hover:scale-105"
                >
                  <MapPin className="h-4 w-4" />
                  Get Directions
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 4 — FAQ ═══════ */}
      <section className="py-24 px-4 bg-gradient-to-b from-soft-white to-warm-cream">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold text-charcoal sm:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-muted-gray">
              Got questions? We&apos;ve got answers.
            </p>
          </motion.div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <FAQItem {...faq} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
