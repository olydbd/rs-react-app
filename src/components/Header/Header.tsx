import { Link } from 'react-router-dom';
import logo from '../../assets/images/Rick_and_Morty.svg';

export default function Header() {
  return (
    <header className="relative flex justify-center px-10 py-20">
      <img src={logo} alt="Rick and Morty Logo" className="w-lg" />
      <Link
        to="/about"
        className="absolute top-6 right-8 animate-bounce rounded-full bg-[#BFDE42] px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#acc05a]"
      >
        About
      </Link>
    </header>
  );
}
