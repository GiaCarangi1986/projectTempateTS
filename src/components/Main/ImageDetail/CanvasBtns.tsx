import React, { FC } from 'react';
import cn from 'classnames';

import { IconButton } from '../../../views/common';
import {
  arrowDirectionIcon,
  initPositionIcon,
  minusIcon,
  plusIcon
} from '../../../images';

import { CanvasBtnsProps } from './types';
import style from './index.module.scss';

type ConvasBtnsType = {
  icon: string;
  func: (e: any) => void;
  iconClassName?: string;
};

const CanvasBtns: FC<CanvasBtnsProps> = ({
  handleZoom,
  getInitDraw,
  moveDelta,
  disabled
}) => {
  const data: ConvasBtnsType[][] = [
    [
      {
        icon: plusIcon,
        func: handleZoom
      },
      {
        icon: minusIcon,
        func: () => handleZoom(false)
      }
    ],
    [
      {
        icon: initPositionIcon,
        func: getInitDraw
      }
    ],
    [
      {
        icon: arrowDirectionIcon,
        func: () => moveDelta({ x: 0, y: -10 })
      },
      {
        icon: arrowDirectionIcon,
        func: () => moveDelta({ x: 0, y: 10 }),
        iconClassName: style['icon-top']
      }
    ],
    [
      {
        icon: arrowDirectionIcon,
        func: () => moveDelta({ x: 10, y: 0 }),
        iconClassName: style['icon-left']
      },
      {
        icon: arrowDirectionIcon,
        func: () => moveDelta({ x: -10, y: 0 }),
        iconClassName: style['icon-right']
      }
    ]
  ];

  return (
    <div className={style['btn-group']}>
      {data.map((btnData, i) => (
        <div key={String(i)} className={style['btn-group__section']}>
          {btnData.map((el, index) => {
            const className =
              index % 2 !== 0
                ? cn(
                    style['canvas-constructor__btn'],
                    style['canvas-constructor__btn_empty'],
                    { [style['canvas-constructor__btn_dis']]: disabled }
                  )
                : cn(style['canvas-constructor__btn'], {
                    [style['canvas-constructor__btn_dis']]: disabled
                  });
            return (
              <IconButton
                key={String(index)}
                disabled={disabled}
                className={className}
                iconView
                icon={el.icon}
                onClick={el.func}
                iconClassName={el.iconClassName}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default CanvasBtns;
