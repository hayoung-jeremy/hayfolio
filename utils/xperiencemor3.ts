import { GAME_RESULT_COLLECTION } from "@/constants/xperiencemor3";
import { GameResult, Keywords } from "@/store/useXperiencemor3GameStore";

const VALID_CHOICES: Set<Keywords> = new Set([
  "Electric",
  "Analog",
  "Sporty",
  "Elegant",
  "Dynamic",
  "Calm",
  "Technology",
  "Nature",
]);

export function getResultForCombinationFromSelections(choices: Keywords[]): GameResult | null {
  const valid = choices.filter(c => VALID_CHOICES.has(c));
  if (valid.length !== 4) return null;

  const key = valid.join(",");
  return GAME_RESULT_COLLECTION[key] ?? null;
}
