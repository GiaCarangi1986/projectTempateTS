import {
  ComponentType,
  ElementType,
  MouseEventHandler,
  ReactNode,
  Ref
} from 'react';
import {
  CommonProps,
  VariableSizeListProps,
  ListChildComponentProps
} from 'react-window';

import { ColumnType } from '../../const';

export enum SortDirection {
  DESC = 'DESC',
  ASC = 'ASC',
  NONE = 'NONE'
}

type CommonRowProps = ListChildComponentProps<any> & {
  children: (rowData: any) => JSX.Element;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

type HeaderType = ColumnType & {
  sortDirection?: SortDirection;
  hidden?: boolean;
  isShow?: boolean;
  id?: number;
};

type TableProps = {
  data?: any[] | null;
  rowElement: ComponentType<ListChildComponentProps>;
  loading: boolean;
  onFetchMore?: () => void;
  hasNextPage: boolean;
  headers: Array<HeaderType>;
  onSort?: (key: string) => void;
  sortData?: any;
  styleHeader?: string;
  leftOptionsHeader?: boolean;
  heightRow?: number;
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

type HeaderContextType = Pick<TableProps, 'headers' | 'onSort' | 'sortData'> & {
  ItemRenderer: ElementType;
  width?: number | string;
  height?: number | string;
  styleHeader?: string;
  leftOptionsHeader?: boolean;
};

type InnerListContainerProps = CommonProps & {
  children: ReactNode;
};

interface HeaderListProps
  extends VariableSizeListProps,
    Pick<TableProps, 'headers' | 'onSort' | 'sortData'> {
  ref: Ref<any>;
  styleHeader?: string;
  leftOptionsHeader?: boolean;
}

export type {
  TableProps,
  CommonRowProps,
  StandartHeaderProps,
  HeaderType,
  HeadercConstructorProps,
  HeaderContextType,
  InnerListContainerProps,
  HeaderListProps
};
