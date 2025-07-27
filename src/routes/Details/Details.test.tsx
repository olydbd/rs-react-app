import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Details from './Details';
import { MemoryRouter } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLoaderData: () => ({
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: { name: 'Earth (C-137)' },
      location: { name: 'Citadel of Ricks' },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    }),
    useSearchParams: () => [new URLSearchParams('page=1&search=Rick')],
    useNavigate: () => mockNavigate,
  };
});

const mockNavigate = vi.fn();

describe('Details Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders character details correctly', () => {
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>,
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText(/Status:/)).toBeInTheDocument();
    expect(screen.getByText(/Alive/)).toBeInTheDocument();
    expect(screen.getByText(/Species:/)).toBeInTheDocument();
    expect(screen.getByText(/Human/)).toBeInTheDocument();
    expect(screen.getByText(/Gender:/)).toBeInTheDocument();
    expect(screen.getByText(/Male/)).toBeInTheDocument();
    expect(screen.getByText(/Location:/)).toBeInTheDocument();
    expect(screen.getByText(/Citadel of Ricks/)).toBeInTheDocument();
    expect(screen.getByText(/Origin:/)).toBeInTheDocument();
    expect(screen.getByText(/Earth \(C-137\)/)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      expect.stringContaining('rickandmortyapi'),
    );
  });

  it('has a working close link', () => {
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>,
    );

    const closeLink = screen.getByText(/Close/);
    expect(closeLink).toHaveAttribute('href', '/characters?page=1&search=Rick');
  });
});
