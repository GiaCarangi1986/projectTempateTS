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
  text,
  block,
  withoutHeader,
  ...props
}) => (
  <div
    className={cn(styles.spinner, className, {
      [styles.spinner__centered]: centered,
      [styles.spinner__block]: block,
      [styles.spinner__withoutHeader]: withoutHeader,
      [styles.spinner__withoutBackground]: withoutBackground,
      [styles[`spinner__${loaderClass}`]]: loaderClass
    })}
  >
    <GxSpinner {...props} />
    <p className={styles.text}>{text}</p>
  </div>
);

export default Spinner;
