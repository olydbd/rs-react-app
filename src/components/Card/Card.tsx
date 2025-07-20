import { Component, type ReactNode } from 'react';
import type { Character } from '../../utils/types';

interface Props {
  character: Character;
}

class Card extends Component<Props> {
  render(): ReactNode {
    const { name, status, species, origin, location, image } =
      this.props.character;

    return (
      <div className="mx-10 mt-16 flex flex-col rounded-lg bg-white shadow-xl sm:shrink-0 sm:grow sm:basis-0">
        <img className="rounded-t-lg" src={image} alt="Character Image" />
        <div className="p-6">
          <h5 className="mb-2 text-xl leading-tight font-medium">{name}</h5>
          <div>
            <p className="text-sm font-light">Last known location:</p>
            <p className="mb-4 text-base">{location.name}</p>
          </div>
          <div>
            <p className="text-sm font-light">Origin location:</p>
            <p className="mb-4 text-base">{origin.name}</p>
          </div>
        </div>
        <div className="mt-auto flex justify-between gap-1 px-6 py-3">
          <div className="mb-1 rounded-full border border-transparent bg-[#42B4CA] px-2.5 py-1 text-center text-xs text-white shadow-sm transition-all">
            {status}
          </div>
          <div className="mb-1 rounded-full border border-transparent bg-[#193840] px-2.5 py-1 text-center text-xs text-white shadow-sm transition-all">
            {species}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
