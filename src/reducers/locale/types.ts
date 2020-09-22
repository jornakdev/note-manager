import {Locales} from "../../utils/types";

export const LOCALE_SET = 'LOCALE_SET'

export interface LocaleState {
    usersLocale: Locales
}

export interface LocaleSetAction {
    type: typeof LOCALE_SET,
    locale: Locales,
}

export type LocaleActionTypes = LocaleSetAction