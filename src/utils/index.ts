import {
  deleteSpaces,
  handingErrors,
  deleteObjKeyInState,
  andOrChangeObjValueInState,
  roundDigit,
  fillCoordsImg,
  sortArrOfObjById
} from './helpers';

import {
  useGetResponse,
  useFilters,
  useSnackMes,
  useSorting,
  useImage,
  useWindowSizes,
  useIsOverflow,
  useColumns,
  useGridTemplateColumns
} from './hooks';

import { StandartPageContext } from './contexts';

import {
  dateYYYYMMDDdashHHmmcolon,
  dateDDMMYYYYPoint,
  dateDDMMYYYYpointHHmmcolon,
  dateYYYYMMDDBack,
  dateDMMMMHHmmLocal
} from './date';

export {
  deleteSpaces,
  handingErrors,
  useGetResponse,
  deleteObjKeyInState,
  andOrChangeObjValueInState,
  StandartPageContext,
  dateYYYYMMDDdashHHmmcolon,
  useFilters,
  dateDDMMYYYYPoint,
  useSnackMes,
  dateDDMMYYYYpointHHmmcolon,
  dateYYYYMMDDBack,
  dateDMMMMHHmmLocal,
  useSorting,
  roundDigit,
  useImage,
  useWindowSizes,
  fillCoordsImg,
  sortArrOfObjById,
  useIsOverflow,
  useColumns,
  useGridTemplateColumns
};
