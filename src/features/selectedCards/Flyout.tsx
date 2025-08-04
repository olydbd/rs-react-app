import { useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeAllCards } from './selectedCardsSlice';
import downloadDataCsv from './downloadDataCsv';

export default function Flyout() {
  const selectedCards = useAppSelector((state) => state.selectedCards.cards);
  const dispatch = useAppDispatch();

  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  return (
    <div className="fixed right-5 bottom-15 flex items-center justify-between gap-25 rounded-xl bg-blue-100 p-1 dark:bg-fuchsia-800">
      <div className="px-5 py-4">
        <p className="font-bold dark:text-white">
          Selected: {selectedCards.length}
        </p>
      </div>
      <div className="flex gap-2 p-2">
        <button
          onClick={() => downloadDataCsv(selectedCards, downloadLinkRef)}
          className="cursor-pointer rounded-2xl bg-blue-800 px-4 py-2 text-white hover:bg-blue-900 dark:bg-fuchsia-400 hover:dark:bg-fuchsia-600"
        >
          Download
        </button>
        <button
          onClick={() => dispatch(removeAllCards())}
          className="cursor-pointer rounded-2xl bg-blue-800 px-4 py-2 text-white hover:bg-blue-900 dark:bg-fuchsia-400 hover:dark:bg-fuchsia-600"
        >
          Unselect All
        </button>
      </div>
      <a ref={downloadLinkRef} style={{ display: 'none' }} />
    </div>
  );
}
