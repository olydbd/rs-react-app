import { Component, type ReactNode } from 'react';
import Search from '../../components/Search/Search';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import CardList from '../../components/CardList/CardList';
import { SEARCH_KEY } from '../../utils/constants';
import type { Character } from '../../utils/types';
import { fetchData } from '../../services/api';

interface State {
  searchText: string;
  characters: Character[];
  loading: boolean;
  error: string | null;
}

class Main extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchText: localStorage.getItem(SEARCH_KEY) || '',
      characters: [],
      loading: false,
      error: null,
    };
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidMount(): void {
    this.fetchCharacters(this.state.searchText);
  }

  componentDidUpdate(
    _: Readonly<Record<string, never>>,
    prevState: Readonly<State>,
  ): void {
    if (prevState.searchText !== this.state.searchText) {
      this.fetchCharacters(this.state.searchText);
    }
  }

  handleSearchSubmit(search: string) {
    this.setState({ searchText: search });
  }

  async fetchCharacters(searchText: string): Promise<void> {
    this.setState({ loading: true, error: null });

    try {
      const data = await fetchData(searchText);
      this.setState({ characters: data, loading: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      this.setState({ error: message, characters: [], loading: false });
    }
  }

  render(): ReactNode {
    const { searchText, characters, loading, error } = this.state;

    return (
      <main>
        <Search initialSearch={searchText} onClick={this.handleSearchSubmit} />
        <ErrorBoundary>
          <CardList characters={characters} loading={loading} error={error} />
        </ErrorBoundary>
      </main>
    );
  }
}

export default Main;
