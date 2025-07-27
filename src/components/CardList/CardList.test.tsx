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
    it('renders correct number of items when data is provided', () => {
      render(<CardList characters={characters} />);
      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(characters.length);
    });

    it("displays 'no results' message when data array is empty", () => {
      render(<CardList characters={[]} />);
      expect(screen.getByText('No character was found :(')).toBeVisible();
    });
  });

  describe('Data Display Tests', () => {
    it('correctly displays item names and descriptions', () => {
      render(<CardList characters={characters} />);
      expect(screen.getByText('Rick Sanchez')).toBeVisible();
      expect(screen.getByText('Black Rick')).toBeVisible();
    });

    it('handles missing or undefined data gracefully', () => {
      render(<CardList characters={emptyCharacters} />);
      const cards = screen.getAllByRole('article');
      expect(cards).toHaveLength(emptyCharacters.length);
    });
  });
});
