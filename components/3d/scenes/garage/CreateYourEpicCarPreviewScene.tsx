import { useEffect, useRef } from "react";
import { Group, Mesh } from "three";
import gsap from "gsap";
import { XM3_Transparent_Container } from "../../assets/XM3";

const CreateYourEpicCarPreviewScene = () => {
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
            gsap.fromTo(mat, { opacity: 0 }, { opacity: 0.2, duration: 1.2, ease: "power2.out" });
          }
        });
      }
    });
  }, []);

  return (
    <group ref={ref}>
      <XM3_Transparent_Container />
    </group>
  );
};

export default CreateYourEpicCarPreviewScene;
