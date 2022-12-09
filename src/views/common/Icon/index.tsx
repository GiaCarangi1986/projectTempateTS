import React, { FC } from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';

import IconProps from './types';

const Icon: FC<IconProps> = ({ className, ...props }) => (
  <GxIcon className={className} {...props} />
);

export default Icon;
