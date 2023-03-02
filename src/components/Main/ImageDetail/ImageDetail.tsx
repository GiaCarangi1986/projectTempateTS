import React, { FC, useRef, useState, useEffect } from 'react';

import CanvasImage from './CanvasImage';
import { useGetResponse, useSnackMes } from '../../../utils';
import Split from '../Split';
import * as api from '../../../api';
import Legend from './Legend';

import { ImageDetailProps } from '../types';
import style from './index.module.scss';

export type InfoType = {
  name: string;
  value: string | number;
};

export type LegendData = {
  name: string;
  color: string;
};

const ImageDetail: FC<ImageDetailProps> = ({
  image,
  data,
  tempId,
  getPicture
}) => {
  if (!image) {
    return null;
  }

  const {
    data: dataSplitter,
    loading: loadingSplitter,
    error: errorSplitter,
    getResult: getSplitters
  } = useGetResponse();

  const containerRef = useRef<HTMLDivElement>(null);
  const [legendData, setLegendData] = useState<LegendData[]>();
  const [choosenName, setChoosenName] = useState('');

  useSnackMes({
    loading: loadingSplitter,
    error: errorSplitter
  });

  useEffect(() => {
    if (!getPicture) {
      const arg = choosenName
        ? { id: tempId, defectName: choosenName }
        : { id: tempId };
      getSplitters(api.sendLoginData, arg);
    }
  }, [choosenName]);

  return (
    <div ref={containerRef} className={style['img-detail__container']}>
      <div className={style['img-detail__info']}>
        <Legend legendData={legendData} />
        <CanvasImage
          image={image}
          data={data}
          getPicture={getPicture}
          setLegendData={setLegendData}
          containerRef={containerRef}
          setChoosenName={setChoosenName}
        />
        <Split loading={!!loadingSplitter} data={dataSplitter} />
      </div>
    </div>
  );
};

export default ImageDetail;
