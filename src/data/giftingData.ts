export type GiftingCategory = 'featured' | 'basket' | 'boxed' | 'dry-fruit';

export interface HamperItem {
  id: string;
  name: string;
  slug?: string;
  category: GiftingCategory;
  categoryLabel: string;
  categoryIcon: string;
  image: string;
  ogImage?: string;
  badge?: string;
  price?: number | string;
  description?: string;
  contents?: string[];
}

export const GIFTING_CATEGORIES: { id: 'all' | GiftingCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'All Hampers', icon: '✨' },
  { id: 'featured', label: 'Diwali Specials', icon: '🪔' },
  { id: 'basket', label: 'Basket Hampers', icon: '🧺' },
  { id: 'boxed', label: 'Boxed Hampers', icon: '🎁' },
  { id: 'dry-fruit', label: 'Dry Fruit Hampers', icon: '🥜' },
];

export const CATEGORY_COVERS: Record<GiftingCategory, { image: string; title: string; subtitle: string }> = {
  featured: {
    image: '/gallery/hampers/featured/diwali-gifting-showcase.webp',
    title: 'Diwali Festive Hamper Showcase',
    subtitle: 'Our most prestigious, handcrafted Diwali gifting creations — from ornate keepsake chests to bespoke artisan baskets.',
  },
  basket: {
    image: '/gallery/hampers/basket/basket-collection-cover.webp',
    title: 'Basket Hamper Collection',
    subtitle: 'Handcrafted artisan baskets dressed in festive net, floral accents & gourmet bakery delights.',
  },
  boxed: {
    image: '/gallery/hampers/boxed/boxed-collection-cover.webp',
    title: 'Boxed Hamper Collection',
    subtitle: 'Royal rigid keepsake boxes & artisanal bakery confections handcrafted for festive gifting.',
  },
  'dry-fruit': {
    image: '/gallery/hampers/dry-fruit/dry-fruit-collection-cover.webp',
    title: 'Dry Fruit Hamper Collection',
    subtitle: 'Heritage handcrafted keepsake boxes & selected premium dry fruits.',
  },
};

/* ═══════════════════════════════════════════
   FEATURED DIWALI HAMPERS (7 Items)
   ═══════════════════════════════════════════ */
