import React, { FC, useRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';

import { Spinner } from '../../views/common';

import { TableProps } from './types';
import style from './index.module.scss';

const Table: FC<TableProps> = ({
  data,
  rowElement,
  loading,
  onFetchMore = () => null
}) => {
  const itemCount = data?.length ?? 0;

  const loaderRef = useRef<any>();
  const isItemLoaded = (index: number) => index < (data?.length ?? 0) - 1;
  const handleLoadItems = (startIndex: number) => onFetchMore(startIndex);

  return (
    <>
      <AutoSizer>
        {({ height, width }: Size) => (
          <InfiniteLoader
            ref={loaderRef}
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={handleLoadItems}
          >
            {({ onItemsRendered, ref }) => (
              <List
                ref={ref}
                onItemsRendered={onItemsRendered}
                height={height}
                width={width}
                itemCount={itemCount}
                itemSize={55}
                itemData={data}
              >
                {rowElement}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>

      {loading && !data && <Spinner />}
      {!data?.length && !loading && (
        <div className={style['table__empty-container']}>
          <p className={style['table__empty-text']}>Данные не найдены</p>
        </div>
      )}
    </>
  );
};

export default Table;
