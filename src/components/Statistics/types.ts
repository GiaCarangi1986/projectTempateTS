type ChartType = {
  title: string;
  xAxisKey: string;
  line1Key: string;
  line2Key: string;
  data: {
    name: string;
    Реальные: number;
    Системные: number;
  }[];
};

type ChartProps = {
  chart: ChartType;
};

export type { ChartProps, ChartType };
