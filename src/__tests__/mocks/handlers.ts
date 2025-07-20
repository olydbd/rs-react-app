import { http, HttpResponse } from 'msw';
import type { Character } from '../../utils/types';

const characters: Character[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    origin: { name: 'Earth (C-137)', url: '' },
    location: { name: 'Citadel of Ricks', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  },
];

export const handlers = [
  http.get('https://rickandmortyapi.com/api/character/', ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');

    if (name === 'Rick') {
      return HttpResponse.json({
        results: characters,
      });
    }

    if (name === 'NonExistent') {
      return new HttpResponse(null, { status: 404 });
    }

    if (name === 'ServerError') {
      return new HttpResponse(null, { status: 500 });
    }

    return HttpResponse.json({ results: [] });
  }),
];
