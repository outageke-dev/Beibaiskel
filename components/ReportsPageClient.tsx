"use client";
import React, { useEffect, useState } from "react";

export default function ReportsPageClient({ repairs }: { repairs: { id: string | null; name: string }[] }){
  const [repairId, setRepairId] = useState<string | "other" | "" >(repairs[0]?.id || "");
  const [otherName, setOtherName] = useState("");
  const [confirmNew, setConfirmNew] = useState(false);
  const [amount, setAmount] = useState("");
  const [labourAmount, setLabourAmount] = useState("");
  const [partsAmount, setPartsAmount] = useState("");
  const [q, setQ] = useState("");
  const [vote, setVote] = useState<"cheap"|"fair"|"expensive">("fair");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [summaries, setSummaries] = useState<Record<string, any>>({});
  const [sessionReports, setSessionReports] = useState<any[]>(() => {
    try { return JSON.parse(localStorage.getItem('bb:reports')||'[]') } catch { return [] }
  });

  useEffect(()=>{ fetchSummaries(); },[]);

  async function fetchSummaries(){
    const items = repairs.filter(r=>r.id).slice(0,40);
    const entries: Record<string, any> = {};
    await Promise.all(items.map(async (r)=>{
      try{
        const res = await fetch(`/api/repairs/${encodeURIComponent(r.id!)}`);
        if(!res.ok) return;
        const data = await res.json();
        entries[r.id as string] = data.repair || data || {};
      }catch(err){/* ignore */}
    }));
    setSummaries(entries);
  }

  function saveSessionReport(rep:any){
    const next = [rep, ...sessionReports].slice(0,200);
    setSessionReports(next);
    try{ localStorage.setItem('bb:reports', JSON.stringify(next)); }catch(e){}
  }

  function getDeviceId(){
    try{
      let id = localStorage.getItem('bb:device');
      if(!id){ id = 'd_'+Math.random().toString(36).slice(2,10); localStorage.setItem('bb:device', id); }
      return id;
    }catch(e){ return 'd_unknown' }
  }

  function similarNames(name:string){
    const n = name.trim().toLowerCase();
    if(!n) return [];
    return repairs.filter(r=>r.name.toLowerCase().includes(n) || n.includes(r.name.toLowerCase())).slice(0,5);
  }

  async function submit(e: React.FormEvent){
    e.preventDefault();
    setStatus(null);
    if(!amount){ setStatus('Enter an amount'); return }
    if(repairId==='other' && !confirmNew){ setStatus('Please confirm adding a new repair or choose an existing one'); return }
    setLoading(true);
    try{
      // validate labour/parts vs total: if labour+parts provided but total different, ask user to correct
      const labourNum = labourAmount ? Number(labourAmount) : undefined;
      const partsNum = partsAmount ? Number(partsAmount) : undefined;
      if(labourNum != null && partsNum != null){
        const sum = labourNum + partsNum;
        if(amount){
          if(Number(amount) !== sum){ setStatus('Quoted total must equal labour + parts, or leave total blank.'); setLoading(false); return }
        } else {
          // autofill total when missing
          setAmount(String(sum));
        }
      }

      const payload: any = { amount: amount ? Number(amount) : undefined, vote, device_id: getDeviceId() };
      if(repairId === 'other') payload.repair_name = otherName;
      else if(repairId) payload.repair_id = repairId;
      if(labourAmount) payload.labour = Number(labourAmount);
      if(partsAmount) payload.parts = Number(partsAmount);
      const res = await fetch('/api/reports', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
      const data = await res.json();
      if(!res.ok){
        let msg: any = 'Submission failed';
        if(typeof data === 'string') msg = data;
        else if(data?.error?.detail) {
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
      setStatus('Thanks — your report was submitted');
      const saved = { id: data.id || String(Date.now()), repair_id: payload.repair_id, repair_name: payload.repair_name, amount: payload.amount, labour: payload.labour, parts: payload.parts, vote };
      saveSessionReport(saved);
      setAmount(''); setLabourAmount(''); setPartsAmount(''); setOtherName(''); setRepairId(repairs[0]?.id || ''); setConfirmNew(false);
      await fetchSummaries();
    }catch(err:any){ setStatus(String(err)) }
    setLoading(false);
  }

  async function voteRepair(repairId:string, v:"cheap"|"fair"|"expensive"){
    try{
      const res = await fetch('/api/reports', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ repair_id: repairId, vote: v, device_id: getDeviceId() }) });
      if(res.ok){
        saveSessionReport({ id: String(Date.now()), repair_id: repairId, amount: 0, vote: v });
        await fetchSummaries();
      }
    }catch(err){/* ignore */}
  }

  return (
    <div className="reports-page">
      <section className="container reports-grid">
        <div className="card reports-form">
          <div className="section-head">
            <div className="eyebrow">Community data</div>
            <h2>Report a quote</h2>
            <p className="muted">Share the price you were quoted and vote whether it was cheap, fair, or expensive.</p>
          </div>

          <form onSubmit={submit} className="calculator">
            <label>Repair</label>
            <select value={repairId ?? ""} onChange={e=>setRepairId(e.target.value as any)}>
              {repairs.map(r=>(<option key={r.id||r.name} value={r.id||"other"}>{r.name}</option>))}
              <option value="other">Other (specify)</option>
            </select>

            {repairId==='other' && (
              <>
                <label>Repair name</label>
                <input value={otherName} onChange={e=>setOtherName(e.target.value)} placeholder="e.g. Replace hub bearings" />
                {otherName.trim() && (
                  <div className="muted" style={{ marginTop: 8 }}>
                    Suggestions: {similarNames(otherName).slice(0,5).map(s=>s.name).join(' · ') || 'none'}
                  </div>
                )}
                {otherName.trim() && similarNames(otherName).length>0 && (
                  <label style={{ display: 'block', marginTop: 8 }}><input type="checkbox" checked={confirmNew} onChange={e=>setConfirmNew(e.target.checked)} /> I still want to add this new repair</label>
                )}
              </>
            )}

            <label>Quoted price (KSh)</label>
            <input inputMode="numeric" value={amount} onChange={e=>setAmount(e.target.value.replace(/\D/g,''))} placeholder="e.g. 1200" />

            <label>Labour cost (KSh) — optional</label>
            <input inputMode="numeric" value={labourAmount} onChange={e=>setLabourAmount(e.target.value.replace(/\D/g,''))} placeholder="e.g. 300" />

            <label>Parts cost (KSh) — optional</label>
            <input inputMode="numeric" value={partsAmount} onChange={e=>setPartsAmount(e.target.value.replace(/\D/g,''))} placeholder="e.g. 150" />

            <div style={{ marginTop: 6 }}>
              <label style={{ display: 'block', marginBottom: 6 }}>How was the price?</label>
              <div style={{ display:'flex', gap:12, alignItems:'center' }}>
                <label className="vote"><input type="radio" name="v" checked={vote==='cheap'} onChange={()=>setVote('cheap')} /> Cheap</label>
                <label className="vote"><input type="radio" name="v" checked={vote==='fair'} onChange={()=>setVote('fair')} /> Fair</label>
                <label className="vote"><input type="radio" name="v" checked={vote==='expensive'} onChange={()=>setVote('expensive')} /> Expensive</label>
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <button className="button" disabled={loading}>{loading? 'Sending...':'Submit report'}</button>
            </div>
          </form>
          {status && <div className="notice" style={{ marginTop: 12 }}>{status}</div>}
        </div>

        <div className="card reports-list">
          <div className="section-head">
            <div className="eyebrow">Community</div>
            <h2>Recent community reports</h2>
            <p className="muted">Reports submitted by riders. Vote on entries to help the community surface fair prices.</p>
          </div>

          <div className="field">
            <label>Search repairs</label>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search repairs by name" />
          </div>

          <div>
            <ul className="repair-summary-list">
              {repairs.slice(0,40).filter(r=> r.name.toLowerCase().includes(q.trim().toLowerCase())).map(r=>{
                const s = r.id ? summaries[r.id] : null;
                const reportsCount = s?.community?.reports ?? s?.community?.count ?? 0;
                const isRobust = s?.community?.is_robust ?? s?.community?.blended ?? false;
                const local = sessionReports.filter(x=>x.repair_id===r.id || x.repair_name===r.name);
                const votes = { cheap: 0, fair: 0, expensive: 0 } as Record<string, number>;
                local.forEach((x:any)=>{ votes[x.vote] = (votes[x.vote]||0)+1 });
                const totalLocal = votes.cheap + votes.fair + votes.expensive;
                return (
                  <li key={r.id||r.name} className="repair-summary">
                    <div className="repair-summary-head">
                      <div><b>{r.name}</b></div>
                      <div className="muted">Reports: {reportsCount} · {isRobust? 'Robust':'Sparse'}</div>
                    </div>
                    <div className="repair-summary-body">
                      <div className="vote-bar">
                        <div className="vote-segment cheap" style={{ width: `${totalLocal? (votes.cheap/totalLocal*100) : 0}%` }} />
                        <div className="vote-segment fair" style={{ width: `${totalLocal? (votes.fair/totalLocal*100) : 0}%` }} />
                        <div className="vote-segment expensive" style={{ width: `${totalLocal? (votes.expensive/totalLocal*100) : 0}%` }} />
                      </div>
                      <div className="repair-actions">
                        <button className="button small" onClick={()=>voteRepair(r.id!, 'cheap')}>Cheap</button>
                        <button className="button small alt" onClick={()=>voteRepair(r.id!, 'fair')}>Fair</button>
                        <button className="button small" onClick={()=>voteRepair(r.id!, 'expensive')}>Expensive</button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div style={{ marginTop: 20 }}>
              <div className="section-head"><h3>Your recent submissions (this device)</h3></div>
              {sessionReports.length? (
                <ul className="session-reports">
                  {sessionReports.map(r=>(
                    <li key={r.id} className="session-report">
                      {r.repair_name||r.repair_id||'—'} · KSh {r.amount || '—'}{r.labour? ` · labour KSh ${r.labour}`: ''}{r.parts? ` · parts KSh ${r.parts}`: ''} · {r.vote}
                    </li>
                  ))}
                </ul>
              ) : (<div className="notice">You haven't submitted any reports from this device yet.</div>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
