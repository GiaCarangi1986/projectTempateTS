import { fromPairs } from 'lodash';
import {
  deleteSpaces,
  handingErrors,
  deleteObjKeyInState,
  andOrChangeObjValueInState
} from './helpers';

import { useGetResponse } from './hooks';

import { dateYYYYMMDDdashHHmmcolon, dateDDMMYYYYPoint } from './date';

export {
  deleteSpaces,
  handingErrors,
  useGetResponse,
  deleteObjKeyInState,
  andOrChangeObjValueInState,
  dateYYYYMMDDdashHHmmcolon,
  dateDDMMYYYYPoint
};
