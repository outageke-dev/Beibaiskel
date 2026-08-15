"use client";
import React, { useMemo, useState } from "react";
import RepairCard from "@/components/RepairCard";

export default function PricesListClient({ repairs }: { repairs: any[] }){
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");

  const categories = useMemo(()=>{
    const s = new Set<string>();
    repairs.forEach(r=>{ if(r.category) s.add(r.category); });
    return Array.from(s).sort();
  },[repairs]);

  const filtered = useMemo(()=>{
    const t = q.trim().toLowerCase();
    return repairs.filter(r=>{
      if(category && r.category!==category) return false;
      if(!t) return true;
      return r.name.toLowerCase().includes(t) || (r.aliases||[]).join(' ').toLowerCase().includes(t) || (r.category||"").toLowerCase().includes(t);
    });
  },[repairs,q,category]);

  return (
    <div>
      <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:18}}>
        <div style={{flex:1}}>
          <label style={{display:'block',marginBottom:6,fontWeight:600}}>Search repairs</label>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="e.g. brake, puncture, chain" style={{width:'100%',padding:'12px 14px',borderRadius:6,border:'1px solid var(--line)',background:'var(--surface)',color:'var(--text)'}} />
        </div>
        <div style={{width:200}}>
          <label style={{display:'block',marginBottom:6,fontWeight:600}}>Category</label>
          <select value={category} onChange={e=>setCategory(e.target.value)} style={{width:'100%',padding:'12px 14px',borderRadius:6,border:'1px solid var(--line)',background:'var(--surface)',color:'var(--text)'}}>
            <option value="">All</option>
            {categories.map(c=>(<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
      </div>

      <div className="repair-grid">
        {filtered.map(r=>(<RepairCard key={r.id||r.name} r={r} />))}
      </div>
    </div>
  );
}
