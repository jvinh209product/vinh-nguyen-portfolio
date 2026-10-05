'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import type { gsap } from 'gsap';
import type { MotionEngine } from './motion-engine';
import { Pause, Play } from 'lucide-react';

// No animation runtime is evaluated during server rendering. GSAP starts its
// ticker on import, which Cloudflare forbids at Worker module scope.
export function useGSAP(callback: (engine: MotionEngine, safe: <T extends (...args: any[]) => any>(fn: T) => T) => void | (() => void), config: { scope: RefObject<HTMLElement | null>; dependencies: unknown[]; revertOnUpdate?: boolean; onError?: () => void }, supplied?: MotionEngine | null) {
  const motion = useMotion();
  const engine = supplied === undefined ? motion.engine : supplied;
  const latest = useRef(callback); latest.current = callback;
  useEffect(() => {
    if (!engine || !config.scope.current) return;
    const context = engine.gsap.context(() => {}, config.scope.current);
    let safeIndex = 0;
    const safe = <T extends (...args: any[]) => any>(fn: T): T => context.add('safe' + safeIndex++, fn) as T;
    try { context.add(() => latest.current(engine, safe)); }
    catch (error) { context.revert(); console.error('Portfolio motion could not start; content remains available.', error); (config.onError || motion.failMotion)(); }
    return () => context.revert();
  }, [engine, ...config.dependencies]);
}

type MotionMode = 'System' | 'Reduced' | 'Full';
const MotionContext = createContext({ mode: 'System' as MotionMode, reduced: false, ready: false, engine: null as MotionEngine | null, failMotion: () => {}, setMode: (_: MotionMode) => {} });
export const useMotion = () => useContext(MotionContext);

export function MotionRoot({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const [mode, updateMode] = useState<MotionMode>('System');
  const [systemReduced, setSystemReduced] = useState(false);
  const [ready, setReady] = useState(false);
  const [engine, setEngine] = useState<MotionEngine | null>(null);
  const [failed, setFailed] = useState(false);
  const failMotion = () => { setFailed(true); setEngine(null); document.documentElement.dataset.motion = 'reduced'; };
  const reduced = failed || mode === 'Reduced' || (mode === 'System' && systemReduced);
  const setMode = (next: MotionMode) => { updateMode(next); try { localStorage.setItem('vinh-motion', next); } catch {} };
  useEffect(() => {
    try { const saved = localStorage.getItem('vinh-motion'); if (saved === 'Reduced' || saved === 'Full') updateMode(saved); } catch {}
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setSystemReduced(mq.matches); sync(); setReady(true);
    mq.addEventListener('change', sync);
    const click = (event: MouseEvent) => {
      const link = (event.target as Element).closest('a');
      if (link && link.origin === location.origin && link.pathname !== location.pathname && !event.metaKey && !event.ctrlKey) {
        try { sessionStorage.setItem('vinh-navigate', 'yes'); } catch {}
      }
    };
    try { if (sessionStorage.getItem('vinh-navigate')) { document.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true }); sessionStorage.removeItem('vinh-navigate'); } } catch {}
    document.addEventListener('click', click);
    return () => { mq.removeEventListener('change', sync); document.removeEventListener('click', click); };
  }, []);
  useEffect(() => {
    if (!ready || reduced) return;
    let alive = true;
    import('./motion-engine').then(module => { if (alive) setEngine(module.engine); }).catch(error => {
      console.error('Portfolio animation module failed to load; using the static layout.', error);
      if (alive) failMotion();
    });
    return () => { alive = false; };
  }, [ready, reduced]);
  useEffect(() => { document.documentElement.dataset.motion = ready && engine && !reduced ? 'full' : 'reduced'; }, [ready, reduced, engine]);

  useGSAP(({ gsap, ScrollTrigger }) => {
    if (!ready || !scope.current) return;
    const mm = gsap.matchMedia();
    mm.add({ desktop: '(min-width: 1000px) and (min-height: 650px)', fine: '(pointer: fine)', system: '(prefers-reduced-motion: reduce)', any: '(min-width: 0px)' }, context => {
      const conditions = context.conditions!;
      if (reduced) return;
      const q = gsap.utils.selector(scope);
      if (conditions.desktop) {
        gsap.to(q('.site-header'), { height: 78, duration: .2, scrollTrigger: { trigger: scope.current, start: 'top -65', toggleActions: 'play none none reverse' } });
        if (conditions.fine && q('.portrait-drift').length) gsap.to(q('.portrait-drift'), { y: 28, ease: 'none', scrollTrigger: { trigger: q('.hero')[0], start: 'top top', end: 'bottom top', scrub: .6 } });
      }
      q('.domain-panel').forEach((panel) => {
        gsap.from(panel.querySelector('.domain-rule'), { scaleX: 0, transformOrigin: 'left', duration: .45, scrollTrigger: { trigger: panel, start: 'top 82%', once: true } });
        gsap.from(panel.querySelector('blockquote'), { color: '#697780', duration: .45, scrollTrigger: { trigger: panel, start: 'top 70%', once: true } });
      });
      q('.story-section').forEach((section) => {
        gsap.from(section.querySelector('.section-number'), { scaleX: .8, transformOrigin: 'left', opacity: .5, duration: .4, clearProps: 'all', scrollTrigger: { trigger: section, start: 'top 86%', once: true } });
        gsap.from(section.querySelector('h2'), { y: 10, duration: .4, clearProps: 'all', scrollTrigger: { trigger: section, start: 'top 86%', once: true } });
      });
      q('.screen-gallery, .journey-branches, .personal-portrait, .about-portrait').forEach((figure) => {
        gsap.from(figure, { clipPath: 'inset(0 0 6% 0)', duration: .55, clearProps: 'clipPath', scrollTrigger: { trigger: figure, start: 'top 88%', once: true } });
      });
      q('.contact h2').forEach((title) => gsap.from(title.children, { y: 14, opacity: .55, stagger: .08, duration: .38, clearProps: 'all', scrollTrigger: { trigger: title, start: 'top 90%', once: true } }));
      q('.personal .body-copy').forEach((paragraph) => gsap.from(paragraph, { y: 10, duration: .45, clearProps: 'all', scrollTrigger: { trigger: paragraph, start: 'top 90%', once: true } }));
    });
    let alive = true;
    const refresh = () => { if (alive) ScrollTrigger.refresh(); };
    document.fonts?.ready.then(refresh).catch(error => console.warn('Font refresh unavailable', error));
    const images = Array.from(scope.current.querySelectorAll('img'));
    images.forEach(img => img.addEventListener('load', refresh, { once: true }));
    const timer = setTimeout(refresh, 100);
    return () => { alive = false; clearTimeout(timer); images.forEach(img => img.removeEventListener('load', refresh)); mm.revert(); };
  }, { scope, dependencies: [ready, reduced], revertOnUpdate: true, onError: failMotion }, engine);
  return <MotionContext.Provider value={{ mode, reduced, ready, engine, failMotion, setMode }}><div ref={scope} className="site-root">{children}</div></MotionContext.Provider>;
}

