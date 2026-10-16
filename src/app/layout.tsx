import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import FloatingCart from "@/components/FloatingCart";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { CartProvider } from "@/lib/cartContext";
import {
  SITE_URL,
  BUSINESS_NAME,
  ADDRESS,
  PHONE_DISPLAY,
  PHONE_DIGITS,
  OPENING_HOURS,
  FOUNDED_YEAR,
} from "@/lib/siteConfig";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

import { Viewport } from 'next';

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const siteTitle = `${BUSINESS_NAME} — Since ${FOUNDED_YEAR} | Best Bakery in Bhogal, Jangpura, New Delhi`;
const siteDescription = `${BUSINESS_NAME}, established in ${FOUNDED_YEAR}, is Delhi's most beloved bakery in Bhogal, Jangpura. Famous for cakes, pastries, cookies & custom orders. 2800+ Google Reviews. Open 7 days.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteTitle,
    template: `%s | ${BUSINESS_NAME} — Since ${FOUNDED_YEAR}`,
  },
  description: siteDescription,
  keywords: [
    "Janta Bakery",
    "Bhogal Bakery",
    "Jangpura Bakery",
    "Best Bakery Delhi",
    "Cakes in Delhi",
    "Black Forest Cake Delhi",
    "Bakery near Jangpura Metro",
    "Since 1967",
    "Custom Cakes New Delhi",
    "Eggless Cakes Delhi",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${BUSINESS_NAME} — Since ${FOUNDED_YEAR} | Delhi's Most Beloved Bakery`,
    description: `Handcrafted cakes, pastries & joy since ${FOUNDED_YEAR}. Visit us at Bhogal, Jangpura, New Delhi.`,
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${BUSINESS_NAME} — Bhogal, New Delhi`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS_NAME} — Since ${FOUNDED_YEAR}`,
    description: `Handcrafted cakes, pastries & joy since ${FOUNDED_YEAR}. Bhogal, Jangpura, New Delhi.`,
    images: [`${SITE_URL}/og-image.png`],
  },
};

/** LocalBusiness JSON-LD — uses only confirmed business facts. */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: BUSINESS_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
  image: [`${SITE_URL}/og-image.png`, `${SITE_URL}/logo.webp`],
  telephone: `+${PHONE_DIGITS}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.street,
    addressLocality: `${ADDRESS.locality}, ${ADDRESS.city}`,
    postalCode: ADDRESS.postalCode,
    addressCountry: ADDRESS.country,
  },
  openingHours: OPENING_HOURS,
  hasMap: "https://www.google.com/maps/place/?q=place_id:ChIJ2zY65zDkDTkR9K2P64d4G8Q",
  servesCuisine: ["Bakery", "Confectionery", "Indian Sweets"],
  menu: `${SITE_URL}/menu`,
  priceRange: "₹",
  foundingDate: String(FOUNDED_YEAR),
  description: siteDescription,
  sameAs: [
    "https://www.instagram.com/jantabakery1967",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://maps.google.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="preload" href="/whatsapp-hero.webp" as="image" />
        <link rel="preload" href="/logo.webp" as="image" />
        {/* LocalBusiness JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-dm-sans)]">
        <CartProvider>
          <ScrollProgress />
          <ScrollToTop />
          <Navbar />
          <main className="flex-1 min-h-screen">{children}</main>
          <Footer />
          <FloatingCart />
          <FloatingWidgets />
        </CartProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
