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
  ordering?: string;
};

type TableSettingsProps = {
  filters: FilterType;
  changeFilter: (param: FilterType) => void;
};

type InteractiveColumnsProps = {
  onClose: () => void;
};

export type { FilterType, TableSettingsProps, InteractiveColumnsProps };
