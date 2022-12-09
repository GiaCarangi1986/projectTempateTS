import { FC, useContext, useEffect, useState } from 'react';

import { ERRORS, INIT_DATA_RESPONSE, PARAM_NAME } from '../../const';
import { StateContext } from '../../components/Container';

import { FilterType } from '../../components/TableSettings/types';
import { ErrorSnackMesProps, ResponseType } from './types';

export const useGetResponse = (): ResponseType => {
  const [data, setData] = useState(INIT_DATA_RESPONSE);

  const setSomeParam = (paramName: string, paramValue: any) => {
    setData((prev) => {
      const obj = { ...prev };
      obj[paramName] = paramValue;

      return obj;
    });
  };

  const getResult = (func: (params: any) => Promise<any>, params?: any) => {
    setSomeParam(PARAM_NAME.loading, true);
    setSomeParam(PARAM_NAME.data, INIT_DATA_RESPONSE.data);
    setSomeParam(PARAM_NAME.error, INIT_DATA_RESPONSE.error);

    func(params)
      .then((res: any) => {
        setSomeParam(PARAM_NAME.loading, INIT_DATA_RESPONSE.loading);
        setSomeParam(PARAM_NAME.data, res);
        setSomeParam(PARAM_NAME.error, INIT_DATA_RESPONSE.error);
      })
      .catch((err: any) => {
        setSomeParam(PARAM_NAME.loading, INIT_DATA_RESPONSE.loading);
        setSomeParam(PARAM_NAME.data, INIT_DATA_RESPONSE.data);
        setSomeParam(PARAM_NAME.error, err);
      });
  };

  return {
    data: data.data,
    error: data.error,
    loading: data.loading,
    getResult
  };
};

export const INIT_FILTERS: FilterType = {
  search: '',
  dateStart: '',
  dateEnd: '',
  notChecked: {
    checkAgree: false,
    checkNotAgree: false,
    checkWithoutAgree: false
  },
  offset: 0,
  limit: 20
};

export const useFilters = () => {
  const [filters, setFilters] = useState<FilterType>(INIT_FILTERS);

  const changeFilter = (param: FilterType) => {
    setFilters({ ...filters, ...param });
  };

  return { filters, changeFilter };
};

export const useErrorSnackMes = ({
  loading,
  error
}: ErrorSnackMesProps): void => {
  const { openSnackbar, setSnackMessage, setError } = useContext(StateContext);

  useEffect(() => {
    if (!loading && error) {
      openSnackbar();
      setError(true);
      setSnackMessage(error ?? ERRORS.genaral);
    }
  }, [error, loading]);
};
