import { Suspense } from "react";
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
import SkeletonParts from "../SkeletonParts";

import useDisplay from "@/hooks/useDisplay";
import { useGarageStore } from "@/store/useGarageStore";

const QM6_Container = () => {
  const { isDesktop } = useDisplay();
  const { selectedParts } = useGarageStore();

  return (
    <group scale={isDesktop ? 0.0011 : 0.0007} position={[0, -1, 0]} rotation={[0, degToRad(10), 0]}>
      <QM6_Body />
      <Suspense fallback={<SkeletonParts bodyType="QM6" partType="Bonnet" />}>
        <QM6_Bonnet meta={selectedParts["Bonnet"]} />
      </Suspense>
      <Suspense fallback={<SkeletonParts bodyType="QM6" partType="Bumper" />}>
        <QM6_Bumper meta={selectedParts["Bumper"]} />
      </Suspense>
      <Suspense fallback={<SkeletonParts bodyType="QM6" partType="Head light" />}>
        <QM6_Headlight meta={selectedParts["Head light"]} />
      </Suspense>
      <Suspense fallback={<SkeletonParts bodyType="QM6" partType="Tail lamp" />}>
        <QM6_TailLamp meta={selectedParts["Tail lamp"]} />
      </Suspense>
      <Suspense fallback={<SkeletonParts bodyType="QM6" partType="Wheel" />}>
        <QM6_Wheel />
      </Suspense>
      <QM6_Roofcarrier meta={selectedParts["Roof carrier"]} />
      <QM6_Spoiler meta={selectedParts["Spoiler"]} />
      <QM6_Decal />
    </group>
  );
};

export default QM6_Container;
