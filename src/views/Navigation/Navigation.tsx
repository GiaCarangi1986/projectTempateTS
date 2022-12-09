import React from 'react';
import cn from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import { COOKIES_DATA, PATHS } from '../../const';

import style from './index.module.scss';

const Navigation = () => {
  const { pathname } = useLocation();
  const logout = () => {
    Cookies.remove(COOKIES_DATA.currentUser);
  };
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
            Главная
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
            onClick={logout}
            to={PATHS.auth}
            className={style.list__item}
          >
            Выйти
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
