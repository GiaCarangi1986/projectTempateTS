import React, { FC } from 'react';

import { Navigation } from '..';
import { logoIcon } from '../../images';
import { Icon } from '../common';

import { HeaderProps } from './types';
import style from './index.module.scss';

const Header: FC<HeaderProps> = ({ showLinks }) => (
  <header className={style.header}>
    <Icon className={style.icon} src={logoIcon} />
    {showLinks && <Navigation />}
  </header>
);

export default Header;
