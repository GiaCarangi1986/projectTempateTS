import React, { useContext, useEffect } from 'react';

import { useFilters, useGetResponse } from '../../utils';
import DateSearch from '../DateSearch';
import Chart from './Chart';
import * as api from '../../api';
import { Spinner } from '../../views/common';
import { StateContext } from '../Container';
import { ERRORS } from '../../const';

import { ChartType } from './types';
import style from './index.module.scss';

const Statistics = () => {
  const { filters, changeFilter } = useFilters();
  const { data, loading, error, getResult } = useGetResponse();
  const { openSnackbar, setSnackMessage, setError } = useContext(StateContext);

  useEffect(() => {
    if (!loading && error) {
      openSnackbar();
      setError(true);
      setSnackMessage(error ?? ERRORS.genaral);
    }
  }, [error, loading]);

  useEffect(() => {
    console.log('filters', filters);
    getResult(api.testSending, filters);
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
