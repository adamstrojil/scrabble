import { Letter } from "../types";

export const createLetter = (
  letter: string,
  value: number,
  canMove: boolean,
): Letter => {
  return {
    letter,
    canMove,
    baseValue: letter === "" ? 0 : value,
    currentValue: value,
  };
};
