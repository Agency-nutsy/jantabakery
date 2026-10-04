const fs = require('fs');
const path = require('path');

const marquee = [
  '/gallery/cakes/premium-cake-14.jpg',
  '/gallery/rusks/special-shahi-rusk-poster.jpg',
  '/gallery/custom-cakes/custom-cake-3.jpg',
  '/gallery/namkeen/beetroot-chips-poster.jpg',
  '/gallery/biscuits/choco-crunch-poster.jpg',
  '/gallery/custom-cakes/custom-cake-13.jpg',
  '/gallery/cakes/premium-pastry-15.jpg',
  '/gallery/namkeen/bhakarwadi-poster.jpg',
  '/gallery/custom-cakes/custom-cake-14.jpg',
  '/ads/chocolate-muffin-delight-poster.png',
  '/gallery/rusks/milk-rusk-poster.jpg',
  '/gallery/custom-cakes/custom-cake-6.jpg',
  '/gallery/namkeen/masala-kaju-poster.jpg',
  '/gallery/custom-cakes/custom-cake-1.jpg',
  '/gallery/biscuits/kaju-pista-cookies.jpg',
  '/gallery/custom-cakes/custom-cake-10.jpg',
  '/gallery/cakes/premium-pastry-18.jpg',
  '/gallery/custom-cakes/custom-cake-9.jpg',
  '/gallery/namkeen/mini-samosa-poster.jpg',
  '/gallery/custom-cakes/custom-cake-5.jpg',
];

marquee.forEach(src => {
  const fullPath = path.join(process.cwd(), 'public', src);
  if (!fs.existsSync(fullPath)) {
    console.log('BROKEN:', src);
  }
});
