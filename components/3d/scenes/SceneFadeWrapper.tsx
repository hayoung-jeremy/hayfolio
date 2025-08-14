"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import { Group, Mesh, LineSegments, Points, Material } from "three";
import { gsap } from "gsap";

interface SceneFadeWrapperProps {
  children: ReactNode;
  inDuration?: number;
  outDuration?: number;
}

type Fadeable = Mesh | LineSegments | Points;

const SceneFadeWrapper = ({ children, inDuration = 1.0, outDuration = 0.8 }: SceneFadeWrapperProps) => {
  const ref = useRef<Group>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const group = ref.current;
    if (!group) return;

    // 현재 씬에 포함된 머티리얼 수집
    const materials: Material[] = [];
    const collect = (m: Material | Material[] | undefined) => {
      if (!m) return;
      if (Array.isArray(m)) m.forEach(mm => mm && materials.push(mm));
      else materials.push(m);
    };

    group.traverse(obj => {
      const o = obj as Fadeable;
      // Mesh/Line/Points 전부 처리
      if (o.material) collect(o.material);
    });

    // 원본 값 저장: userData._baseOpacity / _wasTransparent / _baseDepthWrite
    materials.forEach(m => {
      const ud = (m.userData ||= {});
      if (ud._baseOpacity == null) ud._baseOpacity = (m as any).opacity ?? 1;
      if (ud._wasTransparent == null) ud._wasTransparent = (m as any).transparent === true;
      if (ud._baseDepthWrite == null) ud._baseDepthWrite = (m as any).depthWrite ?? true;
    });

    // 래퍼 알파 상태
    const state = { a: 0 };

    // 기존 트윈/타겟 깨끗이
    if (tweenRef.current) tweenRef.current.kill();
    gsap.killTweensOf(state);

    // 페이드인: baseOpacity * a
    tweenRef.current = gsap.to(state, {
      a: 1,
      duration: inDuration,
      ease: "power2.out",
      onUpdate: () => {
        materials.forEach(m => {
          const ud = m.userData as any;
          const base = ud._baseOpacity ?? 1;
          const hasOpacity = "opacity" in (m as any);
          if (hasOpacity) {
            (m as any).transparent = true;
            (m as any).depthWrite = false;
            (m as any).opacity = base * state.a;
            (m as any).needsUpdate = true;
          }
        });
      },
      onComplete: () => {
        materials.forEach(m => {
          const ud = m.userData as any;
          // 완전 표시 상태 도달 시 원래 depthWrite 복구
          (m as any).depthWrite = ud._baseDepthWrite ?? true;
          // 원래 투명 상태가 아니었고 baseOpacity===1이면 transparent 끔
          const base = ud._baseOpacity ?? 1;
          if (!ud._wasTransparent && base >= 1) {
            (m as any).transparent = false;
            (m as any).opacity = 1;
          }
        });
      },
    });

    return () => {
      if (tweenRef.current) tweenRef.current.kill();
      gsap.killTweensOf(state);
      materials.forEach(m => {
        const ud = m.userData as any;
        (m as any).opacity = ud?._baseOpacity ?? 1;
        (m as any).transparent = ud?._wasTransparent ?? false;
        (m as any).depthWrite = ud?._baseDepthWrite ?? true;
        (m as any).needsUpdate = true;
      });
    };
  }, [inDuration, outDuration]);

  return <group ref={ref}>{children}</group>;
};

export default SceneFadeWrapper;
