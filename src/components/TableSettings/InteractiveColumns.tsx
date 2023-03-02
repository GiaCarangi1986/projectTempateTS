import React, { FC, useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { List, arrayMove } from 'react-movable';
import _ from 'lodash';
import cn from 'classnames';

import { StandartPageContext } from '../../utils';
import {
  Button,
  Checkbox,
  Form,
  IconButton,
  Spinner
} from '../../views/common';
import { ErrorText } from '../../views';

import { HeaderType } from '../Table/types';
import style from './index.module.scss';
import { dragIcon, arrowThinIcon } from '../../images';
import { InteractiveColumnsProps } from './types';

export type ColumnsInteractiveType = HeaderType & {
  id?: number;
  label?: string | undefined;
  sortLabel?: string | undefined;
  hidden?: boolean | undefined;
  width?: string | undefined;
  isShow?: boolean | undefined;
};

const InteractiveColumns: FC<InteractiveColumnsProps> = ({ onClose }) => {
  const { columns, setColumns, initColumns } = useContext(StandartPageContext);

  const [chooseAll, setChooseAll] = useState(false);
  const [someoneCheck, setSomeoneCheck] = useState(true);

  const onSubmit = (values: ColumnsInteractiveType[]) => {
    setColumns(values);
    onClose();
  };

  const formik = useFormik({
    initialValues: _.cloneDeep(columns),
    onSubmit
  });

  const chooseAllCheck = (e: CustomEvent) => {
    const checkFlag = (e.target as HTMLInputElement).checked;

    const arr: ColumnsInteractiveType[] = [];
    formik.values.forEach((el) => {
      arr.push({
        ...el,
        isShow: checkFlag
      });
    });

    formik.setValues(arr);
  };

  const handleCheck = (e: CustomEvent, column: ColumnsInteractiveType) => {
    const checkFlag = (e.target as HTMLInputElement).checked;

    const arr = formik.values;
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      if (element.name === column.name) {
        arr[i].isShow = checkFlag;
        break;
      }
    }

    formik.setValues(arr);
  };

  const move = (index: number, where = -1) => {
    const list = formik.values;
    const temp = formik.values[index];

    list[index] = list[index + where];
    list[index + where] = temp;

    formik.setValues(list);
  };

  const setInitValues = () => {
    formik.setValues(_.cloneDeep(initColumns));
  };

  useEffect(() => {
    const notShowElem = formik.values.filter((el) => !el.isShow);
    const allElemsFined = notShowElem.length === 0;

    setChooseAll(allElemsFined);
    setSomeoneCheck(notShowElem.length !== formik.values.length);
  }, [formik]);

  return (
    <div className={style['table-setting']}>
      <h2 className={style['table-settings__title']}>Отображение колонок</h2>
      {formik.values.length ? (
        <Form onSubmit={formik.handleSubmit}>
          <div>
            <Checkbox checked={chooseAll} onGx-change={chooseAllCheck}>
              Все
            </Checkbox>
            <span className={style['table-settings__line']} />
            <List
              lockVertically
              values={formik.values}
              onChange={({ oldIndex, newIndex }) => {
                formik.setValues(arrayMove(formik.values, oldIndex, newIndex));
              }}
              renderList={({ children, props }) => (
                <ul className={style['table-settings__list']} {...props}>
                  {children}
                </ul>
              )}
              renderItem={({ value, props }) => (
                <li {...props} className={style['table-settings__row']}>
                  <Checkbox
                    onGx-change={(e) => handleCheck(e, value)}
                    checked={value.isShow}
                    name={value.name}
                  >
                    {value.label}
                  </Checkbox>
                  <div className={style['table-settings__icons']}>
                    <IconButton
                      icon={arrowThinIcon}
                      disabled={props.key === 0 || !value.isShow}
                      onClick={() => move(props.key ?? 0)}
                      iconClassName={style['table-settings__icon-down']}
                      className={style['table-settings__iconbtn']}
                    />
                    <IconButton
                      icon={arrowThinIcon}
                      disabled={
                        props.key === formik.values.length - 1 || !value.isShow
                      }
                      onClick={() => move(props.key ?? 0, 1)}
                      className={style['table-settings__iconbtn']}
                    />
                    <IconButton
                      icon={dragIcon}
                      disabled={!value.isShow}
                      data-movable-handle
                      className={cn(
                        style['table-settings__iconbtn'],
                        style['table-settings__icon_drag']
                      )}
                    />
                  </div>
                </li>
              )}
            />
          </div>
          <div className={style['table-settings__btns']}>
            <Button type='submit' disabled={!someoneCheck}>
              Применить
            </Button>
            <Button
              type='reset'
              disabled={formik.isSubmitting}
              variant='text'
              onClick={setInitValues}
            >
              Сбросить
            </Button>
            {!someoneCheck && (
              <ErrorText errorClass='bottom'>Выберите хотя бы 1 поле</ErrorText>
            )}
          </div>
        </Form>
      ) : (
        <Spinner loaderClass='indicator' />
      )}
    </div>
  );
};

export default InteractiveColumns;
