import React from "react";
import { Float } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils.js";
import { DecoPedal, DecoTire_0, DecoTire_1, LogoSymbol, Text_HYBRID } from "../../assets/xperiencemor3";

const array = [
  () => {
    return <DecoPedal position={[0, 2, 0]} rotation={[0, 0, 0]} />;
  },
  () => {
    return <DecoTire_0 position={[0.7, -2, 0]} rotation={[-degToRad(60), degToRad(20), 0]} />;
  },
  () => {
    return <DecoTire_1 position={[2.7, -0.4, -2]} rotation={[0, 0, 0]} scale={0.5} />;
  },
  () => {
    return <DecoPedal position={[0.8, -0.8, -2.2]} rotation={[0, 0, -degToRad(40)]} />;
  },
  () => {
    return <DecoTire_0 position={[-3, 0, -4]} rotation={[0, 0, 0]} scale={0.7} />;
  },
  () => {
    return <DecoTire_1 position={[-2, -2, 0]} rotation={[0, degToRad(60), 0]} />;
  },
  () => {
    return <Text_HYBRID position={[-1.8, 1, -2.1]} rotation={[0, degToRad(40), 0]} />;
  },
  () => {
    return <LogoSymbol position={[0, 0.5, 0]} rotation={[-degToRad(10), -degToRad(12), 0]} />;
  },
];

const DecoModelsContainer = () => {
  return (
    <>
      {array.map((item, idx) => {
        return (
          <Float
            key={"DECO" + idx}
            speed={1.2}
            rotationIntensity={1 + idx / 10}
            floatIntensity={1}
            floatingRange={[-0.1, 0.1]}
          >
            {item()}
          </Float>
        );
      })}
    </>
  );
};

export default DecoModelsContainer;
