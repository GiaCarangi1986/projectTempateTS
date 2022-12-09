import React, { useEffect } from 'react';

import Table from '../Table';
import {
  StandartPageContext,
  useErrorSnackMes,
  useFilters,
  useGetResponse
} from '../../utils';
import StandartRow, { PAGE } from '../Table/StandartRow';
import StandartHeader from '../Table/StandartHeader';
import * as api from '../../api';
import TableSettings from '../TableSettings';

import style from './index.module.scss';

const History = () => {
  const HEADER = [
    {
      label: 'Автор'
    },
    {
      label: 'Дата и время'
    },
    {
      label: 'Тип продукции'
    },
    {
      label: 'Номер плавки'
    },
    {
      label: 'ОР'
    },
    {
      label: 'ОХН'
    },
    {
      label: 'Сечение, мм'
    }
  ];
  const { data, loading, error, getResult } = useGetResponse();
  const { filters, changeFilter } = useFilters();

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
            <StandartHeader headers={HEADER} leftOptions />
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
