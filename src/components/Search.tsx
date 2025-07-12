import { Component, type ChangeEvent, type ReactNode } from 'react';

interface Props {
  searchText: string;
  onChange: (search: string) => void;
  onClick: () => void;
}

class Header extends Component<Props> {
  handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.props.onChange(e.target.value);
  };

  handleClick = (): void => {
    this.props.onClick();
  };

  render(): ReactNode {
    const { searchText } = this.props;
    return (
      <div>
        <input
          type="text"
          value={searchText}
          onChange={this.handleChange}
          placeholder="Search characters"
        />
        <button onClick={this.handleClick}>Search</button>
      </div>
    );
  }
}

export default Header;
