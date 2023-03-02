import React, { useState, FC } from 'react';
import { useFormik } from 'formik';

import { Button, Form, Icon, Input } from '../../views/common';
import { searchIcon } from '../../images';
import { FORM_LABELS, FORM_NAMES } from '../../const';

import { InitFormProps, SearchProps } from './types';

const Search: FC<SearchProps> = ({ filters, changeFilter }) => {
  const INIT_SEARCH: InitFormProps = {
    search: filters.search ?? ''
  };

  const [oldValue, setOldValue] = useState<string>('');

  const sendData = (text: string) => {
    if (oldValue || text) {
      const search = text;
      changeFilter({ search });
      setOldValue(search);
    }
  };

  const onSubmit = (values: InitFormProps) => {
    sendData(values.search);
  };

  const formik = useFormik({
    initialValues: INIT_SEARCH,
    onSubmit
  });

  const clearSearchField = () => {
    sendData('');
  };

  const disabled = oldValue === formik.values.search;

  return (
    <Form onGx-submit={formik.handleSubmit}>
      <Input
        name={FORM_NAMES.search}
        value={formik.values.search}
        placeholder={FORM_LABELS.search}
        clearable
        onGx-clear={clearSearchField}
        onGx-input={formik.handleChange}
      >
        <Button
          disabled={disabled}
          slot='suffix'
          type='submit'
          variant='text'
          iconView
        >
          <Icon slot='icon-left' src={searchIcon} />
        </Button>
      </Input>
    </Form>
  );
};

export default Search;
