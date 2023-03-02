import React, { FC } from 'react';

import { Spinner } from '../../views/common';

import { SplitProps } from './types';
import style from './index.module.scss';

const Split: FC<SplitProps> = ({ loading, data }) => (
  <div className={style.split}>
    {loading ? (
      <Spinner withoutBackground block />
    ) : (
      <div className={style.split__wrap}>
        {data?.map((item) =>
          item.data.length > 0 ? (
            <div key={item.name}>
              <p className={style.split__defect}>{item.name}</p>
              <div className={style.split__block}>
                {item.noEmpty ? (
                  item.data.map(
                    (el) =>
                      el.count !== 0 && (
                        <div key={el.name}>
                          <p className={style.split__column}>
                            <span className={style.split__value}>
                              Спецификация:
                            </span>
                            <span
                              className={style.split__name}
                            >{`${el.name} мм`}</span>
                          </p>
                          <p className={style.split__column}>
                            <span className={style.split__value}>
                              Количество:
                            </span>
                            <span className={style.split__name}>
                              {el.count}
                            </span>
                          </p>
                        </div>
                      )
                  )
                ) : (
                  <p className={style.split__empty}>Дефект отсутствует</p>
                )}
              </div>
            </div>
          ) : (
            <p>{`Кластеризация по дефекту ${item.name} отсутствует`}</p>
          )
        )}
      </div>
    )}
  </div>
);

export default Split;
