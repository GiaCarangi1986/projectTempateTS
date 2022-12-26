import React, { useContext } from 'react';

import { StandartPageContext } from '../../utils';
import RowInfo from '../History/RowInfo';
import Row from '../Table/Row';

import style from './index.module.scss';

export const PAGE = {
  rowInfo: RowInfo
};

const StandartRow = ({ index, ...props }: any) => {
  const { Page } = useContext(StandartPageContext);

  if (!Page) {
    return null;
  }

  return (
    <Row index={index} {...props}>
      {(rowData: any) => (
        <div className={style.standart_row}>
          <Page
            rowStyle={style['standart-page__row']}
            elemStyle={style['standart-page__item']}
            {...rowData}
          />
        </div>
      )}
    </Row>
  );
};

export default StandartRow;
