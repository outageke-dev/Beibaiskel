import RepairCard from "@/components/RepairCard";
import PricesListClient from "@/components/PricesListClient";
import { getPricebook } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Bicycle Repair Prices in Kenya",
  description:
    "Browse fair bicycle repair price estimates in Kenya. Labour, parts, and total ranges in KSh for common bike repairs.",
  path: "/prices",
});
export default async function Prices() {
  try {
    const b = await getPricebook();
    return (
      <>
        <section className="page-hero">
          <div className="container">
            <div className="eyebrow">Pricebook</div>
            <h1>Bicycle repair prices in Kenya</h1>
            <p>Browse the live Bei Baiskeli catalogue. Open any repair for its estimate, labour, parts and repair notes.</p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="notice" style={{ marginBottom: 22 }}>Live catalogue · {b.repairs.length} repairs · {b.currency}</div>
            <PricesListClient repairs={b.repairs} />
          </div>
        </section>
      </>
    );
  } catch {
    return (
      <div className="container section">
        <div className="notice">The live pricebook is temporarily unavailable. Please try again shortly.</div>
      </div>
    );
  }
}