export const featuredHampersData: HamperItem[] = [
  {
    id: 'featured-hamper-1',
    name: 'Featured Hamper 1',
    category: 'featured',
    categoryLabel: 'Diwali Specials',
    categoryIcon: '🪔',
    image: '/gallery/hampers/featured/shubh-shringaar-artisan-basket.webp',
    description: 'Handcrafted macrame basket featuring Janta Delicious & Crunchy treats, Crunchy Moments, Crunchy Granola, and an auspicious handcrafted Shubh-Labh centerpiece diya. Dressed with vibrant festive blooms.',
    contents: [
      'Handwoven Rope Artisan Basket',
      'Janta Crunchy Granola Jar',
      'Janta Delicious & Crunchy Treats Box',
      'Janta Crunchy Moments Gourmet Box',
      'Auspicious Handcrafted Diya Plaque',
      'Festive Floral & Organza Accents',
    ],
  },
  {
    id: 'featured-hamper-2',
    name: 'Featured Hamper 2',
    category: 'featured',
    categoryLabel: 'Diwali Specials',
    categoryIcon: '🪔',
    image: '/gallery/hampers/featured/royal-elephant-keepsake-chest.webp',
    description: 'Ornate embossed turquoise & gold royal elephant keepsake chest lined with royal blue satin. Includes twin golden-domed jars of California almonds & cashews plus an assorted Belgian-style chocolate collection.',
    contents: [
      'Embossed Royal Elephant Keepsake Tin',
      'California Almonds in Golden-Domed Glass Jar',
      'Jumbo Roasted Cashews in Golden-Domed Glass Jar',
      'Assorted Artisanal Chocolates Gold Tray',
      'Royal Blue Satin Cushioning',
    ],
  },
  {
    id: 'featured-hamper-3',
    name: 'Featured Hamper 3',
    category: 'featured',
    categoryLabel: 'Diwali Specials',
    categoryIcon: '🪔',
    image: '/gallery/hampers/featured/shahi-bailgadi-keepsake.webp',
    description: 'Majestic traditional golden embossed bullock cart with twin ceremonial white bullocks on an engraved platform. Carries 4 antique brass-embossed lid glass canisters with premium California almonds, cashews, and dry fruits.',
    contents: [
      'Golden Embossed Traditional Cart Structure',
      'Twin Hand-Painted Ceremonial Bullocks',
      '4 Antique Brass-Lid Glass Canisters',
      'Supreme California Almonds',
      'Jumbo Roasted Cashews',
      'Handpicked Festive Dry Fruits',
    ],
  },
  {
    id: 'featured-hamper-4',
    name: 'Featured Hamper 4',
    category: 'featured',
    categoryLabel: 'Diwali Specials',
    categoryIcon: '🪔',
    image: '/gallery/hampers/featured/whispers-of-joy-trunk.webp',
    description: 'Signature botanical illustration gift trunk with woven chevron straps and matching tote bag. Filled with Janta Popped Nachos with Salsa Dip, handmade cookies, savory gourmet bites, and artisanal jar.',
    contents: [
      'Botanical Keepsake Trunk with Chevron Straps',
      'Matching Luxury "Whispers of Joy" Tote Bag',
      'Janta Popped Nachos with Salsa Dip',
      'Fresh Artisanal Butter Cookies',
      'Twin Sweet & Savory Gourmet Boxes',
      'Signature Dry Treat Jar',
    ],
  },
  {
    id: 'featured-hamper-5',
    name: 'Featured Hamper 5',
    category: 'featured',
    categoryLabel: 'Diwali Specials',
    categoryIcon: '🪔',
    image: '/gallery/hampers/featured/royal-noir-luxe-basket.webp',
    description: 'Sleek architectural matte black handled basket lined with shimmering antique gold textile. Features 3 tulle-wrapped artisanal treat jars, twin designer gift boxes, and fresh white floral spray.',
    contents: [
      'Architectural Matte Black Handled Basket',
      'Antique Gold Shimmer Textile Lining',
      '3 Tulle-Wrapped Gourmet Dry Fruit Jars',
      '2 Designer Confectionery Gift Boxes',
      'Fresh White Floral Accent',
    ],
  },
  {
    id: 'featured-hamper-6',
    name: 'Featured Hamper 6',
    category: 'featured',
    categoryLabel: 'Diwali Specials',
    categoryIcon: '🪔',
    image: '/gallery/hampers/featured/khushiyon-ki-saugaat-box.webp',
    description: 'Regal deep chocolate and gold-foil embossed presentation set with handle briefcase box and transparent showcase trio featuring copper-metallic lid canisters packed with roasted dry fruits and dried berries.',
    contents: [
      'Gold-Foil Embossed Briefcase Handle Box',
      'Transparent Showcase Display Box',
      '3 Metallic Copper-Lid Canisters',
      'Roasted Salted Jumbo Cashews',
      'California Almonds',
      'Gourmet Dried Cranberries & Berries',
    ],
  },
  {
    id: 'featured-hamper-7',
    name: 'Featured Hamper 7',
    category: 'featured',
    categoryLabel: 'Diwali Specials',
    categoryIcon: '🪔',
    image: '/gallery/hampers/featured/boho-elegance-macrame-basket.webp',
    description: 'Artisanal hand-knotted natural cotton macrame rope basket with arched woven handle and rose-gold runner. Includes organza-wrapped pastel jars, twin gift boxes, and delicate white roses.',
    contents: [
      'Hand-Knotted Cotton Macrame Basket',
      'Rose-Gold Shimmer Fabric Runner',
      '3 Organza-Tulle Wrapped Gourmet Jars',
      '2 Twin Confectionery Gift Boxes',
      'White Rose Floral Bouquet',
    ],
  },
];

