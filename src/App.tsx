import { Component, type ReactNode } from 'react';
import './App.css';
import Header from './components/Search';
import { fetchData } from './services/api';
import CardList from './components/CardList';
import type { Character } from './utils/constants';

interface State {
  searchText: string;
  characters: Character[];
  loading: boolean;
}

class App extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchText: localStorage.getItem('search') || '',
      characters: [],
      loading: true,
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSumbit = this.handleSearchSumbit.bind(this);
  }

  componentDidMount(): void {
    this.fetchCharacters(this.state.searchText);
  }

  async fetchCharacters(search: string): Promise<void> {
    this.setState({ loading: true });

    try {
      const data = await fetchData(search);
      this.setState({ characters: data, loading: false });
    } catch {
      this.setState({ characters: [], loading: false });
    }
  }

  handleSearchChange(search: string) {
    this.setState({ searchText: search });
  }

  handleSearchSumbit() {
    const { searchText } = this.state;
    localStorage.setItem('search', searchText);
    this.fetchCharacters(searchText);
  }

  render(): ReactNode {
    return (
      <>
        <Header
          searchText={this.state.searchText}
          onChange={this.handleSearchChange}
          onClick={this.handleSearchSumbit}
        />
        <CardList
          characters={this.state.characters}
          loading={this.state.loading}
        />
      </>
    );
  }
}

export default App;
