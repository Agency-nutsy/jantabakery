import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Load hampers from giftingData.ts
const giftingDataContent = fs.readFileSync('src/data/giftingData.ts', 'utf8');

// Simple parser for hampersData
const hamperBlock = giftingDataContent.slice(giftingDataContent.indexOf('export const hampersData'));
const regex = /id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*category:\s*'([^']+)',\s*categoryLabel:\s*'([^']+)',\s*categoryIcon:\s*'([^']+)',\s*image:\s*'([^']+)'/g;

const hampers = [];
let match;
while ((match = regex.exec(hamperBlock)) !== null) {
  hampers.push({
    id: match[1],
    name: match[2],
    category: match[3],
    categoryLabel: match[4],
    categoryIcon: match[5],
    image: match[6],
  });
}

console.log(`Parsed ${hampers.length} hampers.`);

const outDir = path.join(process.cwd(), 'public', 'gallery', 'hampers', 'og');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function generateAll() {
  let count = 0;
  for (const hamper of hampers) {
    const inputPath = path.join(process.cwd(), 'public', hamper.image);
    const outputPath = path.join(outDir, `${hamper.id}.jpg`);

    if (!fs.existsSync(inputPath)) {
      console.warn(`[MISSING] Image not found: ${inputPath}`);
      continue;
    }

    // 1. Resize hamper to fit nicely inside 560x560
    const hamperResized = await sharp(inputPath)
      .resize({ width: 560, height: 560, fit: 'inside' })
      .toBuffer();

    // 2. Safe SVG string for branding overlay
    const safeName = hamper.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const safeCategory = hamper.categoryLabel.toUpperCase().replace(/&/g, '&amp;');

    const svgOverlay = Buffer.from(`
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#C5A059" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="#8B5E3C" stop-opacity="0.8"/>
          </linearGradient>
        </defs>

        <!-- Elegant border -->
        <rect x="22" y="22" width="1156" height="586" rx="16" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" stroke-opacity="0.5" />
        <rect x="28" y="28" width="1144" height="574" rx="12" fill="none" stroke="#C5A059" stroke-width="0.5" stroke-opacity="0.25" />

        <!-- Top Left Brand -->
        <text x="64" y="74" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#6B4423" letter-spacing="3">JANTA BAKERY</text>
        <text x="64" y="96" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500" fill="#9C7A5B" letter-spacing="1.5">SINCE 1967 • NEW DELHI</text>

        <!-- Top Right Festive Tag -->
        <text x="1136" y="74" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#B8860B" letter-spacing="2">DIWALI &amp; FESTIVE COLLECTION</text>
        <text x="1136" y="96" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="400" fill="#8C7A6B">Handcrafted Gifting</text>

        <!-- Bottom Left Category Pill -->
        <rect x="64" y="524" width="220" height="34" rx="17" fill="#6B4423" fill-opacity="0.08" />
        <text x="174" y="546" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#6B4423" letter-spacing="1">${safeCategory}</text>

        <!-- Bottom Right Hamper Title -->
        <text x="1136" y="548" text-anchor="end" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#3D2614" letter-spacing="0.5">${safeName}</text>
      </svg>
    `);

    // 3. Compose onto warm ivory background
    await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 3,
        background: { r: 250, g: 247, b: 242 },
      },
    })
      .composite([
        {
          input: hamperResized,
          gravity: 'centre',
        },
        {
          input: svgOverlay,
          top: 0,
          left: 0,
        },
      ])
      .jpeg({ quality: 85, progressive: true })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const kb = Math.round(stats.size / 1024);
    if (kb > 300) {
      console.error(`[FLAGGED TOO HEAVY] ${hamper.id}: ${kb} KB`);
    } else {
      count++;
    }
  }

  console.log(`Generated ${count} OG images successfully. All under 300 KB!`);
}

generateAll().catch(console.error);
