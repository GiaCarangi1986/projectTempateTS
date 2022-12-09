import React, { FC } from 'react';

import { Header } from '..';

import { LayoutProps } from './types';
import style from './index.module.scss';

const Layout: FC<LayoutProps> = ({ children, showLinks }) => (
  <div className={style.layout}>
    <Header showLinks={showLinks} />
    <div className={style.content}>{children}</div>
  </div>
);

export default Layout;
