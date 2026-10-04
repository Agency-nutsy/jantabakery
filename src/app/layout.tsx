import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import FloatingCart from "@/components/FloatingCart";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import { CartProvider } from "@/lib/cartContext";

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

export const metadata: Metadata = {
  title: {
    default: "Janta Bakery — Since 1967 | Best Bakery in Bhogal, Jangpura, New Delhi",
    template: "%s | Janta Bakery — Since 1967",
  },
  description:
    "Janta Bakery, established in 1967, is Delhi's most beloved bakery in Bhogal, Jangpura. Famous for cakes, pastries, cookies & custom orders. 2800+ Google Reviews. Open 7 days.",
  keywords: [
    "Janta Bakery",
    "Bhogal Bakery",
    "Jangpura Bakery",
    "Best Bakery Delhi",
    "Cakes in Delhi",
    "Black Forest Cake Delhi",
    "Bakery near Jangpura Metro",
    "Since 1967",
  ],
  openGraph: {
    title: "Janta Bakery — Since 1967 | Delhi's Most Beloved Bakery",
    description:
      "Handcrafted cakes, pastries & joy since 1967. Visit us at Bhogal, Jangpura, New Delhi.",
    type: "website",
    locale: "en_IN",
  },
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
      </body>
    </html>
  );
}
