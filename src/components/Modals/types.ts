import { ModalProps } from '../../views/common/Modal/types';

interface ModalContainerProps extends ModalProps {
  subTitle?: string;
  description?: string;
  title?: string;
  disablePositiveBtn?: boolean;
  rightStyle?: boolean;
  tooltip?: boolean;
  top?: number;
  left?: number;
  leftStyle?: boolean;
}

export type { ModalContainerProps };
