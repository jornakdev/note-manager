import { Theme } from '@material-ui/core';
import { Reducer } from 'react';

export enum Methods {
  POST = 'POST',
  GET = 'GET',
  GET_DETAIL = 'GET_DETAIL',
  DELETE = 'DELETE',
  PUT = 'PUT'
}

export enum Locales {
  en = 'en',
  cs = 'cs'
}

export interface WithTheme {
  theme: Theme;
  [x: string]: any;
}

export interface Messages {
  [Locales.cs]: Record<string, string>;
  [Locales.en]: Record<string, string>;
}

export interface Data {
  [x: string]: any;
}

export interface Action {
  type: string;
  [key: string]: any;
}

export interface PayloadAction<Payload> extends Action {
  payload: Payload;
}

export interface FetchDataAction<DATA extends Data> extends Action {
  payload: DATA;
}

interface Error {
  message: string;
}

export interface IdPayload {
  id: string;
}

export interface CreateDataActions<Req extends Data, Res extends Data> {
  createFetchDataAction: (data?: Req) => FetchDataAction<Req>;
  createFetchDataSucAction: (data: Res) => FetchDataAction<Res>;
  createFetchDataFailAction: (data: Error) => FetchDataAction<Error>;
  createClearDataAction: () => Action;
  createClearErrorAction: () => Action;
}

export interface DataActions {
  fetch: string;
  fetchSuc: string;
  fetchFail: string;
  clearData: string;
  clearError: string;
}

export interface DataActionsFactory<Req extends Data, Res extends Data> {
  creators: CreateDataActions<Req, Res>;
  actions: DataActions;
}

export interface Selectors<D extends Data, S> {
  selectData: (state: S) => D;
  selectError: (state: S) => string;
  selectProgress: (state: S) => boolean;
}

export interface DataProcessorFactory<Req extends Data, Res extends Data>
  extends DataActionsFactory<Req, Res> {
  reducer: Reducer<any, any>;
  reducerImmutable: Reducer<any, any>;
  saga: () => any;
  selectors: Selectors<Res, any>;
}
