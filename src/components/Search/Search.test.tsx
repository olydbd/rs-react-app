import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import { SEARCH_KEY } from '../../utils/constants';

describe('Search Component', () => {
  const fn = vi.fn();

  beforeEach(() => {
    localStorage.clear();
    fn.mockClear();
  });

  describe('Rendering Tests', () => {
    it('renders search input and search button', () => {
      render(<Search initialSearch="" onClick={fn} />);

      const input = screen.getByPlaceholderText(/Search character/i);
      const button = screen.getByRole('button');

      expect(input).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    it('displays previously saved search term from localStorage on mount', () => {
      localStorage.setItem(SEARCH_KEY, 'Rick');

      render(
        <Search
          initialSearch={localStorage.getItem(SEARCH_KEY) || ''}
          onClick={fn}
        />,
      );

      const input = screen.getByPlaceholderText(
        /Search character/i,
      ) as HTMLInputElement;
      expect(input.value).toBe('Rick');
    });

    it('shows empty input when no saved term exists', () => {
      localStorage.removeItem(SEARCH_KEY);

      render(
        <Search
          initialSearch={localStorage.getItem(SEARCH_KEY) || ''}
          onClick={fn}
        />,
      );

      const input = screen.getByPlaceholderText(
        /Search character/i,
      ) as HTMLInputElement;
      expect(input.value).toBe('');
    });
  });

  describe('User Interaction Tests', () => {
    it('updates input value when user types', async () => {
      render(<Search initialSearch="" onClick={fn} />);
      const input = screen.getByPlaceholderText(
        /Search character/i,
      ) as HTMLInputElement;

      await userEvent.type(input, 'Poopybutthole');
      expect(input.value).toBe('Poopybutthole');
    });

    it('saves search term to localStorage when search button is clicked', async () => {
      render(<Search initialSearch="" onClick={fn} />);

      const input = screen.getByPlaceholderText(
        /Search character/i,
      ) as HTMLInputElement;
      const button = screen.getByRole('button');

      await userEvent.type(input, 'Poopybutthole');
      await userEvent.click(button);

      expect(localStorage.getItem(SEARCH_KEY)).toBe('Poopybutthole');
    });

    it('trims whitespace from search input before saving', async () => {
      render(<Search initialSearch="" onClick={fn} />);

      const input = screen.getByPlaceholderText(
        /Search character/i,
      ) as HTMLInputElement;
      const button = screen.getByRole('button');

      await userEvent.type(input, '   Poopybutthole   ');
      await userEvent.click(button);

      expect(localStorage.getItem(SEARCH_KEY)).toBe('Poopybutthole');
    });

    it('triggers search callback with correct parameters', async () => {
      render(<Search initialSearch="" onClick={fn} />);

      const input = screen.getByPlaceholderText(
        /Search character/i,
      ) as HTMLInputElement;
      const button = screen.getByRole('button');

      await userEvent.type(input, 'Poopybutthole');
      await userEvent.click(button);

      expect(fn).toHaveBeenCalledWith('Poopybutthole');
    });
  });

  describe('LocalStorage Integration', () => {
    it('overwrites existing localStorage value when new search is performed', async () => {
      localStorage.setItem(SEARCH_KEY, 'Morty');

      render(<Search initialSearch="Morty" onClick={fn} />);

      const input = screen.getByPlaceholderText(
        /Search character/i,
      ) as HTMLInputElement;
      const button = screen.getByRole('button');

      await userEvent.clear(input);
      await userEvent.type(input, 'Poopybutthole');
      await userEvent.click(button);

      expect(localStorage.getItem(SEARCH_KEY)).toBe('Poopybutthole');
    });
  });
});
