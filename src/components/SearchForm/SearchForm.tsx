import { useState, type ChangeEvent, type FormEvent } from 'react';
import SearchButtonIcon from '../ui/icons/SearchButton';

interface Props {
  initialSearch: string;
  onClick: (search: string) => void;
}

export default function Search(props: Props) {
  const { initialSearch, onClick } = props;
  const [query, setQuery] = useState(initialSearch);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const searchText = query.trim();
    setQuery(searchText);
    onClick(searchText);
  };

  return (
    <form onSubmit={handleSubmit} className="relative mx-auto max-w-sm">
      <input
        type="text"
        className="ease w-full rounded-full border border-slate-200 bg-transparent py-4 pr-10 pl-5 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#42B4CA] focus:shadow focus:outline-none"
        placeholder="Search character"
        value={query}
        onChange={handleChange}
      />
      <button
        className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full border border-transparent bg-[#42B4CA] p-3 text-center text-sm text-white shadow-sm transition-all hover:bg-[#1196aa] hover:shadow"
        type="submit"
      >
        <SearchButtonIcon />
      </button>
    </form>
  );
}
