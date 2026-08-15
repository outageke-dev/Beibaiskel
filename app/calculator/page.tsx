import QuoteChecker from "@/components/QuoteChecker";
import { getPricebook } from "@/lib/api";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Bicycle Repair Quote Checker",
  description:
    "Check whether a fundi quote is within a fair bicycle repair price range in Kenya. Compare your quote in KSh.",
  path: "/calculator",
});
export default async function Calculator(){let repairs:any[]=[];try{repairs=(await getPricebook()).repairs}catch{}return <><section className="page-hero"><div className="container"><div className="eyebrow">Quote checker</div><h1>Is your bike repair quote fair?</h1><p>Choose the repair and compare the amount you were quoted with the current Bei Baiskeli estimate.</p></div></section><section className="section"><div className="container">{repairs.length?<QuoteChecker repairs={repairs}/>:<div className="notice">The pricebook is temporarily unavailable.</div>}</div></section></>}
