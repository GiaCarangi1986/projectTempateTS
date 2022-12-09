import React, { FC } from 'react';
import { GxCheckbox } from '@garpix/garpix-web-components-react';

import CheckboxProps from './types';
import style from './index.module.scss';

const Checkbox: FC<CheckboxProps> = ({ children, ...props }) => (
  <GxCheckbox className={style.checkbox} {...props}>
    {children}
  </GxCheckbox>
);

export default Checkbox;
