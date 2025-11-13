import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

export const useFloatingAnimation = (speed = 1, amplitude = 0.1) => {
  const meshRef = useRef<Mesh>(null);
  const initialY = useRef<number | null>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      if (initialY.current === null) {
        initialY.current = meshRef.current.position.y;
      }

      const y = initialY.current + Math.sin(clock.getElapsedTime() * speed) * amplitude;
      meshRef.current.position.y = y;
    }
  });

  return meshRef;
};

export const useRotationAnimation = (speed = 1) => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += speed * 0.01;
    }
  });

  return meshRef;
};

export const usePulseAnimation = (speed = 1, amplitude = 0.1) => {
  const meshRef = useRef<Mesh>(null);
  const initialScale = useRef<number | null>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      if (initialScale.current === null) {
        initialScale.current = meshRef.current.scale.x;
      }

      const scale = initialScale.current + Math.sin(clock.getElapsedTime() * speed) * amplitude;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return meshRef;
};
