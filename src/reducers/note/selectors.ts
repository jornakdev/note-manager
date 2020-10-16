import {
  noteDeleteDataProcessor,
  noteGetDataProcessor,
  notePostDataProcessor,
  notePutDataProcessor
} from './index';
import { Data, Selectors } from '../../utils/types';
import { Item } from '../../types';
import { RootState } from '../../utils/redux';

export const selectors = {
  get: noteGetDataProcessor.selectors,
  delete: noteDeleteDataProcessor.selectors,
  post: notePostDataProcessor.selectors,
  put: notePutDataProcessor.selectors
};

export const selectorProgress = (state: RootState): boolean => {
  return Object.values(selectors).find((selector: Selectors<Item>) =>
    selector.selectProgress(state)
  )
    ? true
    : false;
};

export const selectorErrors = (state: RootState): undefined | string => {
  return Object.values(selectors).reduce((acc, selector: Selectors<Item>) => {
    const error = selector.selectError(state);
    if (error) return acc !== undefined ? acc + '; ' + error : error;
    else return acc;
  }, undefined);
};
