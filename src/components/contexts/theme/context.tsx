import { createContext, type Dispatch, type SetStateAction } from 'react';

export interface ThemeContext {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

export const ThemeContext = createContext<ThemeContext | null>(null);
