import { Link } from 'react-router-dom';
import logo from '../../assets/images/Rick_and_Morty.svg';
import SunIcon from '../ui/icons/Sun';
import MoonIcon from '../ui/icons/Moon';
import useTheme from '../../hooks/useTheme';

export default function Header() {
  const { theme, setTheme } = useTheme();
  return (
    <header className="relative h-[75vh] w-full bg-[url('src/assets/images/background-light.jpg')] bg-cover bg-center transition-all duration-500 dark:bg-gray-900 dark:bg-[url('src/assets/images/background-dark.jpg')]">
      <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/50" />
      <div className="relative flex h-full flex-col items-center justify-center px-10 py-20">
        <img src={logo} alt="Rick and Morty Logo" className="w-2xl" />

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
      </div>
    </header>
  );
}
