import { ReactNode } from 'react';
import { JSX } from '@garpix/garpix-web-components';

interface SwitchProps extends JSX.GxSwitch {
  className?: string;
  children?: ReactNode;
  onChange?: (e: CustomEvent) => void;
  onBlur?: (e: CustomEvent) => void;
  variant?: string;
}

export default SwitchProps;
