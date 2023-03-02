import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import _ from 'lodash';
import cn from 'classnames';

import {
  Button,
  Form,
  IconButton,
  Input,
  Spinner,
  Switch,
  Textarea
} from '../../views/common';
import {
  dateDDMMYYYYpointHHmmcolon,
  handingErrors,
  sortArrOfObjById,
  useGetResponse,
  useSnackMes
} from '../../utils';
import { DEF_INFO, FORM_LABELS, FORM_NAMES } from '../../const';
import * as api from '../../api';
import { ErrorText } from '../../views';
import ImageDetail from './ImageDetail/ImageDetail';
import ModalContainer from '../Modals';
import Split from './Split';
import PDFButton from '../PDFButton';
import PDFDocument from './PDFDocument';
import { plusIcon } from '../../images';

import { InitDefectsFormik, PDFDataType, SpecificationsProps } from './types';
import style from './index.module.scss';

export type ImgWithDefType = {
  def: string;
  main: string;
  id: number;
};

const INIT_DEFECTS: InitDefectsFormik = {
  isAgree: false,
  non_field_errors: '',
  numberQmet: '',
  comments: {},
  defects: {}
};

const DEFECTS_FIELD = 'defects';
const COMMENTS_FIELD = 'comments';
const CUSTOM = '_custom-';
const COMMENT = '_comment-';

