import React, { FC } from 'react';

import { Checkbox } from '../../views/common';

import { CheckboxProps } from './types';

const CheckboxGroup: FC<CheckboxProps> = ({
  filters,
  name,
  label,
  changeFilter
}) => {
  const isChecked = filters.notChecked
    ? !filters.notChecked[name as keyof typeof filters.notChecked]
    : true;

  const onChange = (e: CustomEvent) => {
    const checkedName = (e.target as HTMLInputElement).name;
    const checkedObj = filters.notChecked
      ? { ...filters.notChecked }
      : {
          checkAgree: false,
          checkNotAgree: false,
          checkWithoutAgree: false
        };

    checkedObj[checkedName as keyof typeof checkedObj] =
      !checkedObj[checkedName as keyof typeof checkedObj];

    changeFilter({ notChecked: { ...checkedObj } });
  };

  return (
    <Checkbox onGx-change={onChange} name={name} checked={isChecked}>
      {label}
    </Checkbox>
  );
};

export default CheckboxGroup;
