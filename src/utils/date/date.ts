import dayjs from './day';

require('dayjs/locale/ru');

export const dateYYYYMMDDdashHHmmcolon = (date: Date | string = new Date()) =>
  dayjs(date).format('YYYY-MM-DDTHH:mm');

export const dateDDMMYYYYPoint = (date: Date | string = new Date()) => {
  return dayjs(date).format('DD.MM.YYYY');
};

export const dateDDMMYYYYpointHHmmcolon = (date: Date | string = new Date()) =>
  dayjs(date).format('DD.MM.YYYY HH:mm');

export const dateYYYYMMDDBack = (
  date: Date | string | undefined = new Date()
) => {
  if (date) {
    return dayjs(date).format('YYYY-MM-DD');
  }
  return '';
};

export const dateDMMMMHHmmLocal = (dateStr: Date | string = new Date()) =>
  `${dayjs(dateStr).locale('ru').format('D MMMM HH:mm')}`;
