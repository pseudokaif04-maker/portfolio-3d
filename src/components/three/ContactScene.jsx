import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function OrbitShapes({ reduced }) {
  const group = useRef();

  useFrame((state, delta) => {
    if (reduced || !group.current) return;
    group.current.rotation.y += delta * 0.05;
    group.current.position.y = state.pointer.y * 0.16;
  });

  return (
    <group ref={group}>
      <Float speed={reduced ? 0 : 1.4} rotationIntensity={reduced ? 0 : 0.5} floatIntensity={reduced ? 0 : 0.9}>
        <mesh position={[-3.2, 1.2, -0.5]} scale={0.34}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#6366f1" roughness={0.35} metalness={0.2} wireframe />
        </mesh>
      </Float>
      <Float speed={reduced ? 0 : 1.8} rotationIntensity={reduced ? 0 : 0.6} floatIntensity={reduced ? 0 : 1.1}>
        <mesh position={[3.3, -1.2, -1]} scale={0.42}>
          <torusGeometry args={[1, 0.34, 16, 60]} />
          <meshStandardMaterial color="#0891b2" roughness={0.3} metalness={0.2} wireframe />
        </mesh>
      </Float>
      <Float speed={reduced ? 0 : 1.2} rotationIntensity={reduced ? 0 : 0.4} floatIntensity={reduced ? 0 : 0.8}>
        <mesh position={[-3.1, -1.9, -1.5]} scale={0.2}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#c7d2fe" roughness={0.4} metalness={0.15} />
        </mesh>
      </Float>
      <Float speed={reduced ? 0 : 1.5} rotationIntensity={reduced ? 0 : 0.4} floatIntensity={reduced ? 0 : 1}>
        <mesh position={[3.2, 1.9, -1.5]} scale={0.18}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#a5f3fc" roughness={0.4} metalness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}

export default function ContactScene({ reduced = false }) {
  const isMobile =
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 767px)').matches;

  return (
    <Canvas
      dpr={[1, isMobile ? 1.2 : 1.5]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={1.3} />
      <directionalLight position={[3, 5, 4]} intensity={2} />
      <pointLight position={[-4, -2, 2]} intensity={16} distance={10} color="#818cf8" />
      <OrbitShapes reduced={reduced} />
    </Canvas>
  );
}
