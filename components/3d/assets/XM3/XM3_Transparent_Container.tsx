import { degToRad } from "three/src/math/MathUtils.js";

import useDisplay from "@/hooks/useDisplay";
import {
  XM3_body_transparent,
  XM3_bonnet_transparent,
  XM3_bumper_transparent,
  XM3_headlight_transparent,
  XM3_taillamp_transparent,
  XM3_wheel_transparent,
} from "./transparent";

const XM3_Transparent_Container = () => {
  const { isDesktop } = useDisplay();

  return (
    <group scale={isDesktop ? 0.0011 : 0.0007} position={[0, -1, 0]} rotation={[0, degToRad(10), 0]}>
      <XM3_body_transparent />
      <XM3_bonnet_transparent />
      <XM3_bumper_transparent />
      <XM3_headlight_transparent />
      <XM3_taillamp_transparent />
      <XM3_wheel_transparent />
    </group>
  );
};

export default XM3_Transparent_Container;
