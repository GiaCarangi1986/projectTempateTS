import React, { FC } from 'react';

import { HeaderProps } from './types';
import style from './index.module.scss';

const Headers: FC<HeaderProps> = ({ header, description }) => (
  <div>
    <h2 className={style.title}>{header}</h2>
    {description?.split('\n').map((str) => (
      <p key={str} className={style.description}>
        {str}
      </p>
    ))}
  </div>
);

export default Headers;
