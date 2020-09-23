import { all, AllEffect } from 'redux-saga/effects';
import { notesDataProcessor } from '../../reducers/notes/index';

export function* notesSaga(): Generator<AllEffect<Array<any>>> {
  yield all([notesDataProcessor.saga()]);
}
