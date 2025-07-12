import { Component, type ReactNode } from 'react';
import Card from './Card';
import type { Character } from '../utils/constants';
import Spinner from './Spinner';

interface Props {
  characters: Character[];
  loading: boolean;
}

class CardList extends Component<Props> {
  render(): ReactNode {
    const { characters, loading } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <div
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {characters.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
    );
  }
}

export default CardList;
