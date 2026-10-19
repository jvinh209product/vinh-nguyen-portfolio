import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CTA } from '../CTA';
import { ResponsiveImage } from '../ResponsiveImage';
import { useGSAP, useMotion } from '../motion';
import { motion } from '../../lib/motion';
import { builds, manifestoPanels, type BuildPreview } from '../../content/builds';
import { BuildMedia } from './BuildMedia';

function BuildComposition({ build }: { build: BuildPreview }) {
  return <article className={'build-composition build-' + build.kind}>
    <a href={'/work/' + build.slug} className="build-cover-link" tabIndex={-1} aria-label={'Explore the ' + build.name + ' case'}>
      <BuildMedia build={build}/>
    </a>
    <div className="build-summary">
      <h3><a href={'/work/' + build.slug}>{build.name}<ArrowUpRight size={23}/></a></h3>
      <p className="eyebrow">{build.number} / {build.category.split(' · ')[0]}</p>
      <p className="build-proposition">{build.line}</p>
      <div className="build-actions">
        <CTA href={'/work/' + build.slug} className="text-link">Explore the case <ArrowUpRight size={17}/></CTA>
        {build.liveUrl && <CTA href={build.liveUrl} target="_blank" rel="noopener noreferrer" className="text-link"
          aria-label={'Visit ' + build.name + ' live experience (opens in a new tab)'}>Visit live experience <ArrowUpRight size={17}/></CTA>}
      </div>
    </div>
  </article>;
}

export function BuildsShowcase() {
  const scope = useRef<HTMLElement>(null);
  const { ready, reduced } = useMotion();
  useGSAP(({ gsap }) => {
    if (!ready || reduced) return;
    const q = gsap.utils.selector(scope);
    gsap.fromTo(q('.builds-intro > *'), { opacity: .7, y: 12 }, {
      opacity: 1, y: 0, duration: .6, stagger: .1, ease: motion.easeOut, clearProps: 'transform,opacity',
      scrollTrigger: { trigger: q('.builds-intro')[0], start: 'top 85%', once: true },
    });
    const mm = gsap.matchMedia();
    mm.add({ desktop: '(min-width: 1024px)', all: '(min-width: 0px)' }, context => {
      const cards = q('.build-composition'), rowSize = context.conditions?.desktop ? 2 : 1;
      for (let i=0; i<cards.length; i+=rowSize) {
        const row = cards.slice(i, i+rowSize);
        const images = row.map(card => card.querySelector('.build-cover-link'));
        const captions = row.map(card => card.querySelector('.build-summary'));
        gsap.timeline({ scrollTrigger: { trigger: row[0], start: 'top 86%', once: true },
          defaults: { ease: motion.easeOut, clearProps: 'transform,opacity' } })
          .fromTo(images, { opacity: .78, y: 24 }, { opacity: 1, y: 0, duration: .62, stagger: .12 }, 0)
          .fromTo(captions, { opacity: .7, y: 12 }, { opacity: 1, y: 0, duration: .55, stagger: .12 }, .16);
      }
    });
    return () => mm.revert();
  }, { scope, dependencies: [ready, reduced], revertOnUpdate: true });
  return <section id="builds" className="builds-showcase theme-ink" ref={scope}>
    <div className="section">
      <div className="builds-intro">
        <p className="eyebrow">INTERACTIVE BUILDS / 05–08 · THINK → DESIGN → MAKE</p>
        <h2>Ideas are better<br/>when you can <em>use them.</em></h2>
        <p>Four interactive experiments in decision-making, logistics, product leadership and mindful living. Built to make complex systems understandable through experience.</p>
      </div>
      <div className="builds-gallery">{builds.map(build => <BuildComposition key={build.slug} build={build}/>)}</div>
    </div>
  </section>;
}

export function CapabilityStatement() {
  return <section className="builder-capability section" aria-label="Product strategy, experience design, and interactive building">
    <p className="builder-connection">I think in systems. I design for people.<br/><em>I build to make ideas tangible.</em></p>
    <div className="builder-capability-grid">
      <div><span className="small-number">01</span><h2>Product strategy</h2><p>Find the decision behind the request.</p></div>
      <div><span className="small-number">02</span><h2>Experience design</h2><p>Make the next step understandable.</p></div>
      <div><span className="small-number">03</span><h2>Interactive building</h2><p>Make the idea something you can explore.</p></div>
    </div>
  </section>;
}

export function BuilderInterlude() {
  const scope=useRef<HTMLElement>(null);
  const { ready, reduced }=useMotion();
  useGSAP(({ gsap }) => {
    if (!ready || reduced) return;
    const q=gsap.utils.selector(scope);
    gsap.timeline({ scrollTrigger: { trigger: q('.builder-manifesto')[0], start: 'top 87%', once: true },
      defaults: { ease: motion.easeOut, clearProps: 'transform,opacity' } })
      .fromTo(q('.manifesto-phrase'), { opacity: .72, y: 12 }, { opacity: 1, y: 0, duration: .65, stagger: .12 });
    gsap.timeline({ scrollTrigger: { trigger: q('.manifesto-panels')[0], start: 'top 88%', once: true },
      defaults: { ease: motion.easeOut, clearProps: 'transform,opacity' } })
      .fromTo(q('.manifesto-panel'), { opacity: .8, y: 20 }, { opacity: 1, y: 0, duration: .6, stagger: .12 })
      .fromTo(q('.builder-loop span'), { opacity: .55 }, { opacity: 1, duration: .3, stagger: .07 }, .8);
    const mm=gsap.matchMedia();
    mm.add('(min-width: 1024px) and (pointer: fine)', () => {
      gsap.to(q('.manifesto-panels__row'), { y: -12, ease: 'none',
        scrollTrigger: { trigger: q('.manifesto-panels')[0], start: 'top 85%', end: 'bottom 30%', scrub: .6 } });
    });
    return () => mm.revert();
  }, { scope, dependencies: [ready,reduced], revertOnUpdate: true });
  return <section className="builder-interlude" aria-label="Builder philosophy" ref={scope}>
    <div className="section">
      <p className="eyebrow">FROM A QUESTION TO SOMETHING YOU CAN USE</p>
      <p className="builder-manifesto"><span className="manifesto-phrase">I don’t just describe a product idea.</span>
        <span className="manifesto-phrase">I want to make it</span><em className="manifesto-phrase">testable, visible, and felt.</em></p>
      <div className="manifesto-panels"><div className="manifesto-panels__row">
        {manifestoPanels.map(({label,media}) => <figure key={label} className="manifesto-panel" data-manifesto-panel={label}>
          <div className="manifesto-panel__media">
            <ResponsiveImage src={media.src} alt={media.alt} width={media.width} height={media.height}
              style={{objectPosition:media.position}} sizes="(min-width: 1024px) 29vw, (min-width: 768px) 92vw, calc(100vw - 40px)" loading="lazy" decoding="async"/>
          </div>
          <figcaption>{label}</figcaption>
        </figure>)}
      </div></div>
      <div className="builder-loop" aria-label="Question, model, make, learn"><span>Question</span><span>Model</span><span>Make</span><span>Learn</span></div>
    </div>
  </section>;
}
