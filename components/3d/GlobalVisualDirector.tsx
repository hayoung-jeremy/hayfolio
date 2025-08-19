"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { EffectComposer, Bloom, SMAA } from "@react-three/postprocessing";
import { Color, HalfFloatType, MathUtils } from "three";

import useDisplay from "@/hooks/useDisplay";
import { useSceneStore } from "@/store/useSceneStore";
import { DESKTOP, MOBILE, ENV_RES, HDR, type VisualPreset, type VisualSceneKey } from "@/constants/visuals";

function LightformerSet({ type, intensityBoost = 1 }: { type: "xp" | "garage" | "none"; intensityBoost?: number }) {
  if (type === "none") return null;
  if (type === "xp") {
    return (
      <group rotation={[0, 0, 1]}>
        <Lightformer form="circle" intensity={0.6 * intensityBoost} scale={20} onUpdate={s => s.lookAt(0, 0, 0)} />
        <Lightformer
          color="#536677"
          intensity={1.2 * intensityBoost}
          onUpdate={s => s.lookAt(0, 0, 0)}
          position={[-5, 1, -4]}
          rotation-y={Math.PI / 2}
          scale={[50, 10, 1]}
        />
        <Lightformer
          intensity={0.1 * intensityBoost}
          onUpdate={s => s.lookAt(0, 0, 0)}
          position={[10, 1, 0]}
          rotation-y={-Math.PI / 2}
          scale={[50, 10, 1]}
        />
        <Lightformer
          color="#7e7e7e"
          intensity={0.2 * intensityBoost}
          onUpdate={s => s.lookAt(0, 0, 0)}
          position={[0, 1, 0]}
          scale={[10, 100, 1]}
        />
      </group>
    );
  }
  return (
    <>
      <Lightformer intensity={1.2 * intensityBoost} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
      <Lightformer intensity={1.2 * intensityBoost} rotation-x={Math.PI / 2} position={[0, 4, -6]} scale={[10, 1, 1]} />
      <Lightformer intensity={1.2 * intensityBoost} rotation-x={Math.PI / 2} position={[0, 4, -3]} scale={[10, 1, 1]} />
      <Lightformer intensity={1.2 * intensityBoost} rotation-x={Math.PI / 2} position={[0, 4, 0]} scale={[10, 1, 1]} />
      <Lightformer intensity={1.2 * intensityBoost} rotation-x={Math.PI / 2} position={[0, 4, 3]} scale={[10, 1, 1]} />
      <Lightformer intensity={1.2 * intensityBoost} rotation-x={Math.PI / 2} position={[0, 4, 6]} scale={[10, 1, 1]} />
      <Lightformer intensity={1.2 * intensityBoost} rotation-x={Math.PI / 2} position={[0, 4, 9]} scale={[10, 1, 1]} />
      <Lightformer
        intensity={1.2 * intensityBoost}
        rotation-y={Math.PI / 2}
        position={[-50, 2, 0]}
        scale={[100, 2, 1]}
      />
      <Lightformer
        intensity={1.2 * intensityBoost}
        rotation-y={-Math.PI / 2}
        position={[50, 2, 0]}
        scale={[100, 2, 1]}
      />
    </>
  );
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * MathUtils.clamp(t, 0, 1);

export default function GlobalVisualDirector() {
  const { gl, scene } = useThree();
  const { isMobile } = useDisplay();
  const currentScene = useSceneStore(s => s.currentScene) as VisualSceneKey | "none";

  const preset = useMemo<VisualPreset>(() => {
    const key: VisualSceneKey = (
      ["home", "garage preview", "garage", "xperiencemor3 preview", "xperiencemor3"] as const
    ).includes(currentScene as VisualSceneKey)
      ? (currentScene as VisualSceneKey)
      : "home";
    return (isMobile ? MOBILE : DESKTOP)[key];
  }, [currentScene, isMobile]);

  const exp = useRef(preset.env.exposure);
  const targetExp = useRef(preset.env.exposure);
  const bg = useRef(new Color(preset.env.background));
  const targetBg = useRef(new Color(preset.env.background));

  const bloomParams = useRef({ ...preset.postfx.bloom });
  const targetBloom = useRef({ ...preset.postfx.bloom });

  useEffect(() => {
    targetExp.current = preset.env.exposure;
    targetBg.current.set(preset.env.background);
    targetBloom.current = { ...preset.postfx.bloom };
  }, [preset]);

  useFrame((_, dt) => {
    const k = Math.min(1, dt * 4);
    exp.current = lerp(exp.current, targetExp.current, k);
    gl.toneMappingExposure = exp.current;

    bg.current.lerp(targetBg.current, k);
    scene.background = bg.current;

    const b = bloomParams.current;
    const tb = targetBloom.current;
    b.intensity = lerp(b.intensity, tb.intensity, k * 0.75);
    b.threshold = lerp(b.threshold, tb.threshold, k * 0.75);
    b.smoothing = lerp(b.smoothing, tb.smoothing, k * 0.75);
    b.radius = tb.radius ?? b.radius;
    b.kernelSize = tb.kernelSize ?? b.kernelSize;
    b.resolutionScale = lerp(b.resolutionScale, tb.resolutionScale, k * 0.75);
    b.multisampling = tb.multisampling;
    b.smaa = tb.smaa;
    b.on = tb.on;
  });

  const useHDR = preset.env.kind === "hdr";
  const envFiles = preset.env.hdrUrl ?? HDR.XP_1K;

  return (
    <>
      {/* Environment */}
      {useHDR ? (
        <Environment files={envFiles} frames={1} resolution={isMobile ? ENV_RES.MOBILE : ENV_RES.PC}>
          <group />
        </Environment>
      ) : (
        <Environment frames={1} resolution={isMobile ? ENV_RES.MOBILE : ENV_RES.PC}>
          <LightformerSet type={preset.env.lightformer} intensityBoost={isMobile ? 1.15 : 1.0} />
        </Environment>
      )}

      {/* PostFX */}
      <EffectComposer
        multisampling={0}
        resolutionScale={bloomParams.current.resolutionScale}
        enableNormalPass={false}
        frameBufferType={HalfFloatType}
      >
        <SMAA enabled={!!bloomParams.current.smaa} />
        <Bloom
          enabled={!!bloomParams.current.on}
          intensity={bloomParams.current.intensity}
          luminanceThreshold={bloomParams.current.threshold}
          luminanceSmoothing={bloomParams.current.smoothing}
          mipmapBlur
          radius={bloomParams.current.radius ?? 0.2}
        />
      </EffectComposer>
    </>
  );
}
