import TextField from "@material-ui/core/TextField/TextField";
import React, {FC} from "react";
import {InputBaseProps} from "./types";

const InputBase:FC<InputBaseProps> = (props)  => {
    const {
        fullWidth,
        input: {value, onChange, onFocus}, label,
        ...other
    } = props
    return <TextField label={label} variant="outlined" value={value} onChange={onChange}
                      onFocus={onFocus} fullWidth={fullWidth} {...other} />
}
export default InputBase;
