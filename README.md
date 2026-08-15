# Bei Baiskeli Website

SEO-first Next.js frontend for Bei Baiskeli.

## Vercel environment variables

BEI_BAISIKELI_API_URL=https://beibaiskeli.onrender.com
BEI_BAISIKELI_API_KEY=YOUR_PRODUCTION_KEY
NEXT_PUBLIC_SITE_URL=https://beibaiskeli.vercel.app

The API key is server-only. Do not prefix it with NEXT_PUBLIC_.

## Deploy

Import this project into Vercel, add the environment variables, and deploy.

Browser -> Vercel/Next.js -> Render FastAPI -> database

The website server calls the protected API, so the Render master key is not exposed to visitors.

## SEO

Indexable `/repairs/[id]` pages are generated from the live pricebook, with per-repair metadata, sitemap.xml, robots.txt and supporting Kenya-focused guides.
