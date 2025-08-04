import { describe, expect, it } from 'vitest';
import reducer, {
  toggleCard,
  removeAllCards,
  type SelectedCardsState,
} from './selectedCardsSlice';

const initialState: SelectedCardsState = {
  cards: [],
};

const character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  origin: { name: 'Earth (C-137)', url: '' },
  location: { name: 'Citadel of Ricks', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

describe('selectedCardsSlice Tests', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should add a card if it does not exist', () => {
    expect(reducer(initialState, toggleCard(character)).cards).toHaveLength(1);
  });

  it('should remove all cards', () => {
    const prevState: SelectedCardsState = {
      cards: [character, { ...character, id: 2 }],
    };

    expect(reducer(prevState, removeAllCards())).toEqual(initialState);
  });
});
