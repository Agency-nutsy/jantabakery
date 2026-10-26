const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = path.resolve('public/gallery/hampers/featured');

const mapping = [
  {
    src: 'Janta Bakery Diwali Gifting Showcase.png',
    dest: 'diwali-gifting-showcase.webp',
    title: 'Diwali Gifting Showcase Banner'
  },
  {
    src: 'WhatsApp Image 2026-10-26 at 9.56.02 PM.jpeg',
    dest: 'diwali-celebrate-cover.webp',
    title: 'Celebrate Diwali Cover'
  },
  {
    src: 'WhatsApp Image 2026-10-26 at 9.56.02 PM (1).jpeg',
    dest: 'shubh-shringaar-artisan-basket.webp',
    title: 'Shubh Shringaar Artisan Basket'
  },
  {
    src: 'WhatsApp Image 2026-10-26 at 9.56.03 PM.jpeg',
    dest: 'royal-noir-luxe-basket.webp',
    title: 'Royal Noir Luxe Basket'
  },
  {
    src: 'WhatsApp Image 2026-10-26 at 9.56.03 PM (1).jpeg',
    dest: 'shahi-bailgadi-keepsake.webp',
    title: 'Shahi Bailgadi Keepsake Hamper'
  },
  {
    src: 'WhatsApp Image 2026-10-26 at 9.56.03 PM (2).jpeg',
    dest: 'boho-elegance-macrame-basket.webp',
    title: 'Boho Elegance Macrame Basket'
  },
  {
    src: 'WhatsApp Image 2026-10-26 at 9.56.03 PM (3).jpeg',
    dest: 'whispers-of-joy-trunk.webp',
    title: 'Whispers of Joy Botanical Trunk'
  },
  {
    src: 'WhatsApp Image 2026-10-26 at 9.56.04 PM.jpeg',
    dest: 'khushiyon-ki-saugaat-box.webp',
    title: 'Khushiyon Ki Saugaat Regal Box'
  },
  {
    src: 'WhatsApp Image 2026-10-26 at 9.56.06 PM.jpeg',
    dest: 'royal-elephant-keepsake-chest.webp',
    title: 'Royal Elephant Keepsake Chest'
  }
];

async function convert() {
  for (const item of mapping) {
    const inputPath = path.join(srcDir, item.src);
    const outputPath = path.join(srcDir, item.dest);
    if (!fs.existsSync(inputPath)) {
      console.warn(`File not found: ${inputPath}`);
      continue;
    }
    const meta = await sharp(inputPath).metadata();
    console.log(`Processing ${item.src} (${meta.width}x${meta.height}, ${meta.format}) -> ${item.dest}`);
    await sharp(inputPath)
      .webp({ quality: 88 })
      .toFile(outputPath);
    const outStat = fs.statSync(outputPath);
    console.log(`  Saved ${item.dest} (${outStat.size} bytes)`);
  }
}

convert().catch(console.error);
