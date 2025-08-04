import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ThemeProvider from '../contexts/theme/provider';

describe('Header Component', () => {
  it('renders the logo image', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>,
    );
    const logo = screen.getByRole('img', { name: /Rick and Morty Logo/i });
    expect(logo).toBeVisible();
  });
});
