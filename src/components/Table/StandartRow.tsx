import React, { useContext } from 'react';

import { StandartPageContext } from '../../utils';
import Row from '../Table/Row';

import style from './index.module.scss';

export const PAGE = {
  example: 'example'
};

const StandartRow = ({ index, ...props }: any) => {
  const { Page } = useContext(StandartPageContext);

  if (!Page) {
    return null;
  }

  return (
    <Row index={index} {...props}>
      {(rowData: any) => (
        <Page
          rowStyle={style['standart-page__row']}
          elemStyle={style['standart-page__item']}
          {...rowData}
        />
      )}
    </Row>
  );
};

export default StandartRow;
