import Link from "next/link";
import { Repair, range, estimateRange } from "@/lib/api";

export default function RepairCard({ r }: { r: Repair }) {
  return (
    <Link href={`/repairs/${r.id}`} className="repair-card">
      <div className="eyebrow">{r.category}</div>
      <h3>{r.name}</h3>
      <div className="card-price">{range(estimateRange(r.estimate))}</div>
      <span className="card-link">View estimate →</span>
    </Link>
  );
}
