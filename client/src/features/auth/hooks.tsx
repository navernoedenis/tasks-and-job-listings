import { useContext } from 'react';
import { AuthContext } from './context';

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error('Please, add AuthProvider before using useAuth hook');
  }

  return context;
}
