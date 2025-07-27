import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe('Header Component', () => {
  it('renders the logo image', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    const logo = screen.getByRole('img', { name: /Rick and Morty Logo/i });
    expect(logo).toBeVisible();
  });
});
