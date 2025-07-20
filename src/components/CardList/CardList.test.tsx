import { render, screen, waitFor } from '@testing-library/react';
import CardList from './CardList';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import type { Character } from '../../utils/types';
import { fetchData } from '../../services/api';

vi.mock('../../services/api');

vi.mock('../Card/Card', () => ({
  default: ({ character }: { character: Character }) => (
    <div data-testid="card">{character.name}</div>
  ),
}));

vi.mock('../ui/Spinner/Spinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

describe('CardList Component', () => {
  const mockCharacters: Character[] = [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      origin: { name: '', url: '' },
      location: { name: '', url: '' },
      image: '',
    },
    {
      id: 2,
      name: 'Black Rick',
      status: 'Alive',
      species: 'Human',
      origin: { name: '', url: '' },
      location: { name: '', url: '' },
      image: '',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    it('renders correct number of items when data is provided', async () => {
      vi.mocked(fetchData).mockResolvedValue(mockCharacters);

      render(<CardList searchText="Rick" />);

      await waitFor(() =>
        expect(screen.getAllByTestId('card')).toHaveLength(2)
      );
    });

    it("displays 'no results' message when data array is empty", async () => {
      vi.mocked(fetchData).mockResolvedValue([]);

      render(<CardList searchText="Zoro" />);

      await waitFor(() =>
        expect(
          screen.getByText('No character was found :(')
        ).toBeInTheDocument()
      );
    });

    it('shows loading state while fetching data', () => {
      vi.mocked(fetchData).mockImplementation(() => new Promise(() => {}));

      render(<CardList searchText="" />);

      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  describe('Data Display Tests', () => {
    it('correctly displays item names and descriptions', async () => {
      vi.mocked(fetchData).mockResolvedValue(mockCharacters);

      render(<CardList searchText="" />);

      await waitFor(() => {
        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
        expect(screen.getByText('Black Rick')).toBeInTheDocument();
      });
    });

    it('handles missing or undefined data gracefully', async () => {
      const incompleteCharacter: Character[] = [
        {
          id: 3,
          name: '',
          status: '',
          species: '',
          origin: { name: '', url: '' },
          location: { name: '', url: '' },
          image: '',
        },
      ];

      vi.mocked(fetchData).mockResolvedValue(incompleteCharacter);

      render(<CardList searchText="" />);

      await waitFor(() =>
        expect(screen.queryByTestId('card')).toBeInTheDocument()
      );
    });
  });

  describe('Error Handling Tests', () => {
    it('displays error message when API call fails', async () => {
      vi.mocked(fetchData).mockRejectedValue(new Error('Error'));

      render(<CardList searchText="" />);

      await waitFor(() =>
        expect(screen.getByText('Error')).toBeInTheDocument()
      );
    });
  });
});
