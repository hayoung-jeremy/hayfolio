import { degToRad } from "three/src/math/MathUtils.js";

import useDisplay from "@/hooks/useDisplay";
import {
  XM3_Body_Transparent,
  XM3_Bonnet_Transparent,
  XM3_Bumper_Transparent,
  XM3_Headlight_Transparent,
  XM3_Taillamp_Transparent,
  XM3_Wheel_Transparent,
} from "./transparent";

const XM3_Transparent_Container = () => {
  const { isDesktop } = useDisplay();

  return (
    <group scale={isDesktop ? 0.0011 : 0.0007} position={[0, -1, 0]} rotation={[0, degToRad(10), 0]}>
      <XM3_Body_Transparent />
      <XM3_Bonnet_Transparent />
      <XM3_Bumper_Transparent />
      <XM3_Headlight_Transparent />
      <XM3_Taillamp_Transparent />
      <XM3_Wheel_Transparent />
    </group>
  );
};

export default XM3_Transparent_Container;
