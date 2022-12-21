import React, { FC, useMemo } from 'react';

import HeaderConstructor from './HeaderConstructor';

import { SortDirection, StandartHeaderProps } from './types';
import style from './index.module.scss';

const StandartHeader: FC<StandartHeaderProps> = ({
  headers,
  onSort,
  sortData,
  leftOptions
}) => {
  const rawLabels = useMemo(
    () =>
      headers.map(({ label, sortLabel, hidden }, id) => ({
        id,
        label,
        sortLabel,
        hidden
      })),
    [headers]
  );

  const items = useMemo(
    () =>
      rawLabels.map(({ id, label, sortLabel, hidden }) => {
        if (hidden) {
          return null;
        }

        const isSortable = !!sortLabel;

        const handleSort = () => isSortable && onSort && onSort(sortLabel);

        const sortDirection =
          isSortable && sortData?.[sortLabel]
            ? sortData?.[sortLabel]
            : SortDirection.NONE;

        return (
          <div key={String(id + label)} className={style.container}>
            <HeaderConstructor
              onClick={handleSort}
              key={id}
              isSortable={isSortable}
              sortDirection={sortDirection}
              label={label}
            >
              {label}
            </HeaderConstructor>
          </div>
        );
      }),
    [rawLabels, sortData]
  );

  return (
    <div className={style['standart-header']}>
      {leftOptions && <div>{''}</div>}
      {items.map((el, index) => (
        <div key={el?.key || String(index)}>{el}</div>
      ))}
    </div>
  );
};

export default StandartHeader;
