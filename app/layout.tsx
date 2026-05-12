import { AppToaster }           from "@/components/ui/toast"
import GlobalNavbar             from "@/components/GlobalNavbar"
import CustomCursor             from "@/components/CustomCursor"
import Footer                   from "@/components/Footer"
import Script                   from "next/script"
import GoogleAnalyticsTracker   from "@/components/GoogleAnalyticsTracker"

import "./globals.css"

export const metadata = {
  title:       "Portfolio — Joaquin Holthof",
  description: "Editorial Red portfolio: projecten, UI/UX & technische deep-dives.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
        `}</Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
        `}</Script>
      </head>

      <body style={{ background: "#FAFAF8", margin: 0 }}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0" width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Global UI */}
        <CustomCursor />
        <GoogleAnalyticsTracker />
        <GlobalNavbar />

        {/* Page content — padded for fixed nav (desktop ~80px top, mobile ~56px) */}
        <main style={{ paddingBottom: 56 }}>
          {children}
        </main>

        {/* Sticky footer */}
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40 }}>
          <Footer />
        </div>

        <AppToaster />
      </body>
    </html>
  )
}
