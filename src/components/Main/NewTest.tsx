import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import { Button, IconButton, Spinner } from '../../views/common';
import Headers from './Headers';
import * as api from '../../api';
import { useSnackMes, useGetResponse } from '../../utils';
import ModalContainer from '../Modals';
import { closeIcon, plusIcon } from '../../images';
import LazyImage from '../LazyImage';
import ImageDetail from './ImageDetail/ImageDetail';

import { ImageType, NewTestProps } from './types';
import style from './index.module.scss';

const NewTest: FC<NewTestProps> = ({
  handleOpenAnalysisModal,
  setNeedAgree,
  images,
  resetTest,
  changeDelIndex,
  testId,
  disAddNewText
}) => {
  const { data, loading, error, getResult } = useGetResponse();
  const {
    data: delTemplateData,
    loading: isLoadingDelTemplate,
    error: errorDelTemplate,
    getResult: deleteTemplate
  } = useGetResponse();

  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openDelConfirm, setOpenDelConfirm] = useState(false);
  const [openDelTest, setOpenDelTest] = useState(false);
  const [choosenImg, setChoosenImg] = useState<ImageType>();
  const [imgId, setImgId] = useState(0);
  const [imgIndexDel, setImgIndexDel] = useState(0);

  const header = images?.length === 0 ? 'Новый тест' : 'Анализ образца';
  const description = !images
    ? 'Нажмите на кнопку "Начать анализ", заполните необходимые поля и нажмите на кнопку "Выполнить анализ"'
    : `Нажмите на кнопку "Сбросить тест", чтобы удалить текущий тест и начать заново\n
       Нажмите на кпопку "+", чтобы начать новый тест (для валидационных тестов кнопка доступна только после подтверждения)`;

  const handleImageOpen = () => setOpenImage(true);
  const handleImageClose = () => setOpenImage(false);

  const handleDelConfirmOpen = (id: number, index: number) => {
    setImgId(id);
    setImgIndexDel(index);
    setOpenDelConfirm(true);
  };
  const handleDelConfirmClose = () => setOpenDelConfirm(false);
  const handleDelConfirmPositive = () => {
    changeDelIndex(imgId, imgIndexDel);
    handleDelConfirmClose();
  };

  const handleDelTestOpen = () => setOpenDelTest(true);
  const handleDelTestClose = () => setOpenDelTest(false);
  const handleDelTestPositive = () => {
    deleteTemplate(api.sendLoginData, testId);
    handleDelTestClose();
  };

  const onImageClick = (img: ImageType) => {
    handleImageOpen();
    setChoosenImg(img);
  };

  const startNewAnalysis = () => {
    getResult(api.sendLoginData);
  };

  const handleModalAction = () => {
    setOpen(false);
    handleOpenAnalysisModal();
  };

  useSnackMes({ loading, error: error || errorDelTemplate });

  useEffect(() => {
    if (!loading && data !== undefined) {
      if (data) {
        setOpen(true);
      } else {
        handleOpenAnalysisModal();
      }
      setNeedAgree(data);
    }
  }, [data, loading]);

  useEffect(() => {
    if (!isLoadingDelTemplate) {
      resetTest();
    }
  }, [delTemplateData, isLoadingDelTemplate]);

  return (
    <div className={style.left}>
      <div>
        <Headers header={header} description={description} />
        <div className={style['newtest__btn-container']}>
          {!images ? (
            <Button
              className={style['button-add_picture']}
              uppercase
              onClick={startNewAnalysis}
              disabled={loading}
            >
              {loading && <Spinner loaderClass='indicator' />}
              начать анализ
            </Button>
          ) : (
            <div>
              <Button
                className={style['button-add_picture']}
                uppercase
                variant='text'
                onClick={handleDelTestOpen}
              >
                сбросить тест
              </Button>
              <IconButton
                onClick={resetTest}
                className={cn(
                  style['button-add_picture'],
                  style['button-add_picture__new']
                )}
                disabled={disAddNewText}
                icon={plusIcon}
              />
            </div>
          )}
        </div>
      </div>
      <div className={style['image-wrap']}>
        {images?.map((picture, index) => (
          <div key={picture.id} className={style['newtest__image-container']}>
            <IconButton
              className={style['newtest__image-iconbtn']}
              icon={closeIcon}
              onClick={() => handleDelConfirmOpen(picture.id, index)}
            />
            <span className={style['newtest__image-index']}>{index + 1}</span>
            <button
              onClick={() => onImageClick(picture)}
              className={style['newtest__image-btn']}
            >
              <LazyImage src={picture.main} />
            </button>
          </div>
        ))}
      </div>
      <ModalContainer
        open={open}
        title='Внимание!'
        subTitle='Данный тест необходимо будет подвердить'
        onClose={handleModalAction}
        positiveAction={handleModalAction}
        positiveBtnText='Ок'
      />
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
      <ModalContainer
        open={openDelConfirm}
        title='Подвердите действие'
        subTitle={`Вместе с картинкой будет удалена информация по Темлету №${
          imgIndexDel + 1
        }`}
        onClose={handleDelConfirmClose}
        positiveAction={handleDelConfirmPositive}
        positiveBtnText='Ок'
        negativeAction={handleDelConfirmClose}
        negativeBtnText='Отмена'
      />
      <ModalContainer
        open={openDelTest}
        title='Вы уверены?'
        subTitle={'Текущий тест будет удален'}
        onClose={handleDelTestClose}
        positiveAction={handleDelTestPositive}
        positiveBtnText='Да'
        negativeAction={handleDelTestClose}
        negativeBtnText='Нет'
      />
    </div>
  );
};

export default NewTest;
