import React, { FC } from 'react';
import Select from 'react-select';

import { arrowIcon } from '../../../images';
import Icon from '../Icon';

import style from './index.module.scss';

const baseCustomStyles = (error = false, otherStyle = {}, openUp = false) => ({
  control: (base: any) => ({
    ...base,
    minHeight: '100%',
    maxHeight: '100%',
    border: error
      ? '2px solid #e72525'
      : '2px solid hsla(201, 100%, 13%, 0.25)',
    boxShadow: 'none',
    borderRadius: '0',
    '&:hover': {
      borderColor: error ? '#ff0000' : 'hsla(201, 100%, 13%, 0.5)'
    },
    '&:focus': {
      borderColor: error ? '#ff0000' : 'hsla(201, 100%, 13%, 0.5)'
    },

    ...otherStyle
  }),
  indicatorSeparator: () => ({
    display: 'none'
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: '0px',
    paddingLeft: '10px'
  }),
  singleValue: (base: any) => ({
    ...base
  }),
  menu: (base: any) => ({
    ...base,
    top: openUp && 'auto',
    bottom: openUp && '100%',
    borderRadius: 0
  }),
  menuList: (base: any) => ({
    ...base,
    maxHeight: 200
  }),
  option: (base: any, { isSelected = false }) => ({
    ...base,
    color: isSelected ? 'white' : '#002C44',
    wordBreak: 'word-break',
    backgroundColor: isSelected ? '#044293' : 'white',
    '&:hover': {
      color: isSelected && 'white',
      backgroundColor: isSelected ? '#04306a' : '#b5ccea'
    },
    '&:active': {
      color: 'white',
      backgroundColor: '#04306a'
    },
    '&:focus': {
      color: 'white',
      backgroundColor: '#04306a'
    }
  })
});

const DropdownIndicator = () => (
  <div className={style['dropdowm-indicator']}>
    <Icon src={arrowIcon} />
  </div>
);

const BaseSelect: FC<any> = ({
  id,
  isLoading = true,
  options = [],
  label = '',
  value = null,
  err = false,
  otherStyle = {},
  handleFocus,
  openUp,
  isClearable = true,
  ...props
}) => (
  <>
    <label className={style['select-label']} htmlFor={id}>
      {label}
    </label>

    <Select
      className={style.select}
      styles={baseCustomStyles(err, otherStyle, openUp)}
      placeholder=''
      components={{ DropdownIndicator }}
      isSearchable
      isLoading={isLoading}
      options={options}
      value={value}
      onFocus={handleFocus}
      isClearable={isClearable}
      {...props}
    />
  </>
);

export default BaseSelect;
