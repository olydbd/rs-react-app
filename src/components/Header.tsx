import { Component, type ReactNode } from 'react';

class Header extends Component {
  render(): ReactNode {
    return (
      <header className="py-20">
        <h1 className="text-center text-5xl font-bold text-gray-700">
          Rick and Morty
        </h1>
      </header>
    );
  }
}

export default Header;
