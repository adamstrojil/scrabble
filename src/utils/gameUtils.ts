import { Letter } from "../types";

export const createLetter = (
  letter: string,
  value: number,
  canMove: boolean
): Letter => {
  return {
    letter,
    canMove,
    baseValue: letter === "" ? 0 : value,
    currentValue: value,
  };
};

export const shuffleLetters = (letters: Array<Letter>): Array<Letter> => {
  const lettersCopy = [...letters];

  for (let i = lettersCopy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [lettersCopy[i], lettersCopy[j]] = [lettersCopy[j], lettersCopy[i]];
  }

  return lettersCopy;
};
