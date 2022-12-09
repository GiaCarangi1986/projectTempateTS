import React, { memo } from 'react';
import { areEqual } from 'react-window';

import { CommonRowProps } from './types';

const Row = memo(
  ({ index, data, style, children, onClick }: CommonRowProps) => {
    const rowData = data[index];

    return (
      <div style={style} role='button' tabIndex={index} onClick={onClick}>
        {children(rowData)}
      </div>
    );
  },
  areEqual
);

export default Row;
