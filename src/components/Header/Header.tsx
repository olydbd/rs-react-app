import { Link } from 'react-router-dom';
import logo from '../../assets/images/Rick_and_Morty.svg';
import SunIcon from '../ui/icons/Sun';
import MoonIcon from '../ui/icons/Moon';
import useTheme from '../../hooks/useTheme';

export default function Header() {
  const { theme, setTheme } = useTheme();
  return (
    <header className="relative flex justify-center bg-white px-10 py-20 transition-all duration-500 dark:bg-gray-900">
      <img src={logo} alt="Rick and Morty Logo" className="w-lg" />
      <Link
        to="/about"
        className="absolute top-6 right-8 animate-bounce rounded-full bg-[#BFDE42] px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#acc05a] dark:bg-fuchsia-400 hover:dark:bg-fuchsia-600"
      >
        About
      </Link>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="absolute top-6 left-8 size-5 cursor-pointer"
      >
        {theme === 'light' ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
}
