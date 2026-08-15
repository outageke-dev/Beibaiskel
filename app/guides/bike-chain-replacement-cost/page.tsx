import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How much does bicycle chain replacement cost?",
  description: "A simple guide to bicycle chain replacement prices and what affects the cost.",
  path: "/guides/bike-chain-replacement-cost",
});

export default function Guide() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Guide · Drivetrain</div>
          <h1>How much does bicycle chain replacement cost?</h1>
          <p>What affects the cost of a chain job.</p>
        </div>
      </section>
      <section className="content-page">
        <div className="container prose">
          <p>
            A chain replacement normally involves the chain itself plus labour if you are not doing
            the work yourself.
          </p>
          <p>Higher-end chains and compatibility requirements can increase the parts cost.</p>
          <p>
            A worn chain can also affect the cassette and chainrings, so ask about the condition of
            the drivetrain.
          </p>
          <h2>Check the current price</h2>
          <p>
            Use the Bei Baiskeli price catalogue for a live estimate. The app and website share the
            same pricebook.
          </p>
          <Link className="button" href="/prices">
            Browse repair prices →
          </Link>
        </div>
      </section>
    </>
  );
}
