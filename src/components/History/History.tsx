import React, { useEffect } from 'react';

import Table from '../Table';
import {
  StandartPageContext,
  useErrorSnackMes,
  useFilters,
  useGetResponse,
  useSorting
} from '../../utils';
import StandartRow, { PAGE } from '../Table/StandartRow';
import StandartHeader from '../Table/StandartHeader';
import * as api from '../../api';
import TableSettings from '../TableSettings';

import style from './index.module.scss';

const History = () => {
  const HEADER = [
    {
      label: 'Автор',
      sortLabel: 'sortAuthor'
    },
    {
      label: 'Дата и время',
      sortLabel: 'sortDateTime'
    },
    {
      label: 'Тип продукции',
      sortLabel: 'sortProductType'
    },
    {
      label: 'Номер плавки'
    },
    {
      label: 'ОР',
      sortLabel: 'sortOR'
    },
    {
      label: 'ОХН',
      sortLabel: 'sortOHN'
    },
    {
      label: 'Сечение, мм'
    }
  ];
  const { data, loading, error, getResult } = useGetResponse();
  const { filters, changeFilter } = useFilters();
  const { sortState, handleSort } = useSorting();
  console.log('sortState', sortState);
  useErrorSnackMes({ loading, error });

  const handleFetchMore = (offset: number) => {
    changeFilter({ offset });
  };

  useEffect(() => {
    console.log('filters', filters);
    getResult(api.testHistory, filters);
  }, [filters]);

  return (
    <StandartPageContext.Provider value={{ Page: PAGE.rowInfo }}>
      <div className={style.history__container}>
        <TableSettings filters={filters} changeFilter={changeFilter} />
        <div className={style.history__content}>
          <div className={style.history__table}>
            <StandartHeader
              headers={HEADER}
              leftOptions
              onSort={handleSort}
              sortData={sortState}
            />
          </div>
          <div className={style.history__table}>
            <Table
              data={data}
              rowElement={StandartRow}
              loading={!!loading}
              onFetchMore={handleFetchMore}
            />
          </div>
        </div>
      </div>
    </StandartPageContext.Provider>
  );
};

export default History;
