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
      const number = Number(value);
      return !Number.isNaN(number) && number > 0;
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

const signUpSchema = () =>
  Yup.object().shape({
    login: authTemp,
    password: authTemp
  });

export { signUpSchema };
