import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How much does bicycle repair cost in Kenya?",
  description:
    "A practical guide to bicycle repair prices, labour and parts costs in Kenya.",
  path: "/guides/bike-repair-cost-kenya",
});

export default function Guide() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Guide · Kenya</div>
          <h1>How much does bicycle repair cost in Kenya?</h1>
          <p>Labour, parts, and fair-price basics.</p>
        </div>
      </section>
      <section className="content-page">
        <div className="container prose">
          <p>
            There is no single bicycle repair price in Kenya. The final amount depends on the
            repair, replacement part, and labour.
          </p>
          <p>
            Before accepting a quote, identify exactly what is being replaced or adjusted. A brake
            adjustment is different from replacing a complete brake system.
          </p>
          <p>
            Use the Bei Baiskeli catalogue as a reference, then ask the fundi what portion of the
            quote is labour and what portion is the part.
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
