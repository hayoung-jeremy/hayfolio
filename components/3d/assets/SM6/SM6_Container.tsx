import { degToRad } from "three/src/math/MathUtils.js";

import SM6_Body from "./SM6_Body";
import {
  SM6_Bonnet_Transparent,
  SM6_Bumper_Transparent,
  SM6_Headlight_Transparent,
  SM6_TailLamp_Transparent,
  SM6_Wheel_Transparent,
} from "./transparent";
import useDisplay from "@/hooks/useDisplay";

const SM6_Container = () => {
  const { isDesktop } = useDisplay();
  return (
    <group scale={isDesktop ? 0.0011 : 0.0007} position={[0, -1, 0]} rotation={[0, degToRad(10), 0]}>
      <SM6_Body />
      <SM6_Bonnet_Transparent />
      <SM6_Bumper_Transparent />
      <SM6_Headlight_Transparent />
      <SM6_TailLamp_Transparent />
      <SM6_Wheel_Transparent />
    </group>
  );
};

export default SM6_Container;
