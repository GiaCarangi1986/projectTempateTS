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
  otherAction,
  positiveBtnText,
  negativeBtnText,
  otherBtnText,
  children,
  open,
  disablePositiveBtn,
  classNameModal,
  rightStyle,
  tooltip,
  top,
  left,
  ownBtn,
  leftStyle,
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
          [styles.modal__right]: rightStyle,
          [styles.modal__left]: leftStyle,
          [styles.modal__tooltip]: tooltip
        })}
        onClose={onClose}
        style={
          top && left
            ? ({
                '--top': `${top}px`,
                '--left': `${left}px`
              } as React.CSSProperties)
            : undefined
        }
        withoutBtn={tooltip}
        {...props}
      >
        <>
          {title && <h1 className={styles.modal__title}>{title}</h1>}
          {subTitle && <h2 className={styles.modal__pretitle}>{subTitle}</h2>}
          {description && (
            <p className={styles.modal__description}>{description}</p>
          )}
          {children && (
            <div
              className={cn(styles.modal__content, {
                [styles.modal__content__tooltip]: tooltip
              })}
            >
              {children}
            </div>
          )}
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
              {otherBtnText && (
                <Button
                  onClick={otherAction}
                  className={styles['modal__btn-positive']}
                >
                  {otherBtnText}
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
              {ownBtn}
            </div>
          )}
        </>
      </Modal>
    </Portal>
  );
};

export default ModalContainer;
