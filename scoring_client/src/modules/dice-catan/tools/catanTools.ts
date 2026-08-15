import {CatanDieColor} from "../type/CatanDieColor.ts";

export function isBarbarianShip(roll: number): boolean {
  return getCatanDieColor(roll) === CatanDieColor.Black;
}

export function getCatanDieColor(roll: number): CatanDieColor {
  switch (roll) {
    case 4:
      return CatanDieColor.Blue;
    case 5:
      return CatanDieColor.Green;
    case 6:
      return CatanDieColor.Yellow;
    default:
      return CatanDieColor.Black;
  }
}

