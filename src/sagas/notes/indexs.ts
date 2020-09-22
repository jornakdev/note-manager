import {all} from 'redux-saga/effects'
import {notesDataProcessor} from "../../reducers/notes/index";


export function* notesSaga() {
    yield all([
        notesDataProcessor.saga(),
    ])
}