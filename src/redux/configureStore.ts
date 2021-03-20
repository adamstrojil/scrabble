import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { StoreState } from "../types/StoreState";

import { configureReducer } from "./reducer";
import watchersRootSaga from "./sagas";

const { reducer } = configureReducer();

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watchersRootSaga)