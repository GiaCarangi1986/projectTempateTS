import React, { FC } from 'react';
import { GxForm } from '@garpix/garpix-web-components-react';

import FormProps from './types';

const Form: FC<FormProps> = ({ className, children, onSubmit, ...props }) => (
  <GxForm className={className} onGx-submit={onSubmit} {...props}>
    {children}
  </GxForm>
);

export default Form;
