import React, {FC} from "react";
import {IntlProvider} from "react-intl";
import {useSelector} from "react-redux";
import {selectLocale} from "../reducers/locale/selectors";
import messages_cs from "../translations/cs.json";
import messages_en from "../translations/en.json";
import {Locales, Messages} from "./types";

const messages:Messages = {
    en: messages_en,
    cs: messages_cs
};
export const MessagesProvider: FC = props => {
    const usersLocale:Locales = useSelector(selectLocale)
    return (
        <IntlProvider locale={usersLocale} messages={messages[usersLocale]}>
            {props.children}
        </IntlProvider>
    )
}