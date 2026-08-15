import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description:
    "How Bei Baiskeli uses cookies, including cookies set by Google AdSense for advertising.",
  path: "/cookies",
});

export default function Cookies() {
  const updated = "15 August 2026";

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Legal</div>
          <h1>Cookie policy</h1>
          <p>Last updated: {updated}</p>
        </div>
      </section>
      <section className="content-page">
        <div className="container prose">
          <p>
            This page explains how Bei Baiskeli uses cookies and similar technologies when you
            visit our website.
          </p>

          <h2>What are cookies?</h2>
          <p>
            Cookies are small text files stored in your browser. They help websites remember
            preferences, keep sessions working, and — with your consent — show relevant ads.
          </p>

          <h2>Cookies we use</h2>

          <h3>Essential cookies</h3>
          <p>
            These are needed for basic site function. They include remembering your cookie consent
            choice so we do not show the banner on every visit.
          </p>
          <ul>
            <li>
              <strong>bei-baiskeli-cookie-consent</strong> — stores whether you accepted cookies.
              Duration: until you clear browser storage.
            </li>
          </ul>

          <h3>Advertising cookies (Google AdSense)</h3>
          <p>
            If you accept cookies, we may load Google AdSense. Google and its advertising partners
            may set cookies to:
          </p>
          <ul>
            <li>Deliver and measure ads on this site.</li>
            <li>Limit how often you see the same ad.</li>
            <li>Personalise ads based on your browsing history (where permitted).</li>
          </ul>
          <p>
            Common Google ad cookies include <strong>__gads</strong>, <strong>__gpi</strong>, and
            related identifiers. See{" "}
            <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">
              Google&apos;s cookie documentation
            </a>{" "}
            for the full list.
          </p>

          <h3>Third-party cookies</h3>
          <p>
            Google Fonts may set cookies or collect connection data when loading fonts. This is
            standard for web font delivery.
          </p>

          <h2>Managing cookies</h2>
          <p>You can control cookies in several ways:</p>
          <ul>
            <li>
              <strong>Cookie banner</strong> — when you first visit, you can accept or decline
              non-essential cookies via the banner at the bottom of the page.
            </li>
            <li>
              <strong>Browser settings</strong> — most browsers let you block or delete cookies.
              Blocking all cookies may affect site functionality.
            </li>
            <li>
              <strong>Google ad settings</strong> — opt out of personalised ads at{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                google.com/settings/ads
              </a>
              .
            </li>
            <li>
              <strong>Industry opt-out</strong> — visit{" "}
              <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">
                aboutads.info
              </a>{" "}
              for a cross-industry opt-out tool (US-based).
            </li>
          </ul>

          <h2>More information</h2>
          <p>
            For how we handle personal data overall, see our{" "}
            <Link href="/privacy">privacy policy</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
