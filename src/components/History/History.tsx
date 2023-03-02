// import React, { useEffect, useState } from 'react';

// import Table from '../Table';
// import {
//   StandartPageContext,
//   useSnackMes,
//   useFilters,
//   useGetResponse,
//   useSorting,
//   useColumns
// } from '../../utils';
// import StandartRow, { PAGE } from '../Table/StandartRow';
// import * as api from '../../api';
// import TableSettings from '../TableSettings';
import { HISTORY_COLUMNS } from '../../const';

// import { HistoryType } from './types';
// import { SortDirection } from '../Table/types';
// import style from './index.module.scss';

export const EMPTY_NAMES = [
  HISTORY_COLUMNS.id.name,
  HISTORY_COLUMNS.isAgree.name
];

// const History = () => {
//   const [loadedData, setLoadeData] = useState<HistoryType[] | undefined>();

//   const { data, loading, error, getResult } = useGetResponse();
//   const { filters, changeFilter, needConcat } = useFilters();
//   const { sortState, handleSort } = useSorting();
//   const { cols, setCols, initCols } = useColumns();

//   useSnackMes({ loading, error });

//   const handleFetchMore = () => {
//     if (loadedData) {
//       changeFilter({ offset: loadedData.length });
//     }
//   };

//   useEffect(() => {
//     const key = Object.keys(sortState)[0];
//     let sortLabel = key;
//     if (sortState[key] === SortDirection.DESC) {
//       sortLabel = `-${sortLabel}`;
//     } else if (sortState[key] === undefined) {
//       sortLabel = '';
//     }
//     changeFilter({ ordering: sortLabel });
//   }, [sortState]);

//   useEffect(() => {
//     getResult(api.sendLoginData, filters);
//   }, [filters]);

//   useEffect(() => {
//     if (data && !loading) {
//       if (needConcat) {
//         const arrTemp = loadedData ?? [];
//         setLoadeData([...arrTemp, ...data.data]);
//       } else {
//         setLoadeData(data.data);
//       }
//     }
//   }, [data, loading]);

//   return (
//     <StandartPageContext.Provider
//       value={{
//         Page: PAGE.rowInfo,
//         columns: cols,
//         setColumns: setCols,
//         initColumns: initCols
//       }}
//     >
//       <div className={style.history__container}>
//         <TableSettings filters={filters} changeFilter={changeFilter} />
//         <div className={style.history__content}>
//           <div className={style.history__table}>
//             <Table
//               data={loadedData}
//               rowElement={StandartRow}
//               loading={!!loading || cols.length === 0}
//               onFetchMore={handleFetchMore}
//               hasNextPage={data?.isNext}
//               headers={cols}
//               leftOptionsHeader
//               onSort={handleSort}
//               sortData={sortState}
//             />
//           </div>
//         </div>
//       </div>
//     </StandartPageContext.Provider>
//   );
// };

// export default History;

import React from 'react';

const History = () => <div>History</div>;

export default History;
