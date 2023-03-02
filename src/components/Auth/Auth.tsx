import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import { Button, Form, Input, Spinner } from '../../views/common';
import { Fieldset, ErrorText } from '../../views';
import {
  PATHS,
  FORM_NAMES,
  COOKIES_DATA,
  FORM_LABELS,
  INPUT_LABEL
} from '../../const';
import * as schema from '../../schema';
import * as api from '../../api';
import { handingErrors, useGetResponse } from '../../utils';
import { COMPARE_NAMES_RESP_LOGIN } from '../../api/serializer/auth';

import { AuthProps } from './types';
import style from './index.module.scss';

const INIT_AUTH: AuthProps = {
  login: '',
  password: '',
  non_field_errors: ''
};

const Auth = () => {
  const token = Cookies.get(COOKIES_DATA.token);
  const navigate = useNavigate();
  const { data, loading, error, getResult } = useGetResponse();

  const [disabledBtn, setDisabledBtn] = useState(true);

  const onSubmit = (values: AuthProps) => {
    getResult(api.sendLoginData, values);
  };

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: schema.signUpSchema,
    initialValues: INIT_AUTH,
    onSubmit
  });

  useEffect(() => {
    if (error && !loading) {
      const res = error.response ?? error.cause ?? error;
      const errors = handingErrors(res, COMPARE_NAMES_RESP_LOGIN);
      errors.forEach((el) => {
        if (Object.keys(formik.values).includes(el.key)) {
          formik.setFieldError(el.key, el.val);
        } else {
          formik.setFieldError(INIT_AUTH.non_field_errors, el.val);
        }
      });
    }
  }, [error, loading]);

  useEffect(() => {
    if (!loading && data) {
      formik.resetForm();
      Cookies.set(COOKIES_DATA.token, data.token);
      navigate(PATHS.main);
    }
  }, [loading, data]);

  useEffect(() => {
    if (formik.values) {
      setDisabledBtn(loading || !formik.dirty || !formik.isValid);
    }
  }, [formik]);

  useEffect(() => {
    if (token) {
      navigate(PATHS.main);
    }
  }, [token]);

  return (
    <section className={style.auth}>
      {!token && (
        <Form onGx-submit={formik.handleSubmit}>
          <h1 className={style.title}>Вход</h1>
          <div className={style.form}>
            <Fieldset
              error={formik.errors.login}
              touched={formik.touched.login}
            >
              <Input
                label={FORM_LABELS.login}
                value={formik.values.login}
                name={FORM_NAMES.login}
                onGx-input={formik.handleChange}
                onGx-blur={formik.handleBlur}
                nameOfStyle={INPUT_LABEL}
              />
            </Fieldset>
            <Fieldset
              error={formik.errors.password}
              touched={formik.touched.password}
            >
              <Input
                label={FORM_LABELS.password}
                type='password'
                value={formik.values.password}
                name={FORM_NAMES.password}
                onGx-input={formik.handleChange}
                onGx-blur={formik.handleBlur}
                nameOfStyle={INPUT_LABEL}
              />
            </Fieldset>
            <div className={style.error}>
              {formik.errors.non_field_errors && (
                <ErrorText margin='left'>
                  {formik.errors.non_field_errors}
                </ErrorText>
              )}
            </div>
          </div>
          <div className={style.btn_wrapper}>
            <Button disabled={disabledBtn} type='submit'>
              {loading && <Spinner loaderClass='indicator' />}
              Войти
            </Button>
          </div>
        </Form>
      )}
    </section>
  );
};

export default Auth;
