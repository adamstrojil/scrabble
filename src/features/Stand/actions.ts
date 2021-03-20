import { Letter } from "../../types";

export type StandAction =
  | RemoveLeterFromStandAction
  | AddLeterToStandAction;

export type RemoveLeterFromStandAction = {
  type: "STAND.REMOVE_LETTER";
  payload: {
    coordinate: number;
  };
};

export type AddLeterToStandAction = {
  type: "STAND.ADD_LETTER";
  payload: {
    coordinate: number;
    letter: Letter;
  };
};

export const removeLetterFromStand = (
  coordinate: number
): RemoveLeterFromStandAction => ({
  type: "STAND.REMOVE_LETTER",
  payload: {
    coordinate,
  },
});

export const addLeterToStand = (
  coordinate: number,
  letter: Letter
): AddLeterToStandAction => ({
  type: "STAND.ADD_LETTER",
  payload: {
    coordinate,
    letter,
  },
});
