import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Header from './Header';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ThemeProvider from '../contexts/theme/provider';
import userEvent from '@testing-library/user-event';

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
  it('clicking button toggles theme icon and mode', async () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>,
    );

    const toggleButton = screen.getByRole('button');

    await userEvent.click(toggleButton);

    const icon = await screen.findByTestId('moon-icon');
    expect(icon).toBeVisible();
  });
});
