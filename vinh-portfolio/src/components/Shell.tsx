import { useEffect, useState, type ReactNode } from 'react';
import { ArrowUpRight, Copy, Check, Menu } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from './ui/sheet';
import { MotionRoot, useMotion } from './motion';
import { PageReadiness } from './readiness';
import { CTA } from './CTA';
const links = [['Work','/#work'],['Domains','/#domains'],['Thinking','/#thinking'],['About','/about'],['Contact','/#contact']];
function Header() {
 const [active,setActive]=useState('');
 useEffect(()=>{
  if(location.pathname==='/about')setActive('About'); else if(location.pathname.startsWith('/work/'))setActive('Work');
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id.charAt(0).toUpperCase()+e.target.id.slice(1));}),{rootMargin:'-15% 0px -60% 0px',threshold:0});
  ['work','domains','thinking','contact'].forEach(id=>{const e=document.getElementById(id);if(e)observer.observe(e);});
  return()=>observer.disconnect();
 },[]);
 return <header className="site-header"><a href="/" className="wordmark" aria-label="Vinh Nguyen home">vinh<span className="brand-dot">.</span><span className="brand-name">nguyen</span></a><nav aria-label="Main navigation">{links.map(([name,href])=><a key={name} href={href} aria-current={active===name?'location':undefined}>{name}</a>)}</nav><CTA href="/about#experience" className="experience-link">About my work <ArrowUpRight size={15}/></CTA><Sheet><SheetTrigger asChild><button className="mobile-menu" aria-label="Open navigation"><Menu size={24}/></button></SheetTrigger><SheetContent className="mobile-sheet" data-lenis-prevent><SheetTitle>Explore the portfolio</SheetTitle><nav aria-label="Mobile navigation">{links.map(([name,href])=><SheetClose key={name} asChild><a href={href}>{name}<ArrowUpRight size={22}/></a></SheetClose>)}</nav></SheetContent></Sheet></header>;
}
function Footer(){const {mode,setMode}=useMotion();return <footer className="site-footer"><a href="/">Vinh Nguyen <span>— Product thinking, business analysis, and UX.</span></a><div className="footer-tools"><Select value={mode} onValueChange={v=>setMode(v as 'System'|'Reduced'|'Full')}><SelectTrigger aria-label="Motion preference" className="motion-select"><span>Motion: </span><SelectValue>{mode}</SelectValue></SelectTrigger><SelectContent className="motion-options">{['System','Reduced','Full'].map(v=><SelectItem value={v} key={v}>{v}</SelectItem>)}</SelectContent></Select><a href="#top">Back to top ↑</a></div></footer>;}
export function Shell({children}:{children:ReactNode}) {return <MotionRoot><a href="#main" className="skip">Skip to content</a><Header/>{children}<Footer/><PageReadiness/></MotionRoot>;}
export function Contact(){
 const [status,setStatus]=useState('');
 async function copy(){try{await navigator.clipboard.writeText('jvinh209@gmail.com');setStatus('Email copied.');}catch{setStatus('Please copy jvinh209@gmail.com.');}}
 return <section id="contact" className="contact section"><div className="section-label"><span>CONTINUE THE CONVERSATION</span><span>VIETNAM · UTC+7</span></div><div className="contact-grid"><div><h2><span>There is always</span><span>another <em>good question.</em></span></h2><CTA href="mailto:jvinh209@gmail.com" className="email-link" aria-label="Email Vinh at jvinh209@gmail.com">jvinh209@gmail.com <ArrowUpRight/></CTA></div><div className="contact-note"><p>Have a perspective on product, design, or one of these projects? I’d enjoy exchanging ideas.</p><div className="contact-actions"><CTA href="https://www.linkedin.com/in/jvinh209" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn (opens in a new tab)">Connect on LinkedIn <ArrowUpRight size={16}/></CTA><CTA as="button" onClick={copy}>{status==='Email copied.'?<Check size={15}/>:<Copy size={15}/>} Copy email</CTA></div><p className="copy-status" role="status">{status}</p></div></div></section>;
}
