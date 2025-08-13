import { Float } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils.js";

import { CarKey, Essui, LogoText, Pedal, SideMirror, Suspension, Text_ETECH, Tire } from "../../assets/xperiencemor3";
import { useSelectedOptions } from "@/hooks/useXperiencemor3Game";
import { Suspense } from "react";

const mainModels = [
  (isSelected: boolean) => {
    return (
      <Suspension
        key={"Suspension"}
        // isSelected={isSelected}
        scale={1}
        position={[0, 0, 2]}
        rotation={[0, 0, -degToRad(100)]}
      />
    );
  },
  (isSelected: boolean) => {
    return (
      <LogoText
        key={"LogoText"}
        //   isSelected={isSelected}
        scale={1}
        position={[1.2, -0.7, 1.2]}
        rotation={[0, 0, 0]}
      />
    );
  },
  (isSelected: boolean) => {
    return (
      <CarKey
        key={"CarKey"}
        // isSelected={isSelected}
        scale={0.8}
        position={[2, 0.1, 0]}
        rotation={[0, degToRad(10), degToRad(10)]}
      />
    );
  },
  (isSelected: boolean) => {
    return (
      <SideMirror
        key={"SideMirror"}
        // isSelected={isSelected}
        scale={1}
        position={[1.2, 1, -1.45]}
        rotation={[0, degToRad(10), degToRad(20)]}
      />
    );
  },
  (isSelected: boolean) => {
    return (
      <Text_ETECH
        key={"Text_ETECH"}
        // isSelected={isSelected}
        scale={1}
        position={[-0.1, 1.8, -2]}
        rotation={[0, degToRad(120), 0]}
      />
    );
  },
  (isSelected: boolean) => {
    return (
      <Essui
        key={"Essui"}
        // isSelected={isSelected}
        scale={1}
        position={[-1, -1.4, -1.4]}
        rotation={[0, 0, degToRad(160)]}
      />
    );
  },
  (isSelected: boolean) => {
    return (
      <Tire
        key={"Tire"}
        // isSelected={isSelected}
        scale={1}
        position={[-1.8, 1, -0.1]}
        rotation={[-degToRad(30), -degToRad(40), 0]}
      />
    );
  },
  (isSelected: boolean) => {
    return (
      <Pedal
        key={"Pedal"}
        // isSelected={isSelected}
        scale={0.6}
        position={[-2, 0, 1.1]}
        rotation={[0, -degToRad(130), 0]}
      />
    );
  },
];

const MainModelsContainer = () => {
  const selectedOptions = useSelectedOptions();

  return (
    <>
      {mainModels.map((item, idx) => {
        return (
          <Float key={idx} speed={1.2} rotationIntensity={0.3} floatIntensity={1} floatingRange={[-0.05, 0.05]}>
            {item(selectedOptions.length >= idx)}
          </Float>
        );
      })}
    </>
  );
};

export default MainModelsContainer;
