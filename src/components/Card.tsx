import { Component, type ReactNode } from 'react';
import type { Character } from '../utils/types';

interface Props {
  character: Character;
}

class Card extends Component<Props> {
  render(): ReactNode {
    const { name, status, image } = this.props.character;

    return (
      <div style={{ border: '1px solid black' }}>
        <h2>{name}</h2>
        <p>{status}</p>
        <img src={image} alt="Image" />
      </div>
    );
  }
}

export default Card;
