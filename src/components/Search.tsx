import { Component, type ChangeEvent, type ReactNode } from 'react';
import { SEARCH_KEY } from '../utils/constants';

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
      <div>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Search characters"
        />
        <button onClick={this.handleClick}>Search</button>
      </div>
    );
  }
}

export default Search;
