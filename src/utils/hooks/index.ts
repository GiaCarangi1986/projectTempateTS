import { FC, useContext, useEffect, useState } from 'react';

import { ERRORS, INIT_DATA_RESPONSE, PARAM_NAME } from '../../const';
import { StateContext } from '../../components/Container';

import { FilterType } from '../../components/TableSettings/types';
import { ErrorSnackMesProps, ResponseType } from './types';
import { SortDirection } from '../../components/Table/types';

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

export const useFilters = (initfilters: FilterType = INIT_FILTERS) => {
  const [filters, setFilters] = useState<FilterType>({
    ...INIT_FILTERS,
    ...initfilters
  });
  const [needConcat, setNeedConcat] = useState(false);

  const changeFilter = (param: FilterType) => {
    const paramIsOffset = Object.keys(param)[0] === 'offset';
    setNeedConcat(paramIsOffset);
    setFilters({
      ...filters,
      offset: paramIsOffset ? filters.offset : INIT_FILTERS.offset,
      ...param
    });
  };

  return { filters, changeFilter, needConcat };
};

export const useSnackMes = ({
  loading,
  error,
  message = 'Запрос успешно выполнился!',
  data
}: ErrorSnackMesProps): void => {
  const { openSnackbar, setSnackMessage, setError } = useContext(StateContext);

  const openSnackBar = (mes: string, err?: boolean) => {
    if (err) {
      setError(true);
    } else {
      setError(false);
    }
    setSnackMessage(mes);
    openSnackbar();
  };

  useEffect(() => {
    if (!loading) {
      if (error) {
        let errorText = ERRORS.genaral;
        if (typeof error === 'string') {
          errorText = error;
        } else if (error instanceof Error) {
          errorText = error.message;
        }
        openSnackBar(errorText, true);
      } else if (data !== undefined) {
        console.log('data', data);
        openSnackBar(message);
      }
    }
  }, [error, loading, data]);
};

export type SortingState = { [key: string]: SortDirection | undefined };

export const useSorting = (initialSortState: SortingState = {}) => {
  const [sortState, setSortState] = useState<SortingState>(initialSortState);

  const getNextSortDirection = (field: SortDirection | undefined) => {
    switch (field) {
      case SortDirection.DESC:
        return SortDirection.ASC;
      case SortDirection.ASC:
        return undefined;
      case SortDirection.NONE:
      default:
        return SortDirection.DESC;
    }
  };

  const handleSort = (key: string) => {
    const currentSortState = sortState[key];
    const nextSortState = getNextSortDirection(currentSortState);

    setSortState({ [key]: nextSortState });
  };

  return {
    sortState,
    handleSort
  };
};
