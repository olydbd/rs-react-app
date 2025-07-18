import { Component, type ChangeEvent, type ReactNode } from 'react';
import { SEARCH_KEY } from '../../utils/constants';

interface Props {
  initialSearch: string;
  onClick: (search: string) => void;
}

interface State {
  query: string;
}

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      query: props.initialSearch || '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({ query: e.target.value });
  }

  handleClick(): void {
    const searchText = this.state.query.trim();
    this.setState({ query: searchText });
    localStorage.setItem(SEARCH_KEY, searchText);
    this.props.onClick(searchText);
  }

  render(): ReactNode {
    return (
      <div className="relative mx-auto max-w-sm">
        <input
          type="text"
          className="ease w-full rounded-full border border-slate-200 bg-transparent py-4 pr-10 pl-5 text-sm text-slate-700 shadow-sm transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-400 focus:shadow focus:outline-none"
          placeholder="Search character"
          value={this.state.query}
          onChange={this.handleChange}
        />
        <button
          className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full border border-transparent bg-[#b2daed] p-3 text-center text-sm text-white shadow-sm transition-all hover:bg-[#6391a6] hover:shadow"
          type="button"
          onClick={this.handleClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    );
  }
}

export default Search;
