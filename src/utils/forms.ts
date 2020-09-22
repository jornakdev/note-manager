import {RootState} from "./redux";

export const NOTE_DETAIL_FORM = 'NOTE_DETAIL_FORM'

export const makeSelectorFormData = (formName:string) => (state:RootState, ) => state.form[formName]?.values