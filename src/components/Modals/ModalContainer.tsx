import React, { FC } from 'react';
import cn from 'classnames';

import { Button, Modal, Portal } from '../../views/common';

import { ModalContainerProps } from './types';
import styles from './index.module.scss';

const ModalContainer: FC<ModalContainerProps> = ({
  onClose,
  subTitle,
  title,
  description,
  positiveAction,
  negativeAction = onClose,
  positiveBtnText,
  negativeBtnText,
  children,
  open,
  disablePositiveBtn,
  classNameModal,
  rightStyle,
  ...props
}) => {
  if (!open) {
    return null;
  }
  return (
    <Portal>
      <Modal
        open={open}
        className={cn(styles.modal, classNameModal, {
          [styles.modal__right]: rightStyle
        })}
        onClose={onClose}
        {...props}
      >
        <>
          <h1 className={styles.modal__title}>{title}</h1>
          <h2 className={styles.modal__pretitle}>{subTitle}</h2>
          <p className={styles.modal__description}>{description}</p>
          <div className={styles.modal__content}>{children}</div>
          {(positiveBtnText || negativeBtnText) && (
            <div className={styles.modal__buttons}>
              {positiveBtnText && (
                <Button
                  onClick={positiveAction}
                  className={styles['modal__btn-positive']}
                  disabled={disablePositiveBtn}
                >
                  {positiveBtnText}
                </Button>
              )}
              {negativeBtnText && (
                <Button
                  onClick={negativeAction}
                  className={styles['modal__btn-negative']}
                  variant='text'
                >
                  {negativeBtnText}
                </Button>
              )}
            </div>
          )}
        </>
      </Modal>
    </Portal>
  );
};

export default ModalContainer;
