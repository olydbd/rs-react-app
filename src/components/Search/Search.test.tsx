import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from './Search';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';

describe('Search Component', () => {
  const fn = vi.fn();

  beforeEach(() => {
    fn.mockClear();
  });

  describe('Rendering Tests', () => {
    it('renders search input and search button', () => {
      render(<Search initialSearch="" onClick={fn} />);

      const input = screen.getByPlaceholderText(/Search character/i);
      const button = screen.getByRole('button');

      expect(input).toBeVisible();
      expect(button).toBeVisible();
    });

    it('displays initialSearch value in input', () => {
      render(<Search initialSearch="Rick" onClick={fn} />);

      const input = screen.getByPlaceholderText(
        /Search character/i,
      ) as HTMLInputElement;

      expect(input.value).toBe('Rick');
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

    it('trims whitespace from search input', async () => {
      render(<Search initialSearch="" onClick={fn} />);

      const input = screen.getByPlaceholderText(
        /Search character/i,
      ) as HTMLInputElement;
      const button = screen.getByRole('button');

      await userEvent.type(input, '   Poopybutthole   ');
      await userEvent.click(button);

      expect(input.value).toBe('Poopybutthole');
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
});
