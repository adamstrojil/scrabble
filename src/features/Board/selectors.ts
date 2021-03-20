import { BoardType } from '../../types';
import {
  BoardState,
} from './reducer';


export const boardFields = (
  state: BoardState,
): BoardType => state.boardFields;

// export const standFields = (
//   state: BoardState,
// ): BoardType => state.standFields;

