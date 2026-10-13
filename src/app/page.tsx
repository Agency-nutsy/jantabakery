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
    image: '/gallery/custom-cakes/fairy-dream-cake.webp',
    href: '/menu',
  },
  {
    name: 'Choco Crunch Biscuits',
    desc: "Crunchy, rich, and irresistible handmade cookies loaded with premium cocoa and chocolate chips.",
    image: '/gallery/biscuits/choco-crunch-biscuits.webp',
    href: '/menu',
    imgClassName: 'scale-[1.2] group-hover:scale-[1.3]',
    objectPosition: 'center 70%',
  },
  {
    name: 'Traditional Bhakarwadi',
    desc: "A perfect balance of sweet, spicy, and tangy flavors in a crispy golden pinwheel. A savory favorite.",
    image: '/gallery/namkeen/bhakarwadi.webp',
    href: '/menu',
    imgClassName: 'scale-[1.25] group-hover:scale-[1.35]',
    objectPosition: 'center 70%',
  },
  {
    name: 'Special Shahi Rusk',
    desc: "Crispy, double-baked golden semolina rusk. The ultimate companion for your morning masala chai.",
    image: '/gallery/rusks/special-shahi-rusk.webp',
    href: '/menu',
    imgClassName: 'scale-[1.25] group-hover:scale-[1.35]',
    objectPosition: 'center 70%',
  },
];

/* ═══════════════════════════════════════════
   REVIEW DATA
   ═══════════════════════════════════════════ */

const reviewsRow1 = [
  {
    text: "Janta Bakery, as the name suggests, is an age-old bakery opened to cater to the Aam Janta. Opened by Saawan Kumar in 1967 in one street of Bhogal market. I still remember as a child we used to go and give our atta and ghee to make made-to-order atta patti biscuits. Their good taste, fresh delivery, wide variety, and overall honesty took them to the sky heights. There is no one else in the market who can beat the warmth in their cakes and hearts.",
    name: "Anjuu Aroraa (ADA)",
  },
  {
    text: "A place where quality prevails over the price — one could easily get affordable cakes without compromising on quality. Been going to the store since childhood, so I'm literally a big fan of this bakery. Now that they have renovated the interior, it looks beautiful inside as well. If you want to get a cake or any other bakery item at an affordable cost, just step into Janta Bakery, you won't regret it.",
    name: "Varun",
  },
  {
    text: "A hidden gem for delicious bakes in Jangpura, New Delhi. Known for fresh and tasty treats, they offer a wide variety of items including pastries, patties, cakes, sandwiches, and dhokla. Their Chocolate Truffle Pastry is a standout with its rich, moist texture and deep chocolate flavor. The Mushroom Patty is another favorite with its crispy, flavorful bite. Affordable prices and consistently good quality.",
    name: "Ash_Ley",
  },
  {
    text: "Got an engagement cake from them — it was delicious, beautiful, and even better than how we imagined it to be! The design was amazingly done, delivery was smooth, and it was packed securely so it couldn't be spoilt. Thanks to Janta Bakery for saving the day!",
    name: "Yash Bajaj",
  },
  {
    text: "I recently ate the Fruit Almond Cake from Janta Bakery. I absolutely loved it. The level of freshness it has was outstanding. The taste was unlike anything I've ever eaten before. Truly the best cake I've ever had.",
    name: "Rifaa Javed",
  },
  {
    text: "A very old and established bakery in Bhogal market. The cookies, namkeens, and bakery items are very tasty, fresh, and fairly priced. They also offer custom and ready-made gift hampers for celebrations. Their dhokla, khandvi, paneer kulcha, besan biscuits, and atta biscuits are all 5/5.",
    name: "Nikita Dua",
  },
  {
    text: "Once you are inside, you can shop with peace and convenience. You get personal attention from the sales personnel who provide all the details of the products displayed. They have a very large variety of items, showcased nicely product-wise. Packing and payment is fast, and the quality of products is excellent.",
    name: "Ashok Kumar Sharma",
  },
  {
    text: "Iconic bakery in South Delhi with standard quality and good taste. I love their biscuits right from my childhood days when I used to visit Delhi during summer vacations. Bought butter cookies, cake rusk, and wheat biscuits — all are awesome and tasty.",
    name: "Parminder Kohli",
  },
  {
    text: "Amazing variety of bakery and confectionery items. Simply love the black forest pastry, pizza sandwich, club sandwich, eclair pastry, biscuits, burgers, and namkeens. The list is endless. A very old bakery shop serving its customers since 1967.",
    name: "Sumeet Uniyal",
  },
  {
    text: "It's a self-service bakery with a huge range and variety of cookies, chips, pastries, snacks, and bakery items — all with great taste and quality. The prices are very reasonable for the quality. You will become their regular customer, I can assure you.",
    name: "Aamir Ansari",
  },
  {
    text: "The bakery offers a wide range of baked goods including cakes, pastries, and breads. The staff is friendly and helpful, and the bakery has a warm and inviting atmosphere. The baked goods are fresh and delicious, and the prices are reasonable. Highly recommended for an affordable treat.",
    name: "Om Gupta",
  },
  {
    text: "It's a very old shop that has upgraded and expanded over the years. Wide variety of items: ready-to-eat, snacks, birthday décor, and party items. Very affordable and tasty eatables with eggless and vegetarian options clearly marked.",
    name: "Deepak",
  },
  {
    text: "We were in Bhogal Market and couldn't resist checking out the welcoming interior. The variety of cakes, rusks, and biscuits is so good and tempting. In the basement, they have a dedicated birthday cakes and decorations area where you can pick your theme candles, toppings, and party items. Highly recommended.",
    name: "Asif Mohammed",
  },
  {
    text: "The place is a cookie heaven! Fresh bakery items and a huge variety — paper almond cookies, rusk cakes, and what not. Absolutely loved the place.",
    name: "Shah Insha",
  },
  {
    text: "Quality products at reasonable prices. Their cakes, dhokla, biscuits, and vegetable patties are simply mouth-watering. A true neighborhood favorite.",
    name: "Pramod Bhushan",
  },
];

