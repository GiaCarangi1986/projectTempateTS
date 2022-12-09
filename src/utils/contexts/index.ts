import { createContext } from 'react';
import { StandartPageContextType } from './types';

export const StandartPageContext = createContext<StandartPageContextType>({
  Page: ''
});
