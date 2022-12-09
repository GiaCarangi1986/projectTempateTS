import React, { FC } from 'react';
import { GxModal } from '@garpix/garpix-web-components-react';

import { ModalProps } from './types';

const Modal: FC<ModalProps> = ({
  className,
  children,
  title,
  onClose,
  ...props
}) => (
  <GxModal
    className={className}
    onGx-after-hide={onClose}
    onGx-hide={onClose}
    onClick={(e) => e.stopPropagation()}
    label={title}
    onScroll={undefined}
    {...props}
  >
    {children}
  </GxModal>
);

export default Modal;
