import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Bei Baiskeli collects, uses, and protects your data. Includes information about cookies and Google AdSense.",
  path: "/privacy",
});

export default function Privacy() {
  const updated = "15 August 2026";

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Legal</div>
          <h1>Privacy policy</h1>
          <p>Last updated: {updated}</p>
        </div>
      </section>
      <section className="content-page">
        <div className="container prose">
          <p>
            Bei Baiskeli (&quot;we&quot;, &quot;us&quot;) operates beibaiskeli.vercel.app and
            related services. This policy explains what data we collect and how we use it.
          </p>

          <h2>What we collect</h2>
          <p>We collect minimal data to run the site:</p>
          <ul>
            <li>
              <strong>Usage data</strong> — pages visited, browser type, and general analytics
              through standard web server logs and analytics tools.
            </li>
            <li>
              <strong>Cookie data</strong> — small files stored in your browser. See our{" "}
              <Link href="/cookies">cookie policy</Link> for details.
            </li>
            <li>
              <strong>Quote checker input</strong> — when you use the quote checker, repair type
              and amount are processed in your browser session. We do not store personal quote
              submissions on our servers.
            </li>
          </ul>
          <p>
            We do not require accounts to browse prices. We do not collect names, phone numbers,
            or payment details through this website.
          </p>

          <h2>How we use data</h2>
          <ul>
            <li>Keep the site running and improve repair price content.</li>
            <li>Understand which pages are useful (aggregated analytics).</li>
            <li>Display relevant advertisements through Google AdSense, where enabled.</li>
          </ul>

          <h2>Google AdSense</h2>
          <p>
            This site may use Google AdSense to show advertisements. Google and its partners may
            use cookies to serve ads based on your prior visits to this site or other websites.
          </p>
          <ul>
            <li>
              Google&apos;s use of advertising cookies lets Google and its partners serve ads
              based on your visit to this site and/or other sites on the Internet.
            </li>
            <li>
              You may opt out of personalised advertising by visiting{" "}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                Google Ads Settings
              </a>
              .
            </li>
            <li>
              See{" "}
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
                How Google uses data when you use our partners&apos; sites or apps
              </a>
              .
            </li>
          </ul>

          <h2>Third-party services</h2>
          <p>We use the following third-party services:</p>
          <ul>
            <li>
              <strong>Hosting</strong> — Vercel (site delivery and server logs).
            </li>
            <li>
              <strong>Google AdSense</strong> — advertising (when enabled).
            </li>
            <li>
              <strong>Google Fonts</strong> — typography delivery.
            </li>
          </ul>
          <p>
            Each service has its own privacy policy. We recommend reviewing them if you want full
            details on their data practices.
          </p>

          <h2>Data retention</h2>
          <p>
            Server logs and analytics data are kept for a limited period needed for security and
            site improvement, then deleted or anonymised.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on where you live, you may have rights to access, correct, or delete personal
            data we hold. Contact us if you have a request — we will respond within a reasonable
            time.
          </p>

          <h2>Children</h2>
          <p>
            This site is not directed at children under 13. We do not knowingly collect data from
            children.
          </p>

          <h2>Changes</h2>
          <p>
            We may update this policy. The date at the top shows when it was last revised. Continued
            use of the site after changes means you accept the updated policy.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy? Visit our <Link href="/about">about page</Link> or reach
            out through the Bei Baiskeli app.
          </p>
        </div>
      </section>
    </>
  );
}
