import { incomingLoginData, outgoingLoginData } from './serializer/auth';

import { AuthProps } from '../components/Auth/types';
import { responseProcessing } from '../utils/helpers';

export const MAIN_URL = 'http://localhost:8000/api';

export const COMPARE_NAMES_RESP_ANALYSIS = {
  templete_number: 'temleteNumber',
  product_id: 'productId',
  department_id: 'workshopId',
  measurement_technique_id: 'measurementTechniqueId',
  melting_number: 'meltingNumber',
  carbon: 'carbon',
  scandium: 'scandium',
  manganese: 'manganese',
  phosphorus: 'phosphorus',
  sulfur: 'sulfur',
  aluminum: 'aluminum',
  steel_mark: 'steelMark',
  section: 'section',
  length: 'length',
  width: 'width',
  comment: 'comment'
};

type CoordDataType = {
  x_min: number;
  x_max: number;
  y_min: number;
  y_max: number;
};

type DataDefectType = {
  diameter: number;
  coords: CoordDataType;
};

export type DefectType = {
  main_ball: number;
  main_ball_custom?: number;
  data: DataDefectType[];
  comment?: string;
};

export type ElemContentType = {
  image: string;
  OHN: DefectType;
  OR: DefectType;
  OT: DefectType;
  GT: DefectType;
  LPTS: DefectType;
  TN: DefectType;
  id: number;
};

export const sendLoginData = async (data: AuthProps) => {
  const serData = outgoingLoginData(data);
  // const res = await fetch(`${MAIN_URL}/auth/login/`, {
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   method: 'POST',
  //   body: JSON.stringify(serData)
  // });

  // return await responseProcessing(res, incomingLoginData);

  return { data: 'login' };
};
