"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { Group } from "three";
import { gsap } from "gsap";

interface SceneFadeWrapperProps {
  children: ReactNode;
}

const SceneFadeWrapper = ({ children }: SceneFadeWrapperProps) => {
  const ref = useRef<Group>(null);

  useLayoutEffect(() => {
    const group = ref.current;
    if (!group) return;

    const originalOpacities: WeakMap<THREE.Material, number> = new WeakMap();

    // 모든 material의 original opacity 저장
    group.traverse(obj => {
      if (obj instanceof THREE.Mesh && obj.material) {
        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
        materials.forEach(mat => {
          if (!originalOpacities.has(mat)) {
            originalOpacities.set(mat, mat.opacity ?? 1);
          }
          mat.transparent = true;
          mat.opacity = 0;
        });
      }
    });

    // Fade In: 0 → original opacity
    const tl = gsap.timeline();
    group.traverse(obj => {
      if (obj instanceof THREE.Mesh && obj.material) {
        const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
        materials.forEach(mat => {
          const targetOpacity = originalOpacities.get(mat) ?? 1;
          tl.to(
            mat,
            {
              opacity: targetOpacity,
              duration: 1.2,
              ease: "power2.out",
            },
            0
          );
        });
      }
    });

    return () => {
      // Fade Out: current → 0
      const tlOut = gsap.timeline();
      group.traverse(obj => {
        if (obj instanceof THREE.Mesh && obj.material) {
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
          materials.forEach(mat => {
            tlOut.to(
              mat,
              {
                opacity: 0,
                duration: 0.8,
                ease: "power2.in",
              },
              0
            );
          });
        }
      });
    };
  }, []);

  return <group ref={ref}>{children}</group>;
};

export default SceneFadeWrapper;
