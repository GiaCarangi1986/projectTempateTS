import React, { FC } from 'react';
import cn from 'classnames';

import { Spinner } from '../../views/common';

import { DetailsProps, TableRowProps, TextRowProps } from './types';
import style from './index.module.scss';

const HEADER = [
  'Наименование дефекта',
  'Системный показатель',
  'Реальное значение',
  'Кол-во'
];

const DATA_KEYS = {
  defects: 'defects',
  comment: 'comment'
};

const TextRow: FC<TextRowProps> = ({ name, system, real, count }) => (
  <p className={style.textrow}>
    <span className={style.textrow__text}>{name}</span>
    <span className={style.textrow__text}>{system}</span>
    <span className={style.textrow__text}>{real ?? system}</span>
    <span className={style.textrow__text}>{count}</span>
  </p>
);

const TableRow: FC<TableRowProps> = ({ header, data, dataKey }) => (
  <>
    <h2 className={style.tablerow__title}>{header}</h2>
    <div className={style.textrow}>
      {HEADER.map((el) => (
        <div key={el} className={style.tablerow__header}>
          {el}
        </div>
      ))}
    </div>
    <div className={style.tablerow__body}>
      {data[dataKey as keyof typeof data]?.map((def) => (
        <TextRow
          key={def.name}
          name={def.name}
          system={def.system}
          real={def.real}
          count={def.count}
        />
      ))}
    </div>
  </>
);

const Details: FC<DetailsProps> = ({ loading, data }) => (
  <div className={style.details}>
    {loading ? (
      <Spinner withoutBackground />
    ) : (
      <div>
        <TableRow
          header='Общие дефекты'
          data={data}
          dataKey={DATA_KEYS.defects}
        />
        {data.comment && (
          <TableRow
            header='Показатели системы и реальные значения'
            data={data}
            dataKey={DATA_KEYS.comment}
          />
        )}
      </div>
    )}
  </div>
);

export default Details;
