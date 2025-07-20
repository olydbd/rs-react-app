import { Component, type ReactNode } from 'react';
import Card from '../Card/Card';
import type { Character } from '../../utils/types';
import Spinner from '../ui/Spinner/Spinner';

interface Props {
  characters: Character[];
  loading: boolean;
  error: string | null;
}

class CardList extends Component<Props> {
  render(): ReactNode {
    const { characters, loading, error } = this.props;

    if (loading) {
      return (
        <div className="flex w-full justify-center p-10">
          <Spinner />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center p-10">
          <p>{error}</p>
        </div>
      );
    }

    if (characters.length === 0) {
      return (
        <div className="flex justify-center p-10">
          <p>No character was found :&#40;</p>
        </div>
      );
    }

    return (
      <div>
        <div className="grid-cols-1 p-5 sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {characters.map((character) => (
            <Card key={character.id} character={character} />
          ))}
        </div>
      </div>
    );
  }
}

export default CardList;
