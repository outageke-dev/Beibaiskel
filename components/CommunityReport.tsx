"use client";
import { useState } from "react";

export default function CommunityReport({ repairId, initial }: { repairId: string; initial?: any }){
  const [amount, setAmount] = useState("");
  const [labourAmount, setLabourAmount] = useState("");
  const [partsAmount, setPartsAmount] = useState("");
  const [vote, setVote] = useState<"cheap"|"fair"|"expensive">("fair");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(initial || null);

  async function submit(e: React.FormEvent){
    e.preventDefault();
    setStatus(null);
    if(!amount) { setStatus("Enter a quoted amount"); return }
    setLoading(true);
    try{
      const labourNum = labourAmount ? Number(labourAmount) : undefined;
      const partsNum = partsAmount ? Number(partsAmount) : undefined;
      if(labourNum != null && partsNum != null){
        const sum = labourNum + partsNum;
        if(amount){
          if(Number(amount) !== sum){ setStatus('Quoted total must equal labour + parts, or leave total blank.'); setLoading(false); return }
        } else {
          setAmount(String(sum));
        }
      }

      const body: any = { repair_id: repairId, amount: amount ? Number(amount) : undefined, vote };
      if(labourAmount) body.labour = Number(labourAmount);
      if(partsAmount) body.parts = Number(partsAmount);
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
        if(!res.ok){
            let msg: any = 'Submission failed';
            if(typeof data === 'string') msg = data;
            else if(data?.error?.detail){
              const d = data.error.detail;
              if(Array.isArray(d)) msg = d.map((it:any)=> it.msg ? `${it.msg}${it.loc? ` (${it.loc.join('.')})`:''}` : JSON.stringify(it)).join('; ');
              else msg = (typeof d === 'string' ? d : JSON.stringify(d));
            }
            else if(data?.error) msg = (typeof data.error === 'string' ? data.error : JSON.stringify(data.error));
            else if(data?.detail) msg = (typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail));
            else msg = JSON.stringify(data);
            setStatus(String(msg || 'Submission failed'));
            setLoading(false);
            return
          }
      setStatus('Thanks — your quote has been submitted');
      // refresh summary
      const r = await fetch(`/api/repairs/${encodeURIComponent(repairId)}`);
      if(r.ok){ const parsed = await r.json(); setSummary(parsed); }
    }catch(err:any){ setStatus(String(err)) }
    setLoading(false);
    setAmount("");
    setLabourAmount("");
    setPartsAmount("");
  }

  return (
    <div className="card community-report">
      <h3>Community reports</h3>
      <p>Share the quote you paid and vote how it felt — this helps improve estimates.</p>
      <div className="community-summary" style={{marginBottom:12,color:'var(--muted)'}}>
        <div>Reports: {summary?.community?.reports ?? '—'}</div>
        <div>Robust: {summary?.community?.is_robust ? 'Yes' : 'No'}</div>
      </div>
      <form onSubmit={submit} className="reports-form">
        <div className="field">
          <label>Quoted price (KSh)</label>
          <input inputMode="numeric" value={amount} onChange={e=>setAmount(e.target.value.replace(/\D/g,''))} placeholder="e.g. 1200" />
        </div>
        <div className="field">
          <label>Labour cost (KSh) — optional</label>
          <input inputMode="numeric" value={labourAmount} onChange={e=>setLabourAmount(e.target.value.replace(/\D/g,''))} placeholder="e.g. 300" />
        </div>
        <div className="field">
          <label>Parts cost (KSh) — optional</label>
          <input inputMode="numeric" value={partsAmount} onChange={e=>setPartsAmount(e.target.value.replace(/\D/g,''))} placeholder="e.g. 150" />
        </div>
        <div className="field">
          <label>How was the price?</label>
          <div style={{display:'flex',gap:16,alignItems:'center'}}>
            <label style={{display:'inline-flex',alignItems:'center',gap:8}}><input type="radio" name="v" checked={vote==='cheap'} onChange={()=>setVote('cheap')} /> Cheap</label>
            <label style={{display:'inline-flex',alignItems:'center',gap:8}}><input type="radio" name="v" checked={vote==='fair'} onChange={()=>setVote('fair')} /> Fair</label>
            <label style={{display:'inline-flex',alignItems:'center',gap:8}}><input type="radio" name="v" checked={vote==='expensive'} onChange={()=>setVote('expensive')} /> Expensive</label>
          </div>
        </div>
        <div className="field">
          <button className="button" type="submit" disabled={loading}>{loading? 'Sending...' : 'Submit report'}</button>
        </div>
      </form>
      {status && <div className="notice">{status}</div>}
    </div>
  )
}
