import { useContext, useEffect, useState } from 'react';
import _ from 'lodash';

import {
  ERRORS,
  INIT_DATA_RESPONSE,
  PARAM_NAME,
  HISTORY_COLUMNS
} from '../../const';
import { StateContext } from '../../components/Container';
import { EMPTY_NAMES } from '../../components/History';

import { FilterType } from '../../components/TableSettings/types';
import { ErrorSnackMesProps, ResponseType, InitDataType } from './types';
import { SortDirection } from '../../components/Table/types';
import { ColumnsInteractiveType } from '../../components/TableSettings/InteractiveColumns';

export const useGetResponse = (): ResponseType => {
  const [data, setData] = useState<InitDataType>(INIT_DATA_RESPONSE);

  const setSomeParam = (paramName: string, paramValue: any) => {
    setData((prev) => {
      const obj = { ...prev };
      obj[paramName as keyof InitDataType] = paramValue;

      return obj;
    });
  };

  const getResult = (func: (params: any) => Promise<any>, params?: any) => {
    setSomeParam(PARAM_NAME.loading, true);
    setSomeParam(PARAM_NAME.data, INIT_DATA_RESPONSE.data);
    setSomeParam(PARAM_NAME.error, INIT_DATA_RESPONSE.error);
    setSomeParam(PARAM_NAME.status, INIT_DATA_RESPONSE.status);

    func(params)
      .then((res: any) => {
        setSomeParam(PARAM_NAME.loading, INIT_DATA_RESPONSE.loading);
        setSomeParam(PARAM_NAME.data, res.data);
        setSomeParam(PARAM_NAME.error, INIT_DATA_RESPONSE.error);
        setSomeParam(PARAM_NAME.status, res.status);
      })
      .catch((err: any) => {
        setSomeParam(PARAM_NAME.loading, INIT_DATA_RESPONSE.loading);
        setSomeParam(PARAM_NAME.data, INIT_DATA_RESPONSE.data);
        setSomeParam(PARAM_NAME.error, err);
        setSomeParam(PARAM_NAME.status, INIT_DATA_RESPONSE.status);
      });
  };

  return {
    data: data.data,
    error: data.error,
    loading: data.loading,
    getResult,
    status: data.status
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
  data,
  status
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
      } else if (data !== undefined || status) {
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

export const useImage = (src: string) => {
  const [sourceLoaded, setSourceLoaded] = useState<string>('');

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setSourceLoaded(src);
  }, [src]);

  return sourceLoaded;
};

export const useWindowSizes = () => {
  const [width, setWindow] = useState(0);
  const [height, setHeight] = useState(0);

  const setSizes = () => {
    setWindow(window.innerWidth);
    setHeight(window.innerHeight);
  };

  window.onresize = function () {
    setSizes();
  };

  useEffect(() => {
    setSizes();
  }, [window]);

  return {
    width,
    height
  };
};

export const useIsOverflow = (ref: React.RefObject<HTMLDivElement>) => {
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const curRef = ref.current;
    if (curRef?.scrollHeight) {
      if (
        curRef.scrollHeight > curRef.clientHeight ||
        curRef.scrollWidth > curRef.clientWidth
      ) {
        setIsOverflow(true);
      }
    }
  }, [ref.current?.scrollHeight]);

  return isOverflow;
};

export const useColumns = () => {
  const [cols, setCols] = useState<ColumnsInteractiveType[]>([]);
  const [initCols, setInitCols] = useState<ColumnsInteractiveType[]>([]);
  const [isInited, setInited] = useState(false);

  const keys = Object.keys(HISTORY_COLUMNS);

  const getServerHeaders = () => {
    const serverCol: ColumnsInteractiveType[] = []; // эти значения будут сериализованы
    const arr: ColumnsInteractiveType[] = [];

    for (let i = 0; i < serverCol.length; i++) {
      const servEl = serverCol[i];
      if (keys.find((el) => el === servEl.name)) {
        arr.push(servEl);
      }
    }

    setCols(arr);
  };

  const getConstsHeaders = () => {
    const arr: ColumnsInteractiveType[] = [];

    for (let i = 0; i < keys.length; i++) {
      const keyEl = keys[i];
      if (!EMPTY_NAMES.includes(keyEl)) {
        const el = HISTORY_COLUMNS[keyEl as keyof typeof HISTORY_COLUMNS];
        arr.push({
          label: el.label ?? '',
          name: el.name ?? '',
          isShow: true,
          sortLabel: el.sortLabel ?? '',
          width: el.width ?? ''
        });
      }
    }

    setCols(_.cloneDeep(arr));
    if (!isInited) {
      setInitCols(_.cloneDeep(arr));
      setInited(true);
    }
  };

  const getHeaders = () => {
    // сначала выполнить запрос с сервера (придет сначала [])
    getServerHeaders();
    getConstsHeaders();
  };

  useEffect(() => {
    getHeaders();
  }, []);

  return {
    cols,
    setCols,
    initCols
  };
};

export const useGridTemplateColumns = (columns: ColumnsInteractiveType[]) => {
  const [gridTemplateColumns, setGridTemplateColumns] = useState('');

  useEffect(() => {
    let str = 'minmax(40px, 0.1fr)';
    columns.forEach(({ width, isShow }) => {
      if (isShow) {
        str += ` ${width}`;
      }
    });
    setGridTemplateColumns(str);
  }, [columns]);

  return gridTemplateColumns;
};
