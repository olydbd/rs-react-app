import Card from '../Card/Card';
import type { Character } from '../../utils/types';
import santaImage from '../../assets/images/santa.png';

interface Props {
  characters: Character[];
}

export default function CardList({ characters }: Props) {
  if (characters.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-10">
        <img
          src={santaImage}
          alt="Santa Claus"
          className="mx-auto w-full max-w-xs rounded-lg"
        />
        <p className="text-center text-xl font-bold text-black uppercase dark:text-white">
          No character was found{' '}
          <span className="whitespace-nowrap">:&#40;</span>
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid-cols-1 pb-5 sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {characters.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}
