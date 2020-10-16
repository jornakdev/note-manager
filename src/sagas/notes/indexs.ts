import { all, AllEffect, ForkEffect } from 'redux-saga/effects';
import { notesDataProcessor } from '../../reducers/notes/index';

export function* notesSaga(): Generator<AllEffect<ForkEffect<any>>> {
  yield all([notesDataProcessor.saga()]);
}
