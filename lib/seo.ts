const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://beibaiskeli.vercel.app";

export const siteConfig = {
  name: "Bei Baiskeli",
  tagline: "Fair bicycle repair prices in Kenya",
  description:
    "Check fair bicycle repair prices in Kenya. Compare fundi quotes, browse repair estimates in KSh, and know what your bike repair should cost.",
  url: SITE_URL,
  locale: "en_KE",
  twitter: "@beibaiskeli",
};

export function pageMetadata({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}) {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website" as const,
    },
    twitter: {
      card: "summary" as const,
      title: `${title} | ${siteConfig.name}`,
      description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    areaServed: { "@type": "Country", name: "Kenya" },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-KE",
  };
}
