import React, { FC } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { List } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { messages } from '../../utils/messages';
import { PATHS } from '../../utils/paths';
import { useHistory } from 'react-router-dom';

const MenuItems: FC = () => {
  const intl = useIntl();
  const history = useHistory();
  return (
    <List>
      <ListItem button onClick={() => history.push(PATHS.ROOT)}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={intl.formatMessage(messages.notes)} />
      </ListItem>
    </List>
  );
};

export default MenuItems;
