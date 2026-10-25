export type GiftingCategory = 'basket' | 'boxed' | 'dry-fruit';

export interface HamperItem {
  id: string;
  name: string;
  category: GiftingCategory;
  categoryLabel: string;
  categoryIcon: string;
  image: string;
}

export const GIFTING_CATEGORIES: { id: 'all' | GiftingCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'All Hampers', icon: '✨' },
  { id: 'basket', label: 'Basket Hampers', icon: '🧺' },
  { id: 'boxed', label: 'Boxed Hampers', icon: '🎁' },
  { id: 'dry-fruit', label: 'Dry Fruit Hampers', icon: '🥜' },
];

export const CATEGORY_COVERS: Record<GiftingCategory, { image: string; title: string; subtitle: string }> = {
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

export const hampersData: HamperItem[] = [
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
