type ContainerProps = {
  children: any;
};

type StateContextType = {
  setSnackMessage: (message: string) => void;
  openSnackbar: () => void;
  closeSnackbar: () => void;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
};

export type { ContainerProps, StateContextType };
