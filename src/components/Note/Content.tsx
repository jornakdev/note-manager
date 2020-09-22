import React, {FC, useEffect} from 'react';
import {reduxForm} from 'redux-form'
import InputText from "../InputText/index";
import {Props as InputTextProps} from "../InputText/types";
import {NOTE_DETAIL_FORM} from "../../utils/forms";
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import {useDispatch, useSelector} from "react-redux";
import {
    createActionNoteSave,
    getActionCreators,
    deleteActionCreators,
    createActionClearErrors,
} from "../../reducers/note/actions";
import {useParams} from "react-router-dom";
import {messages} from "../../utils/messages";
import {FormattedMessage, useIntl} from "react-intl";
import Title from '../Title';
import styled from "styled-components";
import {WithTheme} from "../../utils/types";
import CircularProgressStyled from "../Progress/index";
import {selectorErrors, selectorProgress} from "../../reducers/note/selectors";
import {Alert, Skeleton, SkeletonTypeMap} from "@material-ui/lab";
import {OverridableComponent} from "@material-ui/core/OverridableComponent";
import {Snackbar} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
        },
    }),
);

const Row = styled.div`
  min-width: 400px;
`
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`

const InputTextStyled:FC<WithTheme & InputTextProps> = styled(InputText)`
  margin-bottom: ${(props: WithTheme) => props.theme.spacing(4)}px;
`

const SkeletonStyled:OverridableComponent<SkeletonTypeMap> = styled(Skeleton)`
  width: 100%;
  height: 88px;
  border-radius: 5px;
`

const Content:FC<{}> = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const {id} = useParams<ParamTypes>();
    const intl = useIntl()
    const theme = useTheme();
    const progress = useSelector(selectorProgress)
    const error = useSelector(selectorErrors)

    useEffect(() => {
        if (id) dispatch(getActionCreators.createFetchDataAction({id}))
        return () => {
            if (id) dispatch(getActionCreators.createClearDataAction())
        }
    },[])

    const handleClose = () => {
        dispatch(createActionClearErrors())
    }

    return (
        <Wrap>
            <Row>
                <Title><FormattedMessage {...messages.note}/></Title>
            </Row>

            <Row>
                {progress ?
                <>
                    {id !== undefined && <SkeletonStyled variant="text"/>}
                    <SkeletonStyled variant="text"/>
                </>
                    :
                    <>
                        {id !== undefined &&  <InputTextStyled theme={theme} name="id" disabled label={intl.formatMessage(messages.id)} />}
                        <InputTextStyled theme={theme} name="title" label={intl.formatMessage(messages.text)} fullWidth />
                    </>
                }
            </Row>

            <Row>
                {id !== undefined && <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={() => dispatch(deleteActionCreators.createFetchDataAction({id}))}
                >
                    <FormattedMessage {...messages.delete}/>
                </Button>}

                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    onClick={() => dispatch(createActionNoteSave(id))}
                >
                    <FormattedMessage {...messages.save}/>
                </Button>
            </Row>

            <Snackbar open={error !== undefined} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>

            {progress && <CircularProgressStyled color="secondary" />}
        </Wrap>
    );
}

export default reduxForm({
    form: NOTE_DETAIL_FORM
})(Content)