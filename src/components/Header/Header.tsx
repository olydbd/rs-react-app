import { Link } from 'react-router-dom';
import SunIcon from '../ui/icons/Sun';
import MoonIcon from '../ui/icons/Moon';
import useTheme from '../../hooks/useTheme';

export default function Header() {
  const { theme, setTheme } = useTheme();
  return (
    <header className="relative h-[75vh] w-full bg-[url('/background-light.jpg')] bg-cover bg-center transition-all duration-500 dark:bg-gray-900 dark:bg-[url('/background-dark.jpg')]">
      <div className="absolute inset-0 bg-white/30 dark:bg-gray-900/50" />
      <div className="relative flex h-full items-start justify-end gap-10 p-10">
        <Link
          to="/"
          className="animate-bounce rounded-full bg-[#42B4CA] px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#1196aa] dark:bg-fuchsia-400 hover:dark:bg-fuchsia-600"
        >
          Main
        </Link>

        <Link
          to="/about"
          className="animate-bounce rounded-full bg-[#BFDE42] px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#acc05a] dark:bg-fuchsia-400 hover:dark:bg-fuchsia-600"
        >
          About
        </Link>

        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="size-5 cursor-pointer"
        >
          {theme === 'light' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  );
}
