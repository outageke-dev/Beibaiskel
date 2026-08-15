import type { MetadataRoute } from "next";
import { getPricebook } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://beibaiskeli.vercel.app";
  const routes = [
    "",
    "/prices",
    "/calculator",
    "/about",
    "/privacy",
    "/cookies",
    "/guides",
    "/guides/bike-repair-cost-kenya",
    "/guides/bicycle-repair-nairobi",
    "/guides/bike-brake-repair-cost",
    "/guides/bike-chain-replacement-cost",
  ];
  let repairs: any[] = [];
  try {
    repairs = (await getPricebook()).repairs;
  } catch {}
  return [
    ...routes.map((path) => ({
      url: base + path,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : path === "/about" ? 0.6 : 0.7,
    })),
    ...repairs.map((r) => ({
      url: `${base}/repairs/${r.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
