import React, { FC } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';

import { Button, Spinner } from '../../views/common';

import { LoadBtnProps, PDFButtonProps } from './types';

export const LoadBtn: FC<LoadBtnProps> = ({
  className,
  text = 'Загрузка документа...'
}) => (
  <Button className={className} uppercase disabled>
    {text}
  </Button>
);

const PDFButton: FC<PDFButtonProps> = ({
  onClick = () => null,
  title,
  conditionLoading,
  className,
  Document,
  showSpinner,
  textSpinner = 'Идет загрузка. Пожалуйста подождите...',
  textLoadBtn,
  textButton = 'Скачать'
}) => (
  <>
    {conditionLoading ? (
      <LoadBtn className={className} text={textLoadBtn} />
    ) : (
      <PDFDownloadLink
        document={Document}
        fileName={title}
        style={{ border: 'none', backgroundColor: 'transparet' }}
      >
        {({ loading: load, blob }) =>
          !blob || load ? (
            <>
              <LoadBtn className={className} text={textLoadBtn} />
              {showSpinner && <Spinner text={textSpinner} />}
            </>
          ) : (
            <Button className={className} uppercase onClick={onClick}>
              {textButton}
            </Button>
          )
        }
      </PDFDownloadLink>
    )}
  </>
);

export default PDFButton;
