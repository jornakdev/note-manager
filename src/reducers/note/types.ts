export const NOTE_SAVE = 'NOTE_SAVE'
export const NOTE_CLEAR_ERRORS = 'NOTE_CLEAR_ERRORS'

export enum ActionNames {
    NOTE_GET='NOTE_GET',
    NOTE_PUT='NOTE_PUT',
    NOTE_POST='NOTE_POST',
    NOTE_DELETE='NOTE_DELETE'
}

export interface NoteSaveAction {
    type: typeof NOTE_SAVE,
    id?: string
}
export interface NoteClearErrorsAction {
    type: typeof NOTE_CLEAR_ERRORS,
}

export type NoteActionTypes = NoteSaveAction | NoteClearErrorsAction