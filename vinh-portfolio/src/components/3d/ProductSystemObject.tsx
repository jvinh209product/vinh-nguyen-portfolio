import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, MathUtils } from 'three';

const nodes = Array.from({ length: 6 }, (_, i) => {
  const angle = i * Math.PI / 3 + .25;
  return [Math.cos(angle) * 1.83, Math.sin(angle) * 1.83, Math.sin(angle * 2) * .13] as [number, number, number];
});

/** Procedural rings/nodes; no models, textures, shadows or postprocessing. */
export function ProductSystemObject({ active }: { active: boolean }) {
  const group = useRef<Group>(null);
  const inner = useRef<Group>(null);
  const input = useRef({ x: 0, y: 0, scroll: 0 });
  const { gl, invalidate } = useThree();

  useEffect(() => {
    if (!active) return;
    const hero = gl.domElement.closest('.hero');
    if (!hero) return;
    const pointer = (event: PointerEvent) => {
      const box = hero.getBoundingClientRect();
      input.current.x = MathUtils.clamp((event.clientX - box.left) / box.width * 2 - 1, -1, 1);
      input.current.y = MathUtils.clamp((event.clientY - box.top) / box.height * 2 - 1, -1, 1);
      invalidate();
    };
    const leave = () => { input.current.x = 0; input.current.y = 0; invalidate(); };
    const scroll = () => { const box = hero.getBoundingClientRect(); input.current.scroll = MathUtils.clamp(-box.top / box.height, 0, 1); invalidate(); };
    hero.addEventListener('pointermove', pointer as EventListener, { passive: true });
    hero.addEventListener('pointerleave', leave, { passive: true });
    window.addEventListener('scroll', scroll, { passive: true }); scroll(); invalidate();
    return () => {
      hero.removeEventListener('pointermove', pointer as EventListener); hero.removeEventListener('pointerleave', leave);
      window.removeEventListener('scroll', scroll);
    };
  }, [active, gl, invalidate]);

  useFrame((_, delta) => {
    if (!active || !group.current || !inner.current) return;
    const dt = Math.min(delta, .05);
    const state = input.current;
    const targets = {
      x: -.15 + state.y * .065 + state.scroll * .12,
      y: .2 + state.x * .075,
      z: -.23 + state.scroll * .14,
      position: -.05 - state.scroll * .16,
      innerY: state.x * .055 + state.scroll * .08,
      innerZ: state.y * .04,
    };
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, targets.x, 5, dt);
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, targets.y, 5, dt);
    group.current.rotation.z = MathUtils.damp(group.current.rotation.z, targets.z, 5, dt);
    group.current.position.y = MathUtils.damp(group.current.position.y, targets.position, 5, dt);
    inner.current.rotation.y = MathUtils.damp(inner.current.rotation.y, targets.innerY, 5, dt);
    inner.current.rotation.z = MathUtils.damp(inner.current.rotation.z, targets.innerZ, 5, dt);
    const remaining = Math.max(
      Math.abs(group.current.rotation.x - targets.x), Math.abs(group.current.rotation.y - targets.y),
      Math.abs(group.current.rotation.z - targets.z), Math.abs(group.current.position.y - targets.position),
      Math.abs(inner.current.rotation.y - targets.innerY), Math.abs(inner.current.rotation.z - targets.innerZ),
    );
    // Render only while responding or settling. A stationary hero has no loop.
    if (remaining > .001) invalidate();
  });

  return <group ref={group} rotation={[-.15, .2, -.23]}>
    <mesh><torusGeometry args={[1.83, .009, 5, 72]}/><meshStandardMaterial color="#8a532f" roughness={.7} metalness={.2}/></mesh>
    <mesh rotation={[.82, .18, .58]}><torusGeometry args={[1.7, .007, 5, 64]}/><meshStandardMaterial color="#53636d" roughness={.85} metalness={.12}/></mesh>
    <group ref={inner}>
      <mesh rotation={[.27, .9, -.44]}><torusGeometry args={[1.46, .009, 5, 64]}/><meshStandardMaterial color="#8a532f" roughness={.8} metalness={.15}/></mesh>
      <mesh rotation={[.3, .3, 0]}><icosahedronGeometry args={[.28, 0]}/><meshStandardMaterial color="#53636d" roughness={.9} metalness={.1} wireframe/></mesh>
    </group>
    {nodes.map((position, i) => <mesh key={i} position={position}><sphereGeometry args={[i % 2 ? .037 : .048, 10, 7]}/><meshStandardMaterial color={i % 2 ? '#53636d' : '#8a532f'} roughness={.72} metalness={.18}/></mesh>)}
  </group>;
}
