import { DefectCoordsNameType } from '../types';
import { CoordType } from './CanvasImage';
import { LegendData } from './ImageDetail';

type CanvasImageType = {
  image: string;
  data: DefectCoordsNameType[];
  getPicture?: (img: string) => void;
  setLegendData: React.Dispatch<React.SetStateAction<LegendData[] | undefined>>;
  containerRef: React.RefObject<HTMLDivElement>;
  setChoosenName: React.Dispatch<React.SetStateAction<string>>;
};

type LegendProps = {
  legendData: LegendData[] | undefined;
};

type CanvasBtnsProps = {
  handleZoom: (zoom: boolean) => void;
  getInitDraw: (e: any) => void;
  moveDelta: (coords: CoordType) => void;
  disabled: boolean;
};

export type { CanvasImageType, LegendProps, CanvasBtnsProps };
