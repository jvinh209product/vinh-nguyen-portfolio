import { useRef, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { Shell, Contact } from '../components/Shell';
import { CTA } from '../components/CTA';
import { useGSAP, useMotion } from '../components/motion';
import { BuildMedia } from '../components/builds/BuildMedia';
import { BuildProcessDiagram } from '../components/builds/BuildProcessDiagram';
import { builds, getBuild, type BuildPreview } from '../content/builds';
import type { BuildStory } from '../content/builds/types';

const sections = [
  ['concept','Concept & audience'],['bet','The product bet'],['walkthrough','Experience walkthrough'],
  ['system','Systems & interactions'],['decisions','Design decisions'],['craft','Build & craft'],['status','Now & next'],
];
function SupportingMedia({ build, step }: { build: BuildPreview; step: number }) {
  return <>{build.supportingMedia.filter(media => media.afterStep===step).map(media =>
    <div key={media.id} className="build-supporting-media" data-supporting-media={media.id}>
      <BuildMedia build={build} media={media} viewer signature={false}/>
    </div>)}</>;
}
export default function BuildDetailPage({ story }: { story: BuildStory }) {
  const build=getBuild(story.slug);
  const scope=useRef<HTMLElement>(null);
  const { ready,reduced }=useMotion();
  useGSAP(({ gsap }) => {
    if (!ready || reduced) return;
    const q=gsap.utils.selector(scope);
    gsap.timeline({ scrollTrigger: { trigger: q('.build-entry-grid')[0], start: 'top 88%', once: true },
      defaults: { ease: 'power3.out', clearProps: 'transform,opacity' } })
      .fromTo(q('.build-entry-media'), { opacity: .82, y: 18 }, { opacity: 1, y: 0, duration: build.kind==='garden' ? .8 : .6 }, 0)
      .fromTo(q('.build-entry-copy > h1, .build-entry-copy > .build-deck'), { opacity: .75, y: 10 }, { opacity: 1, y: 0, duration: .6, stagger: .07 }, .16);
    q('.build-story-section > h2').forEach(title => gsap.fromTo(title, { opacity: .85, y: 8 }, {
      opacity: 1, y: 0, duration: .45, clearProps: 'transform,opacity',
      scrollTrigger: { trigger: title, start: 'top 92%', once: true },
    }));
  }, { scope,dependencies: [ready,reduced,story.slug],revertOnUpdate: true });
  const index=builds.findIndex(item=>item.slug===story.slug);
  const next=builds[(index+1)%builds.length];
  const previous=builds[(index+builds.length-1)%builds.length];
  return <Shell><main id="main" ref={scope} className={'build-story build-story--' + build.kind} style={{'--build-accent':build.accent} as CSSProperties}>
    <section id="top" className="build-opening section">
      <CTA href="/#builds" className="back-link"><ArrowLeft size={16}/> Independent builds</CTA>
      <p className="eyebrow">{build.number} / {build.category}</p>
      <div className="build-entry-grid">
        <div className="build-entry-media"><BuildMedia build={build} entry viewer/></div>
        <div className="build-entry-copy">
      <h1 tabIndex={-1}>{build.name}</h1><p className="build-deck">{build.line}</p>
      <div className="build-opening-actions">
        {build.liveUrl&&<CTA href={build.liveUrl} target="_blank" rel="noopener noreferrer" className="primary-link" aria-label={'Visit ' + build.name + ' live experience (opens in a new tab)'}>Visit live experience <ArrowUpRight size={18}/></CTA>}
        <CTA href="#concept" className="text-link">Read the case <ArrowRight size={17}/></CTA>
      </div>
        </div>
      </div>
      <dl className="build-facts"><div><dt>PROVENANCE</dt><dd>Independent product experiment</dd></div><div><dt>MY CONTRIBUTION</dt><dd>Concept, product structure, experience direction, and prototype iteration</dd></div><div><dt>FOCUS</dt><dd>{build.tags.join(' · ')}</dd></div></dl>

    </section>
    <section className={'build-question' + (build.kind==='evidence' ? ' theme-ink' : '')}><div className="section"><p className="eyebrow">THE CORE QUESTION</p><h2>{story.question}</h2></div></section>
    <div className="build-content section">
      <aside className="build-index"><p className="eyebrow">IN THIS BUILD</p><nav aria-label="Build story sections">{sections.map(([id,label],i)=><a key={id} href={'#'+id}><span>0{i+1}</span>{label}</a>)}</nav></aside>
      <div className="build-reading">
        <section id="concept" className="build-story-section"><p className="eyebrow">01 / THE IDEA</p><h2>Concept & audience</h2><p>{story.concept}</p><p>{story.audience}</p><div className="build-contribution"><h3>My contribution</h3><p>{story.contribution}</p></div></section>
        <section id="bet" className="build-story-section"><p className="eyebrow">02 / A TESTABLE DIRECTION</p><h2>The product bet</h2><p className="build-bet">{story.bet}</p><h3>Guiding principle</h3><p>{story.principle}</p><h3>Intentionally out of scope</h3><p>{story.scope}</p></section>
        <section id="walkthrough" className="build-story-section"><p className="eyebrow">03 / EXPERIENCE WALKTHROUGH</p><h2>What you do.<br/>What the system changes.</h2><div className="build-walkthrough">{story.walkthrough.map((step,i)=><article key={step.title}><span className="build-step-number">0{i+1}</span><h3>{step.title}</h3><dl><div><dt>YOU DO</dt><dd>{step.action}</dd></div><div><dt>SYSTEM CHANGES</dt><dd>{step.response}</dd></div><div><dt>YOU LEARN</dt><dd>{step.lesson}</dd></div></dl><SupportingMedia build={build} step={i}/></article>)}</div></section>
        <section id="system" className="build-story-section"><p className="eyebrow">04 / THE CONNECTED MODEL</p><h2>Systems & interactions</h2><BuildProcessDiagram kind={build.kind} model={story.model}/></section>
        <section id="decisions" className="build-story-section"><p className="eyebrow">05 / CHOICES, NOT JUST SCREENS</p><h2>Design decisions<br/>& trade-offs</h2><div className="build-decisions">{story.decisions.map((decision,i)=><details key={decision.title} open={i===0}><summary><span>0{i+1}</span><h3>{decision.title}</h3><Plus size={18}/></summary><div><p>{decision.choice}</p><h4>The trade-off</h4><p>{decision.tradeoff}</p><h4>What I would check next</h4><p>{decision.next}</p></div></details>)}</div></section>
        <section id="craft" className="build-story-section"><p className="eyebrow">06 / IMPLEMENTATION & CRAFT</p><h2>Built to be explored.</h2><dl className="build-craft">{Object.entries(story.craft).map(([label,copy])=><div key={label}><dt>{label.charAt(0).toUpperCase()+label.slice(1)}</dt><dd>{copy}</dd></div>)}</dl></section>
        <section id="status" className="build-story-section"><p className="eyebrow">07 / AN HONEST SNAPSHOT</p><h2>What works today.<br/>What comes next.</h2><div className="build-status-grid"><div><h3>Implemented</h3><ul>{story.today.map(item=><li key={item}>{item}</li>)}</ul></div><div><h3>Next to explore</h3><ul>{story.next.map(item=><li key={item}>{item}</li>)}</ul></div></div><p className="build-scope-note">{story.limits}</p>
          {build.liveUrl&&<CTA href={build.liveUrl} target="_blank" rel="noopener noreferrer" className="text-link" aria-label={'Visit ' + build.name + ' live experience (opens in a new tab)'}>Explore the actual experience <ArrowUpRight size={17}/></CTA>}
        </section>
      </div>
    </div>
    <section className="build-next section"><p className="eyebrow">NEXT INDEPENDENT BUILD / {next.number}</p><a href={'/work/'+next.slug}><div><h2>{next.name}</h2><p>{next.line}</p></div><ArrowRight size={36}/></a><nav className="case-footer-actions" aria-label="Build case navigation"><CTA href={'/work/'+previous.slug} className="text-link case-footer-action"><ArrowLeft size={16}/><span>Previous build: {previous.name}</span></CTA><CTA href="/#work" className="text-link case-footer-action"><span>Return to the product work</span><ArrowUpRight size={16}/></CTA></nav></section>
    <Contact/>
  </main></Shell>;
}
