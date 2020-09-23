import { ComponentType, FC } from 'react';

export interface Props {
  title: string;
  MenuItems: FC;
  Content: FC | ComponentType;
}
