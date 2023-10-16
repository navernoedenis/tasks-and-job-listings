import { createContext, useEffect, type PropsWithChildren } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { type Theme } from './models';

interface ThemeContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContext | null>(null);

const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', () => {
    return isSystemDark ? 'dark' : 'light';
  });

  useEffect(() => {
    if (theme === 'dark' || (theme === 'system' && isSystemDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
