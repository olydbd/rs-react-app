import { API_URL } from '../utils/constants';
import type { Character } from '../utils/types';

interface FetchDataResult {
  results: Character[];
  pages: number;
}

export async function fetchData(
  searchText = '',
  page = 1,
): Promise<FetchDataResult> {
  const url = new URL(API_URL);

  const trimmedText = searchText.trim();

  url.searchParams.set('page', page.toString());
  if (trimmedText) {
    url.searchParams.set('name', trimmedText);
  }

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      if (response.status === 404) {
        return { results: [], pages: 0 };
      }
      throw new Error(`HTTP Error. Status: ${response.status}`);
    }

    const data = await response.json();

    return {
      results: data.results || [],
      pages: data.info.pages || 1,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error. Failed to fetch data.');
  }
}

export async function getCharacterById(
  id: string | number,
): Promise<Character> {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Character not found');
      }
      throw new Error(`HTTP Error. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error. Failed to fetch data.');
  }
}
