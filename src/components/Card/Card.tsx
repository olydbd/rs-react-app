import { Link, useSearchParams } from 'react-router-dom';
import type { Character } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleCard } from '../../features/selectedCards/selectedCardsSlice';
import HeartCheckbox from '../ui/HeartCheckbox/HeartCheckbox';

interface Props {
  character: Character;
}

export default function Card({ character }: Props) {
  const { id, name, status, species, origin, location, image } = character;

  const [searchParams] = useSearchParams();

  const selectedCards = useAppSelector((state) => state.selectedCards.cards);
  const dispatch = useAppDispatch();

  const isSelected = selectedCards.some((c) => c.id === id);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    dispatch(toggleCard(character));
  };

  return (
    <Link
      className="relative mx-10 mt-16 flex flex-col rounded-lg bg-white shadow-xl transition-all duration-500 hover:shadow-md sm:shrink-0 sm:grow sm:basis-0 dark:bg-gray-700"
      to={{
        pathname: `/characters/${id}`,
        search: searchParams.toString(),
      }}
    >
      <div
        className="absolute top-3 right-3 cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      >
        <HeartCheckbox checked={isSelected} onChange={handleCheckboxChange} />
      </div>
      <img className="rounded-t-lg" src={image} alt="Character Image" />
      <div className="p-6">
        <h5 className="mb-2 text-xl leading-tight font-medium dark:text-white">
          {name}
        </h5>
        <div>
          <p className="text-sm font-light dark:text-gray-300">
            Last known location:
          </p>
          <p className="mb-4 text-base dark:text-white">{location.name}</p>
        </div>
        <div>
          <p className="text-sm font-light dark:text-gray-300">
            Origin location:
          </p>
          <p className="mb-4 text-base dark:text-white">{origin.name}</p>
        </div>
      </div>
      <div className="mt-auto flex justify-between gap-1 px-6 py-3">
        <div className="mb-1 rounded-full border border-transparent bg-[#42B4CA] px-2.5 py-1 text-center text-xs text-white shadow-sm transition-all dark:bg-fuchsia-400">
          {status}
        </div>
        <div className="mb-1 rounded-full border border-transparent bg-[#193840] px-2.5 py-1 text-center text-xs text-white shadow-sm transition-all dark:bg-fuchsia-600">
          {species}
        </div>
      </div>
    </Link>
  );
}
