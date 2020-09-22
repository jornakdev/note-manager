import {Locales} from "../../utils/types";

export function stringToLocale(locale: string | null):Locales{
    if (locale === null){
        return Locales.en
    }
    if (locale in Locales){
        return (<any>Locales)[locale]
    }
    return Locales.en
}