import { all, put, PutEffect, select, takeEvery } from 'redux-saga/effects';
import {
  noteDeleteDataProcessor,
  noteGetDataProcessor,
  notePostDataProcessor,
  notePutDataProcessor
} from '../../reducers/note/index';
import { NOTE_SAVE, NoteSaveAction } from '../../reducers/note/types';
import { FormAction, initialize } from 'redux-form';
import { makeSelectorFormData, NOTE_DETAIL_FORM } from '../../utils/forms';
import { Item } from '../../types';
import { PayloadAction } from '../../utils/types';
import { push, RouterAction } from 'react-router-redux';
import { PATHS } from '../../utils/paths';

function* saveNoteSaga(action: NoteSaveAction) {
  const { id } = action;
  const formData: Item = yield select(makeSelectorFormData(NOTE_DETAIL_FORM));
  if (id === undefined) {
    yield put(notePostDataProcessor.creators.createFetchDataAction(formData));
  } else {
    yield put(notePutDataProcessor.creators.createFetchDataAction(formData));
  }
}

function* getSucNoteSaga(
  action: PayloadAction<Item>
): Generator<PutEffect<FormAction>> {
  yield put(initialize(NOTE_DETAIL_FORM, action.payload));
}

function* deleteSucNoteSaga(): Generator<PutEffect<RouterAction>> {
  yield put(push(PATHS.ROOT));
}

function* postSucNoteSaga(
  action: PayloadAction<Item>
): Generator<PutEffect<RouterAction>> {
  yield put(push(PATHS.makeNoteId(action.payload.id)));
}

function* getClearDataSaga(): Generator<PutEffect<FormAction>> {
  yield put(initialize(NOTE_DETAIL_FORM, {}));
}

export function* noteSaga() {
  yield all([
    noteGetDataProcessor.saga(),
    noteDeleteDataProcessor.saga(),
    notePostDataProcessor.saga(),
    notePutDataProcessor.saga(),
    takeEvery(NOTE_SAVE, saveNoteSaga),
    takeEvery(noteGetDataProcessor.actions.fetchSuc, getSucNoteSaga),
    takeEvery(noteGetDataProcessor.actions.clearData, getClearDataSaga),
    takeEvery(notePostDataProcessor.actions.fetchSuc, postSucNoteSaga),
    takeEvery(noteDeleteDataProcessor.actions.fetchSuc, deleteSucNoteSaga)
  ]);
}
