import { Letter } from '../../types';
import {
  LetterBagState,
} from './reducer';

export const letters = (
  state: LetterBagState,
): Array<Letter> => state.letters;

export const firstLetter = (
  state: LetterBagState,
): Letter => state.letters[0];

