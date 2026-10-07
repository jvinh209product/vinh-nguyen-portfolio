import { useRef, type FocusEvent } from 'react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { CTA } from './CTA';
import data from '../content/home.json';

const summaries: Record<string, string> = {
  beerich: 'Connect financial information with a useful next decision.',
  mseller: 'Make the next action clear in the middle of a busy workflow.',
  'debt-ledger': 'Connect the current balance to the events that explain it.',
  moodify: 'Offer a calm first step while preserving personal choice.',
};

/** Four forms, one lightweight SVG system. No extra canvas or render loop. */
function DomainVisual({ slug }: { slug: string }) {
  return <svg className={`domain-object domain-object--${slug}`} viewBox="0 0 240 156" fill="none" aria-hidden="true">
    <ellipse className="domain-object__ground" cx="120" cy="131" rx="76" ry="9" fill="currentColor" opacity=".035"/>
    {slug === 'beerich' ? <>
      <g className="domain-object__rear"><path d="m46 85 94-29 53 28-94 30Z" fill="#e1e7df" stroke="currentColor" strokeOpacity=".28"/><path d="m46 85 0 12 53 29 94-30V84" stroke="currentColor" strokeOpacity=".28"/></g>
      <g className="domain-object__core"><path d="m46 62 94-29 53 28-94 30Z" fill="#f0e8d4" stroke="currentColor" strokeOpacity=".4"/><path d="m46 62 0 12 53 29 94-30V61" stroke="currentColor" strokeOpacity=".4"/><path d="m82 66 38-12 37 15-38 12Z" stroke="currentColor" strokeOpacity=".6"/></g>
      <g className="domain-object__accent" stroke="var(--warm)" strokeWidth="1.5"><path d="M170 52V24h-20m20 0-7 7m7-7 7 7"/><circle cx="73" cy="108" r="3" fill="var(--warm)"/></g>
    </> : slug === 'mseller' ? <>
      <g className="domain-object__rear" stroke="currentColor" strokeOpacity=".35"><path d="M59 51h57v53h59M116 51h60v53"/><circle cx="116" cy="77" r="4" fill="#f6f3ed"/></g>
      <g className="domain-object__core" stroke="currentColor" strokeOpacity=".55"><rect x="35" y="31" width="49" height="39" rx="5" fill="#e1e7df"/><rect x="149" y="30" width="49" height="40" rx="5" fill="#f0e8d4"/><rect x="149" y="85" width="49" height="39" rx="5" fill="#e1e7df"/><path d="M47 43h25m-25 8h16m94-8h23m-23 8h15m-13 46h21m-21 8h15"/></g>
      <g className="domain-object__accent" stroke="var(--warm)" strokeWidth="1.5"><path d="m106 47 5 4-5 4m25 45 5 4-5 4"/><circle cx="60" cy="91" r="12" fill="#f6f3ed"/><path d="m55 91 4 4 7-8"/></g>
    </> : slug === 'debt-ledger' ? <>
      <g className="domain-object__rear" stroke="currentColor" strokeOpacity=".28"><rect x="65" y="27" width="116" height="88" rx="5" fill="#e1e7df"/></g>
      <g className="domain-object__core" stroke="currentColor" strokeOpacity=".5"><rect x="52" y="38" width="116" height="88" rx="5" fill="#f6f3ed"/><path d="M66 54h57m-57 14h89m-89 15h89m-89 15h89m-89 14h54M130 62v53"/></g>
      <g className="domain-object__accent" stroke="var(--warm)" strokeWidth="1.5"><circle cx="179" cy="80" r="16" fill="#f0e8d4"/><path d="m172 80 5 5 10-11M35 71v29h17"/><circle cx="35" cy="67" r="3" fill="var(--warm)"/></g>
    </> : <>
      <g className="domain-object__rear" stroke="currentColor" strokeOpacity=".28"><ellipse cx="120" cy="76" rx="80" ry="36" transform="rotate(-21 120 76)"/><ellipse cx="120" cy="76" rx="80" ry="36" transform="rotate(21 120 76)"/></g>
      <g className="domain-object__core"><circle cx="120" cy="76" r="45" fill="#e1e7df" stroke="currentColor" strokeOpacity=".35"/><circle cx="120" cy="76" r="28" stroke="currentColor" strokeOpacity=".35"/><path d="M82 76h18l9-13 15 28 10-15h24" stroke="currentColor" strokeOpacity=".65"/></g>
      <g className="domain-object__accent" fill="var(--warm)"><circle cx="49" cy="102" r="4"/><circle cx="191" cy="50" r="3"/></g>
    </>}
  </svg>;
}

function DomainCard({ domain, index }: { domain: typeof data.domains[number]; index: number }) {
  const details = useRef<HTMLDetailsElement>(null);
  const preview = useRef(false), hovering = useRef(false);
  const [title, perspective] = domain.title.split(' — ');
  const closePreview = () => {
    if (preview.current && details.current && !hovering.current && !details.current.contains(document.activeElement)) {
      details.current.open = false; preview.current = false;
    }
  };
  const openPreview = () => {
    if (details.current && !details.current.open) { preview.current = true; details.current.open = true; }
  };
  const focus = (event: FocusEvent<HTMLDetailsElement>) => {
    if ((event.target as HTMLElement).matches(':focus-visible')) openPreview();
  };
  const layout = () => window.dispatchEvent(new Event('portfolio:layout'));
  return <details className="domain-panel domain-card" ref={details}
    onPointerEnter={event => {
      if (event.pointerType === 'mouse' && matchMedia('(hover: hover) and (pointer: fine)').matches) { hovering.current = true; openPreview(); }
    }}
    onPointerLeave={() => { hovering.current = false; closePreview(); }}
    onFocusCapture={focus} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) { hovering.current = false; if (preview.current) { event.currentTarget.open = false; preview.current = false; } } }}
    onToggle={layout} onTransitionEnd={event => { if (['height', 'block-size'].includes(event.propertyName)) layout(); }}>
    <summary className="domain-card__summary" aria-controls={`domain-detail-${domain.slug}`} onClick={event => {
      // A pointer click pins a hover preview. Keyboard activation still toggles
      // normally, and without JS the native control retains all content.
      if (preview.current) { preview.current = false; if (event.detail > 0) event.preventDefault(); }
    }}>
      <div className="domain-rule"/><span className="small-number">0{index + 1}</span>
      <DomainVisual slug={domain.slug}/>
      <h3>{title}<span className="domain-card__perspective">{perspective}</span></h3>
      <p className="domain-card__intro">{summaries[domain.slug]}</p>
      <span className="domain-card__toggle"><span>Read perspective</span><ChevronDown size={17}/></span>
    </summary>
    <div className="domain-card__detail" id={`domain-detail-${domain.slug}`}>
      <p>{domain.text}</p><blockquote>{domain.question}</blockquote>
      <CTA className="text-link" href={`/work/${domain.slug}`}>Explore {domain.name}<ArrowUpRight size={17}/></CTA>
    </div>
  </details>;
}

export function Domains() {
  return <section id="domains" className="domains section">
    <div className="section-label"><span>DOMAIN PERSPECTIVES</span><span>CONTEXT CHANGES THE QUESTION</span></div>
    <h2>Different domains.<br/>A shared interest in <em>clarity.</em></h2>
    <div className="domain-grid">{data.domains.map((domain, index) => <DomainCard key={domain.slug} domain={domain} index={index}/>)}</div>
  </section>;
}
