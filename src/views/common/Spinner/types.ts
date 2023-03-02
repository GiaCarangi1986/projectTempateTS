import { JSX } from '@garpix/garpix-web-components';
import { ReactNode } from 'react';
interface SpinnerProps extends JSX.GxSpinner {
  className?: string;
  loaderClass?: string;
  centered?: boolean;
  withoutBackground?: boolean;
  text?: string;
  block?: boolean;
  withoutHeader?: boolean;
}

export default SpinnerProps;
