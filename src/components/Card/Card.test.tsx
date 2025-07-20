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
  image: '',
};

const incompleteCharacter = {
  id: 3,
  name: 'Evil Morty',
  status: '',
  species: '',
  origin: { name: '', url: '' },
  location: { name: '', url: '' },
  image: '',
};

describe('Card Component', () => {
  describe('Rendering Tests', () => {
    it('displays item name and description correctly', () => {
      render(<Card character={character} />);

      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Alive')).toBeInTheDocument();
      expect(screen.getByText('Human')).toBeInTheDocument();
      expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
      expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
      const img = screen.getByAltText('Character Image') as HTMLImageElement;
      expect(img.src).toBe(character.image);
    });

    it('handles missing props gracefully', () => {
      render(<Card character={incompleteCharacter} />);

      expect(screen.getByText('Evil Morty')).toBeInTheDocument();
    });
  });
});
