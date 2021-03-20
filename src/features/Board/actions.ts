import { Letter } from "../../types";

export type BoardAction =
  | RemoveLeterFromBoardAction
  | AddLetterToBoardAction
  | LockLettersOnBoardAction
  | UpdateLetterValuesAction;

export type RemoveLeterFromBoardAction = {
  type: "BOARD.REMOVE_LETTER";
  payload: {
    coordinate: number;
  };
};

export type AddLetterToBoardAction = {
  type: "BOARD.ADD_LETTER";
  payload: {
    coordinate: number;
    letter: Letter;
  };
};

export type LockLettersOnBoardAction = {
  type: "BOARD.LOCK_LETTERS";
};

export type UpdateLetterValuesAction = {
  type: "BOARD.UPDATE_LETTER_VALUES";
};

export const removeLetterFromBoard = (
  coordinate: number
): RemoveLeterFromBoardAction => ({
  type: "BOARD.REMOVE_LETTER",
  payload: {
    coordinate,
  },
});

export const lockLettersOnBoard = (): LockLettersOnBoardAction => ({
  type: "BOARD.LOCK_LETTERS",
});

export const updateLetterValues = (): UpdateLetterValuesAction => ({
  type: "BOARD.UPDATE_LETTER_VALUES",
});

export const addLetterToBoard = (
  coordinate: number,
  letter: Letter
): AddLetterToBoardAction => ({
  type: "BOARD.ADD_LETTER",
  payload: {
    coordinate,
    letter,
  },
});
