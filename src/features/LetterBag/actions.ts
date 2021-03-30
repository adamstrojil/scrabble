import { Letter } from "../../types";

export type LetterBagAction =
  | removeFirstLetterFromLetterBagAction
  | ResetLetterBagAction;

export type removeFirstLetterFromLetterBagAction = {
  type: "LETTER_BAG.REMOVE_FIRST_LETTER";
};
export type ResetLetterBagAction = {
  type: "LETTER_BAG.RESET";
};

export const removeFirstLetterFromLetterBag = (
): removeFirstLetterFromLetterBagAction => ({
  type: "LETTER_BAG.REMOVE_FIRST_LETTER",
});

export const resetLetterBag = (): ResetLetterBagAction => ({
  type: "LETTER_BAG.RESET",
});
