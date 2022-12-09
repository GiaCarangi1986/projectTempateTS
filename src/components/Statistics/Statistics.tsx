import React, { useEffect } from 'react';

import { useErrorSnackMes, useFilters, useGetResponse } from '../../utils';
import DateSearch from '../DateSearch';
import Chart from './Chart';
import * as api from '../../api';
import { Spinner } from '../../views/common';

import { ChartType } from './types';
import style from './index.module.scss';

const Statistics = () => {
  const { filters, changeFilter } = useFilters();
  const { data, loading, error, getResult } = useGetResponse();

  useErrorSnackMes({ loading, error });

  useEffect(() => {
    console.log('filters', filters);
    getResult(api.getStatistic, filters);
  }, [filters]);

  return (
    <div className={style.statistics}>
      <DateSearch filters={filters} changeFilter={changeFilter} />
      <div className={style['statistics_chart-container']}>
        {loading ? (
          <Spinner />
        ) : (
          data?.map((el: ChartType) => <Chart key={el.title} chart={el} />)
        )}
      </div>
    </div>
  );
};

export default Statistics;
