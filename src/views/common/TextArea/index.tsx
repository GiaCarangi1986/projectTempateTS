/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import cn from 'classnames';
import { GxTextarea } from '@garpix/garpix-web-components-react';

import TextareaProps from './types';
import style from './index.module.scss';

const Textarea: FC<TextareaProps> = ({
  className = '',
  label = '',
  value = '',
  resize = 'none',
  rows = 5,
  ...props
}) => {
  const classes = cn(style.textarea, className);

  return (
    <GxTextarea
      value={value}
      className={classes}
      label={label}
      resize={resize}
      rows={rows}
      style={{ '--rows': rows as React.CSSProperties }}
      {...props}
    />
  );
};

export default Textarea;
