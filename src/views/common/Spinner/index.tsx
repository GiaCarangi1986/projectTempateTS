import React, { FC } from 'react';
import cn from 'classnames';
import { GxSpinner } from '@garpix/garpix-web-components-react';

import SpinnerProps from './types';
import styles from './index.module.scss';

const Spinner: FC<SpinnerProps> = ({
  className,
  loaderClass,
  centered,
  withoutBackground,
  ...props
}) => (
  <GxSpinner
    className={cn(styles['loader-layout'], className, {
      [styles[`loader-${loaderClass}`]]: loaderClass,
      [styles.loader__centered]: centered,
      [styles.loader__withoutBackground]: withoutBackground
    })}
    {...props}
  />
);

export default Spinner;
