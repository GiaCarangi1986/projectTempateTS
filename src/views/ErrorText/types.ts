import { ReactNode } from 'react';

type ErrorTextProps = {
  children: ReactNode;
  errorClass?: string;
  variant?: 'right' | 'left' | 'center';
  margin?: 'left' | 'right' | 'top';
};

export type { ErrorTextProps };
