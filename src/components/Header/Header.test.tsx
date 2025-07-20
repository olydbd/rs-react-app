import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';
import '@testing-library/jest-dom';

describe('Header Component', () => {
  it('renders the logo image', () => {
    render(<Header />);
    const logo = screen.getByAltText('Rick and Morty Logo');
    expect(logo).toBeInTheDocument();
  });
});
