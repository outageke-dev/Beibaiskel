import { NextResponse } from 'next/server';

const API = process.env.BEI_BAISIKELI_API_URL || 'https://beibaiskeli.onrender.com';
const KEY = process.env.BEI_BAISIKELI_API_KEY || '';

export async function GET(req: any, { params }: any) {
  const id = params?.id ?? (await params)?.id;
  try {
    const r = await fetch(`${API}/api/v1/repairs/${encodeURIComponent(id)}`, {
      headers: { 'Accept': 'application/json', 'X-API-Key': KEY },
    });
    const data = await r.json();
    if (!r.ok) return NextResponse.json({ error: data }, { status: r.status });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
