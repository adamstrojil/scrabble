import { BoardType, Letter } from "../../types";
import { createLetter } from "../../utils/gameUtils";
import { StandAction } from "./actions";

export type StandState = {
  fields: Array<Letter>;
};

const defaultState: StandState = {
  fields: [
    createLetter("Y", 2, true),
    createLetter("Z", 2, true),
    createLetter("Č", 2, true),
    createLetter("I", 2, true),
    createLetter("K", 2, true),
    createLetter("O", 2, true),
    createLetter("K", 2, true),
  ],
};

export const standReducer = function (
  state: StandState = defaultState,
  action: StandAction
) {
  switch (action.type) {
    case "STAND.ADD_LETTER": {
      return {
        ...state,
        fields: state.fields.map((letter, index) => {
          return index === action.payload.coordinate
            ? action.payload.letter
            : letter;
        }),
      };
    }
    case "STAND.REMOVE_LETTER": {
      return {
        ...state,
        fields: state.fields.map((letter, index) => {
          return index === action.payload.coordinate
            ? createLetter("", 0, false)
            : letter;
        }),
      };
    }
    default: {
      return state;
    }
  }
};
