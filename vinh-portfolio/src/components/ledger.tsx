'use client';
import {useState} from 'react';
const snapshots=[
 {label:'Start',applied:0,outstanding:1000000,review:'Empty',event:'Establish the opening debt of VND 1,000,000.'},
 {label:'Confirm payment',applied:400000,outstanding:600000,review:'Empty',event:'Payment P-01 is confirmed for VND 400,000 and applied once.'},
 {label:'Receive duplicate',applied:400000,outstanding:600000,review:'Empty',event:'P-01 arrives again. Recognize the repeated notification; do not apply it again.'},
 {label:'Send unmatched payment to review',applied:400000,outstanding:600000,review:'Unmatched payment U-01: VND 200,000',event:'U-01 cannot be matched. Keep it in review; the balance stays the same.'},
 {label:'Reverse applied payment',applied:0,outstanding:1000000,review:'Unmatched payment U-01: VND 200,000',event:'Preserve P-01 and add linked reversal R-01. Restore VND 400,000. U-01 remains in review.'},
];
export function Ledger(){const [step,setStep]=useState(0);const s=snapshots[step];const fmt=(n:number)=>'VND '+n.toLocaleString('en-US');return <div className="ledger"><p className="eyebrow">Illustrative rule example</p><p className="ledger-caption">Five events. One explainable balance.</p><div className="ledger-steps" aria-label="Choose an illustrative event">{snapshots.map((v,i)=><button key={v.label} onClick={()=>setStep(i)} aria-pressed={step===i}><span>0{i+1}</span>{v.label}</button>)}</div><div className="ledger-result" role="status" aria-live="polite" aria-atomic="true"><span className="eyebrow">STEP {step+1} / {s.label.toUpperCase()}</span><dl><div className="outstanding"><dt>Outstanding balance</dt><dd>{fmt(s.outstanding)}</dd></div><div><dt>Opening debt</dt><dd>{fmt(1000000)}</dd></div><div><dt>Net applied amount</dt><dd>{fmt(s.applied)}</dd></div><div className="review-queue"><dt>Review queue</dt><dd>{s.review}</dd></div></dl><p className="event-explanation">{s.event}</p></div></div>;}

