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
