import { createDataProcessor } from '../../utils/data';
import { Api } from '../../utils/api';
import { IdPayload, Methods } from '../../utils/types';
import { Item } from '../../types';
import { ActionNames, NOTE_CLEAR_ERRORS } from './types';
import produce from 'immer';

export const initialStateNote = {
  [ActionNames.NOTE_GET]: {},
  [ActionNames.NOTE_DELETE]: {},
  [ActionNames.NOTE_PUT]: {},
  [ActionNames.NOTE_POST]: {}
};

export const REDUCER_NAME = 'note';

export const noteGetDataProcessor = createDataProcessor<IdPayload, Item>(
  ActionNames.NOTE_GET,
  REDUCER_NAME,
  Api.getNote,
  Methods.GET_DETAIL
);
export const noteDeleteDataProcessor = createDataProcessor<IdPayload, Item>(
  ActionNames.NOTE_DELETE,
  REDUCER_NAME,
  Api.deleteNote,
  Methods.DELETE
);
export const notePutDataProcessor = createDataProcessor<Item, Item>(
  ActionNames.NOTE_PUT,
  REDUCER_NAME,
  Api.putNote,
  Methods.PUT
);
export const notePostDataProcessor = createDataProcessor<Item, Item>(
  ActionNames.NOTE_POST,
  REDUCER_NAME,
  Api.postNote,
  Methods.POST
);

const notesReducer = produce((state, action) => {
  state = noteGetDataProcessor.reducer(state, action);
  state = noteDeleteDataProcessor.reducer(state, action);
  state = notePutDataProcessor.reducer(state, action);
  state = notePostDataProcessor.reducer(state, action);
  switch (action.type) {
    case NOTE_CLEAR_ERRORS:
      for (const name in ActionNames) {
        state[name].error = null;
      }
      return state;
    default:
      return state;
  }
}, initialStateNote);

export default notesReducer;
