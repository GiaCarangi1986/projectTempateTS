import { DEF_INFO, ERRORS, FORM_NAMES } from '../../const';

import { DefectType, ElemContentType } from '../../api';
import {
  CoordsDataType,
  DefectCoordsNameType
} from '../../components/Main/types';
import { ImgWithDefType } from '../../components/Main/Specifications';

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
        val: value[el] || ERRORS.genaral
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

export const responseProcessing = async (
  res: Response,
  serFunc?: (data: any) => any
) => {
  let resData: Response = res;
  try {
    resData = await res.json();
  } finally {
    if (!res?.ok) {
      const err = typeof resData === 'string' ? resData : 'error';
      throw new Error(err, {
        cause: {
          status: res.status,
          data: resData
        }
      });
    } else if (serFunc) {
      return {
        data: serFunc(resData),
        status: res.status
      };
    }
    return {
      data: resData,
      status: res.status
    };
  }
};

export const roundDigit = (digit: number, numberChar = 2) => {
  let oneWithZeros = 1;
  for (let i = 0; i < numberChar; i++) {
    oneWithZeros *= 10;
  }
  return Math.round(digit * oneWithZeros) / oneWithZeros;
};

export const fillCoordsImg = (el: ElemContentType) => {
  const arrImg: DefectCoordsNameType[] = [];
  DEF_INFO.forEach((def) => {
    const dataCoords = el[def.value as keyof typeof el] as DefectType;
    const arrCoords: CoordsDataType[] = [];
    dataCoords.data.forEach((temp) => {
      arrCoords.push({
        xmax: temp.coords.x_max,
        xmin: temp.coords.x_min,
        ymax: temp.coords.y_max,
        ymin: temp.coords.y_min
      });
    });
    arrImg.push({
      name: def.name,
      coords: arrCoords,
      serverName: def.value
    });
  });
  return arrImg;
};

export const sortArrOfObjById = (arr: ImgWithDefType[]) =>
  arr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
