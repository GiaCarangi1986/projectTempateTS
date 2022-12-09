import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localeData from 'dayjs/plugin/localeData';
import calendar from 'dayjs/plugin/calendar';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(localeData);
dayjs.extend(calendar);

export default dayjs;
