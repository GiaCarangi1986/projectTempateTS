import { TableSettingsProps } from '../TableSettings/types';

type CheckElemType = {
  label: string;
  name: string;
};

type CheckboxProps = CheckElemType & TableSettingsProps & {};

export type { CheckboxProps, CheckElemType };
