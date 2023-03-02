import React, { FC } from 'react';
import cn from 'classnames';
import { GxInput } from '@garpix/garpix-web-components-react';

import { INPUT_LABEL } from '../../../const';

import { InputProps } from './types';
import style from './index.module.scss';

const Input: FC<InputProps> = ({
  children,
  label,
  value,
  clearable,
  className,
  nameOfStyle,
  ...props
}) => {
  const classes = cn(style.input, className, {
    [style[`${nameOfStyle}`]]: nameOfStyle,
    [style['input-value']]: value || nameOfStyle === INPUT_LABEL
  });
  const inputClearable = clearable && value && value !== '';

  return (
    <GxInput
      value={value}
      className={classes}
      clearable={!!inputClearable}
      label={label}
      {...props}
    >
      {children}
    </GxInput>
  );
};

export default Input;
