import Lenis from 'lenis';
import type { MotionEngine } from '../components/motion-engine';

/** Wheel smoothing only. Touch, keyboard and document navigation stay native. */
export function createSmoothScroll({ gsap, ScrollTrigger }: MotionEngine) {
  const lenis = new Lenis({
    lerp: .18, smoothWheel: true, syncTouch: false, autoRaf: false,
    anchors: false, stopInertiaOnNavigate: true, respectReducedMotion: true,
    prevent: node => node.matches('[role="dialog"], [role="listbox"], .viewer-image'),
    virtualScroll: () => !document.querySelector('[role="dialog"][data-state="open"]'),
  });
  let ticking = false, scheduled = 0, destroyed = false;
  const focusCleanups = new Set<() => void>();
  const stopTick = () => { gsap.ticker.remove(tick); ticking = false; };
  const tick = (time: number) => {
    lenis.raf(time * 1000);
    if (lenis.isScrolling !== 'smooth') stopTick();
  };
  const wake = () => {
    if (destroyed || ticking || scheduled) return;
    // Virtual-scroll is emitted before Lenis starts its interpolation. Defer one
    // frame so the ticker cannot stop before that interpolation has begun.
    scheduled = requestAnimationFrame(() => {
      scheduled = 0;
      if (!destroyed && lenis.isScrolling === 'smooth') {
        // Idle time must not be interpreted as one giant interpolation step.
        lenis.time = 0;
        ticking = true; gsap.ticker.add(tick);
      }
    });
  };
  const offVirtual = lenis.on('virtual-scroll', wake);
  const offScroll = lenis.on('scroll', () => { ScrollTrigger.update(); if (lenis.isScrolling === 'smooth') wake(); });
  const focusTarget = (target: HTMLElement) => {
    const added = !target.hasAttribute('tabindex');
    if (added) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    if (added) {
      const cleanup = () => { target.removeAttribute('tabindex'); target.removeEventListener('blur', cleanup); focusCleanups.delete(cleanup); };
      target.addEventListener('blur', cleanup, { once: true }); focusCleanups.add(cleanup);
    }
  };
  const click = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element)?.closest<HTMLAnchorElement>('a[href]');
    if (!link || link.download || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
    let target: HTMLElement | null;
    try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { return; }
    if (!target) return;
    event.preventDefault();
    if (url.hash !== location.hash) history.pushState(history.state, '', url.href);
    const rootPadding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    lenis.scrollTo(target, { offset: -rootPadding - margin, onComplete: () => focusTarget(target) });
    wake();
  };
  const cancelInterpolation = () => lenis.scrollTo(lenis.actualScroll, { immediate: true, force: true });
  const key = (event: KeyboardEvent) => {
    if (['Tab', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) cancelInterpolation();
  };
  const historyChange = cancelInterpolation;
  const visibility = () => { if (document.hidden) { cancelInterpolation(); stopTick(); } };
  document.addEventListener('click', click);
  window.addEventListener('keydown', key, { passive: true });
  window.addEventListener('popstate', historyChange);
  document.addEventListener('visibilitychange', visibility);
  return () => {
    destroyed = true; cancelAnimationFrame(scheduled); stopTick(); offVirtual(); offScroll(); lenis.destroy();
    document.removeEventListener('click', click); window.removeEventListener('keydown', key);
    window.removeEventListener('popstate', historyChange); document.removeEventListener('visibilitychange', visibility);
    focusCleanups.forEach(cleanup => cleanup());
  };
}
