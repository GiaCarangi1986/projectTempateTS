import React, { FC, useState } from 'react';
import cn from 'classnames';

import { Button, Spinner } from '../../views/common';
import ModalContainer from '../Modals';
import { DEF_INFO } from '../../const';
import LazyImage from '../LazyImage';
import ImageDetail from '../Main/ImageDetail/ImageDetail';
import { dateDMMMMHHmmLocal, useGetResponse, useSnackMes } from '../../utils';
import * as api from '../../api';
import Split from '../Main/Split';

import { DetailsProps } from './types';
import { ImageType } from '../Main/types';
import style from './index.module.scss';

const Details: FC<DetailsProps> = ({ loading, data }) => {
  const {
    data: dataSplitter,
    loading: loadingSplitter,
    error: errorSplitter,
    getResult: getSplitters
  } = useGetResponse();

  const [openImage, setOpenImage] = useState(false);
  const [choosenImg, setChoosenImg] = useState<ImageType>();
  const [openSplit, setOpenSplit] = useState(false);

  const handleImageOpen = () => setOpenImage(true);
  const handleImageClose = () => setOpenImage(false);

  const onImageClick = (img: ImageType) => {
    handleImageOpen();
    setChoosenImg(img);
  };

  const handleCloseSplit = () => setOpenSplit(false);

  const handleSplit = (id: number, defectName: string) => {
    getSplitters(api.sendLoginData, { id, defectName }); // запрос
    setOpenSplit(true);
  };

  useSnackMes({
    loading: loadingSplitter,
    error: errorSplitter
  });

  return (
    <div className={style.details}>
      <ModalContainer
        open={openSplit}
        title='Кластеризация по дефекту'
        onClose={handleCloseSplit}
        positiveAction={handleCloseSplit}
        positiveBtnText='Ок'
      >
        <Split loading={!!loadingSplitter} data={dataSplitter} />
      </ModalContainer>
      {loading ? (
        <Spinner withoutBackground />
      ) : (
        <div className={style.details__container}>
          <h2 className={style.details__title}>{`Сляб от ${dateDMMMMHHmmLocal(
            data?.dateCreate
          )}`}</h2>
          {data?.data?.length > 0 ? (
            <div className={style.details__defects}>
              {data.data.map((el, index) => (
                <div
                  key={el.id + String(index)}
                  className={style.details__item}
                >
                  <div>
                    <h2 className={style.details__template}>{`Темплет №${
                      index + 1
                    }`}</h2>
                    <div className={style.details__table}>
                      {Object.keys(el.defects).map((def) => {
                        const val = el.defects[def as keyof typeof el.defects];
                        const name = DEF_INFO.find(
                          (elem) => elem.value === def
                        )?.name;
                        const serverName =
                          DEF_INFO.find((elem) => elem.value === def)?.value ??
                          '';

                        return (
                          <div
                            key={`${name}: ${val}`}
                            className={style.details__body}
                          >
                            <p className={style.details__row}>
                              <span className={style.details__name}>
                                Показатель:
                              </span>
                              <Button
                                onClick={() => handleSplit(el.id, serverName)}
                                className={cn(
                                  style.details__value,
                                  style.details__value_spec
                                )}
                                variant='text'
                              >
                                {name}
                              </Button>
                            </p>
                            <p className={style.details__row}>
                              <span className={style.details__name}>
                                Автоматизированный контроль:
                              </span>
                              <span className={style.details__value}>
                                {val.system}
                              </span>
                            </p>
                            <p className={style.details__row}>
                              <span className={style.details__name}>
                                Визуальный контроль:
                              </span>
                              <span
                                className={cn(style.details__value, {
                                  [style.details__value_custom]:
                                    val.custom !== val.system
                                })}
                              >
                                {data.isAuto ? '-' : val.custom ?? val.system}
                              </span>
                            </p>
                            <p className={style.details__row}>
                              <span className={style.details__name}>
                                Комментарий:
                              </span>
                              <span className={style.details__value}>
                                {val.comment}
                              </span>
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <button
                    onClick={() => onImageClick(el.mainImage)}
                    className={style['details__image-btn']}
                  >
                    <LazyImage src={el.mainImage.main} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>Система не выявила дефектов</p>
          )}
          <ModalContainer
            open={openImage}
            onClose={handleImageClose}
            positiveAction={handleImageClose}
          >
            <ImageDetail
              image={choosenImg?.main || ''}
              data={choosenImg?.defectsInfo || []}
              tempId={String(choosenImg?.id) || ''}
            />
          </ModalContainer>
        </div>
      )}
    </div>
  );
};
export default Details;
