import { render, screen } from '@testing-library/react';
import Card from './Card';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

const character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  origin: { name: 'Earth (C-137)', url: '' },
  location: { name: 'Citadel of Ricks', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

const incompleteCharacter = {
  id: 3,
  name: 'Evil Morty',
  status: '',
  species: '',
  origin: { name: '', url: '' },
  location: { name: '', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

describe('Card Component', () => {
  describe('Rendering Tests', () => {
    it('displays item name and description correctly', () => {
      render(<Card character={character} />);

      expect(screen.getByText('Rick Sanchez')).toBeVisible();
      expect(screen.getByText('Alive')).toBeVisible();
      expect(screen.getByText('Human')).toBeVisible();
      expect(screen.getByText('Earth (C-137)')).toBeVisible();
      expect(screen.getByText('Citadel of Ricks')).toBeVisible();
      const img = screen.getByAltText('Character Image') as HTMLImageElement;
      expect(img.src).toBe(character.image);
    });

    it('handles missing props gracefully', () => {
      render(<Card character={incompleteCharacter} />);

      expect(screen.getByText('Evil Morty')).toBeInTheDocument();
    });
  });
});
