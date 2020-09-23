import {
    Action,
    Data,
    DataActions,
    DataActionsFactory,
    DataProcessorFactory,
    Methods,
    PayloadAction,
    Selectors
} from "./types";
import {Reducer} from "react";
import {call, put, takeEvery} from "@redux-saga/core/effects";
import produce, {Draft} from "immer"
import {Produced} from "immer/dist/types/types-external";

function createActions<Req extends Data, Res extends Data>(actionName: string): DataActionsFactory<Req, Res> {
    const actions = {
        clearData: `${actionName}_CLEAR_DATA`,
        clearError: `${actionName}_CLEAR_ERROR`,
        fetch: `${actionName}_FETCH`,
        fetchFail: `${actionName}_FETCH_FAIL`,
        fetchSuc: `${actionName}_FETCH_SUC`,
    }
    return {
        creators: {
            createClearDataAction: () => ({type: actions.clearData}),
            createClearErrorAction: () => ({type: actions.clearError}),
            createFetchDataAction: (data: Req) => ({type: actions.fetch, payload: data}),
            createFetchDataFailAction: (error: Error) => ({type: actions.fetchFail, payload: error}),
            createFetchDataSucAction: (data: Res) => ({type: actions.fetchSuc, payload: data}),
        },
        actions
    }
}
function createReducer<S, A extends Action>(actionName: string, actions: DataActions, initialState): Reducer<S, A> {
    return (state:S = initialState, action: A):S => {
        switch (action.type) {
            case actions.fetch:
                state[actionName].progress = true
                return state;
            case actions.clearData:
                state[actionName].data = null
                return state;
            case actions.clearError:
                state[actionName].error = null
                return state
            case actions.fetchFail:
                state[actionName].error = action.payload.message
                state[actionName].progress = false
                return state;
            case actions.fetchSuc:
                state[actionName].data = action.payload
                state[actionName].progress = false
                return state;
            default:
                return state;
        }
    }
}


function createReducerImmutable<S, A extends Action>(actionName: string, actions: DataActions, initialState): Reducer<S, A> {
    // @ts-ignore
    return produce(createReducer(actionName,actions), initialState)
}

function wait(time:number){
    return new Promise((resolve) => {
        setTimeout(resolve,time)
    })
}

function createSaga<Req extends Data, Res extends Data>(actionProduct: DataActionsFactory<Req, Res>, apiCall: (data?: Req) => Promise<Res>, method: Methods): () => {} {
    function* fetch(action: PayloadAction<Req>) {
        try {
            let data: Res
            switch (method) {
                case Methods.GET:
                    data = yield call(apiCall);
                    break;
                default:
                    data = yield call(apiCall, action.payload);
                    break;
            }
            // yield call(wait, 1500)
            yield put(actionProduct.creators.createFetchDataSucAction(data))
        } catch (e) {
            // TODO change console logging
            console.error(e)
            yield put(actionProduct.creators.createFetchDataFailAction({message: e.message}))
        }
    }

    function* notesSaga() {
        yield takeEvery(actionProduct.actions.fetch, fetch);

    }

    return notesSaga
}

function createSelectors<D>(actionsName:string, reducerName:string):Selectors<D,any>{
    return {
        selectData: (state) =>  state[reducerName][actionsName].data,
        selectError: (state) =>  state[reducerName][actionsName].error,
        selectProgress: (state) =>  state[reducerName][actionsName].progress,
    }
}

export function createDataProcessor<Req extends Data, Res extends Data>(actionName: string,reducerName:string,apiCall: (data?: Req) => Promise<Res>, method: Methods, initialState?): DataProcessorFactory<Req, Res> {
    const actionsProduct = createActions<Req, Res>(actionName);
    const reducer = createReducer(actionName, actionsProduct.actions,initialState);
    const reducerImmutable = createReducerImmutable(actionName, actionsProduct.actions,initialState);
    const saga = createSaga<Req, Res>(actionsProduct, apiCall, method);
    const selectors = createSelectors<Res>(actionName, reducerName)
    return {...actionsProduct, reducer, saga,selectors,reducerImmutable}
}