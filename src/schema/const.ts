const emailRegExp =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const digitalRegExp = '^[0-9]+$';

const requiredField = 'Обязательное поле';
const shortString = 'Слишком мало символов';
const longString = 'Слишком много символов';
const notNegative = 'Число должно быть положительным';
const longStringValue = `${longString}. Максимальная длина -`;
const correctDates = 'Дата окончания должна быть больше даты начала';

export {
  requiredField,
  shortString,
  longString,
  emailRegExp,
  digitalRegExp,
  notNegative,
  longStringValue,
  correctDates
};
