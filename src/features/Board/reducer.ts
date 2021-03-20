import { BoardType, Letter } from "../../types";
import { createLetter } from "../../utils/gameUtils";
import { BoardAction } from "./actions";

export type BoardState = {
  boardFields: BoardType;
};

const defaultState: BoardState = {
  boardFields: [
    ...Array(224).fill(createLetter("", false)),
    createLetter("A", true),
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
            ? createLetter("", false)
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
      return state;
    }
    default: {
      console.log("Board def");
      return state;
    }
  }
};
