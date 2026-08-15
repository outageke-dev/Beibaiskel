const fs = require('fs');
const path = require('path');
const https = require('https');

const API = process.env.BEI_BAISIKELI_API_URL || 'https://beibaiskeli.onrender.com';
const KEY = process.env.BEI_BAISIKELI_API_KEY || '';
const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://beibaiskeli.vercel.app';

function fetchPricebook() {
  return new Promise((resolve, reject) => {
    const url = new URL('/api/v1/pricebook', API);
    const opts = { headers: { 'Accept': 'application/json' } };
    if (KEY) opts.headers['X-API-Key'] = KEY;
    https.get(url, opts, (res) => {
      let data = '';
      res.on('data', (d) => (data += d));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function makeUrl(loc) {
  return `  <url>\n    <loc>${loc}</loc>\n  </url>`;
}

async function run() {
  const staticPaths = [
    '',
    '/prices',
    '/calculator',
    '/about',
    '/privacy',
    '/cookies',
    '/guides',
    '/guides/bike-repair-cost-kenya',
    '/guides/bicycle-repair-nairobi',
    '/guides/bike-brake-repair-cost',
    '/guides/bike-chain-replacement-cost',
  ];

  let repairs = [];
  try {
    const pb = await fetchPricebook();
    repairs = pb.repairs || [];
  } catch (e) {
    console.warn('Could not fetch pricebook, continuing with static routes only', e.message || e);
  }

  const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
  for (const p of staticPaths) lines.push(makeUrl(BASE + p));
  for (const r of repairs) lines.push(makeUrl(`${BASE}/repairs/${r.id}`));
  lines.push('</urlset>');

  const out = lines.join('\n') + '\n';
  const outPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, out, 'utf8');
  console.log('Wrote', outPath);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
