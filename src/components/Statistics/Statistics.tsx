// import React, { useEffect } from 'react';

// import {
//   dateYYYYMMDDBack,
//   useSnackMes,
//   useFilters,
//   useGetResponse,
//   useWindowSizes
// } from '../../utils';
// import DateSearch from '../DateSearch';
// import Chart from './Chart';
// import * as api from '../../api';
// import { Spinner } from '../../views/common';

// import { ChartType } from './types';
// import style from './index.module.scss';
// import { TYPE_DATE } from '../../const';

// const WEEK_MILLISECONDS = 604800000;

// const Statistics = () => {
//   const { filters, changeFilter } = useFilters({
//     dateStart: dateYYYYMMDDBack(new Date(Date.now() - WEEK_MILLISECONDS)),
//     dateEnd: dateYYYYMMDDBack(new Date())
//   });
//   const { data, loading, error, getResult } = useGetResponse();
//   const sizes = useWindowSizes();

//   useSnackMes({ loading, error });

//   useEffect(() => {
//     getResult(api.sendLoginData, filters);
//   }, [filters]);

//   return (
//     <div className={style.statistics}>
//       <DateSearch
//         filters={filters}
//         changeFilter={changeFilter}
//         type={TYPE_DATE.date}
//       />
//       <div className={style['statistics_chart-container']}>
//         {loading ? (
//           <Spinner withoutHeader />
//         ) : (
//           data?.map((el: ChartType) => (
//             <Chart
//               width={sizes.width}
//               height={sizes.height}
//               key={el.title}
//               chart={el}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Statistics;

import React from 'react';

const Statistics = () => <div>Statistics</div>;

export default Statistics;
