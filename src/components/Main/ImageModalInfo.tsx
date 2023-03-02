import React, { FC, useRef } from 'react';

import Tooltip from '../Tooltip';
import { useIsOverflow } from '../../utils';

import { ImageModalInfoProps } from './types';
import style from './index.module.scss';

const ImageModalInfo: FC<ImageModalInfoProps> = ({
  modalInfo,
  rowHeight,
  rowWidth,
  gap
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isOverflow = useIsOverflow(ref);

  return (
    <div
      style={{ width: `${rowWidth}px`, '--gap': gap } as React.CSSProperties}
      className={style['img-modal-info']}
    >
      {modalInfo.map((el) => (
        <p
          key={el.name}
          style={{ height: `${rowHeight}px` }}
          className={style['img-modal-info__row']}
        >
          <span ref={ref} className={style['img-modal-info__name']}>
            {isOverflow ? (
              <Tooltip content={el.name}>{el.name}: </Tooltip>
            ) : (
              <>{el.name}: </>
            )}
          </span>
          <span>{el.value}</span>
        </p>
      ))}
    </div>
  );
};

export default ImageModalInfo;
