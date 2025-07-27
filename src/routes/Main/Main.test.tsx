import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Main from './Main';
import '@testing-library/jest-dom';
import type { Character } from '../../utils/types';
import { fetchData } from '../../services/api';
import { SEARCH_KEY } from '../../utils/constants';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('../../components/Search/Search', () => ({
  default: ({
    initialSearch,
    onClick,
  }: {
    initialSearch: string;
    onClick: (search: string) => void;
  }) => (
    <div>
      <input data-testid="search-input" defaultValue={initialSearch} />
      <button data-testid="search-button" onClick={() => onClick('test')}>
        Search
      </button>
    </div>
  ),
}));

vi.mock('../../components/CardList/CardList', () => ({
  default: ({
    characters,
    loading,
    error,
  }: {
    characters: Character[];
    loading: boolean;
    error: string | null;
  }) => (
    <div>
      {loading && <div data-testid="loading">Loading...</div>}
      {error && <div data-testid="error">{error}</div>}
      {characters.map((character) => (
        <div key={character.id}>{character.name}</div>
      ))}
    </div>
  ),
}));

vi.mock('../../services/api', () => ({
  fetchData: vi.fn(),
}));

const characters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    origin: { name: '', url: '' },
    location: { name: '', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
  {
    id: 2,
    name: 'Black Rick',
    status: 'Alive',
    species: 'Human',
    origin: { name: '', url: '' },
    location: { name: '', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
];

describe('Main Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.mocked(fetchData).mockResolvedValue({ results: characters, pages: 1 });
  });

  const renderWithRouter = (url = '/?page=1') => {
    return render(
      <MemoryRouter initialEntries={[url]}>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </MemoryRouter>,
    );
  };

  describe('Integration Tests', () => {
    it('makes initial API call on component mount', async () => {
      renderWithRouter('/?page=1');

      await waitFor(() => {
        expect(fetchData).toHaveBeenCalledWith('', 1);
      });
    });

    it('handles search term from localStorage on initial load', async () => {
      localStorage.setItem(SEARCH_KEY, 'Rick');

      renderWithRouter('/?page=1');

      await waitFor(() => {
        expect(fetchData).toHaveBeenCalledWith('Rick', 1);
      });

      expect(screen.getByTestId('search-input')).toHaveValue('Rick');
    });
  });

  describe('API Integration Tests', () => {
    it('calls API with correct parameters', async () => {
      renderWithRouter('/?page=2');

      const searchButton = screen.getByTestId('search-button');
      await userEvent.click(searchButton);

      await waitFor(() => {
        expect(fetchData).toHaveBeenCalledWith('test', 2);
      });
    });

    it('handles successful API responses', async () => {
      renderWithRouter('/?page=1');

      await waitFor(() => {
        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      });
    });

    it('handles API error responses', async () => {
      const errorMessage = 'API Error!';
      vi.mocked(fetchData).mockRejectedValueOnce(new Error(errorMessage));

      renderWithRouter('/?page=1');

      await waitFor(() => {
        expect(screen.getByTestId('error')).toHaveTextContent(errorMessage);
      });
    });
  });
});
