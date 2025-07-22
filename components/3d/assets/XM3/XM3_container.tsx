import { degToRad } from "three/src/math/MathUtils.js";

import XM3_body_transparent from "./XM3_body_transparent";
import XM3_bonnet_transparent from "./XM3_bonnet_transparent";
import XM3_bumper_transparnet from "./XM3_bumper_transparent";
import XM3_headlight_transparent from "./XM3_headlight_transparent";
import XM3_taillamp_transparent from "./XM3_taillamp_transparent";
import XM3_wheel_transparent from "./XM3_wheel_transparent";
import useDisplay from "@/hooks/useDisplay";

const XM3_container = () => {
  const { isDesktop } = useDisplay();

  return (
    <group scale={isDesktop ? 0.0011 : 0.0007} position={[0, -1, 0]} rotation={[0, degToRad(10), 0]}>
      <XM3_body_transparent />
      <XM3_bonnet_transparent />
      <XM3_bumper_transparnet />
      <XM3_headlight_transparent />
      <XM3_taillamp_transparent />
      <XM3_wheel_transparent />
    </group>
  );
};

export default XM3_container;
