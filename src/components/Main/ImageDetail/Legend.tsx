import React, { FC } from 'react';

import { Spinner } from '../../../views/common';

import { LegendProps } from './types';
import style from './index.module.scss';

const Legend: FC<LegendProps> = ({ legendData }) => (
  <div className={style.legend}>
    <p className={style.legend__text}>Легенда:</p>
    {!legendData ? (
      <Spinner withoutBackground block />
    ) : (
      legendData.map((el) => (
        <p
          key={el.name}
          className={style.legend__color}
          style={{ '--color': el.color } as React.CSSProperties}
        >
          {el.name}
        </p>
      ))
    )}
  </div>
);

export default Legend;
