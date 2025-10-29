import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/constants';
import { type Character, type CharactersResponse } from '../utils/types';

export const characterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    validateStatus: (response) => {
      return response.status === 200 || response.status === 404;
    },
  }),
  endpoints: (builder) => ({
    getCharacterById: builder.query<Character, string | number>({
      query: (id) => `character/${id}`,
    }),
    getCharacters: builder.query<
      { results: Character[]; pages: number },
      { searchText?: string; page?: number }
    >({
      query: ({ searchText = '', page = 1 }) => {
        const params = new URLSearchParams();
        params.set('page', page.toString());

        const trimmedText = searchText.trim();
        if (trimmedText) {
          params.set('name', trimmedText);
        }

        return `character?${params.toString()}`;
      },
      transformResponse: (response: CharactersResponse, meta) => {
        if (meta?.response?.status === 404) {
          return { results: [], pages: 0 };
        }
        return {
          results: response.results ?? [],
          pages: response.info.pages ?? 1,
        };
      },
    }),
  }),
});

export const { useGetCharacterByIdQuery, useGetCharactersQuery } = characterApi;
