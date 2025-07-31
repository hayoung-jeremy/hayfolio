import { degToRad } from "three/src/math/MathUtils.js";

import XM3_Body from "./XM3_Body";
import XM3_Bonnet from "./XM3_Bonnet";
import XM3_Bumper from "./XM3_Bumper";
import XM3_Headlight from "./XM3_Headlight";
import XM3_TailLamp from "./XM3_TailLamp";
import XM3_Wheel from "./XM3_Wheel";
import XM3_Roofcarrier from "./XM3_Roofcarrier";
import XM3_Spoiler from "./XM3_Spoiler";
import XM3_Decal from "./XM3_Decal";

import useDisplay from "@/hooks/useDisplay";
import { useGarageStore } from "@/store/useGarageStore";

const XM3_container = () => {
  const { isDesktop } = useDisplay();
  const { selectedParts } = useGarageStore();

  return (
    <group scale={isDesktop ? 0.0011 : 0.0007} position={[0, -1, 0]} rotation={[0, degToRad(10), 0]}>
      <XM3_Body />
      <XM3_Bonnet meta={selectedParts["Bonnet"]} />
      <XM3_Bumper meta={selectedParts["Bumper"]} />
      <XM3_Headlight meta={selectedParts["Head light"]} />
      <XM3_TailLamp meta={selectedParts["Tail lamp"]} />
      <XM3_Wheel />
      <XM3_Roofcarrier meta={selectedParts["Roof carrier"]} />
      <XM3_Spoiler meta={selectedParts["Spoiler"]} />
      <XM3_Decal />
    </group>
  );
};

export default XM3_container;
