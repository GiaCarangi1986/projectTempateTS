import { ERRORS, FORM_NAMES } from '../../const';

export const deleteSpaces = (value: string | undefined) => {
  if (value) {
    return value.trimStart().trimEnd();
  }
  return '';
};

export const handingErrors = (response: any, serObj: any = {}): any[] => {
  /* 
    СТРУКТУРА ОШИБОК: 
    {*название поля, где произошла ошибка, или название, сообщающее о том, что ошибка произошла не в поле*: *текстовая ошибка*} 
    название, сообщающее о том, что ошибка произошла не в поле --- 'non_field_errors'
    ПРИМЕР ПРИШЕДШЕЙ ОШИБКИ: 
    {
      unic_number: 'Данный номер уже занят другим пользователем',
      card_id: 'Не существенной картой с данным номером'
    }
  */

  const value = response?.data ?? {};
  const errorsObj = [];

  const valsArr = Object.keys(value);
  if (valsArr?.length > 0) {
    valsArr.forEach((el) => {
      const key = serObj[el] ?? el;
      errorsObj.push({
        key,
        val: value[key] || ERRORS.genaral
      });
    });
  } else {
    errorsObj.push({
      key: FORM_NAMES.non_field_errors,
      val: response?.status === 500 ? ERRORS.server : ERRORS.genaral
    });
  }

  return errorsObj;
};

export const deleteObjKeyInState = (
  stateObj: Record<string, string>,
  keyName: string
) => {
  const obj = { ...stateObj };
  delete obj[keyName];
  return { ...obj };
};

export const andOrChangeObjValueInState = (
  stateObj: Record<string, string>,
  keyName: string,
  value: string
) => {
  const obj = { ...stateObj };
  obj[keyName] = value;
  return { ...stateObj, ...obj };
};
