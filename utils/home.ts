import { SCROLL_THRESHOLDS as T } from "@/constants/scrollThresholds";

export type PreviewSection = "garage" | "xm3" | "clarins" | "ai" | null;

type Range = { key: Exclude<PreviewSection, null>; min: number; max: number };

export function getActivePreviewSection(progress: number): PreviewSection {
  const garageMax = T.createYourEpicCar.max ?? T.xperiencemor3.min ?? 1;
  const xm3Max = T.xperiencemor3.max ?? T.clarins?.min ?? 1;
  const clarinsMax = T.clarins.max ?? T.ai?.min ?? 1;
  const aiMax = Math.min(T.ai.max ?? 0.9999, 0.9999);

  const ranges: Range[] = [
    { key: "garage", min: T.createYourEpicCar.min, max: garageMax },
    { key: "xm3", min: T.xperiencemor3.min, max: xm3Max },
    { key: "clarins", min: T.clarins.min, max: clarinsMax },
    { key: "ai", min: T.ai.min, max: aiMax },
  ];

  const firstMin = ranges[0].min;
  const lastMax = ranges[ranges.length - 1].max;
  if (progress < firstMin) return null;
  if (progress >= lastMax) return null;

  for (const r of ranges) {
    if (progress >= r.min && progress <= r.max) return r.key;
  }
  return null;
}
