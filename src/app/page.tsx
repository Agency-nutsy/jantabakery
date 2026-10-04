'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Phone, MapPin, Clock, Star, Sparkles } from 'lucide-react';
import LoadingScreen from '@/components/LoadingScreen';
import { shouldShowLoadingScreen } from '@/lib/loadingState';

/* ═══════════════════════════════════════════
   IMAGE DATA
   ═══════════════════════════════════════════ */

const signatureProducts = [
  {
    name: 'Signature Custom Cake',
    desc: "Bespoke celebration cakes crafted to perfection — birthdays, weddings, and every magical occasion in between.",
    image: '/gallery/custom-cakes/custom-cake-18.jpg',
    href: '/menu',
  },
  {
    name: 'Choco Crunch Biscuits',
    desc: "Crunchy, rich, and irresistible handmade cookies loaded with premium cocoa and chocolate chips.",
    image: '/gallery/biscuits/choco-crunch-poster.jpg',
    href: '/menu',
    imgClassName: 'scale-[1.2] group-hover:scale-[1.3]',
    objectPosition: 'center 70%',
  },
  {
    name: 'Traditional Bhakarwadi',
    desc: "A perfect balance of sweet, spicy, and tangy flavors in a crispy golden pinwheel. A savory favorite.",
    image: '/gallery/namkeen/bhakarwadi-poster.jpg',
    href: '/menu',
    imgClassName: 'scale-[1.25] group-hover:scale-[1.35]',
    objectPosition: 'center 70%',
  },
  {
    name: 'Special Shahi Rusk',
    desc: "Crispy, double-baked golden semolina rusk. The ultimate companion for your morning masala chai.",
    image: '/gallery/rusks/special-shahi-rusk-poster.jpg',
    href: '/menu',
    imgClassName: 'scale-[1.25] group-hover:scale-[1.35]',
    objectPosition: 'center 70%',
  },
];

/* ═══════════════════════════════════════════
   REVIEW DATA
   ═══════════════════════════════════════════ */

const reviewsRow1 = [
  { text: "Janta Bakery is an absolute gem in Bhogal. Their Butterscotch cake is incredibly soft, perfectly sweet, and melts in your mouth. Highly recommended for any birthday celebration!", name: "Rahul M." },
  { text: "I have been coming to this bakery since I was a kid. The quality of their chocolate truffle pastry has remained consistently excellent for over two decades. A true legend.", name: "Priya K." },
  { text: "We ordered a customized tier cake for my daughter's first birthday and they delivered beyond our expectations. The design was flawless and the fresh fruit flavor was outstanding.", name: "Neha T." },
  { text: "If you are in Jangpura, you must try their Kaju Pista cookies and traditional atta biscuits. Perfect companions for evening chai. The legacy of 1967 really shows in their quality.", name: "Arjun S." },
  { text: "The mushroom patties here are crispy, flaky, and generously filled. I often pack a dozen for my office colleagues and they are always gone within minutes. Best in South Delhi!", name: "Vikram N." },
  { text: "Unbelievable taste at such pocket-friendly prices. Their Black Forest cake brings back so many childhood memories. The staff is always smiling, polite, and very quick with the service.", name: "Simran B." },
  { text: "I recently discovered their gift hampers during Diwali and they were a massive hit with my family. The packaging was premium and the assortment of cookies and namkeens was fresh.", name: "Rifaa J." },
  { text: "A nostalgic spot for locals. The aroma of freshly baked bread and sweet pastries hits you as soon as you enter Samman Bazar. You simply cannot leave without buying their signature patties.", name: "Aakash P." },
  { text: "The eggless cakes here are softer and tastier than most regular cakes I've tried in premium cafes. The Pineapple cake is so refreshing, light, and perfectly balanced in sweetness.", name: "Farah Z." },
  { text: "A classic old-school bakery that has maintained its charm and quality. The cream rolls and jam biscuits are exactly what they used to taste like in the 90s. Nostalgia in every bite.", name: "Deepa R." },
  { text: "We buy all our birthday cakes exclusively from Janta Bakery. They never disappoint. The chocolate truffle is rich, dense, and has the perfect cocoa dusting. A consistent 5-star experience every time.", name: "Manish D." },
  { text: "I ordered bulk snacks including veg puffs and rolls for a small house party. Everything was delivered hot, fresh, and on time. All my guests kept asking where I ordered from!", name: "Tanya A." },
  { text: "Their dedication to quality is unmatched. You can taste the pure butter and premium ingredients in their dry fruit biscuits. It's rare to find such honest bakeries in Delhi these days.", name: "Suresh K." },
  { text: "I travel all the way from Noida just to buy their special fruit cake during Christmas. It is loaded with nuts and candied fruits, baked to absolute perfection.", name: "Anjali S." },
  { text: "The recent renovation has made the place look stunning, but I'm so glad the taste of their classic patties and eclairs hasn't changed one bit. Highly recommend visiting this heritage shop.", name: "Rohan V." },
];

