import { render, screen } from '@testing-library/react';
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type MockedFunction,
} from 'vitest';
import Details from './Details';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const mockNavigate = vi.fn();
const mockRefetch = vi.fn();

vi.mock('../../services/character', async () => {
  const actual = await vi.importActual('../../services/character');
  return {
    ...actual,
    useGetCharacterByIdQuery: vi.fn(),
  };
});

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ characterId: '1' }),
    useSearchParams: () => [new URLSearchParams('page=1&search=Rick')],
    useNavigate: () => mockNavigate,
  };
});

const { useGetCharacterByIdQuery } = await import('../../services/character');

const renderComponent = () =>
  render(
    <MemoryRouter initialEntries={['/character/1']}>
      <Routes>
        <Route path="/character/:characterId" element={<Details />} />
      </Routes>
    </MemoryRouter>,
  );

const mockedUseGetCharacterByIdQuery =
  useGetCharacterByIdQuery as MockedFunction<typeof useGetCharacterByIdQuery>;

describe('Details Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders character details correctly', () => {
    mockedUseGetCharacterByIdQuery.mockReturnValue({
      data: {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        gender: 'Male',
        origin: { name: 'Earth (C-137)' },
        location: { name: 'Citadel of Ricks' },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      },
      isError: false,
      isLoading: false,
      refetch: mockRefetch,
    });

    renderComponent();

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText(/Status:/)).toBeInTheDocument();
    expect(screen.getByText(/Alive/)).toBeInTheDocument();
    expect(screen.getByText(/Species:/)).toBeInTheDocument();
    expect(screen.getAllByText(/Human/)[0]).toBeInTheDocument();
    expect(screen.getByText(/Gender:/)).toBeInTheDocument();
    expect(screen.getByText(/Male/)).toBeInTheDocument();
    expect(screen.getByText(/Location:/)).toBeInTheDocument();
    expect(screen.getAllByText(/Citadel of Ricks/)[0]).toBeInTheDocument();
    expect(screen.getByText(/Origin:/)).toBeInTheDocument();
    expect(screen.getAllByText(/Earth \(C-137\)/)[0]).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      expect.stringContaining('rickandmortyapi'),
    );
  });

  it('shows spinner during loading', () => {
    mockedUseGetCharacterByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: mockRefetch,
    });

    renderComponent();

    expect(screen.getByRole('status')).toBeVisible();
  });

  it('shows error message on fetch error', () => {
    mockedUseGetCharacterByIdQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: mockRefetch,
    });

    renderComponent();

    expect(screen.getByText(/error occurred/i)).toBeVisible();
  });
});
