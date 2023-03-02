import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';

import * as schema from '../../schema';
import { Button, Form, Input, Spinner, Textarea } from '../../views/common';
import { ErrorText, Fieldset } from '../../views';
import { ELEMENTS_ID, FORM_LABELS, FORM_NAMES } from '../../const';
import Select from '../Select';
import * as api from '../../api';
import { COMPARE_NAMES_RESP_ANALYSIS } from '../../api';

import { AnalysisFormProps, AnalysisInitProps } from './types';
import { OptionsType } from '../Select/types';
import { handingErrors, useGetResponse } from '../../utils';
import style from './index.module.scss';
import stylesModal from '../Modals/index.module.scss';

export const INIT_ANALYSIS: AnalysisInitProps = {
  temleteNumber: '',
  productId: null,
  workshopId: null,
  meltingNumber: '',
  carbon: undefined,
  scandium: undefined,
  manganese: undefined,
  phosphorus: undefined,
  sulfur: undefined,
  aluminum: undefined,
  steelMark: undefined,
  section: undefined, //0
  length: undefined, //0
  width: undefined, //0
  comment: '',
  measurementTechniqueId: null,
  non_field_errors: ''
};

const AnalysisForm: FC<AnalysisFormProps> = ({
  setDataAnalysis,
  closeModal
}) => {
  const { data, loading, error, getResult } = useGetResponse();
  const [disabled, setDisabled] = useState(false);

  const onSubmit = (values: AnalysisInitProps) => {
    getResult(api.sendLoginData, values);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: INIT_ANALYSIS,
    validationSchema: schema.analysisSchema,
    onSubmit
  });

  const handleSelectBlur = (name: string) => {
    formik.setFieldTouched(name as keyof typeof INIT_ANALYSIS, true);
  };

  const chooseSelectValue = (option: OptionsType, name: string) => {
    formik.setFieldValue(name, option);
  };

  useEffect(() => {
    if (error && !loading) {
      const res = error.response ?? error.cause ?? error;
      const errors = handingErrors(res, COMPARE_NAMES_RESP_ANALYSIS);
      errors.forEach((el) => {
        if (Object.keys(formik.values).includes(el.key)) {
          formik.setFieldError(el.key as keyof typeof INIT_ANALYSIS, el.val);
        } else {
          formik.setFieldError(INIT_ANALYSIS.non_field_errors, el.val);
        }
      });
    }
  }, [error, loading]);

  useEffect(() => {
    if (!loading && data) {
      setDataAnalysis(data);
      closeModal();
    }
  }, [loading, data]);

  useEffect(() => {
    if (formik.values) {
      setDisabled(loading || !formik.dirty || !formik.isValid);
    }
  }, [formik]);

  return (
    <Form onGx-submit={formik.handleSubmit}>
      <div id={ELEMENTS_ID.AnalysisForm} className={style['an-form']}>
        <div className={style['an-form__row']}>
          <div className={style['an-form__column']}>
            <Fieldset
              error={formik.errors.temleteNumber}
              touched={formik.touched.temleteNumber}
            >
              <Input
                value={formik.values.temleteNumber}
                onGx-blur={formik.handleBlur}
                onGx-input={formik.handleChange}
                name={FORM_NAMES.temleteNumber}
                label={FORM_LABELS.temleteNumber}
              />
            </Fieldset>
            <Fieldset
              error={formik.errors.meltingNumber}
              touched={formik.touched.meltingNumber}
            >
              <Input
                value={`${formik.values.meltingNumber}`}
                onGx-blur={formik.handleBlur}
                onGx-input={formik.handleChange}
                name={FORM_NAMES.meltingNumber}
                label={FORM_LABELS.meltingNumber}
              />
            </Fieldset>
            <Fieldset
              error={formik.errors.measurementTechniqueId}
              touched={formik.touched.measurementTechniqueId}
            >
              <Select
                value={formik.values.measurementTechniqueId}
                name={FORM_NAMES.measurementTechniqueId}
                label={FORM_LABELS.measurementTechniqueId}
                func={api.sendLoginData}
                onBlur={() =>
                  handleSelectBlur(FORM_NAMES.measurementTechniqueId)
                }
                onChange={(value: OptionsType) =>
                  chooseSelectValue(value, FORM_NAMES.measurementTechniqueId)
                }
                err={
                  formik.errors.measurementTechniqueId &&
                  formik.touched.measurementTechniqueId
                }
                containerId={ELEMENTS_ID.AnalysisForm}
              />
            </Fieldset>
            <Fieldset
              error={formik.errors.productId}
              touched={formik.touched.productId}
            >
              <Select
                value={formik.values.productId}
                name={FORM_NAMES.productId}
                label={FORM_LABELS.productId}
                func={api.sendLoginData}
                onBlur={() => handleSelectBlur(FORM_NAMES.productId)}
                onChange={(value: OptionsType) =>
                  chooseSelectValue(value, FORM_NAMES.productId)
                }
                err={formik.errors.productId && formik.touched.productId}
                containerId={ELEMENTS_ID.AnalysisForm}
              />
            </Fieldset>
            <Fieldset
              error={formik.errors.workshopId}
              touched={formik.touched.workshopId}
            >
              <Select
                value={formik.values.workshopId}
                name={FORM_NAMES.workshopId}
                label={FORM_LABELS.workshopId}
                func={api.sendLoginData}
                onBlur={() => handleSelectBlur(FORM_NAMES.workshopId)}
                onChange={(value: OptionsType) =>
                  chooseSelectValue(value, FORM_NAMES.workshopId)
                }
                err={formik.errors.workshopId && formik.touched.workshopId}
                containerId={ELEMENTS_ID.AnalysisForm}
              />
            </Fieldset>
            <Fieldset
              error={formik.errors.section}
              touched={formik.touched.section}
            >
              <Input
                type='number'
                value={`${formik.values.section}`}
                onGx-blur={formik.handleBlur}
                onGx-input={formik.handleChange}
                name={FORM_NAMES.section}
                label={FORM_LABELS.section}
              />
            </Fieldset>
            <Fieldset
              error={formik.errors.length}
              touched={formik.touched.length}
            >
              <Input
                type='number'
                value={`${formik.values.length}`}
                onGx-blur={formik.handleBlur}
                onGx-input={formik.handleChange}
                name={FORM_NAMES.length}
                label={FORM_LABELS.length}
              />
            </Fieldset>
            <Fieldset
              error={formik.errors.width}
              touched={formik.touched.width}
            >
              <Input
                type='number'
                value={`${formik.values.width}`}
                onGx-blur={formik.handleBlur}
                onGx-input={formik.handleChange}
                name={FORM_NAMES.width}
                label={FORM_LABELS.width}
              />
            </Fieldset>
          </div>
          <div className={style['an-form__column']}>
            <Fieldset
              error={formik.errors.steelMark}
              touched={formik.touched.steelMark}
            >
              <Input
                value={formik.values.steelMark}
                onGx-blur={formik.handleBlur}
                onGx-input={formik.handleChange}
                name={FORM_NAMES.steelMark}
                label={FORM_LABELS.steelMark}
              />
            </Fieldset>
            <Fieldset
              error={formik.errors.carbon}
              touched={formik.touched.carbon}
            >
              <Input
                type='number'
                value={`${formik.values.carbon}`}
                onGx-blur={formik.handleBlur}
                onGx-input={formik.handleChange}
                name={FORM_NAMES.carbon}
                label={FORM_LABELS.carbon}
              />
            </Fieldset>
            <Fieldset
              error={formik.errors.scandium}
              touched={formik.touched.scandium}
            >
              <Input
                type='number'
                value={`${formik.values.scandium}`}
                onGx-blur={formik.handleBlur}
                onGx-input={formik.handleChange}
                name={FORM_NAMES.scandium}
                label={FORM_LABELS.scandium}
              />
            </Fieldset>
            <Fieldset
              error={formik.errors.manganese}
              touched={formik.touched.manganese}
            >
              <Input
                type='number'
                value={`${formik.values.manganese}`}
                onGx-blur={formik.handleBlur}
                onGx-input={formik.handleChange}
                name={FORM_NAMES.manganese}
                label={FORM_LABELS.manganese}
              />
            </Fieldset>
            <Fieldset
              error={formik.errors.phosphorus}
              touched={formik.touched.phosphorus}
            >
              <Input
                type='number'
                value={`${formik.values.phosphorus}`}
                onGx-blur={formik.handleBlur}
                onGx-input={formik.handleChange}
                name={FORM_NAMES.phosphorus}
                label={FORM_LABELS.phosphorus}
              />
            </Fieldset>
            <Fieldset
              error={formik.errors.sulfur}
              touched={formik.touched.sulfur}
            >
              <Input
                type='number'
                value={`${formik.values.sulfur}`}
                onGx-blur={formik.handleBlur}
                onGx-input={formik.handleChange}
                name={FORM_NAMES.sulfur}
                label={FORM_LABELS.sulfur}
              />
            </Fieldset>
            <Fieldset
              error={formik.errors.aluminum}
              touched={formik.touched.aluminum}
            >
              <Input
                type='number'
                value={`${formik.values.aluminum}`}
                onGx-blur={formik.handleBlur}
                onGx-input={formik.handleChange}
                name={FORM_NAMES.aluminum}
                label={FORM_LABELS.aluminum}
              />
            </Fieldset>
            <Fieldset
              error={formik.errors.comment}
              touched={formik.touched.comment}
            >
              <Textarea
                value={formik.values.comment}
                onGx-blur={formik.handleBlur}
                onGx-input={formik.handleChange}
                name={FORM_NAMES.comment}
                label={FORM_LABELS.comment}
              />
            </Fieldset>
          </div>
        </div>
      </div>
      <div className={style['an-form__footer']}>
        <div className={stylesModal.modal__buttons}>
          <Button
            type='submit'
            className={stylesModal['modal__btn-positive']}
            disabled={disabled}
          >
            {loading && <Spinner loaderClass='indicator' />}
            Выполнить анализ
          </Button>
          <Button
            onClick={closeModal}
            className={stylesModal['modal__btn-negative']}
            variant='text'
          >
            Отмена
          </Button>
        </div>
        <div className={style['an-form__error']}>
          {formik.errors.non_field_errors && (
            <ErrorText variant='right'>
              {formik.errors.non_field_errors}
            </ErrorText>
          )}
        </div>
      </div>
      {loading && (
        <Spinner text='Выполняется анализ. Пожалуйста, подождите...' />
      )}
    </Form>
  );
};

export default AnalysisForm;
