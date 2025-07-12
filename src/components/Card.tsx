import { Component, type ReactNode } from 'react';
import type { Character } from '../utils/constants';

interface Props {
  character: Character;
}

class Card extends Component<Props> {
  render(): ReactNode {
    const { character } = this.props;
    return (
      <div style={{ border: '1px solid black' }}>
        <h2>{character.name}</h2>
        <p>{character.status}</p>
        <img src={character.image} alt="Image" />
      </div>
    );
  }
}

export default Card;
