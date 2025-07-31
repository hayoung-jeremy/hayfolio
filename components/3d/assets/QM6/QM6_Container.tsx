import { degToRad } from "three/src/math/MathUtils.js";

import QM6_Body from "./QM6_Body";
import {
  QM6_Bonnet_Transparent,
  QM6_Bumper_Transparent,
  QM6_Headlight_Transparent,
  QM6_TailLamp_Transparent,
  QM6_Wheel_Transparent,
} from "./transparent";
import useDisplay from "@/hooks/useDisplay";
import { useGarageStore } from "@/store/useGarageStore";

const QM6_Container = () => {
  const { isDesktop } = useDisplay();
  const { selectedParts } = useGarageStore();
  return (
    <group scale={isDesktop ? 0.0011 : 0.0007} position={[0, -1, 0]} rotation={[0, degToRad(10), 0]}>
      <QM6_Body selectedParts={selectedParts} />
      <QM6_Bonnet_Transparent />
      <QM6_Bumper_Transparent />
      <QM6_Headlight_Transparent />
      <QM6_TailLamp_Transparent />
      <QM6_Wheel_Transparent />
    </group>
  );
};

export default QM6_Container;
