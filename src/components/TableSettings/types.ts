type NotChecked = {
  checkAgree: boolean;
  checkNotAgree: boolean;
  checkWithoutAgree: boolean;
};

type FilterType = {
  search?: string;
  dateStart?: string;
  dateEnd?: string;
  notChecked?: NotChecked;
  offset?: number;
  limit?: number;
};

type TableSettingsProps = {
  filters: FilterType;
  changeFilter: (param: FilterType) => void;
};

export type { FilterType, TableSettingsProps };
