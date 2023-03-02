import React, { FC } from 'react';

import Auth from '../components/Auth';
import Main from '../components/Main';
import History from '../components/History';
import Statistics from '../components/Statistics';
import Reference from '../components/Reference';
import { Layout } from '../views';
import { PAGE_NAME } from '../const';

import { GetStandartPageProps } from './types';

const GetStandartPage: FC<GetStandartPageProps> = ({ pageName }) => {
  const PAGE = {
    [PAGE_NAME.main]: Main,
    [PAGE_NAME.auth]: Auth,
    [PAGE_NAME.history]: History,
    [PAGE_NAME.statistics]: Statistics,
    [PAGE_NAME.reference]: Reference
  };

  const Component = PAGE[pageName as keyof typeof PAGE];

  return (
    <Layout showLinks={pageName !== PAGE_NAME.auth}>
      <Component />
    </Layout>
  );
};

export default GetStandartPage;
