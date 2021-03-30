import { Letter } from "../../types";
import { createLetter, shuffleLetters } from "../../utils/gameUtils";
import { LetterBagAction } from "./actions";
import { letters } from "./selectors";

export type LetterBagState = {
  letters: Array<Letter>;
};

type LetterInfo = { letter: string; value: number; count: number };

const blueprint: LetterInfo[] = [
  { letter: "A", value: 1, count: 6 },
  { letter: "B", value: 2, count: 1 },
  { letter: "C", value: 3, count: 3 },
];

const generateBag = (blueprint: LetterInfo[]) => {
  const letters: Letter[] = [];

  blueprint.forEach(({ count, letter, value }: LetterInfo) => {
    for (let i = 0; i < count; i++) {
      letters.push(createLetter(letter, value, true));
    }
  });

  return letters;
};

// const lett: Array<Letter> = [
//   createLetter("Y", 2, true),
//   createLetter("Z", 2, true),
//   createLetter("Č", 2, true),
//   createLetter("I", 2, true),
//   createLetter("K", 2, true),
//   createLetter("O", 2, true),
//   createLetter("K", 2, true),
// ];

const defaultState: LetterBagState = {
  letters: generateBag(blueprint),
};

export const letterBagReducer = function (
  state: LetterBagState = defaultState,
  action: LetterBagAction
) {
  switch (action.type) {
    case "LETTER_BAG.REMOVE_FIRST_LETTER": {
      return {
        ...state,
        letters: state.letters.slice(1),
      };
    }
    case "LETTER_BAG.RESET": {
      return {
        letters: shuffleLetters(defaultState.letters),
      };
    }
    default: {
      return state;
    }
  }
};
