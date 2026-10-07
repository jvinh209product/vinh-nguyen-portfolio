'use client';

import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react';
import { Progress } from '@/components/ui/progress';
import { settleImage } from '@/lib/page-readiness';
import { Recovery } from './recovery';

export function ReliableImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setFailed(false);
    const image = ref.current;
    const fallback = () => setFailed(true);
    image?.addEventListener('portfolio:media-fallback', fallback);
    if (image?.complete && !image.naturalWidth) fallback();
    return () => image?.removeEventListener('portfolio:media-fallback', fallback);
  }, [props.src]);
  return <><img {...props} ref={ref} data-media-state={failed ? 'fallback' : undefined} onLoad={() => setFailed(false)} onError={() => { setFailed(true); console.warn('Portfolio image unavailable:', props.src); }}/>{failed && <span className="media-fallback" role={props['aria-hidden'] ? undefined : 'img'} aria-label={props.alt || 'Project screen unavailable'}><span>Image unavailable</span><small>The story is still here.</small></span>}</>;
}

/** Content always mounts first. This overlay has no scroll lock or GSAP dependency. */
export function PageReadiness() {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [progress, setProgress] = useState(0);
  const [failure, setFailure] = useState<Error | null>(null);
  const target = useRef(0);
  const reduced = useRef(false);

  useEffect(() => {
    const abort = new AbortController();
    let raf = 0, paint = 0;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;
    let shown = false, display = 0;
    const main = document.querySelector('main');
    const essential = Array.from(document.querySelectorAll<HTMLImageElement>('img[data-entry-media]')).filter(image => {
      const box = image.getBoundingClientRect();
      return box.width > 0 && box.top < innerHeight && box.bottom > 0;
    });
    reduced.current = matchMedia('(prefers-reduced-motion: reduce)').matches;
    try { reduced.current ||= localStorage.getItem('vinh-motion') === 'Reduced'; } catch {}
    const advance = (milestone: number) => {
      target.current = Math.max(target.current, milestone);
      cancelAnimationFrame(raf);
      if (reduced.current || milestone === 100) { display = target.current; setProgress(display); return; }
      const from = display, start = performance.now();
      const step = (now: number) => {
        display = Math.max(display, Math.round(from + (target.current - from) * Math.min(1, (now - start) / 160)));
        setProgress(display);
        if (display < target.current) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    let visited = false;
    try { visited = sessionStorage.getItem('vinh-ready-v1') === 'yes'; } catch {}
    const cached = essential.every(image => image.complete && image.naturalWidth > 0);
    if (!visited && !cached) { shown = true; setVisible(true); }
    advance(25);
    if (!main?.querySelector('h1')) {
      setVisible(false);
      setFailure(new Error('The requested page did not mount its essential content.'));
      return () => { abort.abort(); cancelAnimationFrame(raf); };
    }
    advance(65);
    Promise.all(essential.map(image => settleImage(image, abort.signal))).then(() => {
      if (abort.signal.aborted) return;
      advance(90);
      // A paint allows image fallbacks to commit before the page is declared usable.
      paint = requestAnimationFrame(() => {
        if (abort.signal.aborted) return;
        advance(100);
        document.documentElement.dataset.readiness = 'ready';
        window.dispatchEvent(new CustomEvent('portfolio:ready'));
        try { sessionStorage.setItem('vinh-ready-v1', 'yes'); } catch {}
        setLeaving(true);
        if (shown) exitTimer = setTimeout(() => setVisible(false), reduced.current ? 0 : 180);
        // Homepage owns its readiness-gated sequence; other pages retain the brief reveal.
        const hero = main.querySelector<HTMLElement>('.case-opening h1, .about-opening h1');
        if (!visited && !reduced.current && hero?.animate) {
          const entrance = hero.animate([{ opacity: .8, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 220, easing: 'ease-out' });
          abort.signal.addEventListener('abort', () => entrance.cancel(), { once: true });
        }
      });
    }).catch(error => { if (!abort.signal.aborted) { console.error('Portfolio readiness failed', error); setVisible(false); setFailure(error); } });
    const restore = () => { if (target.current === 100) setVisible(false); };
    window.addEventListener('pageshow', restore);
    return () => { abort.abort(); cancelAnimationFrame(raf); cancelAnimationFrame(paint); clearTimeout(exitTimer); window.removeEventListener('pageshow', restore); };
  }, []);

  if (failure) return <Recovery error={failure} retry={() => location.reload()}/>;
  if (!visible) return null;
  return <div className={`page-loader ${leaving ? 'is-leaving' : ''}`}><span className="loader-wordmark">Vinh Nguyen</span><div className="loader-center"><div className="loader-number" aria-hidden="true">{progress}<span>%</span></div><p role="status">Preparing portfolio</p><Progress value={progress} aria-label="Portfolio page readiness" className="loader-line"/></div><span className="loader-footnote">PRODUCT THINKING · BUSINESS ANALYSIS · UX</span></div>;
}
