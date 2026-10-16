/**
 * GoogleAnalytics — loads the GA4 gtag script once in the root layout.
 *
 * The component only renders anything when NEXT_PUBLIC_GA_ID is set.
 * If the env var is empty the site works identically with no analytics loaded.
 *
 * Using next/script with strategy="afterInteractive" (the default) as
 * recommended by the Next.js scripts guide for analytics tags.
 *
 * We configure send_page_view: false to avoid double-counting page views
 * during client-side navigation; the SPA-mode automatic page_view fired
 * by the tag itself should suffice for a Next.js App Router site.
 */

import Script from 'next/script';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}
