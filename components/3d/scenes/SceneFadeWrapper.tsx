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

    const originalOpacities = new WeakMap<THREE.Material, number>();
    const materials: THREE.Material[] = [];

    group.traverse(obj => {
      if (!(obj instanceof THREE.Mesh)) return;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach(mat => {
        if (!originalOpacities.has(mat)) {
          originalOpacities.set(mat, mat.opacity ?? 1);
          mat.transparent = true;
          mat.opacity = 0;
          materials.push(mat);
        }
      });
    });

    // 2. Fade In
    gsap.to(materials, {
      opacity: i => originalOpacities.get(materials[i]) ?? 1,
      duration: 1.2,
      ease: "power2.out",
      stagger: 0,
    });

    // 3. Fade Out on unmount
    return () => {
      gsap.to(materials, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
        stagger: 0,
      });
    };
  }, []);

  return <group ref={ref}>{children}</group>;
};

export default SceneFadeWrapper;
