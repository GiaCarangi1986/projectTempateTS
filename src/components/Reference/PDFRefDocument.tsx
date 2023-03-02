import React, { FC } from 'react';
import {
  Page,
  View,
  Document,
  StyleSheet,
  Font,
  Image,
  Text
} from '@react-pdf/renderer';

import { PDFRefDocumentProps } from './types';

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

const margin = 25;

const style = StyleSheet.create({
  block: {
    marginBottom: margin - 5
  },
  page: {
    fontFamily: 'Roboto',
    padding: 40
  },
  'paragraph::first-letter': {
    marginLeft: 10
  },
  paragraph: {
    fontSize: 12
  },
  paragraph_margin_bottom: {
    marginBottom: margin
  },
  img: {
    marginTop: margin,
    width: 300,
    alignSelf: 'center'
  },
  picture: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 500
  },
  text: {
    color: 'white'
  }
});

const PDFRefDocument: FC<PDFRefDocumentProps> = ({ data }) => (
  <Document language='ru'>
    <Page wrap size='A4' style={style.page}>
      <View>
        {data.map((el, index) => (
          <View key={`${el.image}` + String(index)} style={style.block}>
            {el.text &&
              el.text.length > 0 &&
              el.text?.map((str, indexEl) => {
                const styles: any[] = [
                  style.paragraph,
                  style['paragraph::first-letter']
                ];
                if (str.className === 'margin-bottom') {
                  styles.push(style.paragraph_margin_bottom);
                }
                return (
                  <Text key={`${str.paragraph}` + indexEl} style={styles}>
                    <Text style={style.text}>aaaaa</Text>
                    {str.paragraph}
                  </Text>
                );
              })}
            {el.image && (
              <View>
                <Image style={style.img} src={el.image} />
                <Text style={style.picture}>{`Рисунок ${index + 1}`}</Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default PDFRefDocument;
