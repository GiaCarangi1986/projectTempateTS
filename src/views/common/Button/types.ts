import { ReactNode } from 'react';
import { JSX } from '@garpix/garpix-web-components';

interface ButtonProps extends JSX.GxButton {
  children: ReactNode;
  className?: string;
  onClick?: (e: any) => void;
  uppercase?: boolean;
  slot?: string;
  otherClassName?: string;
  iconView?: boolean;
  emptyView?: boolean;
}

export default ButtonProps;
