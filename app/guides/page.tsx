import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Bicycle Repair Guides",
  description:
    "Practical guides on bicycle repair prices and maintenance in Kenya. Written for cyclists, not mechanics.",
  path: "/guides",
});
const guides=[["bike-repair-cost-kenya","How much does bicycle repair cost in Kenya?","Labour, parts and fair-price basics."],["bicycle-repair-nairobi","Bicycle repair in Nairobi: judging a quote","What to ask before paying a fundi."],["bike-brake-repair-cost","How much does bicycle brake repair cost?","Pads, cables, rotors and adjustments."],["bike-chain-replacement-cost","How much does bicycle chain replacement cost?","What changes the cost of a chain job."]];
export default function Guides(){return <><section className="page-hero"><div className="container"><div className="eyebrow">Guides</div><h1>Bike repair, without the guesswork.</h1><p>Simple answers to the questions cyclists ask before taking a bike for repair.</p></div></section><section className="section"><div className="container guides">{guides.map(g=><Link className="guide" href={`/guides/${g[0]}`} key={g[0]}><div className="eyebrow">Kenya · Bicycle repair</div><h2>{g[1]}</h2><p>{g[2]}</p><span className="card-link">Read guide →</span></Link>)}</div></section></>}
