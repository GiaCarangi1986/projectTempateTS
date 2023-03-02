import React, { FC } from 'react';
import classNames from 'classnames';

import ErrorText from '../ErrorText';

import { FieldsetProps } from './types';
import style from './index.module.scss';

const Fieldset: FC<FieldsetProps> = ({
  children,
  error,
  touched,
  errorClass
}) => {
  const classes = classNames(style.fieldset, {
    [style['fieldset-error']]: error && touched
  });
  return (
    <fieldset className={classes}>
      {children}
      {error && touched && (
        <ErrorText errorClass={errorClass}>{error}</ErrorText>
      )}
    </fieldset>
  );
};

export default Fieldset;
