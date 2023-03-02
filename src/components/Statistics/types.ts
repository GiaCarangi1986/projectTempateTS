type ChartType = {
  title: string;
  xAxisKey: string;
  line1Key: string;
  line2Key: string;
  data: {
    name: string | Date;
    'Визуальный контроль': number;
    'Автоматизированный контроль': number;
  }[];
};

type ChartProps = {
  chart: ChartType;
  width: number;
  height: number;
};

export type { ChartProps, ChartType };
