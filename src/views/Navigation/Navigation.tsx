import React, { useState } from 'react';
import cn from 'classnames';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { COOKIES_DATA, PATHS } from '../../const';
import ModalContainer from '../../components/Modals';

import style from './index.module.scss';

const Navigation = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove(COOKIES_DATA.token);
    navigate(PATHS.auth);
  };

  const [openExit, setOpenExit] = useState(false);
  const handleOpenExit = () => setOpenExit(true);
  const handleCloseExit = () => setOpenExit(false);

  return (
    <nav>
      <ul className={style.list}>
        <li>
          <NavLink
            to={PATHS.main}
            className={cn(style.list__item, {
              [style['list__item-active']]: pathname === PATHS.main
            })}
          >
            Новый тест
          </NavLink>
        </li>
        <li>
          <NavLink
            to={PATHS.history}
            className={cn(style.list__item, {
              [style['list__item-active']]: pathname === PATHS.history
            })}
          >
            История тестов
          </NavLink>
        </li>
        <li>
          <NavLink
            to={PATHS.statistics}
            className={cn(style.list__item, {
              [style['list__item-active']]: pathname === PATHS.statistics
            })}
          >
            Статистика
          </NavLink>
        </li>
        <li>
          <NavLink
            to={PATHS.reference}
            className={cn(style.list__item, {
              [style['list__item-active']]: pathname === PATHS.reference
            })}
          >
            Справка
          </NavLink>
        </li>
        <li>
          <a onClick={handleOpenExit} className={style.list__item}>
            Выйти
          </a>
        </li>
      </ul>
      <ModalContainer
        open={openExit}
        title='Вы уверены, что хотите выйти?'
        onClose={handleCloseExit}
        positiveAction={logout}
        positiveBtnText='Да'
        negativeBtnText='Нет'
      />
    </nav>
  );
};

export default Navigation;
