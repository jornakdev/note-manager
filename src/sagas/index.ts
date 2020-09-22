import {all} from 'redux-saga/effects'
import {notesSaga} from "./notes/indexs";
import {noteSaga} from "./note/index";

export default function* rootSaga() {
    yield all([
        notesSaga(),
        noteSaga()
    ])
}