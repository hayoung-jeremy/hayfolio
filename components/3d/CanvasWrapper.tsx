"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Box } from "@react-three/drei";

const CanvasWrapper = () => {
  return (
    <div className="ThreeScene opacity-0 pointer-events-none w-screen xl:w-full h-screen">
      <Canvas>
        <Box />
      </Canvas>
      ;
    </div>
  );
};

export default CanvasWrapper;
