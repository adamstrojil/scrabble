import { BoardType, Bonus, Letter } from "../../types";
import { createLetter } from "../../utils/gameUtils";
import { BoardAction } from "./actions";

export type BoardState = {
  boardFields: Array<Letter>;
  multipliers: Array<Bonus | null>;
  width: number,
  height: number,
};

const dbl = [4, 42, 82];
const tpl = [5, 48, 90];
const tpw = [50, 31, 99];
const dbw = [0, 2, 224, 210, 30, 55, 26, 80, 100, 222, 14];

const defaultState: BoardState = {
  width: 15,
  height: 15,
  boardFields: [...Array(225).fill(createLetter("", 0, false))],
  multipliers: [
    ...Array(225)
      .fill(false)
      .map((field, index) => {
        //TODO move to utils
        return dbl.includes(index)
          ? "double-letter"
          : dbw.includes(index)
          ? "double-word"
          : tpl.includes(index)
          ? "triple-letter"
          : tpw.includes(index)
          ? "triple-word"
          : null;
      }),
  ],

};

export const boardReducer = function (
  state: BoardState = defaultState,
  action: BoardAction
) {
  switch (action.type) {
    case "BOARD.ADD_LETTER": {
      return {
        ...state,
        boardFields: state.boardFields.map((letter, index) => {
          return index === action.payload.coordinate
            ? action.payload.letter
            : letter;
        }),
      };
    }
    case "BOARD.REMOVE_LETTER": {
      return {
        ...state,
        boardFields: state.boardFields.map((letter, index) => {
          return index === action.payload.coordinate
            ? createLetter("", 0, false)
            : letter;
        }),
      };
    }
    case "BOARD.LOCK_LETTERS": {
      return {
        ...state,
        boardFields: state.boardFields.map((letter) => ({
          ...letter,
          canMove: false,
        })),
      };
    }
    case "BOARD.UPDATE_LETTER_VALUES": {
      console.log("Board values re-calculated");
      return {
        ...state,
        boardFields: state.boardFields.map((letter, index) => ({
          ...letter,
          currentValue: newLetterValue(state.boardFields, letter, index),
        })),
      };
    }
    default: {
      return state;
    }
  }
};

const newLetterValue = (
  boardFields: Array<Letter>,
  letter: Letter,
  index: number
): number => {
  const currentLetterMultiplier =
    dbl.includes(index) || dbw.includes(index)
      ? 2
      : tpl.includes(index) || tpw.includes(index)
      ? 3
      : 1;

  const lettersInRangeMultiplier =
    wordMultiplyBonusFromLeft(boardFields, index, 15) *
    wordMultiplyBonusFromRight(boardFields, index, 15) *
    wordMultiplyBonusFromAbove(boardFields, index, 15) *
    wordMultiplyBonusFromBelow(boardFields, index, 15);

  const totalMultiplier = currentLetterMultiplier * lettersInRangeMultiplier;

  return letter.baseValue * totalMultiplier;
};

const wordMultiplyBonusFromLeft = (
  fields: Array<Letter>,
  currentIndex: number,
  boardWidth: number
): number => {
  if (currentIndex % boardWidth === 0)
    return dbw.includes(currentIndex) ? 2 : tpw.includes(currentIndex) ? 3 : 1;

  let checkingIndex = currentIndex - 1;
  let total = 1;
  while (
    checkingIndex % boardWidth !== 0 &&
    fields[checkingIndex].letter !== ""
  ) {
    total *= dbw.includes(checkingIndex)
      ? 2
      : tpw.includes(checkingIndex)
      ? 3
      : 1;
    checkingIndex--;
  }

  return total;
};

const wordMultiplyBonusFromRight = (
  fields: Array<Letter>,
  currentIndex: number,
  boardWidth: number
): number => {
  if (currentIndex % boardWidth === boardWidth - 1)
    return dbw.includes(currentIndex) ? 2 : tpw.includes(currentIndex) ? 3 : 1;

  let checkingIndex = currentIndex + 1;
  let total = 1;

  while (
    checkingIndex % boardWidth !== 0 &&
    fields[checkingIndex].letter !== ""
  ) {
    total *= dbw.includes(checkingIndex)
      ? 2
      : tpw.includes(checkingIndex)
      ? 3
      : 1;
    checkingIndex++;
  }

  return total;
};

const wordMultiplyBonusFromAbove = (
  fields: Array<Letter>,
  currentIndex: number,
  boardHeight: number
): number => {
  if (currentIndex < 15)
    return dbw.includes(currentIndex) ? 2 : tpw.includes(currentIndex) ? 3 : 1;

  let checkingIndex = currentIndex - boardHeight;
  let total = 1;

  while (checkingIndex >= 0 && fields[checkingIndex].letter !== "") {
    total *= dbw.includes(checkingIndex)
      ? 2
      : tpw.includes(checkingIndex)
      ? 3
      : 1;
    checkingIndex -= boardHeight;
  }

  return total;
};

const wordMultiplyBonusFromBelow = (
  fields: Array<Letter>,
  currentIndex: number,
  boardHeight: number
): number => {
  // if (currentIndex > 15*boardHeight-15)
  if (currentIndex > 208)
    return dbw.includes(currentIndex) ? 2 : tpw.includes(currentIndex) ? 3 : 1;

  let checkingIndex = currentIndex + boardHeight ;
  let total = 1;

  while (checkingIndex <= 0 && fields[checkingIndex].letter !== "") {
    total *= dbw.includes(checkingIndex)
      ? 2
      : tpw.includes(checkingIndex)
      ? 3
      : 1;
    checkingIndex += boardHeight;
  }

  return total;
};
