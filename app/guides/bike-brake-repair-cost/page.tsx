import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How much does bicycle brake repair cost?",
  description:
    "Understand common bicycle brake repairs, from squeaks and adjustments to pads and rotors.",
  path: "/guides/bike-brake-repair-cost",
});

export default function Guide() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Guide · Brakes</div>
          <h1>How much does bicycle brake repair cost?</h1>
          <p>From squeaks and adjustments to pads and rotors.</p>
        </div>
      </section>
      <section className="content-page">
        <div className="container prose">
          <p>
            Brake problems can come from alignment, contamination, worn pads, cable issues, or a
            damaged rotor.
          </p>
          <p>
            A simple adjustment should not be priced like a component replacement. Ask what
            actually needs to change.
          </p>
          <p>For a replacement, compare the part price and labour separately when possible.</p>
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
