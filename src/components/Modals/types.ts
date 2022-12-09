import { ModalProps } from '../../views/common/Modal/types';

interface ModalContainerProps extends ModalProps {
  subTitle?: string;
  description?: string;
  title: string;
  disablePositiveBtn?: boolean;
  rightStyle?: boolean;
}

export type { ModalContainerProps };
