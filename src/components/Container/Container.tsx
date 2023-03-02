import React, { FC, useState } from 'react';

import { Portal } from '../../views/common';

import { SnackMessage } from '../../views';

import { ContainerProps, StateContextType } from './types';
import styles from './index.module.scss';

export const StateContext = React.createContext<StateContextType>({
  setSnackMessage: () => null,
  openSnackbar: () => null,
  closeSnackbar: () => null,
  setError: () => null
});

const Container: FC<ContainerProps> = ({ children }) => {
  const [message, setMessage] = useState('');
  const [openSnackBar, setOpenSnackMessage] = useState(false);
  const [error, setError] = useState(false);

  const handleOpenSnackbar = () => setOpenSnackMessage(true);
  const handleCloseSnackbar = () => setOpenSnackMessage(false);

  return (
    <StateContext.Provider
      value={{
        setSnackMessage: setMessage,
        openSnackbar: handleOpenSnackbar,
        closeSnackbar: handleCloseSnackbar,
        setError
      }}
    >
      <>
        {children}
        {openSnackBar && (
          <Portal className={styles.portal}>
            <SnackMessage
              message={message}
              isError={error}
              onClose={handleCloseSnackbar}
            />
          </Portal>
        )}
      </>
    </StateContext.Provider>
  );
};

export default Container;
