import { ReactNode } from 'react';
import { ListChildComponentProps } from 'react-window';

type HistoryType = {
  id: number;
  author: string;
  dateTime: string;
  productType: string;
  meltingNumber: string;
  indicator1: number;
  indicator2: number;
  section: number;
  isAgree: boolean | undefined;
};

type HistoryRowProps = ListChildComponentProps<HistoryType>;

type RowInfoProps = HistoryType & {
  className?: string;
  children?: ReactNode;
  elemStyle?: string;
  rowStyle?: string;
};

type HistoryRow = {
  name: string;
  system: number;
  real?: number;
  count: number;
};

type HistoryData = {
  defects: HistoryRow[];
  comment?: HistoryRow[];
};

type DetailsProps = {
  loading: boolean;
  data: HistoryData;
};

type TextRowProps = {
  name: string;
  system: number;
  real?: number;
  count: number;
};

type TableRowProps = {
  header: string;
  data: HistoryData;
  dataKey: string;
};

export type {
  TableRowProps,
  HistoryRowProps,
  RowInfoProps,
  HistoryType,
  DetailsProps,
  TextRowProps
};
