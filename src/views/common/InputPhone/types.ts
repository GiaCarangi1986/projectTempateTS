import { ReactNode } from 'react';
import { JSX } from '@garpix/garpix-web-components';

interface InputPhoneProps extends JSX.GxPhoneInput {
  className?: string;
  clearable?: boolean;
  children?: ReactNode;
  nameOfStyle?: string;
}

export type { InputPhoneProps };
