import React, { forwardRef } from 'react';
import cn from 'classnames';

import { Icon, Button } from '..';

import IconButtonProps from './types';
import styles from './index.module.scss';

const IconButton = forwardRef<HTMLGxButtonElement, IconButtonProps>(
  (
    {
      className,
      icon,
      slot = 'icon-left',
      iconClassName,
      label,
      ...otherProps
    },
    ref
  ) => (
    <Button className={cn(styles.button, className)} ref={ref} {...otherProps}>
      <Icon
        className={cn(styles.button__icon, iconClassName)}
        slot={slot}
        src={icon}
      />
      {label && <span className={styles.label}>{label}</span>}
    </Button>
  )
);

export default IconButton;
