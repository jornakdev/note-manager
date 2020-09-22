import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { connectRouter } from 'connected-react-router'
import notes from './notes'
import note from './note'
import locale from './locale'
import {History, LocationState} from "history";

const rootReducer = (history:History<LocationState>) => combineReducers({
    notes,
    note,
    locale,
    form: formReducer,
    router: connectRouter(history)
})

export default rootReducer
