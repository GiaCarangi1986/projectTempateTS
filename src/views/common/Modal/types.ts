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
  otherAction?: (e: any) => any;
  positiveBtnText?: string;
  negativeBtnText?: string;
  otherBtnText?: string;
  classNameModal?: string;
  style?: React.CSSProperties;
  ownBtn?: ReactNode;
  withoutBtn?: boolean;
}
