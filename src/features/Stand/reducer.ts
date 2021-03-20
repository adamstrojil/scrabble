import { BoardType, Letter } from "../../types";
import { createLetter } from "../../utils/gameUtils";
import { StandAction } from "./actions";

export type StandState = {
  fields: Array<Letter>;
};

const defaultState: StandState = {
  fields: [
    createLetter("O", true),
    createLetter("Z", true),
    createLetter("I", true),
    createLetter("U", true),
    createLetter("K", true),
    createLetter("Y", true),
    createLetter("", false),
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
            ? createLetter("", false)
            : letter;
        }),
      };
    }
    default: {
      console.log("Stand def");

      return state;
    }
  }
};
