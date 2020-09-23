import React, { FC } from 'react';
import Dashboard from '../Dashboard/index';
import MenuItems from '../Menu';
import Content from './Content';
import { useIntl } from 'react-intl';
import { messages } from '../../utils/messages';

const Note: FC = () => {
  const intl = useIntl();
  return (
    <Dashboard
      title={intl.formatMessage(messages.note)}
      Content={Content}
      MenuItems={MenuItems}
    />
  );
};

export default Note;
