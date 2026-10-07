import { useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useGSAP, useMotion } from './motion';
import { CTA } from './CTA';
import { ResponsiveImage } from './ResponsiveImage';
import { HeroSystem } from './3d/HeroSystem';
import { motion } from '../lib/motion';

export function Hero() {
  const scope = useRef<HTMLElement>(null), played = useRef(false);
  const { ready, reduced } = useMotion();
  useGSAP(({ gsap }, safe) => {
    if (!ready || reduced || played.current || !scope.current) return;
    const enter = safe(() => {
      if (played.current || !scope.current) return;
      played.current = true;
      const box = scope.current.getBoundingClientRect();
      if (document.hidden || box.bottom <= 0 || box.top >= innerHeight) return;
      const q = gsap.utils.selector(scope);
      const timeline = gsap.timeline({ defaults: { ease: motion.easeOut, duration: motion.base, clearProps: 'transform,opacity' } });
      timeline.fromTo(q('.hero-top'), { opacity: .65, y: 4 }, { opacity: 1, y: 0, duration: motion.fast }, 0)
        .fromTo(q('.hero-line')[0], { opacity: .7, yPercent: 16 }, { opacity: 1, yPercent: 0 }, .04)
        .fromTo(q('.hero-line')[1], { opacity: .7, yPercent: 16 }, { opacity: 1, yPercent: 0 }, .1)
        .fromTo(q('.hero-description'), { opacity: .65, y: 8 }, { opacity: 1, y: 0 }, .16)
        .fromTo(q('.hero-actions'), { opacity: .65, y: 6 }, { opacity: 1, y: 0 }, .22)
        .fromTo(q('.portrait-mask'), { opacity: .8, y: 8 }, { opacity: 1, y: 0, duration: motion.slow }, .08)
        .fromTo(q('.hero-system, .portrait-halo'), { opacity: .75, y: 5 }, { opacity: 1, y: 0, duration: motion.slow }, .08);
    });
    if (document.documentElement.dataset.readiness === 'ready') enter();
    else window.addEventListener('portfolio:ready', enter, { once: true });
    return () => window.removeEventListener('portfolio:ready', enter);
  }, { scope, dependencies: [ready, reduced], revertOnUpdate: true });

  return <section id="top" className="hero" ref={scope}>
    <div className="hero-top"><p className="eyebrow">BUSINESS ANALYST · PRODUCT OWNER · UX THINKING</p><span className="hero-edition">SELECTED WORK & PERSPECTIVES</span></div>
    <div className="hero-grid">
      <div className="hero-copy">
        <h1 tabIndex={-1}><span className="hero-line-mask"><span className="hero-line">Complex domains.</span></span><span className="hero-line-mask"><em className="hero-line">Clear experiences.</em></span></h1>
        <p className="hero-description">I'm Vinh Nguyen. I connect business rules, product decisions, and user experience to make complex services easier to understand and use. My work spans personal finance, merchant operations, and debt tracking, alongside an exploration of digital wellbeing.</p>
        <div className="hero-actions"><CTA href="#work" className="primary-link">Explore the work <ArrowDown size={17}/></CTA><CTA href="#thinking" className="text-link">How I think <ArrowUpRight size={17}/></CTA></div>
      </div>
      <figure className="portrait-composition">
        <div className="portrait-halo" aria-hidden="true"/><HeroSystem/>
        <div className="portrait-mask"><div className="portrait-drift"><ResponsiveImage sizes="(max-width: 760px) 400px, 540px" src="/images/vinh-portrait.webp" alt="Vinh Nguyen wearing a blue suit and glasses" width="800" height="1200" fetchPriority="high" data-entry-media="true"/></div></div>
        <figcaption><span>Vinh Nguyen</span><span>THE PERSON BEHIND THE WORK</span></figcaption>
      </figure>
    </div>
    <div className="hero-bottom"><span>Based in Vietnam</span><span className="hero-editorial">Every screen begins with a decision.</span><a href="#work" aria-label="Scroll to selected work"><ArrowDown size={19}/></a></div>
  </section>;
}
