import { Component, type ReactNode } from 'react';
import Card from './Card';
import type { Character } from '../utils/constants';
import Spinner from './Spinner';

interface Props {
  characters: Character[];
  loading: boolean;
}

interface State {
  isError: boolean;
}

class CardList extends Component<Props, State> {
  state = {
    isError: false,
  };

  throwError = (): void => {
    this.setState({ isError: true });
  };

  render(): ReactNode {
    const { characters, loading } = this.props;

    if (loading) {
      return <Spinner />;
    }

    if (this.state.isError) {
      throw new Error('Test Error');
    }

    return (
      <>
        <button onClick={this.throwError}>Test Error Boundary</button>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {characters.map((character) => (
            <Card key={character.id} character={character} />
          ))}
        </div>
      </>
    );
  }
}

export default CardList;
