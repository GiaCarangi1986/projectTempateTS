import React, { FC } from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
  Image
} from '@react-pdf/renderer';

import { dateDDMMYYYYpointHHmmcolon } from '../../utils';

import { PDFDocumentProps } from './types';

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 'normal'
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
      fontWeight: 500
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 'bold'
    }
  ]
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    padding: 20
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 20
  },
  table: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 18,
    margin: 20
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  table_header: {
    textAlign: 'center',
    fontWeight: 500,
    border: 1,
    padding: 5
  },
  table_data: {
    border: 1,
    padding: 5
  },
  table_data_custom: {
    color: '#e72525'
  },
  img_item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  image: {
    width: 200
  },
  image_defect: {
    width: 300
  }
});

const PDFDocument: FC<PDFDocumentProps> = ({ date, data, images }) => (
  <Document language='ru'>
    <Page wrap size='A4' style={styles.page}>
      <Text style={styles.header}>{`Сляб от ${dateDDMMYYYYpointHHmmcolon(
        date
      )}`}</Text>
      <View style={styles.table}>
        <View style={styles.column}>
          <Text style={styles.table_header}>Наимен. дефекта</Text>
          <Text style={styles.table_data}>Автомат. контроль</Text>
          <Text style={styles.table_data}>Визуал. контроль</Text>
        </View>
        {data.map((el: any) => {
          const custStyle =
            typeof el.customValue !== 'string' && el.customValue !== el.value
              ? [styles.table_data, styles.table_data_custom]
              : styles.table_data;
          return (
            <View key={el.name} style={styles.column}>
              <Text style={styles.table_header}>{el.name}</Text>
              <Text style={styles.table_data}>{el.value}</Text>
              <Text style={custStyle}>{el.customValue}</Text>
            </View>
          );
        })}
      </View>
      <View break>
        {images.map((img) => (
          <View key={img.id} style={styles.img_item}>
            <Image style={styles.image} src={img.main} />
            <Image style={styles.image_defect} src={img.def} />
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFDocument;
