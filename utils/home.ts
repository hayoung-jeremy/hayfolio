import { PREVIEW_SECTIONS, type PreviewConfig } from "@/constants/previewSection";

export type PreviewKey = PreviewConfig["key"]; // "garage" | "xm3" | "clarins" | "ai"

export function getActivePreviewSection(progress: number): PreviewConfig | null {
  const firstMin = PREVIEW_SECTIONS[0].range.min;
  const lastMax = PREVIEW_SECTIONS[PREVIEW_SECTIONS.length - 1].range.max;
  if (progress < firstMin || progress >= lastMax) return null;

  for (const s of PREVIEW_SECTIONS) {
    if (progress >= s.range.min && progress < s.range.max) return s;
  }
  return null;
}
