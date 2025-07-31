import { degToRad } from "three/src/math/MathUtils.js";

import QM6_Body from "./QM6_Body";
import QM6_Bonnet from "./QM6_Bonnet";
import QM6_Bumper from "./QM6_Bumper";
import QM6_Headlight from "./QM6_Headlight";
import QM6_TailLamp from "./QM6_TailLamp";
import QM6_Wheel from "./QM6_Wheel";
import QM6_Roofcarrier from "./QM6_Roofcarrier";
import QM6_Spoiler from "./QM6_Spoiler";
import QM6_Decal from "./QM6_Decal";

import useDisplay from "@/hooks/useDisplay";
import { useGarageStore } from "@/store/useGarageStore";

const QM6_Container = () => {
  const { isDesktop } = useDisplay();
  const { selectedParts } = useGarageStore();
  return (
    <group scale={isDesktop ? 0.0011 : 0.0007} position={[0, -1, 0]} rotation={[0, degToRad(10), 0]}>
      <QM6_Body />
      <QM6_Bonnet meta={selectedParts["Bonnet"]} />
      <QM6_Bumper meta={selectedParts["Bumper"]} />
      <QM6_Headlight meta={selectedParts["Head light"]} />
      <QM6_TailLamp meta={selectedParts["Tail lamp"]} />
      <QM6_Wheel />
      <QM6_Roofcarrier meta={selectedParts["Roof carrier"]} />
      <QM6_Spoiler meta={selectedParts["Spoiler"]} />
      <QM6_Decal />
    </group>
  );
};

export default QM6_Container;
