import {LOCALE_SET, LocaleActionTypes, LocaleState} from './types';
import {Locales} from "../../utils/types";
import {stringToLocale} from "./util";


function getLocale():Locales{
    const locale = navigator.language.split(/[-_]/)[0] ;
    return stringToLocale(locale)
}
const language:Locales = getLocale();

const initialStateNotes: LocaleState = {
    usersLocale: language,
};

function localeReducer(state = initialStateNotes, action: LocaleActionTypes): LocaleState {
    switch (action.type) {
        case LOCALE_SET:
            state.usersLocale = action.locale;
            return state
        default:
            return state
    }
}

export default localeReducer;