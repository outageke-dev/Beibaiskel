import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { getPricebook, getRepair, range, estimateRange } from "@/lib/api";
import CommunityReport from '@/components/CommunityReport';
import { pageMetadata, siteConfig } from "@/lib/seo";

export async function generateStaticParams() {
  try {
    return (await getPricebook()).repairs.map((r) => ({ id: r.id }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const r = await getRepair(id);
    return pageMetadata({
      title: `${r.name} Cost in Kenya`,
      description: `${r.name} bicycle repair price in Kenya — fair estimate of ${range(estimateRange(r.estimate))}. Labour, parts, and repair notes.`,
      path: `/repairs/${id}`,
    });
  } catch {
    return { title: "Bicycle repair price" };
  }
}

export default async function RepairPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let r;
  try {
    r = await getRepair(id);
  } catch {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${r.name} — bicycle repair`,
    description: r.tip || `${r.name} repair price estimate in Kenya`,
    areaServed: { "@type": "Country", name: "Kenya" },
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          offers: r.estimate?.total
      ? {
          "@type": "AggregateOffer",
          priceCurrency: "KES",
          lowPrice: r.estimate.total[0],
          highPrice: r.estimate.total[1],
        }
      : undefined,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/prices">Prices</Link> / {r.category} / {r.name}
          </div>
          <div className="eyebrow">{r.category}</div>
          <h1>{r.name} cost in Kenya</h1>
          <p>Current fair-price estimate for this repair.</p>
        </div>
      </section>
      <section className="container detail">
        <article className="prose">
          <h2>What should it cost?</h2>
          <p>
            The estimated total is <strong>{range(estimateRange(r.estimate))}</strong>. This is a
            reference range — actual shop prices vary by parts, condition, and location.
          </p>
          {r.tip && (
            <>
              <h3>Repair note</h3>
              <p>{r.tip}</p>
            </>
          )}
          {r.diy_advice && (
            <>
              <h3>DIY note</h3>
              <p>{r.diy_advice}</p>
            </>
          )}
          {r.part_note && (
            <>
              <h3>Parts</h3>
              <p>{r.part_note}</p>
            </>
          )}
          {r.aliases?.length && (
            <>
              <h3>Also called</h3>
              <p>{r.aliases.join(", ")}</p>
            </>
          )}
          <Link className="button" href="/calculator">
            Check a fundi quote →
          </Link>
        </article>
        <aside className="price-box">
          <div className="eyebrow">Current estimate</div>
          <div className="price-big">{range(estimateRange(r.estimate))}</div>
          <div className="price-sub">estimated total · KSh</div>
          <div style={{ marginTop: 20 }}>
            <div className="stat">
              <span>Labour</span>
              <span>{range(r.estimate?.labour)}</span>
            </div>
            <div className="stat">
              <span>Parts</span>
              <span>{range(r.estimate?.part)}</span>
            </div>
            <div className="stat">
              <span>Time</span>
              <span>{r.minutes ? `${r.minutes[0]}–${r.minutes[1]} min` : "—"}</span>
            </div>
            <div className="stat">
              <span>Complexity</span>
              <span>{r.complexity ?? "—"}</span>
            </div>
          </div>
        </aside>
        <aside style={{ flex: 1, minWidth: 280 }}>
          <CommunityReport repairId={r.id} initial={r} />
        </aside>
      </section>
    </>
  );
}
