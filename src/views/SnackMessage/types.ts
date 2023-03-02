import { ModalProps } from '../common/Modal/types';

interface SnackMessageProps extends ModalProps {
  message: string;
  isError?: boolean;
}

export type { SnackMessageProps };
