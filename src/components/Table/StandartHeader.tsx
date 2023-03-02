import React, { FC, useMemo } from 'react';

import HeaderConstructor from './HeaderConstructor';

import { HeaderType, SortDirection, StandartHeaderProps } from './types';
import style from './index.module.scss';
import { useGridTemplateColumns } from '../../utils';

const StandartHeader: FC<StandartHeaderProps> = ({
  headers,
  onSort,
  sortData,
  leftOptions
}) => {
  const rawLabels = useMemo(() => {
    const arr: HeaderType[] = [];
    headers.forEach(({ label, sortLabel, hidden, width, isShow }, id) => {
      if (isShow) {
        arr.push({
          id,
          label,
          sortLabel,
          hidden,
          width,
          isShow
        });
      }
    });
    return arr;
  }, [headers]);

  const items = useMemo(
    () =>
      rawLabels.map(({ id, label = '', sortLabel, hidden }) => {
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

  const gridTemplateColumns = useGridTemplateColumns(rawLabels);

  if (headers.length === 0) return null;

  return (
    <div className={style['standart-header']} style={{ gridTemplateColumns }}>
      {leftOptions && <div>{''}</div>}
      {items.map((el, index) => (
        <div key={el?.key || String(index)}>{el}</div>
      ))}
    </div>
  );
};

export default StandartHeader;
