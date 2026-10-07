import { useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { ProductSystemObject } from './ProductSystemObject';

type SceneProps = { active: boolean; onReady: () => void; onUnavailable: () => void };
function SceneLifecycle({ active, onReady, onUnavailable }: SceneProps) {
  const { gl, invalidate } = useThree();
  const callbacks = useRef({ onReady, onUnavailable });
  callbacks.current = { onReady, onUnavailable };
  useEffect(() => {
    callbacks.current.onReady();
    const lost = (event: Event) => { event.preventDefault(); callbacks.current.onUnavailable(); };
    gl.domElement.addEventListener('webglcontextlost', lost);
    return () => gl.domElement.removeEventListener('webglcontextlost', lost);
  }, [gl]);
  useEffect(() => { if (active) invalidate(); }, [active, invalidate]);
  return null;
}

export default function HeroScene(props: SceneProps) {
  return <div className="hero-system__scene">
    <Canvas
      frameloop="demand" dpr={[1, 1.35]} camera={{ position: [0, 0, 6.2], fov: 38, near: .1, far: 16 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power', depth: true, stencil: false }}
      fallback={null}>
      <ambientLight intensity={1.8}/>
      <directionalLight position={[3, 4, 5]} intensity={2.3} color="#fff3e4"/>
      <ProductSystemObject active={props.active}/>
      <SceneLifecycle {...props}/>
    </Canvas>
  </div>;
}
