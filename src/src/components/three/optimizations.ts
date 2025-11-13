import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { isMobile } from '@/utils/device';

export function usePerformanceOptimizations() {
  const { gl } = useThree();

  useEffect(() => {
    if (isMobile()) {
      // Reduce shadow map size on mobile
      gl.shadowMap.autoUpdate = false;
      gl.shadowMap.needsUpdate = true;
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
  }, [gl]);

  if (isMobile()) {
    return {
      dodecahedronSegments: 2,
      torusSegments: [12, 50],
      icosahedronDetail: 1,
    };
  }

  return {
    dodecahedronSegments: 3,
    torusSegments: [16, 100],
    icosahedronDetail: 2,
  };
}

export function useAdaptiveQuality() {
  const { gl } = useThree();

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 60;

    function checkPerformance() {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastTime = currentTime;

        // Adjust quality based on FPS
        if (fps < 30) {
          gl.setPixelRatio(1);
        } else if (fps < 45) {
          gl.setPixelRatio(Math.min(1.5, window.devicePixelRatio));
        } else {
          gl.setPixelRatio(Math.min(2, window.devicePixelRatio));
        }
      }

      requestAnimationFrame(checkPerformance);
    }

    const animationFrame = requestAnimationFrame(checkPerformance);
    return () => cancelAnimationFrame(animationFrame);
  }, [gl]);
}
