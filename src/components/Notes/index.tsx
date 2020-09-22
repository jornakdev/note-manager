import React, {FC, useEffect} from 'react';
import Dashboard from "../Dashboard";
import MenuItems from "../Menu";
import Content from "./Content";
import {useIntl} from "react-intl";
import {messages} from "../../utils/messages";
import {useDispatch} from "react-redux";
import {actionCreators} from "../../reducers/notes/actions";

 const Notes:FC<{}> = () => {
     const intl = useIntl()
     const dispatch = useDispatch()
     useEffect(() => {
         dispatch(actionCreators.createFetchDataAction())
         return () => {
             dispatch(actionCreators.createClearDataAction())
         }
     }, [])
     return (
        <Dashboard title={intl.formatMessage(messages.notes)} Content={Content} MenuItems={MenuItems}/>
    )
}

export default Notes;