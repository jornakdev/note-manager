import {
  Action,
  Data,
  DataActions,
  DataActionsFactory,
  DataProcessorFactory,
  DataProcessorState,
  Methods,
  PayloadAction,
  Selectors
} from './types';
import { Reducer } from 'react';
import { call, put, takeEvery } from '@redux-saga/core/effects';
import produce from 'immer';
import { RootState } from './redux';

function createActions<Req extends Data, Res extends Data>(
  actionName: string
): DataActionsFactory<Req, Res> {
  const actions = {
    clearData: `${actionName}_CLEAR_DATA`,
    clearError: `${actionName}_CLEAR_ERROR`,
    fetch: `${actionName}_FETCH`,
    fetchFail: `${actionName}_FETCH_FAIL`,
    fetchSuc: `${actionName}_FETCH_SUC`
  };
  return {
    creators: {
      createClearDataAction: () => ({ type: actions.clearData }),
      createClearErrorAction: () => ({ type: actions.clearError }),
      createFetchDataAction: (data: Req) => ({
        type: actions.fetch,
        payload: data
      }),
      createFetchDataFailAction: (error: Error) => ({
        type: actions.fetchFail,
        payload: error
      }),
      createFetchDataSucAction: (data: Res) => ({
        type: actions.fetchSuc,
        payload: data
      })
    },
    actions
  };
}

function createReducer<A extends Action>(
  actionName: string,
  actions: DataActions,
  initialState
): Reducer<DataProcessorState, A> {
  return (
    state: DataProcessorState = initialState,
    action: A
  ): DataProcessorState => {
    switch (action.type) {
      case actions.fetch:
        state[actionName].progress = true;
        return state;
      case actions.clearData:
        state[actionName].data = null;
        return state;
      case actions.clearError:
        state[actionName].error = null;
        return state;
      case actions.fetchFail:
        state[actionName].error = action.payload.message;
        state[actionName].progress = false;
        return state;
      case actions.fetchSuc:
        state[actionName].data = action.payload;
        state[actionName].progress = false;
        return state;
      default:
        return state;
    }
  };
}

function createReducerImmutable<A extends Action>(
  actionName: string,
  actions: DataActions,
  initialState?: Data
): Reducer<DataProcessorState, A> {
  // @ts-ignore
  return produce(createReducer(actionName, actions), initialState);
}

function createSaga<Req extends Data, Res extends Data>(
  actionProduct: DataActionsFactory<Req, Res>,
  apiCall: (data?: Req) => Promise<Res>,
  method: Methods
): () => any {
  function* fetch(action: PayloadAction<Req>) {
    try {
      let data: Res;
      switch (method) {
        case Methods.GET:
          data = yield call(apiCall);
          break;
        default:
          data = yield call(apiCall, action.payload);
          break;
      }
      // yield call(wait, 1500)
      yield put(actionProduct.creators.createFetchDataSucAction(data));
    } catch (e) {
      // TODO change console logging
      console.error(e);
      yield put(
        actionProduct.creators.createFetchDataFailAction({ message: e.message })
      );
    }
  }

  function* notesSaga() {
    yield takeEvery(actionProduct.actions.fetch, fetch);
  }

  return notesSaga;
}

function createSelectors<D>(
  actionsName: string,
  reducerName: string
): Selectors<D> {
  return {
    selectData: (state: RootState) => state[reducerName][actionsName].data,
    selectError: (state: RootState) => state[reducerName][actionsName].error,
    selectProgress: (state: RootState) =>
      state[reducerName][actionsName].progress
  };
}

export function createDataProcessor<Req extends Data, Res extends Data>(
  actionName: string,
  reducerName: string,
  apiCall: (data?: Req) => Promise<Res>,
  method: Methods,
  initialState?: Data
): DataProcessorFactory<Req, Res> {
  const actionsProduct = createActions<Req, Res>(actionName);
  const reducer = createReducer(
    actionName,
    actionsProduct.actions,
    initialState
  );
  const reducerImmutable = createReducerImmutable(
    actionName,
    actionsProduct.actions,
    initialState
  );
  const saga = createSaga<Req, Res>(actionsProduct, apiCall, method);
  const selectors = createSelectors<Res>(actionName, reducerName);
  return { ...actionsProduct, reducer, saga, selectors, reducerImmutable };
}