export function Marquee() {
  const scope = useRef<HTMLDivElement>(null), track = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);
  const flags = useRef({ explicit: false, hover: false, focus: false, visible: false });
  const [paused, setPaused] = useState(false);
  const { reduced, ready } = useMotion();
  const sync = () => { const f = flags.current; tween.current?.paused(f.explicit || f.hover || f.focus || !f.visible || document.hidden); };
  useGSAP(({ gsap }, contextSafe) => {
    if (!ready || reduced || !scope.current || !track.current) return;
    let alive = true;
    const rebuild = contextSafe!(() => {
      if (!alive || !track.current) return;
      const previous = tween.current?.progress() ?? 0; tween.current?.kill();
      const width = (track.current.firstElementChild as HTMLElement).getBoundingClientRect().width;
      if (!width) return;
      tween.current = gsap.fromTo(track.current, { x: 0 }, { x: -width, duration: width / (innerWidth < 760 ? 24 : 30), repeat: -1, ease: 'none' }).progress(previous);
      sync();
    });
    const observer = new IntersectionObserver(([entry]) => { flags.current.visible = entry.isIntersecting; sync(); }); observer.observe(scope.current);
    const resize = new ResizeObserver(rebuild); resize.observe(scope.current);
    document.addEventListener('visibilitychange', sync); document.fonts?.ready.then(rebuild).catch(error => console.warn('Marquee font refresh unavailable', error)); rebuild();
    return () => { alive = false; observer.disconnect(); resize.disconnect(); document.removeEventListener('visibilitychange', sync); tween.current?.kill(); tween.current = null; };
  }, { scope, dependencies: [ready, reduced], revertOnUpdate: true });
  const phrase = 'Product thinking · Business rules · Human context · Clear experiences ·';
  return <div className="marquee" ref={scope} onMouseEnter={() => { flags.current.hover = true; sync(); }} onMouseLeave={() => { flags.current.hover = false; sync(); }} onFocusCapture={() => { flags.current.focus = true; sync(); }} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) { flags.current.focus = false; sync(); } }}>
    <div className="marquee-window"><div ref={track} className="marquee-track"><span>{phrase}</span><span aria-hidden="true">{phrase}</span></div></div>
    <button className="marquee-control" disabled={reduced} aria-pressed={paused} onClick={() => { flags.current.explicit = !paused; setPaused(!paused); sync(); }}>{paused || reduced ? <Play size={14}/> : <Pause size={14}/>} {reduced ? 'Motion reduced' : paused ? 'Resume motion' : 'Pause motion'}</button>
  </div>;
}
