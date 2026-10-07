import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/table';
function Inline({text}:{text:string}) { return <>{text.split(/(\*\*.*?\*\*)/g).map((t,i)=>t.startsWith('**')?<strong key={i}>{t.slice(2,-2)}</strong>:t)}</>; }
export function Prose({text}:{text:string}) { return <>{text.split(/\n\n+/).filter(Boolean).map((b,i)=>{
 if(b.startsWith('|')) { const rows=b.split('\n').filter(l=>l.startsWith('|')).map(l=>l.replace(/^\||\|$/g,'').split('|').map(v=>v.trim()));return <div className="table-region" data-lenis-prevent key={i} role="region" aria-label="Detailed explanation" tabIndex={0}><Table><TableHeader><TableRow>{rows[0].map((c,j)=><TableHead key={j}><Inline text={c}/></TableHead>)}</TableRow></TableHeader><TableBody>{rows.slice(2).map((row,k)=><TableRow key={k}>{row.map((c,j)=><TableCell key={j}><Inline text={c}/></TableCell>)}</TableRow>)}</TableBody></Table></div>; }
 if(/^\d+\. /.test(b))return <ol key={i}>{b.split('\n').map((l,j)=><li key={j}><Inline text={l.replace(/^\d+\. /,'')}/></li>)}</ol>;
 if(b.startsWith('- '))return <ul key={i}>{b.split('\n').map((l,j)=><li key={j}><Inline text={l.replace(/^- /,'')}/></li>)}</ul>;
 return <p key={i}><Inline text={b.replace(/\n/g,' ')}/></p>;
 })}</>; }
