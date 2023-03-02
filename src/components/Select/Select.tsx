import React, { FC, useState, useEffect, useRef } from 'react';

import { BaseSelect } from '../../views/common';
import { SELECT_TYPES } from '../../const';
import { useSnackMes, useGetResponse } from '../../utils';

import { AsyncSelectResType, OptionsType } from './types';

const Select: FC<any> = ({
  func = () => null,
  type = SELECT_TYPES.default,
  value,
  containerId,
  ...props
}): any => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [openUp, setOpenUp] = useState(false);

  const { data, loading, error, getResult } = useGetResponse();
  const [options, setOptions] = useState<OptionsType[]>([]);

  const handleFocus = () => {
    if (wrapperRef && wrapperRef.current && data) {
      const winHeight = window.innerHeight;
      const curElem = wrapperRef.current?.getBoundingClientRect();
      const containerElem = document
        ?.getElementById(containerId)
        ?.getBoundingClientRect();

      const curElemDistanceToBottom = winHeight - curElem.bottom;
      const containerDistanceToBottom =
        winHeight - Number(containerElem?.bottom);

      const maxHeight = 200;
      const optionHeight = 40;
      const marginHeight = 20;
      const calculatedHeight = data.length * optionHeight + marginHeight;

      const curHeight =
        calculatedHeight < maxHeight ? calculatedHeight : maxHeight;

      if (curElemDistanceToBottom - containerDistanceToBottom < curHeight) {
        setOpenUp(true);
      } else {
        setOpenUp(false);
      }
    }
  };

  useSnackMes({ loading, error });

  useEffect(() => {
    if (!loading && data) {
      const newRes = data.map((elem: AsyncSelectResType) => ({
        label: elem.title,
        value: elem.id
      }));

      setOptions(newRes);
    }
  }, [data, loading]);

  useEffect(() => {
    switch (type) {
      case SELECT_TYPES.default:
        getResult(func);
        break;

      default:
        break;
    }
  }, []);

  return (
    <div ref={wrapperRef}>
      <BaseSelect
        id={`type-${func}-value`}
        isLoading={loading}
        options={options}
        value={value}
        handleFocus={handleFocus}
        openUp={openUp}
        {...props}
      />
    </div>
  );
};

export default Select;
