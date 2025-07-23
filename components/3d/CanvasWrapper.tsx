"use client";
import useDisplay from "@/hooks/useDisplay";
import { Canvas } from "@react-three/fiber";

const CanvasWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isDesktop } = useDisplay();
  return (
    <div className="w-screen xl:w-full h-screen">
      <Canvas style={{ touchAction: "pan-y", pointerEvents: isDesktop ? "auto" : "none" }}>{children}</Canvas>
    </div>
  );
};

export default CanvasWrapper;
