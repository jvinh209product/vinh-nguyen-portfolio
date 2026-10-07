import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import { useMotion } from '../motion';
import { allowsDecorativeMotion, useSurfaceParallax } from '../../lib/use-surface-parallax';

const HeroScene = lazy(() => import('./HeroScene'));

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { /* The static system remains if WebGL is unavailable. */ }
  render() { return this.state.failed ? null : this.props.children; }
}

function StaticSystem() {
  return <svg className="hero-system__static" viewBox="0 0 500 500" fill="none">
    <g stroke="currentColor" strokeWidth="1.1">
      <ellipse cx="250" cy="250" rx="206" ry="172" transform="rotate(-24 250 250)"/>
      <ellipse cx="250" cy="250" rx="202" ry="104" transform="rotate(32 250 250)"/>
      <ellipse cx="250" cy="250" rx="156" ry="192" transform="rotate(18 250 250)"/>
      <path d="m72 162 99-103 191 44 66 237-138 101-178-100Z" opacity=".28"/>
    </g>
    {[[72,162],[171,59],[362,103],[428,340],[290,441],[112,341]].map(([x,y]) => <circle key={x} cx={x} cy={y} r="4.5" fill="currentColor"/>)}
  </svg>;
}

function DepthPlanes() {
  return <svg className="hero-system__planes" viewBox="0 0 500 500" fill="none">
    <g transform="rotate(-18 250 250)">
      <rect x="80" y="161" width="322" height="189" rx="12" fill="#53636d" fillOpacity=".055" stroke="#53636d" strokeOpacity=".17"/>
      <path d="M105 188h153m-153 13h93M105 324h270" stroke="#53636d" strokeOpacity=".22"/>
      <g className="hero-system__secondary-plane" transform="translate(28 -29)">
        <rect x="80" y="161" width="322" height="189" rx="12" fill="#f0e8d4" fillOpacity=".22" stroke="#8a532f" strokeOpacity=".18"/>
        <path d="M105 188h153m-153 13h93" stroke="#8a532f" strokeOpacity=".25"/>
      </g>
    </g>
    <path d="M57 350v-89h38m348-103v87h-32" stroke="#53636d" strokeOpacity=".23"/>
    <circle cx="57" cy="350" r="3" fill="#8a532f" fillOpacity=".4"/><circle cx="443" cy="158" r="3" fill="#8a532f" fillOpacity=".4"/>
  </svg>;
}

/** Static HTML first; the renderer is requested only on a visible desktop hero. */
export function HeroSystem() {
  const scope = useRef<HTMLDivElement>(null);
  useSurfaceParallax(scope, { maxX: 8, maxY: 6, scrollDepth: 12, pointerTarget: '.hero' });
  const { ready, reduced } = useMotion();
  const [eligible, setEligible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const mq = matchMedia('(min-width: 1000px) and (pointer: fine)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const sync = () => setEligible(mq.matches && !connection?.saveData && allowsDecorativeMotion());
    sync(); mq.addEventListener('change', sync);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .04 });
    if (scope.current) observer.observe(scope.current);
    const visibility = () => setTabVisible(!document.hidden);
    visibility(); document.addEventListener('visibilitychange', visibility);
    const settled = () => setContentReady(true);
    if (document.documentElement.dataset.readiness === 'ready') settled();
    window.addEventListener('portfolio:ready', settled);
    return () => {
      mq.removeEventListener('change', sync); observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      window.removeEventListener('portfolio:ready', settled);
    };
  }, []);

  useEffect(() => {
    if (!ready || reduced || !eligible || !visible || !tabVisible || !contentReady || mounted || unavailable) return;
    let cancelled = false, idle = 0;
    const mount = () => {
      if (cancelled) return;
      // Unsupported hardware never downloads Three or attempts its renderer.
      // The detached probe is released immediately; the scene owns its canvas.
      const canvas = document.createElement('canvas');
      let context: WebGL2RenderingContext | null = null;
      try { context = canvas.getContext('webgl2', { powerPreference: 'low-power', failIfMajorPerformanceCaveat: true }); } catch {}
      if (!context) { setUnavailable(true); return; }
      context.getExtension('WEBGL_lose_context')?.loseContext();
      setMounted(true);
    };
    if (window.requestIdleCallback) idle = window.requestIdleCallback(mount, { timeout: 1200 });
    else idle = window.setTimeout(mount, 150);
    return () => { cancelled = true; if (window.cancelIdleCallback) window.cancelIdleCallback(idle); else clearTimeout(idle); };
  }, [ready, reduced, eligible, visible, tabVisible, contentReady, mounted, unavailable]);

  const enhanced = mounted && eligible && !reduced && !unavailable;
  const active = enhanced && visible && tabVisible;
  return <div ref={scope} className={`hero-system ${enhanced && sceneReady ? 'is-enhanced' : ''}`} aria-hidden="true" data-render-state={enhanced ? active ? 'active' : 'paused' : 'static'}>
    <div className="hero-system__depth"><DepthPlanes/><StaticSystem/>
    {enhanced && <SceneBoundary><Suspense fallback={null}><HeroScene active={active} onReady={() => setSceneReady(true)} onUnavailable={() => setUnavailable(true)}/></Suspense></SceneBoundary>}
    </div>
  </div>;
}
