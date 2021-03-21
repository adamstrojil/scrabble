import { BoardType, Bonus, Letter } from "../../types";
import { createLetter } from "../../utils/gameUtils";
import { addLetterToBoard, BoardAction } from "./actions";
import { boardFields } from "./selectors";

export type BoardState = {
  boardFields: Array<Letter>;
  multipliers: Array<Bonus | null>;
};

const dbl = [4, 42, 82];
const dbw = [0, 2, 224, 210, 30, 55, 26, 80, 100, 222, 14];

const defaultState: BoardState = {
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
// const valueAfterDBL = dbl.includes(index)
//   ? letter.baseValue * 2
//   : letter.baseValue;

const newLetterValue = (
  boardFields: Array<Letter>,
  letter: Letter,
  index: number
): number => {
  if (dbw.includes(index)) {
    return letter.baseValue * 2;
  }

  let total = 0;

  // check for double letter
  total += dbl.includes(index) ? letter.baseValue * 2 : letter.baseValue;

  let checkingIndex: number = index;

  //Checking row to right
  checkingIndex = index;
  while (checkingIndex % 15 !== 0 && boardFields[checkingIndex].letter !== "") {
    total = dbw.includes(checkingIndex) ? (total *= 2) : total;
    checkingIndex++;
  }

  //checking row to left
  checkingIndex = index;
  while (
    (checkingIndex + 1) % 15 !== 0 &&
    boardFields[checkingIndex].letter !== ""
  ) {
    total = dbw.includes(checkingIndex) ? (total *= 2) : total;
    checkingIndex--;
  }

  //checking column up
  checkingIndex = index;
  while (checkingIndex >= 0 && boardFields[checkingIndex].letter !== "") {
    total = dbw.includes(checkingIndex) ? (total *= 2) : total;
    checkingIndex -= 15;
  }

  //checking column down
  checkingIndex = index;
  while (checkingIndex <= 224 && boardFields[checkingIndex].letter !== "") {
    total = dbw.includes(checkingIndex) ? (total *= 2) : total;
    checkingIndex += 15;
  }

  return total;
};
