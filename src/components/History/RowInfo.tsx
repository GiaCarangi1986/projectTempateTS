import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { IconButton } from '../../views/common';
import { lookIcon } from '../../images';
import ModalContainer from '../Modals';
import {
  useSnackMes,
  useGetResponse,
  sortArrOfObjById,
  useIsOverflow,
  dateDDMMYYYYpointHHmmcolon,
  StandartPageContext,
  useGridTemplateColumns
} from '../../utils';
import * as api from '../../api';
import Details from './Details';
import ImageDetail from '../Main/ImageDetail';
import Tooltip from '../Tooltip';
import PDFButton from '../PDFButton';
import PDFDocument from '../Main/PDFDocument';
import { HISTORY_COLUMNS } from '../../const';

import { ImgWithDefType } from '../Main/Specifications';
import { RowInfoProps } from './types';
import { ImageType } from '../Main/types';
import style from './index.module.scss';

const RowInfo: FC<RowInfoProps> = ({
  children,
  elemStyle,
  rowStyle,
  ...cols
}) => {
  const { data, loading, error, getResult } = useGetResponse();
  const ref = useRef<HTMLDivElement>(null);
  const isOverflow = useIsOverflow(ref);
  const { columns } = useContext(StandartPageContext);
  const gridTemplateColumns = useGridTemplateColumns(columns);

  const [open, setOpen] = useState(false);
  const [imagesWithDef, setImagesWithDef] = useState<ImgWithDefType[]>([]);

  const handleOpen = () => {
    getResult(api.sendLoginData, cols.id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setImagesWithDef([]);
  };

  const handleGetImgWithDef = (src: string, main: string, id: number) => {
    setImagesWithDef((prev) => [
      ...prev,
      {
        def: src,
        main,
        id
      }
    ]);
  };

  const colorStyle =
    cols.isAgree === undefined
      ? style.rowinfo__withoutagree
      : cols.isAgree
      ? style.rowinfo__agree
      : style.rowinfo__notagree;

  useSnackMes({ loading, error });

  const sortImages =
    imagesWithDef.length === data?.images?.length
      ? sortArrOfObjById(imagesWithDef)
      : [];

  return (
    <>
      {open &&
        data?.images?.map((img: ImageType) => (
          <div key={img.id} className={style.hide}>
            <ImageDetail
              image={img.main}
              data={img.defectsInfo}
              getPicture={(src) => handleGetImgWithDef(src, img.main, img.id)}
              tempId={String(img.id) || ''}
            />
          </div>
        ))}
      <div className={cn(rowStyle, colorStyle)} style={{ gridTemplateColumns }}>
        <IconButton onClick={handleOpen} emptyView icon={lookIcon} />
        {columns.map(({ name, isShow }) => {
          const title = cols[name as keyof typeof cols];
          if (
            name === HISTORY_COLUMNS.isAgree.name ||
            name === HISTORY_COLUMNS.id.name ||
            !isShow
          ) {
            return null;
          }
          return (
            <div key={name} ref={ref} className={elemStyle}>
              {isOverflow ? (
                <Tooltip content={String(title)}>{title}</Tooltip>
              ) : (
                <>{title}</>
              )}
            </div>
          );
        })}
        {children}
      </div>
      <ModalContainer
        open={open}
        title='Детальная информация по тесту'
        onClose={handleClose}
        positiveAction={handleClose}
        positiveBtnText='Ок'
        ownBtn={
          data?.images?.length && data.images.length > 0 ? (
            <PDFButton
              Document={
                <PDFDocument
                  date={data?.dateCreate}
                  data={data?.arithmeticMaxDef}
                  images={sortImages}
                />
              }
              title={`Данные по слябу за ${dateDDMMYYYYpointHHmmcolon(
                data?.dateCreate
              )}.pdf`}
              conditionLoading={
                !data ||
                data.length === 0 ||
                !sortImages ||
                sortImages.length === 0
              }
              textButton='Выгрузить отчет'
              className={style.rowinfo__print}
            />
          ) : null
        }
      >
        <Details loading={!!loading} data={data} />
      </ModalContainer>
    </>
  );
};

export default RowInfo;
