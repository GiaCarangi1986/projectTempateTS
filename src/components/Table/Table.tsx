import React, {
  createContext,
  ElementType,
  FC,
  forwardRef,
  useContext,
  useRef
} from 'react';
import {
  VariableSizeList as List,
  ListChildComponentProps
} from 'react-window';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import _ from 'lodash';
import cn from 'classnames';

import { Spinner } from '../../views/common';
import StandartHeader from './StandartHeader';

import {
  HeaderContextType,
  HeaderListProps,
  InnerListContainerProps,
  TableProps
} from './types';
import style from './index.module.scss';

const HEADER_HEIGHT = 40;
const ROW_HEIGHT = 55;

const initialContextValue = {
  headers: [],
  onSort: () => null,
  onExpand: () => null,
  ItemRenderer: 'div' as ElementType,
  leftOptionsHeader: false,
  scrollAction: () => null
};

// context used to pass props to header through inner list and item wrapper through
export const HeaderContext =
  createContext<HeaderContextType>(initialContextValue);

// row wrapper used to override position for first element (due to header)
const ItemWrapper = ({
  index,
  style: styles,
  ...rest
}: ListChildComponentProps) => {
  const { ItemRenderer, width } = useContext(HeaderContext);
  const wrapperStyle =
    index === 0 ? { ...styles, top: `${HEADER_HEIGHT}px` } : styles;

  return (
    <ItemRenderer index={index} style={wrapperStyle} width={width} {...rest} />
  );
};

// inner container for list with sticky header on top
const InnerListContainer = forwardRef<HTMLDivElement, InnerListContainerProps>(
  ({ children, ...rest }, ref) => {
    const { headers, onSort, sortData, styleHeader, leftOptionsHeader } =
      useContext(HeaderContext);
    return (
      <div ref={ref} className={style.innerContainer} {...rest}>
        <div className={cn(style.header_sticky, styleHeader)}>
          <StandartHeader
            headers={headers}
            onSort={onSort}
            sortData={sortData}
            leftOptions={leftOptionsHeader}
          />
        </div>
        {children}
      </div>
    );
  }
);

const HeaderList = forwardRef<List, HeaderListProps>(
  (
    {
      children,
      headers,
      onSort,
      sortData,
      styleHeader,
      leftOptionsHeader,
      ...rest
    },
    ref
  ) => (
    <HeaderContext.Provider
      value={{
        ItemRenderer: children,
        onSort,
        headers,
        sortData,
        width: rest.width,
        height: rest.height,
        styleHeader,
        leftOptionsHeader
      }}
    >
      <List {...rest} ref={ref}>
        {ItemWrapper}
      </List>
    </HeaderContext.Provider>
  )
);

const Table: FC<TableProps> = ({
  data,
  rowElement,
  loading,
  hasNextPage,
  onFetchMore = () => null,
  onSort,
  sortData,
  headers,
  styleHeader,
  leftOptionsHeader,
  heightRow
}) => {
  const itemCount = data?.length ?? 0;

  const getItemSize = (index: number) => {
    let rowHeight;
    if (heightRow) {
      rowHeight = heightRow;
    } else {
      rowHeight = ROW_HEIGHT;
    }
    return index === 0 ? rowHeight + HEADER_HEIGHT : rowHeight;
  };

  const loaderRef = useRef<any>();

  const tableScroll = () => {
    if (loaderRef && loaderRef.current && !loading) {
      const loadProps = loaderRef.current.props;
      const loadState = loaderRef.current.state;

      if (hasNextPage && loadProps && loadState) {
        const scrollPercent = Math.floor(
          (loadState.scrollOffset /
            (loadProps.itemCount * loadProps.itemSize() - loadProps.height)) *
            100
        );
        if (scrollPercent > 50) {
          onFetchMore();
        }
      }
    }
  };

  const throttledScroll = _.throttle(tableScroll, 300);

  return (
    <>
      <AutoSizer>
        {({ height, width }: Size) => (
          <HeaderList
            itemSize={getItemSize}
            className={style.table__list}
            height={height}
            width={width}
            itemCount={itemCount}
            itemData={data}
            ref={loaderRef}
            onScroll={throttledScroll}
            innerElementType={InnerListContainer}
            headers={headers}
            onSort={onSort}
            sortData={sortData}
            styleHeader={styleHeader}
            leftOptionsHeader={leftOptionsHeader}
            useIsScrolling
          >
            {rowElement}
          </HeaderList>
        )}
      </AutoSizer>

      {(loading || !data) && <Spinner withoutHeader />}
      {data && data.length === 0 && !loading && (
        <div className={style['table__empty-container']}>
          <p className={style['table__empty-text']}>Данные не найдены</p>
        </div>
      )}
    </>
  );
};

export default Table;
