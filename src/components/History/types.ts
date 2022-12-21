import { ReactNode } from 'react';
import { ListChildComponentProps } from 'react-window';

type HistoryDataType = {
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

type HistoryType = {
  data: HistoryDataType[];
  isNext: boolean;
  count: number;
};

type HistoryRowProps = ListChildComponentProps<HistoryDataType>;

type RowInfoProps = HistoryDataType & {
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
  HistoryDataType,
  DetailsProps,
  TextRowProps,
  HistoryType
};
