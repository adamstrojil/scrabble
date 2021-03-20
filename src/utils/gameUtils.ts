import { Letter } from "../types";

export const createLetter = (letter: string, canMove: boolean): Letter => {
  const baseValue = letter === "" ? 0 : 1;

  return {
    letter,
    canMove,
    baseValue,
    currentValue: baseValue,
  };
};