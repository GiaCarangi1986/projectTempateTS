import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconButton } from '../../views/common';
import DateSearch from '../DateSearch';
import Search from '../Search';
import { plusIcon } from '../../images';
import { FORM_LABELS, FORM_NAMES, PATHS } from '../../const';
import CheckboxGroup from '../Checkbox';

import { TableSettingsProps } from './types';
import { CheckElemType } from '../Checkbox/types';
import style from './index.module.scss';

const TableSettings: FC<TableSettingsProps> = ({ filters, changeFilter }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(PATHS.main);
  };

  const checkList: CheckElemType[] = [
    {
      label: FORM_LABELS.checkWithoutAgree,
      name: FORM_NAMES.checkWithoutAgree
    },
    {
      label: FORM_LABELS.checkAgree,
      name: FORM_NAMES.checkAgree
    },
    {
      label: FORM_LABELS.checkNotAgree,
      name: FORM_NAMES.checkNotAgree
    }
  ];

  return (
    <div className={style.header}>
      <div className={style.filters}>
        <div className={style['filters__search-group']}>
          <DateSearch filters={filters} changeFilter={changeFilter} />
          <div className={style.search}>
            <Search filters={filters} changeFilter={changeFilter} />
          </div>
        </div>
        <div className={style['filters__checkbox-group']}>
          {checkList.map((el) => (
            <CheckboxGroup
              key={el.name}
              name={el.name}
              label={el.label}
              filters={filters}
              changeFilter={changeFilter}
            />
          ))}
        </div>
      </div>
      <IconButton
        onClick={handleClick}
        className={style.btn}
        label='Новый тест'
        icon={plusIcon}
      />
    </div>
  );
};

export default TableSettings;
