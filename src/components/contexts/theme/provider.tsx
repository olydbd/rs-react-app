import { useEffect, type ReactNode } from 'react';
import { ThemeContext } from './context';
import useLocalStorage from '../../../hooks/useLocalStorage';

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setTheme(theme);
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
