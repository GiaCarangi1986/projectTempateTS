import * as Yup from 'yup';
import * as errorsMessenge from './const';

const requiredString = Yup.string().required(errorsMessenge.requiredField);

const objectTemp = Yup.object()
  .nullable()
  .required(errorsMessenge.requiredField);

const positiveNumberTemp = (val = 9) =>
  Yup.string()
    .nullable()
    .max(val, `${errorsMessenge.longStringValue} ${val}`)
    .test('positiveNumber', errorsMessenge.notNegative, (value) => {
      if (value !== undefined) {
        const number = Number(value);
        return !Number.isNaN(number) && number > 0;
      }
      return true;
    })
    .required(errorsMessenge.requiredField);

const maxNotRequiredString = (val = 150) =>
  Yup.string()
    .notRequired()
    .max(val, `${errorsMessenge.longStringValue} ${val}`);

const authTemp = Yup.string()
  .nullable()
  .required(errorsMessenge.requiredField)
  .min(4, errorsMessenge.shortString)
  .max(50, errorsMessenge.longString);

const dateTemp = Yup.mixed().nullable().required(errorsMessenge.requiredField);

const dateTempEnd = Yup.mixed().test(
  'CorrectDates',
  errorsMessenge.correctDates,
  (value, context) => {
    if (context.parent.dateStart && value) {
      const dateStart = context.parent.dateStart;
      const dateEnd = value;
      return dateStart < dateEnd;
    }
    return true;
  }
);

const signUpSchema = () =>
  Yup.object().shape({
    login: authTemp,
    password: authTemp
  });

const analysisSchema = () =>
  Yup.object().shape({
    temleteNumber: requiredString,
    productId: objectTemp.notRequired(),
    workshopId: objectTemp.notRequired(),
    meltingNumber: requiredString,
    section: positiveNumberTemp().notRequired(),
    length: positiveNumberTemp().notRequired(),
    width: positiveNumberTemp().notRequired(),
    comment: maxNotRequiredString().notRequired(),
    measurementTechniqueId: objectTemp
  });

const dateSearchSchema = () =>
  Yup.object().shape({
    dateStart: dateTemp,
    dateEnd: dateTempEnd.nullable().required(errorsMessenge.requiredField)
  });

export { signUpSchema, analysisSchema, dateSearchSchema };
