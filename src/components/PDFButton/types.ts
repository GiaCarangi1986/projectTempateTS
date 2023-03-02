type PDFButtonProps = {
  Document: JSX.Element;
  className?: string;
  conditionLoading: boolean;
  title: string;
  onClick?: () => void;
  showSpinner?: boolean;
  textSpinner?: string;
  textLoadBtn?: string;
  textButton?: string;
};

type LoadBtnProps = {
  className?: string;
  text?: string;
};

export type { PDFButtonProps, LoadBtnProps };
