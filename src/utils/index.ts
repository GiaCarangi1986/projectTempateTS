import {
  deleteSpaces,
  handingErrors,
  deleteObjKeyInState,
  andOrChangeObjValueInState
} from './helpers';

import { StandartPageContext } from './contexts';

import { useGetResponse, useFilters, useSnackMes, useSorting } from './hooks';

import { dateYYYYMMDDdashHHmmcolon, dateDDMMYYYYPoint } from './date';

export {
  deleteSpaces,
  handingErrors,
  useGetResponse,
  deleteObjKeyInState,
  andOrChangeObjValueInState,
  dateYYYYMMDDdashHHmmcolon,
  dateDDMMYYYYPoint,
  useSnackMes,
  StandartPageContext,
  useFilters,
  useSorting
};
