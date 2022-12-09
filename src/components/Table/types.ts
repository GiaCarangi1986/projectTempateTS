import { ComponentType, MouseEventHandler } from 'react';
import { FixedSizeListProps, ListChildComponentProps } from 'react-window';

type TableProps = {
  data?: any[] | null;
  rowElement: ComponentType<ListChildComponentProps>;
  loading: boolean;
  onFetchMore?: (offset: number) => void;
};

type CommonRowProps = ListChildComponentProps<any> & {
  children: (rowData: any) => JSX.Element;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

type HeaderType = {
  label: string;
};

type StandartHeaderProps = {
  headers: HeaderType[];
  leftOptions?: boolean;
};

export type { TableProps, CommonRowProps, StandartHeaderProps, HeaderType };
