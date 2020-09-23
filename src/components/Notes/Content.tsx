import React, { FC } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';
import { useDispatch, useSelector } from 'react-redux';
import { selectors } from '../../reducers/notes/selectors';
import AddIcon from '@material-ui/icons/Add';

import Button from '@material-ui/core/Button';
import { PATHS } from '../../utils/paths';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { messages } from '../../utils/messages';
import { actionCreators } from '../../reducers/notes/actions';
import { Snackbar, useTheme } from '@material-ui/core';
import { Alert, Skeleton } from '@material-ui/lab';
import styled from 'styled-components';
import { WithTheme } from '../../utils/types';
import CircularProgressStyled from '../Progress/index';

const ButtonStyled: FC<WithTheme> = styled(Button)`
  margin: ${(props: WithTheme) => props.theme.spacing(4)}px;
`;

const SkeletonStyled = styled(Skeleton)`
  width: 100%;
  height: 200px;
  border-radius: 5px;
`;

const Content: FC = () => {
  const items = useSelector(selectors.selectData);
  const history = useHistory();
  const dispatch = useDispatch();
  const error = useSelector(selectors.selectError);
  const progress = useSelector(selectors.selectProgress);
  const handleClose = () => dispatch(actionCreators.createClearErrorAction());
  const theme = useTheme();
  return (
    <React.Fragment>
      <Title>
        <FormattedMessage {...messages.notes} />
      </Title>
      {progress ? (
        <SkeletonStyled variant="rect" />
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items &&
              items.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => history.push(PATHS.makeNoteId(row.id))}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}

      <ButtonStyled
        theme={theme}
        variant="contained"
        color="primary"
        size="large"
        startIcon={<AddIcon />}
        onClick={() => history.push(PATHS.NOTE)}
      >
        <FormattedMessage {...messages.create} />
      </ButtonStyled>

      <Snackbar
        open={error !== undefined}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>

      {progress && <CircularProgressStyled color="secondary" />}
    </React.Fragment>
  );
};

export default Content;
