import { combineReducers } from "redux";

import { boardReducer } from "../features/Board/reducer";
import { standReducer } from "../features/Stand/reducer";
import { StoreState } from "../types/StoreState";

const REDUCERS = {
  board: boardReducer,
  stand: standReducer,
};

export const configureReducer = (): {
  reducer: any;
} => {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const rootReducer = combineReducers<StoreState | undefined>(REDUCERS as any);

  return { reducer: rootReducer };
};
