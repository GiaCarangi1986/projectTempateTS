import { ReactNode } from 'react';

type FieldsetProps = {
  children: ReactNode;
  error: string | undefined;
  touched: boolean | undefined;
  errorClass?: string;
};

export type { FieldsetProps };
