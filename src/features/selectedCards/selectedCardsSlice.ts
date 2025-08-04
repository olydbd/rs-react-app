import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Character } from '../../utils/types';
import type { RootState } from '../../app/store';

export interface SelectedCardsState {
  cards: Character[];
}

const initialState: SelectedCardsState = {
  cards: [],
};

export const selectedCardsSlice = createSlice({
  name: 'selectedCards',
  initialState,
  reducers: {
    toggleCard: (state, action: PayloadAction<Character>) => {
      const cardIndex = state.cards.findIndex(
        (c) => c.id === action.payload.id,
      );
      if (cardIndex === -1) {
        state.cards.push(action.payload);
      } else {
        state.cards.splice(cardIndex, 1);
      }
    },
    removeAllCards: () => initialState,
  },
});

export const { toggleCard, removeAllCards } = selectedCardsSlice.actions;

export const selectedCards = (state: RootState) => state.selectedCards.cards;

export default selectedCardsSlice.reducer;
