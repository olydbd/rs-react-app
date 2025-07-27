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
  http.get('https://rickandmortyapi.com/api/character', ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get('name');

    if (name === 'Rick') {
      return HttpResponse.json({
        info: { pages: 1 },
        results: characters,
      });
    }

    if (name === 'NonExistent') {
      return new HttpResponse(null, { status: 404 });
    }

    if (name === 'ServerError') {
      return new HttpResponse(null, { status: 500 });
    }

    return HttpResponse.json({
      info: { pages: 1 },
      results: [],
    });
  }),

  http.get('https://rickandmortyapi.com/api/character/:id', ({ params }) => {
    const { id } = params;

    const character = characters.find((c) => c.id.toString() === id);

    if (id === '500') {
      return new HttpResponse(null, { status: 500 });
    }

    if (!character) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(character);
  }),
];
