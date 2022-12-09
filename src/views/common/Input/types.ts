import { ReactNode } from 'react';
import { JSX } from '@garpix/garpix-web-components';

interface InputProps extends JSX.GxInput {
  className?: string;
  clearable?: boolean;
  children?: ReactNode;
  nameOfStyle?: string;
}

export type { InputProps };
