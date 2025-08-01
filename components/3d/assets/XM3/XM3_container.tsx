import { Suspense } from "react";
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
import SkeletonParts from "../SkeletonParts";

import useDisplay from "@/hooks/useDisplay";
import { useGarageStore } from "@/store/useGarageStore";

const XM3_Container = () => {
  const { isDesktop } = useDisplay();
  const { selectedParts } = useGarageStore();

  return (
    <group scale={isDesktop ? 0.0011 : 0.0007} position={[0, -1, 0]} rotation={[0, degToRad(10), 0]}>
      <XM3_Body />
      <Suspense fallback={<SkeletonParts bodyType="XM3" partType="Bonnet" />}>
        <XM3_Bonnet meta={selectedParts["Bonnet"]} />
      </Suspense>
      <Suspense fallback={<SkeletonParts bodyType="XM3" partType="Bumper" />}>
        <XM3_Bumper meta={selectedParts["Bumper"]} />
      </Suspense>
      <Suspense fallback={<SkeletonParts bodyType="XM3" partType="Head light" />}>
        <XM3_Headlight meta={selectedParts["Head light"]} />
      </Suspense>
      <Suspense fallback={<SkeletonParts bodyType="XM3" partType="Tail lamp" />}>
        <XM3_TailLamp meta={selectedParts["Tail lamp"]} />
      </Suspense>
      <Suspense fallback={<SkeletonParts bodyType="XM3" partType="Wheel" />}>
        <XM3_Wheel />
      </Suspense>

      <XM3_Roofcarrier meta={selectedParts["Roof carrier"]} />
      <XM3_Spoiler meta={selectedParts["Spoiler"]} />
      <XM3_Decal />
    </group>
  );
};

export default XM3_Container;
