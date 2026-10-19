import { useRef, type RefObject } from 'react';
import type { gsap } from 'gsap';
import { useGSAP, useMotion } from '../motion';
import { allowsDecorativeMotion } from '../../lib/use-surface-parallax';
import type { BuildKind } from '../../content/builds';

/** Decorative storytelling lives in its own rail, never over real UI text. */
export function BuildSignature({ kind }: { kind: BuildKind }) {
  const labels = { evidence: 'SIGNALS → DECISION', city: 'A CHOICE → A JOURNEY', office: 'QUESTION → DELIVERY', garden: 'A THOUGHT → GROWTH' };
  return <div className={'build-signature build-signature--' + kind} aria-hidden="true">
    <span>{labels[kind]}</span>
    <svg viewBox="0 0 420 84" fill="none" className="signature-scene">
      {kind === 'evidence' ? <>
        <g stroke="currentColor" opacity=".25"><path d="M38 43H374"/><circle cx="374" cy="43" r="25"/></g>
        <g className="signature-paths" stroke="var(--interaction-accent)" strokeWidth="1.7">
          <path pathLength="1" strokeDasharray="1" d="M50 25L154 43"/>
          <path pathLength="1" strokeDasharray="1" d="M50 61L154 43"/>
          <path pathLength="1" strokeDasharray="1" d="M154 43L254 25L374 43"/>
          <path pathLength="1" strokeDasharray="1" d="M154 43L254 61L374 43"/>
        </g>
        {[[50,25],[50,61],[154,43],[254,25],[254,61]].map(([x,y],i) =>
          <g key={i} className="evidence-node" data-scatter-x={i % 2 ? -18 : 18} data-scatter-y={i % 2 ? 14 : -14}>
            <circle cx={x} cy={y} r="7" fill="var(--surface)" stroke="currentColor" strokeOpacity=".65"/>
            <circle cx={x} cy={y} r="2" fill="var(--interaction-accent)"/>
          </g>)}
        <g className="signature-decision"><circle cx="374" cy="43" r="11" fill="var(--interaction-accent)"/>
          <path d="m369 43 4 4 7-8" stroke="var(--on-accent)" strokeWidth="1.5"/></g>
      </> : kind === 'city' ? <>
        <g stroke="currentColor" opacity=".18">
          <path d="m24 43 75-24 54 36 79-37 63 35 89-23M34 74l69-28 65 28 84-32 69 28 74-31"/>
          <path d="m69 18 31 60m70-69 33 57m67-58 31 57m41-67 35 52"/>
          <path d="m82 26 13-5 14 9-13 5Z" fill="var(--surface)"/>
          <path d="m206 14 15-5 15 10-15 5Z" fill="var(--surface)"/>
          <path d="m315 47 15-5 15 10-15 5Z" fill="var(--surface)"/>
        </g>
        <path className="signature-route" pathLength="1" strokeDasharray="1" d="M26 61L80 33L146 53L212 25L290 48L382 23"
          stroke="var(--interaction-accent)" strokeWidth="2.4" strokeLinejoin="round"/>
        <circle className="signature-destination" cx="382" cy="23" r="12" stroke="var(--interaction-accent)" opacity=".7"/>
        <circle className="signature-rider" cx="382" cy="23" r="5" fill="var(--interaction-accent)" stroke="var(--background)" strokeWidth="2"/>
      </> : kind === 'office' ? <>
        <g className="signature-office-environment" stroke="currentColor" opacity=".22">
          <path d="m28 50 37-21 45 24-36 21Zm1-1V23l35-19 47 25v24M29 23l46 26v25M64 4v25"/>
        </g>
        <g className="signature-office-desk" stroke="var(--interaction-accent)" strokeWidth="1.5">
          <path d="m47 40 20-12 28 15-20 12ZM47 40v14m28 1v14m20-26v14"/>
          <path d="M64 29V18l15 8v10Z" fill="var(--surface)"/>
        </g>
        <g className="signature-office-character">
          <circle cx="102" cy="20" r="5" fill="var(--interaction-accent)"/>
          <path d="M102 27v19m0-14-9 7m9-7 9-5m-9 19-6 14m6-14 6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </g>
        <path d="M146 43H379" stroke="currentColor" opacity=".2"/>
        {[166,215,264,313,362].map((x,i)=><g key={x} className={'signature-chapter signature-chapter--' + i}>
          <circle cx={x} cy="43" r={i===4?9:5} fill={i===4?'var(--interaction-accent)':'var(--surface)'} stroke="var(--interaction-accent)"/>
          {i===4&&<path d="m358 43 3 3 6-6" stroke="var(--on-accent)" strokeWidth="1.3"/>}
        </g>)}
      </> : <>
        <g stroke="currentColor" opacity=".15"><ellipse cx="218" cy="47" rx="83" ry="32"/><path d="M38 67Q210 31 386 67"/><circle cx="218" cy="42" r="33"/></g>
        <circle className="signature-seed" cx="218" cy="63" r="4" fill="var(--interaction-accent)"/>
        <g className="signature-growth" stroke="var(--interaction-accent)" strokeWidth="1.8">
          <path pathLength="1" strokeDasharray="1" d="M218 63V26"/>
          <path pathLength="1" strokeDasharray="1" d="M218 49q-24-4-25-21q21-4 25 21"/>
          <path pathLength="1" strokeDasharray="1" d="M218 37q25-3 28-23q-25-1-28 23"/>
        </g>
        <g className="signature-leaf" fill="var(--interaction-accent)" opacity=".3">
          <path d="M218 49q-24-4-25-21q21-4 25 21"/>
          <path d="M218 37q25-3 28-23q-25-1-28 23"/>
        </g>
      </>}
    </svg>
  </div>;
}