const Specifications: FC<SpecificationsProps> = ({
  needAgree,
  setDisAddNewTest,
  setDataAnalysis,
  dataAnalysis
}) => {
  const defects = dataAnalysis?.defects;
  const testId = dataAnalysis?.id;
  const date = dataAnalysis?.date ?? new Date();
  const images = dataAnalysis?.urls;

  const { data, loading, error, getResult } = useGetResponse();
  const {
    data: limsData,
    loading: limsLoadind,
    error: limsError,
    getResult: sendLims
  } = useGetResponse();
  const {
    data: dataSplitter,
    loading: loadingSplitter,
    error: errorSplitter,
    getResult: getSplitters
  } = useGetResponse();
  const {
    data: newListData,
    loading: newListLoadind,
    error: newListError,
    getResult: getNewListTest
  } = useGetResponse();

  const [initDefects, setInitDefects] = useState<Record<string, string>>({});
  const [initComments, setInitComments] = useState<Record<string, string>>({});
  const [wasMakeDoc, setWasMakeDoc] = useState(false);
  const [imagesWithDef, setImagesWithDef] = useState<ImgWithDefType[]>([]);
  const [openSplit, setOpenSplit] = useState(false);
  const [dataPdf, setDataPdf] = useState<PDFDataType[]>([]);
  const [isAll, setIsAll] = useState(false);

  const makeDoc = () => setWasMakeDoc(true);

  const onSubmit = (values: InitDefectsFormik) => {
    getResult(api.sendLoginData, {
      defects: values.defects,
      id: testId,
      comments: values.comments,
      initDefects
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: INIT_DEFECTS,
    onSubmit
  });

  const handleCloseSplit = () => setOpenSplit(false);

  const handleSplit = (id: number, defectName: string) => {
    getSplitters(api.sendLoginData, { id, defectName });
    setOpenSplit(true);
  };

  const handleExport = () => {
    sendLims(api.sendLoginData, testId);
    formik.setFieldValue(FORM_NAMES.numberQmet, INIT_DEFECTS.numberQmet);
  };

  const handleCheck = (e: CustomEvent) => {
    const newVal = !formik.values.isAgree;
    const switchName = (e.target as HTMLInputElement).name;
    if (newVal) {
      formik.setFieldValue(DEFECTS_FIELD, _.cloneDeep(initDefects));
      formik.setFieldValue(COMMENTS_FIELD, _.cloneDeep(initComments));
    }
    formik.setFieldValue(switchName, newVal);
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

  const handleChange = (e: CustomEvent) => {
    const name = (e.target as HTMLInputElement).name;
    const value = (e.target as HTMLInputElement).value;
    const formikField = (e.target as any)['data-field'];

    const oldValues = formik.values[
      formikField as keyof typeof formik.values
    ] as Record<string, string>;
    oldValues[name as keyof typeof oldValues] = value;

    formik.setValues((prev) => ({
      ...prev,
      [formikField]: oldValues
    }));
  };

  const finishTest = () => {
    setIsAll(true);
  };

  const addNewTemplates = () => {
    getNewListTest(api.sendLoginData, testId);
  };

  useSnackMes({
    loading: limsLoadind || loadingSplitter || newListLoadind,
    error: limsError || errorSplitter || newListError,
    data: limsData,
    message: 'Экспорт в ЛИСМ завершился успешно'
  });

  useEffect(() => {
    if (newListData) {
      setDataAnalysis(newListData);
    }
  }, [newListData]);

  useEffect(() => {
    const err = error;
    if (err) {
      const res = err.response;
      const errors = handingErrors(res);
      errors.forEach((el) => {
        if (Object.keys(formik.values).includes(el.key)) {
          formik.setFieldError(el.key, el.val);
        } else {
          formik.setFieldError(INIT_DEFECTS.non_field_errors, el.val);
        }
      });
    }
  }, [error]);

  const updateDefectsFormik = (
    dataObj: Record<string, string>,
    field: 'defects' | 'comments'
  ) => {
    const temp = formik.values[field];
    const dataKeys = Object.keys(dataObj);
    const fieldKeys = Object.keys(temp);

    if (dataKeys.length > fieldKeys.length) {
      dataKeys.forEach((el) => {
        if (!fieldKeys.includes(el)) {
          temp[el] = dataObj[el];
        }
      });
    } else if (dataKeys.length < fieldKeys.length) {
      fieldKeys.forEach((el) => {
        if (!dataKeys.includes(el)) {
          const elSplit = el.split('-');
          const id = +elSplit[1];
          setImagesWithDef((prev) => prev.filter((item) => item.id !== id));

          delete temp[el];
        }
      });
    }

    formik.setFieldValue(field, _.cloneDeep(temp));
  };

  useEffect(() => {
    if (defects && defects.length > 0) {
      const commentObj: Record<string, string> = {};
      const customObj: Record<string, string> = {};
      for (let index = 0; index < defects.length; index++) {
        const bodyArr = defects[index];
        for (let indexEl = 0; indexEl < bodyArr.length; indexEl++) {
          const element = bodyArr[indexEl];
          const val =
            DEF_INFO.find((item) => item.name === element.name)?.value ?? '';

          const commentVal = `${val}${COMMENT}${element.id}`;
          commentObj[commentVal] = '';

          const customVal = `${val}${CUSTOM}${element.id}`;
          customObj[customVal] = element.value;
        }
      }

      setInitDefects(_.cloneDeep(customObj));
      setInitComments(_.cloneDeep(commentObj));

      updateDefectsFormik(customObj, DEFECTS_FIELD);
      updateDefectsFormik(commentObj, COMMENTS_FIELD);
    }
  }, [defects]);

  const isInitEqualDefs = _.isEqual(formik.values.defects, initDefects);

  useEffect(() => {
    const arr: PDFDataType[] = [...dataPdf];
    const objKeys = Object.keys(initDefects);
    objKeys.forEach((key) => {
      const defValue = formik.values.defects[key];
      const defValueInit = initDefects[key];

      const keyDashSplit = key.split('-'); // name_field [0] and id [1]
      const keySplitUnderlineSplit = keyDashSplit[0].split('_'); // name [0] and field [1]
      const defObj = DEF_INFO.find(
        (item) => item.value === keySplitUnderlineSplit[0]
      );
      if (defObj?.name) {
        const arrIndex = arr.findIndex((item) => item.name === defObj.name);
        const customValue = needAgree ? +defValue : '-';
        if (arrIndex === -1) {
          arr.push({
            name: defObj.name,
            value: +defValueInit,
            customValue
          });
        } else if (
          +defValue > arr[arrIndex].value ||
          objKeys.length === DEF_INFO.length ||
          formik.values.isAgree
        ) {
          arr[arrIndex].customValue = customValue;
        }
      }
    });
    setDataPdf(arr);
  }, [formik.values]);

  useEffect(() => {
    setDisAddNewTest(needAgree && !formik.values.isAgree && !data);
  }, [data, needAgree, formik]);

  const disbledAction = (data || wasMakeDoc) && !error;
  const canMakeReport = !needAgree || formik.values.isAgree;
  const sortImages =
    imagesWithDef.length === images?.length
      ? sortArrOfObjById(imagesWithDef)
      : [];

  return (
    <>
      {images?.map((img) => (
        <div key={img.id} className={style.hide}>
          <ImageDetail
            image={img.main}
            data={img.defectsInfo}
            getPicture={(src) => handleGetImgWithDef(src, img.main, img.id)}
            tempId={String(img.id) || ''}
          />
        </div>
      ))}
      <ModalContainer
        open={openSplit}
        title='Кластеризация по дефекту'
        onClose={handleCloseSplit}
        positiveAction={handleCloseSplit}
        positiveBtnText='Ок'
      >
        <Split loading={!!loadingSplitter} data={dataSplitter} />
      </ModalContainer>
      {defects && defects.length > 0 ? (
        <>
          <div className={style['specifications-wrap']}>
            <Form onGx-submit={formik.handleSubmit}>
              <div className={style.specifications__defect}>
                {defects.map((def, templateIndex) => (
                  <div key={String(templateIndex)}>
                    <h2 className={style.specifications__header}>
                      {`Темплет №${templateIndex + 1}`}
                    </h2>
                    <div className={style.specifications__element}>
                      <div className={style.specifications__row}>
                        <p className={style.specifications__row_header}>
                          Название дефекта
                        </p>
                        <p
                          className={cn(
                            style.specifications__row_header,
                            style.specifications__row_header_notfirst
                          )}
                        >
                          Балл
                        </p>
                      </div>
                      {def.map((el, index) => {
                        const val =
                          DEF_INFO.find((item) => item.name === el.name)
                            ?.value ?? '';

                        const commentVal = `${val}${COMMENT}${el.id}`;
                        const customVal = `${val}${CUSTOM}${el.id}`;
                        const isShow =
                          formik.values.defects[customVal] !==
                          initDefects[customVal];

                        return (
                          <div
                            key={`${String(index)}) el`}
                            className={style['specifications__row-comment']}
                          >
                            <p className={style.specifications__row}>
                              <Button
                                onClick={() =>
                                  handleSplit(el.id, el.serverName)
                                }
                                className={style.specifications__defbtn}
                                variant='text'
                              >
                                {el.name}
                              </Button>
                              <Input
                                data-field={DEFECTS_FIELD}
                                name={customVal}
                                value={formik.values.defects[customVal]}
                                readonly={canMakeReport || disbledAction}
                                onGx-input={handleChange}
                                type='number'
                                step={0.5}
                                min={0}
                                max={4}
                              />
                            </p>
                            {!canMakeReport && isShow && (
                              <div className={style.specifications__row}>
                                <p>{FORM_LABELS.comment}</p>
                                <Textarea
                                  data-field={COMMENTS_FIELD}
                                  readonly={disbledAction}
                                  value={formik.values.comments[commentVal]}
                                  onGx-input={handleChange}
                                  name={commentVal}
                                  rows={1.5}
                                />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              {isAll ? (
                <>
                  {needAgree && (
                    <Switch
                      checked={formik.values.isAgree}
                      name={FORM_NAMES.isAgree}
                      onChange={handleCheck}
                      disabled={disbledAction}
                    >
                      {FORM_LABELS.agreeResults}
                    </Switch>
                  )}
                  <div className={style['specifications__btn-container']}>
                    {canMakeReport || disbledAction ? (
                      <PDFButton
                        Document={
                          <PDFDocument
                            date={date}
                            data={dataPdf}
                            images={sortImages}
                          />
                        }
                        onClick={makeDoc}
                        title={`Данные по слябу за ${dateDDMMYYYYpointHHmmcolon(
                          new Date()
                        )}.pdf`}
                        conditionLoading={
                          !dataPdf ||
                          dataPdf.length === 0 ||
                          !sortImages ||
                          sortImages.length === 0
                        }
                        textButton='Выгрузить отчет'
                      />
                    ) : (
                      <Button
                        uppercase
                        disabled={isInitEqualDefs || disbledAction}
                        type='submit'
                      >
                        {loading && <Spinner loaderClass='indicator' />}
                        отправить исправления
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <div className={style['specifications__test-btns']}>
                  <IconButton
                    onClick={addNewTemplates}
                    label='Добавить лист к текущему'
                    icon={plusIcon}
                  />
                  <Button variant='text' onClick={finishTest}>
                    Завершить тест
                  </Button>
                </div>
              )}
            </Form>
            {canMakeReport && (
              <div className={style.specifications__export}>
                <Input
                  value={formik.values.numberQmet}
                  label={FORM_LABELS.numberQmet}
                  name={FORM_NAMES.numberQmet}
                  onGx-input={formik.handleChange}
                />
                <Button
                  onClick={handleExport}
                  disabled={!formik.values.numberQmet}
                >
                  Экспорт в ЛИМС
                </Button>
              </div>
            )}
            {formik.errors.non_field_errors && (
              <div className={style.specifications__error}>
                <ErrorText margin='top'>
                  {formik.errors.non_field_errors}
                </ErrorText>
              </div>
            )}
          </div>
        </>
      ) : (
        <h3 className={style['specifications__empty-defects']}>
          Дефектов не обнаружено
        </h3>
      )}
      {newListLoadind && <Spinner withoutHeader />}
    </>
  );
};

export default Specifications;
