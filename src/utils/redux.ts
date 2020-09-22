import {createStore, applyMiddleware,compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import createRootReducer from '../reducers'
import saga from '../sagas'


const sagaMiddleware = createSagaMiddleware()
export const history = createBrowserHistory()
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    createRootReducer(history),
    composeEnhancers(applyMiddleware(routerMiddleware(history),sagaMiddleware))
)
export type RootState = ReturnType<typeof store.getState>
sagaMiddleware.run(saga)