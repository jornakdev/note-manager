import {noteDeleteDataProcessor, noteGetDataProcessor,notePostDataProcessor,notePutDataProcessor } from "./index";
import {NOTE_CLEAR_ERRORS, NOTE_SAVE, NoteClearErrorsAction, NoteSaveAction} from "./types";

export const deleteActions = noteDeleteDataProcessor.actions
export const deleteActionCreators = noteDeleteDataProcessor.creators

export const getActions = noteGetDataProcessor.actions
export const getActionCreators = noteGetDataProcessor.creators

export const postActions = notePostDataProcessor.actions
export const postActionCreators = notePostDataProcessor.creators

export const putActions = notePutDataProcessor.actions
export const putActionCreators = notePutDataProcessor.creators

export function createActionClearErrors():NoteClearErrorsAction{
    return {
        type: NOTE_CLEAR_ERRORS,
    }
}

export function createActionNoteSave(id?:string):NoteSaveAction {
    return {
        type: NOTE_SAVE,
        id
    }
}