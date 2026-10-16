# Janta Bakery — Website

Handcrafted website for **Janta Bakery**, Bhogal, Jangpura, New Delhi. Built with **Next.js 16** (App Router), **Tailwind CSS v4**, and **Framer Motion**.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

---

## Environment Variables

Create a `.env.local` file in the project root with the following optional variables:

```env
# Optional — remove or leave blank to disable Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional — override the canonical site URL (defaults to https://www.jantabakery.com)
NEXT_PUBLIC_SITE_URL=https://www.jantabakery.com
```

### How to get your GA4 Measurement ID

1. Go to [analytics.google.com](https://analytics.google.com) → **Admin** → **Data Streams**
2. Click your web data stream
3. Copy the **Measurement ID** (starts with `G-`)
4. Paste it as `NEXT_PUBLIC_GA_ID` in `.env.local`

If the variable is not set, the site works identically with no analytics code loaded.

---

## GA4 Events Tracked

| Event name | Fired when |
|---|---|
| `click_call` | User taps the phone number link |
| `click_whatsapp` | User taps any WhatsApp button |
| `click_directions` | User taps the Google Maps / Directions button |
| `add_to_cart` | User adds an item to the order cart |
| `remove_from_cart` | User removes an item from the cart |
| `send_order_whatsapp` | User submits their cart as a WhatsApp order |
| `menu_search` | User types in the menu search box |
| `menu_category_select` | User clicks a menu category tab |
| `click_instagram` | User taps the Instagram link |

> **Privacy note:** No personal data, order content, phone numbers, or message text is ever sent to Google Analytics.

---

## Connecting a Custom Domain (www.jantabakery.com)

1. Deploy to **Vercel** (recommended) — connect your GitHub repository at [vercel.com/new](https://vercel.com/new)
2. In Vercel → **Project Settings → Domains**, add `www.jantabakery.com` and `jantabakery.com`
3. Follow Vercel's instructions to update your DNS (add the A record and CNAME at your domain registrar)
4. Vercel will automatically provision SSL
5. Set `NEXT_PUBLIC_SITE_URL=https://www.jantabakery.com` in Vercel environment variables

---

## Google Search Console (GSC)

Search Console tells you which search queries bring customers to your site — completely free.

### How to verify ownership

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Click **Add property** → choose **URL prefix** → enter `https://www.jantabakery.com`
3. Choose verification method:
   - **HTML tag** (easiest for Next.js): Copy the content value from the `<meta name="google-site-verification" ...>` tag
   - Add it to `layout.tsx` under `metadata.verification.google = 'YOUR_CODE'`
4. Click **Verify**
5. After domain is live, submit your sitemap: **Sitemaps → https://www.jantabakery.com/sitemap.xml**

### GSC vs GA4 vs Google Business Profile — what each does

| Tool | What it shows |
|---|---|
| **Google Analytics 4** | How visitors behave *on your website* — page views, button clicks, time on site |
| **Google Search Console** | Which Google search queries show your site, clicks from Google, indexing errors |
| **Google Business Profile** | Reviews, calls, map directions — from people who find you on Google Maps / local search |

All three are free and complement each other. Start with GSC to ensure your pages are indexed.

---

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout: metadata, JSON-LD, GA4
    page.tsx            # Homepage
    sitemap.ts          # Auto-generated XML sitemap at /sitemap.xml
    robots.ts           # robots.txt at /robots.txt
    menu/
    about/
    gallery/
    contact/
  components/
    Navbar.tsx
    Footer.tsx
    FloatingWidgets.tsx
    FloatingCart.tsx
    GoogleAnalytics.tsx # GA4 script (renders nothing if GA ID not set)
  lib/
    siteConfig.ts       # ← All shared constants: phone, URL, address, etc.
    analytics.ts        # GA4 event helper functions
    cartContext.tsx
```

> **Single source of truth:** phone number, WhatsApp URL, address and site URL are all defined in `src/lib/siteConfig.ts`. Change them once, they update everywhere.
