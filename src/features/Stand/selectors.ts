import { BoardType } from '../../types';
import {
  StandState,
} from './reducer';

export const fields = (
  state: StandState,
): BoardType => state.fields;

