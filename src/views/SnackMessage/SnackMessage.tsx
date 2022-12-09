import React, { FC, useEffect } from 'react';
import cn from 'classnames';

import { Icon, IconButton } from '../common';
import { cancelIcon, closeIcon, successIcon } from '../../images';

import { SnackMessageProps } from './types';
import styles from './index.module.scss';

const SnackMessage: FC<SnackMessageProps> = ({ onClose, message, isError }) => {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, 4000);
  }, []);

  return (
    <div className={styles.snack}>
      <Icon
        className={cn(styles.snack__icon, {
          [styles.snack__icon_error]: isError
        })}
        src={isError ? cancelIcon : successIcon}
      />
      <p className={styles.snack__message}>{message}</p>
      <IconButton
        className={styles.snack__btn}
        emptyView
        icon={closeIcon}
        onClick={onClose}
      />
    </div>
  );
};

export default SnackMessage;
