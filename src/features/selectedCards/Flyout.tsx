import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeAllCards } from './selectedCardsSlice';
import downloadCharactersCsv from './downloadCharactersCsv';

export default function Flyout() {
  const selectedCards = useAppSelector((state) => state.selectedCards.cards);
  const dispatch = useAppDispatch();

  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  return (
    <div className="sticky bottom-0 flex flex-wrap items-center justify-between bg-[#42B4CA] px-13 py-2 transition-all duration-500 dark:bg-fuchsia-800">
      <div className="px-2 py-4">
        <p className="font-bold text-white transition-all duration-500 dark:text-white">
          Portal ready with {selectedCards.length} traveler(s)
        </p>
      </div>
      <div className="flex flex-wrap gap-2 p-2">
        <button
          onClick={() => downloadCharactersCsv(selectedCards, downloadLinkRef)}
          className="cursor-pointer rounded-full bg-[#01859f] px-4 py-2 text-white transition-all duration-500 hover:bg-[#006e84] dark:bg-fuchsia-400 hover:dark:bg-fuchsia-600"
        >
          Download
        </button>
        <button
          onClick={() => dispatch(removeAllCards())}
          className="cursor-pointer rounded-full bg-[#01859f] px-4 py-2 text-white transition-all duration-500 hover:bg-[#006e84] dark:bg-fuchsia-400 hover:dark:bg-fuchsia-600"
        >
          Unselect All
        </button>
      </div>
      <a ref={downloadLinkRef} style={{ display: 'none' }} />
    </div>
  );
}
