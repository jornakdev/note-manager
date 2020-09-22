import React, {FC} from 'react';
import {Field} from "redux-form";
import {Props} from "./types";
import InputBase from "./InputBase";


const InputText:FC<Props> = (props) => {
    return <Field component={InputBase} {...props} />
}

export default InputText