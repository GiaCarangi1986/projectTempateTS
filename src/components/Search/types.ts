import { FilterType, TableSettingsProps } from '../TableSettings/types';

interface SearchProps extends TableSettingsProps {}

type InitFormProps = {
  search: string;
};

export type { SearchProps, InitFormProps };
