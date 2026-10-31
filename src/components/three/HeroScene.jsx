import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { createParticlePositions } from '../../lib/particles';

function ParticleField({ count, radius, reduced, color }) {
  const ref = useRef();

  const positions = useMemo(
    () => createParticlePositions(count, radius),
    [count, radius],
  );

  useFrame((state, delta) => {
    if (reduced || !ref.current) return;
    ref.current.rotation.y += delta * 0.035;
    ref.current.rotation.x += delta * 0.012;
  });

  return (
    <Points ref={ref} positions={positions} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.024}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
      />
    </Points>
  );
}

function Knot({ color, reduced, onCycle }) {
  const group = useRef();
  const material = useRef();
  const [hovered, setHovered] = useState(false);

  const targetColor = useMemo(() => new THREE.Color(color), [color]);
  const baseScale = 0.8;
  const targetScale = baseScale * (hovered ? 1.05 : 1);

  useEffect(
    () => () => {
      document.body.style.cursor = 'auto';
    },
    [],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    if (material.current) {
      material.current.color.lerp(targetColor, Math.min(1, delta * 5));
    }

    g.scale.x = THREE.MathUtils.damp(g.scale.x, targetScale, 6, delta);
    g.scale.y = THREE.MathUtils.damp(g.scale.y, targetScale, 6, delta);
    g.scale.z = THREE.MathUtils.damp(g.scale.z, targetScale, 6, delta);

    if (reduced) return;

    const t = state.clock.elapsedTime;
    g.rotation.y += delta * 0.2;
    g.rotation.x = Math.sin(t * 0.28) * 0.12 - state.pointer.y * 0.16;
    g.rotation.z = state.pointer.x * 0.14;
    g.position.x = THREE.MathUtils.damp(g.position.x, state.pointer.x * 0.34, 4, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, state.pointer.y * 0.24, 4, delta);
  });

  return (
    <group ref={group}>
      <Float
        speed={reduced ? 0 : 1.5}
        rotationIntensity={reduced ? 0 : 0.32}
        floatIntensity={reduced ? 0 : 0.85}
      >
        <mesh
          onClick={(event) => {
            event.stopPropagation();
            onCycle?.();
          }}
          onPointerOver={(event) => {
            event.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
        >
          <torusKnotGeometry args={[1.04, 0.32, 220, 36]} />
          <meshPhysicalMaterial
            ref={material}
            color={color}
            roughness={0.18}
            metalness={0.45}
            clearcoat={1}
            clearcoatRoughness={0.12}
            iridescence={0.75}
            iridescenceIOR={1.3}
            emissive={color}
            emissiveIntensity={0.08}
          />
        </mesh>
      </Float>

      <mesh rotation={[Math.PI / 2.15, 0.3, 0]}>
        <torusGeometry args={[1.85, 0.006, 8, 160]} />
        <meshBasicMaterial color="#a5b4fc" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 1.72, -0.4, 0.6]}>
        <torusGeometry args={[2.15, 0.004, 8, 160]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

export default function HeroScene({ reduced = false, color = '#4f46e5', onCycle }) {
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 767px)').matches;

  return (
    <Canvas
      dpr={[1, isMobile ? 1.5 : 2]}
      camera={{ position: [0, 0, 5.8], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ touchAction: 'pan-y' }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={1.15} />
      <directionalLight position={[4, 6, 6]} intensity={2.4} />
      <directionalLight position={[-5, -3, 4]} intensity={1.1} color="#c7d2fe" />
      <pointLight position={[3, -4, 3]} intensity={18} distance={10} color="#22d3ee" />
      <pointLight position={[-4, 3, 3]} intensity={22} distance={10} color="#818cf8" />
      <Knot color={color} reduced={reduced} onCycle={onCycle} />
      <ParticleField
        count={isMobile ? 260 : 900}
        radius={2.9}
        reduced={reduced}
        color={color}
      />
    </Canvas>
  );
}
