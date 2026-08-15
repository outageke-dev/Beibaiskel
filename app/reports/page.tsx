export const metadata = { title: "Community Repair Reports", description: "Community repair reporting activity from Bei Baiskeli." };

import { getPricebook } from '@/lib/api';
import ReportsPageClient from '@/components/ReportsPageClient';

export default async function Reports() {
	let repairs: any[] = [];
	try {
		repairs = (await getPricebook()).repairs.map((r: any) => ({ id: r.id, name: r.name }));
	} catch {}

	return (
		<>
			<section className="page-hero">
				<div className="container">
					<div className="eyebrow">Community data</div>
					<h1>Repair reports</h1>
					<p>Community reports help improve real-world repair estimates over time.</p>
				</div>
			</section>
			<section className="section">
				<div className="container">
					<ReportsPageClient repairs={repairs} />
				</div>
			</section>
		</>
	);
}
