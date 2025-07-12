import type { Character } from '../utils/constants';

export async function fetchData(searchText: string = ''): Promise<Character[]> {
  const text = searchText.trim();
  const url = text
    ? `https://rickandmortyapi.com/api/character/?name=${text}`
    : 'https://rickandmortyapi.com/api/character';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw new Error(`HTTP Error. Status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch data');
  }
}
