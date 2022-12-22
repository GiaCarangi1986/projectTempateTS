import React, { FC, useState } from 'react';
import cn from 'classnames';

import { IconButton } from '../../views/common';
import { lookIcon } from '../../images';
import ModalContainer from '../Modals';
import { useSnackMes, useGetResponse } from '../../utils';
import * as api from '../../api';
import Details from './Details';

import { RowInfoProps } from './types';
import style from './index.module.scss';

const HISTORY_NAMES = {
  id: 'id',
  dateTime: 'dateTime',
  author: 'author',
  productType: 'productType',
  meltingNumber: 'meltingNumber',
  indicator1: 'indicator1',
  indicator2: 'indicator2',
  section: 'section',
  isAgree: 'isAgree'
};

const RowInfo: FC<RowInfoProps> = ({
  className,
  children,
  elemStyle,
  rowStyle,
  ...cols
}) => {
  const { data, loading, error, getResult } = useGetResponse();

  const [open, setOpen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleOpen = () => {
    getResult(api.getHistoryById, cols.id);
    setOpen(true);
    setIsClicked(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsClicked(false);
  };

  const colsObj = { ...cols };
  const colorStyle =
    colsObj.isAgree === undefined
      ? style.rowinfo__withoutagree
      : colsObj.isAgree
      ? style.rowinfo__agree
      : style.rowinfo__notagree;

  useSnackMes({ loading, error });

  return (
    <div className={cn(rowStyle, colorStyle)}>
      <IconButton onClick={handleOpen} emptyView icon={lookIcon} />
      {Object.keys(colsObj).map((el) => {
        const elem = HISTORY_NAMES[el as keyof typeof HISTORY_NAMES] ?? '-';
        const name = colsObj[elem as keyof typeof colsObj];

        if (elem === HISTORY_NAMES.isAgree || elem === HISTORY_NAMES.id) {
          return null;
        }
        return (
          <div key={elem} className={elemStyle}>
            {name}
          </div>
        );
      })}
      {children}
      <ModalContainer
        open={open && isClicked}
        title='Детальная информация по тесту'
        onClose={handleClose}
        positiveAction={handleClose}
        positiveBtnText='Ок'
      >
        <Details loading={!!loading} data={data} />
        {loading}
      </ModalContainer>
    </div>
  );
};

export default RowInfo;
