import { useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { easing } from "maath";

const GarageEnvironments = () => {
  return (
    <>
      <fog attach="fog" args={["#0a0a0a", 8, 24]} />
      <color attach="background" args={["#0a0a0a"]} />

      <ContactShadows
        opacity={1}
        position={[0, -1.01, 0]}
        scale={10}
        blur={1}
        far={4}
        resolution={1024}
        color="#000000"
      />
    </>
  );
};

export default GarageEnvironments;
