import { ReactNode } from 'react';
import { ListChildComponentProps } from 'react-window';

import { ImageType, PDFDataType } from '../Main/types';

type HistoryDataType = {
  id: number;
  templeteNumber: string;
  author: string;
  dateTime: string;
  productType: string;
  workshop: string;
  OHN: number;
  OR: number;
  OT: number;
  GT: number;
  LPTS: number;
  TN: number;
  section: number;
  isAgree: boolean | undefined;
  measurementTechnique: string;
};

type HistoryType = {
  data: HistoryDataType[];
  isNext: boolean;
  count: number;
};

type HistoryRowProps = ListChildComponentProps<HistoryType>;

type RowInfoProps = HistoryDataType & {
  className?: string;
  children?: ReactNode;
  elemStyle?: string;
  rowStyle?: string;
};

type HistoryDetailDef = {
  system: number;
  custom?: number;
  comment: string;
};

type HistoryDetailData = {
  id: number;
  mainImage: ImageType;
  defects: {
    OHN: HistoryDetailDef;
    OR: HistoryDetailDef;
    OT: HistoryDetailDef;
    GT: HistoryDetailDef;
    LPTS: HistoryDetailDef;
    TN: HistoryDetailDef;
  };
};

type HistoryDetail = {
  dateCreate: string;
  isAuto: boolean;
  data: HistoryDetailData[];
  arithmeticMaxDef: PDFDataType[];
  images: ImageType[];
};

type DetailsProps = {
  loading: boolean;
  data: HistoryDetail;
};
export type {
  HistoryRowProps,
  RowInfoProps,
  HistoryType,
  DetailsProps,
  HistoryDetail,
  HistoryDataType,
  HistoryDetailData
};
