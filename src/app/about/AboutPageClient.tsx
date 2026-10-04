'use client';

import { motion } from 'framer-motion';

/* ═══════════════════════════════════════════
   VALUES DATA
   ═══════════════════════════════════════════ */
const values = [
  { icon: '🎂', title: 'Fresh Every Day', desc: 'Nothing sits overnight. Everything is baked fresh.' },
  { icon: '💛', title: 'Affordable Luxury', desc: 'Premium quality, prices that respect every wallet.' },
  { icon: '👨‍👩‍👧', title: 'Family Legacy', desc: 'Three generations of craft, passed down with pride.' },
  { icon: '🤝', title: 'Community First', desc: 'We feed the neighbourhood — unsold food goes to the needy after closing every night.' },
];

/* ═══════════════════════════════════════════
   TIMELINE DATA
   ═══════════════════════════════════════════ */
const timeline = [
  { year: '1967', text: 'Founded by Saawan Kumar in Bhogal Market, Jangpura' },
  { year: '1975', text: 'Expanded the shop, added custom cake orders' },
  { year: '1990', text: 'Expanded our menu to include premium custom cakes' },
  { year: '2005', text: 'Launched savouries menu: grilled sandwiches, puffs, burgers' },
  { year: '2010', text: 'Became the highest-rated bakery in South Delhi' },
  { year: '2015', text: 'Crossed 5,000+ loyal customers; expanded to multiple branches' },
  { year: '2024', text: '2800+ Google Reviews, still the undisputed king of Bhogal' },
];

export default function AboutPageClient() {
  return (
    <>
      {/* ═══════ SECTION 1 — HERO & STORY ═══════ */}
      <section className="relative overflow-hidden pt-28 pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-baby-blue/15 via-white to-baby-pink/25" />
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 h-72 w-[850px] rounded-full bg-baby-pink/25 blur-3xl pointer-events-none" />
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-water-rapids/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-baby-pink/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4">
          {/* Hero heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-[family-name:var(--font-display)] text-5xl font-bold text-charcoal sm:text-6xl lg:text-7xl">
              Our Story
            </h1>
            <p className="mt-4 text-xl text-muted-gray">
              57 years of love, flour, and sweetness
            </p>
          </motion.div>

          {/* Split layout */}
          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            {/* Left: Beautiful Cake Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <div className="relative">
                {/* Decorative border */}
                <div className="absolute -inset-4 rounded-3xl border-2 border-dashed border-water-rapids/40" />
                {/* Main image */}
                <div className="relative h-80 w-80 overflow-hidden rounded-3xl shadow-2xl sm:h-96 sm:w-96 lg:h-[450px] lg:w-[450px]">
                  <img
                    src="/about-cake.webp"
                    alt="Handcrafted Celebration Cake — Janta Bakery"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent pointer-events-none" />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-6 -right-6 rounded-2xl bg-white px-6 py-4 shadow-xl ring-1 ring-charcoal/5">
                  <p className="font-[family-name:var(--font-display)] text-lg font-bold text-water-rapids">Est. 1967</p>
                  <p className="text-xs font-medium text-muted-gray uppercase tracking-wider">Bhogal, Delhi</p>
                </div>
              </div>
            </motion.div>

            {/* Right: Story text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6 text-base leading-relaxed text-charcoal/80"
            >
              <p className="text-lg">
                It was 1967. In a small, unassuming shop on Central Road in Bhogal Market, Jangpura — <strong className="text-charcoal">Saawan Kumar</strong> had a simple dream: to bake the finest cookies, cakes, and pastries and offer them to the everyday people of Delhi. He called it <strong className="text-water-rapids">Janta Bakery</strong> — a bakery for the Aam Janta.
              </p>
              <p>
                What began with handmade &lsquo;atta patti biscuits&rsquo; crafted from customers&apos; own flour and ghee has grown over five and a half decades into one of Delhi&apos;s most beloved culinary landmarks. Generation after generation has walked through these doors — children who grew up to bring their own children, families who celebrate every birthday and anniversary here, and regulars who simply can&apos;t imagine a week without a visit.
              </p>
              <p>
                Today, Janta Bakery is a name synonymous with trust, quality, and uncompromising taste in South Delhi. Our menu spans hundreds of items — from the legendary Kaju Pista Cookies and Chocolate Truffle Pastry to intricately designed custom wedding cakes and celebration platters — all made fresh, every single day.
              </p>
              <p className="border-l-4 border-water-rapids pl-4 font-[family-name:var(--font-display)] text-xl font-bold italic text-charcoal">
                We have never once compromised on quality. And we never will.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 2 — VALUES ═══════ */}
      <section className="py-24 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold text-charcoal sm:text-5xl">
              Why Janta Bakery?
            </h2>
            <p className="mt-4 text-lg text-muted-gray">
              The values that have kept Delhi coming back for 57 years
            </p>
          </motion.div>

          <div className="mt-10 sm:mt-16 grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group rounded-2xl sm:rounded-3xl bg-soft-white p-4 sm:p-8 text-center shadow-sm transition-all duration-300 hover:bg-white hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1"
              >
                <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-water-rapids/10 text-2xl sm:text-3xl transition-colors group-hover:bg-water-rapids/20">
                  {value.icon}
                </div>
                <h3 className="mt-4 sm:mt-6 font-[family-name:var(--font-display)] text-[15px] sm:text-xl font-bold text-charcoal leading-tight">
                  {value.title}
                </h3>
                <p className="mt-2 sm:mt-3 text-[11px] sm:text-sm leading-relaxed text-muted-gray">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 3 — TIMELINE ═══════ */}
      <section className="relative overflow-hidden py-16 sm:py-24 px-4 bg-gradient-to-b from-white to-soft-white">
        <div className="mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-[family-name:var(--font-display)] text-[28px] sm:text-4xl font-bold text-charcoal lg:text-5xl">
              Our Journey
            </h2>
            <p className="mt-2 sm:mt-4 text-sm sm:text-lg text-muted-gray">
              Milestones that shaped a legacy
            </p>
          </motion.div>

          <div className="relative mt-12 sm:mt-16">
            {/* Vertical line — updated to use Water Rapids */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-water-rapids/20 via-water-rapids to-water-rapids/20 sm:left-1/2 sm:-translate-x-1/2" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative mb-8 sm:mb-12 flex items-center ${
                  index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 z-10 flex h-3 w-3 items-center justify-center rounded-full bg-water-rapids ring-4 ring-white shadow-lg sm:h-4 sm:w-4 sm:left-1/2 sm:-translate-x-1/2 -ml-[5px] sm:ml-0" />

                {/* Content card */}
                <div className={`ml-10 sm:ml-0 sm:w-[calc(50%-2rem)] w-full ${
                  index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8 sm:text-left sm:ml-auto'
                }`}>
                  <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <span className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-water-rapids">
                      {item.year}
                    </span>
                    <p className="mt-1 sm:mt-2 text-[12px] sm:text-sm leading-relaxed text-charcoal/80">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
