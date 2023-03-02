import React, { FC, useState } from 'react';
import cn from 'classnames';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { LazyImageProps } from './types';
import 'react-lazy-load-image-component/src/effects/blur.css';
import style from './index.module.scss';

const LazyImage: FC<LazyImageProps> = ({ src, className }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={style.container}>
      <LazyLoadImage
        src={src}
        effect='blur'
        beforeLoad={() => setLoading(true)}
        afterLoad={() => setLoading(false)}
        className={cn(className)}
      />
      {loading && <p className={style.text}>Загрузка изображения...</p>}
    </div>
  );
};

export default LazyImage;
