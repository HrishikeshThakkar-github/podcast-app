import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import styled from 'styled-components';
import { useFloatingAnimation, useRotationAnimation, usePulseAnimation } from './animations';
import { usePerformanceOptimizations, useAdaptiveQuality } from './optimizations';

const CanvasContainer = styled.div`
  height: 60vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 40vh;
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  padding: ${({ theme }) => theme.spacing(4)};
  background: linear-gradient(
    to bottom,
    transparent,
    ${({ theme }) => theme.colors.background}
  );
  pointer-events: none;
`;

const Title = styled.h1`
  ${({ theme }) => theme.typography.h1};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled.p`
  ${({ theme }) => theme.typography.body1};
  max-width: 600px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;

function Scene() {
  const { 
    dodecahedronSegments,
    torusSegments,
    icosahedronDetail 
  } = usePerformanceOptimizations();
  
  const floatingMesh = useFloatingAnimation(0.5, 0.2);
  const rotatingMesh = useRotationAnimation(0.5);
  const pulsingMesh = usePulseAnimation(1, 0.1);
  
  useAdaptiveQuality();

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      <mesh ref={floatingMesh} position={[-2, 0, 0]}>
        <dodecahedronGeometry args={[1, dodecahedronSegments]} />
        <meshStandardMaterial color="#ff6b6b" wireframe />
      </mesh>

      <mesh ref={rotatingMesh} position={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.3, torusSegments[0], torusSegments[1]]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>

      <mesh ref={pulsingMesh} position={[2, 0, 0]}>
        <icosahedronGeometry args={[1, icosahedronDetail]} />
        <meshStandardMaterial color="#95a5a6" />
      </mesh>
    </>
  );
}

export function HeroScene() {
  return (
    <CanvasContainer>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Scene />
        <OrbitControls enableZoom={false} />
        <Environment preset="city" />
      </Canvas>
      <Overlay>
        <Title>Welcome to PodSite</Title>
        <Subtitle>
          Discover insightful conversations about technology, design, and innovation
        </Subtitle>
      </Overlay>
    </CanvasContainer>
  );
}
