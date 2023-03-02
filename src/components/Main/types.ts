import { OptionsType } from '../Select/types';
import { InfoType } from './ImageDetail/ImageDetail';
import { ImgWithDefType } from './Specifications';

type HeaderProps = {
  header: string;
  description?: string;
};

type PictureBoxProps = {
  url: string;
};

type NewTestProps = {
  handleOpenAnalysisModal: () => void;
  setNeedAgree: React.Dispatch<React.SetStateAction<boolean>>;
  images: ImageType[] | undefined;
  resetTest: () => void;
  changeDelIndex: (val: number, index: number) => void;
  testId: number | undefined;
  disAddNewText: boolean;
};

type AnalysisInitProps = {
  temleteNumber: string;
  productId: OptionsType | null;
  workshopId: OptionsType | null;
  meltingNumber: string;
  carbon?: number;
  scandium?: number;
  manganese?: number;
  phosphorus?: number;
  sulfur?: number;
  aluminum?: number;
  steelMark?: string;
  section?: number;
  length?: number;
  width?: number;
  comment?: string;
  measurementTechniqueId: OptionsType | null;
  non_field_errors: string;
};

type BodyType = {
  id: number;
  name: string;
  value: string;
  serverName: string;
};

type CoordsDataType = {
  xmin: number;
  xmax: number;
  ymin: number;
  ymax: number;
};

type SegmatationDataType = {
  x: number;
  y: number;
};

type DefectCoordsNameType = {
  name: string;
  serverName: string;
  coords: CoordsDataType[];
  segmatation?: SegmatationDataType[][];
};

type ImageType = {
  id: number;
  main: string;
  defectsInfo: DefectCoordsNameType[];
};

type PDFDataType = {
  name: string;
  value: number;
  customValue?: number | string;
};

type DataType = {
  id: number;
  date: string;
  urls: ImageType[];
  defects: BodyType[][];
};

type AnalysisFormProps = {
  setDataAnalysis: React.Dispatch<React.SetStateAction<DataType | undefined>>;
  closeModal: () => void;
};

type SpecificationsProps = {
  // defects: BodyType[][];
  needAgree: boolean;
  // testId: number;
  // date: string;
  // images: ImageType[];
  setDisAddNewTest: React.Dispatch<React.SetStateAction<boolean>>;
  setDataAnalysis: React.Dispatch<React.SetStateAction<DataType | undefined>>;
  dataAnalysis: DataType | undefined;
};

interface InitDefectsFormik {
  non_field_errors: string;
  isAgree: boolean;
  numberQmet: string;
  comments: Record<string, string>;
  defects: Record<string, string>;
}

type ImageDetailProps = {
  image: string;
  data: DefectCoordsNameType[];
  tempId: string;
  getPicture?: (img: string) => void;
};

type ImageModalInfoProps = {
  modalInfo: InfoType[];
  rowWidth: number;
  rowHeight: number;
  gap: number;
};

type SplitData = {
  count: number;
  name: string;
};

type SplitType = {
  name: string;
  noEmpty: boolean;
  data: SplitData[];
};

type SplitProps = {
  loading: boolean;
  data: SplitType[];
};

type PDFDocumentProps = {
  date: string | Date;
  // data: PDFDataType[];
  data: any;
  images: ImgWithDefType[];
};

export type {
  PDFDocumentProps,
  SplitType,
  SplitData,
  SplitProps,
  PDFDataType,
  HeaderProps,
  PictureBoxProps,
  NewTestProps,
  AnalysisInitProps,
  AnalysisFormProps,
  DataType,
  BodyType,
  SpecificationsProps,
  InitDefectsFormik,
  ImageType,
  ImageDetailProps,
  ImageModalInfoProps,
  DefectCoordsNameType,
  CoordsDataType
};
