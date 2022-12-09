import { useState } from 'react';

import { INIT_DATA_RESPONSE, PARAM_NAME } from '../../const';

type ResponseType = {
  data: any;
  loading: boolean | undefined;
  error: any;
  getResult: (func: (params: any) => Promise<any>, params?: any) => void;
};

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
