import { useContext } from 'react';
import { ThemeContext } from './context';

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error('Please, add ThemeProvider before using useTheme hook');
  }

  return context;
}
