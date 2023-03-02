import React, { FC, useRef, useState } from 'react';

import { CoordType, INIT_COORD } from '../Main/ImageDetail/CanvasImage';

import { TooltipProps } from './types';
import style from './index.module.scss';

const INIT_STYLE = style.hide;

const Tooltip: FC<TooltipProps> = ({ children, content }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [styleClass, setStyleClass] = useState(INIT_STYLE);
  const [coords, setCoords] = useState<CoordType>(INIT_COORD);

  const handleMouseMove = () => {
    const curRef = ref.current;
    if (curRef) {
      const rect = curRef.getBoundingClientRect();
      setCoords({
        x: rect.left + (rect.right - rect.left) / 2 + pageXOffset,
        y: rect.top + pageYOffset
      });
    }
    setStyleClass(style.tooltip);
  };

  const handleMouseOut = () => {
    setStyleClass(INIT_STYLE);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseOut}
      className={style.container}
    >
      <p
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
        className={styleClass}
        style={
          {
            '--top': `${coords.y}px`,
            '--left': `${coords.x}px`
          } as React.CSSProperties
        }
      >
        {content}
      </p>
      <div ref={ref} className={style.overflow}>
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
