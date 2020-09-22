import {createDataProcessor} from "../../utils/data";
import {Api} from "../../utils/api";
import {Methods} from "../../utils/types";


export const initialState = {}
export const notesDataProcessor = createDataProcessor('NOTES','notes', Api.getNotes, Methods.GET, initialState)

export default notesDataProcessor.reducer;