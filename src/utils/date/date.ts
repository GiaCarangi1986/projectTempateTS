import { Dayjs } from 'dayjs';
import dayjs from './day';

require('dayjs/locale/ru');

export const dateYYYYMMDDdashHHmmcolon = (date = new Date()) =>
  dayjs(date).format('YYYY-MM-DDTHH:mm');

export const dateDDMMYYYYPoint = (date = new Date()) => {
  return dayjs(date).format('DD.MM.YYYY');
};
