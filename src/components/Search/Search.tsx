import {
  Component,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react';
import { SEARCH_KEY } from '../../utils/constants';
import SearchButtonIcon from '../ui/icons/SearchButton';

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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: ChangeEvent<HTMLInputElement>): void {
    this.setState({ query: e.target.value });
  }

  handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const searchText = this.state.query.trim();
    this.setState({ query: searchText });
    localStorage.setItem(SEARCH_KEY, searchText);
    this.props.onClick(searchText);
  }

  render(): ReactNode {
    return (
      <form onSubmit={this.handleSubmit} className="relative mx-auto max-w-sm">
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
        >
          <SearchButtonIcon />
        </button>
      </form>
    );
  }
}

export default Search;
