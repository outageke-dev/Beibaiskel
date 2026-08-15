import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Bei Baiskeli helps cyclists in Kenya understand fair bicycle repair prices. Learn how the pricebook works and why we built it.",
  path: "/about",
});

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">About</div>
          <h1>Why Bei Baiskeli exists</h1>
          <p>
            A simple price reference for cyclists who want to know what a bicycle repair should
            cost — before handing over cash.
          </p>
        </div>
      </section>
      <section className="content-page">
        <div className="container prose">
          <h2>The problem</h2>
          <p>
            If you ride a bicycle in Kenya, you have probably walked into a repair shop without
            knowing what a fair price looks like. A fundi might quote KSh 800 for a job that
            should cost KSh 400 — or the reverse, if parts are harder to find than expected.
            Without a reference point, it is hard to tell.
          </p>

          <h2>What we do</h2>
          <p>
            Bei Baiskeli (&quot;price of bicycle&quot; in Swahili) publishes estimated price ranges
            for common bicycle repairs. Each estimate covers labour, parts, and a total range in
            Kenyan shillings. You can browse repairs, read repair notes, and use the quote checker
            to compare what you were quoted.
          </p>

          <h2>How the pricebook works</h2>
          <p>
            Estimates are maintained in a live pricebook shared by this website and the Bei
            Baiskeli mobile app. Ranges reflect typical costs — not fixed shop prices. A repair
            might land anywhere in the range depending on parts quality, bike condition, and
            location.
          </p>
          <ul>
            <li>Prices are shown in KSh (Kenyan shillings).</li>
            <li>Each repair includes labour, parts, and total estimates where available.</li>
            <li>Repair notes explain what affects the final cost.</li>
            <li>The quote checker lets you compare a fundi&apos;s quote to the current range.</li>
          </ul>

          <h2>What we are not</h2>
          <p>
            Bei Baiskeli is not a repair shop and does not book appointments. We do not guarantee
            that any fundi will charge within our range. The pricebook is a reference — a starting
            point for an informed conversation, not a contract.
          </p>

          <h2>Get started</h2>
          <p>
            <Link href="/prices">Browse repair prices</Link>,{" "}
            <Link href="/calculator">check a quote</Link>, or read our{" "}
            <Link href="/guides">repair guides</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
