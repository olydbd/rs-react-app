import type { LoaderFunctionArgs } from 'react-router-dom';
import { fetchData, getCharacterById } from './api';

export async function mainLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const searchText = url.searchParams.get('search') || '';

  const { results, pages } = await fetchData(searchText, page);

  return {
    characters: results,
    pages,
    page,
  };
}

export async function detailsLoader({ params }: LoaderFunctionArgs) {
  if (!params.characterId) {
    throw new Error('ID not specified');
  }

  const character = await getCharacterById(params.characterId);
  return character;
}
