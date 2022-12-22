import React, { useEffect, useState } from 'react';

import Table from '../Table';
import {
  StandartPageContext,
  useSnackMes,
  useFilters,
  useGetResponse,
  useSorting
} from '../../utils';
import StandartRow, { PAGE } from '../Table/StandartRow';
import StandartHeader from '../Table/StandartHeader';
import * as api from '../../api';
import TableSettings from '../TableSettings';
import { HistoryType } from './types';

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
  const { filters, changeFilter, needConcat } = useFilters();
  const { sortState, handleSort } = useSorting();
  const [loadedData, setLoadeData] = useState<HistoryType[] | undefined>();

  console.log('sortState', sortState);
  useSnackMes({ loading, error });

  const handleFetchMore = () => {
    if (loadedData) {
      changeFilter({ offset: loadedData.length });
    }
  };

  useEffect(() => {
    if (data && !loading) {
      if (needConcat) {
        const arrTemp = loadedData ?? [];
        setLoadeData([...arrTemp, ...data.data]);
      } else {
        setLoadeData(data.data);
      }
    }
  }, [data, loading]);

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
              hasNextPage={false}
            />
          </div>
        </div>
      </div>
    </StandartPageContext.Provider>
  );
};

export default History;
