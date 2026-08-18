import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import { createParticlePositions } from '../../lib/particles';

function ParticleField({ count, radius, reduced }) {
  const ref = useRef();

  const positions = useMemo(
    () => createParticlePositions(count, radius),
    [count, radius],
  );

  useFrame((state, delta) => {
    if (reduced) return;
    ref.current.rotation.y += delta * 0.04;
    ref.current.rotation.x += delta * 0.015;
  });

  return (
    <Points ref={ref} positions={positions} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#818cf8"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

function Knot({ reduced }) {
  const group = useRef();

  useFrame((state, delta) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x = Math.sin(t * 0.25) * 0.12;
    group.current.position.x = state.pointer.x * 0.35;
    group.current.position.y = state.pointer.y * 0.25;
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh>
          <torusKnotGeometry args={[1.15, 0.34, 220, 32]} />
          <MeshDistortMaterial
            color="#4f46e5"
            roughness={0.18}
            metalness={0.85}
            distort={0.28}
            speed={1.6}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function HeroScene({ reduced = false }) {
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 767px)').matches;

  return (
    <Canvas
      dpr={[1, isMobile ? 1.4 : 1.8]}
      camera={{ position: [0, 0, 6.2], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.4} color="#c7d2fe" />
      <pointLight position={[-4, -2, -3]} intensity={0.8} color="#818cf8" />
      <spotLight
        position={[0, 4, 2]}
        angle={0.5}
        penumbra={0.8}
        intensity={0.7}
        color="#4f46e5"
      />
      <Knot reduced={reduced} />
      <ParticleField count={isMobile ? 350 : 1500} radius={3.4} reduced={reduced} />
    </Canvas>
  );
}