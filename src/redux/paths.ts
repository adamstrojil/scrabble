import { StoreState } from "../types/StoreState";

export const pathToBoard = (state: StoreState) =>
  state.board;

export const pathToStand = (state: StoreState) =>
  state.stand;
