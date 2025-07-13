import { Component, type ReactNode } from 'react';
import Card from './Card';
import type { Character } from '../utils/types';
import Spinner from './Spinner';
import { fetchData } from '../services/api';

interface Props {
  searchText: string;
  isError: boolean;
}

interface State {
  loading: boolean;
  error: string | null;
  characters: Character[];
}

class CardList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      characters: [],
    };
  }

  componentDidMount(): void {
    this.fetchCharacters();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.searchText !== this.props.searchText) this.fetchCharacters();
  }

  async fetchCharacters(): Promise<void> {
    this.setState({ loading: true, error: null, characters: [] });

    try {
      const data = await fetchData(this.props.searchText);
      this.setState({ characters: data, loading: false });
    } catch (error) {
      this.setState({ characters: [], loading: false });
      if (error instanceof Error) {
        this.setState({ error: error.message });
      }
    }
  }

  render(): ReactNode {
    const { loading, error, characters } = this.state;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (this.props.isError) {
      throw new Error('Test Error');
    }

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {characters.length > 0 ? (
          characters.map((character) => (
            <Card key={character.id} character={character} />
          ))
        ) : (
          <p>No character was found</p>
        )}
      </div>
    );
  }
}

export default CardList;
