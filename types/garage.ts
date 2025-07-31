import type { PartMeta } from "@/store/useGarageStore";

export const partsTypes = [
  "Body",
  "Bonnet",
  "Bumper",
  "Wheel",
  "Head light",
  "Tail lamp",
  "Roof carrier",
  "Spoiler",
  "Pattern",
] as const;

export type PartsType = (typeof partsTypes)[number];

export type WheelProps = {
  carType: "XM3" | "SM6" | "QM6";
  bumperMeta?: Pick<PartMeta, "theme" | "variant">;
};
