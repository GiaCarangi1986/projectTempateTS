import React, { FC } from 'react';
import cn from 'classnames';
import { GxSwitch } from '@garpix/garpix-web-components-react';

import SwitchProps from './types';
import styles from './index.module.scss';

const Switch: FC<SwitchProps> = ({
  className,
  children,
  onChange,
  onBlur,
  variant = 'text-right',
  ...otherProps
}) => (
  // Variant:
  // text-left - текст слева
  // text-right - текст справа
  // without-text - без текста

  <GxSwitch
    className={cn(styles.switch, styles[variant], className)}
    onGx-change={onChange}
    onGx-blur={onBlur}
    {...otherProps}
  >
    {children}
  </GxSwitch>
);

export default Switch;
