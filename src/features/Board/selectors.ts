import { BoardType, Bonus } from '../../types';
import {
  BoardState,
} from './reducer';


export const boardFields = (
  state: BoardState,
): BoardType => state.boardFields;

export const multipliers = (
  state: BoardState,
): Array<Bonus | null> => state.multipliers;

