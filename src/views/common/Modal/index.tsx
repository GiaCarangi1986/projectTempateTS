import React, { FC } from 'react';
import { GxModal } from '@garpix/garpix-web-components-react';
import cn from 'classnames';

import IconButton from '../IconButton';
import { closeIcon } from '../../../images';

import { ModalProps } from './types';
import style from './index.module.scss';

const Modal: FC<ModalProps> = ({
  className,
  children,
  title,
  onClose,
  withoutBtn,
  ...props
}) => (
  <GxModal
    className={cn(className, style.modal)}
    onGx-after-hide={onClose}
    onGx-hide={onClose}
    onClick={(e) => e.stopPropagation()}
    label={title}
    onScroll={undefined}
    style={{ top: 0, left: 0 }}
    {...props}
  >
    {!withoutBtn && (
      <IconButton
        className={style.modal__button}
        icon={closeIcon}
        onClick={onClose}
      />
    )}
    {children}
  </GxModal>
);

export default Modal;
