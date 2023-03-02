import { ColumnsInteractiveType } from '../../components/TableSettings/InteractiveColumns';

type StandartPageContextType = {
  Page: any;
  columns: ColumnsInteractiveType[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnsInteractiveType[]>>;
  initColumns: ColumnsInteractiveType[];
};

export type { StandartPageContextType };
