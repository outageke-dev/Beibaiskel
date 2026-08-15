import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Bicycle repair in Nairobi: how to judge a quote",
  description: "What to ask a Nairobi bicycle repair shop or fundi before paying.",
  path: "/guides/bicycle-repair-nairobi",
});

export default function Guide() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Guide · Nairobi</div>
          <h1>Bicycle repair in Nairobi: how to judge a quote</h1>
          <p>What to ask a fundi before paying.</p>
        </div>
      </section>
      <section className="content-page">
        <div className="container prose">
          <p>
            Ask for the repair name and the part being replaced so you can compare like-for-like.
          </p>
          <p>
            If a quote seems high, ask whether it includes both the part and labour. Parts can vary
            widely by brand and quality.
          </p>
          <p>
            A fair estimate is a reference point, not a guarantee. Your bicycle&apos;s condition and
            the exact part can change the final price.
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
