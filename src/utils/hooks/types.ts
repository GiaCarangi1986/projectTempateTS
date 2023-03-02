type InitDataType = {
  data: any;
  loading: boolean | undefined;
  error: any;
  status: number | undefined;
};

type ResponseType = InitDataType & {
  getResult: (func: (params: any) => Promise<any>, params?: any) => void;
};

type ErrorSnackMesProps = {
  loading: boolean | undefined;
  error?: any;
  message?: string;
  data?: any;
  status?: number | undefined;
};

export type { InitDataType, ResponseType, ErrorSnackMesProps };
