import { Component, type ReactNode } from 'react';
import Card from '../Card/Card';
import type { Character } from '../../utils/types';
import Spinner from '../ui/Spinner';
import { fetchData } from '../../services/api';

interface Props {
  searchText: string;
}

interface State {
  loading: boolean;
  error: string | null;
  characters: Character[];
  isError: boolean;
}

class CardList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      characters: [],
      isError: false,
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

  throwError = (): void => {
    this.setState({ isError: true });
  };

  render(): ReactNode {
    const { loading, error, characters } = this.state;

    if (loading) {
      return <Spinner />;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (this.state.isError) {
      throw new Error('Test Error for Results');
    }

    return (
      <>
        <button
          className="absolute top-0 right-0 cursor-pointer rounded bg-amber-600 px-6 py-2 text-xs font-medium text-white uppercase hover:bg-amber-800"
          onClick={this.throwError}
        >
          Error Results
        </button>
        <div>
          {characters.length > 0 ? (
            <div className="grid-cols-1 p-10 sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {characters.map((character) => (
                <Card key={character.id} character={character} />
              ))}
            </div>
          ) : (
            <div className="flex w-full justify-center p-10">
              <p>No character was found :&#40;</p>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default CardList;
