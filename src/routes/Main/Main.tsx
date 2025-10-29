import SearchForm from '../../components/SearchForm/SearchForm';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import CardList from '../../components/CardList/CardList';
import { SEARCH_KEY } from '../../utils/constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Outlet, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import Flyout from '../../features/selectedCards/Flyout';
import { useAppSelector } from '../../app/hooks';
import Title from '../../components/Title/Title';
import { useGetCharactersQuery } from '../../services/character';
import Spinner from '../../components/ui/Spinner/Spinner';

export default function Main() {
  const [searchText, setSearchText] = useLocalStorage(SEARCH_KEY);
  const selectedCards = useAppSelector((state) => state.selectedCards.cards);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const { data, isError, isLoading, isFetching } = useGetCharactersQuery({
    searchText: search,
    page,
  });

  const handleSearch = (search: string) => {
    setSearchText(search);
    setSearchParams({ page: '1', search });
  };

  return (
    <div className="relative">
      <div className="px-5">
        <Title text="Search Characters" />
        <SearchForm initialSearch={searchText} onClick={handleSearch} />
        <ErrorBoundary>
          {isFetching && (
            <div className="absolute top-0 right-0 z-50 h-full w-full bg-white/50 dark:bg-black/50" />
          )}
          {isLoading && (
            <div className="flex h-[100vh] items-center justify-center">
              <Spinner />
            </div>
          )}
          {isError && (
            <div className="flex h-[100vh] items-center justify-center">
              <p className="text-black dark:text-white">
                Failed to load characters
              </p>
            </div>
          )}
          {data?.results && (
            <>
              <CardList characters={data.results} />
              <Pagination current={page} total={data.pages} />
            </>
          )}
        </ErrorBoundary>
      </div>

      {selectedCards.length > 0 && <Flyout />}

      <Outlet />
    </div>
  );
}
