import { Component, type ReactNode } from 'react';
import Search from '../components/Search';
import ErrorBoundary from '../components/ErrorBoundary';
import CardList from '../components/CardList';
import { SEARCH_KEY } from '../utils/constants';

interface State {
  searchText: string;
  isError: boolean;
}

class Main extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchText: localStorage.getItem(SEARCH_KEY) || '',
      isError: false,
    };
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchSubmit(search: string) {
    this.setState({ searchText: search });
  }

  throwError = (): void => {
    this.setState({ isError: true });
  };

  render(): ReactNode {
    const { searchText, isError } = this.state;

    return (
      <main>
        <Search initialSearch={searchText} onClick={this.handleSearchSubmit} />
        <button onClick={this.throwError}>Error</button>
        <ErrorBoundary>
          <CardList searchText={searchText} isError={isError} />
        </ErrorBoundary>
      </main>
    );
  }
}

export default Main;
