import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Main from './Main';
import '@testing-library/jest-dom';
import type { Character } from '../../utils/types';
import { SEARCH_KEY } from '../../utils/constants';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';

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
  default: ({ characters }: { characters: Character[] }) => (
    <div>
      {characters.map((character) => (
        <div key={character.id}>{character.name}</div>
      ))}
    </div>
  ),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLoaderData: vi.fn(),
  };
});

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
    it('loads characters from loader and shows them', () => {
      (useLoaderData as ReturnType<typeof vi.fn>).mockReturnValue({
        characters,
        pages: 1,
        page: 1,
      });

      renderWithRouter();

      expect(screen.getByText('Rick Sanchez')).toBeVisible();
    });

    it('reads search from localStorage', async () => {
      localStorage.setItem(SEARCH_KEY, 'Rick');

      (useLoaderData as ReturnType<typeof vi.fn>).mockReturnValue({
        characters,
        pages: 1,
        page: 1,
      });

      renderWithRouter();

      expect(screen.getByTestId('search-input')).toHaveValue('Rick');
    });
  });
});
