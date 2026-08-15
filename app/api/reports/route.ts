import { NextResponse } from 'next/server';

const API = process.env.BEI_BAISIKELI_API_URL || 'https://beibaiskeli.onrender.com';
const KEY = process.env.BEI_BAISIKELI_API_KEY || '';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // If this is a vote for an existing report
    if (body.report_id && body.vote) {
      // include device_id when voting if provided
      const votePayload: any = { vote: body.vote };
      if (body.device_id) votePayload.device_id = body.device_id;
      const r = await fetch(`${API}/api/v1/reports/${encodeURIComponent(body.report_id)}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': KEY,
        },
        body: JSON.stringify(votePayload),
      });
      const data = await r.json();
      if (!r.ok) return NextResponse.json({ error: data }, { status: r.status });
      return NextResponse.json(data);
    }

    // Otherwise create a new report (repair_id or repair_name)
    // Map client fields to upstream ReportIn schema: part_paid, labour_paid, total_paid
    const payload: any = {};
    if (body.device_id) payload.device_id = body.device_id;
    if (body.repair_id) payload.repair_id = body.repair_id;
    if (body.repair_name) payload.repair_name = body.repair_name;
    // Accept common client names and compute total if needed
    const partPaid = body.part_paid ?? body.parts ?? body.partsAmount ?? null;
    const labourPaid = body.labour_paid ?? body.labour ?? body.labourAmount ?? null;
    let totalPaid = body.total_paid ?? body.amount ?? null;
    if (totalPaid == null && labourPaid != null && partPaid != null) {
      totalPaid = Number(labourPaid) + Number(partPaid);
    }
    if (partPaid != null) payload.part_paid = Number(partPaid);
    if (labourPaid != null) payload.labour_paid = Number(labourPaid);
    if (totalPaid != null) payload.total_paid = Number(totalPaid);
    if (body.county) payload.county = body.county;
    if (body.shop_name) payload.shop_name = body.shop_name;
    if (body.happy != null) payload.happy = body.happy;

    const r = await fetch(`${API}/api/v1/reports`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': KEY,
      },
      body: JSON.stringify(payload),
    });
    const data = await r.json();
    if (!r.ok) return NextResponse.json({ error: data }, { status: r.status });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const u = new URL(req.url);
    const limit = u.searchParams.get('limit') || '100';
    const r = await fetch(`${API}/api/v1/reports?limit=${encodeURIComponent(limit)}`, {
      headers: { 'Accept': 'application/json', 'X-API-Key': KEY },
    });
    const data = await r.json();
    if (!r.ok) return NextResponse.json({ error: data }, { status: r.status });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
