type TextType = {
  paragraph: string;
  className?: 'margin-bottom';
};

type ReferenceData = {
  text?: TextType[];
  image?: string;
};

type PDFRefDocumentProps = {
  data: ReferenceData[];
};

export type { ReferenceData, PDFRefDocumentProps };