const reviewsRow2 = [
  { text: "I absolutely love their cold coffee and grilled sandwiches. It is my go-to comfort food after a long day at work. Better than most fancy cafes in South Ex!", name: "Kritika M." },
  { text: "Janta Bakery is the pride of Bhogal. Their commitment to hygiene, quality, and customer service is phenomenal. The chocolate donuts are my kids' absolute favorite weekend treat.", name: "Saurabh J." },
  { text: "Every item on their menu is a winner, but the Strawberry Pastry holds a special place in my heart. Light, fluffy sponge with fresh cream that isn't overly sweet.", name: "Pooja D." },
  { text: "Their namkeens and mathris are incredibly crisp and fresh. I always stock up my pantry with their savory snacks. They stay fresh for weeks if stored properly.", name: "Ravi G." },
  { text: "What really touches my heart is that they distribute unsold fresh food to the needy at night. It's beautiful to see a successful business giving back to the community like this.", name: "Meera L." },
  { text: "The Red Velvet cake I ordered for our anniversary was a showstopper. The cream cheese frosting was authentic and the sponge was incredibly moist. Definitely coming back for more.", name: "Tarun K." },
  { text: "You can't beat the prices here. Getting such premium quality baked goods at these rates is unheard of in Delhi. Their butter cookies literally melt in your mouth.", name: "Ayesha R." },
  { text: "I was looking for a good bakery near Rajdoot Hotel and stumbled upon this gem. The aroma drew me in and the taste of their classic paneer puff made me a loyal customer.", name: "Kunal S." },
  { text: "Such a warm, welcoming vibe! The owners are always present and ensure every customer is attended to. The almond biscotti they recommended pairs flawlessly with my morning espresso.", name: "Nidhi W." },
  { text: "This bakery has stood the test of time since 1967 for a reason. No fancy gimmicks, just pure, honest, delicious baking. The plum cake here is the best in the city.", name: "Prateek H." },
  { text: "I've tried almost every pastry they offer and have never been disappointed. The Choco Lava cake is served warm and the gooey center is pure chocolate heaven.", name: "Sneha B." },
  { text: "They customized a Spiderman themed cake for my nephew and paid attention to every single detail I requested. It looked fantastic and tasted even better. Amazing craftsmanship!", name: "Aditya N." },
  { text: "I regularly buy their whole wheat bread and multiseed buns. They are super fresh, soft, and don't have that artificial preservative smell you get from supermarket brands.", name: "Kavita Y." },
  { text: "The caramel custard here is a hidden gem. Smooth, silky, and with just the right amount of caramelized sugar on top. A must-try if you have a sweet tooth!", name: "Imran A." },
  { text: "Absolutely the best bakery in Jangpura! The queue on weekends speaks for itself. Their fresh cream pineapple cake is legendary and disappears from the shelves within hours.", name: "Gaurav C." },
];

/* ═══════════════════════════════════════════
   STATS DATA
   ═══════════════════════════════════════════ */

const stats = [
  { icon: '🎂', target: 57, suffix: '+', label: 'Years of Excellence' },
  { icon: '⭐', target: 2800, suffix: '+', label: 'Google Reviews' },
  { icon: '🏪', target: 0, displayText: 'Multiple', label: 'Branches in Delhi' },
  { icon: '👨‍👩‍👧‍👦', target: 3, suffix: '', displayText: '3 Generations', label: 'of Loyal Customers' },
];

/* ═══════════════════════════════════════════
   ANIMATED COUNTER — FIXED (no glitch)
   ═══════════════════════════════════════════ */

function AnimatedCounter({ target, suffix, displayText, isInView }: {
  target: number;
  suffix?: string;
  displayText?: string;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    if (displayText) {
      setDone(true);
      return;
    }

    hasStarted.current = true;
    const duration = 2000;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDone(true);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, target, displayText]);

  if (displayText && done) return <>{displayText}</>;
  if (displayText) return <>0</>;
  return <>{count}{done ? (suffix || '') : ''}</>;
}

/* ═══════════════════════════════════════════
   REVIEW CARD — FIXED (no text overflow)
   ═══════════════════════════════════════════ */

