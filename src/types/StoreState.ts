import { BoardState } from "../features/Board/reducer";
import { StandState } from "../features/Stand/reducer";

export type StoreState = {
  board: BoardState;
  stand: StandState;
}