export const hampersData: HamperItem[] = [
  ...featuredHampersData,

  /* ═══════════════════════════════════════════
     BASKET HAMPERS (12 Items)
     ═══════════════════════════════════════════ */
  {
    id: 'basket-rani-rang',
    name: 'Rani Rang',
    category: 'basket',
    categoryLabel: 'Basket Hampers',
    categoryIcon: '🧺',
    image: '/gallery/hampers/basket/rani-rang.webp',
  },
  {
    id: 'basket-laal-gulab',
    name: 'Laal Gulab',
    category: 'basket',
    categoryLabel: 'Basket Hampers',
    categoryIcon: '🧺',
    image: '/gallery/hampers/basket/laal-gulab.webp',
  },
  {
    id: 'basket-chandni-mehfil',
    name: 'Chandni Mehfil',
    category: 'basket',
    categoryLabel: 'Basket Hampers',
    categoryIcon: '🧺',
    image: '/gallery/hampers/basket/chandni-mehfil.webp',
  },
  {
    id: 'basket-gulab-noor',
    name: 'Gulab Noor',
    category: 'basket',
    categoryLabel: 'Basket Hampers',
    categoryIcon: '🧺',
    image: '/gallery/hampers/basket/gulab-noor.webp',
  },
  {
    id: 'basket-mor-pankh',
    name: 'Mor Pankh',
    category: 'basket',
    categoryLabel: 'Basket Hampers',
    categoryIcon: '🧺',
    image: '/gallery/hampers/basket/mor-pankh.webp',
  },
  {
    id: 'basket-lavanya',
    name: 'Lavanya',
    category: 'basket',
    categoryLabel: 'Basket Hampers',
    categoryIcon: '🧺',
    image: '/gallery/hampers/basket/lavanya.webp',
  },
  {
    id: 'basket-shahi-naav',
    name: 'Shahi Naav',
    category: 'basket',
    categoryLabel: 'Basket Hampers',
    categoryIcon: '🧺',
    image: '/gallery/hampers/basket/shahi-naav.webp',
  },
  {
    id: 'basket-sunehri-subah',
    name: 'Sunehri Subah',
    category: 'basket',
    categoryLabel: 'Basket Hampers',
    categoryIcon: '🧺',
    image: '/gallery/hampers/basket/sunehri-subah.webp',
  },
  {
    id: 'basket-kesar-kiran',
    name: 'Kesar Kiran',
    category: 'basket',
    categoryLabel: 'Basket Hampers',
    categoryIcon: '🧺',
    image: '/gallery/hampers/basket/kesar-kiran.webp',
  },
  {
    id: 'basket-festive-hamper-01',
    name: 'Festive Hamper 01',
    category: 'basket',
    categoryLabel: 'Basket Hampers',
    categoryIcon: '🧺',
    image: '/gallery/hampers/basket/festive-hamper-01.webp',
  },
  {
    id: 'basket-festive-hamper-02',
    name: 'Festive Hamper 02',
    category: 'basket',
    categoryLabel: 'Basket Hampers',
    categoryIcon: '🧺',
    image: '/gallery/hampers/basket/festive-hamper-02.webp',
  },
  {
    id: 'basket-festive-hamper-03',
    name: 'Festive Hamper 03',
    category: 'basket',
    categoryLabel: 'Basket Hampers',
    categoryIcon: '🧺',
    image: '/gallery/hampers/basket/festive-hamper-03.webp',
  },

  /* ═══════════════════════════════════════════
     BOXED HAMPERS (12 Items)
     ═══════════════════════════════════════════ */
  {
    id: 'boxed-vaibhav-vistara',
    name: 'Vaibhav Vistara',
    category: 'boxed',
    categoryLabel: 'Boxed Hampers',
    categoryIcon: '🎁',
    image: '/gallery/hampers/boxed/vaibhav-vistara.webp',
  },
  {
    id: 'boxed-chandani-raat',
    name: 'Chandani Raat',
    category: 'boxed',
    categoryLabel: 'Boxed Hampers',
    categoryIcon: '🎁',
    image: '/gallery/hampers/boxed/chandani-raat.webp',
  },
  {
    id: 'boxed-anmol-ratan',
    name: 'Anmol Ratan',
    category: 'boxed',
    categoryLabel: 'Boxed Hampers',
    categoryIcon: '🎁',
    image: '/gallery/hampers/boxed/anmol-ratan.webp',
  },
  {
    id: 'boxed-neel-kamal',
    name: 'Neel Kamal',
    category: 'boxed',
    categoryLabel: 'Boxed Hampers',
    categoryIcon: '🎁',
    image: '/gallery/hampers/boxed/neel-kamal.webp',
  },
  {
    id: 'boxed-gulabi-nazrana',
    name: 'Gulabi Nazrana',
    category: 'boxed',
    categoryLabel: 'Boxed Hampers',
    categoryIcon: '🎁',
    image: '/gallery/hampers/boxed/gulabi-nazrana.webp',
  },
  {
    id: 'boxed-shahi-saugaat',
    name: 'Shahi Saugaat',
    category: 'boxed',
    categoryLabel: 'Boxed Hampers',
    categoryIcon: '🎁',
    image: '/gallery/hampers/boxed/shahi-saugaat.webp',
  },
  {
    id: 'boxed-janta-wishes',
    name: 'Janta Wishes',
    category: 'boxed',
    categoryLabel: 'Boxed Hampers',
    categoryIcon: '🎁',
    image: '/gallery/hampers/boxed/janta-wishes.webp',
  },
  {
    id: 'boxed-sadaiv-mangal',
    name: 'Sadaiv Mangal',
    category: 'boxed',
    categoryLabel: 'Boxed Hampers',
    categoryIcon: '🎁',
    image: '/gallery/hampers/boxed/sadaiv-mangal.webp',
  },
  {
    id: 'boxed-swarnim-utsav',
    name: 'Swarnim Utsav',
    category: 'boxed',
    categoryLabel: 'Boxed Hampers',
    categoryIcon: '🎁',
    image: '/gallery/hampers/boxed/swarnim-utsav.webp',
  },
  {
    id: 'boxed-divya-jyoti',
    name: 'Divya Jyoti',
    category: 'boxed',
    categoryLabel: 'Boxed Hampers',
    categoryIcon: '🎁',
    image: '/gallery/hampers/boxed/divya-jyoti.webp',
  },
  {
    id: 'boxed-hamper-1',
    name: 'Boxed Hamper 1',
    category: 'boxed',
    categoryLabel: 'Boxed Hampers',
    categoryIcon: '🎁',
    image: '/gallery/hampers/boxed/kamdhenu-box.webp',
  },
  {
    id: 'boxed-hamper-2',
    name: 'Boxed Hamper 2',
    category: 'boxed',
    categoryLabel: 'Boxed Hampers',
    categoryIcon: '🎁',
    image: '/gallery/hampers/boxed/khushiyon-ki-saugaat.webp',
  },

  /* ═══════════════════════════════════════════
     DRY FRUIT HAMPERS (11 Items)
     ═══════════════════════════════════════════ */
  {
    id: 'dry-fruit-hamper-1',
    name: 'Dry Fruit Hamper 1',
    category: 'dry-fruit',
    categoryLabel: 'Dry Fruit Hampers',
    categoryIcon: '🥜',
    image: '/gallery/hampers/dry-fruit/dry-fruit-hamper-1.webp',
  },
  {
    id: 'dry-fruit-hamper-2',
    name: 'Dry Fruit Hamper 2',
    category: 'dry-fruit',
    categoryLabel: 'Dry Fruit Hampers',
    categoryIcon: '🥜',
    image: '/gallery/hampers/dry-fruit/dry-fruit-hamper-2.webp',
  },
  {
    id: 'dry-fruit-hamper-3',
    name: 'Dry Fruit Hamper 3',
    category: 'dry-fruit',
    categoryLabel: 'Dry Fruit Hampers',
    categoryIcon: '🥜',
    image: '/gallery/hampers/dry-fruit/dry-fruit-hamper-3.webp',
  },
  {
    id: 'dry-fruit-hamper-4',
    name: 'Dry Fruit Hamper 4',
    category: 'dry-fruit',
    categoryLabel: 'Dry Fruit Hampers',
    categoryIcon: '🥜',
    image: '/gallery/hampers/dry-fruit/dry-fruit-hamper-4.webp',
  },
  {
    id: 'dry-fruit-hamper-5',
    name: 'Dry Fruit Hamper 5',
    category: 'dry-fruit',
    categoryLabel: 'Dry Fruit Hampers',
    categoryIcon: '🥜',
    image: '/gallery/hampers/dry-fruit/dry-fruit-hamper-5.webp',
  },
  {
    id: 'dry-fruit-hamper-6',
    name: 'Dry Fruit Hamper 6',
    category: 'dry-fruit',
    categoryLabel: 'Dry Fruit Hampers',
    categoryIcon: '🥜',
    image: '/gallery/hampers/dry-fruit/dry-fruit-hamper-6.webp',
  },
  {
    id: 'dry-fruit-hamper-7',
    name: 'Dry Fruit Hamper 7',
    category: 'dry-fruit',
    categoryLabel: 'Dry Fruit Hampers',
    categoryIcon: '🥜',
    image: '/gallery/hampers/dry-fruit/dry-fruit-hamper-7.webp',
  },
  {
    id: 'dry-fruit-hamper-8',
    name: 'Dry Fruit Hamper 8',
    category: 'dry-fruit',
    categoryLabel: 'Dry Fruit Hampers',
    categoryIcon: '🥜',
    image: '/gallery/hampers/dry-fruit/dry-fruit-hamper-8.webp',
  },
  {
    id: 'dry-fruit-hamper-9',
    name: 'Dry Fruit Hamper 9',
    category: 'dry-fruit',
    categoryLabel: 'Dry Fruit Hampers',
    categoryIcon: '🥜',
    image: '/gallery/hampers/dry-fruit/dry-fruit-hamper-9.webp',
  },
  {
    id: 'dry-fruit-hamper-10',
    name: 'Dry Fruit Hamper 10',
    category: 'dry-fruit',
    categoryLabel: 'Dry Fruit Hampers',
    categoryIcon: '🥜',
    image: '/gallery/hampers/dry-fruit/dry-fruit-hamper-10.webp',
  },
  {
    id: 'dry-fruit-hamper-11',
    name: 'Dry Fruit Hamper 11',
    category: 'dry-fruit',
    categoryLabel: 'Dry Fruit Hampers',
    categoryIcon: '🥜',
    image: '/gallery/hampers/dry-fruit/dry-fruit-hamper-11.webp',
  },
];

