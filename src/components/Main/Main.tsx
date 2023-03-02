// import React, { useState, useEffect } from 'react';

// import NewTest from './NewTest';
// import ModalContainer from '../Modals';
// import AnalysisForm from './AnalysisForm';
// import Specifications from './Specifications';
// import Headers from './Headers';
// import { useSnackMes, useGetResponse } from '../../utils';
// import { Spinner } from '../../views/common';
// import * as api from '../../api';

// import { DataType, BodyType, ImageType } from './types';
// import style from './index.module.scss';

// const Main = () => {
//   const { data, loading, error, getResult } = useGetResponse();

//   const [open, setOpen] = useState(false);
//   const [needAgree, setNeedAgree] = useState(false);
//   const [dataAnalysis, setDataAnalysis] = useState<DataType | undefined>(
//     undefined
//   );
//   const [index, setIndex] = useState<number>();
//   const [disAddNewText, setDisAddNewTest] = useState(false);

//   const handleOpen = () => setOpen(true);
//   const closeModal = () => {
//     setOpen(false);
//   };
//   const resetTest = () => setDataAnalysis(undefined);
//   const changeDelIndex = (id: number, indexImg: number) => {
//     getResult(api.sendLoginData, id);
//     setIndex(indexImg);
//   };

//   useSnackMes({ loading, error });

//   useEffect(() => {
//     if (data && !loading && index !== undefined && dataAnalysis) {
//       const urlsTemp: ImageType[] = [];
//       const defectsTemp: BodyType[][] = [];

//       for (let i = 0; i < dataAnalysis.urls.length; i++) {
//         if (i !== index) {
//           urlsTemp.push(dataAnalysis.urls[i]);
//           defectsTemp.push(dataAnalysis.defects[i]);
//         }
//       }
//       setDataAnalysis({
//         ...dataAnalysis,
//         urls: urlsTemp,
//         defects: defectsTemp
//       });
//     }
//   }, [data, loading]);

//   return (
//     <div className={style.container}>
//       <NewTest
//         handleOpenAnalysisModal={handleOpen}
//         setNeedAgree={setNeedAgree}
//         images={dataAnalysis?.urls}
//         resetTest={resetTest}
//         changeDelIndex={changeDelIndex}
//         testId={dataAnalysis?.id}
//         disAddNewText={disAddNewText}
//       />
//       <div className={style.right}>
//         <Headers
//           header='Характеристики'
//           description={
//             dataAnalysis ? '' : 'Здесь появится информация о дефектах образца'
//           }
//         />
//         {dataAnalysis?.defects && (
//           <Specifications
//             needAgree={needAgree}
//             setDisAddNewTest={setDisAddNewTest}
//             setDataAnalysis={setDataAnalysis}
//             dataAnalysis={dataAnalysis}
//           />
//         )}
//       </div>

//       <ModalContainer
//         rightStyle
//         open={open}
//         title='Настройки темплета'
//         description='Чтобы заполнить данные автоматически, воспользуйтесь сканером штрих-кода'
//         onClose={closeModal}
//       >
//         <AnalysisForm
//           setDataAnalysis={setDataAnalysis}
//           closeModal={closeModal}
//         />
//       </ModalContainer>
//       {loading && <Spinner loaderClass='indicator' />}
//     </div>
//   );
// };

// export default Main;

import React from 'react';

const Main = () => <div>Main</div>;

export default Main;
