import { ReactNode } from 'react';
import { JSX } from '@garpix/garpix-web-components';

interface FormProps extends JSX.GxInput {
  className?: string;
  children?: ReactNode;
  onSubmit?: () => void;
}

export default FormProps;
