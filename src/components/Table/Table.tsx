import React, { FC, useRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import _ from 'lodash';

import { Spinner } from '../../views/common';

import { TableProps } from './types';
import style from './index.module.scss';

const Table: FC<TableProps> = ({
  data,
  rowElement,
  loading,
  hasNextPage,
  onFetchMore = () => null
}) => {
  const itemCount = data?.length ?? 0;

  const loaderRef = useRef<any>();

  const tableScroll = () => {
    if (loaderRef && loaderRef.current && !loading) {
      const loadProps = loaderRef.current.props;
      const loadState = loaderRef.current.state;

      if (hasNextPage && loadProps && loadState) {
        const scrollPercent = Math.floor(
          (loadState.scrollOffset /
            (loadProps.itemCount * loadProps.itemSize - loadProps.height)) *
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
          <List
            height={height}
            width={width}
            itemCount={itemCount}
            itemSize={55}
            itemData={data}
            ref={loaderRef}
            onScroll={throttledScroll}
          >
            {rowElement}
          </List>
        )}
      </AutoSizer>

      {(loading || !data) && <Spinner />}
      {data && data.length === 0 && !loading && (
        <div className={style['table__empty-container']}>
          <p className={style['table__empty-text']}>Данные не найдены</p>
        </div>
      )}
    </>
  );
};

export default Table;
