import React, { FC, useRef, useState } from 'react';
import cn from 'classnames';

import { arrowIcon, sortIcon } from '../../images';
import { IconButton } from '../../views/common';
import Tooltip from '../Tooltip';
import { useIsOverflow } from '../../utils';

import { HeadercConstructorProps, SortDirection } from './types';
import styles from './index.module.scss';

const HeaderConstructor: FC<HeadercConstructorProps> = ({
  children,
  sortDirection = SortDirection.NONE,
  onClick,
  isSortable,
  filter
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isOverflow = useIsOverflow(ref);

  const [activeFilter, setActiveFilter] = useState<boolean>(false);

  const getComponent = () => <></>;

  const getStyle = () => {
    if (filter?.isDate && filter.applyFilter) {
      if (filter?.isSorting) {
        return filter?.isSorting;
      }
      return SortDirection.NONE;
    }
    return sortDirection;
  };

  return (
    <div
      className={cn(styles.headConstructor, {
        [styles.headConstructor_sortable]: filter?.isSort
      })}
    >
      <button
        type='button'
        onClick={onClick}
        className={cn(styles.headConstructor__label, {
          [styles.headConstructor__label_clickable]:
            filter?.isSort || isSortable
        })}
      >
        <div
          className={cn(
            styles.headConstructor__text,
            styles[`headConstructor__text_${getStyle()}`]
          )}
        >
          <div ref={ref} className={styles['tool-container']}>
            {isOverflow ? (
              <Tooltip content={children}>{children}</Tooltip>
            ) : (
              <>{children}</>
            )}
          </div>
        </div>
      </button>
      {filter && (
        <IconButton
          className={styles['headConstructor__filter-btn']}
          iconClassName={cn(styles['headConstructor__filter-icon'], {
            [styles['headConstructor__filter-icon_apply']]:
              filter?.applyFilter || false,
            [styles['headConstructor__filter-icon_open']]: activeFilter
          })}
          icon={sortIcon}
          onClick={() => setActiveFilter(true)}
          emptyView
        />
      )}
      {(filter?.isSort || isSortable) && (
        <IconButton
          className={styles['headConstructor__filter-btn']}
          iconClassName={cn(
            styles.headConstructor__icon,
            styles[`headConstructor__icon_${getStyle()}`]
          )}
          icon={arrowIcon}
          onClick={onClick}
          emptyView
        />
      )}

      {getComponent()}
    </div>
  );
};

export default HeaderConstructor;
