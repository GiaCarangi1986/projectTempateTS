import React, { forwardRef } from 'react';
import cn from 'classnames';
import { GxButton } from '@garpix/garpix-web-components-react';

import ButtonProps from './types';
import styles from './index.module.scss';

const Button = forwardRef<HTMLGxButtonElement, ButtonProps>(
  (
    {
      className = '',
      otherClassName = '',
      children,
      onClick,
      variant = 'default',
      size = 'med',
      pill = false,
      slot = '',
      uppercase = false,
      iconView,
      emptyView,
      ...otherProps
    },
    ref
  ) => {
    const buttonClassName = cn(
      styles.button,
      className,
      styles[`button_${variant}`],
      styles[`button_${size}`],
      {
        [styles.button_uppercase]: uppercase,
        [styles.button_pill]: pill,
        [styles[`${otherClassName}`]]: otherClassName,
        [styles['button_icon-view']]: iconView,
        [styles['button_empy-view']]: emptyView
      }
    );
    return (
      <GxButton
        className={buttonClassName}
        onClick={onClick}
        variant={variant}
        size={size}
        slot={slot}
        ref={ref}
        {...otherProps}
      >
        {children}
      </GxButton>
    );
  }
);

export default Button;
