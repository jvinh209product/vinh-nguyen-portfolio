import { useEffect, type RefObject } from 'react';
import { useMotion } from '../components/motion';

export function allowsDecorativeMotion() {
  const device = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  return !device.connection?.saveData && (!device.hardwareConcurrency || device.hardwareConcurrency > 2)
    && (!device.deviceMemory || device.deviceMemory > 2);
}

/** Input-driven CSS variables: at most one pending frame, never an idle loop. */
export function useSurfaceParallax(scope: RefObject<HTMLElement | null>, {
  maxX = 4, maxY = 3, scrollDepth = 0, pointerTarget = '',
}: { maxX?: number; maxY?: number; scrollDepth?: number; pointerTarget?: string } = {}) {
  const { ready, reduced, engine } = useMotion();
  useEffect(() => {
    const element = scope.current;
    if (!element || !ready || reduced || !engine || !allowsDecorativeMotion()) return;
    const target = pointerTarget ? element.closest<HTMLElement>(pointerTarget) || element : element;
    const mq = matchMedia('(min-width: 1000px) and (hover: hover) and (pointer: fine)');
    let visible = false, frame = 0, x = 0, y = 0;
    const enabled = () => mq.matches && visible && !document.hidden;
    const clear = () => {
      cancelAnimationFrame(frame); frame = 0; x = y = 0;
      ['--parallax-x', '--parallax-y', '--parallax-scroll'].forEach(name => element.style.removeProperty(name));
      delete element.dataset.parallax;
    };
    const paint = () => {
      frame = 0;
      if (!enabled()) return;
      element.style.setProperty('--parallax-x', `${(x * maxX).toFixed(2)}px`);
      element.style.setProperty('--parallax-y', `${(y * maxY).toFixed(2)}px`);
      if (scrollDepth) {
        const box = target.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -box.top / Math.max(box.height, 1)));
        element.style.setProperty('--parallax-scroll', `${(progress * scrollDepth).toFixed(2)}px`);
      }
    };
    const schedule = () => { if (enabled() && !frame) frame = requestAnimationFrame(paint); };
    const move = (event: PointerEvent) => {
      if (!enabled() || event.pointerType === 'touch') return;
      const box = target.getBoundingClientRect();
      x = Math.max(-1, Math.min(1, (event.clientX - box.left) / Math.max(box.width, 1) * 2 - 1));
      y = Math.max(-1, Math.min(1, (event.clientY - box.top) / Math.max(box.height, 1) * 2 - 1));
      element.dataset.parallax = 'active'; schedule();
    };
    const leave = () => { x = y = 0; delete element.dataset.parallax; schedule(); };
    const sync = () => { if (!enabled()) clear(); else schedule(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: .01 });
    observer.observe(element);
    target.addEventListener('pointermove', move, { passive: true });
    target.addEventListener('pointerleave', leave, { passive: true });
    if (scrollDepth) window.addEventListener('scroll', schedule, { passive: true });
    mq.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect(); clear();
      target.removeEventListener('pointermove', move); target.removeEventListener('pointerleave', leave);
      if (scrollDepth) window.removeEventListener('scroll', schedule);
      mq.removeEventListener('change', sync); document.removeEventListener('visibilitychange', sync);
    };
  }, [scope, ready, reduced, engine, maxX, maxY, scrollDepth, pointerTarget]);
}
