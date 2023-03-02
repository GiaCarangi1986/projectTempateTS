// import React, { FC } from 'react';
// import { useFormik } from 'formik';
// import cn from 'classnames';

// import { FORM_LABELS, FORM_NAMES, INPUT_LABEL } from '../../const';
// import { dateSearchSchema } from '../../schema';
// import { Fieldset } from '../../views';
// import { Form, IconButton, Input } from '../../views/common';
// import { dateYYYYMMDDdashHHmmcolon } from '../../utils';
// import { closeIcon, searchIcon } from '../../images';

// import { DateSearchProps, InitFormProps } from './types';
// import style from './index.module.scss';

// const DateSearch: FC<DateSearchProps> = ({ filters, changeFilter }) => {
//   const INIT_DATE_SEARCH: InitFormProps = {
//     dateStart: filters.dateStart ?? '',
//     dateEnd: filters.dateEnd ?? ''
//   };
//   const EMPTY_DATA: InitFormProps = {
//     dateStart: '',
//     dateEnd: ''
//   };

//   const submitAction = (values: InitFormProps) => {
//     changeFilter({ dateStart: values.dateStart, dateEnd: values.dateEnd });
//   };

//   const onSubmit = (values: InitFormProps) => {
//     submitAction(values);
//   };

//   const formik = useFormik({
//     initialValues: INIT_DATE_SEARCH,
//     validationSchema: dateSearchSchema,
//     onSubmit
//   });

//   const cancelAction = () => {
//     if (filters?.dateStart) {
//       submitAction(EMPTY_DATA);
//     }
//     formik.setValues(EMPTY_DATA);
//     formik.setTouched({});
//   };

//   const dateNow = dateYYYYMMDDdashHHmmcolon();

//   return (
//     <Form onGx-submit={formik.handleSubmit}>
//       <div className={style.datesearch__form}>
//         <div className={style.datesearch__form}>
//           <Fieldset
//             error={formik.errors.dateStart}
//             touched={formik.touched.dateStart}
//           >
//             <Input
//               label={FORM_LABELS.dateStart}
//               value={formik.values.dateStart}
//               onGx-input={formik.handleChange}
//               onGx-blur={formik.handleBlur}
//               name={FORM_NAMES.dateStart}
//               type='datetime-local'
//               max={dateNow}
//               nameOfStyle={INPUT_LABEL}
//             />
//           </Fieldset>
//           <Fieldset
//             error={formik.errors.dateEnd}
//             touched={formik.touched.dateEnd}
//             errorClass='date'
//           >
//             <Input
//               label={FORM_LABELS.dateEnd}
//               value={formik.values.dateEnd}
//               onGx-input={formik.handleChange}
//               onGx-blur={formik.handleBlur}
//               name={FORM_NAMES.dateEnd}
//               type='datetime-local'
//               min={formik.values.dateStart}
//               max={dateNow}
//               nameOfStyle={INPUT_LABEL}
//             />
//           </Fieldset>
//         </div>
//         <div className={style['datesearch__btn-container']}>
//           <IconButton
//             className={style.datesearch__btn}
//             disabled={!formik.isValid || !formik.dirty}
//             type='submit'
//             icon={searchIcon}
//           />
//           <IconButton
//             className={cn(style.datesearch__btn, style.datesearch__btn_cancel)}
//             disabled={!formik.dirty && !Object.keys(formik.touched).length}
//             variant='text'
//             onClick={cancelAction}
//             icon={closeIcon}
//           />
//         </div>
//       </div>
//     </Form>
//   );
// };

// export default DateSearch;

import React from 'react';
import { useFormik } from 'formik';
import cn from 'classnames';

import { FORM_LABELS, FORM_NAMES, INPUT_LABEL, TYPE_DATE } from '../../const';
import { dateSearchSchema } from '../../schema';
import { Fieldset } from '../../views';
import { Form, IconButton, Input } from '../../views/common';
import { dateYYYYMMDDdashHHmmcolon, dateYYYYMMDDBack } from '../../utils';
import { closeIcon, searchIcon } from '../../images';

import style from './index.module.scss';

const DateSearch = ({ filters, changeFilter, type = TYPE_DATE.datetimeLocal }) => {
  const INIT_DATE_SEARCH = {
    dateStart: filters.dateStart ?? '',
    dateEnd: filters.dateEnd ?? ''
  };
  const EMPTY_DATA = {
    dateStart: '',
    dateEnd: ''
  };

  const submitAction = (values) => {
    changeFilter({ dateStart: values.dateStart, dateEnd: values.dateEnd });
  };

  const onSubmit = (values) => {
    submitAction(values);
  };

  const formik = useFormik({
    initialValues: INIT_DATE_SEARCH,
    validationSchema: dateSearchSchema,
    onSubmit
  });

  const cancelAction = () => {
    if (filters?.dateStart) {
      submitAction(EMPTY_DATA);
    }
    formik.setValues(EMPTY_DATA);
    formik.setTouched({});
  };

  const dateNow = type === TYPE_DATE.date ? dateYYYYMMDDBack() : dateYYYYMMDDdashHHmmcolon();

  return (
    <Form onGx-submit={formik.handleSubmit}>
      <div className={style.datesearch__form}>
        <div className={style.datesearch__form}>
          <Fieldset
            error={formik.errors.dateStart}
            touched={formik.touched.dateStart}
          >
            <Input
              label={FORM_LABELS.dateStart}
              value={formik.values.dateStart}
              onGx-input={formik.handleChange}
              onGx-blur={formik.handleBlur}
              name={FORM_NAMES.dateStart}
              type={type}
              max={dateNow}
              nameOfStyle={INPUT_LABEL}
            />
          </Fieldset>
          <Fieldset
            error={formik.errors.dateEnd}
            touched={formik.touched.dateEnd}
            errorClass='date'
          >
            <Input
              label={FORM_LABELS.dateEnd}
              value={formik.values.dateEnd}
              onGx-input={formik.handleChange}
              onGx-blur={formik.handleBlur}
              name={FORM_NAMES.dateEnd}
              type={type}
              min={formik.values.dateStart}
              max={dateNow}
              nameOfStyle={INPUT_LABEL}
            />
          </Fieldset>
        </div>
        <div className={style['datesearch__btn-container']}>
          <IconButton
            className={style.datesearch__btn}
            disabled={!formik.isValid || !formik.dirty}
            type='submit'
            icon={searchIcon}
          />
          <IconButton
            className={cn(style.datesearch__btn, style.datesearch__btn_cancel)}
            disabled={!formik.dirty && !Object.keys(formik.touched).length}
            variant='text'
            onClick={cancelAction}
            icon={closeIcon}
          />
        </div>
      </div>
    </Form>
  );
};

export default DateSearch;
