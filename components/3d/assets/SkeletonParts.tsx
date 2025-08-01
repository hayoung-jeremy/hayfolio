import React, { useEffect, useRef } from "react";
import { Group, Mesh, MeshStandardMaterial } from "three";

import {
  XM3_Bonnet_Transparent,
  XM3_Bumper_Transparent,
  XM3_Headlight_Transparent,
  XM3_Taillamp_Transparent,
  XM3_Wheel_Transparent,
} from "./XM3/transparent";
import {
  QM6_Bonnet_Transparent,
  QM6_Bumper_Transparent,
  QM6_Headlight_Transparent,
  QM6_TailLamp_Transparent,
  QM6_Wheel_Transparent,
} from "./QM6/transparent";
import {
  SM6_Bonnet_Transparent,
  SM6_Bumper_Transparent,
  SM6_Headlight_Transparent,
  SM6_TailLamp_Transparent,
  SM6_Wheel_Transparent,
} from "./SM6/transparent";
import { PartsType } from "@/types/garage";

interface SkeletonPartProps {
  bodyType: "XM3" | "SM6" | "QM6";
  partType: PartsType;
}

const SkeletonParts = ({ bodyType, partType }: SkeletonPartProps) => {
  const groupRef = useRef<Group>(null);

  const renderPart = () => {
    if (bodyType === "XM3") {
      switch (partType) {
        case "Bonnet":
          return <XM3_Bonnet_Transparent />;
        case "Bumper":
          return <XM3_Bumper_Transparent />;
        case "Head light":
          return <XM3_Headlight_Transparent />;
        case "Tail lamp":
          return <XM3_Taillamp_Transparent />;
        case "Wheel":
          return <XM3_Wheel_Transparent />;
        default:
          return null;
      }
    }

    if (bodyType === "SM6") {
      switch (partType) {
        case "Bonnet":
          return <SM6_Bonnet_Transparent />;
        case "Bumper":
          return <SM6_Bumper_Transparent />;
        case "Head light":
          return <SM6_Headlight_Transparent />;
        case "Tail lamp":
          return <SM6_TailLamp_Transparent />;
        case "Wheel":
          return <SM6_Wheel_Transparent />;
        default:
          return null;
      }
    }

    if (bodyType === "QM6") {
      switch (partType) {
        case "Bonnet":
          return <QM6_Bonnet_Transparent />;
        case "Bumper":
          return <QM6_Bumper_Transparent />;
        case "Head light":
          return <QM6_Headlight_Transparent />;
        case "Tail lamp":
          return <QM6_TailLamp_Transparent />;
        case "Wheel":
          return <QM6_Wheel_Transparent />;
        default:
          return null;
      }
    }
  };

  useEffect(() => {
    if (!groupRef.current) return;

    groupRef.current.traverse(obj => {
      if (obj instanceof Mesh && obj.material instanceof MeshStandardMaterial) {
        obj.material = obj.material.clone();

        obj.material.wireframe = true;
        obj.material.transparent = true;
        obj.material.opacity = 0.2;
        obj.material.depthWrite = false;
        obj.material.color.set("white");
      }
    });
  }, [bodyType, partType]);

  return <group ref={groupRef}>{renderPart()}</group>;
};

export default SkeletonParts;
