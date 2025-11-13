import { Canvas as ThreeCanvas } from '@react-three/fiber';
import { Suspense, ReactNode } from 'react';
import styled from 'styled-components';

interface CanvasProps {
  children: ReactNode;
  className?: string;
}

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export function Canvas({ children, className }: CanvasProps) {
  return (
    <CanvasContainer className={className}>
      <ThreeCanvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </ThreeCanvas>
      <Suspense fallback={<LoadingOverlay>Loading 3D Scene...</LoadingOverlay>}>
        {children}
      </Suspense>
    </CanvasContainer>
  );
}
