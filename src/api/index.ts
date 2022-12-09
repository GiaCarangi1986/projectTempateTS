import { AuthProps } from '../components/Auth/types';
import { HistoryType } from '../components/History/types';
import { ChartType } from '../components/Statistics/types';
import { FilterType } from '../components/TableSettings/types';
import { dateDDMMYYYYPoint } from '../utils';

export const sendLoginData = async (data: AuthProps) => {
  // const serData = outgoingLoginData(data);

  // const res = await fetch('/api/auth/login/', {
  //   method: 'POST',
  //   body: JSON.stringify(serData)
  // })

  // const resData = await res.json();
  // return incomingLoginData(resData);

  const answer = {
    first_name: 'Liza',
    last_name: 'Kurochkina'
  };
  return answer;
};

export const testSending = async (data: any) => {
  // const serData = outgoingLoginData(data);

  // const res = await fetch('/api/auth/login/', {
  //   method: 'POST',
  //   body: JSON.stringify(serData)
  // })

  // const resData = await res.json();
  // return incomingLoginData(resData);

  const answer = 'test';
  return answer;
};

export const testHistory = async (data: any) => {
  // const serData = outgoingLoginData(data);

  // const res = await fetch('/api/auth/login/', {
  //   method: 'POST',
  //   body: JSON.stringify(serData)
  // })

  // const resData = await res.json();
  // return incomingLoginData(resData);

  const arr: HistoryType[] = [];
  for (let index = 0; index < 1000; index++) {
    arr.push({
      id: index,
      author: `author ${index}`,
      dateTime: `dateTime ${index}`,
      productType: `productType ${index}`,
      meltingNumber: `meltingNumber ${index}`,
      indicator1: index,
      indicator2: index,
      section: index,
      isAgree: index % 2 === 0 ? undefined : index % 5 === 0 ? false : true
    });
  }
  return arr;
};

export const getHistoryById = async (id: number) => {
  // const res = await fetch(`/api/history/?id=${id}`, {
  //   method: 'GET'
  // });

  // const resData = await res.json();
  // return resData;

  const answer = {
    defects: [
      {
        name: 'изгиб',
        system: 0.6,
        count: 3
      },
      {
        name: 'коррозия',
        system: 4.3,
        count: 9
      }
    ],
    comment: [
      {
        name: 'скол',
        system: 0.3,
        real: 0.9,
        count: 3
      },
      {
        name: 'разрез',
        system: 1.3,
        real: 6.9,
        count: 32
      },
      {
        name: 'вмятина',
        system: 0.36,
        real: 0.3,
        count: 1
      }
    ]
  };
  return answer;
};

export const getStatistic = async (data: FilterType) => {
  // const res = await fetch(`/api/statistic/`, {
  //   method: 'POST',
  //   body: JSON.stringify(data)
  // });

  // const resData = await res.json();
  // return resData;

  const charts: ChartType[] = [
    {
      title: 'ОР',
      xAxisKey: 'name',
      line1Key: 'Реальные',
      line2Key: 'Системные',
      data: [
        {
          name: dateDDMMYYYYPoint(new Date('2000/06/12')),
          Реальные: 48530,
          Системные: 0
        },
        {
          name: dateDDMMYYYYPoint(new Date('2000/06/18')),
          Реальные: 50328,
          Системные: 1798
        },
        {
          name: dateDDMMYYYYPoint(new Date('2000/06/19')),
          Реальные: 48573,
          Системные: -1755
        },
        { name: dateDDMMYYYYPoint(), Реальные: 48825, Системные: 252 }
      ]
    },
    {
      title: 'ОХН',
      xAxisKey: 'name',
      line1Key: 'Реальные',
      line2Key: 'Системные',
      data: [
        {
          name: dateDDMMYYYYPoint(new Date('2000/06/12')),
          Реальные: 48530,
          Системные: 0
        },
        {
          name: dateDDMMYYYYPoint(new Date('2000/06/18')),
          Реальные: 50328,
          Системные: 1798
        },
        {
          name: dateDDMMYYYYPoint(new Date('2000/06/19')),
          Реальные: 48573,
          Системные: -1755
        },
        { name: dateDDMMYYYYPoint(), Реальные: 48825, Системные: 252 }
      ]
    }
  ];
  return charts;
};
