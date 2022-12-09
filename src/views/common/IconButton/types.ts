import { MouseEvent } from 'react';
import ButtonProps from '../Button/types';

interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: string;
  iconClassName?: string;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
  label?: string;
}

export default IconButtonProps;
