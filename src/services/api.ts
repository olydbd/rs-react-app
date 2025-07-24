import { API_URL } from '../utils/constants';
import type { Character } from '../utils/types';

export async function fetchData(searchText: string = ''): Promise<Character[]> {
  const url = new URL(API_URL);

  const trimmedText = searchText.trim();

  if (trimmedText) {
    url.searchParams.set('name', trimmedText);
  }

  try {
    const response = await fetch(url.toString());

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
    throw new Error('Unknown error. Failed to fetch data.');
  }
}
