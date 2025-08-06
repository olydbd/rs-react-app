import SearchForm from '../../components/SearchForm/SearchForm';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import CardList from '../../components/CardList/CardList';
import { SEARCH_KEY } from '../../utils/constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Outlet, useLoaderData, useSearchParams } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import Flyout from '../../features/selectedCards/Flyout';
import { useAppSelector } from '../../app/hooks';
import Title from '../../components/Title/Title';

export default function Main() {
  const { characters, pages, page } = useLoaderData();
  const [searchText, setSearchText] = useLocalStorage(SEARCH_KEY);
  const selectedCards = useAppSelector((state) => state.selectedCards.cards);

  const [, setSearchParams] = useSearchParams();

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
          <CardList characters={characters} />
          {pages > 1 && <Pagination current={page} total={pages} />}
        </ErrorBoundary>
      </div>

      {selectedCards.length > 0 && <Flyout />}

      <Outlet />
    </div>
  );
}
