import { useContext } from 'react';
import { ThemeContext } from '../components/contexts/theme/context';

export default function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('Must be used within ThemeProvider');
  return context;
}
