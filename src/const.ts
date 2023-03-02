export const PAGE_NAME = {
  main: 'main',
  auth: 'auth',
  history: 'history',
  statistics: 'statistics',
  reference: 'reference'
};

export const PATHS = {
  [PAGE_NAME.main]: '/',
  [PAGE_NAME.auth]: '/auth',
  [PAGE_NAME.history]: '/history',
  [PAGE_NAME.statistics]: '/statistics',
  [PAGE_NAME.reference]: '/reference'
};

export const FORM_NAMES = {
  non_field_errors: 'non_field_errors',
  login: 'login',
  password: 'password',
  temleteNumber: 'temleteNumber',
  productId: 'productId',
  workshopId: 'workshopId',
  meltingNumber: 'meltingNumber',
  carbon: 'carbon',
  scandium: 'scandium',
  manganese: 'manganese',
  phosphorus: 'phosphorus',
  sulfur: 'sulfur',
  aluminum: 'aluminum',
  steelMark: 'steelMark',
  section: 'section',
  length: 'length',
  width: 'width',
  comment: 'comment',
  measurementTechniqueId: 'measurementTechniqueId',
  agreeResults: 'agreeResults',
  isAgree: 'isAgree',
  numberQmet: 'numberQmet',
  search: 'search',
  dateStart: 'dateStart',
  dateEnd: 'dateEnd',
  checkWithoutAgree: 'checkWithoutAgree',
  checkAgree: 'checkAgree',
  checkNotAgree: 'checkNotAgree'
};

export const FORM_LABELS = {
  login: 'Логин',
  password: 'Пароль',
  temleteNumber: '№ темплета',
  productId: 'Вид продукции',
  workshopId: 'Цех',
  meltingNumber: 'Номер плавки',
  carbon: 'C',
  scandium: 'Si',
  manganese: 'Mn',
  phosphorus: 'P',
  sulfur: 'S',
  aluminum: 'Al',
  steelMark: 'Марка стали',
  section: 'Сечение, мм',
  length: 'Длина',
  width: 'Ширина',
  comment: 'Комментарий',
  measurementTechniqueId: 'Методика измерения',
  agreeResults: 'Подтверждаю, что автоматизированный контроль прошел успешно',
  numberQmet: 'Номер Qmet',
  search: 'Поиск...',
  dateStart: 'Дата начала',
  dateEnd: 'Дата окончания',
  checkWithoutAgree: 'Без подверждения',
  checkAgree: 'Успешное подтверждение',
  checkNotAgree: 'Неуспешное подтверждение'
};

export const COOKIES_DATA = {
  token: 'token'
};

export const ERRORS = {
  genaral: 'Произошла неизвестная ошибка. Попробуйте позже',
  server: 'Произошла ошибка на сервере. Попробуйте позже'
};

export const SELECT_TYPES = {
  default: 'default',
  productId: 'productId'
};

export const ELEMENTS_ID = {
  AnalysisForm: 'AnalysisForm'
};

export const PARAM_NAME = {
  data: 'data',
  loading: 'loading',
  error: 'error',
  status: 'status'
};

export const INIT_DATA_RESPONSE = {
  data: undefined,
  loading: false,
  error: undefined,
  status: undefined
};

export const INPUT_LABEL = 'input-label';

export const DEF_INFO = [
  {
    name: 'ОХН',
    value: 'OHN'
  },
  {
    name: 'ОР',
    value: 'OR'
  },
  {
    name: 'ОТ',
    value: 'OT'
  },
  {
    name: 'ГТ',
    value: 'GT'
  },
  {
    name: 'ЛПТс',
    value: 'LPTS'
  },
  {
    name: 'ТН',
    value: 'TN'
  }
];

export type ColumnType = {
  label?: string;
  sortLabel?: string;
  name?: string;
  width?: string;
};

type HistoryColumnsType = {
  id: ColumnType;
  templeteNumber: ColumnType;
  author: ColumnType;
  dateTime: ColumnType;
  productType: ColumnType;
  workshop: ColumnType;
  OHN: ColumnType;
  OR: ColumnType;
  OT: ColumnType;
  GT: ColumnType;
  LPTS: ColumnType;
  TN: ColumnType;
  section: ColumnType;
  isAgree: ColumnType;
  measurementTechnique: ColumnType;
};

export const HISTORY_COLUMNS: HistoryColumnsType = {
  id: {
    name: 'id'
  },
  templeteNumber: {
    label: 'Темлет, №',
    sortLabel: 'templete_number',
    name: 'templeteNumber',
    width: 'minmax(95px, 0.5fr)'
  },
  author: {
    label: 'Автор',
    sortLabel: 'user',
    name: 'author',
    width: 'minmax(170px, 1fr)'
  },
  dateTime: {
    label: 'Дата и время',
    sortLabel: 'created_at',
    name: 'dateTime',
    width: 'minmax(120px, 0.5fr)'
  },
  productType: {
    label: 'Тип продукции',
    sortLabel: 'product__name',
    name: 'productType',
    width: 'minmax(135px, 0.8fr)'
  },
  workshop: {
    label: 'Цех',
    sortLabel: 'department__name',
    name: 'workshop',
    width: 'minmax(50px, 0.6fr)'
  },
  OHN: {
    label: 'ОХН',
    sortLabel: 'OHN',
    name: 'OHN',
    width: 'minmax(50px, 0.3fr)'
  },
  OR: {
    label: 'ОР',
    sortLabel: 'OR',
    name: 'OR',
    width: 'minmax(50px, 0.3fr)'
  },
  OT: {
    label: 'ОТ',
    sortLabel: 'OT',
    name: 'OT',
    width: 'minmax(50px, 0.3fr)'
  },
  GT: {
    label: 'ГТ',
    sortLabel: 'GT',
    name: 'GT',
    width: 'minmax(50px, 0.3fr)'
  },
  LPTS: {
    label: 'ЛПТс',
    sortLabel: 'LPTS',
    name: 'LPTS',
    width: 'minmax(60px, 0.4fr)'
  },
  TN: {
    label: 'ТН',
    sortLabel: 'TN',
    name: 'TN',
    width: 'minmax(50px, 0.3fr)'
  },
  section: {
    label: 'Сечение, мм',
    name: 'section',
    width: 'minmax(100px, 0.7fr)'
  },
  isAgree: {
    name: 'isAgree'
  },
  measurementTechnique: {
    label: 'Методика измерения',
    sortLabel: 'measurement_technique__name',
    name: 'measurementTechnique',
    width: 'minmax(175px, 1fr)'
  }
};

export const TYPE_DATE = {
  datetimeLocal: 'datetime-local',
  date: 'date'
};
