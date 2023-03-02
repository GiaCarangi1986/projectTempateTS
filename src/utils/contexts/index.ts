import { createContext } from 'react';
import { StandartPageContextType } from './types';

export const StandartPageContext = createContext<StandartPageContextType>({
  Page: '',
  columns: [],
  setColumns: () => null,
  initColumns: []
});
