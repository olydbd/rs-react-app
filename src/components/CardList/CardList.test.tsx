import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import type { Character } from '../../utils/types';

vi.mock('../Card/Card', () => ({
  default: ({ character }: { character: Character }) => (
    <div data-testid="card">{character.name}</div>
  ),
}));

vi.mock('../ui/Spinner/Spinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

const characters: Character[] = [
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

const emptyCharacters: Character[] = [
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

describe('CardList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    it('renders correct number of items when data is provided', async () => {
      render(<CardList characters={characters} loading={false} error={null} />);
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(2);
    });

    it("displays 'no results' message when data array is empty", async () => {
      render(<CardList characters={[]} loading={false} error={null} />);
      expect(screen.getByText('No character was found :(')).toBeInTheDocument();
    });

    it('shows loading state while fetching data', () => {
      render(<CardList characters={[]} loading={true} error={null} />);
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  describe('Data Display Tests', () => {
    it('correctly displays item names and descriptions', async () => {
      render(<CardList characters={characters} loading={false} error={null} />);
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Black Rick')).toBeInTheDocument();
    });

    it('handles missing or undefined data gracefully', async () => {
      render(
        <CardList characters={emptyCharacters} loading={false} error={null} />
      );
      const cards = screen.getAllByTestId('card');
      expect(cards).toHaveLength(2);
    });
  });
});