/** Once on visibility, optional short replay, no idle animation or canvas. */
export function useBuildSignature(scope: RefObject<HTMLElement | null>, kind: BuildKind) {
  const { ready, reduced } = useMotion();
  const running = useRef<gsap.core.Timeline | null>(null);
  useGSAP(({ gsap, ScrollTrigger }, safe) => {
    const root = scope.current;
    const scene = root?.querySelector<SVGSVGElement>('.signature-scene');
    if (!root || !scene || !ready || reduced) return;
    const q = gsap.utils.selector(scene);
    const fine = matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');
    const simple = () => !fine.matches || !allowsDecorativeMotion();
    const play = safe((short = false) => {
      if (running.current?.isActive()) return;
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      running.current = tl;
      if (simple()) {
        tl.fromTo(scene, { opacity: .7 }, { opacity: 1, duration: .35, clearProps: 'opacity' });
        return;
      }
      if (short) {
        const focus = q(kind === 'evidence' ? '.signature-paths' : kind === 'city' ? '.signature-route,.signature-destination' : kind === 'office' ? '.signature-chapter--4' : '.signature-leaf');
        tl.fromTo(focus, { opacity: .35 }, { opacity: 1, duration: .5, clearProps: 'opacity' });
        return;
      }
      if (kind === 'evidence') {
        q('.evidence-node').forEach((node: HTMLElement, i: number) => {
          tl.fromTo(node, { x: Number(node.dataset.scatterX), y: Number(node.dataset.scatterY), opacity: .4 },
            { x: 0, y: 0, opacity: 1, duration: .42, clearProps: 'transform,opacity' }, i * .06);
        });
        tl.fromTo(q('.signature-paths path'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .36, stagger: .08 }, .3)
          .fromTo(q('.signature-decision'), { scale: .8, transformOrigin: '374px 43px' }, { scale: 1.12, duration: .15 }, .87)
          .to(q('.signature-decision'), { scale: 1, duration: .18, clearProps: 'transform,transformOrigin' }, 1.02);
      } else if (kind === 'city') {
        const path = root.querySelector<SVGPathElement>('.signature-route')!;
        const rider = root.querySelector<SVGCircleElement>('.signature-rider')!;
        const length = path.getTotalLength(), travel = { value: 0 };
        tl.fromTo(path, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .8 }, 0)
          .to(travel, { value: 1, duration: 1.15, ease: 'power1.inOut', onUpdate: () => {
            const point = path.getPointAtLength(travel.value * length);
            rider.setAttribute('cx', String(point.x)); rider.setAttribute('cy', String(point.y));
          } }, 0)
          .fromTo(q('.signature-destination'), { opacity: .15, scale: .65, transformOrigin: '382px 23px' },
            { opacity: .9, scale: 1, duration: .22, clearProps: 'transform,transformOrigin,opacity' }, 1.08);
      } else if (kind === 'office') {
        tl.fromTo(q('.signature-office-environment'), { y: 5, opacity: .1 }, { y: 0, opacity: .22, duration: .4, clearProps: 'transform,opacity' }, 0)
          .fromTo(q('.signature-office-desk'), { y: 9, opacity: .4 }, { y: 0, opacity: 1, duration: .4, clearProps: 'transform,opacity' }, .12)
          .fromTo(q('.signature-office-character'), { x: 9, opacity: .5 }, { x: 0, opacity: 1, duration: .4, clearProps: 'transform,opacity' }, .24)
          .fromTo(q('.signature-chapter'), { scale: .65, opacity: .4, transformOrigin: 'center' }, { scale: 1, opacity: 1, stagger: .075, duration: .24, clearProps: 'transform,opacity,transformOrigin' }, .48);
      } else {
        tl.fromTo(q('.signature-seed'), { scale: .7, y: 5, transformOrigin: 'center' }, { scale: 1, y: 0, duration: .45, clearProps: 'transform,transformOrigin' }, 0)
          .fromTo(q('.signature-growth path'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .85, stagger: .1, ease: 'power2.inOut' }, .2)
          .fromTo(q('.signature-leaf'), { opacity: .05, scale: .85, transformOrigin: '218px 63px' }, { opacity: .3, scale: 1, duration: .7, clearProps: 'transform,transformOrigin,opacity' }, .72);
      }
    });
    let entered = false;
    const trigger = ScrollTrigger.create({ trigger: scene, start: 'top 93%', once: true, onEnter: () => { entered = true; play(); } });
    const target = root.closest<HTMLElement>('.build-composition, .build-media-button') || root;
    const pointer = safe((event: PointerEvent) => { if (entered && fine.matches && event.pointerType === 'mouse') play(true); });
    const focus = safe((event: FocusEvent) => { if (entered && (event.target as HTMLElement).matches(':focus-visible')) play(true); });
    target.addEventListener('pointerenter', pointer);
    target.addEventListener('focusin', focus);
    return () => {
      trigger.kill(); running.current?.kill(); running.current = null;
      // Direct SVG position writes also settle when motion mode changes mid-flight.
      const rider=root.querySelector<SVGCircleElement>('.signature-rider');
      rider?.setAttribute('cx','382'); rider?.setAttribute('cy','23');
      target.removeEventListener('pointerenter', pointer); target.removeEventListener('focusin', focus);
    };
  }, { scope, dependencies: [ready, reduced, kind], revertOnUpdate: true });
}
