import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function OrbitShapes({ reduced }) {
  const group = useRef();

  useFrame((state, delta) => {
    if (reduced) return;
    group.current.rotation.y += delta * 0.06;
    group.current.position.y = state.pointer.y * 0.2;
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1}>
        <mesh position={[-2.4, 0.6, 0]} scale={0.42}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#6366f1" roughness={0.3} metalness={0.7} wireframe />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.4}>
        <mesh position={[2.5, -0.7, -1]} scale={0.5}>
          <torusGeometry args={[1, 0.34, 16, 60]} />
          <meshStandardMaterial color="#22d3ee" roughness={0.25} metalness={0.8} wireframe />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.9}>
        <mesh position={[0, 1.6, -2]} scale={0.28}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#a5b4fc" roughness={0.35} metalness={0.6} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.1}>
        <mesh position={[0, -1.8, -1.5]} scale={0.24}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#818cf8" roughness={0.3} metalness={0.65} />
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
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={1.2} color="#c7d2fe" />
      <pointLight position={[-4, -2, 2]} intensity={0.7} color="#818cf8" />
      <OrbitShapes reduced={reduced} />
    </Canvas>
  );
}