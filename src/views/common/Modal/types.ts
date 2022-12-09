import { ReactNode } from 'react';
import { JSX } from '@garpix/garpix-web-components';

export interface ModalProps extends JSX.GxModal {
  className?: string;
  classNameBtn?: string;
  title?: string;
  onClose: () => void;
  classNameIcon?: string;
  children?: ReactNode;
  positiveAction?: (e: any, eOther?: any) => any;
  negativeAction?: () => void;
  positiveBtnText?: string;
  negativeBtnText?: string;
  classNameModal?: string;
}
