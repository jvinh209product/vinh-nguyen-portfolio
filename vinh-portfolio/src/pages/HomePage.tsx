import { useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { Shell, Contact } from '../components/Shell';
import { CTA } from '../components/CTA';
import { Prose } from '../components/Prose';
import { Marquee, useMotion, useGSAP } from '../components/motion';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { ProjectMedia } from '../components/work/ProjectMedia';
import { Hero } from '../components/Hero';
import { Domains } from '../components/Domains';
import { motion } from '../lib/motion';
import data from '../content/home.json';
const projects=data.projects;
const portrait='/images/vinh-portrait.webp';
function WorkShowcase(){
 const scope=useRef<HTMLDivElement>(null),stage=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState(0);const {reduced,ready}=useMotion();
 useGSAP(({gsap,ScrollTrigger})=>{if(!ready||reduced)return;const mm=gsap.matchMedia();mm.add('(min-width: 1000px) and (min-height: 650px)',()=>{
  gsap.utils.toArray<HTMLElement>('.work-item',scope.current).forEach((el,i)=>ScrollTrigger.create({trigger:el,start:'top 55%',end:'bottom 55%',onEnter:()=>setActive(i),onEnterBack:()=>setActive(i)}));
 });return()=>mm.revert();},{scope,dependencies:[ready,reduced],revertOnUpdate:true});
 useGSAP(({gsap,ScrollTrigger})=>{if(!reduced&&ready&&stage.current)gsap.fromTo(stage.current,{opacity:.5,y:10},{opacity:1,y:0,duration:motion.base,ease:motion.easeOut,clearProps:'all'});},{scope,dependencies:[active,reduced,ready],revertOnUpdate:true});
 return <div className="work-showcase" ref={scope}><div className="work-stage"><div ref={stage}><a className="cover-link" href={`/work/${projects[active].slug}`} aria-label={`Explore the ${projects[active].name} case`} tabIndex={-1}><ProjectMedia project={projects[active]}/></a><div className="stage-index" aria-hidden="true">{projects.map((p,i)=><span key={p.slug} className={i===active?'active':''}>{p.number} — {p.name}</span>)}</div></div></div><div className="work-stories">{projects.map((p,i)=><article key={p.slug} className={`work-item ${i===active?'active':''}`}><a className="inline-cover cover-link" href={`/work/${p.slug}`} aria-label={`Explore the ${p.name} case`}><ProjectMedia project={p}/></a><div className="project-summary"><p className="eyebrow">{p.number} / {p.focus.toUpperCase()}</p><h3><a href={`/work/${p.slug}`}>{p.name}<ArrowUpRight size={24}/></a></h3><p className="project-line">{p.line}</p><p className="project-description">{p.description}</p><CTA className="text-link case-link" href={`/work/${p.slug}`} aria-label={`Explore the ${p.name} case`}>Explore the case <ArrowUpRight size={19}/></CTA></div></article>)}</div></div>;
}
const sketchLabels=[['Moment','Task','Context'],['Information','Decision','Action'],['Event','Rule','State'],['Option A','Trade-off','Option B'],['Pending','Recover','Continue'],['Question','Observe','Learn']];
function Thinking(){
 const scope=useRef<HTMLDivElement>(null),sketch=useRef<HTMLDivElement>(null);const [active,setActive]=useState(0);const {reduced,ready}=useMotion();
 useGSAP(({gsap,ScrollTrigger})=>{if(!ready||reduced)return;const mm=gsap.matchMedia();mm.add('(min-width: 1000px) and (min-height: 650px)',()=>{gsap.utils.toArray<HTMLElement>('.thinking-step',scope.current).forEach((el,i)=>ScrollTrigger.create({trigger:el,start:'top 55%',end:'bottom 55%',onEnter:()=>setActive(i),onEnterBack:()=>setActive(i)}));});return()=>mm.revert();},{scope,dependencies:[ready,reduced],revertOnUpdate:true});
 useGSAP(({gsap,ScrollTrigger})=>{if(!reduced&&ready)gsap.from(sketch.current,{y:8,opacity:.5,duration:motion.fast,clearProps:'all'});},{scope,dependencies:[active,reduced,ready],revertOnUpdate:true});
 return <section id="thinking" className="thinking"><div className="section"><div className="section-label"><span>HOW I THINK</span><span>A PRACTICE, NOT A FIXED FORMULA</span></div><h2>The screen is one part<br/>of <em>the reasoning.</em></h2><p className="thinking-intro">I use a few recurring questions to move from an unclear request to an experience a team can discuss, build, and evaluate. The depth of each step depends on the problem. These are the questions I bring to the work.</p><div className="thinking-layout" ref={scope}><div className="thinking-support" aria-hidden="true"><div ref={sketch}><span className="thinking-count">0{active+1}<span>/ 06</span></span><div className="reasoning-sketch">{sketchLabels[active].map((s,i)=><div key={s}><span>{s}</span>{i<2&&<ArrowDown size={24}/>}</div>)}</div><p>{data.steps[active].question}</p></div></div><div className="thinking-steps">{data.steps.map((step,i)=><article className={`thinking-step ${active===i?'active':''}`} key={step.number}><span className="small-number">{step.number}</span><h3>{step.title}.</h3><p>{step.description}</p><p className="example-question">{step.question}</p></article>)}</div></div></div></section>;
}
export default function HomePage(){return <Shell><main id="main"><Hero/><Marquee/>
 <section id="work" className="work section"><div className="section-label"><span>SELECTED WORK / 01–04</span><span>FROM THE SCREEN TO THE THINKING</span></div><div className="work-heading"><h2>Four projects.<br/>Different decisions<br/>to make <em>clearer.</em></h2><p>From understanding a balance to choosing a first step, each project explores how an experience becomes useful.</p></div><WorkShowcase/></section><Domains/><Thinking/>
 <section className="personal section"><div className="personal-portrait"><ResponsiveImage sizes="(max-width: 760px) 400px, 540px" src={portrait} alt="Vinh Nguyen" width="800" height="1200" loading="lazy"/></div><div><p className="eyebrow">THE PERSON BEHIND THE WORK</p><h2>I’m interested in<br/>the decisions<br/><em>behind the interface.</em></h2><div className="body-copy"><Prose text={data.personal}/></div><CTA className="text-link" href="/about">About my work <ArrowUpRight size={18}/></CTA></div></section><Contact/></main></Shell>;}
