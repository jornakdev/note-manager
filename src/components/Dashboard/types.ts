import {ComponentType, FC} from "react";
import * as locales from '@material-ui/core/locale';
import {Theme} from "@material-ui/core";

export interface Props {
    title: string,
    MenuItems: FC,
    Content: FC | ComponentType,
}



export type SupportedLocales = keyof typeof locales;