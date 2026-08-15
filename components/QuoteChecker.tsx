"use client";
import {useMemo,useState} from "react";
import {Repair,range,estimateRange} from "@/lib/api";
export default function QuoteChecker({repairs}:{repairs:Repair[]}){
 const [id,setId]=useState(repairs[0]?.id||""); const [amount,setAmount]=useState("");
 const [message,setMessage]=useState("");
 const r=useMemo(()=>repairs.find(x=>x.id===id),[repairs,id]);
  function check(){
  if(!r||!amount)return;
  const n=Number(amount), t=estimateRange(r?.estimate as any);
  if(!t){setMessage("There is not enough price data for this repair yet.");return}
  setMessage(n<t[0]?"Below the current fair range.":n<=t[1]?"Inside the current fair range.":"Above the current fair range.");
 }
 return <div className="calculator">
  <label>Repair</label><select value={id} onChange={e=>{setId(e.target.value);setMessage("")}}>{repairs.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select>
  <label>Fundi quote (KSh)</label><input inputMode="numeric" value={amount} onChange={e=>setAmount(e.target.value.replace(/\D/g,""))} placeholder="e.g. 1200"/>
  <button className="button" onClick={check}>Check quote</button>
    {message&&<div className="result"><b>{message}</b><span>{range(estimateRange(r?.estimate))}</span></div>}
 </div>
}
