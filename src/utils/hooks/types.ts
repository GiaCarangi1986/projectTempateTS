type ResponseType = {
  data: any;
  loading: boolean | undefined;
  error: any;
  getResult: (func: (params: any) => Promise<any>, params?: any) => void;
};

type ErrorSnackMesProps = {
  loading: boolean | undefined;
  error: string | undefined;
};

export type { ResponseType, ErrorSnackMesProps };
