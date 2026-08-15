const API = process.env.BEI_BAISIKELI_API_URL || "https://beibaiskeli.onrender.com";
const KEY = process.env.BEI_BAISIKELI_API_KEY || "";

export type Range = [number, number];
export type Repair = {
  id:string; name:string; category:string; minutes?:Range;
  part_book?:Range|null; part_note?:string|null; tip?:string|null;
  aliases?:string[]; image_url?:string|null; diy_advice?:string|null;
  diy_video_url?:string|null; diy_article_url?:string|null;
  complexity?:number; estimate?:{labour?:Range;part?:Range;total?:Range};
  community?:{count?:number;blended?:boolean;labour_p25?:number|null;labour_p75?:number|null;part_p25?:number|null;part_p75?:number|null};
};
export type Pricebook = {version:string;generated_at:string;currency:string;categories:string[];repairs:Repair[]};

async function get<T>(path:string, init?:RequestInit):Promise<T>{
  const r=await fetch(`${API}${path}`, {
    ...init, cache:"no-store",
    headers:{"Accept":"application/json","X-API-Key":KEY,...(init?.headers||{})}
  });
  if(!r.ok) throw new Error(`API ${r.status}`);
  return r.json();
}
export const getPricebook=()=>get<Pricebook>("/api/v1/pricebook");
export const getRepair=async(id:string):Promise<Repair>=>{
  const data=await get<any>(`/api/v1/repairs/${encodeURIComponent(id)}`);
  // normalize external API shape to our Repair type
  // external single-repair endpoints return fields like:
  // { repair: name, labour: {min,max}, parts: {min,max}, estimate: {min,max}, community: {reports,is_robust} }
  const r: any = {};
  r.id = id;
  r.name = data.repair || data.name || id;
  // category may not be present
  if (data.category) r.category = data.category;
  // normalize estimate fields
  const labour = data.labour ? (data.labour.min!=null && data.labour.max!=null ? [data.labour.min,data.labour.max] : undefined) : undefined;
  const part = data.parts || data.part ? ((data.parts?.min!=null || data.part?.min!=null) ? [ (data.parts?.min ?? data.part?.min), (data.parts?.max ?? data.part?.max) ] : undefined) : undefined;
  const total = data.estimate ? (data.estimate.min!=null && data.estimate.max!=null ? [data.estimate.min,data.estimate.max] : undefined) : undefined;
  r.estimate = { labour: labour || undefined, part: part || undefined, total: total || undefined };
  // community normalization
  if(data.community){
    r.community = {
      count: data.community.reports ?? data.community.count,
      blended: data.community.is_robust ?? data.community.blended,
      labour_p25: data.community.labour_p25 ?? null,
      labour_p75: data.community.labour_p75 ?? null,
      part_p25: data.community.part_p25 ?? null,
      part_p75: data.community.part_p75 ?? null,
    };
  }
  return r as Repair;
}
export const money=(n?:number)=>n==null?"—":`KSh ${Math.round(n).toLocaleString("en-KE")}`;
export const range=(r?:Range)=>r?`${money(r[0])} – ${money(r[1])}`:"Price varies";

export const sumRanges=(a?:Range|null,b?:Range|null):Range|undefined=>{
  if(a && b) return [a[0]+b[0], a[1]+b[1]];
  if(a) return a;
  if(b) return b;
  return undefined;
}

export const estimateRange=(e?:{labour?:Range| null; part?:Range| null; total?:Range| null}):Range|undefined=>{
  if(!e) return undefined;
  if(e.total) return e.total;
  return sumRanges(e.labour ?? undefined, e.part ?? undefined);
}
