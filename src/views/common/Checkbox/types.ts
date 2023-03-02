import { ReactNode } from 'react';
import { JSX } from '@garpix/garpix-web-components';

interface CheckboxProps extends JSX.GxCheckbox {
  children: ReactNode;
  className?: string;
}

export default CheckboxProps;
