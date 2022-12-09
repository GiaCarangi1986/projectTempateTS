export const PAGE_NAME = {
  main: 'main',
  auth: 'auth'
};

export const PATHS = {
  [PAGE_NAME.main]: '/',
  [PAGE_NAME.auth]: '/auth'
};

export const FORM_NAMES = {
  non_field_errors: 'non_field_errors',
  login: 'login',
  password: 'password',
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
  search: 'Поиск...',
  dateStart: 'Дата начала',
  dateEnd: 'Дата окончания',
  checkWithoutAgree: 'Без подверждения',
  checkAgree: 'Успешное подтверждение',
  checkNotAgree: 'Неуспешное подтверждение'
};

export const COOKIES_DATA = {
  currentUser: 'currentUser'
};

export const ERRORS = {
  genaral: 'Произошла неизвестная ошибка. Попробуйте позже',
  server: 'Произошла ошибка на сервере. Попробуйте позже'
};

export const PARAM_NAME = {
  data: 'data',
  loading: 'loading',
  error: 'error'
};

export const INIT_DATA_RESPONSE = {
  [PARAM_NAME.data]: undefined,
  [PARAM_NAME.loading]: false,
  [PARAM_NAME.error]: undefined
};

export const SELECT_TYPES = {
  default: 'default'
};

export const PAGE_SIZE = 20;
