import { degToRad } from "three/src/math/MathUtils.js";

import SM6_Body from "./SM6_Body";
import SM6_Bonnet from "./SM6_Bonnet";
import SM6_Bumper from "./SM6_Bumper";
import SM6_Headlight from "./SM6_Headlight";
import SM6_TailLamp from "./SM6_TailLamp";
import SM6_Wheel from "./SM6_Wheel";
import SM6_Roofcarrier from "./SM6_Roofcarrier";
import SM6_Spoiler from "./SM6_Spoiler";
import SM6_Decal from "./SM6_Decal";

import useDisplay from "@/hooks/useDisplay";
import { useGarageStore } from "@/store/useGarageStore";

const SM6_Container = () => {
  const { isDesktop } = useDisplay();
  const { selectedParts } = useGarageStore();
  return (
    <group scale={isDesktop ? 0.0011 : 0.0007} position={[0, -1, 0]} rotation={[0, degToRad(10), 0]}>
      <SM6_Body />
      <SM6_Bonnet meta={selectedParts["Bonnet"]} />
      <SM6_Bumper meta={selectedParts["Bumper"]} />
      <SM6_Headlight meta={selectedParts["Head light"]} />
      <SM6_TailLamp meta={selectedParts["Tail lamp"]} />
      <SM6_Wheel />
      <SM6_Roofcarrier meta={selectedParts["Roof carrier"]} />
      <SM6_Spoiler meta={selectedParts["Spoiler"]} />
      <SM6_Decal />
    </group>
  );
};

export default SM6_Container;
