import { Component, type ReactNode } from 'react';
import Search from '../../components/Search/Search';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import CardList from '../../components/CardList/CardList';
import { SEARCH_KEY } from '../../utils/constants';

interface State {
  searchText: string;
}

class Main extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchText: localStorage.getItem(SEARCH_KEY) || '',
    };
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchSubmit(search: string) {
    this.setState({ searchText: search });
  }

  render(): ReactNode {
    const { searchText } = this.state;

    return (
      <main className="min-h-screen">
        <Search initialSearch={searchText} onClick={this.handleSearchSubmit} />
        <ErrorBoundary>
          <CardList searchText={searchText} />
        </ErrorBoundary>
      </main>
    );
  }
}

export default Main;
