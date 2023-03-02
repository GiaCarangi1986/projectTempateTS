import { FilterType, TableSettingsProps } from '../TableSettings/types';

interface DateSearchProps extends TableSettingsProps {}

type InitFormProps = {
  dateStart?: string;
  dateEnd?: string;
};

export type { DateSearchProps, InitFormProps };
