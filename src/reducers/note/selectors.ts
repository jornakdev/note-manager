import {
  noteDeleteDataProcessor,
  noteGetDataProcessor,
  notePostDataProcessor,
  notePutDataProcessor
} from './index';
import { Data, Selectors } from '../../utils/types';

export const selectors = {
  get: noteGetDataProcessor.selectors,
  delete: noteDeleteDataProcessor.selectors,
  post: notePostDataProcessor.selectors,
  put: notePutDataProcessor.selectors
};

export const selectorProgress = (state: Data): boolean => {
  return Object.values(selectors).find((selector: Selectors<any, any>) =>
    selector.selectProgress(state)
  )
    ? true
    : false;
};

export const selectorErrors = (state: Data): undefined | string => {
  return Object.values(selectors).reduce(
    (acc, selector: Selectors<any, any>) => {
      const error = selector.selectError(state);
      if (error) return acc !== undefined ? acc + '; ' + error : error;
      else return acc;
    },
    undefined
  );
};
