import { Canvas } from '@react-three/fiber';
import { useEffect, useMemo } from 'react';
import { useFloatingAnimation, useRotationAnimation } from './animations';
import { usePerformanceOptimizations, useAdaptiveQuality } from './optimizations';
import { Color } from 'three';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background};
`;

function Scene() {
  const {
    dodecahedronSegments,
    torusSegments,
    icosahedronDetail
  } = usePerformanceOptimizations();

  const floatingGroup = useFloatingAnimation(0.3, 0.2);
  const rotatingMesh = useRotationAnimation(0.2);
  
  useAdaptiveQuality();

  // Create decorative elements with brand colors
  const colors = useMemo(() => [
    new Color('#4A90E2'), // Blue
    new Color('#50E3C2'), // Teal
    new Color('#F5A623'), // Orange
  ], []);

  const particleCount = 50;
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      ],
      color: colors[i % colors.length],
      scale: Math.random() * 0.5 + 0.5
    }));
  }, [colors]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      <group ref={floatingGroup}>
        {particles.map((particle, i) => (
          <mesh
            key={i}
            position={particle.position}
            scale={[particle.scale, particle.scale, particle.scale]}
          >
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color={particle.color} />
          </mesh>
        ))}

        <mesh ref={rotatingMesh} position={[0, 0, 0]}>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <meshStandardMaterial color={colors[0]} metalness={0.5} roughness={0.2} />
        </mesh>
      </group>
    </>
  );
}

export function AboutScene() {
  return (
    <CanvasContainer>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </CanvasContainer>
  );
}