const reviewsRow2 = [
  {
    text: "I'm absolutely delighted with my experience at Janta Bakery! The food is top-notch, and the service is friendly and attentive. The atmosphere is cozy and inviting, making it the perfect spot to pick up your treats. Highly recommended to anyone looking for a great bakery experience.",
    name: "Aahana",
  },
  {
    text: "One of the best bakeries in central Delhi. Staff is very friendly and nice. Cakes are very tasty, neat, clean, and look great. Located in Samman Bazar in Bhogal, easily noticeable. Their products are always fresh.",
    name: "Zarma Siddiqui",
  },
  {
    text: "Loved the bakery, best in Bhogal! Very good taste of cakes and pastries. Also convenient that you can order online across platforms like Zomato and Swiggy. Great options for all bakery items.",
    name: "Sheikh Wasim",
  },
  {
    text: "We ordered a cake from this store for my niece's birthday, and the cake was so good in taste I was literally licking my fingers. Everyone at the party loved it.",
    name: "Suraj Pailu",
  },
  {
    text: "This place has most of your daily bakery needs. The taste is amazing and the quality too. Must try their Atta Biscuits, Cake Rusk, Kaju Cookies, and Coconut Cookies.",
    name: "Praveen Kumar Palai",
  },
  {
    text: "A nice bakery shop in Bhogal where you get a wide variety of snacks, pastries, namkeens, and cookies. It is the go-to shop in this area for party edibles. I often buy chocolate muffins and fresh pastries from here.",
    name: "Mohammad Wasim",
  },
  {
    text: "They do excellent multigrain biscuits and coconut macaroons! Their plain tea cakes are pretty decent too. The shopkeepers are very nice and welcoming.",
    name: "Raghav Sharma",
  },
  {
    text: "The bakery is very good and houses many different types of cakes. I have personally tried many cakes from the shop and felt very satisfied with the quality as well as the price. They also take orders for cakes customized to your requirements.",
    name: "Kushal Mehrotra",
  },
  {
    text: "Janta Bakery is in Bhogal's main market. You will get almost all items related to a bakery — cakes, pastries, muffins, and birthday items. I really liked the fruit cake here, a must-try.",
    name: "HIMANSHU Dikshit",
  },
  {
    text: "You will find everything related to bakery items and celebration cakes. You can even customize cakes according to your taste, flavor, size, shape, and design, plus birthday celebration party items.",
    name: "Padaarabinda Saahoo",
  },
  {
    text: "A fantastic bakery with a lovely selection of delicious sandwiches and burgers. The staff are very friendly and helpful, and they really care about the customers. Simply wonderful.",
    name: "Michael Iselt",
  },
  {
    text: "Despite being located on a busy road, the store is tidy and clean, allowing for relaxed shopping. Stocked with both savory and sweet products, offering a wide selection of packaged biscuits and snacks.",
    name: "Lucia Tulimiero",
  },
  {
    text: "I live nearby this bakery — the food and quality are the main constants that have made this bakery the best among all others in my locality. I highly recommend their cakes and pastries.",
    name: "Gunjan",
  },
  {
    text: "Best bakery in South Delhi. All confectioneries taste so good. The cakes taste fresh and delicious. A must-try spot.",
    name: "Kanika Kumari",
  },
  {
    text: "If Mango Tres Leches is available, do try it 100%! Everything else in the bakery is superb as well.",
    name: "Shikhar Garg",
  },
];

