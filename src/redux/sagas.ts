import { Action } from 'redux';
import { put, take, all, takeEvery, takeLatest } from 'redux-saga/effects'

import { updateLetterValues } from '../features/Board/actions';

function* updateLetterValuesWorkerSaga(){
  console.log('updateLetterValuesWorkerSaga!')

  yield put({type: "BOARD.UPDATE_LETTER_VALUES"})
}

export function* updateLetterValuesWatcherSaga() {
  console.log('updateLetterValuesWatcherSaga!')
  
  yield takeLatest('BOARD.ADD_LETTER', updateLetterValuesWorkerSaga);
}


export function* helloSaga() {
  console.log('Hello Sagas!')
}

// Register all your watchers
export default function* watchersRootSaga() {
  yield all ([
    updateLetterValuesWatcherSaga(),
    helloSaga()
  ])
}