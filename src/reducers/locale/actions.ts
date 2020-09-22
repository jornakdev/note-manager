import {LOCALE_SET, LocaleActionTypes} from "./types";
import {stringToLocale} from "./util";

export function createActionLocaleSet(locale: string | null): LocaleActionTypes {
    return {
        type: LOCALE_SET,
        locale: stringToLocale(locale)
    }
}