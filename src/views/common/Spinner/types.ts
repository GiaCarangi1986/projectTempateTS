import { JSX } from '@garpix/garpix-web-components';

interface SpinnerProps extends JSX.GxSpinner {
  className?: string;
  loaderClass?: string;
  centered?: boolean;
  withoutBackground?: boolean;
}

export default SpinnerProps;