/* ═══════════════════════════════════════════
   INSTAGRAM REELS DATA
   ═══════════════════════════════════════════ */

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const instagramReels = [
  {
    id: 'DdRGfXBt6_n',
    title: 'Ganesh Chaturthi Festive Specials & Modak',
  },
  {
    id: 'DD_vGRyyiXs',
    title: 'Merry Christmas & New Year Celebrations',
  },
  {
    id: 'DEwl5ATRqk2',
    title: 'Lohri Da Pitara Festive Gift Hamper',
  },
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
      <p className="mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed text-charcoal/80">{text}</p>
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
              backgroundImage: `url('/whatsapp-hero.webp')`,
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
                src="/logo.webp" 
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
            '/gallery/rusks/special-shahi-rusk.webp', // Special Shahi Rusk
            '/gallery/custom-cakes/celebration-cake-2.webp',      // Custom Cake 3
            '/gallery/namkeen/beetroot-chips.webp',   // Beetroot Chips
            '/gallery/biscuits/choco-crunch-biscuits.webp',    // Choco Crunch Biscuits
            '/gallery/custom-cakes/rasmalai-cake.webp',     // Rasmalai Cake
            '/gallery/namkeen/bhakarwadi.webp',       // Traditional Bhakarwadi
            '/gallery/custom-cakes/oreo-cake.webp',     // Custom Cake 14
            '/gallery/cakes/chocolate-muffin-eggless.webp',     // Muffin
            '/gallery/rusks/classic-crispy-milk-rusk.webp',          // Milk Rusk
            '/gallery/custom-cakes/doll-cake.webp',      // Custom Cake 6
            '/gallery/namkeen/royal-masala-kaju.webp',      // Masala Kaju
            '/gallery/custom-cakes/cartoon-theme-cake.webp',      // Custom Cake 1
            '/gallery/biscuits/kaju-pista-cookies-sugar-free.webp',     // Kaju Pista Cookies
            '/gallery/custom-cakes/car-shape-cake.webp',     // Custom Cake 10
            '/gallery/custom-cakes/doraemon-cake.webp',      // Custom Cake 9
            '/gallery/namkeen/crispy-mini-samosa.webp',      // Mini Samosa
            '/gallery/custom-cakes/jungle-theme-cake.webp',      // Custom Cake 5
            // Set 2 (Seamless infinite loop duplicate)
            '/gallery/rusks/special-shahi-rusk.webp',
            '/gallery/custom-cakes/celebration-cake-2.webp',
            '/gallery/namkeen/beetroot-chips.webp',
            '/gallery/biscuits/choco-crunch-biscuits.webp',
            '/gallery/custom-cakes/rasmalai-cake.webp',
            '/gallery/namkeen/bhakarwadi.webp',
            '/gallery/custom-cakes/oreo-cake.webp',
            '/gallery/cakes/chocolate-muffin-eggless.webp',
            '/gallery/rusks/classic-crispy-milk-rusk.webp',
            '/gallery/custom-cakes/doll-cake.webp',
            '/gallery/namkeen/royal-masala-kaju.webp',
            '/gallery/custom-cakes/cartoon-theme-cake.webp',
            '/gallery/biscuits/kaju-pista-cookies-sugar-free.webp',
            '/gallery/custom-cakes/car-shape-cake.webp',
            '/gallery/custom-cakes/doraemon-cake.webp',
            '/gallery/namkeen/crispy-mini-samosa.webp',
            '/gallery/custom-cakes/jungle-theme-cake.webp',
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

      {/* ═══════ SECTION 4.5 — INSTAGRAM REELS ═══════ */}
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-soft-white/60 to-white">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-[family-name:var(--font-display)] text-[28px] leading-tight font-bold text-charcoal sm:text-5xl">
              From Our Ovens to Your Feed
            </h2>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-gray max-w-xl mx-auto [text-wrap:balance]">
              Watch our celebration cakes, festive gift hampers, and sweet traditions live from&nbsp;Bhogal.
            </p>

            <div className="mt-6 flex justify-center">
              <a
                href="https://www.instagram.com/jantabakery1967"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:opacity-95 hover:shadow-xl hover:scale-105"
              >
                <InstagramIcon className="h-4 w-4" />
                Follow on Instagram
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {instagramReels.map((reel, index) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5 }}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white border border-baby-pink/30 shadow-md transition-all duration-300 hover:shadow-2xl hover:border-deep-pink/40 p-2 sm:p-3"
              >
                <div className="w-full h-[475px] sm:h-[495px] overflow-hidden rounded-2xl bg-warm-cream/30">
                  <iframe
                    src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                    className="w-full h-[550px] sm:h-[570px] -mb-[75px] border-0 overflow-hidden"
                    scrolling="no"
                    allowFullScreen
                    loading="lazy"
                    title={reel.title}
                  />
                </div>
              </motion.div>
            ))}
          </div>
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
