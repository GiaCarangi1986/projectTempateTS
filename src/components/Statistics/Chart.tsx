import React, { FC } from 'react';
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import { ChartProps } from './types';
import style from './index.module.scss';

const MIN_WIDTH = 500;
const MIN_HEIGTH = 200;

const Chart: FC<ChartProps> = ({ chart, width, height }) => {
  const w = width / 2 - 50 > MIN_WIDTH ? width / 2 - 50 : MIN_WIDTH;
  const h = height / 2 - 50 > MIN_HEIGTH ? height / 2 - 50 : MIN_HEIGTH;

  return (
    <div className={style.chart}>
      <h2>{chart.title}</h2>
      <LineChart
        width={w}
        height={h}
        data={chart.data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey={chart.xAxisKey}>
          <Label value='Дата' offset={-10} position='insideBottomRight' />
        </XAxis>
        <YAxis>
          <Label
            value='Значение'
            angle={-90}
            position='insideTopLeft'
            dy={63}
            dx={-20}
          />
        </YAxis>
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey={chart.line1Key} stroke='#82ca9d' />
        <Line type='monotone' dataKey={chart.line2Key} stroke='#8884d8' />
      </LineChart>
    </div>
  );
};

export default Chart;
