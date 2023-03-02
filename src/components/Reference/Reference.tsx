// import React, { useState } from 'react';
// import cn from 'classnames';

// import LazyImage from '../LazyImage';
// import referenceDocData from './mockData';
// import { Button } from '../../views/common';
// import PDFButton from '../PDFButton';
// import PDFRefDocument from './PDFRefDocument';

// import style from './index.module.scss';

// const Reference = () => {
//   const [generateLink, setGenerateLink] = useState(false);
//   const handleGenLink = () => setGenerateLink(true);

//   return (
//     <div className={style.reference}>
//       <div className={style.reference__header}>
//         <p className={style.reference__title}>
//           Справка содержит полное руководство пользователя по работе с системой
//           ТЕМЛЕТЫ
//         </p>
//         {generateLink ? (
//           <PDFButton
//             Document={<PDFRefDocument data={referenceDocData} />}
//             conditionLoading={
//               !referenceDocData || referenceDocData.length === 0
//             }
//             title='Руководство пользователя'
//             textButton='Скачать справку'
//             showSpinner
//             textSpinner='Справка формируется. Пожалуйста, подождите...'
//             className={style.reference__btn}
//           />
//         ) : (
//           <Button onClick={handleGenLink}>
//             Сформировать ссылку для скачивания
//           </Button>
//         )}
//       </div>
//       <div className={style.reference__data}>
//         {referenceDocData.map((el, index) => (
//           <div key={`${el.image}` + String(index)}>
//             {el.text &&
//               el.text.length > 0 &&
//               el.text?.map((str, indexEl) => (
//                 <p
//                   key={`${str.paragraph}` + indexEl}
//                   className={cn(style.reference__paragraph, {
//                     [style.reference__paragraph_margin_bottom]:
//                       str.className === 'margin-bottom'
//                   })}
//                 >
//                   {str.paragraph}
//                 </p>
//               ))}
//             {el.image && (
//               <div>
//                 <LazyImage className={style.reference__img} src={el.image} />
//                 <p className={style.reference__picture}>{`Рисунок ${
//                   index + 1
//                 }`}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Reference;

import React from 'react';

const Reference = () => <div>Reference</div>;

export default Reference;
