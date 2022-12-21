import { ComponentType, MouseEventHandler } from 'react';
import { ListChildComponentProps } from 'react-window';

export enum SortDirection {
  DESC = 'DESC',
  ASC = 'ASC',
  NONE = 'NONE'
}

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
  sortDirection?: SortDirection;
  sortLabel?: string;
  hidden?: boolean;
};

type StandartHeaderProps = {
  headers: HeaderType[];
  leftOptions?: boolean;
  onSort?: (key: string) => void;
  sortData?: any;
};

type HeadercConstructorProps = HeaderType & {
  children: string;
  onClick: () => void;
  filter?: any;
  isSortable: boolean;
};

export type {
  TableProps,
  CommonRowProps,
  StandartHeaderProps,
  HeaderType,
  HeadercConstructorProps
};
