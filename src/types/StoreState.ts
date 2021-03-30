import { BoardState } from "../features/Board/reducer";
import { LetterBagState } from "../features/LetterBag/reducer";
import { StandState } from "../features/Stand/reducer";

export type StoreState = {
  board: BoardState;
  stand: StandState;
  letterBag: LetterBagState;
}