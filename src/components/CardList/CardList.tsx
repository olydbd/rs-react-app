import Card from '../Card/Card';
import type { Character } from '../../utils/types';

interface Props {
  characters: Character[];
}

export default function CardList({ characters }: Props) {
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
