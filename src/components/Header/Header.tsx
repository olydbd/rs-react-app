import logo from '../../assets/images/Rick_and_Morty.svg';

export default function Header() {
  return (
    <header className="flex justify-center px-10 py-20">
      <img src={logo} alt="Rick and Morty Logo" className="w-lg" />
    </header>
  );
}
