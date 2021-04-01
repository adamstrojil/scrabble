import { BoardType, Bonus, Letter } from "../../types";
import { createLetter } from "../../utils/gameUtils";
import { BoardAction } from "./actions";

export type BoardState = {
  boardFields: Array<Letter>;
  multipliers: Array<Bonus | null>;
  width: number;
  height: number;
};

const dbl = [4, 43, 82];
const tpl = [5, 48, 90];
const tpw = [50, 31, 99];
const dbw = [
  0,
  2,
  12,
  44,
  224,
  210,
  30,
  55,
  26,
  80,
  100,
  222,
  14,
  194,
  212,
  180,
];

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

const indexNotInPreviousRow = (index: number, boardWidth: number) =>
  index >= 0 && index % boardWidth !== boardWidth - 1;

const indexNotInNextRow = (index: number, boardWidth: number) =>
  index < 255 && index % boardWidth !== 0;

const fieldContainsLetter = (index: number, fields: Array<Letter>) =>
  fields[index]?.letter !== "";

const isValidIndex = (index: number, array: Array<any>) =>
  index >= 0 && index < array.length;

const wordMultiplyBonusFromLeft = (
  fields: Array<Letter>,
  currentIndex: number,
  boardWidth: number
): number => {
  let multiplierFromLeft = 1;
  currentIndex--;

  while (
    indexNotInPreviousRow(currentIndex, boardWidth) &&
    fieldContainsLetter(currentIndex, fields)
  ) {
    multiplierFromLeft *= dbw.includes(currentIndex)
      ? 2
      : tpw.includes(currentIndex)
      ? 3
      : 1;
    currentIndex--;
  }

  return multiplierFromLeft;
};

const wordMultiplyBonusFromRight = (
  fields: Array<Letter>,
  currentIndex: number,
  boardWidth: number
): number => {
  let multiplierFromRight = 1;
  currentIndex++;

  while (
    indexNotInNextRow(currentIndex, boardWidth) &&
    fieldContainsLetter(currentIndex, fields)
  ) {
    multiplierFromRight *= dbw.includes(currentIndex)
      ? 2
      : tpw.includes(currentIndex)
      ? 3
      : 1;
    currentIndex++;
  }

  return multiplierFromRight;
};

const wordMultiplyBonusFromAbove = (
  fields: Array<Letter>,
  currentIndex: number,
  boardWidth: number
): number => {
  let multiplierFromAbove = 1;
  currentIndex -= boardWidth;

  while (
    isValidIndex(currentIndex, fields) &&
    fieldContainsLetter(currentIndex, fields)
  ) {
    multiplierFromAbove *= dbw.includes(currentIndex)
      ? 2
      : tpw.includes(currentIndex)
      ? 3
      : 1;
    currentIndex -= boardWidth;
  }

  return multiplierFromAbove;
};

const wordMultiplyBonusFromBelow = (
  fields: Array<Letter>,
  currentIndex: number,
  boardWidth: number
): number => {
  let multiplierFromBelow = 1;
  currentIndex += boardWidth;

  while (
    isValidIndex(currentIndex, fields) &&
    fieldContainsLetter(currentIndex, fields)
  ) {
    multiplierFromBelow *= dbw.includes(currentIndex)
      ? 2
      : tpw.includes(currentIndex)
      ? 3
      : 1;
    currentIndex += boardWidth;
  }

  return multiplierFromBelow;
};
