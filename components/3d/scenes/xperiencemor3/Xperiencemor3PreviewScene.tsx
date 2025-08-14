import { useEffect, useRef } from "react";
import { Group, Mesh } from "three";
import { Float } from "@react-three/drei";
import gsap from "gsap";

import { LogoSymbol } from "../../assets/xperiencemor3";

const Xperiencemor3PreviewScene = () => {
  const ref = useRef<Group>(null);

  useEffect(() => {
    const group = ref.current;
    if (!group) return;

    gsap.fromTo(group.scale, { x: 0.8, y: 0.8, z: 0.8 }, { x: 1, y: 1, z: 1, duration: 0.8, ease: "power2.out" });

    group.traverse(obj => {
      const mesh = obj as Mesh;
      if (mesh.material) {
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        materials.forEach(mat => {
          if (mat.transparent) {
            gsap.fromTo(mat, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power2.out" });
          }
        });
      }
    });
  }, []);
  return (
    <group ref={ref}>
      <Float speed={2.4} autoInvalidate rotationIntensity={1} floatIntensity={1} floatingRange={[-0.2, 0.2]}>
        <LogoSymbol scale={2} />
      </Float>
    </group>
  );
};

export default Xperiencemor3PreviewScene;
