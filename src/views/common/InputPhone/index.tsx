import React, { FC } from 'react';
import classNames from 'classnames';
import { GxPhoneInput } from '@garpix/garpix-web-components-react';

import { InputPhoneProps } from './types';
import style from './index.module.scss';

const InputPhone: FC<InputPhoneProps> = ({
  children,
  value = '',
  nameOfStyle = '',
  className,
  disabled,
  ...props
}) => {
  const classes = classNames(style.input, className, style['input-value'], {
    [style[`${nameOfStyle}`]]: nameOfStyle
  });
  return (
    <GxPhoneInput
      {...props}
      country='ru'
      onlyCountries={['ru']}
      disabled={disabled}
      className={classes}
      value={value}
      disableSearchIcon
    >
      {children}
    </GxPhoneInput>
  );
};

export default InputPhone;
