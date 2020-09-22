import {RootState} from "../../utils/redux";
import {Locales} from "../../utils/types";

// @ts-ignore
export const selectLocale = (state:RootState):Locales => state.locale.usersLocale