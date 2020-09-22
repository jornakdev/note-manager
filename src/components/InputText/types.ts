import {WrappedFieldProps} from "redux-form";

export interface Props {
    name: string,
    label: string,
    readOnly?: boolean
    fullWidth?: boolean
}
export interface InputBaseProps extends WrappedFieldProps{
    fullWidth?: boolean,
    name: string,
    label: string
}