import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import CookieConsent from "@/components/CookieConsent";
import JsonLd from "@/components/JsonLd";
import Logo from "@/components/Logo";
import { organizationJsonLd, siteConfig, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  alternates: { canonical: siteConfig.url },
};

const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-KE">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        {adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body>
        <header className="site-header">
          <div className="container nav">
            <Logo />
            <nav className="nav-links" aria-label="Main">
              <Link href="/prices">Prices</Link>
              <Link href="/calculator">Quote checker</Link>
              <Link href="/guides">Guides</Link>
              <Link href="/reports">Reports</Link>
              <Link href="/about">About</Link>
            </nav>
            <Link href="/prices" className="mobile-nav">
              Prices
            </Link>
          </div>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <div className="container footer-grid">
            <div>
              <div className="footer-brand">Bei Baiskeli</div>
              <p className="footer-tagline">
                Fair bicycle repair prices for cyclists in Kenya. Know what a repair should cost
                before you pay.
              </p>
            </div>
            <div className="footer-col">
              <b>Site</b>
              <div className="footer-links">
                <Link href="/prices">Repair prices</Link>
                <Link href="/calculator">Quote checker</Link>
                <Link href="/guides">Guides</Link>
                <Link href="/about">About</Link>
              </div>
            </div>
            <div className="footer-col">
              <b>Legal</b>
              <div className="footer-links">
                <Link href="/privacy">Privacy policy</Link>
                <Link href="/cookies">Cookie policy</Link>
              </div>
            </div>
          </div>
          <div className="container footer-bottom">
            © {new Date().getFullYear()} Bei Baiskeli · Prices in KSh · Kenya
          </div>
        </footer>
        <CookieConsent />
      </body>
    </html>
  );
}
