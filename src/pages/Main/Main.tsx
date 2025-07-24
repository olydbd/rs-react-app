import { useCallback, useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import CardList from '../../components/CardList/CardList';
import { SEARCH_KEY } from '../../utils/constants';
import type { Character } from '../../utils/types';
import { fetchData } from '../../services/api';

export default function Main() {
  const [searchText, setSearchText] = useState(
    localStorage.getItem(SEARCH_KEY) ?? '',
  );
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = useCallback(
    async (searchText: string): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchData(searchText);
        setCharacters(data);
        setLoading(false);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unknown error';
        setError(message);
        setCharacters([]);
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchCharacters(searchText);
  }, [searchText, fetchCharacters]);

  return (
    <main>
      <Search
        initialSearch={searchText}
        onClick={(search: string) => {
          setSearchText(search);
        }}
      />
      <ErrorBoundary>
        <CardList characters={characters} loading={loading} error={error} />
      </ErrorBoundary>
    </main>
  );
}
