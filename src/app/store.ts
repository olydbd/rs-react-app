import { configureStore } from '@reduxjs/toolkit';
import selectedCardsReducer from '../features/selectedCards/selectedCardsSlice';
import { characterApi } from '../services/character';
import { setupListeners } from '@reduxjs/toolkit/query/react';

export const store = configureStore({
  reducer: {
    selectedCards: selectedCardsReducer,
    [characterApi.reducerPath]: characterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(characterApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
