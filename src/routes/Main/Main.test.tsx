import { render, screen } from '@testing-library/react';
import {
  describe,
  it,
  expect,
  beforeEach,
  vi,
  type MockedFunction,
} from 'vitest';
import Main from './Main';
import '@testing-library/jest-dom';
import type { Character } from '../../utils/types';
import { SEARCH_KEY } from '../../utils/constants';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../app/store';

vi.mock('../../components/SearchForm/SearchForm', () => ({
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

vi.mock('../../services/character', async () => {
  const actual = await vi.importActual('../../services/character');
  return {
    ...actual,
    useGetCharactersQuery: vi.fn().mockReturnValue({
      data: {
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            origin: { name: '', url: '' },
            location: { name: '', url: '' },
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          },
        ],
        pages: 1,
      },
      isError: false,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    }),
  };
});

const { useGetCharactersQuery } = await import('../../services/character');
const mockedUseGetCharactersQuery = useGetCharactersQuery as MockedFunction<
  typeof useGetCharactersQuery
>;

describe('Main Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  const renderComponent = (url = '/?page=1') => {
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[url]}>
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
  };

  it('display the title', () => {
    renderComponent();
    expect(screen.getByText(/search characters/i)).toBeVisible();
  });

  it('reads initial search value from localStorage', () => {
    localStorage.setItem(SEARCH_KEY, 'Rick');
    renderComponent();
    expect(screen.getByTestId('search-input')).toHaveValue('Rick');
  });

  it('renders characters from CardList', () => {
    renderComponent();
    expect(screen.getByText('Rick Sanchez')).toBeVisible();
  });

  it('shows spinner during loading', () => {
    mockedUseGetCharactersQuery.mockReturnValueOnce({
      data: undefined,
      isError: false,
      isLoading: true,
      isFetching: false,
      refetch: vi.fn(),
    });

    renderComponent();
    expect(screen.getByRole('status')).toBeVisible();
  });

  it('shows error message on fetch error', () => {
    mockedUseGetCharactersQuery.mockReturnValueOnce({
      data: undefined,
      isError: true,
      isLoading: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    renderComponent();
    expect(screen.getByText(/failed to load characters/i)).toBeVisible();
  });
});
