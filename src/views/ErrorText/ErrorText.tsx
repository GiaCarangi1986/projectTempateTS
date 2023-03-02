import React, { FC } from 'react';
import classNames from 'classnames';

import { ErrorTextProps } from './types';
import style from './index.module.scss';

const ErrorText: FC<ErrorTextProps> = ({
  children,
  errorClass,
  variant = 'left',
  margin = 'left'
}) => {
  const classes = classNames(style['error-text'], {
    [style[`error-text-${variant}`]]: variant,
    [style[`error-text_margin-${margin}`]]: margin,
    [style[`error-${errorClass}`]]: errorClass
  });
  return <div className={classes}>{children}</div>;
};

export default ErrorText;
