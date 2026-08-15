import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import RepairCard from "@/components/RepairCard";
import { getPricebook, range, estimateRange } from "@/lib/api";

export default async function Home() {
  let repairs: any[] = [];
  try {
    repairs = (await getPricebook()).repairs;
  } catch {}
  const sample = repairs[0];

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">Kenya · Bicycle repair</div>
            <h1>What should your bike repair cost?</h1>
            <p>
              Bei Baiskeli shows fair price ranges for common bicycle repairs in Kenya — so you
              can compare a fundi&apos;s quote before paying.
            </p>
            <div className="actions">
              <Link className="button" href="/prices">
                Browse prices
              </Link>
              <Link className="button alt" href="/calculator">
                Check a quote
              </Link>
              <Link className="button" href="/reports">
                Report a quote
              </Link>
            </div>
            <div className="live">
              <i /> Live pricebook · KSh
            </div>
          </div>
          {sample && (
            <div className="hero-card">
              <div className="eyebrow">Example estimate</div>
              <div className="sample">
                <small>{sample.category}</small>
                <h2>{sample.name}</h2>
                <strong>{range(estimateRange(sample.estimate))}</strong>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Pricebook</div>
            <h2>Common repairs</h2>
            <p>Tap a repair to see labour, parts, and notes for that job.</p>
          </div>
          {repairs.length ? (
            <div className="repair-grid">
              {repairs.slice(0, 6).map((r) => (
                <RepairCard key={r.id} r={r} />
              ))}
            </div>
          ) : (
            <div className="notice">The live pricebook is temporarily unavailable.</div>
          )}
          <div style={{ marginTop: 24 }}>
            <Link className="button alt" href="/prices">
              All repairs →
            </Link>
          </div>
        </div>
      </section>

      <div className="container">
        <AdSlot slot="home-mid" className="ad-slot" />
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="feature-strip">
            <div className="feature">
              <b>See a fair range first</b>
              <p>Every repair shows an estimated total in Kenyan shillings.</p>
            </div>
            <div className="feature">
              <b>Compare your quote</b>
              <p>Enter what a fundi quoted and see if it fits the range.</p>
            </div>
            <div className="feature">
              <b>Built for local context</b>
              <p>Prices reflect how bicycle repair works in Kenya.</p>
            </div>
            <div className="feature">
              <b>Same data as the app</b>
              <p>The website and Bei Baiskeli app share one live pricebook.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
