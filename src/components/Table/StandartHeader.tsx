import React, { FC } from 'react';

import { StandartHeaderProps } from './types';
import style from './index.module.scss';

const StandartHeader: FC<StandartHeaderProps> = ({ headers, leftOptions }) => (
  <div className={style['standart-header']}>
    {leftOptions && <div>{''}</div>}
    {headers.map((el) => (
      <div key={el.label} className={style['standart-header__item']}>
        {el.label}
      </div>
    ))}
  </div>
);

export default StandartHeader;