/* ═══════════════════════════════════════════
   HELPER UTILITIES
   ═══════════════════════════════════════════ */

export function getHamperOrderName(hamper: HamperItem): string {
  if (
    hamper.name.toLowerCase().startsWith('festive hamper') ||
    hamper.name.toLowerCase().startsWith('boxed hamper') ||
    hamper.name.toLowerCase().startsWith('dry fruit hamper')
  ) {
    const singularCategory = hamper.categoryLabel.endsWith('s')
      ? hamper.categoryLabel.slice(0, -1)
      : hamper.categoryLabel;
    return `${hamper.name} (${singularCategory})`;
  }
  return hamper.name;
}

export function getHamperBySlug(slug: string): HamperItem | undefined {
  if (!slug) return undefined;
  const normalized = decodeURIComponent(slug).toLowerCase().trim();
  return hampersData.find(
    (h) =>
      h.id.toLowerCase() === normalized ||
      (h.slug && h.slug.toLowerCase() === normalized) ||
      h.id.replace(/^(basket-|boxed-|dry-fruit-)/, '').toLowerCase() === normalized
  );
}

export function getAllHamperSlugs(): string[] {
  return hampersData.map((h) => h.id);
}

export function getHamperOgImage(hamper: HamperItem): string {
  if (hamper.ogImage) return hamper.ogImage;
  return `/gallery/hampers/og/${hamper.id}.jpg`;
}

export function getHamperDescription(hamper: HamperItem): string {
  if (hamper.description) return hamper.description;
  if (hamper.category === 'featured') {
    return 'Exclusive handcrafted Diwali gift hamper from Janta Bakery’s festive showcase. Featuring premium dry fruits, artisan treats, and bespoke keepsake presentation handcrafted in Bhogal, New Delhi.';
  }
  if (hamper.category === 'basket') {
    return "Handcrafted artisan festive basket dressed in delicate net and floral accents, filled with Janta Bakery's signature cookies, dry cakes, savouries, and celebratory confections. Prepared fresh in Bhogal, New Delhi.";
  }
  if (hamper.category === 'boxed') {
    return 'Royal rigid keepsake box featuring traditional festive Indian motifs and gold finish, curated with artisan bakery biscuits, premium assorted dry fruits, and bespoke confections. Perfect for corporate and family gifting.';
  }
  return 'Heritage handcrafted festive keepsake box with regal artwork, featuring handpicked supreme quality dry fruits (cashews, almonds, pistachios) and celebratory dry confections.';
}

