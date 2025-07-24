import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';
import type { Character } from '../../utils/types';

vi.mock('../Card/Card', () => ({
  default: ({ character }: { character: Character }) => (
    <div role="article">{character.name}</div>
  ),
}));

vi.mock('../ui/Spinner/Spinner', () => ({
  default: () => <div role="status" aria-label="Loading..." />,
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

const emptyCharacters: Character[] = [
  {
    id: 3,
    name: '',
    status: '',
    species: '',
    origin: { name: '', url: '' },
    location: { name: '', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
];

describe('CardList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering Tests', () => {
    it('renders correct number of items when data is provided', async () => {
      render(<CardList characters={characters} loading={false} error={null} />);
      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(characters.length);
    });

    it("displays 'no results' message when data array is empty", async () => {
      render(<CardList characters={[]} loading={false} error={null} />);
      expect(screen.getByText('No character was found :(')).toBeVisible();
    });

    it('shows loading state while fetching data', () => {
      render(<CardList characters={[]} loading={true} error={null} />);
      expect(screen.getByRole('status')).toBeVisible();
    });

    it('displays error message when error occurs', () => {
      render(
        <CardList characters={[]} loading={false} error="Error occurred" />,
      );
      expect(screen.getByText('Error occurred')).toBeVisible();
    });
  });

  describe('Data Display Tests', () => {
    it('correctly displays item names and descriptions', async () => {
      render(<CardList characters={characters} loading={false} error={null} />);
      expect(screen.getByText('Rick Sanchez')).toBeVisible();
      expect(screen.getByText('Black Rick')).toBeVisible();
    });

    it('handles missing or undefined data gracefully', async () => {
      render(
        <CardList characters={emptyCharacters} loading={false} error={null} />,
      );
      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(emptyCharacters.length);
    });
  });
});