function ReviewCard({ text, name }: { text: string; name: string }) {
  return (
    <div className="mx-2 sm:mx-3 inline-block w-[260px] sm:w-[340px] shrink-0 rounded-2xl border-t-4 border-baby-pink bg-white p-4 sm:p-6 shadow-md transition-all duration-300 hover:shadow-xl" style={{ whiteSpace: 'normal' }}>
      <div className="mb-2 sm:mb-3 flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed text-charcoal/80">&ldquo;{text}&rdquo;</p>
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm font-bold text-charcoal">{name}</p>
        <span className="text-[10px] sm:text-xs text-muted-gray">via Google</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */

let isInitialLoad = true;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

/* ═══════════════════════════════════════════
   GOOGLE MAPS CONSTANTS
   ═══════════════════════════════════════════ */

const MAPS_PLACE_URL = 'https://www.google.com/maps/place/?q=place_id:ChIJ2zY65zDkDTkR9K2P64d4G8Q';
const MAPS_DIRECTIONS_URL = 'https://www.google.com/maps/dir/?api=1&destination=Janta+Bakery+Bhogal+Jangpura+New+Delhi&destination_place_id=ChIJ2zY65zDkDTkR9K2P64d4G8Q';
const MAPS_EMBED_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.0!2d77.248207!3d28.581741!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce313e6c39ed5%3A0x6ee0f13e5e51e885!2sJanta%20Bakery!5e0!3m2!1sen!2sin!4v1234567890';

/* ═══════════════════════════════════════════
   HOMEPAGE COMPONENT
   ═══════════════════════════════════════════ */

export default function HomePage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' });

  // Only delay hero animation if the loading screen is actively showing
  const [initialDelay] = useState(() => shouldShowLoadingScreen() ? 2.4 : 0);

  const containerVariants = useMemo(() => ({
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: initialDelay } },
  }), [initialDelay]);

  return (
    <>
      <LoadingScreen />
      {/* ═══════ SECTION 1 — HERO ═══════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden bg-charcoal">
          <div
            className="hero-bg"
            style={{
              backgroundImage: `url('/whatsapp-hero.jpg')`,
            }}
          />
        </div>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/40" />

        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-baby-pink/30 via-transparent to-baby-blue/10" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl flex flex-col items-center text-center sm:items-start sm:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 shadow-sm backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-baby-pink" />
              <span className="text-xs font-semibold tracking-wider text-white/90 uppercase">Est. 1967 · Bhogal, Jangpura</span>
            </motion.div>

            {/* JANTA BAKERY Logo */}
            <motion.div variants={itemVariants} className="py-4 w-full flex justify-center sm:justify-start">
              <img 
                src="/logo.png" 
                alt="Janta Bakery" 
                className="w-[85vw] sm:w-[52vw] max-w-[460px] object-contain drop-shadow-lg" 
              />
            </motion.div>


            {/* Subtitle */}
            <motion.p variants={itemVariants} className="mt-8 sm:mt-10 max-w-lg text-base sm:text-lg leading-relaxed text-white/90">
              Handcrafted with love since 1967 — cakes, pastries & joy that have stood the test of time in the heart of Bhogal.
            </motion.p>

            {/* CTA Buttons — using BLUE for primary as per palette */}
            <motion.div variants={itemVariants} className="mt-12 sm:mt-14 mb-20 sm:mb-0 flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full sm:w-auto">
              <Link
                href="/menu"
                className="group flex w-full sm:w-auto justify-center items-center gap-2 rounded-full bg-water-rapids px-8 py-4 text-base font-semibold text-white shadow-xl shadow-water-rapids/30 transition-all duration-300 hover:bg-water-rapids/90 hover:shadow-2xl hover:shadow-water-rapids/40 hover:scale-105"
              >
                Explore Our Menu
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="tel:+919717179565"
                className="group flex w-full sm:w-auto justify-center items-center gap-2 rounded-full border-2 border-white/50 bg-white/30 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-white/40 hover:border-white/70 hover:scale-105"
              >
                <Phone className="h-4 w-4 transition-transform group-hover:rotate-12" />
                Call Us Now
              </a>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ═══════ SECTION 2 — SIGNATURE DELIGHTS with REAL IMAGES ═══════ */}
      <section className="relative py-24 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-[family-name:var(--font-display)] text-[28px] leading-tight font-bold text-charcoal sm:text-5xl">
              Our Signature Delights
            </h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-muted-gray">
              A few of the things that keep Delhi coming back
            </p>
          </motion.div>

          <div className="mt-8 sm:mt-16 grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-4">
            {signatureProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div
                  className="group flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl bg-soft-white shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 h-full"
                >
                  {/* REAL IMAGE */}
                  <div className="h-28 sm:h-52 overflow-hidden shrink-0 bg-soft-white flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ objectPosition: product.objectPosition || 'center' }}
                      className={`h-full w-full object-cover transition-transform duration-500 ${
                        product.imgClassName || 'group-hover:scale-110'
                      }`}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-3 sm:p-5 flex flex-col flex-1">
                    <h3 className="font-[family-name:var(--font-display)] text-base sm:text-xl font-bold text-charcoal leading-tight">
                      {product.name}
                    </h3>
                    <p className="mt-1 sm:mt-2 text-[11px] sm:text-sm leading-relaxed text-muted-gray flex-1">
                      {product.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 text-lg font-semibold text-water-rapids transition-colors hover:text-water-rapids/80"
            >
              View Full Menu
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════ SECTION 2.5 — SCROLLING POSTER MARQUEE (fast) ═══════ */}
      <section className="relative py-12 overflow-hidden bg-white">
        <div className="absolute inset-y-0 left-0 w-6 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-6 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <div className="poster-marquee-track flex w-max animate-poster-marquee" style={{ whiteSpace: 'nowrap' }}>
          {[
            // Set 1 (Shuffled across all categories)
            '/gallery/rusks/special-shahi-rusk-poster.jpg', // Special Shahi Rusk
            '/gallery/custom-cakes/custom-cake-3.jpg',      // Custom Cake 3
            '/gallery/namkeen/beetroot-chips-poster.jpg',   // Beetroot Chips
            '/gallery/biscuits/choco-crunch-poster.jpg',    // Choco Crunch Biscuits
            '/gallery/custom-cakes/custom-cake-13.jpg',     // Rasmalai Cake
            '/gallery/namkeen/bhakarwadi-poster.jpg',       // Traditional Bhakarwadi
            '/gallery/custom-cakes/custom-cake-14.jpg',     // Custom Cake 14
            '/ads/chocolate-muffin-delight-poster.png',     // Muffin
            '/gallery/rusks/milk-rusk-poster.jpg',          // Milk Rusk
            '/gallery/custom-cakes/custom-cake-6.jpg',      // Custom Cake 6
            '/gallery/namkeen/masala-kaju-poster.jpg',      // Masala Kaju
            '/gallery/custom-cakes/custom-cake-1.jpg',      // Custom Cake 1
            '/gallery/biscuits/kaju-pista-cookies.jpg',     // Kaju Pista Cookies
            '/gallery/custom-cakes/custom-cake-10.jpg',     // Custom Cake 10
            '/gallery/custom-cakes/custom-cake-9.jpg',      // Custom Cake 9
            '/gallery/namkeen/mini-samosa-poster.jpg',      // Mini Samosa
            '/gallery/custom-cakes/custom-cake-5.jpg',      // Custom Cake 5
            // Set 2 (Seamless infinite loop duplicate)
            '/gallery/rusks/special-shahi-rusk-poster.jpg',
            '/gallery/custom-cakes/custom-cake-3.jpg',
            '/gallery/namkeen/beetroot-chips-poster.jpg',
            '/gallery/biscuits/choco-crunch-poster.jpg',
            '/gallery/custom-cakes/custom-cake-13.jpg',
            '/gallery/namkeen/bhakarwadi-poster.jpg',
            '/gallery/custom-cakes/custom-cake-14.jpg',
            '/ads/chocolate-muffin-delight-poster.png',
            '/gallery/rusks/milk-rusk-poster.jpg',
            '/gallery/custom-cakes/custom-cake-6.jpg',
            '/gallery/namkeen/masala-kaju-poster.jpg',
            '/gallery/custom-cakes/custom-cake-1.jpg',
            '/gallery/biscuits/kaju-pista-cookies.jpg',
            '/gallery/custom-cakes/custom-cake-10.jpg',
            '/gallery/custom-cakes/custom-cake-9.jpg',
            '/gallery/namkeen/mini-samosa-poster.jpg',
            '/gallery/custom-cakes/custom-cake-5.jpg',
          ].map((src, i) => (
            <div key={`poster-${i}`} className="mx-3 h-64 sm:h-80 overflow-hidden rounded-2xl shadow-md shrink-0">
              <img src={src} alt="Janta Bakery Treats" className="h-full w-auto object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ SECTION 3 — SCROLLING REVIEWS — FIXED TEXT OVERFLOW ═══════ */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white to-soft-white">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-[family-name:var(--font-display)] text-[28px] leading-tight font-bold text-charcoal sm:text-5xl">
              What Delhi Says About Us
            </h2>
            <div className="mt-3 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Marquee Row 1 — scrolls LEFT */}
        <div className="mt-12 overflow-hidden">
          <div className="marquee-track flex w-max animate-marquee" style={{ whiteSpace: 'nowrap' }}>
            {[...reviewsRow1, ...reviewsRow1].map((review, i) => (
              <ReviewCard key={`r1-${i}`} {...review} />
            ))}
          </div>
        </div>

        {/* Marquee Row 2 — scrolls RIGHT */}
        <div className="mt-6 overflow-hidden">
          <div className="marquee-track flex w-max animate-marquee-reverse" style={{ whiteSpace: 'nowrap' }}>
            {[...reviewsRow2, ...reviewsRow2].map((review, i) => (
              <ReviewCard key={`r2-${i}`} {...review} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 4 — OUR LEGACY — FIXED COUNTERS ═══════ */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-baby-pink/20 via-white to-baby-blue/20" />

        <div className="relative mx-auto max-w-7xl px-4" ref={statsRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-[family-name:var(--font-display)] text-[28px] leading-tight font-bold text-charcoal sm:text-5xl">
              Our Legacy
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 gap-3 sm:gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="rounded-2xl sm:rounded-3xl bg-white p-4 sm:p-8 text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <span className="text-3xl sm:text-5xl">{stat.icon}</span>
                <p className="mt-2 sm:mt-4 font-[family-name:var(--font-display)] text-xl sm:text-3xl lg:text-4xl font-bold text-charcoal">
                  <AnimatedCounter
                    target={stat.target}
                    suffix={stat.suffix}
                    displayText={stat.displayText}
                    isInView={statsInView}
                  />
                </p>
                <p className="mt-1 sm:mt-2 text-[11px] sm:text-sm font-medium text-muted-gray leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 text-center px-4"
          >
            <p className="mx-auto max-w-4xl font-[family-name:var(--font-display)] text-lg sm:text-2xl md:text-3xl font-medium italic leading-relaxed text-charcoal/80 whitespace-normal break-words">
              &ldquo;Opened to serve the Aam Janta of Delhi in 1967 — and we never stopped.&rdquo;
            </p>
          </motion.blockquote>
        </div>
      </section>

      {/* ═══════ SECTION 5 — FIND US — FIXED MAP LINK ═══════ */}
      <section className="py-24 px-4 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-[family-name:var(--font-display)] text-[28px] leading-tight font-bold text-charcoal sm:text-5xl">
                Come Visit Us
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-gray">
                In the heart of Bhogal Market, Jangpura — easy to find, impossible to forget.
              </p>

              <div className="mt-8 space-y-6">
                <a href={MAPS_PLACE_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-baby-blue/20 transition-colors group-hover:bg-water-rapids group-hover:text-white">
                    <MapPin className="h-5 w-5 text-water-rapids group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal group-hover:text-water-rapids transition-colors">Our Address</p>
                    <p className="mt-1 text-sm text-muted-gray">43, Central Road, Bhogal, Jangpura, New Delhi - 110014</p>
                    <p className="text-xs text-muted-gray">Near Rajdoot Hotel, Samman Bazar</p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-baby-pink/20">
                    <Clock className="h-5 w-5 text-deep-pink" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal">Opening Hours</p>
                    <p className="mt-1 text-sm text-muted-gray">Monday – Sunday: 8:00 AM – 9:00 PM</p>
                    <p className="text-xs text-deep-pink font-medium">Open all 7 days!</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={MAPS_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-full bg-water-rapids px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-water-rapids/30 transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  <MapPin className="h-4 w-4" />
                  Get Directions
                </a>
                <a
                  href="tel:+919717179565"
                  className="group flex items-center gap-2 rounded-full border-2 border-deep-pink bg-white px-6 py-3 text-sm font-semibold text-deep-pink transition-all duration-300 hover:bg-deep-pink/5 hover:scale-105"
                >
                  <Phone className="h-4 w-4" />
                  Call Us Now
                </a>
              </div>
            </motion.div>

            {/* Right: Map */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="overflow-hidden rounded-3xl shadow-2xl shadow-baby-blue/20 ring-4 ring-baby-blue/10 h-[250px] sm:h-[450px]">
                <iframe
                  src={MAPS_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Janta Bakery Location"
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
